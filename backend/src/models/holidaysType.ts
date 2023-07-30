export default class Holidays_type {
  constructor(
    public id: number | undefined,
    public name: string,
    public amount_of_days_off: number,
    public country: string
  ) {}
}
