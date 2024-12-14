import { Injectable } from '@nestjs/common';
import { Console } from '../interfaces/console.interface';
import { ICountableService } from '../../icountable-service/icountable-service.interface';

@Injectable()
export class ConsoleService implements ICountableService {
  private readonly consoles: Console[] = [
    { name: 'xbox', release_year: 1987 },
    { name: 'playstation', release_year: 2001 },
    { name: 'nintendo', release_year: 2015 },
  ];

  registerNewConsole(newBlock: Console) {
    this.consoles.push(newBlock);
  }
  // should it do the validation of out of bounds here?
  getConsole(id: number) {
    return this.consoles[id];
  }

  getAllConsoles() {
    return this.consoles;
  }

  getCount(): number {
    return this.consoles.length;
  }
}
