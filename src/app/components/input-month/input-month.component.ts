import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-input-month',
  templateUrl: './input-month.component.html',
  styleUrls: ['./input-month.component.css']
})
export class InputMonthComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  daysInMonth(): Array<any> {
    var currentYear = new Date().getFullYear();
    var currentMonth = new Date().getMonth();
    var date = new Date(currentYear, currentMonth, 1);
    var days: Array<any> = [];
    while (date.getMonth() === currentMonth) {
      var weekDayName =  moment(date).format('dddd');
      var monthName =  moment(date).format('LL');
      days.push({
        date: monthName,
        dayOfWeek: weekDayName
      });
      //days.push(moment(new Date(date)).format('MMMM / YYYY'));
      date.setDate(date.getDate() + 1);
    }
    return days;
  }

  allDays = this.daysInMonth();
}
