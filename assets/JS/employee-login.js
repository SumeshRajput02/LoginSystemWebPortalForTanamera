// JavaScript for camera access and validation 

const cameraButton = document.getElementById('camera-button');
const cameraStream = document.getElementById('camera-stream');
const photoCanvas = document.getElementById('photo-canvas');
const photoPreview = document.getElementById('photo-preview');
const captureButton = document.getElementById('capture-button');
let stream;
let photoTaken = false; // To keep track if a photo has been taken

// Open the camera and start streaming
cameraButton.addEventListener('click', async () => {
    if (photoTaken) {
        alert('Only one photo can be uploaded. You cannot take another photo.');
        return; // Prevent further photo capture
    }

    try {
        stream = await navigator.mediaDevices.getUserMedia({ video: true });
        cameraStream.srcObject = stream;
        cameraStream.style.display = 'block';
        captureButton.style.display = 'inline';
    } catch (error) {
        console.error('Camera access denied or not supported:', error);
        alert('Camera access is not available. Please check your browser settings.');
    }
});

// Capture the photo
captureButton.addEventListener('click', () => {
    if (photoTaken) {
        alert('Only one photo can be uploaded. You cannot take another photo.');
        return; // Prevent capturing another photo
    }

    const context = photoCanvas.getContext('2d');
    photoCanvas.width = cameraStream.videoWidth;
    photoCanvas.height = cameraStream.videoHeight;
    context.drawImage(cameraStream, 0, 0, photoCanvas.width, photoCanvas.height);

    // Stop the video stream
    stream.getTracks().forEach(track => track.stop());

    // Convert the captured image to a data URL and show the preview
    const imageData = photoCanvas.toDataURL('image/png');
    photoPreview.src = imageData;
    photoPreview.style.display = 'block';

    // Hide video stream and capture button
    cameraStream.style.display = 'none';
    captureButton.style.display = 'none';

    // Mark that a photo has been taken
    photoTaken = true;
});