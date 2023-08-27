import  Position  from "../models/position.js";
interface WadAdded {
    Position: Position,
    ok: boolean
}
export default interface PositionServices{
    getAllPositions(): Promise<Position[]>;
    getAPosition(id: Number): Promise<Position>;
    updateAPosition(id: number, updatedData: Partial<Position>): Promise<boolean>;
    deleteAPosition(id: number): Promise<boolean>;
    createAPosition(Position: Position): Promise<WadAdded> ;
};