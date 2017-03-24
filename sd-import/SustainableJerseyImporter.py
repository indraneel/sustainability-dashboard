#!/usr/bin/env python3

import config, requests, json, re, datetime, MySQLdb, pandas
from dateutil.parser import parse
from bs4 import BeautifulSoup

class SustainableJerseyImporter:
    baseURL = 'http://www.sustainablejersey.com'

    def getFunctions(self):
        return {
            'town': self.getTownName,
            'report': self.getReportPDF,
            'contact': self.getContact,
            'date': self.getDate,
            'points': self.getPoints,
            'categories': self.getCategories
        }

    def getUrl(self, i):
        certificationID = str(i)
        url = 'http://www.sustainablejersey.com/certification/participating-communities/certification-report/?tx_sjcert_certification%5Bcertification%5D%5B__identity%5D=' + certificationID + '&tx_sjcert_certification%5Baction%5D=show&tx_sjcert_certification%5Bcontroller%5D=Certification'
        return url

    def getReportPage(self, url):
        page = requests.get(url)
        if page.status_code >= 400:
            return False

        return BeautifulSoup(page.text, 'html.parser')

    def storeReport(self, page):
        report = {}

        for field, func in self.getFunctions().items():
            try:
                report[field] = func(page)
            except LookupError as e:
                print(e)
                if field != 'town':
                    report[field] = ''

        if 'town' not in report:
            return

        for category in report['categories']:
            catName = self.getCategoryName(category)
            actions = self.getActions(category)
            for action in actions:
                actName = self.getActionName(category)
                assets = self.getAssets(action)
                summary = self.getSummary(action)

                try:
                    self.cur.execute("""INSERT INTO cert_reports
                    (town, action, category, report, assets, contact, summary, date, points)
                    VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)""",
                    (report['town'], actName, catName, report['report'], assets, report['contact'], summary, report['date'], report['points']))
                    self.db.commit()
                except (MySQLdb.Error, MySQLdb.Warning) as e:
                    print(e)
                    self.db.rollback()

    def getTownName(self, page):
        intro = str(page.find_all('p', class_='lead', limit=2)) \
        .replace('Twp', 'Township').replace('Boro', 'Borough')

        town = self.findTown(intro)
        return town

    def findTown(self, intro):
        lowIntro = intro.lower()
        for town in self.towns:
            i = lowIntro.find(town.lower())
            if i > -1 and intro[i-1] != '(' and intro[i + len(town) + 1] != ')':
                return town
        raise LookupError('Town name not found!', self.certId, intro)

    def getAllTownNames(self):
        data = pandas.read_csv('nj-municipalities.csv')
        self.towns = set(data.name)

    def getReportPDF(self, page):
        pdfLoc = page.find('a', class_='btn btn-pdf pdf-link')['href']
        pdf = requests.get(self.baseURL + pdfLoc).content
        return pdf

    def getContact(self, page):
        contact = {}
        contactTable = page.find('table')
        try:
            rows = contactTable.findChildren(['th', 'tr'])
        except AttributeError:
            raise LookupError('Contact Table not found!', self.certId)
        for row in rows:
            key = row.find('th')
            if key:
                contact[key.string] = row.find('td').string
        return json.dumps(contact)

    def getSummary(self, action):
        return action.findAll('p')[1].string.strip()

    def getDate(self, page):
        statement = self.getStatement(page)
        dateFormat = '(Jan(uary)?|Feb(ruary)?|Mar(ch)?|Apr(il)?|May|Jun(e)?|Jul(y)?|Aug(ust)?|Sep(tember)?|Oct(ober)?|Nov(ember)?|Dec(ember)?)?(\s+\d{1,2},\s+)?\d{4}'
        try:
            rawDate = re.search(dateFormat, statement).group(0)
        except AttributeError:
            raise LookupError('Date not found!', self.certId, statement)

        date = parse(rawDate, default=datetime.datetime(2016, 1, 1))
        return date.strftime('%Y-%m-%d')

    def getPoints(self, action):
        pointString = action.find('span', class_='label label-success').string
        return ''.join(n for n in pointString if n.isdigit())

    def getCategories(self, page):
        return page.findAll('li', class_='callout-list-item alt')

    def getCategoryName(self, category):
        return category.find('h3').string

    def getActions(self, category):
        return category.findAll('div', class_='callout-list-action')

    def getActionName(self, action):
        return action.find('h4').string

    def getAssets(self, action):
        files = action.findAll('a', href = True)
        assets = {}
        dupFileNames = 0;
        for actionFile in files:
            fileName = actionFile.string
            while fileName in assets:
                dupFileNames += 1
                fileName = actionFile.string + '_' + str(dupFileNames)
            assets[fileName] = actionFile['href']
        return json.dumps(assets)

    def getStatement(self, page):
        statement = page.find('p', class_='lead with-trim').string
        return statement

    def setCertId(self, certId):
        self.certId = certId

    def connectDb(self, config):
        self.db = MySQLdb.connect(host=config.dbhost,
                                  user=config.dbuser,
                                  passwd=config.dbpass,
                                  db=config.dbname)

        self.cur = self.db.cursor()

    def closeDb(self):
        self.db.close


def main():
    sj = SustainableJerseyImporter()
    sj.getAllTownNames()
    sj.connectDb(config)
    print('Importing...\n')

    for i in range(1, 520):
        sj.setCertId(i)
        url = sj.getUrl(i)
        page = sj.getReportPage(url)
        if page:
            sj.storeReport(page)
        if i % 25 == 0:
            print(str(round((i/520) * 100, 2)) + '%...\n')

    sj.closeDb()


if __name__ == '__main__': main()
