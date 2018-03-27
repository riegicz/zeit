import {Component, EventEmitter, Input, OnInit} from '@angular/core';
import * as moment from 'moment';
import {MatSelectChange} from '@angular/material';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {InputDayComponent} from "../input-day/input-day.component";

@Component({
  selector: 'app-input-month',
  templateUrl: './input-month.component.html',
  styleUrls: ['./input-month.component.css']
})
export class InputMonthComponent implements OnInit {

  year: number;
  months: string[];
  days: Date[];
  inputMonthForm: FormGroup;

  constructor(private fb: FormBuilder) {
  }

  ngOnInit() {
    this.inputMonthForm = this.createForm();
    let rightNow: Date = new Date();
    this.year = rightNow.getFullYear()
    this.inputMonthForm.get('month').setValue(rightNow.getMonth());
    this.months = moment.months();
    this.days = this.daysInMonth();
    this.inputMonthForm.get('month').valueChanges.subscribe(() => this.changeValue());
  }

  private createForm() {
    return this.fb.group({
      month: ['', ],
    });
  }

  daysInMonth(): Array<Date> {
    const date = new Date(this.year, this.inputMonthForm.get('month').value + 1, 0);
    let days = new Array<Date>();
    for (let i: number = 1; i <= date.getDate(); i++) {
      const iDate = new Date(this.year, this.inputMonthForm.get('month').value, i);
      days.push(iDate);
    }
    return days;
  }

  changeValue() {
    this.days = this.daysInMonth();
  }

}
