import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MeusPetsPage } from './meus-pets.page';

describe('MeusPetsPage', () => {
  let component: MeusPetsPage;
  let fixture: ComponentFixture<MeusPetsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MeusPetsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MeusPetsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
