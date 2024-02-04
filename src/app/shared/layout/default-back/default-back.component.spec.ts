import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DefaultBackComponent } from './default-back.component';

describe('DefaultBackComponent', () => {
  let component: DefaultBackComponent;
  let fixture: ComponentFixture<DefaultBackComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DefaultBackComponent]
    });
    fixture = TestBed.createComponent(DefaultBackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
