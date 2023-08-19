import DocumentTypeServices from "./documentTypeServices.js";
import DocumentType  from "../models/documentType.js";
import supabase from "../db/supabase-client.js";
import { PostgrestResponse } from "@supabase/supabase-js";

export class DocumentTypeServicesImp implements DocumentTypeServices {
  constructor() {}

  public getAllDocumentType = async (): Promise<DocumentType[]> => {
    try {
      const { data, error }: PostgrestResponse<DocumentType[]> = await supabase
        .from("Document_type")
        .select("*");

        console.log(data);

      if (error) {
        console.error(`Error trying to get data from Document Type":`, error);
        return null;
      } else {
        return data.flat();
      }
    } catch (error) {
      console.error(`Error trying to get data from Document Type":`, error);
      return null;
    }
  };

  public getADocumentType = async (id: Number): Promise<DocumentType | null> => {
    try {
      const { data, error }: PostgrestResponse<DocumentType> = await supabase
        .from("Document_type")
        .select("*")
        .eq("id", id);

      if (error) {
        console.error(`Error trying to get data from Document Type":`, error);
        return null;
      } else {
        return data.length ? data[0] : null;
      }
    } catch (error) {
      console.error(`Error trying to get data from Document Type":`, error);
      return null;
    }
  };

  public deleteADocumentType = async (id: number): Promise<boolean> => {
    try {
      const { data, error }: PostgrestResponse<unknown> = await supabase
        .from("Document_type")
        .delete()
        .eq("id", id);

      if (error) {
        console.error(`Error trying to delete DocumentType:`, error);
        return false;
      } else {
        return true;
      }
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
      const { data, error }: PostgrestResponse<unknown> = await supabase
        .from("Document_type")
        .update(updatedData)
        .eq("id", id);

      if (error) {
        console.error(`Error trying to update DocumentType:`, error);
        return false;
      } else {
        return true;
      }
    } catch (error) {
      console.error(`Error trying to update DocumentType:`, error);
      return false;
    }
  };

  public createADocumentType = async (DocumentType: DocumentType): Promise<{DocumentType: DocumentType,ok: boolean}> => {
    try {
      
      const { data, error }: PostgrestResponse<DocumentType> = await supabase
        .from("Document_type")
        .insert([DocumentType.getObjDocumentType()])
        .select();

      if (error) {
        console.error(`Error inserting DocumentType:`, error);
        return {DocumentType: null, ok:false};
      } else {
        console.log(`DocumentType inserted successfully.`);
        return {DocumentType: data[0], ok:true};
      }
    } catch (error) {
      console.error(`Error inserting DocumentType:`, error);
      return {DocumentType: null, ok:false};
    }
  };
}
