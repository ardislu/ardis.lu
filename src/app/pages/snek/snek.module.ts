import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SnekRoutingModule } from './snek-routing.module';
import { SnekComponent } from './snek.component';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

import { SnakeGameComponent } from '../../components/snake-game/snake-game.component';

@NgModule({
  declarations: [SnekComponent],
  imports: [
    CommonModule,
    SnekRoutingModule,
    MatCardModule,
    MatButtonModule,
    SnakeGameComponent
  ]
})
export class SnekModule { }
