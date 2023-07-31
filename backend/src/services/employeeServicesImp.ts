import { EmployeeServices } from "./employeeServices.js";
import { Employee } from "../models/employee.js";
import supabase from "../db/supabase-client.js";
import { PostgrestResponse } from "@supabase/supabase-js";

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
        .insert([employee.getObjEmployee()]);

      if (error) {
        console.error(`Error inserting Employee:`, error);
        return data.length ? data[0] : null;
      } else {
        console.log(`Employee inserted successfully.`);
        return null;
      }
    } catch (error) {
      console.error(`Error inserting Employee:`, error);
      return null;
    }
  };
}
