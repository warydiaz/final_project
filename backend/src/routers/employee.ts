import { Request, Router } from "express";
import { EmployeeServices } from "../services/employeeServices.js";
import { EmployeeServicesImp } from "../services/employeeServicesImp.js";
import { errorChecked } from "../utils.js";
import { Employee } from "../models/employee.js";

const router = Router();
const employeeServicesQuery: EmployeeServices = new EmployeeServicesImp();

router.get(
  "/",
  errorChecked(async (req, res) => {
    const result = await employeeServicesQuery.getAllEmployee();
    res.status(200).json({ employee: result, ok: true });
  })
);

router.post(
  "/",
  errorChecked(async (req, res) => {
    const employeeData = req.body;
    const anEmployee: Employee = new Employee(
      employeeData.userid,
      employeeData.name,
      employeeData.document_type,
      employeeData.document_number,
      employeeData.current_hours_off,
      employeeData.position_name,
      employeeData.employee_Sector,
      employeeData.holidays_typeId
    );
    const newEmployee = await employeeServicesQuery.createAEmployee(anEmployee);
    res.status(200).json({ newEmployee, ok: true });
  })
);

export interface RequestWithEmployeeId extends Request {
  params: { id: any };
  body: any;
  employeeId: number;
}

router.use("userid/:userid", async (req: Request, res, next) => {
  const userid = req.body;
  req.userid = userid.userid;
  next();
});

router.use("/:id", async (req: RequestWithEmployeeId, res, next) => {
  const { id } = req.params;
  req.employeeId = Number(id);
  next();
});

router.post(
  "/:userid",
  errorChecked(async (req: Request, res) => {
    const employee = await employeeServicesQuery.getAEmployeeByUserId(
      req.body.userid
    );
    res.status(200).json(employee);
  })
);

router.get(
  "/ismanager/:userid",
  errorChecked(async (req: Request, res) => {
    const isManager = await employeeServicesQuery.isManager(req.params.userid);
    res.status(200).json({ ismanager: isManager });
  })
);

router.get(
  "/:id",
  errorChecked(async (req: RequestWithEmployeeId, res) => {
    const employee = await employeeServicesQuery.getAEmployee(req.employeeId);
    res.status(200).json(employee);
  })
);

router.put(
  "/:id",
  errorChecked(async (req: RequestWithEmployeeId, res) => {
    const updatedEmployee = await employeeServicesQuery.updateAEmployee(
      req.employeeId,
      req.body
    );
    res.status(200).json(updatedEmployee);
  })
);

router.delete(
  "/:id",
  errorChecked(async (req: RequestWithEmployeeId, res) => {
    const deletedEmployee = await employeeServicesQuery.deleteAEmployee(
      req.employeeId
    );
    res.status(200).json(deletedEmployee);
  })
);

export default router;
