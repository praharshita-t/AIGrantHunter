import { useState } from 'react';
import { notifications as initialNotifications } from '@/services/mockData';

export function useNotifications() {
  const [items, setItems] = useState(initialNotifications);
  const [filter, setFilter] = useState('all'); // 'all', 'unread', 'deadline', 'new_grant', 'application', 'planner'

  const markAsRead = (id) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, read: true } : item))
    );
  };

  const markAllAsRead = () => {
    setItems((prev) => prev.map((item) => ({ ...item, read: true })));
  };

  const filteredNotifications = items.filter((item) => {
    if (filter === 'unread') return !item.read;
    if (filter !== 'all') return item.type === filter;
    return true;
  });

  const unreadCount = items.filter((i) => !i.read).length;

  return {
    notifications: filteredNotifications,
    rawNotifications: items,
    unreadCount,
    filter,
    setFilter,
    markAsRead,
    markAllAsRead,
  };
}
