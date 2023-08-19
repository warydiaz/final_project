import { Request, Router } from "express";
import  DocumentTypeServices  from "../services/documentTypeServices.js";
import { DocumentTypeServicesImp } from "../services/documentTypeServicesImp.js";
import { errorChecked } from "../utils.js";
import  DocumentType  from "../models/documentType.js";

const router = Router();
const DocumentTypeServicesQuery: DocumentTypeServices = new DocumentTypeServicesImp();

router.get(
  "/",
  errorChecked(async (req, res) => {
    const result = await DocumentTypeServicesQuery.getAllDocumentType();
    res.status(200).json({ documentType: result, ok: true });
  })
);

router.post(
  "/",  
  errorChecked(async (req, res) => {
    const documentTypeData = req.body
    const aDocumentType: DocumentType = new DocumentType(documentTypeData.name);
    const newDocumentType = await DocumentTypeServicesQuery.createADocumentType(aDocumentType);
    res.status(200).json(newDocumentType);
  })
);

export interface RequestWithDocumentTypeId extends Request {
    params: { id: any; };
    body: any;
    documentTypeId: number;
}

router.use("/:id", async (req: RequestWithDocumentTypeId, res, next) => {
  const { id } = req.params;
  req.documentTypeId = Number(id);
  next();
});

router.get(
  "/:id",
  errorChecked(async (req: RequestWithDocumentTypeId, res) => {
    const documentType = await DocumentTypeServicesQuery.getADocumentType(req.documentTypeId)
    res.status(200).json(documentType);
  })
);

router.put(
  "/:id",
  errorChecked(async (req: RequestWithDocumentTypeId, res) => {
    const updateddocumentType = await DocumentTypeServicesQuery.updateADocumentType(req.documentTypeId, req.body);
    res.status(200).json(updateddocumentType);
  })
);

router.delete(
  "/:id",
  errorChecked(async (req: RequestWithDocumentTypeId, res) => {
    const deleteddocumentType = await DocumentTypeServicesQuery.deleteADocumentType(req.documentTypeId)
    res.status(200).json(deleteddocumentType);
  })
);

export default router;
