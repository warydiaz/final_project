import LeaveRequestServices from "./leaveRequestServices.js";
import {LeaveRequest}  from "../models/leaveRequest.js";
import supabase from "../db/supabase-client.js";
import { PostgrestResponse } from "@supabase/supabase-js";

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

  public getALeaveRequest = async (id: Number): Promise<LeaveRequest | null> => {
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

  public createALeaveRequest = async (leaveRequest: LeaveRequest): Promise<LeaveRequest> => {
    try {
      const { data, error }: PostgrestResponse<LeaveRequest> = await supabase
        .from("Leave_request")
        .insert([leaveRequest.getObjLeaveRequest()]);

      if (error) {
        console.error(`Error inserting LeaveRequest:`, error);
        return null;
      } else {
        console.log(`LeaveRequest inserted successfully.`);
        return data.length ? data[0] : null;
      }
    } catch (error) {
      console.error(`Error inserting LeaveRequest:`, error);
      return null;
    }
  };
}
