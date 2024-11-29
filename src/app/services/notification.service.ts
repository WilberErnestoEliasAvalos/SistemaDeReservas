import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface Notification {
  message: string;
  reservationId: number;
  read: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private notificationsSubject: BehaviorSubject<Notification[]> = new BehaviorSubject<Notification[]>(this.loadNotifications());
  notifications$: Observable<Notification[]> = this.notificationsSubject.asObservable();

  private loadNotifications(): Notification[] {
    const notifications = localStorage.getItem('notifications');
    return notifications ? JSON.parse(notifications) : [];
  }

  private saveNotifications(notifications: Notification[]): void {
    localStorage.setItem('notifications', JSON.stringify(notifications));
  }

  addNotification(notification: Notification): void {
    const currentNotifications = this.notificationsSubject.value;
    const updatedNotifications = [...currentNotifications, notification];
    this.notificationsSubject.next(updatedNotifications);
    this.saveNotifications(updatedNotifications);
  }

  markAsRead(index: number): void {
    const currentNotifications = this.notificationsSubject.value;
    currentNotifications[index].read = true;
    this.notificationsSubject.next([...currentNotifications]);
    this.saveNotifications(currentNotifications);
  }

  markAllAsRead(): void {
    const currentNotifications = this.notificationsSubject.value.map(notification => ({
      ...notification,
      read: true
    }));
    this.notificationsSubject.next(currentNotifications);
    this.saveNotifications(currentNotifications);
  }

  clearNotifications(): void {
    this.notificationsSubject.next([]);
    localStorage.removeItem('notifications');
  }

  getUnreadCount(): number {
    return this.notificationsSubject.value.filter(notification => !notification.read).length;
  }
}