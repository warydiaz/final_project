import Sector from "./sector.js";
import Holidays_type from "./holidaysType.js";

export class Employee {
  constructor(
    public id: number | undefined,
    public userId: string,
    public name: string,
    public document_type: number,
    public document_number: string,
    public current_hours_off: number,
    public position_name: string,
    public holidays_typeId: number,
    public employee_Sector: Sector,
    public holidays_type: Holidays_type
  ) {}
}
