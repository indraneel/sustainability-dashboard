#!/usr/bin/env python3
from pathlib import Path
from flask import Flask, json, jsonify, abort, request
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
    return get_towns()
    if not request.args:
        return get_towns()

    if not request.args.get('name'):
        raise MissingKey('name')

    town = request.args.get('name')

    if not town_exists(town):
        raise NotFound(town)

@app.route('/stats', methods = ['GET'])
def get_visualizations():
    town = get_town_from_request(request.args)
    visualizations = [action_count_viz, category_count_viz, points_over_time_viz]

    return jsonify({
        'name': town,
        'stats': [viz(town) for viz in visualizations]
    })

def action_count_viz(town):
    data = [{'x': date, 'y': str(action_count)} \
            for date, action_count \
            in get_action_count_by_date(town).items()]

    return {
        'title': 'Actions Completed by Date',
        'visualization': {
            'type': 'bar',
            'data': data
        }
    }

def category_count_viz(town):
    data = [{'x': cat, 'y': c} \
            for cat, c \
            in get_category_count(town).items()]

    return {
        'title': 'Actions Completed by Category',
        'visualization': {
            'type': 'pie',
            'data': data
        }
    }

def points_over_time_viz(town):
    data = [{'x': date, 'y': str(points)} \
            for date, points \
            in get_points_by_date(town).items()]

    return {
        'title': 'Points Earned by Date',
        'visualization': {
            'type': 'line',
            'data': data
        }
    }

def get_towns():
    results = db.engine.execute(
        'SELECT town, SUM(points) \
        FROM cert_reports GROUP BY town;')

    return jsonify([{'town': res[0], 'points': str(res[1])} for res in results])

@app.route('/action', methods = ['GET', 'POST'])
def action_endpoint():
    if not request.args and request.method == 'GET':
        return get_column('action')

    town = get_town_from_request(request.args)

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
        'assets': json.loads(res[3]),
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

def get_town_from_request(req):
    if not req.get('town'):
        raise MissingKey('town')

    town = req.get('town')

    if not town_exists(town):
        raise NotFound(town)

    return town

def town_exists(town):
    towns = CertReports.query.with_entities(CertReports.town) \
    .distinct(CertReports.town).all()

    return [t[0] for t in towns if t[0] == town]

def get_action_count_by_date(town):
    results = db.engine.execute(
        'SELECT date, COUNT(action) FROM cert_reports \
        WHERE town=%s GROUP BY date;', (town,))

    return {parse_date(res[0]): res[1] for res in results}

def get_category_count(town):
    category_map = get_category_map()
    results = db.engine.execute(
        'SELECT category, COUNT(category) FROM cert_reports \
        WHERE town=%s GROUP BY category;', (town,))

    category_count = {}
    for res in results:
        cat_mapped = category_map[res[0]]
        c = int(res[1])
        if cat_mapped in category_count:
            category_count[cat_mapped] += c
        else:
            category_count[cat_mapped] = c

    return category_count

def get_category_map():
    root = Path(__file__).parents[1].resolve()
    map_file = str(root / 'assets/category_mapping.json')
    cat_map = json.load(open(map_file))
    return cat_map

def get_points_by_date(town):
    results = db.engine.execute(
        'SELECT date, SUM(points) FROM cert_reports \
        WHERE town=%s GROUP BY date;', (town,))

    return {parse_date(res[0]): res[1] for res in results}

def parse_date(d):
    date_string = str(d)
    split_date = date_string.split('-')
    if len(split_date) > 1:
        return split_date[1] + '-' + split_date[0] #MM-YYYY
    return date_string #YYYY

@app.errorhandler(NotFound)
def handle_not_found(error):
    response = error.to_json()
    response.status_code = error.status_code
    return response

if __name__ == '__main__':
    app.run(host='0.0.0.0')
