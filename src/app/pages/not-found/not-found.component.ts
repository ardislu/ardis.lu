import { Component, OnInit } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import Fuse from 'fuse.js';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule
  ],
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent implements OnInit {
  public path = '';

  constructor(public location: Location, private router: Router) { }

  ngOnInit(): void {
    const allPaths = this.router.config.map(r => r.path);
    const fuse = new Fuse(allPaths); // Fuzzy matcher
    this.path = fuse.search(location.pathname)?.[0]?.item ?? '';
  }
}
