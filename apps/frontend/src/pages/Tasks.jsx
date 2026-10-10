import { useState, useEffect } from 'react';
import '../styles/Tasks.css';

function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchTasks();
  }, [search]);

  async function fetchTasks() {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (search) params.append('search', search);
      const response = await fetch(`/api/tasks?${params}`);
      if (!response.ok) throw new Error('Failed to fetch tasks');
      const data = await response.json();
      setTasks(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleAddTask(taskData) {
    try {
      const response = await fetch('/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(taskData)
      });
      if (!response.ok) throw new Error('Failed to create task');
      setShowForm(false);
      fetchTasks();
    } catch (err) {
      setError(err.message);
    }
  }

  async function handleUpdateTask(taskId, taskData) {
    try {
      const response = await fetch(`/api/tasks/${taskId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(taskData)
      });
      if (!response.ok) throw new Error('Failed to update task');
      setEditingTask(null);
      setShowForm(false);
      fetchTasks();
    } catch (err) {
      setError(err.message);
    }
  }

  async function handleDeleteTask(taskId) {
    if (!window.confirm('Delete this task?')) return;
    try {
      const response = await fetch(`/api/tasks/${taskId}`, { method: 'DELETE' });
      if (!response.ok) throw new Error('Failed to delete task');
      fetchTasks();
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <>
      <header className="topbar">
        <div>
          <p className="eyebrow">Follow-up system</p>
          <h1>Tasks & reminders</h1>
        </div>
        <div className="topbar-actions">
          <button className="primary-btn" onClick={() => { setEditingTask(null); setShowForm(!showForm); }}>
            {showForm ? '✕ Close' : '+ New task'}
          </button>
        </div>
      </header>

      {error && <div className="error-message">{error}</div>}

      {showForm && (
        <TaskForm
          task={editingTask}
          onSubmit={editingTask ? (data) => handleUpdateTask(editingTask.id, data) : handleAddTask}
          onCancel={() => { setShowForm(false); setEditingTask(null); }}
        />
      )}

      <div className="filter-panel">
        <input
          type="text"
          className="search-input"
          placeholder="Search tasks..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {loading ? (
        <div className="loading-box">Loading tasks...</div>
      ) : tasks.length > 0 ? (
        <div className="tasks-grid">
          {tasks.map(task => (
            <div className="task-card panel" key={task.id}>
              <div className="task-card-header">
                <h3>{task.title}</h3>
                <span className={`priority ${task.priority.toLowerCase()}`}>{task.priority}</span>
              </div>
              <ul>
                <li><strong>Assignee:</strong> {task.assignee}</li>
                <li><strong>Due:</strong> {task.dueDate || 'No date'}</li>
                <li><strong>Status:</strong> {task.status}</li>
                <li><strong>Related:</strong> {task.relatedTo}</li>
              </ul>
              <div className="task-actions">
                <button className="ghost-btn" onClick={() => { setEditingTask(task); setShowForm(true); }}>Edit</button>
                <button className="icon-btn delete" onClick={() => handleDeleteTask(task.id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <p>No tasks found</p>
          <button className="primary-btn" onClick={() => { setEditingTask(null); setShowForm(true); }}>Create a task</button>
        </div>
      )}
    </>
  );
}

function TaskForm({ task, onSubmit, onCancel }) {
  const [formData, setFormData] = useState(task || {
    title: '',
    assignee: '',
    dueDate: '',
    priority: 'Medium',
    status: 'Pending',
    relatedTo: 'General'
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit(formData);
  }

  return (
    <div className="form-panel panel">
      <h2>{task ? 'Edit task' : 'Create task'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Title *</label>
          <input type="text" name="title" value={formData.title} onChange={handleChange} required />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Assignee *</label>
            <input type="text" name="assignee" value={formData.assignee} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label>Due date</label>
            <input type="date" name="dueDate" value={formData.dueDate} onChange={handleChange} />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Priority</label>
            <select name="priority" value={formData.priority} onChange={handleChange}>
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </select>
          </div>
          <div className="form-group">
            <label>Status</label>
            <select name="status" value={formData.status} onChange={handleChange}>
              <option>Pending</option>
              <option>Scheduled</option>
              <option>In Progress</option>
              <option>Completed</option>
            </select>
          </div>
        </div>

        <div className="form-group">
          <label>Related to</label>
          <select name="relatedTo" value={formData.relatedTo} onChange={handleChange}>
            <option>General</option>
            <option>Lead</option>
            <option>Customer</option>
            <option>Deal</option>
          </select>
        </div>

        <div className="form-actions">
          <button type="submit" className="primary-btn">Save task</button>
          <button type="button" className="ghost-btn" onClick={onCancel}>Cancel</button>
        </div>
      </form>
    </div>
  );
}

export default Tasks;
