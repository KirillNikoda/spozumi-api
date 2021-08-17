import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { User } from 'src/entities/user.entity';
import { configService } from 'src/services/config/config.service';
import { getRepository } from 'typeorm';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    return this.validateRequest(request);
  }

  private async validateRequest(request: any) {
    const token = request.headers['authorization'].split(' ')[1];

    if (!token) {
      return false;
    }
    console.log(token);

    const jwtService = new JwtService({ secret: configService.getJwtSecret() });

    const decoded = jwtService.decode(token);
    console.log(decoded);

    if (+request.params.id !== decoded.sub) {
      return false;
    }

    const userRepository = getRepository(User);
    const user = await userRepository.findOne(decoded.sub);

    request.user = user;

    return true;
  }
}
