#!/usr/bin/env python3

from flask import Flask, jsonify, abort, request
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config.from_pyfile('../config.py')
db = SQLAlchemy(app)

class Table:
    def as_json(self):
        """Convert query result to JSON"""
        return jsonify({c.name: getattr(self, c.name) for c in self.__table__.columns})

    @staticmethod
    def list_json(results):
        """Convert list of query results to JSON"""
        return jsonify([{c.name: getattr(res, c.name) for c in res.__table__.columns} for res in results])

    def get_column(self, column):
        return jsonify([col[0] for col in self.query.with_entities(column).distinct(column)])


class CertReports(Table, db.Model):
    __tablename__ = 'cert_reports'
    report_id = db.Column(db.Integer, primary_key=True)
    town = db.Column(db.VARCHAR(length=50), nullable=False)
    action = db.Column(db.VARCHAR(length=100))
    category = db.Column(db.VARCHAR(length=100))
    assets = db.Column(db.Text)
    contact = db.Column(db.Text)
    summary = db.Column(db.Text)
    points = db.Column(db.SMALLINT)
    date = db.Column(db.Date)

class ReportFiles(Table, db.Model):
    __tablename__ = 'report_files'
    file_id = db.Column(db.Integer, db.ForeignKey('cert_report.report_id'), primary_key=True)
    report_file = db.Column(db.LargeBinary)


@app.route('/report', methods = ['GET'])
def get_reports():
    reports = CertReports.query
    return Table.list_json(reports)

@app.route('/<string:endpoint>', methods = ['GET'])
def get_column(endpoint):
    columns = CertReports.__table__.columns
    if endpoint not in columns.keys():
        abort(404)

    return CertReports().get_column(columns[endpoint])

@app.route('/action', methods = ['GET', 'POST'])
def action():
    if not request.args:
        return get_column('action')

    if request.method == 'GET':
        if not request.args.get('town'):
            abort(404)

        town = request.args.get('town')
        towns = CertReports.query.with_entities(CertReports.town) \
        .distinct(CertReports.town).all()

        if [t[0] for t in towns if t[0] == town]:
            return get_town_actions(town)
        else:
            abort(404)
    else:
        pass

def get_town_actions(town):
    results = CertReports.query.with_entities \
    (CertReports.report_id, CertReports.action, CertReports.category) \
    .filter(CertReports.town == town).all()

    return jsonify([ \
    {'id': res[0], 'action': res[1], 'category': res[2]} \
    for res in results])

def add_town_action(town):
    pass

def update_town_action(town):
    pass


if __name__ == '__main__':
    app.run()
