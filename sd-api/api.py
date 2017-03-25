#!/usr/bin/env python3
from flask import Flask, jsonify, abort, request
from .tables import db, CertReports, ReportFiles
from .errors import NotFound, MissingKey

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
        abort(404)

    if request.method == 'GET':
        get_town_actions(town)
    else:
        params = request.get_json()
        missing = []
        if not params['action']:
            missing.append('action')
        if not params['category']:
            missing.apparend('category')
        if missing:
            raise MissingKey(', '.join(missing))
        if action['id']:
            update_town_action(town, action)
        else:
            add_town_action(town, action)

def get_town_actions(town):
    results = CertReports.query.with_entities \
    (CertReports.report_id, CertReports.action, CertReports.category) \
    .filter(CertReports.town == town).all()

    return jsonify([ \
    {'id': res[0], 'action': res[1], 'category': res[2]} \
    for res in results])

def add_town_action(town, action):
    pass

def update_town_action(town, action):
    pass

@app.errorhandler(NotFound)
def handle_not_found(error):
    return error.to_json()

if __name__ == '__main__':
    app.run()
