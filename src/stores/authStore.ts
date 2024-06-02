import { defineStore } from "pinia";
import {
  authClient,
  employeeClient,
  attendanceClient,
} from "@/api/axiosClients";
import useCrypto from "@/composables/useCrypto";

// auth store to manage user authentication, store token to local storage, etci

interface User {
  id: string;
  email: string;
  password: string;
  role: string;
}

const { encrypt, decrypt } = useCrypto();

export const TOKEN_LOCAL_STORAGE_KEY = "tkn";
export const USER_LOCAL_STORAGE_KEY = "usr";

export const useAuthStore = defineStore({
  id: "auth",
  state: () => ({
    token: (localStorage.getItem(TOKEN_LOCAL_STORAGE_KEY)
      ? decrypt(localStorage.getItem(TOKEN_LOCAL_STORAGE_KEY) as string)
      : null) as string | null,
    user: (localStorage.getItem(USER_LOCAL_STORAGE_KEY)
      ? decrypt(localStorage.getItem(USER_LOCAL_STORAGE_KEY) as string)
      : null) as User | null,
  }),
  getters: {
    isAuthenticated: (state) => !!state.token,
    getUserRole: (state) => state.user?.role,
  },
  actions: {
    async getProfile() {
      if (this.user?.role === "user") {
        const data = await employeeClient.get(
          `/employee/user/${this.user.id}`,
          {
            headers: {
              Authorization: `Bearer ${this.token}`,
            },
          }
        );
        console.log("full response", data);
        return data.data;
      }
      return {
        id: "admin",
        full_name: "Admin",
        position: "HR Admin",
        department: "HR",
      };
    },
    async login(payload: { email: string; password: string }) {
      const { data } = await authClient.post("/login", payload);
      this.token = data.token;
      this.user = data.user;
      localStorage.setItem(TOKEN_LOCAL_STORAGE_KEY, encrypt(data.token));
      localStorage.setItem(USER_LOCAL_STORAGE_KEY, encrypt(data.user));

      // set axios client authorization header
      authClient.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${data.token}`;

      employeeClient.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${data.token}`;

      attendanceClient.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${data.token}`;

      return data;
    },
    logout() {
      this.token = null;
      this.user = null;
      localStorage.removeItem(TOKEN_LOCAL_STORAGE_KEY);
      localStorage.removeItem(USER_LOCAL_STORAGE_KEY);
    },
  },
});
