import HolidaysTypeServices from "./holidaysTypeServices.js";
import HolidaysType from "../models/holidaysType.js"
import supabase from "../db/supabase-client.js";
import { PostgrestResponse } from "@supabase/supabase-js";

export class HolidaysTypeServicesImp implements HolidaysTypeServices {
  constructor() {}

  public getAllHolidaysType = async (): Promise<HolidaysType[]> => {
    try {
      const { data, error }: PostgrestResponse<HolidaysType[]> = await supabase
        .from("Holidays_Type")
        .select("*");

      if (error) {
        console.error(`Error trying to get data from HolidaysType":`, error);
        return null;
      } else {
        return data.flat();
      }
    } catch (error) {
      console.error(`Error trying to get data from HolidaysType":`, error);
      return null;
    }
  };

  public getAHolidaysType = async (id: Number): Promise<HolidaysType | null> => {
    try {
      const { data, error }: PostgrestResponse<HolidaysType> = await supabase
        .from("Holidays_Type")
        .select("*")
        .eq("id", id);

      if (error) {
        console.error(`Error trying to get data from HolidaysType":`, error);
        return null;
      } else {
        return data.length ? data[0] : null;
      }
    } catch (error) {
      console.error(`Error trying to get data from HolidaysType":`, error);
      return null;
    }
  };

  public deleteAHolidaysType = async (id: number): Promise<boolean> => {
    try {
      const { data, error }: PostgrestResponse<unknown> = await supabase
        .from("Holidays_Type")
        .delete()
        .eq("id", id);

      if (error) {
        console.error(`Error trying to delete HolidaysType:`, error);
        return false;
      } else {
        return true;
      }
    } catch (error) {
      console.error(`Error trying to delete HolidaysType:`, error);
      return false;
    }
  };

  public updateAHolidaysType = async (
    id: number,
    updatedData: Partial<HolidaysType>
  ): Promise<boolean> => {
    try {
      const { data, error }: PostgrestResponse<unknown> = await supabase
        .from("Holidays_Type")
        .update(updatedData)
        .eq("id", id);

      if (error) {
        console.error(`Error trying to update HolidaysType:`, error);
        return false;
      } else {
        return true;
      }
    } catch (error) {
      console.error(`Error trying to update HolidaysType:`, error);
      return false;
    }
  };

  public createAHolidaysType = async (HolidaysType: HolidaysType): Promise<HolidaysType> => {
    try {
      const { data, error }: PostgrestResponse<HolidaysType> = await supabase
        .from("Holidays_Type")
        .insert([HolidaysType]);

      if (error) {
        console.error(`Error inserting HolidaysType:`, error);
        return data.length ? data[0] : null;
      } else {
        console.log(`HolidaysType inserted successfully.`);
        return null;
      }
    } catch (error) {
      console.error(`Error inserting HolidaysType:`, error);
      return null;
    }
  };
}
