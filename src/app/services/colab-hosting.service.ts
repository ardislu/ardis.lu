import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Adapter } from '@models/adapter.model';
import { BostonParameters, BostonPrediction } from '@models/colab-hosting.model';

@Injectable({
  providedIn: 'root'
})
export class BostonPredictionAdapter implements Adapter<BostonPrediction> {
  adapt(item: any): BostonPrediction {
    return new BostonPrediction(
      item.data.model,
      new BostonParameters(item.data.parameters),
      item.data.price
    );
  }
}

@Injectable({
  providedIn: 'root'
})
export class ColabHostingService {

  constructor(private http: HttpClient, private adapter: BostonPredictionAdapter) { }

  getBostonPrice(host: string, model: 'simple' | 'boosting' | 'bagging', params?: BostonParameters): Observable<BostonPrediction> {
    const modelMapping = {
      simple: 'api/v1/simple-est',
      boosting: 'api/v1/boosting-est',
      bagging: 'api/v1/bagging-est'
    };

    const endpointUrl = `${host}/${modelMapping[model]}`;
    return this.http.get(endpointUrl, {params: params?.stringParams}).pipe(
      map((item: any) => this.adapter.adapt(item)) // Singleton response: {item}
    );
  }
}
