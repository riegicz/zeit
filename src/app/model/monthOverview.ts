export class MonthOverview {

  monthName: string;
  targetHours: number;
  actualHours: number;
  overtime: number;
  leave: number;
  sickDays: number;
  remainingLeave: string;

  constructor(values?: MonthOverview) {
    if (values) {
      Object.assign(this, values);
    }
  }
}
