export class LeaveRequest {
  public id: number | undefined;
  public employeeId: number;
  public startDate: Date;
  public endtDate: Date;
  public hours_off_requeted: number;
  public status: string;

  constructor(
    employeeId: number,
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
      "start_date": this.startDate,
      "end_date": this.endtDate,
      "hours_off_requested": this.hours_off_requeted,
      "status": this.status
    };
    return aLeaveRequest;
  }

}
