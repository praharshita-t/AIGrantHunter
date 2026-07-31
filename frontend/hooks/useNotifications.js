import { useState, useEffect } from 'react';

export function useNotifications() {
  const [items, setItems] = useState([]);
  const [filter, setFilter] = useState('all');

  const fetchNotifications = () => {
    fetch('/api/notifications/')
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data)) {
          // Map backend schemas to expected frontend naming (type, read, message, etc.)
          const mapped = data.map((n) => ({
            id: n.id,
            type: n.type || 'new_grant',
            title: n.title,
            message: n.message,
            timestamp: new Date().toISOString(),
            read: n.read || false,
            group: 'Today',
          }));
          setItems(mapped);
        }
      })
      .catch((err) => console.error('Error fetching notifications:', err));
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const markAsRead = (id) => {
    fetch(`/api/notifications/${id}/read`, {
      method: 'PATCH',
    })
      .then((r) => r.json())
      .then(() => {
        setItems((prev) =>
          prev.map((item) => (item.id === id ? { ...item, read: true } : item))
        );
      })
      .catch((err) => console.error('Error marking notification read:', err));
  };

  const markAllAsRead = () => {
    // Send PATCH requests for all unread items
    const unread = items.filter((item) => !item.read);
    Promise.all(
      unread.map((item) =>
        fetch(`/api/notifications/${item.id}/read`, { method: 'PATCH' }).catch(console.error)
      )
    ).then(() => {
      setItems((prev) => prev.map((item) => ({ ...item, read: true })));
    });
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
