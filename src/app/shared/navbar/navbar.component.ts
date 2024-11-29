import { Component, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { materialModules } from '../../models/material-imports';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../interceptors/auth.service';
import { NotificationService } from '../../services/notification.service';
import { NotificationsComponent } from "../notifications/notifications.component";

@Component({
  standalone: true,
  selector: 'app-navbar',
  imports: [CommonModule, ...materialModules, RouterModule, NotificationsComponent],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isLoggedIn: boolean = false;
  userRole: number | null = null;
  userId: number | null = null; // Nueva propiedad para almacenar el ID del usuario
  isDesktop: boolean = window.innerWidth > 600;
  unreadCount: number = 0;

  constructor(private authService: AuthService, private router: Router, public notificationService: NotificationService) {}

  ngOnInit(): void {
    // Comprobar si el usuario está autenticado
    this.authService.isAuthenticated().subscribe(isAuthenticated => {
      this.isLoggedIn = isAuthenticated;
    });

    // Obtener el rol del usuario
    this.authService.getUserRole().subscribe(role => {
      this.userRole = role;
    });

    // Obtener el ID del usuario logueado
    this.authService.getUserId().subscribe(id => {
      this.userId = id; // Guardar el ID del usuario
    });

    // Obtener el número de notificaciones no leídas
    this.notificationService.notifications$.subscribe(() => {
      this.unreadCount = this.notificationService.getUnreadCount();
    });
    
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any): void {
    this.isDesktop = window.innerWidth > 600;
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/']);
  }

  markAllAsRead(): void {
    this.notificationService.markAllAsRead();
  }

  navigateToDetail(reservationId: number): void {
    this.router.navigate(['/reservation-detail', reservationId]);
  }

  clearNotifications(): void {
    this.notificationService.clearNotifications();
  }

  navigateToProfile(): void {
    if (this.userId) {
      this.router.navigate(['/profile', this.userId]); // Navegar al perfil usando el ID del usuario
    }
  }
}
