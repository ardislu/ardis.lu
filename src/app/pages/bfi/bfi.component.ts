import { Component, OnInit } from '@angular/core';
import { BfService } from '../../services/bf.service';

@Component({
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
