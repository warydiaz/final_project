  export interface Sector {
    id: number;
    name: string;
  }

  export interface Position {
    id: number;
    name: string;
  }


  export interface HolidaysType {
    id: number;
    name: string;
    amount_of_days_off: number;
    country: string;
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
    document_type: number;
    document_number: string;
    current_hours_off: number;
    userid: string;
    holidays_typeId:number;
    employee_Sector:number;
    position_name: number;
  }

  export interface DocumentType {
    id: number;
    name: string;
  }

  export interface Report {
    id: number;
    name: string;
  }