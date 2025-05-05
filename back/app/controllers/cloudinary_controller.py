import os
from dotenv import load_dotenv
from flask import request, jsonify
import cloudinary
import cloudinary.uploader

load_dotenv()

cloudinary.config(
    cloud_name=os.getenv('CLOUD_NAME'),
    api_key=os.getenv('CLOUD_API_KEY'),
    api_secret=os.getenv('CLOUD_SECRET_KEY'),
    secure=True
)

def delete_image():
    data = request.get_json()
    public_id = data.get('publicId')

    if not public_id:
        return jsonify({'success': False, 'error': 'Public Id is required'}), 400

    try:
        result = cloudinary.uploader.destroy(public_id)
        return jsonify({'success': True, 'result': result}), 200
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500
