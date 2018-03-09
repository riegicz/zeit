import {Injectable} from '@angular/core';
import {Observable} from "rxjs/Observable";
import 'rxjs/add/observable/of';

@Injectable()
export class BackendService {

  constructor() {
  }

  saveADay():Observable<boolean> {
    return Observable.of(true);
  }

}
