import {Component, Input, OnInit} from '@angular/core';
import {Activity} from '../../model/activity';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {BackendService} from "../../services/backend.service";
import {MatDialog} from '@angular/material';
import {SpinnerComponent} from '../spinner/spinner.component';


@Component({
  selector: 'app-input-day',
  templateUrl: './input-day.component.html',
  styleUrls: ['./input-day.component.css']
})
export class InputDayComponent implements OnInit {

  @Input()
  date:string;

  @Input()
  dayOfWeek:string;

  // displayed at the right upper corner of the panel
  worktime:string = '00:00';

  activities:Activity[];

  inputDayForm:FormGroup;

  constructor(private fb:FormBuilder,
              private backendService:BackendService,
              public dialog: MatDialog) {
    this.activities = new Array<Activity>();
    this.addActivity(0);
    this.inputDayForm = this.createForm();
  }

  ngOnInit() {
    this.inputDayForm.get('arrival').valueChanges.subscribe(() => this.refreshWorktime());
    this.inputDayForm.get('leaving').valueChanges.subscribe(() => this.refreshWorktime());
    this.inputDayForm.get('break').valueChanges.subscribe(() => this.refreshWorktime());
  }

  isLastActivity(i:number):boolean {
    const maxNr = Math.max(...this.activities.map(o => o.nr));
    if (i === maxNr) {
      return true;
    } else {
      return false;
    }
  }

  addActivity(i:number) {
    const activity = new Activity();
    activity.nr = i + 1;
    this.activities.push(activity);
  }

  deleteActivity(i:number) {
    const index = this.activities.map(o => o.nr).indexOf(i);
    this.activities.splice(index, 1);
  }

  save() {
    let dialogRef = this.dialog.open(SpinnerComponent, {disableClose: true});
    this.backendService.saveADay()
      .subscribe((success:boolean) => {
        console.log(success);
        dialogRef.close();
      }, (error) => {
        console.log(error);
        dialogRef.close();
      });
  }

  private createForm() {
    const timePattern = '([01]?[0-9]|2[0-3]):[0-5][0-9]';
    return this.fb.group({
      arrival: ['', [Validators.required, Validators.pattern(timePattern)]],
      leaving: ['', [Validators.required, Validators.pattern(timePattern)]],
      break: ['', [Validators.required, Validators.pattern(timePattern)]],
    });
  }

  private refreshWorktime() {
    const someday = '1970-01-01 ';
    const dateArrival:number = new Date(someday + this.inputDayForm.get('arrival').value).getTime();
    const dateLeaving:number = new Date(someday + this.inputDayForm.get('leaving').value).getTime();
    const dateBreakStart:number = new Date(someday + '00:00').getTime();
    const dateBreakEnd:number = new Date(someday + this.inputDayForm.get('break').value).getTime();
    let worktime:number = dateLeaving - dateArrival - (dateBreakEnd - dateBreakStart);
    if (worktime > 0) {
      worktime /= 60000; // minutes
      let hours:number = Math.floor(worktime / 60);
      let minutes:number = Math.abs(Math.floor(worktime % 60));
      if (hours < 10) {
        this.worktime = '0' + hours;
      } else {
        this.worktime = '' + hours;
      }
      if (minutes < 10) {
        this.worktime += ':0' + minutes;
      } else {
        this.worktime += ':' + minutes;
      }
    } else {
      this.worktime = '00:00';
    }
  }
}
