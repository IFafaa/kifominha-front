import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DefaultSearchInputComponent } from './default-search-input.component';

describe('DefaultSearchInputComponent', () => {
  let component: DefaultSearchInputComponent;
  let fixture: ComponentFixture<DefaultSearchInputComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DefaultSearchInputComponent]
    });
    fixture = TestBed.createComponent(DefaultSearchInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
