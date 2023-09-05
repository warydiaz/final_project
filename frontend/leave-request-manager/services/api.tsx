import {
  Sector,
  HolidaysType,
  DocumentType,
  Employee,
  Position,
  LeaveRequest,
} from "@/components/types";
import axios from "axios";
const API_URL = "http://localhost:3001";

export const fetchSectors = async (): Promise<Sector[]> => {
  try {
    const response = await axios.get<{ sector: Sector[] }>(`${API_URL}/sector`);
    const jsonData: Sector[] = response.data.sector;
    return jsonData;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const updateASector = async (
  sectorId: number,
  sector: string
): Promise<boolean> => {
  try {
    const updatedSectorResponse = await axios.put(
      `${API_URL}/sector/${sectorId}`,
      { name: sector }
    );
    const wasUpdated: boolean = updatedSectorResponse.data;

    return wasUpdated;
  } catch (error) {
    console.error("Error updating sector:", error);
    throw error;
  }
};

export const addASector = async (name: string): Promise<boolean> => {
  try {
    const addSectorResponse = await axios.post(`${API_URL}/sector`, {
      name: name,
    });
    const wasAdded: boolean = addSectorResponse.data.ok;
    return wasAdded;
  } catch (error) {
    console.error("Error adding data:", error);
    throw error;
  }
};

export const deleteASector = async (sectionId: number): Promise<boolean> => {
  try {
    const deleteResponse = await axios.delete(`${API_URL}/sector/${sectionId}`);
    const wasDeleted: boolean = deleteResponse.data;
    return wasDeleted;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const fetchHolidaysType = async (): Promise<HolidaysType[]> => {
  try {
    const response = await axios.get<{ holidaysType: HolidaysType[] }>(
      `${API_URL}/holidaysType`
    );
    const jsonData: HolidaysType[] = response.data.holidaysType;
    return jsonData;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const deleteAHolidayType = async (holidayTypeId: number) => {
  try {
    const deleteResponse = await axios.delete(
      `${API_URL}/holidaysType/${holidayTypeId}`
    );
    const wasDeleted: boolean = deleteResponse.data;

    return wasDeleted;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const fetchDocumetType = async (): Promise<DocumentType[]> => {
  try {
    const response = await axios.get<{ documentType: DocumentType[] }>(
      `${API_URL}/documentType`
    );
    const jsonData: DocumentType[] = response.data.documentType;
    return jsonData;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const fetchPositions = async (): Promise<Position[]> => {
  try {
    const response = await axios.get<{ sector: Position[] }>(
      `${API_URL}/position`
    );
    const jsonData: Position[] = response.data.Position;
    return jsonData;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const updateAPosition = async (
  positionId: number,
  position: string
): Promise<Boolean> => {
  try {
    const updatedPositionResponse = await axios.put(
      `${API_URL}/Position/${positionId}`,
      { name: position }
    );
    const wasUpdated: boolean = updatedPositionResponse.data;

    return wasUpdated;
  } catch (error) {
    console.error("Error adding data:", error);
    throw error;
  }
};

export const deleteAPosition = async (positionId: number): Promise<boolean> => {
  try {
    const deleteResponse = await axios.delete(
      `${API_URL}/position/${positionId}`
    );
    const wasDeleted: boolean = deleteResponse.data;

    return wasDeleted;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const addAPosition = async (name: string): Promise<boolean> => {
  try {
    const addPositionResponse = await axios.post(`${API_URL}/Position`, {
      name: name,
    });
    const wasAdded: boolean = addPositionResponse.data.ok;
    return wasAdded;
  } catch (error) {
    console.error("Error adding data:", error);
    throw error;
  }
};

export const fetchEmployees = async (): Promise<Employee[]> => {
  try {
    const response = await axios.get<{ employee: Employee[] }>(
      `${API_URL}/employee`
    );
    const jsonData: Employee[] = response.data.employee;
    return jsonData;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const fetchAEmployee = async (employeeId: number): Promise<Employee> => {
  try {
    const response = await axios.get<{ employee: Employee }>(
      `${API_URL}/employee/${employeeId}`
    );
    const jsonData: Employee = response.data;

    return jsonData;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const fetchAEmployeeByUserId = async (
  userId: string
): Promise<Employee> => {
  try {
    const addLeaveRequestResponse = await axios.post(
      `${API_URL}/employee/userid`,
      {
        userid: userId,
      }
    );

    const exist = addLeaveRequestResponse.data;

    return exist;
  } catch (error) {
    console.error("Error adding data:", error);
    throw error;
  }
};

export const deleteAEmployee = async (employeeId: number): Promise<boolean> => {
  try {
    const deleteResponse = await axios.delete(
      `${API_URL}/employee/${employeeId}`
    );

    const wasDeleted: boolean = deleteResponse.data;

    return wasDeleted;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const addAEmployee = async (
  email: string,
  name: string,
  documentType: number,
  documentNumber: string,
  position: number,
  holidaysType: number,
  sector: number
): Promise<boolean> => {
  try {
    const addEmployeeResponse = await axios.post(`${API_URL}/employee`, {
      userid: email,
      name: name,
      document_type: documentType,
      document_number: documentNumber,
      current_hours_off: 0,
      position_name: position,
      holidays_typeId: holidaysType,
      employee_Sector: sector,
    });
    const wasAdded: boolean = addEmployeeResponse.data.ok;

    return wasAdded;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const updateAEmployee = async (
  employeeId: number,
  email: string,
  name: string,
  documentType: number,
  documentNumber: string,
  currentHoursOff: number,
  positionName: number,
  holidaysType: number,
  sector: number
): Promise<boolean> => {
  try {
    const updateEmployeeResponse = await axios.put(
      `${API_URL}/employee/${employeeId}`,
      {
        userid: email,
        name: name,
        document_type: documentType,
        document_number: documentNumber,
        current_hours_off: currentHoursOff,
        position_name: positionName,
        holidays_typeId: holidaysType,
        employee_Sector: sector,
      }
    );
    const wasAdded: boolean = updateEmployeeResponse.data;
    return wasAdded;
  } catch (error) {
    console.error("Error adding data:", error);
    throw error;
  }
};

export const updateALeaveRequest = async (
  id: number,
  startDate: string,
  endDate: String,
  hoursOffRequested: number,
  status?:string
): Promise<boolean> => {
  try {
    const updateLeaveRequestResponse = await axios.put(
      `${API_URL}/leaveRequest/${id}`,
      {
        start_date: startDate,
        end_date: endDate,
        hours_off_requested: hoursOffRequested,
        status:status
      }
    );

    const updated: boolean = updateLeaveRequestResponse.data;

    return updated;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const deleteALeaveRequest = async (
  leaveRequestId: number
): Promise<boolean> => {
  try {
    const deleteResponse = await axios.delete(
      `${API_URL}/leaveRequest/${leaveRequestId}`
    );
    const wasDeleted: boolean = deleteResponse.data;
    return wasDeleted;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const fetchLeaveRequest = async (userId: number): Promise<LeaveRequest[]> => {
  try {
    const fetchLeaveRequestResponse = await axios.post(
      `${API_URL}/leaveRequest/userid`,
      {
        userid: userId,
      }
    );
    const jsonData: LeaveRequest[] = fetchLeaveRequestResponse.data;
    return jsonData;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const fetchLeaveRequestByManager = async (userId: number, status:string[]): Promise<any[]> => {
  try {
    const fetchLeaveRequestResponse = await axios.post(
      `${API_URL}/leaveRequest/managerid`,
      {
        managerid: userId,
        status:status
      }
    );
    const jsonData: LeaveRequest[] = fetchLeaveRequestResponse.data;
    return jsonData;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const fetchALeaveRequest = async (id: number): Promise<LeaveRequest> => {
  try {
    const leaveRequestResponse = await axios.get(
      `${API_URL}/leaveRequest/${id}`
    );
    const leaveRequest: LeaveRequest = leaveRequestResponse.data;
    return leaveRequest;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const AddALeaveRequest = async (
  id: number,
  startDate: string,
  endDate: string,
  hoursOffRequested: number
): Promise<boolean> => {
  try {
    const addLeaveRequestResponse = await axios.post(
      `${API_URL}/leaveRequest`,
      {
        employeeId: id,
        startDate: startDate,
        endtDate: endDate,
        hours_off_requeted: hoursOffRequested,
        status: "Requested",
      }
    );
    const wasAdded: boolean = addLeaveRequestResponse.data.ok;

    return wasAdded;
  } catch (error) {
    console.error("Error adding data:", error);
    throw error;
  }
};

export const addAHolidaysType = async (
  country: string,
  amountOfDaysOff: number,
  nameOfTypeDaysOff: string
): Promise<Boolean> => {
  try {
    const addHolidaysTypeResponse = await axios.post(
      `${API_URL}//holidaysType`,
      {
        country: country,
        amount_of_days_off: amountOfDaysOff,
        name: nameOfTypeDaysOff,
      }
    );
    const wasAdded: boolean = addHolidaysTypeResponse.data.ok;
    return wasAdded;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const updateAHolidaysType = async (
  holidaysTypeId: number,
  holidaysTypeCountry: string,
  amountOfDaysOff: number,
  nametOfDaysOff: string
): Promise<boolean> => {
  try {
    const updatedHolidaysTypeResponse = await axios.put(
      `${API_URL}/HolidaysType/${holidaysTypeId}`,
      {
        country: holidaysTypeCountry,
        amount_of_days_off: amountOfDaysOff,
        name: nametOfDaysOff,
      }
    );
    const wasUpdated: boolean = updatedHolidaysTypeResponse.data;

    return wasUpdated;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};
