import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfilUserEditPage } from './perfil-user-edit.page';

describe('PerfilUserEditPage', () => {
  let component: PerfilUserEditPage;
  let fixture: ComponentFixture<PerfilUserEditPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PerfilUserEditPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PerfilUserEditPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
