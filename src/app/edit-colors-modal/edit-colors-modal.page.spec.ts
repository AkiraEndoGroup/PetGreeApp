import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditColorsModalPage } from './edit-colors-modal.page';

describe('EditColorsModalPage', () => {
  let component: EditColorsModalPage;
  let fixture: ComponentFixture<EditColorsModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditColorsModalPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditColorsModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
