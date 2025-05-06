from flask import Blueprint, request, jsonify
from ..utils.auth import token_required
from ..controllers.user_controller import (
    get_all_users,
    add_user,
    delete_user,
    login_user,
    update_user,
    get_user,
)

users_bp = Blueprint("users", __name__)


@users_bp.route("/get-users", methods=["GET"])
def get_users():
    return get_all_users()


@users_bp.route("/profile-data/<user_id>", methods=["GET", "OPTIONS"])
def get_user_profile(user_id):
    if request.method == "OPTIONS":
        return "", 200
    return get_user(user_id)


@users_bp.route("/sign-up", methods=["POST"])
def create_user():
    return add_user(request)


@users_bp.route("/sign-in", methods=["POST"])
def sign_in_user():
    return login_user(request)


@users_bp.route("/secure", methods=["GET"])
@token_required
def get_private(current_user_id):
    return jsonify({"msg": "This is a protected route!", "user_id": current_user_id})


@users_bp.route("/update/<user_id>", methods=["PUT", "OPTIONS"])
def update_user_profile(user_id):
    if request.method == "OPTIONS":
        return "", 200
    return update_user(user_id, request)


@users_bp.route("/<id>", methods=["DELETE"])
def remove_user(id):
    return delete_user(id)
