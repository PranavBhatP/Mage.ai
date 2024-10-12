import torch
import cv2
import numpy as np
from PIL import Image
import RRDBNet_arch as arch
from io import BytesIO

# Function to upscale a single image using ESRGAN
def upscale_image(image: Image.Image, model_path: str) -> Image.Image:
    device = torch.device('cpu')  # Switch to 'cuda' if you have a GPU

    # Load the model
    model = arch.RRDBNet(3, 3, 64, 23, gc=32)
    model.load_state_dict(torch.load(model_path, weights_only=True), strict=True)
    model.eval()
    model = model.to(device)

    # Pre-process the image (PIL to numpy to tensor)
    img = np.array(image) / 255.0
    img = torch.from_numpy(np.transpose(img[:, :, [2, 1, 0]], (2, 0, 1))).float()
    img_LR = img.unsqueeze(0).to(device)

    with torch.no_grad():
        output = model(img_LR).data.squeeze().float().cpu().clamp_(0, 1).numpy()

    # Post-process the output (tensor to numpy to PIL)
    output = np.transpose(output[[2, 1, 0], :, :], (1, 2, 0))
    output = (output * 255.0).round().astype(np.uint8)
    upscaled_image = Image.fromarray(output)

    return upscaled_image
