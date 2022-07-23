import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, shareReplay } from 'rxjs';

import { environment } from '@environment';
import { ProjectCard } from '@models/project.model';
import { AboutCard } from '@models/about.model';

@Injectable({
  providedIn: 'root'
})
export class StrapiService {
  private _cards$: Observable<ProjectCard[]>;
  private _about$: Observable<AboutCard>;

  constructor(private http: HttpClient) {
    this._cards$ = this.http.get(`${environment.strapiHost}/project-cards`).pipe(
      shareReplay(1),
      map(StrapiService.toProjectCards)
    );
    this._about$ = this.http.get(`${environment.strapiHost}/about`).pipe(
      shareReplay(1),
      map(StrapiService.toAboutCard)
    );
  }

  get cards$() {
    return this._cards$;
  }

  get about$() {
    return this._about$;
  }

  public static toProjectCards(obj: Record<string, any>): ProjectCard[] {
    // CMS returns [{item}]
    return obj.map((card: Record<string, any>) => ({
      title: card.title,
      description: card.description,
      route: card.route
    }));
  }

  public static toAboutCard(obj: Record<string, any>): AboutCard {
    // CMS returns {item}
    return {
      title: obj.title,
      subtitle: obj.subtitle,
      description: obj.description
    };
  }
}
