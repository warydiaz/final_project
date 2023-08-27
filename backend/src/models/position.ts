export default class Position {
  public id: number | undefined;
  public name: string;

  constructor(name: string) {
    this.id = undefined;
    this.name = name;
  }

  public setId(id: number): void {
    this.id = id;
  }

  public getObjPosition(): any {
    const aPosition = {
      "name": this.name,
    };
    return aPosition;
  }

}