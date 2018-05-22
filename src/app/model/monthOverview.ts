export class MonthOverview {

  monthName: string;
  targetHours: number;
  actualHours: number;
  overtime: number;
  leave: number;
  sickDays: number;

  constructor(values?: MonthOverview) {
    if (values) {
      Object.assign(this, values);
    }
  }
}
