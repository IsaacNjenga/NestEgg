from ..controllers.cloudinary_controller import delete_image
from flask import Blueprint

cloudinary_bp = Blueprint("cloudinary", __name__)


@cloudinary_bp.route(
    "/delete-image",
    methods=[
        "POST",
    ],
)
def delete_img():
    return delete_image()
