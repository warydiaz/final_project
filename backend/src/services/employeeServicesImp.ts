import { EmployeeServices } from "./employeeServices.js";
import { Employee } from "../models/employee.js";
import supabase from "../db/supabase-client.js";
import { PostgrestResponse } from "@supabase/supabase-js";
import { Sector } from "@prisma/client";

export class EmployeeServicesImp implements EmployeeServices {
  constructor() {}

  public getAllEmployee = async (): Promise<Employee[]> => {
    try {
      const { data, error }: PostgrestResponse<Employee[]> = await supabase
        .from("Employee")
        .select("*");

      if (error) {
        console.error(`Error trying to get data from Employee":`, error);
        return null;
      } else {
        return data.flat();
      }
    } catch (error) {
      console.error(`Error trying to get data from Employee":`, error);
      return null;
    }
  };

  public getEmployees = async (
    ids: number[]
  ): Promise<Employee[] | null> => {
    try {
      const { data, error }: PostgrestResponse<Employee> = await supabase
        .from("Employee")
        .select("*")
        .in("id", ids);

      if (error) {
        console.error(`Error trying to get data from Employee":`, error);
        return null;
      } else {
        return data.length ? data : null;
      }
    } catch (error) {
      console.error(`Error trying to get data from Employee":`, error);
      return null;
    }
  };

  public getAEmployee = async (id: Number): Promise<Employee | null> => {
    try {
      const { data, error }: PostgrestResponse<Employee> = await supabase
        .from("Employee")
        .select("*")
        .eq("id", id);

      if (error) {
        console.error(`Error trying to get data from Employee":`, error);
        return null;
      } else {
        return data.length ? data[0] : null;
      }
    } catch (error) {
      console.error(`Error trying to get data from Employee":`, error);
      return null;
    }
  };

  public getAEmployeeByUserId = async (
    userId: string
  ): Promise<Employee | null> => {
    try {
      const { data, error }: PostgrestResponse<Employee> = await supabase
        .from("Employee")
        .select("*")
        .eq("userid", userId);

      if (error) {
        console.error(`Error trying to get data from Employee":`, error);
        return null;
      } else {
        return data.length ? data[0] : null;
      }
    } catch (error) {
      console.error(`Error trying to get data from Employee":`, error);
      return null;
    }
  };

  public deleteAEmployee = async (id: number): Promise<boolean> => {
    try {
      const { data, error }: PostgrestResponse<unknown> = await supabase
        .from("Employee")
        .delete()
        .eq("id", id);

      if (error) {
        console.error(`Error trying to delete Employee:`, error);
        return false;
      } else {
        return true;
      }
    } catch (error) {
      console.error(`Error trying to delete Employee:`, error);
      return false;
    }
  };

  public updateAEmployee = async (
    id: number,
    updatedData: Partial<Employee>
  ): Promise<boolean> => {
    try {
      const { data, error }: PostgrestResponse<unknown> = await supabase
        .from("Employee")
        .update(updatedData)
        .eq("id", id);

      if (error) {
        console.error(`Error trying to update Employee:`, error);
        return false;
      } else {
        return true;
      }
    } catch (error) {
      console.error(`Error trying to update Employee:`, error);
      return false;
    }
  };

  public createAEmployee = async (employee: Employee): Promise<Employee> => {
    try {
      const { data, error }: PostgrestResponse<Employee> = await supabase
        .from("Employee")
        .insert([employee.getObjEmployee()])
        .select();

      if (error) {
        console.error(`Error inserting Employee:`, error);
        return null;
      } else {
        console.log(`Employee inserted successfully.`);
        return data.length ? data[0] : null;
      }
    } catch (error) {
      console.error(`Error inserting Employee:`, error);
      return null;
    }
  };

  public getManagers = async (sector: Sector): Promise<Employee[]> => {
    try {
      const MANAGER: number = 2;
      const { data, error }: PostgrestResponse<Employee> = await supabase
        .from("Employee")
        .select("*")
        .eq("employee_Sector", sector.id)
        .eq("position_name", MANAGER);

      if (error) {
        console.error(`Error trying to delete Employee:`, error);
        return null;
      } else {
        return data;
      }
    } catch (error) {
      console.error(`Error trying to delete Employee:`, error);
      return null;
    }
  };
}
