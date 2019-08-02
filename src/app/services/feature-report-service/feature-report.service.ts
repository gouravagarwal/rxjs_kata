import { Injectable } from '@angular/core';
import { FeatureRequest } from 'src/app/model/feature-request';
import { Observable, Subject, BehaviorSubject, ReplaySubject } from 'rxjs';
import { FeatureReport } from 'src/app/model/feature-report';
import { FeatureRequestService } from '../feature-request-service/feature-request.service';
import { map, scan } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FeatureReportService {


  constructor(private _featureRequestService: FeatureRequestService) { }


  liveReport(): Observable<FeatureReport> {
    let a = new FeatureReport(null, null, null);
    return this._featureRequestService.getSubscribableNewRequests().pipe(
      map((x: FeatureRequest) => { a.accumulateItem(x); return a; }),
      scan((x: FeatureReport, y: FeatureReport) => {
        let t = new FeatureReport(null, null, null);
        t.NumberIssues = x.NumberIssues + y.NumberIssues;
        t.NumberUrgent = x.NumberUrgent + y.NumberUrgent;
        t.NumberHighComplexity = x.NumberHighComplexity + y.NumberHighComplexity;
        return t;
      })
    );
  }
}
