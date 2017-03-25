#!/usr/bin/env python3
from flask_sqlalchemy import SQLAlchemy
db = SQLAlchemy()

class Table:
    def to_json(self):
        """Convert query result to JSON"""
        return jsonify({c.name: getattr(self, c.name) for c in self.__table__.columns})

    @staticmethod
    def list_to_json(results):
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
