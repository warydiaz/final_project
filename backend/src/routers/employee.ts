import { Request, Router } from "express";
import prisma from "../db/prisma-client.js";
import { errorChecked } from "../utils.js";

const router = Router();

router.get(
  "/",
  errorChecked(async (req, res) => {
    const result = await prisma.employee.findMany({});
    res.status(200).json({ employee: result, ok: true });
  })
);

router.post(
  "/",
  errorChecked(async (req, res) => {
    const newEmployee = await prisma.employee.create({ data: req.body });
    res.status(200).json({ newEmployee, ok: true });
  })
);

export interface RequestWithEmployeeId extends Request {
    params: { id: any; };
    body: any;
    employeeId: number;
}

router.use("/:id", async (req: RequestWithEmployeeId, res, next) => {
  const { id } = req.params;
  req.employeeId = Number(id);
  next();
});

router.get(
  "/:id",
  errorChecked(async (req: RequestWithEmployeeId, res) => {
    const employee = await prisma.employee.findUniqueOrThrow({
      where: { id: req.employeeId },
    });
    res.status(200).json(employee);
  })
);

router.put(
  "/:id",
  errorChecked(async (req: RequestWithEmployeeId, res) => {
    const updatedEmployee = await prisma.employee.update({
      where: { id: req.employeeId },
      data: req.body,
    });
    res.status(200).json(updatedEmployee);
  })
);

router.delete(
  "/:id",
  errorChecked(async (req: RequestWithEmployeeId, res) => {
    const deletedEmployee = await prisma.employee.delete({
      where: { id: req.employeeId },
    });
    res.status(200).json(deletedEmployee);
  })
);

export default router;
