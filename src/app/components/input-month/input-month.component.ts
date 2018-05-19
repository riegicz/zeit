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
    const date = new Date(this.year, this.inputMonthForm.get('month').value + 1, 0);
    const days = new Array<Moment>();
    for (let i = 1; i <= date.getDate(); i++) {
      const iDate = new Date(this.year, this.inputMonthForm.get('month').value, i);
      days.push(moment(iDate));
    }
    return days;
  }

  changeValue() {
    this.days = this.daysInMonth();
  }

  private createForm() {
    return this.fb.group({
      month: ['', ],
    });
  }

}
