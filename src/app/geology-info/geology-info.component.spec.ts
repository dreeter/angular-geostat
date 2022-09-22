import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeologyInfoComponent } from './geology-info.component';

describe('GeologyInfoComponent', () => {
  let component: GeologyInfoComponent;
  let fixture: ComponentFixture<GeologyInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GeologyInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GeologyInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
