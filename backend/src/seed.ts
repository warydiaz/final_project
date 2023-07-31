import supabase from "./db/supabase-client.js";
import Sector from "./models/sector.js";
import HolidaysType from "./models/holidaysType.js"; // Importa las clases que representan tus modelos de datos
import { PostgrestResponse } from "@supabase/supabase-js";

async function insertData() {
  try {
    // Crear un sector usando Supabase
    const sector = new Sector("development");
    sector.setId(1);

    const { data, error }: PostgrestResponse<Sector> = await supabase
      .from("Sector")
      .insert([sector])
      .single();

    if (!error) {
      console.log(`Created Sector: ${data}`);
    }
    if (error) {
      console.log(`Error trying to insert data:`, error);
    }
  } catch (error) {
    console.error(`Error trying to insert data:`, error);
  }

  try {
    // Crear un tipo de feriado usando Supabase
    const malta_holidays = new HolidaysType("Holidays", 15, "Malta");
    malta_holidays.setId(1);

    const { data, error }: PostgrestResponse<HolidaysType> = await supabase
      .from("Holidays_type")
      .insert([malta_holidays])
      .single();
    if (!error) {
      console.log(`Created Sector: ${data}`);
    }
  } catch (error) {
    console.error(`Error trying to insert data:`, error);
  }
}

export default insertData;
