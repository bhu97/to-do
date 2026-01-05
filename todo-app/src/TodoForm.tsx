import React, { useEffect, useState } from 'react';
import { Button, TextField } from '@mui/material';
import { Task } from './types';

interface Props {
  onSubmit: (task: Task) => void;
  selectedTask: Task | null;
}

const TodoForm: React.FC<Props> = ({ onSubmit, selectedTask }) => {
  const [title, setTitle] = useState('');
  const [dueDate, setDueDate] = useState('');

  useEffect(() => {
    if (selectedTask) {
      setTitle(selectedTask.title);
      setDueDate(selectedTask.dueDate);
    }
  }, [selectedTask]);

  const handleSave = () => {
    if (!title || !dueDate) return;

    onSubmit({
      id: selectedTask ? selectedTask.id : Date.now(),
      title,
      dueDate,
      completed: selectedTask ? selectedTask.completed : false,
    });

    setTitle('');
    setDueDate('');
  };

  return (
    <div style={{ marginTop: 20 }}>
      <TextField
        label='Task'
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        fullWidth
      />

      <TextField
        type='date'
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        fullWidth
        InputLabelProps={{ shrink: true }}
        style={{ marginTop: 10 }}
      />

      <Button
        variant='contained'
        color='primary'
        onClick={handleSave}
        style={{ marginTop: 10 }}
      >
        {selectedTask ? 'Update Task' : 'Add Task'}
      </Button>
    </div>
  );
};
export default TodoForm;
