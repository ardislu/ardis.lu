import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

import { environment } from '@environment';
import { Adapter } from '@models/adapter.model';
import { ProjectCard } from '@models/project.model';
import { AboutCard } from '@models/about.model';

@Injectable({
  providedIn: 'root'
})
export class ProjectCardAdapter implements Adapter<ProjectCard> {
  adapt(item: any): ProjectCard {
    return new ProjectCard(
      item.title,
      item.tags.replace(/ /g, '').split(','),
      item.description,
      item.route
    );
  }
}

@Injectable({
  providedIn: 'root'
})
export class ProjectCardService {
  private cache!: Observable<ProjectCard[]>;

  constructor(private http: HttpClient, private adapter: ProjectCardAdapter) { }

  list(): Observable<ProjectCard[]> {
    if (this.cache) {
      return this.cache;
    }

    const url = `${environment.strapiHost}/project-cards`;
    this.cache = this.http.get(url).pipe(
      shareReplay(1), // Send last response on future subscriptions on this observable
      map((itemList: any) => itemList.map((item: any) => this.adapter.adapt(item))), // List of items response: [{item}]
    );
    return this.cache;
  }
}

@Injectable({
  providedIn: 'root'
})
export class AboutCardAdapter implements Adapter<AboutCard> {
  adapt(item: any): AboutCard {
    return new AboutCard(
      item.title,
      item.subtitle,
      item.description
    );
  }
}

@Injectable({
  providedIn: 'root'
})
export class AboutCardService {
  private cache!: Observable<AboutCard>;

  constructor(private http: HttpClient, private adapter: AboutCardAdapter) { }

  list(): Observable<AboutCard> {
    if (this.cache) {
      return this.cache;
    }

    const url = `${environment.strapiHost}/about`;
    this.cache = this.http.get(url).pipe(
      shareReplay(1), // Send last response on future subscriptions on this observable
      map((item: any) => this.adapter.adapt(item)) // Singleton response: {item}
    );
    return this.cache;
  }
}
