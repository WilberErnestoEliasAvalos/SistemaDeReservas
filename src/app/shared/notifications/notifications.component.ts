import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { NotificationService, Notification } from '../../services/notification.service';
import { CommonModule } from '@angular/common';
import { materialModules } from '../../models/material-imports';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css'],
  imports: [CommonModule, ...materialModules],
})
export class NotificationsComponent implements OnInit {
  notifications$: Observable<Notification[]>;

  constructor(public notificationService: NotificationService, private router: Router) {
    this.notifications$ = this.notificationService.notifications$;
  }

  ngOnInit(): void {}

  navigateToDetail(reservationId: number): void {
    this.router.navigate(['/reservation-detail', reservationId]);
  }

  clearNotifications(): void {
    this.notificationService.clearNotifications();
  }
}