import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BfService } from '@services/bf.service';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule
  ],
  selector: 'app-bfi',
  templateUrl: './bfi.component.html',
  styleUrls: ['./bfi.component.scss']
})
export class BfiComponent implements OnInit {
  public output!: string;

  constructor(public bf: BfService) { }

  ngOnInit(): void {
    this.bf.setHelloWorld();
    this.output = 'Run the script...';
  }

  execute(): void {
    if (this.bf.script === '') {
      this.output = 'No script!';
      return;
    }
    this.bf.executeScript();
    this.output = this.bf.output;
  }

}
