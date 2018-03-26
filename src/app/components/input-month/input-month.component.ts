import {Component, EventEmitter, Input, OnInit} from '@angular/core';
import * as moment from 'moment';
import {MatSelectChange} from '@angular/material';

@Component({
  selector: 'app-input-month',
  templateUrl: './input-month.component.html',
  styleUrls: ['./input-month.component.css']
})
export class InputMonthComponent implements OnInit {

  @Input()
  year: number;
  @Input()
  month: number;

  allDays = new Array<Date>();

  months = moment.months();
  check = moment();
  current_month  = moment().format('MMMM');
  constructor() {
  }

  changeValue($event: any) {
    console.log($event.value);
    this.month = 6;
    this.daysInMonth();
  }

  ngOnInit() {
    this.year = 2018; // TODO
    this.month = Number(moment().format('M')) - 1;
    this.allDays = this.daysInMonth();
  }

  daysInMonth(): Array<Date> {
    const date = new Date(this.year, this.month, 0);
    let days = new Array<Date>();
    for (let i:number = 1; i < date.getDate(); i++) {
      const iDate = new Date(this.year, this.month, i);
      days.push(iDate);
    }
    return days;
  }


}
