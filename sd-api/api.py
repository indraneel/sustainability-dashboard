#!/usr/bin/env python3

from flask import Flask, jsonify, abort, request
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config.from_pyfile('../config.py')
db = SQLAlchemy(app)

class Table:
    def as_dict(self):
        return {c.name: getattr(self, c.name) for c in self.__table__.columns}

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

@app.route('/report/', methods = ['GET'])
def get_report():
    return jsonify(CertReports.query.first().as_dict())
    #return jsonify({'reports': CertReports.query.all()})

@app.route('/action/', methods = ['GET'])
def get_actions():
    return jsonify({'actions': CertReports.query.first()})

@app.route('/category/', methods = ['GET'])
def get_categories():
    return jsonify({'categories': CertReports.query.all()})


if __name__ == '__main__':
    app.run()
