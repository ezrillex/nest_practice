import {
  Body,
  Controller,
  DefaultValuePipe,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Inject,
  Param,
  ParseBoolPipe,
  ParseIntPipe,
  Post,
  Query,
  Redirect,
  UseFilters,
  UseGuards,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import { PostConsoleDto } from '../dto/PostConsoleDto';
import { ConsoleService } from './console_service/console.service';
import { Console } from './interfaces/console.interface';
import { OwnershipException } from '../exceptions/ownership.exception';
import { HttpExceptionFilter } from '../http-exception/http-exception.filter';
import { NotNegativePipe } from '../Pipes/not-negative-pipe.service';
import { ZodValidationPipe } from '../Pipes/ZodValidationPipe';
import { createConsoleSchema } from '../schema/console.schema';
import { SecrettokenGuard } from '../secrettoken/secrettoken.guard';
import { WrapintodataInterceptor } from '../wrapintodata/wrapintodata.interceptor';
import { GamesService } from './games-service/games.service';
import { ConsoleMediaService } from './console-media/console-media.service';

@Controller('gaming')
@UseFilters(new HttpExceptionFilter())
@UseInterceptors(WrapintodataInterceptor)
export class GamingController {
  constructor(
    private consoleService: ConsoleService,
    private gamesService: GamesService,
    @Inject('ConsoleMediaService')
    private consoleMediaService: ConsoleMediaService,
  ) {}

  @Get()
  getGaming() {
    return 'Hello World! from the base gaming root';
  }

  @Get('secret')
  @UseGuards(SecrettokenGuard)
  secretSauce() {
    return 'Mustard with onions';
  }

  @Get('consoles')
  @HttpCode(202)
  getConsoles(
    @Query('stringified', new DefaultValuePipe(false), ParseBoolPipe)
    stringified: boolean,
  ): Console[] | string {
    if (stringified) {
      return JSON.stringify(this.consoleService.getAllConsoles());
    } else {
      return this.consoleService.getAllConsoles();
    }
  }

  @Get('information')
  @Redirect('https://en.wikipedia.org/wiki/Gaming', 301)
  getInformation() {}

  @Get('consoles/:id')
  getConsoleId(
    @Param('id', ParseIntPipe, NotNegativePipe)
    id: number,
  ) {
    console.log('id ', id);
    if (id < this.consoleService.getCount()) {
      return this.consoleService.getConsole(id);
    } else {
      throw new HttpException('Record Not Found', HttpStatus.NOT_FOUND);
    }
  }

  @Get('consoles/admin')
  adminStuff() {
    return new OwnershipException();
  }

  @Post('consoles')
  @UsePipes(new ZodValidationPipe(createConsoleSchema))
  postConsole(@Body() postData: PostConsoleDto) {
    this.consoleService.registerNewConsole(postData);
  }

  @Get('games')
  getAllGames() {
    return this.gamesService.getAllGames();
  }

  @Get('consoles/formats')
  getAllConsoleMedia() {
    return this.consoleMediaService.getAllMedia();
  }
}
