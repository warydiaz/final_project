import  Sector  from "../models/sector.js";
export default interface SectorServices{
    getAllSector(): Promise<Sector[]>;
    getASector(id: Number): Promise<Sector>;
    updateASector(id: number, updatedData: Partial<Sector>): Promise<boolean>;
    deleteASector(id: number): Promise<boolean>;
    createASector(sector: Sector): Promise<Sector>;
};