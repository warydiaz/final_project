export default class Report {
  public id: number | undefined;
  public name: string;

  constructor(name: string) {
    this.id = undefined;
    this.name = name;
  }

  public setId(id: number): void {
    this.id = id;
  }

  public getObjReport(): any {
    const aReport = {
      "name": this.name,
    };
    return aReport;
  }

}