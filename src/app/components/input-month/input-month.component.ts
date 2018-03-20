import {Component, Input, OnInit} from '@angular/core';

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

  constructor() {
  }

  ngOnInit() {
    this.year = 2018; // TODO
    this.month = 3; // TODO
    this.allDays = this.daysInMonth();
  }


  daysInMonth(): Array<Date> {
    const date = new Date(this.year, this.month, 0);
    let days = new Array<Date>();
    for(let i:number = 1; i < date.getDate(); i++) {
      const iDate = new Date(this.year, this.month, i);
      days.push(iDate);
    }
    return days;
  }


}
