export default class Holidays_type {
  public id: number;
  public name: string;
  public amount_of_days_off: number;
  public country: string;

  constructor(name: string, amount_of_days_off: number, country: string) {
    this.id = undefined;
    this.name = name;
    this.amount_of_days_off = amount_of_days_off;
    this.country = country;
  }

  public setId(id: number): void {
    this.id = id;
  }
}
