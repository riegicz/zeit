import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-input-month',
  templateUrl: './input-month.component.html',
  styleUrls: ['./input-month.component.css']
})
export class InputMonthComponent implements OnInit {
  allDays = this.daysInMonth();

  constructor() { }

  ngOnInit() {
  }


  daysInMonth(): Array<any> {
    const currentYear = new Date().getFullYear(),
    currentMonth = new Date().getMonth(),
    date = new Date(currentYear, currentMonth, 1),
    days: Array<any> = [];
    while (date.getMonth() === currentMonth) {
      var _isWeekDay = true;
      if (date.getDay() === 0 || date.getDay() === 6) {
        _isWeekDay = false;
      }

      const monthName =  moment(date).format('LL');
      days.push({
          day: moment(date),
          isWeekday : _isWeekDay
      });
      date.setDate(date.getDate() + 1);
    }
    return days;
  }


}
