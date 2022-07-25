import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BfService {
  public script = '';
  public input = '';
  private _output = '';

  private readonly tapeSize = 1000;

  get output(): string {
    return this._output;
  }

  reset(): void {
    this.script = '';
    this.input = '';
    this._output = '';
  }

  setHelloWorld(): void {
    this.script = '++++++++[>++++[>++>+++>+++>+<<<<-]>+>+>->>+[<]<-]>>.>---.+++++++..+++.>>.<-.<.+++.------.--------.>>+.>++';
    this.input = '';
    this._output = '';
  }

  executeScript(): void {
    const script = [...this.script]; // Spread string to char array
    const bracketIndices = this.getMatchingBracketsMap(this.script);
    const tape = new Array(this.tapeSize).fill(0);
    const output = [];
    let executionPointer = 0;
    let addressPointer = 0;
    let inputPointer = 0;
    let finished = false;

    while (!finished) {
      // Execute bf instructions
      switch (script[executionPointer]) {
        case '>': {
          addressPointer++;
          executionPointer++;
          break;
        }
        case '<': {
          addressPointer--;
          executionPointer++;
          break;
        }
        case '+': {
          tape[addressPointer]++;
          executionPointer++;
          break;
        }
        case '-': {
          tape[addressPointer]--;
          executionPointer++;
          break;
        }
        case '.': {
          output.push(String.fromCharCode(tape[addressPointer]));
          executionPointer++;
          break;
        }
        case ',': {
          tape[addressPointer] = this.input.charCodeAt(inputPointer);
          inputPointer++;
          executionPointer++;
          break;
        }
        case '[': {
          if (tape[addressPointer]) { // Not zero
            executionPointer++;
          }
          else {
            executionPointer = bracketIndices[executionPointer];
          }
          break;
        }
        case ']': {
          if (!tape[addressPointer]) { // Zero
            executionPointer++;
          }
          else {
            executionPointer = bracketIndices[executionPointer];
          }
          break;
        }
        default: {
          executionPointer++;
        }
      }

      if (executionPointer === script.length) { // Don't need +1 because last switch-case does +1 over index
        finished = true;
      }
    }

    this._output = output.join('');
  }

  private getMatchingBracketsMap(script: string): { [key: number]: number } {
    const indices: { [key: number]: number } = {}; // Map of inner bracket to outer bracket, and vice versa
    const innerBrackets: number[] = []; // Indices of inner brackets, in order

    for (let i = 0; i < script.length; i++) {
      if (script.charAt(i) === '[') {
        innerBrackets.push(i);
      }
      else if (script.charAt(i) === ']') {
        const startIndex = innerBrackets.pop() as number;
        indices[startIndex] = i;
        indices[i] = startIndex;
      }
    }

    return indices;
  }
}
