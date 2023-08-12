import { Request, Router } from "express";
import  SectorServices  from "../services/sectorServices.js";
import { SectorServicesImp } from "../services/sectorServicesImp.js";
import { errorChecked } from "../utils.js";
import  Sector  from "../models/sector.js";

const router = Router();
const sectorServicesQuery: SectorServices = new SectorServicesImp();

router.get(
  "/",
  errorChecked(async (req, res) => {
    const result = await sectorServicesQuery.getAllSector();
    res.status(200).json({ sector: result, ok: true });
  })
);

router.post(
  "/",  
  errorChecked(async (req, res) => {
    const sectorData = req.body
    const aSector: Sector = new Sector(sectorData.name);
    const newSector = await sectorServicesQuery.createASector(aSector);
    res.status(200).json(newSector);
  })
);

export interface RequestWithSectorId extends Request {
    params: { id: any; };
    body: any;
    sectorId: number;
}

router.use("/:id", async (req: RequestWithSectorId, res, next) => {
  const { id } = req.params;
  req.sectorId = Number(id);
  next();
});

router.get(
  "/:id",
  errorChecked(async (req: RequestWithSectorId, res) => {
    const employee = await sectorServicesQuery.getASector(req.sectorId)
    res.status(200).json(employee);
  })
);

router.put(
  "/:id",
  errorChecked(async (req: RequestWithSectorId, res) => {
    const updatedEmployee = await sectorServicesQuery.updateASector(req.sectorId, req.body);
    res.status(200).json(updatedEmployee);
  })
);

router.delete(
  "/:id",
  errorChecked(async (req: RequestWithSectorId, res) => {
    const deletedEmployee = await sectorServicesQuery.deleteASector(req.sectorId)
    res.status(200).json(deletedEmployee);
  })
);

export default router;
