export class Employee {
  public id: number | undefined;
  public userId: string;
  public name: string;
  public document_type: number;
  public document_number: string;
  public current_hours_off: number;
  public position_name: string;
  public employee_Sector: Number;
  public holidays_type: Number;

  constructor(
    userId: string,
    name: string,
    document_type: number,
    document_number: string,
    current_hours_off: number,
    position_name: string,
    employee_Sector: Number,
    holidays_type: Number
  ) {
    this.id = undefined;
    this.userId = userId;
    this.name = name;
    this.document_type = document_type;
    this.document_number = document_number;
    this.current_hours_off = current_hours_off;
    this.position_name = position_name;
    this.employee_Sector = employee_Sector;
    this.holidays_type = holidays_type;
  }

  public setId(id: number): void {
    this.id = id;
  }

  public getObjEmployee(): any{
    const anEmployee = {
      "userid": this.userId,
      "name": this.name,
      "document_type": this.document_type,
      "document_number": this.document_number,
      "current_hours_off": this.current_hours_off,
      "position_name": this.position_name,
      "employee_Sector": this.employee_Sector,
      "holidays_typeId": this.holidays_type
    };
    return anEmployee;
  }

}
