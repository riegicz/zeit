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
  static zeroTime = '00:00';

  @Input()
  date: Date;

  // displayed at the right upper corner of the panel
  worktime: string = InputDayComponent.zeroTime;
  inputDayForm: FormGroup;
  errorMessage: string;
  panelClass: string;

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
    this.inputDayForm.get('typeOfDay').valueChanges.subscribe(() => this.handleForm());

    if (this.date.getDay() === 0 || this.date.getDay() === 6) { // Saturday or Sunday, TODO
      this.panelClass = 'zeit-expansion-panel-dark';
      this.inputDayForm.get('typeOfDay').setValue('2');
    } else {
      this.panelClass = 'zeit-expansion-panel-light';
      this.inputDayForm.get('typeOfDay').setValue('1');
    }
  }

  private createForm() {
    return this.fb.group({
      arrival: ['', [Validators.required, Validators.pattern(InputDayComponent.timePattern)]],
      leaving: ['', [Validators.required, Validators.pattern(InputDayComponent.timePattern)]],
      break: ['', [Validators.required, Validators.pattern(InputDayComponent.timePattern)]],
      typeOfDay: ['', [Validators.required]],
      activities: this.fb.array([])
    });
  }

  private handleForm() {
    if (this.inputDayForm.get('typeOfDay').value !== '1') {
      // controls must be disabled, otherwise the validators would do their job
      this.inputDayForm.get('arrival').disable();
      this.inputDayForm.get('leaving').disable();
      this.inputDayForm.get('break').disable();
      this.inputDayForm.get('activities').disable();
      this.worktime = InputDayComponent.zeroTime;
    } else {
      this.inputDayForm.get('arrival').enable();
      this.inputDayForm.get('leaving').enable();
      this.inputDayForm.get('break').enable();
      this.inputDayForm.get('activities').enable();
      this.refreshWorktime();
    }
  }

  initActivity() {
    return this.fb.group({
      actProject: ['', [Validators.required]],
      actPackage: ['', [Validators.required]],
      actDescription: ['', [Validators.required]],
      actTime: ['', [Validators.required, Validators.pattern(InputDayComponent.timePattern)]],
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
  }

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
      this.worktime = InputDayComponent.zeroTime;
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
