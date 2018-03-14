import {Injectable} from '@angular/core';
import {Observable} from "rxjs/Observable";
import 'rxjs/add/observable/of';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class BackendService {

  constructor(private http: HttpClient) {
  }

  saveADay():Observable<boolean> {
    return this.http.get<boolean>('http://localhost:8000');
    //return Observable.of(true);
  }

}
