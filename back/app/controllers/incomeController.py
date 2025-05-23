from bson.objectid import ObjectId
from flask import current_app, jsonify, request
from datetime import datetime


def add_income():
    db = current_app.db
    data = request.get_json()
    try:
        # now = datetime.utcnow()
        for detail in data["incomeSourceDetails"]:
            detail["_id"] = ObjectId()
            detail["createdAt"] = datetime.utcnow()
            detail["updatedAt"] = datetime.utcnow()
        db.income.insert_one(
            {
                "incomeSourceDetails": data["incomeSourceDetails"],
                "userId": ObjectId(data["userId"]),
                "createdAt": datetime.utcnow(),
                "updatedAt": datetime.utcnow(),
            }
        )
        return jsonify(
            {
                "success": True,
            }
        ), 200
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500


def get_all_incomes(user_id):
    db = current_app.db
    try:
        user = db.users.find_one({"_id": ObjectId(user_id)}, {"password": 0})
        if not user:
            return jsonify({"success": False, "message": "User not found"}), 404

        all_income_results = list(db.income.find({"userId": ObjectId(user_id)}))

        for income in all_income_results:
            income["_id"] = str(income["_id"])
            income["userId"] = str(income["userId"])
            # income["timestamp"] = str(income.get("timestamp", ""))
            income["createdAt"] = str(income.get("createdAt", ""))
            income["updatedAt"] = str(income.get("updatedAt", ""))

            # Serialize nested incomeSourceDetails IDs if they exist
            for detail in income.get("incomeSourceDetails", []):
                if "_id" in detail:
                    detail["_id"] = str(detail["_id"])

        return jsonify({"success": True, "result": all_income_results}), 200
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500


def update_income(income_id):
    db = current_app.db
    data = request.get_json()

    if not income_id:
        return jsonify({"success": False, "message": "Missing Income ID"}), 400

    new_income = {
        "_id": ObjectId(),
        "incomeSource": data.get("incomeSource"),
        "amount": data.get("amount"),
        "frequency": data.get("frequency"),
        "dateOfReceipt": data.get("dateOfReceipt"),
        "createdAt": datetime.utcnow(),
    }

    try:
        result = db.income.update_one(
            {"_id": ObjectId(income_id)}, {"$push": {"incomeSourceDetails": new_income}}
        )
        if result.matched_count == 0:
            return jsonify({"success": False, "message": "Income not found"}), 404
        return jsonify({"success": True, "message": "Income added successfully!"})
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500


def update_income_source(detail_id):
    db = current_app.db
    data = request.get_json()

    if not detail_id:
        return jsonify({"success": False, "message": "Missing detailId"}), 400

    update_fields = {}
    allowed_fields = ["incomeSource", "amount", "frequency", "dateOfReceipt"]

    for field in allowed_fields:
        if field in data:
            update_fields[f"incomeSourceDetails.$.{field}"] = data[field]

    if not update_fields or not detail_id:
        return jsonify({"success": False, "message": "Missing data"}), 400

    update_fields["incomeSourceDetails.$.updatedAt"] = datetime.utcnow()

    try:
        result = db.income.update_one(
            {"incomeSourceDetails._id": ObjectId(detail_id)}, {"$set": update_fields}
        )

        if result.matched_count == 0:
            return jsonify({"success": False, "message": "Detail not found"})
        return jsonify({"success": True, "message": "Updated successfully!"}), 200
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500


def delete_income_detail(detail_id, income_id):
    db = current_app.db
    try:
        result = db.income.update_one(
            {"_id": ObjectId(income_id)},
            {"$pull": {"incomeSourceDetails": {"_id": ObjectId(detail_id)}}},
        )

        if result.modified_count == 0:
            return jsonify({"success": False, "message": "Detail not found"}), 404
        return jsonify({"success": True, "message": "Deleted successfully"}), 200

    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500


def delete_income(income_id):
    db = current_app.db
    result = db.income.delete_one({"_id": ObjectId(income_id)})
    if result.deleted_count == 0:
        return jsonify({"msg": "Entry not found"}), 404
    return jsonify({"success": True, "message": "Deleted successfully"}), 200
