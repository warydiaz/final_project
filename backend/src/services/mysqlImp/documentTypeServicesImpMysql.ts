// documentTypeServices.ts
import { executeQuery } from '../../db/mysql-client.js';
import DocumentTypeServices from '../documentTypeServices.js';
import DocumentType from '../../models/documentType.js';

export class DocumentTypeServicesImp implements DocumentTypeServices {
  constructor() {}

  public getAllDocumentType = async (): Promise<DocumentType[]> => {
    try {
      const results = await executeQuery('SELECT * FROM DocumentType');
      return results;
    } catch (error) {
      console.error(`Error trying to get data from DocumentType:`, error);
      return null;
    }
  };

  public getADocumentType = async (id: number): Promise<DocumentType | null> => {
    try {
      const results = await executeQuery('SELECT * FROM DocumentType WHERE id = ?', [id]);
      return results.length ? results[0] : null;
    } catch (error) {
      console.error(`Error trying to get data from DocumentType:`, error);
      return null;
    }
  };

  public deleteADocumentType = async (id: number): Promise<boolean> => {
    try {
      await executeQuery('DELETE FROM DocumentType WHERE id = ?', [id]);
      return true;
    } catch (error) {
      console.error(`Error trying to delete DocumentType:`, error);
      return false;
    }
  };

  public updateADocumentType = async (
    id: number,
    updatedData: Partial<DocumentType>
  ): Promise<boolean> => {
    try {
      await executeQuery('UPDATE DocumentType SET ? WHERE id = ?', [updatedData, id]);
      return true;
    } catch (error) {
      console.error(`Error trying to update DocumentType:`, error);
      return false;
    }
  };

  public createADocumentType = async (documentType: DocumentType): Promise<{ DocumentType: DocumentType; ok: boolean }> => {
    try {
      const results = await executeQuery('INSERT INTO DocumentType SET ?', [documentType.getObjDocumentType()]);
      console.log(`DocumentType inserted successfully.`);
      
      const newDocumentType = new DocumentType(documentType.getObjDocumentType()) ;
      newDocumentType.setId(results.insertId);

      return { DocumentType: newDocumentType, ok: true };
    } catch (error) {
      console.error(`Error inserting DocumentType:`, error);
      return { DocumentType: null, ok: false };
    }
  };
}
