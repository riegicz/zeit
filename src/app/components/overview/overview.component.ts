import {Component, OnInit} from '@angular/core';
import {MatTableDataSource} from "@angular/material";
import {MonthOverview} from "../../model/monthOverview";
import {FormBuilder, FormGroup} from "@angular/forms";
import * as moment from "moment";

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit {

  overviewForm: FormGroup; // form controls
  years: number[]; // options for year-dropdown

  displayedColumns = ['monthName', 'targetHours', 'actualHours', 'overtime', 'leave', 'sickDays', 'remainingLeave'];
  dataSource: MatTableDataSource<MonthOverview>;
  allRows: MonthOverview[];

  constructor(private fb: FormBuilder) {

    this.allRows = [
      {
        monthName: 'Januar',
        targetHours: 176,
        actualHours: 167,
        overtime: 10,
        leave: 0,
        sickDays: 0,
        remainingLeave: '',
      },
      {
        monthName: 'Februar',
        targetHours: 176,
        actualHours: 167,
        overtime: 6,
        leave: 0,
        sickDays: 1,
        remainingLeave: '',
      },
      {
        monthName: 'Gesamt',
        targetHours: 990,
        actualHours: 870,
        overtime: 16,
        leave: 0,
        sickDays: 1,
        remainingLeave: '24',
      },];

  }

  ngOnInit() {
    this.overviewForm = this.createForm();
    this.years = [2018, 2019];
    this.dataSource = new MatTableDataSource<MonthOverview>(this.allRows);
  }

  private createForm() {
    return this.fb.group({
      year: [moment().year(),],
      dateOfLastSigning: ['10.11.2018'],
    });
  }

}
