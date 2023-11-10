import { Injectable } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';

@Injectable()
export class NavigationService {
  constructor(private router: Router) {}

  public navigate(
    commands: any[],
    extras?: NavigationExtras
  ): Promise<boolean> {
    return this.router.navigate(commands, extras);
  }
}
