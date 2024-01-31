import { executeQuery } from '../../db/mysql-client.js';
import Position from '../../models/position.js';
import PositionServices from '../positionServices.js';

export class PositionServicesImp implements PositionServices {
  constructor() {}

  public getAllPositions = async (): Promise<Position[]> => {
    try {
      const query = 'SELECT * FROM Position';
      const results = await executeQuery(query);
      return results;
    } catch (error) {
      console.error(`Error trying to get data from Position:`, error);
      return null;
    }
  };

  public getAPosition = async (id: number): Promise<Position | null> => {
    try {
      const query = 'SELECT * FROM Position WHERE id = ?';
      const results = await executeQuery(query, [id]);
      return results.length ? results[0] : null;
    } catch (error) {
      console.error(`Error trying to get data from Position:`, error);
      return null;
    }
  };

  public deleteAPosition = async (id: number): Promise<boolean> => {
    try {
      const query = 'DELETE FROM Position WHERE id = ?';
      const results = await executeQuery(query, [id]);
      return results.affectedRows > 0;
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
      const query = 'UPDATE Position SET ? WHERE id = ?';
      const results = await executeQuery(query, [updatedData, id]);
      return results.affectedRows > 0;
    } catch (error) {
      console.error(`Error trying to update Position:`, error);
      return false;
    }
  };

  public createAPosition = async (position: Position): Promise<{ Position: Position; ok: boolean }> => {
    try {
      const query = 'INSERT INTO Position SET ?';
      const results = await executeQuery(query, [position.getObjPosition()]);
      return results.insertId ? { Position: position, ok: true } : { Position: null, ok: false };
    } catch (error) {
      console.error(`Error inserting Position:`, error);
      return { Position: null, ok: false };
    }
  };
}
