import { Employee } from "./employee";

export interface Attendance {
  id: string;
  date: string;
  employee_id: string;
  photo_url: string;
  timestamp: string;
  employee?: Employee;
}
