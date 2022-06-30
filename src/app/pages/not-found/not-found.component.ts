import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import Fuse from 'fuse.js';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent implements OnInit {
  public path = '';

  constructor(public location: Location, private router: Router) { }

  ngOnInit(): void {
    const currentPath = window.location.pathname;
    const allPaths = this.router.config.map(r => r.path);
    const fuse = new Fuse(allPaths); // Fuzzy matcher
    this.path = fuse.search(currentPath)?.[0]?.item ?? '';
  }
}
