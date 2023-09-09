import Sector from "../models/sector.js";
import { Employee } from "../models/employee.js";
export interface EmployeeServices {
  getAllEmployee(): Promise<Employee[]>;
  getAEmployee(id: Number): Promise<Employee>;
  getAEmployeeByUserId(UserId: string): Promise<Employee>;
  getManagers(sector: Sector): Promise<Employee[]>;
  updateAEmployee(id: number, updatedData: Partial<Employee>): Promise<boolean>;
  deleteAEmployee(id: number): Promise<boolean>;
  createAEmployee(employee: Employee): Promise<Employee>;
  getEmployees(ids: number[]): Promise<Employee[] | null>;
}
