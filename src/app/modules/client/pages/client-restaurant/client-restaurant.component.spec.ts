import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientRestaurantComponent } from './client-restaurant.component';

describe('ClientRestaurantComponent', () => {
  let component: ClientRestaurantComponent;
  let fixture: ComponentFixture<ClientRestaurantComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ClientRestaurantComponent]
    });
    fixture = TestBed.createComponent(ClientRestaurantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
