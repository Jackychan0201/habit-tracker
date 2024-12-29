from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from flask_migrate import Migrate
import os

app = Flask(__name__)
CORS(app, origins=["http://localhost:3000"])

app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)
migrate = Migrate(app, db)

class Habit(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    description = db.Column(db.String(100), nullable=False)
    frequency = db.Column(db.String(20), nullable=False) 

@app.route('/')
def home():
    return jsonify({"message": "Welcome to the Habit Tracker API!"})

@app.route('/habits', methods=['POST'])
def add_habit():
    try:
        data = request.get_json()
        name = data['name']
        description = data['description']
        frequency = data['frequency']
        
        new_habit = Habit(name=name, description=description, frequency=frequency)
        db.session.add(new_habit)
        db.session.commit()

        return jsonify({
            'id': new_habit.id,
            'name': new_habit.name,
            'description': new_habit.description,
            'frequency': new_habit.frequency
        }), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 400

@app.route('/habits/<int:id>', methods=['PUT'])
def update_habit(id):
    habit = Habit.query.get(id)
    if habit is None:
        return jsonify({'error': 'Habit not found'}), 404

    try:
        data = request.get_json()
        habit.name = data['name']
        habit.description = data['description']
        habit.frequency = data['frequency'] 

        db.session.commit()
        return jsonify({
            'id': habit.id,
            'name': habit.name,
            'description': habit.description,
            'frequency': habit.frequency
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 400

@app.route('/habits', methods=['GET'])
def get_habits():
    habits = Habit.query.all()
    return jsonify([{
        'id': habit.id,
        'name': habit.name,
        'description': habit.description,
        'frequency': habit.frequency 
    } for habit in habits])

@app.route('/habits/<int:id>', methods=['DELETE'])
def delete_habit(id):
    habit = Habit.query.get(id)
    if habit is None:
        return jsonify({'error': 'Habit not found'}), 404

    db.session.delete(habit)
    db.session.commit()
    return jsonify({'message': 'Habit deleted'}), 200

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
