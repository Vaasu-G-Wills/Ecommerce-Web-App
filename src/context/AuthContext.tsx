import React, { createContext, useContext, useState, useEffect } from 'react';
import type { UserAddress } from '../types';
import { INITIAL_ADDRESSES } from '../data/categories';

interface UserProfile {
  name: string;
  email: string;
  phone: string;
  isPrimeMember: boolean;
  avatar: string;
}

interface AuthContextType {
  user: UserProfile;
  addresses: UserAddress[];
  selectedAddress: UserAddress;
  togglePrimeMembership: () => void;
  selectAddress: (id: string) => void;
  addAddress: (address: Omit<UserAddress, 'id'>) => void;
  deleteAddress: (id: string) => void;
  updateUser: (updates: Partial<UserProfile>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('primetech_user');
    return saved
      ? JSON.parse(saved)
      : {
          name: 'Aarav Sharma',
          email: 'aarav.sharma@example.in',
          phone: '+91 98765 43210',
          isPrimeMember: true,
          avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
        };
  });

  const [addresses, setAddresses] = useState<UserAddress[]>(() => {
    const saved = localStorage.getItem('primetech_addresses');
    return saved ? JSON.parse(saved) : INITIAL_ADDRESSES;
  });

  const [selectedAddressId, setSelectedAddressId] = useState<string>(() => {
    const saved = localStorage.getItem('primetech_selected_address_id');
    if (saved) return saved;
    const defaultAddr = addresses.find((a) => a.isDefault);
    return defaultAddr ? defaultAddr.id : addresses[0]?.id || 'addr-1';
  });

  useEffect(() => {
    localStorage.setItem('primetech_user', JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem('primetech_addresses', JSON.stringify(addresses));
  }, [addresses]);

  useEffect(() => {
    localStorage.setItem('primetech_selected_address_id', selectedAddressId);
  }, [selectedAddressId]);

  const togglePrimeMembership = () => {
    setUser((prev) => ({ ...prev, isPrimeMember: !prev.isPrimeMember }));
  };

  const selectAddress = (id: string) => {
    setSelectedAddressId(id);
  };

  const addAddress = (addressData: Omit<UserAddress, 'id'>) => {
    const newAddr: UserAddress = {
      ...addressData,
      id: `addr-${Date.now()}`,
    };
    if (newAddr.isDefault) {
      setAddresses((prev) => prev.map((a) => ({ ...a, isDefault: false })).concat(newAddr));
    } else {
      setAddresses((prev) => [...prev, newAddr]);
    }
    setSelectedAddressId(newAddr.id);
  };

  const deleteAddress = (id: string) => {
    if (addresses.length <= 1) return; // keep at least 1
    const next = addresses.filter((a) => a.id !== id);
    setAddresses(next);
    if (selectedAddressId === id) {
      setSelectedAddressId(next[0].id);
    }
  };

  const updateUser = (updates: Partial<UserProfile>) => {
    setUser((prev) => ({ ...prev, ...updates }));
  };

  const selectedAddress = addresses.find((a) => a.id === selectedAddressId) || addresses[0];

  return (
    <AuthContext.Provider
      value={{
        user,
        addresses,
        selectedAddress,
        togglePrimeMembership,
        selectAddress,
        addAddress,
        deleteAddress,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
