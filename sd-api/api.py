#!/usr/bin/env python3
from flask import Flask, jsonify, abort, request
from tables import db, CertReports, ReportFiles
from errors import NotFound, MissingKey

app = Flask(__name__)
app.config.from_pyfile('../config.py')
db.init_app(app)

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
    if not request.args and request.method == 'GET':
        return get_column('action')

    if not request.args.get('town'):
        raise MissingKey('town')

    town = request.args.get('town')
    towns = CertReports.query.with_entities(CertReports.town) \
    .distinct(CertReports.town).all()

    if not [t[0] for t in towns if t[0] == town]:
        raise NotFound(town)

    if request.method == 'GET':
        return get_town_actions(town)
    else:
        params = request.get_json()
        params['town'] = town
        missing = []
        if 'action' not in params:
            missing.append('action')
        if 'category' not in params:
            missing.apparend('category')
        if missing:
            raise MissingKey(', '.join(missing))
        if 'id' in params:
            return update_town_action(params)
        else:
            return add_town_action(params)

def get_town_actions(town_name):
    results = CertReports.query.with_entities \
    (CertReports.report_id, CertReports.action, CertReports.category) \
    .filter_by(town = town_name).all()

    return jsonify([ \
    {'id': res[0], 'action': res[1], 'category': res[2]} \
    for res in results])

def add_town_action(params):
    action = CertReports(town = params['town'],
                         action = params['action'],
                         category = params['category'])
    db.session.add(action)
    db.session.commit()
    return jsonify({'Action successfully added': params})

def update_town_action(params):
    params['report_id'] = params['id']
    del params['id']
    CertReports.query.filter_by(report_id = params['report_id']).update(params)
    db.session.commit()
    return jsonify({'Action successfully updated': params})

@app.errorhandler(NotFound)
def handle_not_found(error):
    response = error.to_json()
    response.status_code = error.status_code
    return response

if __name__ == '__main__':
    app.run()
