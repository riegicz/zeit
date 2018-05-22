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

  inputMonthForm: FormGroup; // form controls
  months: string[]; // options for month-dropdown
  years: number[]; // options for year-dropdown
  days: Moment[]; // all days to be displayed


  constructor(private fb: FormBuilder) {
    moment.locale('de');
  }

  ngOnInit() {
    this.inputMonthForm = this.createForm();
    this.months = moment.months();
    this.years = [2018, 2019];
    this.days = this.daysInMonth();
  }

  private createForm() {
    return this.fb.group({
      month: [moment().month(),],
      year: [moment().year(),],
    });
  }

  daysInMonth(): Array<Moment> {
    // selected month
    const date: string = String(this.inputMonthForm.get('year').value) + '-' + String(this.inputMonthForm.get('month').value + 1);

    const days = new Array<Moment>();
    const start: Moment = moment(date, 'YYYY-MM');
    for (const end = moment(start).add(1, 'month'); start.isBefore(end); start.add(1, 'day')) {
      days.push(moment(start));
    }
    return days;
  }

  changeMonth() {
    this.days = this.daysInMonth();
  }

}
