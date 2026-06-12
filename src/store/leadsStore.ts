import { create } from 'zustand';
import { mockLeads } from '@/services/mockData';
import type { Lead, LeadStatus } from '@/types';

interface LeadsState {
  leads: Lead[];
  updateStatus: (id: string, status: LeadStatus) => void;
  addNote: (id: string, text: string) => void;
  createLead: (l: Lead) => void;
}

export const useLeadsStore = create<LeadsState>((set, get) => ({
  leads: mockLeads,
  updateStatus(id, status) {
    set({
      leads: get().leads.map((l) =>
        l.id === id ? { ...l, status, updatedAt: new Date().toISOString() } : l,
      ),
    });
  },
  addNote(id, text) {
    set({
      leads: get().leads.map((l) =>
        l.id === id
          ? {
              ...l,
              notes: [...(l.notes ?? []), { id: `nt-${Date.now()}`, text, createdAt: new Date().toISOString() }],
              updatedAt: new Date().toISOString(),
            }
          : l,
      ),
    });
  },
  createLead(l) {
    set({ leads: [l, ...get().leads] });
  },
}));
