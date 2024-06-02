// src/api/axiosClients.js

import axios from "axios";

export const authClient = axios.create({
  baseURL: import.meta.env.VITE_AUTH_BASE_URL,
  timeout: 100000,
});

export const attendanceClient = axios.create({
  baseURL: import.meta.env.VITE_ATTENDANCE_BASE_URL,
  timeout: 100000,
});

export const employeeClient = axios.create({
  baseURL: import.meta.env.VITE_EMPLOYEE_BASE_URL,
  timeout: 100000,
});
