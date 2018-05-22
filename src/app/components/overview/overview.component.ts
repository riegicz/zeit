import {Component, OnInit} from '@angular/core';
import {MatTableDataSource} from "@angular/material";
import {MonthOverview} from "../../model/monthOverview";

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit {

  displayedColumns = ['monthName', 'targetHours', 'actualHours', 'overtime', 'leave', 'sickDays'];
  dataSource: MatTableDataSource<MonthOverview>;

  allRows: MonthOverview[];

  constructor() {

    this.allRows = [
      {
        monthName: 'Januar',
        targetHours: 176,
        actualHours: 167,
        overtime: 10,
        leave: 0,
        sickDays: 0,
      },
      {
        monthName: 'Februar',
        targetHours: 176,
        actualHours: 167,
        overtime: 6,
        leave: 0,
        sickDays: 0,
      },];

  }

  ngOnInit() {

    this.dataSource = new MatTableDataSource<MonthOverview>(this.allRows);
  }

}
