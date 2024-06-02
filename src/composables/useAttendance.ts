import { attendanceClient } from "@/api/axiosClients";
import { useAuthStore } from "@/stores/authStore";

export default function useAttendance() {
  const { token } = useAuthStore();
  const getAllAttendance = async (employeeId: string) => {
    try {
      const response = await attendanceClient.get(`/employee/${employeeId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error: any) {
      return error.response.data;
    }
  };

  const getAllAttendances = async () => {
    try {
      const response = await attendanceClient.get("/attendance/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error: any) {
      return error.response.data;
    }
  };

  // create new attendance record
  const createAttendance = async (payload: object) => {
    try {
      console.log("payload", payload);
      const response = await attendanceClient.post("/attendance/", payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error: any) {
      return error.response.data;
    }
  };

  return { getAllAttendance, createAttendance, getAllAttendances };
}
