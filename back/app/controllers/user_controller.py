from bson.objectid import ObjectId
from flask import current_app, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
import jwt
import datetime
import os

def get_all_users():
    db = current_app.db
    users = list(db.users.find({}, {"password": 0}))
    return jsonify([{"_id":str(user["_id"]),
                     "firstName":str(user["firstName"]),
                     "lastName":str(user['lastName']),
                     "username":str(user['username']),
                     "email":str(user['email']),
                     "phoneNumber":str(user['phoneNumber'])} 
                     for user in users])

def add_user(request):
    db = current_app.db
    data = request.get_json()

    hashed_password = generate_password_hash(data['password'])

    result = db.users.insert_one({
        "firstName": data["firstName"],
        "lastName": data["lastName"],
        "username": data["username"],
        "email": data["email"],
        "phoneNumber": data["phoneNumber"],
        "password": hashed_password
    })

    return jsonify({"_id": str(result.inserted_id)})

def login_user(request):
    db = current_app.db
    data = request.get_json()
    user = db.users.find_one({"email": data["email"]})

    if user and check_password_hash(user["password"], data["password"]):
        payload = {
            "user_id": str(user["_id"]),
            "exp": datetime.datetime.utcnow() + datetime.timedelta(days=1)
        }
        token = jwt.encode(payload, os.getenv("JWT_SECRET"), algorithm="HS256")
        
        return jsonify({"success": True,
            "token": token,
            "user": {
                "_id": str(user["_id"]),
                "username": user["username"],
                "email": user["email"]
            }
        })
    
    return jsonify({"error": "Invalid email or password"}), 401

def delete_user(id):
    db = current_app.db
    db.users.delete_one({"_id":ObjectId(id)})
    return jsonify({'msg':'Deleted!'})