from flask import Flask
from flask_socketio import SocketIO
from threading import Thread
import color_detection

app = Flask(__name__)
socketio = SocketIO(app, cors_allowed_origins="*")

def handle_client():
    with app.test_request_context():
        try:
            color_detection.start_color_detection(socketio)
        except Exception as e:
            print(f"Error in color detection: {e}")

@socketio.on('connect')
def on_connect():
    print('Client connected')
    # Start the color detection in a separate thread
    thread = Thread(target=handle_client)
    thread.daemon = True  # Ensures the thread will close when the main program exits
    thread.start()

if __name__ == '__main__':
    socketio.run(app, debug=True, host='0.0.0.0')
