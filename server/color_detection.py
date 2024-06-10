import cv2
import numpy as np

def get_dominant_color(image, k=4):
    image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
    pixels = np.float32(image.reshape(-1, 3))
    criteria = (cv2.TERM_CRITERIA_EPS + cv2.TERM_CRITERIA_MAX_ITER, 20, 0.1)
    _, labels, palette = cv2.kmeans(pixels, k, None, criteria, 10, cv2.KMEANS_RANDOM_CENTERS)
    _, counts = np.unique(labels, return_counts=True)
    return palette[np.argmax(counts)].astype(int)

def start_color_detection(socketio):
    cap = cv2.VideoCapture(0)
    try:
        while True:
            ret, frame = cap.read()
            if not ret:
                print("Failed to grab frame")
                break
            color = get_dominant_color(frame)
            print(f"Emitting color: {color}")
            socketio.emit('color_detected', {'r': int(color[0]), 'g': int(color[1]), 'b': int(color[2])})
    finally:
        cap.release()
