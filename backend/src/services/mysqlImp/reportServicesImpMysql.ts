import { executeQuery } from '../../db/mysql-client.js';
import Report from '../../models/report.js';
import { ReportServices } from "../reportServices.js";

export class ReportServicesImp implements ReportServices {
  constructor() { }

  public getAllReport = async (): Promise<Report[]> => {
    try {
      const query = 'SELECT * FROM Report';
      const results = await executeQuery(query);
      return results;
    } catch (error) {
      console.error(`Error trying to get data from Report:`, error);
      return null;
    }
  };

  public getAReport = async (id: number): Promise<Report | null> => {
    try {
      const query = 'SELECT * FROM Report WHERE id = ?';
      const results = await executeQuery(query, [id]);
      return results.length ? results[0] : null;
    } catch (error) {
      console.error(`Error trying to get data from Report:`, error);
      return null;
    }
  };

  public deleteAReport = async (id: number): Promise<boolean> => {
    try {
      const query = 'DELETE FROM Report WHERE id = ?';
      const results = await executeQuery(query, [id]);
      return results.affectedRows > 0;
    } catch (error) {
      console.error(`Error trying to delete Report:`, error);
      return false;
    }
  };

  public updateAReport = async (
    id: number,
    updatedData: Partial<Report>
  ): Promise<boolean> => {
    try {
      const query = 'UPDATE Report SET ? WHERE id = ?';
      const results = await executeQuery(query, [updatedData, id]);
      return results.affectedRows > 0;
    } catch (error) {
      console.error(`Error trying to update Report:`, error);
      return false;
    }
  };

  public createAReport = async (report: Report): Promise<{ report: Report; ok: boolean }> => {
    try {
      const query = 'INSERT INTO Report SET ?';
      const results = await executeQuery(query, [report.getObjReport()]);
      return results.insertId ? { report: report, ok: true } : { report: null, ok: false };
    } catch (error) {
      console.error(`Error inserting Report:`, error);
      return { report: null, ok: false };
    }
  };
}
