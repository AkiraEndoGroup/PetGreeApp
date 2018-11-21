import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowImageModalPage } from './show-image-modal.page';

describe('ShowImageModalPage', () => {
  let component: ShowImageModalPage;
  let fixture: ComponentFixture<ShowImageModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowImageModalPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowImageModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
