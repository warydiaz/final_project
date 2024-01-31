import { executeQuery } from '../../db/mysql-client.js';
import { LeaveRequest } from '../../models/leaveRequest.js';
import { EmployeeServices } from '../employeeServices.js';
import  EmployeeServicesImp from './employeeServicesImpMysql.js';
import MailServices from '../../mail/mailsServices.js';
import { MailServicesImp } from '../../mail/mailsServicesImp.js';
import { SectorServices } from '../sectorServices.js';
import { SectorServicesImp } from '../supaBaseImp/sectorServicesImp.js';
import { Sector } from '../../models/sector.js';
import { Employee } from '../../models/employee.js';
import LeaveRequestServices from '../leaveRequestServices.js';

export class LeaveRequestServicesImp implements LeaveRequestServices {
  private employeeServices: EmployeeServices;
  private mail: MailServices;
  private sectorServices: SectorServices;

  constructor() {
    this.employeeServices = new EmployeeServicesImp();
    this.mail = new MailServicesImp();
    this.sectorServices = new SectorServicesImp();
  }

  public getAllLeaveRequest = async (): Promise<LeaveRequest[]> => {
    try {
      const query = 'SELECT * FROM LeaveRequest';
      const results = await executeQuery(query);
      return results;
    } catch (error) {
      console.error(`Error trying to get data from LeaveRequest:`, error);
      return null;
    }
  };

  public getALeaveRequest = async (id: number): Promise<LeaveRequest | null> => {
    try {
      const query = 'SELECT * FROM LeaveRequest WHERE id = ?';
      const results = await executeQuery(query, [id]);
      return results.length ? results[0] : null;
    } catch (error) {
      console.error(`Error trying to get data from LeaveRequest:`, error);
      return null;
    }
  };

  public getLeaveRequestUserId = async (
    userId: number
  ): Promise<LeaveRequest[] | null> => {
    try {
      const query = 'SELECT * FROM LeaveRequest WHERE employeeId = ?';
      const results = await executeQuery(query, [userId]);
      return results.length ? results : null;
    } catch (error) {
      console.error(`Error trying to get data from LeaveRequest:`, error);
      return null;
    }
  };

  public getLeaveRequestByTeam = async (
    userIdManager: number,
    status: string[]
  ): Promise<any[] | null> => {
    try {
      const employeeSectorResult = await executeQuery(
        'SELECT employee_Sector FROM Employee WHERE id = ?',
        [userIdManager]
      );

      if (!employeeSectorResult || !employeeSectorResult[0]) {
        console.error(
          `Error trying to get data from LeaveRequest: Employee sector not found.`
        );
        return null;
      }

      const employeeSector = employeeSectorResult[0].employee_Sector;

      const employeeIdsResult = await executeQuery(
        'SELECT id FROM Employee WHERE employee_Sector = ? AND id != ?',
        [employeeSector, userIdManager]
      );


      if (!employeeIdsResult) {
        console.error(
          `Error trying to get data from LeaveRequest: Employee IDs not found.`
        );
        return null;
      }

      let leaveRequestWithNameEmployee = [];

      if (employeeIdsResult.length > 0 ) {
        const employeeIds = employeeIdsResult.map((item) => item.id);
        const employeeNames = await this.employeeServices.getEmployees(employeeIds);

        const query = `SELECT * FROM LeaveRequest WHERE employeeId IN (?) AND status IN (?)`;
        const leaveRequestResults = await executeQuery(query, [employeeIds, status]);
        leaveRequestWithNameEmployee = leaveRequestResults.map((item) => {
          const employeeName = employeeNames.find((employee) => {
            return employee.id == item.employeeId;
          });
  
          item['name'] = employeeName ? employeeName.name : '';
  
          return item;
        });
      }

      return leaveRequestWithNameEmployee.length > 0 ? leaveRequestWithNameEmployee : null;
    } catch (error) {
      console.error(`Error trying to get data from LeaveRequest:`, error);
      return null;
    }
  };

  public deleteALeaveRequest = async (id: number): Promise<boolean> => {
    try {
      const query = 'DELETE FROM LeaveRequest WHERE id = ?';
      await executeQuery(query, [id]);
      return true;
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
      const query = 'UPDATE LeaveRequest SET ? WHERE id = ?';
      await executeQuery(query, [updatedData, id]);

      const updatedLeaveRequest: LeaveRequest = await this.getALeaveRequest(id);
      if (updatedLeaveRequest.status !== 'Requested') {
        this.sendEmailWhenALeaveRequestIsUpdated(updatedLeaveRequest);
      }

      return true;
    } catch (error) {
      console.error(`Error trying to update LeaveRequest:`, error);
      return false;
    }
  };

  public createALeaveRequest = async (
    leaveRequest: LeaveRequest
  ): Promise<LeaveRequest> => {
    try {
      const query = 'INSERT INTO LeaveRequest SET ?';
      const results = await executeQuery(query, [leaveRequest.getObjLeaveRequest()]);

      console.log(`LeaveRequest inserted successfully.`);
      this.sendEmailWhenALeaveRequestIsCreated(leaveRequest);

      return results.length ? results[0] : null;
    } catch (error) {
      console.error(`Error inserting LeaveRequest:`, error);
      return null;
    }
  };

  private sendEmailWhenALeaveRequestIsCreated = async (
    leaveRequest: LeaveRequest
  ) => {
    try {
      const employee: Employee = await this.employeeServices.getAEmployee(
        leaveRequest.employeeId
      );

      const sector: Sector = await this.sectorServices.getASector(
        employee.employee_Sector
      );

      const to = await this.getManagers(sector);

      this.mail.sendEmail({
        to: to,
        subject: `Leave Request for ${employee.name}`,
        text: `Hi, \n${employee.name}, has requested a leave from ${leaveRequest.startDate} to ${leaveRequest.endtDate}. Totaling ${leaveRequest.hours_off_requeted} hours requested. Best regards,`,
      });
    } catch (error) {
      console.error(`Error getting employee:`, error);
      return null;
    }
  };

  private sendEmailWhenALeaveRequestIsUpdated = async (
    leaveRequest: any
  ) => {
    try {
      const employee: Employee = await this.employeeServices.getAEmployee(
        leaveRequest.employeeId
      );

      this.mail.sendEmail({
        to: employee.userid,
        subject: `Leave Request ${leaveRequest.status}`,
        text: `Hi, ${employee.name}, \nyour leave request from ${leaveRequest.startDate} to ${leaveRequest.endDate}. Totaling ${leaveRequest.hours_off_requested} hours requested. Has been ${leaveRequest.status}.\nBest regards,`,
      });
    } catch (error) {
      console.error(`Error getting employee:`, error);
      return null;
    }
  };

  private getManagers = async (sector: Sector): Promise<string> => {
    try {
      const employee: Employee[] = await this.employeeServices.getManagers(
        sector
      );

      const to: string = employee.reduce((to: string, aEmployee: Employee) => {
        if (to.length > 0) {
          return to + `, ${aEmployee.userid}`;
        }
        return `${aEmployee.userid}`;
      }, '');
      return to;
    } catch (error) {
      console.error(`Error getting Managers:`, error);
      return null;
    }
  };
}
