import { executeQuery } from '../../db/mysql-client.js';
import HolidaysType from '../../models/holidaysType.js';
import HolidaysTypeServices from '../holidaysTypeServices.js';

export class HolidaysTypeServicesImp implements HolidaysTypeServices {
  constructor() {}

  public getAllHolidaysType = async (): Promise<HolidaysType[]> => {
    try {
      const query = 'SELECT * FROM HolidaysType';
      const results = await executeQuery(query);
      return results;
    } catch (error) {
      console.error(`Error trying to get data from HolidaysType:`, error);
      return null;
    }
  };

  public getAHolidaysType = async (id: number): Promise<HolidaysType | null> => {
    try {
      const query = 'SELECT * FROM HolidaysType WHERE id = ?';
      const results = await executeQuery(query, [id]);
      return results.length ? results[0] : null;
    } catch (error) {
      console.error(`Error trying to get data from HolidaysType:`, error);
      return null;
    }
  };

  public deleteAHolidaysType = async (id: number): Promise<boolean> => {
    try {
      const query = 'DELETE FROM HolidaysType WHERE id = ?';
      await executeQuery(query, [id]);
      return true;
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
      const query = 'UPDATE HolidaysType SET ? WHERE id = ?';
      await executeQuery(query, [updatedData, id]);
      return true;
    } catch (error) {
      console.error(`Error trying to update HolidaysType:`, error);
      return false;
    }
  };

  public createAHolidaysType = async (holidaysType: HolidaysType): Promise<HolidaysType> => {
    try {
      const query = 'INSERT INTO HolidaysType SET ?';
      const results = await executeQuery(query, [holidaysType.getObjHolidays_type()]);
      console.log(`HolidaysType inserted successfully.`);
      return results[0];
    } catch (error) {
      console.error(`Error inserting HolidaysType:`, error);
      return null;
    }
  };
}
