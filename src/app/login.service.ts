import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import * as CryptoJS from 'crypto-js';

@Injectable({ providedIn: 'root' })
export class LoginService {

  private secretKey = 'sopiest-key';

  constructor(private cookieService: CookieService, private router: Router) { }

  login(loginData: any): void {
    if (loginData.username === 'admin' && loginData.password === 'admin') {
      this.cookieService.set('Authorization', this.generateToken());
      this.router.navigate(['/dashboard']);
    }
  }

  logout(): void {
    this.cookieService.delete('Authorization');
    this.router.navigate(['/login']);
  }

  isAlreadyLogin(): boolean {
    const data = this.cookieService.get('Authorization');
    console.log('getting '+data);
    try {
      var bytes  = CryptoJS.AES.decrypt(data, this.secretKey);
      var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
      console.log(decryptedData);
      if (!decryptedData || decryptedData.expiresIn > new Date().getTime()) {
        console.log('valid');
        return true;
      }
    } catch (error) {
      console.log(error);
    }
    console.log('invalid');
    return false;
  }

  sendToRoute(route: string): void {
    this.router.navigate([`/${route}`]);
  }
  
  private generateToken(): string {
    const payload = {
      expiresIn: new Date().getTime() + 300000
    };
    return CryptoJS.AES.encrypt(JSON.stringify(payload), this.secretKey).toString();
  }

}
