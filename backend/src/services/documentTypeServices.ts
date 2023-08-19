import  DocumentType  from "../models/documentType.js";
interface WasAdded {
    DocumentType: DocumentType,
    ok: boolean
}
export default interface DocumentTypeServices{
    getAllDocumentType(): Promise<DocumentType[]>;
    getADocumentType(id: Number): Promise<DocumentType>;
    updateADocumentType(id: number, updatedData: Partial<DocumentType>): Promise<boolean>;
    deleteADocumentType(id: number): Promise<boolean>;
    createADocumentType(DocumentType: DocumentType): Promise<WasAdded> ;
};