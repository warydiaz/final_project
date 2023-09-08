import LeaveRequestServices from "./leaveRequestServices.js";
import { LeaveRequest } from "../models/leaveRequest.js";
import supabase from "../db/supabase-client.js";
import { PostgrestResponse } from "@supabase/supabase-js";
import { Employee } from "../models/employee.js";
import MailServices from "../mail/mailsServices.js";
import { MailServicesImp } from "../mail/mailsServicesImp.js";
import Sector from "../models/sector.js";
import { EmployeeServices } from "./employeeServices.js";
import { EmployeeServicesImp } from "./employeeServicesImp.js";
import SectorServices from "./sectorServices.js";
import { SectorServicesImp } from "./sectorServicesImp.js";

export class LeaveRequestServicesImp implements LeaveRequestServices {
  constructor() {}

  public getAllLeaveRequest = async (): Promise<LeaveRequest[]> => {
    try {
      const { data, error }: PostgrestResponse<LeaveRequest[]> = await supabase
        .from("Leave_request")
        .select("*");

      if (error) {
        console.error(`Error trying to get data from LeaveRequest":`, error);
        return null;
      } else {
        return data.flat();
      }
    } catch (error) {
      console.error(`Error trying to get data from LeaveRequest":`, error);
      return null;
    }
  };

  public getALeaveRequest = async (
    id: Number
  ): Promise<LeaveRequest | null> => {
    try {
      const { data, error }: PostgrestResponse<LeaveRequest> = await supabase
        .from("Leave_request")
        .select("*")
        .eq("id", id);

      if (error) {
        console.error(`Error trying to get data from LeaveRequest":`, error);
        return null;
      } else {
        return data.length ? data[0] : null;
      }
    } catch (error) {
      console.error(`Error trying to get data from LeaveRequest":`, error);
      return null;
    }
  };

  public getLeaveRequestUserId = async (
    userId: Number
  ): Promise<LeaveRequest[] | null> => {
    try {
      const { data, error }: PostgrestResponse<LeaveRequest> = await supabase
        .from("Leave_request")
        .select("*")
        .eq("employeeId", userId);

      if (error) {
        console.error(`Error trying to get data from LeaveRequest":`, error);
        return null;
      } else {
        return data.length ? data : null;
      }
    } catch (error) {
      console.error(`Error trying to get data from LeaveRequest":`, error);
      return null;
    }
  };

  public getLeaveRequestByTeam = async (
    userIdManager: number,
    status: string[]
  ): Promise<any[] | null> => {
    try {
      const employeeSectorResult = await supabase
        .from("Employee")
        .select("employee_Sector")
        .eq("id", userIdManager)
        .single();

      if (employeeSectorResult.error) {
        console.error(
          `Error trying to get data from LeaveRequest":`,
          employeeSectorResult.error
        );
        return null;
      } else {
        const employeeSector = employeeSectorResult.data.employee_Sector;

        const employeeIdsResult = await supabase
          .from("Employee")
          .select("id")
          .eq("employee_Sector", employeeSector)
          .neq("id", userIdManager);

        if (employeeIdsResult.error) {
          console.error(
            `Error trying to get data from LeaveRequest":`,
            employeeIdsResult.error
          );
          return null;
        } else {
          const employeeIds = employeeIdsResult.data.map((item) => item.id);

          const employeeNames = await this.getANamesEmployees(employeeIds);

          const { data, error } = await supabase
            .from("Leave_request")
            .select("*")
            .in("employeeId", employeeIds)
            .in("status", status);

          const leaveRequestWithNameEmployee = data.map((item) => {
            const employeeName = employeeNames.find((employee) => {
              if (employee.id == item.employeeId) {
                return employee;
              }
            });

            item["name"] = employeeName.name;

            return item;
          });

          if (error) {
            console.error(
              `Error trying to get data from LeaveRequest":`,
              error
            );
            return null;
          } else {
            return leaveRequestWithNameEmployee.length
              ? leaveRequestWithNameEmployee
              : null;
          }
        }
      }
    } catch (error) {
      console.error(`Error trying to get data from LeaveRequest":`, error);
      return null;
    }
  };

  private getANamesEmployees = async (
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

  public deleteALeaveRequest = async (id: number): Promise<boolean> => {
    try {
      const { data, error }: PostgrestResponse<unknown> = await supabase
        .from("Leave_request")
        .delete()
        .eq("id", id);

      if (error) {
        console.error(`Error trying to delete LeaveRequest:`, error);
        return false;
      } else {
        return true;
      }
    } catch (error) {
      console.error(`Error trying to delete LeaveRequest:`, error);
      return false;
    }
  };

  public updateALeaveRequest = async (
    id: number,
    updatedData: Partial<LeaveRequest>
  ): Promise<boolean> => {
    try {
      const { data, error }: PostgrestResponse<unknown> = await supabase
        .from("Leave_request")
        .update(updatedData)
        .eq("id", id);

      if (error) {
        console.error(`Error trying to update LeaveRequest:`, error);
        return false;
      } else {
        return true;
      }
    } catch (error) {
      console.error(`Error trying to update LeaveRequest:`, error);
      return false;
    }
  };

  public createALeaveRequest = async (
    leaveRequest: LeaveRequest
  ): Promise<LeaveRequest> => {
    try {
      const { data, error }: PostgrestResponse<LeaveRequest> = await supabase
        .from("Leave_request")
        .insert([leaveRequest.getObjLeaveRequest()])
        .select();

      if (error) {
        console.error(`Error inserting LeaveRequest:`, error);
        return null;
      } else {
        console.log(`LeaveRequest inserted successfully.`);
        this.sendEmailWhenALeaveRequestIsCreayed(leaveRequest);
        return data.length ? data[0] : null;
      }
    } catch (error) {
      console.error(`Error inserting LeaveRequest:`, error);
      return null;
    }
  };

  private sendEmailWhenALeaveRequestIsCreayed = async (
    leaveRequest: LeaveRequest
  ) => {
    try {
        const employeeServices:EmployeeServices = new EmployeeServicesImp();
        const employee: Employee = await employeeServices.getAEmployee(leaveRequest.employeeId);
        const sectorServices:SectorServices = new SectorServicesImp();
        const sector: Sector = await sectorServices.getASector(employee.employee_Sector)
        const to = await this.getManagers(sector);
        
        const mail: MailServices = new MailServicesImp();
        mail.sendEmail({
          to: to,
          subject: `Leave Request for ${employee.name}`,
          text: `Hi, \n${employee.name}, has requested a leave from ${leaveRequest.startDate} to ${leaveRequest.endtDate}.\nTotaling ${leaveRequest.hours_off_requeted} ours requested. \nBest regards,`,
        });
      
    } catch (error) {
      console.error(`Error getting employee:`, error);
      return null;
    }
  };

  private getManagers = async (sector: Sector):Promise<string> => {
    try {
      const employeeServices:EmployeeServices = new EmployeeServicesImp();
      const employee: Employee[] = await employeeServices.getManagers(sector);

      const to:string = employee.reduce((to:string, aEmployee:Employee) => {
        return to + `, ${aEmployee.userId}`;
      },"");

      return to;
      
    } catch (error) {
      console.error(`Error getting Managers:`, error);
      return null;
    }
  };
}
