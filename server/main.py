from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.responses import FileResponse
import os
import sys
from test import upscale_image
from utils import read_imagefile
from fastapi.middleware.cors import CORSMiddleware

app  = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://mage-ai-two.vercel.app/"],
    allow_credentials=True,
    allow_methods=["*"],  
    allow_headers=["*"],  
)

MODEL_PATH = 'models/RRDB_ESRGAN_x4.pth'

@app.post('/upscale/')
async def process_image(file: UploadFile = File(...)):
    try:
        image = read_imagefile(file)
        upscaled_image = upscale_image(image, MODEL_PATH)

        output_path = os.path.join("output","upscaled_image.png")
        upscaled_image.save(output_path)

        return FileResponse(output_path, media_type="images/png")
    
    except Exception as e:
        print(f"Error processing image: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Error processing image: {str(e)}")


@app.get('/test/')
async def test():
    return {"message": "Server is running!"}


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)