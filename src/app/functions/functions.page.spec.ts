import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FunctionsPage } from './functions.page';

describe('FunctionsPage', () => {
  let component: FunctionsPage;
  let fixture: ComponentFixture<FunctionsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FunctionsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FunctionsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
