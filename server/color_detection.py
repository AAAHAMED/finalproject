import cv2
import numpy as np

def get_dominant_color(image, k=4):
    image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
    pixels = np.float32(image.reshape(-1, 3))
    criteria = (cv2.TERM_CRITERIA_EPS + cv2.TERM_CRITERIA_MAX_ITER, 20, 0.1)
    _, labels, palette = cv2.kmeans(pixels, k, None, criteria, 10, cv2.KMEANS_RANDOM_CENTERS)
    _, counts = np.unique(labels, return_counts=True)
    return palette[np.argmax(counts)].astype(int)

def categorize_color(color):
    r, g, b = color
    # Define color thresholds
    if r > 100 and r > g * 1.5 and r > b * 1.5:
        return "Red"
    elif g > 100 and g > r * 1.5 and g > b * 1.5:
        return "Green"
    elif b > 100 and b > r * 1.5 and b > g * 1.5:
        return "Blue"
    return "No goods received"

def start_color_detection(socketio):
    cap = cv2.VideoCapture(0)
    try:
        while True:
            ret, frame = cap.read()
            if not ret:
                print("Failed to grab frame")
                break
            color = get_dominant_color(frame)
            categorized_color = categorize_color(color)
            print(f"Emitting color: {categorized_color}")
            socketio.emit('color_detected', {'goodsType': categorized_color})
    finally:
        cap.release()
