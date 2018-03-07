import {Component, Input, OnInit} from '@angular/core';
import {Activity} from '../../model/activity';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";


@Component({
  selector: 'app-input-day',
  templateUrl: './input-day.component.html',
  styleUrls: ['./input-day.component.css']
})
export class InputDayComponent implements OnInit {

  @Input()
  date: string;

  @Input()
  dayOfWeek: string;

  // displayed at the right upper corner of the panel
  overtime: string = '00:00';

  activities: Activity[];

  inputDayForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.activities = new Array<Activity>();
    this.addActivity(0);
    this.inputDayForm = this.createForm();
  }

  ngOnInit() {
  }

  isLastActivity(i: number): boolean {
    const maxNr = Math.max(...this.activities.map(o => o.nr));
    if (i === maxNr) {
      return true;
    } else {
      return false;
    }
  }

  addActivity(i: number) {
    const activity = new Activity();
    activity.nr = i + 1;
    this.activities.push(activity);
  }

  deleteActivity(i: number) {
    const index = this.activities.map(o => o.nr).indexOf(i);
    this.activities.splice(index, 1);
  }

  save() {
    
  }

  private createForm() {
    const timePattern = '([01]?[0-9]|2[0-3]):[0-5][0-9]';
    return this.fb.group({
      arrival: ['', [Validators.required, Validators.pattern(timePattern)]],
      leaving: ['', [Validators.required, Validators.pattern(timePattern)]],
      break: ['', [Validators.required, Validators.pattern(timePattern)]],
    });
  }
}
