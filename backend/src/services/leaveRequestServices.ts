import  {LeaveRequest}  from "../models/leaveRequest.js";
export default interface LeaveRequestServices{
    getAllLeaveRequest(): Promise<LeaveRequest[]>;
    getALeaveRequest(id: Number): Promise<LeaveRequest>;
    updateALeaveRequest(id: number, updatedData: Partial<LeaveRequest>): Promise<boolean>;
    deleteALeaveRequest(id: number): Promise<boolean>;
    createALeaveRequest(leaveRequest: LeaveRequest): Promise<LeaveRequest>;
};