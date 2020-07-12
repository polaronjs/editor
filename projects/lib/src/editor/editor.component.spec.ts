import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PolaronEditorComponent } from './editor.component';

describe('PolaronEditorComponent', () => {
  let component: PolaronEditorComponent;
  let fixture: ComponentFixture<PolaronEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PolaronEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PolaronEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
