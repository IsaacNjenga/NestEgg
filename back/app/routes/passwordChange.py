from flask import Blueprint, request, jsonify, current_app
from datetime import datetime,timedelta
from ..utils.otpGenerator import generate_otp
from ..utils.emailer import send_otp_email

auth_bp = Blueprint('auth',__name__)

@auth_bp.route('/otp-request',methods=['POST'])
def otp_request():
    db = current_app.db
    data = request.get_json()
    email = data.get('to')

    if not email:
        return jsonify({'success':False, 'error':'Email is required'}),400
    
    otp=generate_otp()
    expiry=datetime.utcnow()+timedelta(minutes=2)

    db.otp.insert_one({"email": email, "otp": otp, "expiresAt": expiry})

    try:
        send_otp_email(email,otp)
        return jsonify({'success':True})
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500
    
@auth_bp.route("/verify-otp", methods=["POST"])
def verify_otp():
    db = current_app.db
    data = request.get_json()
    email = data.get("email")
    otp = data.get("otp")

    record = db.otp.find_one({"email": email, "otp": otp})
    if not record:
        return jsonify({"success": False, "error": "Invalid OTP"}), 400

    if datetime.utcnow() > record["expiresAt"]:
        return jsonify({"success": False, "error": "OTP has expired"}), 400

    return jsonify({"success": True})

from werkzeug.security import generate_password_hash

@auth_bp.route("/password-change", methods=["POST"])
def change_password():
    db = current_app.db
    data = request.get_json()
    username = data.get("username")
    new_password = generate_password_hash(data.get("newPassword"))

    result = db.users.update_one(
        {"username": username},
        {"$set": {"password": new_password}}
    )

    if result.modified_count == 0:
        return jsonify({"success": False, "error": "User not found"}), 404

    return jsonify({"success": True, "message": "Password changed successfully"})

