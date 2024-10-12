# utils.py

from fastapi import UploadFile
from PIL import Image
import io

# Function to read image from the upload
def read_imagefile(file: UploadFile) -> Image.Image:
    image = Image.open(io.BytesIO(file.file.read()))
    return image
