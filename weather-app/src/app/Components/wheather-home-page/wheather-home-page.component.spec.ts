import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WheatherHomePageComponent } from './wheather-home-page.component';

describe('WheatherHomePageComponent', () => {
  let component: WheatherHomePageComponent;
  let fixture: ComponentFixture<WheatherHomePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WheatherHomePageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WheatherHomePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
