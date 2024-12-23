import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomDetailDialogComponent } from './room-detail-dialog.component';

describe('RoomDetailDialogComponent', () => {
  let component: RoomDetailDialogComponent;
  let fixture: ComponentFixture<RoomDetailDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoomDetailDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoomDetailDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
