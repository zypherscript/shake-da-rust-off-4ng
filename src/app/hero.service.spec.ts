import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { HeroService } from './hero.service';
import { Hero } from './hero';
import { MessageService } from './message.service';
import { catchError, throwError } from 'rxjs';

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

  describe('getHero', () => {
    it('should retrieve a hero by id from the API', () => {
      const dummyHero: Hero = { id: 1, name: 'Hero 1' };

      heroService.getHero(1).subscribe((hero) => {
        expect(hero).toEqual(dummyHero);
      });

      const req = httpMock.expectOne('api/heroes/1');
      expect(req.request.method).toBe('GET');
      req.flush(dummyHero);
    });

    it('should handle errors when retrieving a hero by id', () => {
      heroService
        .getHero(1)
        .pipe(
          catchError((error) => {
            expect(error).toBeTruthy();
            return throwError(() => error);
          })
        )
        .subscribe();

      const req = httpMock.expectOne('api/heroes/1');
      expect(req.request.method).toBe('GET');
      req.flush(null, { status: 500, statusText: 'Internal Server Error' });
    });
  });

  describe('searchHeroes', () => {
    it('should search for heroes by name in the API', () => {
      const searchName = 'Hero';

      const dummyHeroes: Hero[] = [
        { id: 1, name: 'Hero 1' },
        { id: 2, name: 'Hero 2' },
      ];

      heroService.searchHeroes(searchName).subscribe((heroes) => {
        expect(heroes.length).toBe(2);
        expect(heroes).toEqual(dummyHeroes);
      });

      const req = httpMock.expectOne(`api/heroes/?name=${searchName}`);
      expect(req.request.method).toBe('GET');
      req.flush(dummyHeroes);
    });

    it('should return an empty array when searching for heroes with empty search term', () => {
      const emptySearch = '';

      heroService.searchHeroes(emptySearch).subscribe((heroes) => {
        expect(heroes.length).toBe(0);
      });

      httpMock.expectNone(`api/heroes/?name=${emptySearch}`);
    });
  });

  describe('addHero', () => {
    it('should add a hero to the API', () => {
      const newHero: Hero = { id: 3, name: 'Hero 3' };

      heroService.addHero(newHero).subscribe((hero) => {
        expect(hero).toEqual(newHero);
      });

      const req = httpMock.expectOne('api/heroes');
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual(newHero);
      req.flush(newHero);
    });

    it('should handle errors when adding a hero', () => {
      const newHero: Hero = { id: 3, name: 'Hero 3' };

      heroService
        .addHero(newHero)
        .pipe(
          catchError((error) => {
            expect(error).toBeTruthy();
            return throwError(() => error);
          })
        )
        .subscribe();

      const req = httpMock.expectOne('api/heroes');
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual(newHero);
      req.flush(null, { status: 500, statusText: 'Internal Server Error' });
    });
  });

  describe('deleteHero', () => {
    it('should delete a hero from the API', () => {
      const heroId = 2;

      heroService.deleteHero(heroId).subscribe((hero) => {
        expect(hero.id).toBe(heroId);
      });

      const req = httpMock.expectOne(`api/heroes/${heroId}`);
      expect(req.request.method).toBe('DELETE');
      req.flush({ id: heroId });
    });

    it('should handle errors when deleting a hero', () => {
      const heroId = 2;

      heroService
        .deleteHero(heroId)
        .pipe(
          catchError((error) => {
            expect(error).toBeTruthy();
            return throwError(() => error);
          })
        )
        .subscribe();

      const req = httpMock.expectOne(`api/heroes/${heroId}`);
      expect(req.request.method).toBe('DELETE');
      req.flush(null, { status: 500, statusText: 'Internal Server Error' });
    });
  });

  describe('updateHero', () => {
    it('should update a hero on the API', () => {
      const updatedHero: Hero = { id: 1, name: 'Updated Hero' };

      heroService.updateHero(updatedHero).subscribe((response) => {
        expect(response).toBeTruthy();
      });

      const req = httpMock.expectOne('api/heroes');
      expect(req.request.method).toBe('PUT');
      expect(req.request.body).toEqual(updatedHero);
      req.flush(updatedHero);
    });

    it('should handle errors when updating a hero', () => {
      const updatedHero: Hero = { id: 1, name: 'Updated Hero' };

      heroService
        .updateHero(updatedHero)
        .pipe(
          catchError((error) => {
            expect(error).toBeTruthy();
            return throwError(() => error);
          })
        )
        .subscribe();

      const req = httpMock.expectOne('api/heroes');
      expect(req.request.method).toBe('PUT');
      expect(req.request.body).toEqual(updatedHero);
      req.flush(null, { status: 500, statusText: 'Internal Server Error' });
    });
  });
});
