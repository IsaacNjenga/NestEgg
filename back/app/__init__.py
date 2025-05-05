from flask import Flask
from flask_cors import CORS
from pymongo import MongoClient
from dotenv import load_dotenv
import os

def create_app():
    load_dotenv()
    app = Flask(__name__)

    CORS(app,
         supports_credentials=True,
         resources={r"/nestegg/*":{"origins":"http://localhost:3000"}},
         methods=['GET','POST','PUT','DELETE','OPTIONS'],
         allow_headers=['Content-Type', 'Authorization'])

    #config
    app.config['MONGO_URI']=os.getenv('MONGO_URI')
    client = MongoClient(app.config['MONGO_URI'])
    app.db = client['NestEgg']

    #Register Blueprints (routes)
    from .routes.users import users_bp
    app.register_blueprint(users_bp, url_prefix='/nestegg/users')

    from .routes.passwordChange import auth_bp
    app.register_blueprint(auth_bp,url_prefix='/nestegg/auth')

    from .routes.cloudinary import cloudinary_bp
    app.register_blueprint(cloudinary_bp, url_prefix='/nestegg/image')


    return app