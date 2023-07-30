import  HolidaysType  from "../models/holidaysType.js";
export default interface HolidaysTypeServices{
    getAllHolidaysType(): Promise<HolidaysType[]>;
    getAHolidaysType(id: Number): Promise<HolidaysType>;
    updateAHolidaysType(id: number, updatedData: Partial<HolidaysType>): Promise<boolean>;
    deleteAHolidaysType(id: number): Promise<boolean>;
    createAHolidaysType(HolidaysType: HolidaysType): Promise<HolidaysType>;
};