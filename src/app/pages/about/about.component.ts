import { Component, OnInit } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { LoaderModule } from '../../components/loader/loader.module';
import { AboutCard } from '../../models/about.model';
import { AboutCardService } from '../../services/strapi.service';
import { Observable } from 'rxjs';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    LoaderModule
  ],
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
  public aboutCard$!: Observable<AboutCard>;

  constructor(private location: Location, private about: AboutCardService) {
  }

  ngOnInit(): void {
    this.aboutCard$ = this.about.list();
  }

  goBack() {
    this.location.back();
  }

}
