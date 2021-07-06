import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LaunchsComponent } from './launchs.component';

describe('LaunchsComponent', () => {
  let component: LaunchsComponent;
  let fixture: ComponentFixture<LaunchsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LaunchsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LaunchsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
