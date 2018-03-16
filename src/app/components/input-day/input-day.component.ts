import {Component, Input, OnInit} from '@angular/core';
import {Activity} from '../../model/activity';
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {BackendService} from "../../services/backend.service";
import {MatDialog} from '@angular/material';
import {SpinnerComponent} from '../spinner/spinner.component';


@Component({
  selector: 'app-input-day',
  templateUrl: './input-day.component.html',
  styleUrls: ['./input-day.component.css']
})
export class InputDayComponent implements OnInit {

  static timePattern = '([01]?[0-9]|2[0-3]):[0-5][0-9]';

  @Input()
  date: string;

  @Input()
  dayOfWeek: string;

  // displayed at the right upper corner of the panel
  worktime: string = '00:00';

  inputDayForm: FormGroup;

  errorMessage: string;

  constructor(private fb: FormBuilder,
              private backendService: BackendService,
              public dialog: MatDialog) {
  }

  ngOnInit() {

    this.inputDayForm = this.createForm();
    this.addActivity();

    this.inputDayForm.get('arrival').valueChanges.subscribe(() => this.refreshWorktime());
    this.inputDayForm.get('leaving').valueChanges.subscribe(() => this.refreshWorktime());
    this.inputDayForm.get('break').valueChanges.subscribe(() => this.refreshWorktime());
  }

  private createForm() {
    return this.fb.group({
      arrival: ['', [Validators.required, Validators.pattern(InputDayComponent.timePattern)]],
      leaving: ['', [Validators.required, Validators.pattern(InputDayComponent.timePattern)]],
      break: ['', [Validators.required, Validators.pattern(InputDayComponent.timePattern)]],
      activities: this.fb.array([])
    });
  }

  initActivity() {
    return this.fb.group({
      actProject: '',
      actDescription: '',
      actTime: '',
    });
  }

  addActivity() {
    const controls = <FormArray>this.inputDayForm.get('activities');
    const actCtrl = this.initActivity();
    controls.push(actCtrl);
  }

  removeActivity(i: number) {
    const controls = <FormArray>this.inputDayForm.get('activities');
    controls.removeAt(i);
  }

  get activites(): FormArray {
    return this.inputDayForm.get('activities') as FormArray;
  };

  private refreshWorktime() {
    const someday = '1970-01-01 ';
    const dateArrival: number = new Date(someday + this.inputDayForm.get('arrival').value).getTime();
    const dateLeaving: number = new Date(someday + this.inputDayForm.get('leaving').value).getTime();
    const dateBreakStart: number = new Date(someday + '00:00').getTime();
    const dateBreakEnd: number = new Date(someday + this.inputDayForm.get('break').value).getTime();
    let worktime: number = dateLeaving - dateArrival - (dateBreakEnd - dateBreakStart);
    if (worktime > 0) {
      worktime /= 60000; // minutes
      let hours: number = Math.floor(worktime / 60);
      let minutes: number = Math.abs(Math.floor(worktime % 60));
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

  save() {
    this.errorMessage = null;
    let dialogRef = this.dialog.open(SpinnerComponent, {disableClose: true});
    this.backendService.saveADay()
      .subscribe((success: boolean) => {
        console.log(success);
        dialogRef.close();
      }, (error) => {
        this.errorMessage = 'Fehler beim Speichern';
        console.log(error);
        dialogRef.close();
      });
  }
}
