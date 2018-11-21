import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAddressModalPage } from './edit-address-modal.page';

describe('EditAddressModalPage', () => {
  let component: EditAddressModalPage;
  let fixture: ComponentFixture<EditAddressModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditAddressModalPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditAddressModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
