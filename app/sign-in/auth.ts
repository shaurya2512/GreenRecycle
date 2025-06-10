"use client";
import { signOut } from "next-auth/react";


const isLocalStorageAvailable = typeof window !== 'undefined';


export const setToken = (token: string): void => {
  if (isLocalStorageAvailable) {
    localStorage.setItem('token', token);
    console.log('Token set:', token);
  }
};

export const getToken = () => {
  if (isLocalStorageAvailable) {
    const token = localStorage.getItem('token');
    return token;
  }
  return null;
};

export const isAuthenticated = () => {
  const token = getToken();
  const isAuth = !!token;
  return isAuth;
};

export const setUser = (user: any): void => {
  if (isLocalStorageAvailable) {
    try {
      if (user !== undefined && user !== null) {
        localStorage.setItem('user', JSON.stringify(user));
      } else {
        console.warn('Attempted to store undefined/null user.');
      }
    } catch (error) {
      console.error('Error setting user:', error);
    }
  }
};


export const getUser = (): any | null => {
  if (isLocalStorageAvailable) {
    try {
      const user = localStorage.getItem('user');
      if (!user || user === 'undefined') return null;
      return JSON.parse(user);
    } catch (error) {
      console.error('Error parsing user data:', error);
      return null;
    }
  }
  return null;
};


export const setUserID = (id: any): void => {
  if (isLocalStorageAvailable) {
    localStorage.setItem('id', id);
  }
};

export const getUserID = (): any | null => {
  if (isLocalStorageAvailable) {
    const userId = localStorage.getItem('id');
    return userId;
  }
  return null;
};



export const setUserName = (username: string): void => {
  if (isLocalStorageAvailable) {
    localStorage.setItem('username', username);
  }
};

export const getUserName = (): string | null => {
  if (isLocalStorageAvailable) {
    const username = localStorage.getItem('username');
    return username;
  }
  return null;
};

export const setfullname = (fullname: string): void => {
  if (isLocalStorageAvailable) {
    localStorage.setItem('fullname', fullname);
  }
};
export const getfullname = (): string | null => {
  if (isLocalStorageAvailable) {
    const fullname = localStorage.getItem('fullname');
    return fullname;
  }
  return null;
}

export const setEmail = (email: string): void => {
  if (isLocalStorageAvailable) {
    localStorage.setItem('email', email);
  }
};

export const getEmail = () => {
  if (isLocalStorageAvailable) {
    const email = localStorage.getItem('email');
    return email;
  }
  return null;
};

export const setPhoneNumber = (phoneNumber: string): void => {
  if (isLocalStorageAvailable) {
    localStorage.setItem('phoneNumber', phoneNumber);
  }
};

export const getPhoneNumber = (): string | null => {
  if (isLocalStorageAvailable) {
    const phoneNumber = localStorage.getItem('phoneNumber');
    return phoneNumber;
  }
  return null;
};

export const handleLogout = (): void => {
  signOut({ callbackUrl: "/sign-in" });
};

export const setUserRole = (role: string): void => {
  if (isLocalStorageAvailable) {
    localStorage.setItem('role', role);
  }
};

export const getUserRole = (): string | null => {
  if (isLocalStorageAvailable) {
    return localStorage.getItem('role');
  }
  return null;
};

