import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-input-month',
  templateUrl: './input-month.component.html',
  styleUrls: ['./input-month.component.css']
})
export class InputMonthComponent implements OnInit {

  days: Array<Date> = [
    new Date('2018-03-01'),
    new Date('2018-03-02'),
    new Date('2018-03-03'),
  ];

  constructor() { }

  ngOnInit() {
  }

}
