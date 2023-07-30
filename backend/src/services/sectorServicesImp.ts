import SectorServices from "./sectorServices.js";
import Sector  from "../models/sector.js";
import supabase from "../db/supabase-client.js";
import { PostgrestResponse } from "@supabase/supabase-js";

export class SectorServicesImp implements SectorServices {
  constructor() {}

  public getAllSector = async (): Promise<Sector[]> => {
    try {
      const { data, error }: PostgrestResponse<Sector[]> = await supabase
        .from("Sector")
        .select("*");

      if (error) {
        console.error(`Error trying to get data from Sector":`, error);
        return null;
      } else {
        return data.flat();
      }
    } catch (error) {
      console.error(`Error trying to get data from Sector":`, error);
      return null;
    }
  };

  public getASector = async (id: Number): Promise<Sector | null> => {
    try {
      const { data, error }: PostgrestResponse<Sector> = await supabase
        .from("Sector")
        .select("*")
        .eq("id", id);

      if (error) {
        console.error(`Error trying to get data from Sector":`, error);
        return null;
      } else {
        return data.length ? data[0] : null;
      }
    } catch (error) {
      console.error(`Error trying to get data from Sector":`, error);
      return null;
    }
  };

  public deleteASector = async (id: number): Promise<boolean> => {
    try {
      const { data, error }: PostgrestResponse<unknown> = await supabase
        .from("Sector")
        .delete()
        .eq("id", id);

      if (error) {
        console.error(`Error trying to delete Sector:`, error);
        return false;
      } else {
        return true;
      }
    } catch (error) {
      console.error(`Error trying to delete Sector:`, error);
      return false;
    }
  };

  public updateASector = async (
    id: number,
    updatedData: Partial<Sector>
  ): Promise<boolean> => {
    try {
      const { data, error }: PostgrestResponse<unknown> = await supabase
        .from("Sector")
        .update(updatedData)
        .eq("id", id);

      if (error) {
        console.error(`Error trying to update Sector:`, error);
        return false;
      } else {
        return true;
      }
    } catch (error) {
      console.error(`Error trying to update Sector:`, error);
      return false;
    }
  };

  public createASector = async (sector: Sector): Promise<Sector> => {
    try {
      const { data, error }: PostgrestResponse<Sector> = await supabase
        .from("Sector")
        .insert([sector]);

      if (error) {
        console.error(`Error inserting Sector:`, error);
        return data.length ? data[0] : null;
      } else {
        console.log(`Sector inserted successfully.`);
        return null;
      }
    } catch (error) {
      console.error(`Error inserting Sector:`, error);
      return null;
    }
  };
}
