#!/usr/bin/env python3
from flask import jsonify

class NotFound(Exception):
    status_code = 400

    def __init__(self, params, payload=None):
        Exception.__init__(self)
        self.message = 'Error: ' + params + ' not found'
        self.payload = payload

    def to_json(self):
        rv = dict(self.payload or ())
        rv['message'] = self.message
        return jsonify(rv)

class MissingKey(NotFound):
    def __init__(self, key, payload=None):
        Exception.__init__(self)
        self.message = 'Error: key(s) \'' + key + '\' not found'
        self.payload = payload
