import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException
} from '@nestjs/common';
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
    let token = request.headers['authorization'];

    if (!token) {
      throw new UnauthorizedException('You are not authorized');
    }

    token = token.split(' ')[1];
    const jwtService = new JwtService({ secret: configService.getJwtSecret() });

    const decoded = jwtService.decode(token);
    console.log(decoded);

    if (+request.params.id !== decoded.sub) {
      throw new UnauthorizedException('You are not authorized');
    }

    const userRepository = getRepository(User);
    const user = await userRepository.findOne(decoded.sub);

    request.user = user;

    return true;
  }
}
