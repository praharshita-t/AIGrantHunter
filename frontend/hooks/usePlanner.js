import { useState, useEffect } from 'react';
import { plannerColumns } from '@/services/mockData';

export function usePlanner() {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('plannerTasks');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('plannerTasks', JSON.stringify(tasks));
  }, [tasks]);

  const [columns] = useState(plannerColumns);
  const [activeView, setActiveView] = useState('kanban'); // 'kanban', 'checklist', 'timeline', 'calendar'

  const moveTaskStatus = (taskId, newStatus) => {
    setTasks((prev) =>
      prev.map((task) => (task.id === taskId ? { ...task, status: newStatus } : task))
    );
  };

  const toggleSubtask = (taskId, subtaskId) => {
    setTasks((prev) =>
      prev.map((task) => {
        if (task.id !== taskId) return task;
        return {
          ...task,
          subtasks: task.subtasks.map((st) =>
            st.id === subtaskId ? { ...st, completed: !st.completed } : st
          ),
        };
      })
    );
  };

  const completedCount = tasks.filter((t) => t.status === 'done').length;
  const progressPercentage = Math.round((completedCount / (tasks.length || 1)) * 100);

  return {
    tasks,
    columns,
    activeView,
    setActiveView,
    moveTaskStatus,
    toggleSubtask,
    completedCount,
    totalTasks: tasks.length,
    progressPercentage,
  };
}
