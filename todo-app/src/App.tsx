import React, { useEffect, useState } from 'react';
import './App.css';
import TodoForm from './TodoForm';
import TodoList from './TodoList';
import { Task } from './types';

const STORAGE_KEY = 'task_list';

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      setTasks(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  const handleSave = (task: Task) => {
    setTasks((prev) => {
      const exists = prev.find((t) => t.id === task.id);
      if (exists) {
        return prev.map((t) => (t.id === task.id ? task : t));
      }
      return [...prev, task];
    });
    setEditingTask(null);
  };

  return (
    <div style={{ maxWidth: 600, margin: 'auto', padding: 20 }}>
      <h2> TO-DO</h2>
      <TodoForm onSubmit={handleSave} selectedTask={editingTask} />
      <TodoList
        tasks={tasks}
        onToggle={(id) =>
          setTasks(
            tasks.map((t) =>
              t.id === id ? { ...t, completed: !t.completed } : t
            )
          )
        }
        onDelete={(id) => setTasks(tasks.filter((t) => t.id !== id))}
        onEdit={setEditingTask}
      />
    </div>
  );
};

export default App;
