import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface AuthState {
  token: string;
  setToken: (token: string) => void;
  clearToken: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: "", 
      setToken: (token) => set({ token }),
      clearToken: () => set({ token: "" }),
    }),
    {
      name: 'api-token', 
      storage: createJSONStorage(() => localStorage), 
      
      partialize: (state) => ({ token: state.token }), 
    }
  )
);