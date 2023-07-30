import { Employee } from "../models/employee.js";
export interface EmployeeServices{
    getAllEmployee(): Promise<Employee[]>;
    getAEmployee(id: Number): Promise<Employee>;
    updateAEmployee(id: number, updatedData: Partial<Employee>): Promise<boolean>;
    deleteAEmployee(id: number): Promise<boolean>;
    createAEmployee(employee: Employee): Promise<Employee>;
};