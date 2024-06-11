#from mongoengine import Document, StringField, BooleanField, DateTimeField
#import datetime
#
#class User(Document):
#    name = StringField(required=True)
#    username = StringField(required=True, unique=True)
#    email = StringField(required=True, unique=True)
#    password = StringField(required=True)
#    address = StringField()
#    contact_info = StringField()
#    role = StringField()
#    is_active = BooleanField(default=True)
#    deleted = BooleanField(default=False)
#    created_at = DateTimeField(default=datetime.datetime.utcnow)
#    updated_at = DateTimeField(default=datetime.datetime.utcnow)
#    
#    def save(self, *args, **kwargs):
#        if not self.created_at:
#            self.created_at = datetime.datetime.utcnow()
#        self.updated_at = datetime.datetime.utcnow()
#        return super(User, self).save(*args, **kwargs)
