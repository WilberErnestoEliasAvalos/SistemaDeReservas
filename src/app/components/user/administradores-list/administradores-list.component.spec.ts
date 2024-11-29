import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministradoresListComponent } from './administradores-list.component';

describe('AdministradoresListComponent', () => {
  let component: AdministradoresListComponent;
  let fixture: ComponentFixture<AdministradoresListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdministradoresListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdministradoresListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
