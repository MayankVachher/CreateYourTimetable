import os
import urllib
import cgi

from google.appengine.api import users
from google.appengine.ext import ndb

import webapp2
import jinja2

DEFAULT_TIMETABLE_NAME = 'default_timetable'

JINJA_ENVIRONMENT = jinja2.Environment (
    loader = jinja2.FileSystemLoader(os.path.dirname(__file__)),
    extensions=['jinja2.ext.autoescape'])

def tt_key(tt_name = DEFAULT_TIMETABLE_NAME):
    return ndb.Key('Timetable',tt_name)

class Timetable(ndb.Model):
    owner = ndb.UserProperty()
    courses = ndb.StringProperty(indexed=False)
    shared = ndb.StringProperty(indexed=False)
    date = ndb.DateTimeProperty(auto_now_add=True)

class MainPage(webapp2.RequestHandler):
    def get(self):
        user = users.get_current_user()
        if user:
            timetable_query = Timetable.query(ancestor = tt_key(user.email()))
            timetable = timetable_query.fetch(10)

            template_values = {'timetable':  timetable}
            template = JINJA_ENVIRONMENT.get_template('main.html')
            self.response.write(template.render(template_values))
        else:
            self.redirect(users.create_login_url(self.request.uri))
    
    def post(self):
        user = users.get_current_user()
        if user:
            timetable = Timetable(parent = tt_key(user.email()))
            timetable.owner = user;
            timetable.courses = self.request.get('courses')
            timetable.put()
            self.redirect('/')

application = webapp2.WSGIApplication([('/', MainPage),],debug = True)
