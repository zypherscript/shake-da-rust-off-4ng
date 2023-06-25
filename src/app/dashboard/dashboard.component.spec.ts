import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { DashboardComponent } from './dashboard.component';
import { HeroSearchComponent } from '../hero-search/hero-search.component';

import { RouterTestingModule } from '@angular/router/testing';
import { HeroService } from '../hero.service';
import { Observable, of } from 'rxjs';
import { HEROES } from '../mock-heroes';
import { Hero } from '../hero';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let heroService: jasmine.SpyObj<HeroService>;
  let getHeroesSpy: jasmine.Spy<() => Observable<Hero[]>>;

  beforeEach(waitForAsync(() => {
    heroService = jasmine.createSpyObj('HeroService', ['getHeroes']);
    getHeroesSpy = heroService.getHeroes.and.returnValue(of(HEROES));
    TestBed.configureTestingModule({
      declarations: [DashboardComponent, HeroSearchComponent],
      imports: [RouterTestingModule.withRoutes([])],
      providers: [{ provide: HeroService, useValue: heroService }],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display "Top Heroes" as headline', () => {
    expect(fixture.nativeElement.querySelector('h2').textContent).toEqual(
      'Top Heroes'
    );
  });

  it('should call heroService', waitForAsync(() => {
    expect(getHeroesSpy.calls.any()).toBe(true);
  }));

  it('should display 4 links', waitForAsync(() => {
    expect(fixture.nativeElement.querySelectorAll('a').length).toEqual(4);
  }));

  it('should contain app-hero-search component', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('app-hero-search')).toBeTruthy();
  });
});
