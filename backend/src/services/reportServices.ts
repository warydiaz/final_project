import  Report  from "../models/report.js";
interface WadAdded {
    report: Report,
    ok: boolean
}
export interface ReportServices {
    getAllReport(): Promise<Report[]>;
    getAReport(id: Number): Promise<Report>;
    updateAReport(id: number, updatedData: Partial<Report>): Promise<boolean>;
    deleteAReport(id: number): Promise<boolean>;
    createAReport(report: Report): Promise<WadAdded>;
};