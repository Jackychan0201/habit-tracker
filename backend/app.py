from flask import Flask, jsonify

app = Flask(__name__)

# Define a basic route
@app.route('/')
def home():
    return jsonify({"message": "Welcome to the Habit Tracker API!"})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
