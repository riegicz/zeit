import {Component, OnInit} from '@angular/core';
import * as moment from 'moment';
import {Moment} from 'moment';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-input-month',
  templateUrl: './input-month.component.html',
  styleUrls: ['./input-month.component.css']
})
export class InputMonthComponent implements OnInit {

  year: number;
  months: string[];
  days: Moment[];
  inputMonthForm: FormGroup;

  constructor(private fb: FormBuilder) {
    moment.locale('de');
  }

  ngOnInit() {
    this.inputMonthForm = this.createForm();
    const rightNow: Moment = moment();
    this.year = rightNow.year();
    this.inputMonthForm.get('month').setValue(rightNow.month());
    this.months = moment.months();
    this.days = this.daysInMonth();
    this.inputMonthForm.get('month').valueChanges.subscribe(() => this.changeValue());
  }

  daysInMonth(): Array<Moment> {
    // selected month
    const date: string = String(this.year) + '-' + String(this.inputMonthForm.get('month').value + 1);
    const days = new Array<Moment>();
    const start: Moment = moment(date, 'YYYY-MM');
    for (const end = moment(start).add(1, 'month'); start.isBefore(end); start.add(1, 'day')) {
      days.push(moment(start));
    }
    return days;
  }

  changeValue() {
    this.days = this.daysInMonth();
  }

  private createForm() {
    return this.fb.group({
      month: ['',],
    });
  }

}
