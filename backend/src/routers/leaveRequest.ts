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
    res.status(200).json({ leaveRequest: result, ok: true });
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
    const leaveRequest = await leaveRequestServicesQuery.getALeaveRequest(
      req.leaveRequestId
    );
    res.status(200).json(leaveRequest);
  })
);

router.post(
  "/managerid",
  errorChecked(async (req, res) => {
    const leaveRequest = await leaveRequestServicesQuery.getLeaveRequestByTeam(
      req.body.managerid, req.body.status
    );
    res.status(200).json(leaveRequest);
  })
);

router.post(
  "/userid",
  errorChecked(async (req, res) => {
    const leaveRequest = await leaveRequestServicesQuery.getLeaveRequestUserId(
      req.body.userid
    );
    res.status(200).json(leaveRequest);
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
