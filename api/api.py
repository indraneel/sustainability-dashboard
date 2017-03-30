#!/usr/bin/env python3
from flask import Flask, jsonify, abort, request
from flask_cors import CORS, cross_origin
from tables import db, CertReports, ReportFiles
from errors import NotFound, MissingKey

app = Flask(__name__)
app.config.from_pyfile('../config.py')
cors = CORS(app, resources=app.config['CORS_SETTINGS'])
db.init_app(app)

@app.route('/<string:endpoint>', methods = ['GET'])
def get_column(endpoint):
    columns = CertReports.__table__.columns
    if endpoint not in columns.keys():
        abort(404)

    return CertReports().get_column(columns[endpoint])

@app.route('/report', methods = ['GET'])
def get_reports():
    reports = CertReports.query
    return Table.list_json(reports)

@app.route('/town', methods = ['GET'])
def town_endpoint():
    if not request.args:
        return get_towns()

    if not request.args.get('name'):
        raise MissingKey('name')

    town = request.args.get('name')

    if not town_exists(town):
        raise NotFound(town)

def action_count_viz(town):
    pass

def category_count_viz(town):
    pass


def get_towns():
    results = db.engine.execute('SELECT town, SUM(points) \
    FROM cert_reports GROUP BY town;')

    return jsonify([{'town': res[0], 'points': str(res[1])} for res in results])

@app.route('/action', methods = ['GET', 'POST'])
def action_endpoint():
    if not request.args and request.method == 'GET':
        return get_column('action')

    if not request.args.get('town'):
        raise MissingKey('town')

    town = request.args.get('town')

    if not town_exists(town):
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
            missing.append('category')
        if 'visualization' not in params:
            params['visualization'] = ''
        if missing:
            raise MissingKey(', '.join(missing))
        if 'id' in params:
            return update_town_action(params)
        else:
            return add_town_action(params)

def get_town_actions(town_name):
    results = db.engine.execute(
        'SELECT report_id, action, category, assets, visualization \
        FROM cert_reports WHERE town=%s AND cert_id IN (SELECT MAX(cert_id) \
        FROM cert_reports WHERE town=%s);', (town_name, town_name))

    return jsonify([{
        'id': res[0],
        'action': res[1],
        'category': res[2],
        'assets': res[3],
        'visualization': res[4]}
        for res in results])

def add_town_action(params):
    action = CertReports(town = params['town'],
                         action = params['action'],
                         category = params['category'],
                         visualization = params['visualization'])
    db.session.add(action)
    db.session.commit()
    return jsonify({'Action successfully added': params})

def update_town_action(params):
    params['report_id'] = params['id']
    del params['id']
    CertReports.query.filter_by(report_id = params['report_id']).update(params)
    db.session.commit()
    return jsonify({'Action successfully updated': params})

def town_exists(town):
    towns = CertReports.query.with_entities(CertReports.town) \
    .distinct(CertReports.town).all()

    return [t[0] for t in towns if t[0] == town]

@app.errorhandler(NotFound)
def handle_not_found(error):
    response = error.to_json()
    response.status_code = error.status_code
    return response

if __name__ == '__main__':
    app.run(host='0.0.0.0')
