import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BfService } from '@services/bf.service';
import { HeadService } from '@services/head.service';

@Component({
  standalone: true,
  imports: [
    RouterModule,
    FormsModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule
  ],
  selector: 'app-bfi',
  template: `
    <mat-card>
      <mat-card-title>
        bf-interpreter
      </mat-card-title>
      <mat-card-subtitle>
        Turing-complete!
        <a target="_blank" rel="noopener noreferrer" href="https://en.wikipedia.org/wiki/Brainfuck">
          <mat-icon svgIcon="launch"></mat-icon>
        </a>
      </mat-card-subtitle>

      <mat-card-content>
        <mat-form-field>
          <mat-label>Input</mat-label>
          <textarea matInput cdkTextareaAutosize [(ngModel)]="bf.input"></textarea>
        </mat-form-field>

        <mat-form-field>
          <mat-label>Script</mat-label>
          <textarea class="script" matInput cdkTextareaAutosize [(ngModel)]="bf.script"></textarea>
        </mat-form-field>

        <mat-form-field>
          <mat-label>Output</mat-label>
          <textarea matInput cdkTextareaAutosize disabled [value]="output"></textarea>
        </mat-form-field>
      </mat-card-content>

      <mat-card-actions>
        <button mat-button color="primary" (click)="execute()">
          RUN SCRIPT
        </button>
        <button mat-button color="accent" routerLink="/">HOME</button>
      </mat-card-actions>
    </mat-card>
  `,
  styles: `
    mat-card {
      box-sizing: border-box;
      inline-size: min(100% - 2rem, 720px);
      margin-inline: auto;
      margin-block: 1rem;
    }

    mat-icon {
      block-size: 14px;
    }

    mat-form-field {
      inline-size: 100%;
    }

    textarea {
      min-block-size: 1.5rem;
    }

    textarea.script {
      min-block-size: 3rem;
    }
  `
})
export class BfiComponent implements OnInit {
  public output!: string;

  constructor(public bf: BfService, private head: HeadService) {
    this.head.metadata = {
      title: 'bfi',
      description: 'Online interpreter for a popular programming language.',
      canonicalUrl: 'https://ardis.lu/bfi'
    };
  }

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
