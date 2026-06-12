import { create } from 'zustand';

interface FavoritesState {
  favorites: Record<string, true>; // service ids
  compareList: string[];
  toggleFavorite: (serviceId: string) => void;
  isFavorite: (serviceId: string) => boolean;
  toggleCompare: (serviceId: string) => void;
  isInCompare: (serviceId: string) => boolean;
  clearCompare: () => void;
}

export const useFavoritesStore = create<FavoritesState>((set, get) => ({
  favorites: {},
  compareList: [],
  toggleFavorite(id) {
    const cur = { ...get().favorites };
    if (cur[id]) delete cur[id];
    else cur[id] = true;
    set({ favorites: cur });
  },
  isFavorite(id) {
    return !!get().favorites[id];
  },
  toggleCompare(id) {
    const cur = get().compareList;
    if (cur.includes(id)) set({ compareList: cur.filter((x) => x !== id) });
    else if (cur.length < 3) set({ compareList: [...cur, id] });
  },
  isInCompare(id) {
    return get().compareList.includes(id);
  },
  clearCompare() {
    set({ compareList: [] });
  },
}));
