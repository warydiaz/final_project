import { Request, Router } from "express";
import  PositionServices  from "../services/positionServices.js";
import { PositionServicesImp } from "../services/positionServicesImp.js";
import { errorChecked } from "../utils.js";
import  Position  from "../models/position.js";

const router = Router();
const PositionServicesQuery: PositionServices = new PositionServicesImp();

router.get(
  "/",
  errorChecked(async (req, res) => {
    const result = await PositionServicesQuery.getAllPositions();
    res.status(200).json({ Position: result, ok: true });
  })
);

router.post(
  "/",  
  errorChecked(async (req, res) => {
    const PositionData = req.body
    const aPosition: Position = new Position(PositionData.name);
    const newPosition = await PositionServicesQuery.createAPosition(aPosition);
    res.status(200).json(newPosition);
  })
);

export interface RequestWithPositionId extends Request {
    params: { id: any; };
    body: any;
    PositionId: number;
}

router.use("/:id", async (req: RequestWithPositionId, res, next) => {
  const { id } = req.params;
  req.PositionId = Number(id);
  next();
});

router.get(
  "/:id",
  errorChecked(async (req: RequestWithPositionId, res) => {
    const employee = await PositionServicesQuery.getAPosition(req.PositionId)
    res.status(200).json(employee);
  })
);

router.put(
  "/:id",
  errorChecked(async (req: RequestWithPositionId, res) => {
    const updatedEmployee = await PositionServicesQuery.updateAPosition(req.PositionId, req.body);
    res.status(200).json(updatedEmployee);
  })
);

router.delete(
  "/:id",
  errorChecked(async (req: RequestWithPositionId, res) => {
    const deletedEmployee = await PositionServicesQuery.deleteAPosition(req.PositionId)
    res.status(200).json(deletedEmployee);
  })
);

export default router;
