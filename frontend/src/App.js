import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [habits, setHabits] = useState([]);
  const [newHabit, setNewHabit] = useState({ name: '', description: '', frequency: '' });
  const [editingHabit, setEditingHabit] = useState(null);

  // Fetch all habits from the API when the component mounts
  useEffect(() => {
    fetch('http://localhost:5000/habits')
      .then(response => response.json())
      .then(data => setHabits(data))
      .catch(error => console.error('Error fetching habits:', error));
  }, []);

  // Handle form input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewHabit({ ...newHabit, [name]: value });
  };

  // Handle form submission to add a new habit
  const handleSubmit = (e) => {
    e.preventDefault();

    fetch('http://localhost:5000/habits', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newHabit),
    })
      .then(response => response.json())
      .then(data => {
        setHabits([...habits, data]);
        setNewHabit({ name: '', description: '', frequency: '' });
      })
      .catch(error => console.error('Error adding habit:', error));
  };

  // Handle deleting a habit
  const handleDelete = (id) => {
    fetch(`http://localhost:5000/habits/${id}`, {
      method: 'DELETE',
    })
      .then(response => {
        if (response.ok) {
          setHabits(habits.filter(habit => habit.id !== id));
        } else {
          alert('Error deleting habit');
        }
      })
      .catch(error => console.error('Error deleting habit:', error));
  };

  // Handle editing a habit
  const handleEdit = (habit) => {
    setEditingHabit(habit);
  };

  // Handle updating a habit
  const handleEditSubmit = (e) => {
    e.preventDefault();

    fetch(`http://localhost:5000/habits/${editingHabit.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(editingHabit),
    })
      .then(response => response.json())
      .then(data => {
        setHabits(habits.map(h => (h.id === data.id ? data : h)));
        setEditingHabit(null);
      })
      .catch(error => console.error('Error updating habit:', error));
  };

  return (
    <div className="App">
      <h1>Habit Tracker</h1>

      <div className="form-container">
        {/* Add Habit Form */}
        <form className="habit-form" onSubmit={handleSubmit}>
          <h2>Add New Habit</h2>
          <div className="form-group">
            <label htmlFor="name">Habit Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={newHabit.name}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description:</label>
            <input
              type="text"
              id="description"
              name="description"
              value={newHabit.description}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="frequency">Frequency:</label>
            <select
              id="frequency"
              name="frequency"
              value={newHabit.frequency}
              onChange={handleInputChange}
              required
            >
              <option value="">Select Frequency</option>
              <option value="Daily">Daily</option>
              <option value="Weekly">Weekly</option>
              <option value="Monthly">Monthly</option>
            </select>
          </div>
          <button type="submit" className="submit-button">Add Habit</button>
        </form>

        {/* Edit Habit Form */}
        {editingHabit && (
          <form className="habit-form" onSubmit={handleEditSubmit}>
            <h2>Edit Habit</h2>
            <div className="form-group">
              <label htmlFor="editName">Habit Name:</label>
              <input
                type="text"
                id="editName"
                name="name"
                value={editingHabit.name}
                onChange={(e) => setEditingHabit({ ...editingHabit, name: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label htmlFor="editDescription">Description:</label>
              <input
                type="text"
                id="editDescription"
                name="description"
                value={editingHabit.description}
                onChange={(e) => setEditingHabit({ ...editingHabit, description: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label htmlFor="editFrequency">Frequency:</label>
              <select
                id="editFrequency"
                name="frequency"
                value={editingHabit.frequency}
                onChange={(e) => setEditingHabit({ ...editingHabit, frequency: e.target.value })}
              >
                <option value="Daily">Daily</option>
                <option value="Weekly">Weekly</option>
                <option value="Monthly">Monthly</option>
              </select>
            </div>
            <button type="submit" className="submit-button">Update Habit</button>
            <button type="button" className="cancel-button" onClick={() => setEditingHabit(null)}>Cancel</button>
          </form>
        )}
      </div>

      {/* List of Habits */}
      <div className="habit-list">
        <h2>Your Habits</h2>
        <ul style={{paddingLeft: 0}}>
          {habits.map(habit => (
            <li key={habit.id} className="habit-item">
              <div className="habit-details">
                <strong>{habit.name}</strong>: {habit.description} <em>({habit.frequency})</em>
              </div>
              <div className="habit-actions">
                <button onClick={() => handleDelete(habit.id)} className="delete-button">Delete</button>
                <button onClick={() => handleEdit(habit)} className="edit-button">Edit</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
