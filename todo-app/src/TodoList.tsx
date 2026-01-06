import React from 'react';
import {
  Checkbox,
  IconButton,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import { Task } from './types';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

interface Props {
  tasks: Task[];
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
  onEdit: (task: Task) => void;
}

const TodoList: React.FC<Props> = ({ tasks, onToggle, onDelete, onEdit }) => {
  const getBackGroundColor = (task: Task) => {
    if (task.completed) return '#d4edda';

    const today = new Date();
    const due = new Date(task.dueDate);

    today.setHours(0, 0, 0, 0);
    due.setHours(0, 0, 0, 0);

    if (due < today) return '#f8d7da';
    if (due.getTime() === today.getTime()) return '#fff3cd';

    return 'transparent';
  };

  return (
    <List>
      {tasks.map((task) => (
        <ListItem
          key={task.id}
          style={{ backgroundColor: getBackGroundColor(task) }}
        >
          <Checkbox
            checked={task.completed}
            onChange={() => onToggle(task.id)}
          />
          <ListItemText
            primary={task.title}
            secondary={`Due: ${task.dueDate}`}
          />
          <IconButton onClick={() => onEdit(task)}>
            <EditIcon />
          </IconButton>
          <IconButton onClick={() => onDelete(task.id)}>
            <DeleteIcon />
          </IconButton>
        </ListItem>
      ))}
    </List>
  );
};
export default TodoList;
