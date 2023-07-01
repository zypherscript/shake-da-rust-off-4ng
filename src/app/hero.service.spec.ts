import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { HeroService } from './hero.service';
import { Hero } from './hero';
import { MessageService } from './message.service';

describe('HeroService', () => {
  let heroService: HeroService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [HeroService, MessageService],
    });

    heroService = TestBed.inject(HeroService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(heroService).toBeTruthy();
  });

  describe('getHeroes', () => {
    it('should return an Observable array of heroes', () => {
      const mockHeroes: Hero[] = [
        { id: 1, name: 'Hero 1' },
        { id: 2, name: 'Hero 2' },
      ];

      heroService.getHeroes().subscribe((heroes) => {
        expect(heroes).toEqual(mockHeroes);
      });

      const req = httpMock.expectOne('api/heroes');
      expect(req.request.method).toBe('GET');
      req.flush(mockHeroes);
    });

    it('should handle errors and return an empty array', () => {
      heroService.getHeroes().subscribe((heroes) => {
        expect(heroes).toEqual([]);
      });

      const req = httpMock.expectOne('api/heroes');
      expect(req.request.method).toBe('GET');
      req.flush([], { status: 500, statusText: 'Internal Server Error' });
    });
  });
});
