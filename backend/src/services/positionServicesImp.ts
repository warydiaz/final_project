import PositionServices from "./positionServices.js";
import Position  from "../models/position.js";
import supabase from "../db/supabase-client.js";
import { PostgrestResponse } from "@supabase/supabase-js";

export class PositionServicesImp implements PositionServices {
  constructor() {}

  public getAllPositions = async (): Promise<Position[]> => {
    try {
      const { data, error }: PostgrestResponse<Position[]> = await supabase
        .from("Position")
        .select("*");

      if (error) {
        console.error(`Error trying to get data from Position":`, error);
        return null;
      } else {
        return data.flat();
      }
    } catch (error) {
      console.error(`Error trying to get data from Position":`, error);
      return null;
    }
  };

  public getAPosition = async (id: Number): Promise<Position | null> => {
    try {
      const { data, error }: PostgrestResponse<Position> = await supabase
        .from("Position")
        .select("*")
        .eq("id", id);

      if (error) {
        console.error(`Error trying to get data from Position":`, error);
        return null;
      } else {
        return data.length ? data[0] : null;
      }
    } catch (error) {
      console.error(`Error trying to get data from Position":`, error);
      return null;
    }
  };

  public deleteAPosition = async (id: number): Promise<boolean> => {
    try {
      const { data, error }: PostgrestResponse<unknown> = await supabase
        .from("Position")
        .delete()
        .eq("id", id);

      if (error) {
        console.error(`Error trying to delete Position:`, error);
        return false;
      } else {
        return true;
      }
    } catch (error) {
      console.error(`Error trying to delete Position:`, error);
      return false;
    }
  };

  public updateAPosition = async (
    id: number,
    updatedData: Partial<Position>
  ): Promise<boolean> => {
    try {
      const { data, error }: PostgrestResponse<unknown> = await supabase
        .from("Position")
        .update(updatedData)
        .eq("id", id);

      if (error) {
        console.error(`Error trying to update Position:`, error);
        return false;
      } else {
        return true;
      }
    } catch (error) {
      console.error(`Error trying to update Position:`, error);
      return false;
    }
  };

  public createAPosition = async (Position: Position): Promise<{Position: Position,ok: boolean}> => {
    try {
      
      const { data, error }: PostgrestResponse<Position> = await supabase
        .from("Position")
        .insert([Position.getObjPosition()])
        .select();

      if (error) {
        console.error(`Error inserting Position:`, error);
        return {Position: null, ok:false};
      } else {
        console.log(`Position inserted successfully.`);
        return {Position: data[0], ok:true};
      }
    } catch (error) {
      console.error(`Error inserting Position:`, error);
      return {Position: null, ok:false};
    }
  };
}
