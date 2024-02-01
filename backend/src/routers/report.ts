import { Request, Router } from "express";
import { ReportServices } from "../services/reportServices.js";
import { ReportServicesImp } from "../services/mysqlImp/reportServicesImpMysql.js";
import { errorChecked } from "../utils.js";
import Report from "../models/report.js";

const router = Router();
const reportServicesQuery: ReportServices = new ReportServicesImp();

router.get(
  "/",
  errorChecked(async (req, res) => {
    const result = await reportServicesQuery.getAllReport();

    res.status(200).json({ Position: result, ok: true });
  })
);

router.post(
  "/",
  errorChecked(async (req, res) => {
    const ReportData = req.body
    const aPosition: Report = new Report(ReportData.name);
    const newPosition = await reportServicesQuery.createAReport(aPosition);
    res.status(200).json(newPosition);
  })
);

export interface RequestWithReportId extends Request {
  params: { id: any; };
  body: any;
  reportId: number;
}

router.use("/:id", async (req: RequestWithReportId, res, next) => {
  const { id } = req.params;
  req.reportId = Number(id);
  next();
});

router.get(
  "/:id",
  errorChecked(async (req: RequestWithReportId, res) => {
    const report = await reportServicesQuery.getAReport(req.reportId)
    res.status(200).json(report);
  })
);

router.put(
  "/:id",
  errorChecked(async (req: RequestWithReportId, res) => {
    const updatedReport = await reportServicesQuery.updateAReport(req.reportId, req.body);
    res.status(200).json(updatedReport);
  })
);

router.delete(
  "/:id",
  errorChecked(async (req: RequestWithReportId, res) => {
    const deletedEmployee = await reportServicesQuery.deleteAReport(req.reportId)
    res.status(200).json(deletedEmployee);
  })
);

export default router;
