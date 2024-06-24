from flask import request, abort
from flask_restx import Namespace, Resource
from ..models.sticky_note import StickyNote
from ..schemas.sticky_note_serializer import sticky_note_serializer

api = Namespace('sticky_notes', description='Sticky note related operations')

@api.route('/')
class StickyNoteResource(Resource):
    @api.marshal_with(sticky_note_serializer)
    def get(self):
        return StickyNote.get_all()

    @api.expect(sticky_note_serializer)
    @api.marshal_with(sticky_note_serializer)
    def post(self):
        data = request.get_json()

        print('data', data)

        # Perform necessary validation here

        new_sticky_note = StickyNote(**data)
        new_sticky_note.save()
        return new_sticky_note, 201
    
    @api.expect(sticky_note_serializer)
    @api.marshal_with(sticky_note_serializer)
    def put(self):
        data = request.get_json()
        sticky_note = StickyNote.get_by_id(data['_id'])
        if not sticky_note:
            abort(404, 'Sticky note not found')
        sticky_note.update(**data)
        return sticky_note, 201