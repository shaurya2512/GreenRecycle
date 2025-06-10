// Store the user's role in localStorage
export const setUserRole = (role: string): void => {
      if (typeof window !== "undefined") {
            localStorage.setItem("role", role);
      }
};

// Retrieve the user's role from localStorage
export const getUserRole = (): string | null => {
      if (typeof window !== "undefined") {
            return localStorage.getItem("role");
      }
      return null;
};
