import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPhonesModalPage } from './edit-phones-modal.page';

describe('EditPhonesModalPage', () => {
  let component: EditPhonesModalPage;
  let fixture: ComponentFixture<EditPhonesModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditPhonesModalPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPhonesModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
