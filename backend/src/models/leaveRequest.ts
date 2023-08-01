export class LeaveRequest {
  public id: number | undefined;
  public employeeId: string;
  public startDate: Date;
  public endtDate: Date;
  public hours_off_requeted: number;
  public status: string;

  constructor(
    employeeId: string,
    startDate: Date,
    endtDate: Date,
    hours_off_requeted: number,
    status: string
  ) {
    this.id = undefined;
    this.employeeId = employeeId;
    this.startDate = startDate;
    this.endtDate = endtDate;
    this.hours_off_requeted = hours_off_requeted;
    this.status = status;
  }

  public setId(id: number): void {
    this.id = id;
  }

  public getObjLeaveRequest(): any{
    const aLeaveRequest = {
      "employeeId": this.employeeId,
      "startDate": this.startDate,
      "endtDate": this.endtDate,
      "hours_off_requeted": this.hours_off_requeted,
      "status": this.status
    };
    return aLeaveRequest;
  }

}
