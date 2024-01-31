import { executeQuery } from '../../db/mysql-client.js';
import { Employee } from '../../models/employee.js';
import { Sector } from '../../models/sector.js';
import { EmployeeServices } from "../employeeServices.js";

export default class EmployeeServicesImp implements EmployeeServices {
  constructor() {}

  public getAllEmployee = async (): Promise<Employee[]> => {
    try {
      const query = 'SELECT * FROM Employee';
      const results = await executeQuery(query);
      return results;
    } catch (error) {
      console.error(`Error trying to get data from Employee:`, error);
      return null;
    }
  };

  public getEmployees = async (
    ids: number[]
  ): Promise<Employee[] | null> => {
    try {
      console.log('ids', ids);
      const query = 'SELECT * FROM Employee WHERE id IN (?)';
      const results = await executeQuery(query, [ids]);
      return results;
    } catch (error) {
      console.error(`Error trying to get data from Employee:`, error);
      return null;
    }
  };

  public getAEmployee = async (id: number): Promise<Employee | null> => {
    try {
      const query = 'SELECT * FROM Employee WHERE id = ?';
      const results = await executeQuery(query, [id]);
      return results.length ? results[0] : null;
    } catch (error) {
      console.error(`Error trying to get data from Employee:`, error);
      return null;
    }
  };

  public isManager = async (userid: string): Promise<boolean> => {
    try {
      const query = 'SELECT * FROM Employee WHERE userid = ?';
      const results = await executeQuery(query, [userid]);
      
      return results.length === 0 ? false : results[0].position_name === parseInt(process.env.MANAGER);
    } catch (error) {
      console.error(`Error trying to get data from Employee:`, error);
      return null;
    }
  };

  public getAEmployeeByUserId = async (
    userId: string
  ): Promise<Employee | null> => {
    try {
      const query = 'SELECT * FROM Employee WHERE userid = ?';
      const results = await executeQuery(query, [userId]);
      return results.length ? results[0] : null;
    } catch (error) {
      console.error(`Error trying to get data from Employee:`, error);
      return null;
    }
  };

  public getManagers = async (sector: Sector): Promise<Employee[]> => {
    try {
      const MANAGER: number = 2;
      const query = 'SELECT * FROM Employee WHERE employee_Sector = ? AND position_name = ?';
      const results = await executeQuery(query, [sector.id, MANAGER]);
      return results;
    } catch (error) {
      console.error(`Error trying to delete Employee:`, error);
      return null;
    }
  };

  public updateAEmployee = async (
    id: number,
    updatedData: Partial<Employee>
  ): Promise<boolean> => {
    try {
      const query = 'UPDATE Employee SET ? WHERE id = ?';
      const results = await executeQuery(query, [updatedData, id]);
      return results.affectedRows > 0;
    } catch (error) {
      console.error(`Error trying to update Employee:`, error);
      return false;
    }
  };

  public deleteAEmployee = async (id: number): Promise<boolean> => {
    try {
      const query = 'DELETE FROM Employee WHERE id = ?';
      const results = await executeQuery(query, [id]);
      return results.affectedRows > 0;
    } catch (error) {
      console.error(`Error trying to delete Employee:`, error);
      return false;
    }
  };

  public createAEmployee = async (employee: Employee): Promise<Employee> => {
    try {
      const query = 'INSERT INTO Employee SET ?';
      const results = await executeQuery(query, [employee.getObjEmployee()]);
      return results.insertId ? employee : null;
    } catch (error) {
      console.error(`Error trying to create Employee:`, error);
      return null;
    }
  };
}
