import { Request, Router } from "express";
import LeaveRequestServices from "../services/leaveRequestServices.js";
import { LeaveRequestServicesImp } from "../services/leaveRequestServicesImp.js";
import { errorChecked } from "../utils.js";
import { LeaveRequest } from "../models/leaveRequest.js";

const router = Router();
const leaveRequestServicesQuery: LeaveRequestServices =
  new LeaveRequestServicesImp();

router.get(
  "/",
  errorChecked(async (req, res) => {
    const result = await leaveRequestServicesQuery.getAllLeaveRequest();
    res.status(200).json({ employee: result, ok: true });
  })
);

router.post(
  "/",
  errorChecked(async (req, res) => {
    const leaveRequestData = req.body;
    const aLeaveRequest: LeaveRequest = new LeaveRequest(
      leaveRequestData.employeeId,
      leaveRequestData.startDate,
      leaveRequestData.endtDate,
      leaveRequestData.hours_off_requeted,
      leaveRequestData.status
    );
    const newLeaveRequest = await leaveRequestServicesQuery.createALeaveRequest(
      aLeaveRequest
    );
    res.status(200).json({ newLeaveRequest, ok: true });
  })
);

export interface RequestWithLeaveRequestId extends Request {
  params: { id: any };
  body: any;
  leaveRequestId: number;
}

router.use("/:id", async (req: RequestWithLeaveRequestId, res, next) => {
  const { id } = req.params;
  req.leaveRequestId = Number(id);
  next();
});

router.get(
  "/:id",
  errorChecked(async (req: RequestWithLeaveRequestId, res) => {
    const employee = await leaveRequestServicesQuery.getALeaveRequest(
      req.leaveRequestId
    );
    res.status(200).json(employee);
  })
);

router.put(
  "/:id",
  errorChecked(async (req: RequestWithLeaveRequestId, res) => {
    const updatedEmployee = await leaveRequestServicesQuery.updateALeaveRequest(
      req.leaveRequestId,
      req.body
    );
    res.status(200).json(updatedEmployee);
  })
);

router.delete(
  "/:id",
  errorChecked(async (req: RequestWithLeaveRequestId, res) => {
    const deletedEmployee = await leaveRequestServicesQuery.deleteALeaveRequest(
      req.leaveRequestId
    );
    res.status(200).json(deletedEmployee);
  })
);

export default router;
