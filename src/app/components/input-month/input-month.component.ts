import {Component, EventEmitter, Input, OnInit} from '@angular/core';
import * as moment from 'moment';
import {MatSelectChange} from '@angular/material';

@Component({
  selector: 'app-input-month',
  templateUrl: './input-month.component.html',
  styleUrls: ['./input-month.component.css']
})
export class InputMonthComponent implements OnInit {

  year: number;
  month: number;
  months: string[];
  days: Date[];

  constructor() {
  }

  ngOnInit() {
    let rightNow: Date = new Date();
    this.year = rightNow.getFullYear()
    this.month = rightNow.getMonth();
    this.months = moment.months();
    this.days = this.daysInMonth();
  }

  daysInMonth(): Array<Date> {
    const date = new Date(this.year, this.month + 1, 0);
    let days = new Array<Date>();
    for (let i: number = 1; i <= date.getDate(); i++) {
      const iDate = new Date(this.year, this.month, i);
      days.push(iDate);
    }
    return days;
  }

  changeValue($event: any) {
    console.log($event.value);
    this.month = $event.value;
    this.days = this.daysInMonth();
  }

}
