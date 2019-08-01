import { Injectable } from '@angular/core';
import { FeatureRequest } from 'src/app/model/feature-request';
import { Observable, timer, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { delay } from 'q';

@Injectable({
  providedIn: 'root'
})
export class DeveloperService {

  constructor() { }

  workFeatureRequest(featureRequest: FeatureRequest): Observable<FeatureRequest> {
    var result = timer(featureRequest.complexity * 100).pipe(map(() => featureRequest));

    return result;
  }

}
