from functools import wraps
from flask import request, jsonify, current_app
import jwt  # Ensure you have PyJWT installed
import os

def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = None
        # Check for the Authorization header
        if "Authorization" in request.headers:
            token = request.headers["Authorization"].split(" ")[1]

        if not token:
            return jsonify({"message": "Token is missing!"}), 401

        try:
            # Decode the token using the secret key
            data = jwt.decode(token, os.getenv("JWT_SECRET"), algorithms=["HS256"])
            current_user_id = data["user_id"]
        except jwt.ExpiredSignatureError:
            return jsonify({"message": "Token expired!"}), 401
        except jwt.InvalidTokenError:
            return jsonify({"message": "Invalid token!"}), 401
        except Exception as e:
            return jsonify({"message": "An error occurred: {}".format(str(e))}), 500

        # Call the original function with the user ID
        return f(current_user_id, *args, **kwargs)

    return decorated
