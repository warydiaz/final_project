  export interface Sector {
    id: number;
    name: string;
    created_at: Date;
  }

  export interface HolidaysType {
    id: number;
    name: string;
    amount_of_days_off: number;
    country: string;
    created_at: Date;
  }

  export interface LeaveRequest {
    id: number;
    employeeId: number;
    start_date: Date;
    end_date: Date;
    hours_off_requested: number;
    status: string;
  }

  export interface Employee {
    id: number;
    name: string;
    employee_Sector: number;
    userid: string;
  }