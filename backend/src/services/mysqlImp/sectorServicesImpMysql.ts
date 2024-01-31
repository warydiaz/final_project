import { executeQuery } from '../../db/mysql-client.js';
import { Sector } from '../../models/sector.js';
import { SectorServices } from "../sectorServices.js";

export class SectorServicesImp implements SectorServices {
  constructor() { }

  public getAllSector = async (): Promise<Sector[]> => {
    try {
      const query = 'SELECT * FROM Sector';
      const results = await executeQuery(query);
      return results;
    } catch (error) {
      console.error(`Error trying to get data from Sector:`, error);
      return null;
    }
  };

  public getASector = async (id: number): Promise<Sector | null> => {
    try {
      const query = 'SELECT * FROM Sector WHERE id = ?';
      const results = await executeQuery(query, [id]);
      return results.length ? results[0] : null;
    } catch (error) {
      console.error(`Error trying to get data from Sector:`, error);
      return null;
    }
  };

  public deleteASector = async (id: number): Promise<boolean> => {
    try {
      const query = 'DELETE FROM Sector WHERE id = ?';
      const results = await executeQuery(query, [id]);
      return results.affectedRows > 0;
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
      const query = 'UPDATE Sector SET ? WHERE id = ?';
      const results = await executeQuery(query, [updatedData, id]);
      return results.affectedRows > 0;
    } catch (error) {
      console.error(`Error trying to update Sector:`, error);
      return false;
    }
  };

  public createASector = async (sector: Sector): Promise<{ sector: Sector; ok: boolean }> => {
    try {
      const query = 'INSERT INTO Sector SET ?';
      const results = await executeQuery(query, [sector.getObjSector()]);
      return results.insertId ? { sector: sector, ok: true } : { sector: null, ok: false };
    } catch (error) {
      console.error(`Error inserting Sector:`, error);
      return { sector: null, ok: false };
    }
  };
}
