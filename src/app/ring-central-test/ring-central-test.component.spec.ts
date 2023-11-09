import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RingCentralTestComponent } from './ring-central-test.component';

describe('RingCentralTestComponent', () => {
  let component: RingCentralTestComponent;
  let fixture: ComponentFixture<RingCentralTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RingCentralTestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RingCentralTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
