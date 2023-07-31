import { Request, Router } from "express";
import HolidaysTypeServices  from "../services/holidaysTypeServices.js";
import {HolidaysTypeServicesImp} from "../services/holidaysTypeServicesImp.js";
import { errorChecked } from "../utils.js";
import  HolidaysType  from "../models/holidaysType.js";

const router = Router();
const holidaysTypeServicesQuery: HolidaysTypeServices = new HolidaysTypeServicesImp();

router.get(
  "/",
  errorChecked(async (req, res) => {
    const result = await holidaysTypeServicesQuery.getAllHolidaysType();
    res.status(200).json({ holidaysType: result, ok: true });
  })
);

router.post(
  "/",  
  errorChecked(async (req, res) => {
    const holidaysTypeData = req.body
    const aHolidaysType: HolidaysType = new HolidaysType(holidaysTypeData.name, holidaysTypeData.amount_of_days_off, holidaysTypeData.country);
    const newHolidaysType = await holidaysTypeServicesQuery.createAHolidaysType(aHolidaysType);
    res.status(200).json({ newHolidaysType, ok: true });
  })
);

export interface RequestWithEmployeeId extends Request {
    params: { id: any; };
    body: any;
    holidaysTypeId: number;
}

router.use("/:id", async (req: RequestWithEmployeeId, res, next) => {
  const { id } = req.params;
  req.holidaysTypeId = Number(id);
  next();
});

router.get(
  "/:id",
  errorChecked(async (req: RequestWithEmployeeId, res) => {
    const aHolidaysType = await holidaysTypeServicesQuery.getAHolidaysType(req.holidaysTypeId)
    res.status(200).json(aHolidaysType);
  })
);

router.put(
  "/:id",
  errorChecked(async (req: RequestWithEmployeeId, res) => {
    const updatedHolidaysType = await holidaysTypeServicesQuery.updateAHolidaysType(req.holidaysTypeId, req.body);
    res.status(200).json(updatedHolidaysType);
  })
);

router.delete(
  "/:id",
  errorChecked(async (req: RequestWithEmployeeId, res) => {
    const deletedHolidaysType = await holidaysTypeServicesQuery.deleteAHolidaysType(req.holidaysTypeId)
    res.status(200).json(deletedHolidaysType);
  })
);

export default router;
