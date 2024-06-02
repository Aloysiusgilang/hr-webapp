import { attendanceClient } from "@/api/axiosClients";

export default function useAttendance() {
  // fetch all attendance records by employee id
  const getAllAttendance = async (employeeId: string) => {
    try {
      const response = await attendanceClient.get(`/employee/${employeeId}`);
      return response.data;
    } catch (error: any) {
      return error.response.data;
    }
  };

  // create new attendance record
  const createAttendance = async (payload: object) => {
    try {
      const response = await attendanceClient.post("/attendance/", payload);
      return response.data;
    } catch (error: any) {
      return error.response.data;
    }
  };

  const getAttendanceByDate = async (employeeId: string, date: string) => {
    try {
      const response = await attendanceClient.get(
        `/employee/${employeeId}/date/${date}`
      );
      return response.data;
    } catch (error: any) {
      return error.response.data;
    }
  };

  return { getAllAttendance, createAttendance, getAttendanceByDate };
}
