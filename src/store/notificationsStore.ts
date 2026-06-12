import { create } from 'zustand';
import { mockNotifications } from '@/services/mockData';
import type { NotificationItem } from '@/types';

interface NotificationsState {
  items: NotificationItem[];
  unreadCount: () => number;
  markAllRead: () => void;
  markRead: (id: string) => void;
  push: (n: NotificationItem) => void;
}

export const useNotificationsStore = create<NotificationsState>((set, get) => ({
  items: mockNotifications,
  unreadCount() {
    return get().items.filter((n) => !n.read).length;
  },
  markAllRead() {
    set({ items: get().items.map((n) => ({ ...n, read: true })) });
  },
  markRead(id) {
    set({ items: get().items.map((n) => (n.id === id ? { ...n, read: true } : n)) });
  },
  push(n) {
    set({ items: [n, ...get().items] });
  },
}));
