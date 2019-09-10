import { Injectable , Injector } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http'
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class TokenIntercepterService {

  constructor(private injecter:Injector) { }

  intercept(req,next){
    let authService = this.injecter.get(AuthService);
    let tokenizedReq = req.clone({
      setHeaders :{
        Autherization : `Bearer ${authService.getToken()}`
      }
    });
    return next.handle(tokenizedReq);
  }
}
