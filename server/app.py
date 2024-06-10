from flask import Flask
from flask_socketio import SocketIO
from threading import Thread
import color_detection

app = Flask(__name__)
socketio = SocketIO(app, cors_allowed_origins="*")

def handle_client():
    with app.test_request_context():
        color_detection.start_color_detection(socketio)

@socketio.on('connect')
def on_connect():
    print('Client connected')
    # Start the color detection in a separate thread
    thread = Thread(target=handle_client)
    thread.start()

if __name__ == '__main__':
    socketio.run(app, debug=True, host='0.0.0.0')
