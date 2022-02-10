import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import * as functions from 'firebase-functions';

@Injectable()
export class RecaptchaGuard implements CanActivate {
  constructor(private readonly httpService: HttpService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const { body } = context.switchToHttp().getRequest();
    const recaptchaSecretKey = functions.config().recaptcha.secretkey;
    const response = this.httpService.post(
      `https://www.google.com/recaptcha/api/siteverify?response=${body.recaptchaToken}&secret=${recaptchaSecretKey}`
    );
    const { data } = await lastValueFrom(response);

    if (!data.success) {
      throw new ForbiddenException();
    }

    return true;
  }
}
