import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Auth } from '../models/auth';
import { TripData } from '../auth/tripData';

@Injectable({
  providedIn: 'root'
})
export class Authentication {
  private storage: Storage = localStorage;

  constructor(private tripDataService: TripData) { }

  public getToken(): string {
    return this.storage.getItem('travlr-token') || '';
  }

  public saveToken(token: string): void {
    this.storage.setItem('travlr-token', token);
  }

  public login(user: User): Promise<any> {
    return this.tripDataService.login(user)
      .then((authResp: Auth) =>
        this.saveToken(authResp.token));
  }

  public register(user: User): Promise<any> {
    return this.tripDataService.register(user)
      .then((authResp: Auth) =>
        this.saveToken(authResp.token));
  }

  public logout(): void {
    this.storage.removeItem('travlr-token');
  }

  public isLoggedIn(): boolean {
    const token: string = this.getToken();
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.exp > (Date.now() / 1000);
    } else {
      return false;
    }
  }

  public getCurrentUser(): User | null {
    if (this.isLoggedIn()) {
      const token: string = this.getToken();
      const { email, name } = JSON.parse(atob(token.split('.')[1]));
      return { email, name } as User;
    }
    return null;
  }
}
