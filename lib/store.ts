import { create } from 'zustand';

interface UserState {
  user: {
    email: string;
    subscription: 'basic' | 'premium' | null;
    isGuest?: boolean;
  } | null;
  selectedServices: string[];
  setUser: (user: UserState['user']) => void;
  setSelectedServices: (services: string[]) => void;
  clearSelectedServices: () => void;
  loginAsGuest: () => void;
  logout: () => void;
}

export const useStore = create<UserState>((set) => ({
  user: null,
  selectedServices: [],
  setUser: (user) => set({ user }),
  setSelectedServices: (services) => set({ selectedServices: services }),
  clearSelectedServices: () => set({ selectedServices: [] }),
  loginAsGuest: () => set({ 
    user: { 
      email: 'guest@luxesalon.com', 
      subscription: null, 
      isGuest: true 
    } 
  }),
  logout: () => set({ user: null, selectedServices: [] })
}));