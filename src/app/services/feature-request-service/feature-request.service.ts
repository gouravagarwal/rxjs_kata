import { Injectable } from '@angular/core';
import { FeatureRequest } from 'src/app/model/feature-request';
import { Observable, Subject, BehaviorSubject, ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FeatureRequestService {
  public featRequest: FeatureRequest = new FeatureRequest(null,null,null,null);
  public newRequestSubject$: Subject<FeatureRequest> = new Subject<FeatureRequest>();
  public newRequestBehaviourSubject$: BehaviorSubject<FeatureRequest> = new BehaviorSubject<FeatureRequest>(this.featRequest);
  public newRequestReplayBehaviourSubject$: ReplaySubject<FeatureRequest> = new ReplaySubject<FeatureRequest>(3);

  constructor() { }

  newRequest(feature: FeatureRequest) {
    this.newRequestSubject$.next(feature);
  }

  newRequests(features: FeatureRequest[]) {
    features.forEach(x => {
      this.newRequestBehaviourSubject$.next(x);
      this.newRequestReplayBehaviourSubject$.next(x);
    });
  }

  getSubscribableNewRequests(): Observable<FeatureRequest> {
    return this.newRequestSubject$;
  }

  getSubscribableWithLatestItem(): Observable<FeatureRequest> {
    return this.newRequestBehaviourSubject$;
  }

  getSubscribableWithLastThree():Observable<FeatureRequest> {
    return this.newRequestReplayBehaviourSubject$;
  }


}
