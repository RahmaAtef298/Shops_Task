import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopadminProfileComponent } from './shopadmin-profile.component';

describe('ShopadminProfileComponent', () => {
  let component: ShopadminProfileComponent;
  let fixture: ComponentFixture<ShopadminProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShopadminProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopadminProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
