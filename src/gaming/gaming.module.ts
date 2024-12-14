import { Module } from '@nestjs/common';
import { GamingController } from './gaming.controller';
import { ConsoleService } from './console_service/console.service';
import { GamesService } from './games-service/games.service';

const mockGamesService = {
  getAllGames: () => {
    return [
      { name: 'Super Mario 64', console: 'Nintendo 64' },
      { name: 'The Legend of Zelda: Ocarina of Time', console: 'Nintendo 64' },
      { name: 'Halo: Combat Evolved', console: 'Xbox' },
      { name: 'Final Fantasy VII', console: 'PlayStation' },
      { name: 'Gran Turismo', console: 'PlayStation' },
      { name: 'Sonic the Hedgehog', console: 'Sega Genesis' },
      { name: 'Donkey Kong Country', console: 'Super Nintendo' },
      { name: 'Tetris', console: 'Game Boy' },
      { name: 'The Elder Scrolls V: Skyrim', console: 'PlayStation 3' },
      { name: 'Minecraft', console: 'PC' },
    ];
  },
};

const mockConsoleMediaService = {
  getAllMedia: () => {
    return [
      { format: 'Cartridge', console: 'Nintendo 64' },
      { format: 'Cartridge', console: 'Sega Genesis' },
      { format: 'Cartridge', console: 'Super Nintendo' },
      { format: 'Mini CD', console: 'Nintendo GameCube' },
      { format: 'CD', console: 'PlayStation' },
      { format: 'DVD', console: 'PlayStation 2' },
      { format: 'DVD', console: 'Xbox' },
      { format: 'Blu-ray', console: 'PlayStation 3' },
      { format: 'Blu-ray', console: 'PlayStation 4' },
      { format: 'Blu-ray', console: 'Xbox One' },
    ];
  },
};

@Module({
  controllers: [GamingController],
  providers: [
    ConsoleService,
    {
      provide: GamesService,
      useValue: mockGamesService,
    },
    {
      provide: 'ConsoleMediaService',
      useValue: mockConsoleMediaService,
    },
  ],
  exports: [ConsoleService],
})
export class GamingModule {}
