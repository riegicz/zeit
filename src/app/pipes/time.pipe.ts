import {Pipe, PipeTransform} from '@angular/core';
import {InputDayComponent} from "../components/input-day/input-day.component";

@Pipe({
  name: 'time'
})
export class TimePipe implements PipeTransform {

  transform(hours: number, minutes: number): string {
    let worktime: string;
    if (hours >= 0 && minutes >= 0) {

      if (hours < 10) {
        worktime = '0' + hours;
      } else {
        worktime = '' + hours;
      }
      if (minutes < 10) {
        worktime += ':0' + minutes;
      } else {
        worktime += ':' + minutes;
      }
    }
    else {
      worktime = '00:00';
    }
    return worktime;
  }

}
