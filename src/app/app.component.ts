import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FooterComponent } from '../app/shared/footer/footer.component';
import { NavbarComponent } from '../app/shared/navbar/navbar.component';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  standalone: true,
    selector: 'app-root',
    imports: [RouterOutlet, CommonModule, NavbarComponent, FooterComponent],
    template: `
    <app-navbar></app-navbar>
    <router-outlet></router-outlet> <!-- Aquí se cargarán las vistas según las rutas -->
    <app-footer *ngIf="showFooter"></app-footer>
  `
})
export class AppComponent implements OnInit {
  showFooter: boolean = false;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.showFooter = this.shouldShowFooter(event.urlAfterRedirects);
    });
  }

  shouldShowFooter(url: string): boolean {
    // Lista de rutas donde se debe mostrar el footer
    const footerRoutes = ['/', '/reservations', '/contact'];
    return footerRoutes.includes(url);
  }
}
