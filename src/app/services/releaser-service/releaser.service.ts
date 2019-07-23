import { Injectable } from '@angular/core';
import { DeveloperService } from '../developer-service/developer.service';
import { Observable, iif, interval, EMPTY, of, concat } from 'rxjs';
import { FeatureRequestService } from '../feature-request-service/feature-request.service';
import { FeatureRequest } from 'src/app/model/feature-request';
//solutions may or may not involve using one or more of the operators
import { mergeMap, concatMap, pairwise, tap, scan, switchMap, withLatestFrom, takeWhile, merge, map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class ReleaserService {


    constructor(private _developerService: DeveloperService, private _featureRequestService: FeatureRequestService) {

    }
    


    releaseAsCompleted(): Observable<FeatureRequest> {
        return this._featureRequestService.getSubscribableWithLastThree().pipe(
            mergeMap(x =>  this._developerService.workFeatureRequest(x) ),
            );
    }

    releaseInOrderRequested(): Observable<FeatureRequest> {
        return this._featureRequestService.getSubscribableWithLastThree().pipe(
            concatMap(x =>  this._developerService.workFeatureRequest(x) ),
            );
    }


    flakyManagerReleaseStrategy(): Observable<FeatureRequest> {

        return undefined;

    }

}
