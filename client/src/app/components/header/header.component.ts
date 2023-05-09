import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  public isDark = false;

  constructor(private router: Router) { }

  public goToHomePageHandler(): void {
    this.router.navigate(['']);
  }

  public toggleTheme(e: Event): void {
    e.stopPropagation();

    this.isDark = !this.isDark;
    document.body.classList.toggle('dark-theme');
  }
}
