import { createContext, useContext, useState, ReactNode } from 'react';
import type { MiniApplication, Department, Role, Permission } from '@shared/schema';

interface AppContextType {
  // Search state
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  
  // Modal states
  isAddAppModalOpen: boolean;
  setIsAddAppModalOpen: (open: boolean) => void;
  isAddUserModalOpen: boolean;
  setIsAddUserModalOpen: (open: boolean) => void;
  isRoleModalOpen: boolean;
  setIsRoleModalOpen: (open: boolean) => void;
  
  // Selected items for editing
  selectedApp: MiniApplication | null;
  setSelectedApp: (app: MiniApplication | null) => void;
  selectedRole: Role | null;
  setSelectedRole: (role: Role | null) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddAppModalOpen, setIsAddAppModalOpen] = useState(false);
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
  const [isRoleModalOpen, setIsRoleModalOpen] = useState(false);
  const [selectedApp, setSelectedApp] = useState<MiniApplication | null>(null);
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);

  return (
    <AppContext.Provider
      value={{
        searchQuery,
        setSearchQuery,
        isAddAppModalOpen,
        setIsAddAppModalOpen,
        isAddUserModalOpen,
        setIsAddUserModalOpen,
        isRoleModalOpen,
        setIsRoleModalOpen,
        selectedApp,
        setSelectedApp,
        selectedRole,
        setSelectedRole,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
}
