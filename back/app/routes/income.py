from flask import Blueprint, request
from ..controllers.incomeController import (
    add_income,
    get_all_incomes,
    update_income,
    update_income_source,
    delete_income,
    delete_income_detail,
)

income_bp = Blueprint("income", __name__)


@income_bp.route("/create-income", methods=["POST", "OPTIONS"])
def create_income():
    if request.method == "OPTIONS":
        return "", 200
    return add_income()


@income_bp.route("/get-income/<user_id>", methods=["GET", "OPTIONS"])
def get_user_incomes(user_id):
    if request.method == "OPTIONS":
        return "", 200
    return get_all_incomes(user_id)


@income_bp.route("/update-income/<income_id>", methods=["PUT", "OPTIONS"])
def updating_income(income_id):
    if request.method == "OPTIONS":
        return "", 200
    return update_income(income_id)


@income_bp.route("/update-income-source/<detail_id>", methods=["PUT", "OPTIONS"])
def updating_income_source(detail_id):
    if request.method == "OPTIONS":
        return "", 200
    return update_income_source(detail_id)


@income_bp.route("/delete-income/<income_id>", methods=["DELETE", "OPTIONS"])
def remove_income(income_id):
    if request.method == "OPTIONS":
        return "", 200
    return delete_income(income_id)


@income_bp.route(
    "/delete-income-source/<detail_id>/<income_id>", methods=["DELETE", "OPTIONS"]
)
def remove_income_detail(detail_id, income_id):
    if request.method == "OPTIONS":
        return "", 200
    return delete_income_detail(detail_id, income_id)
