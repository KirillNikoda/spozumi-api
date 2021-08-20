import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  ForbiddenException
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { Roles } from 'src/enums/roles.enum';
import { configService } from 'src/services/config/config.service';

@Injectable()
export class AdminGuard implements CanActivate {
  public canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    return this.validateRequest(request);
  }

  public async validateRequest(request: any) {
    let token = request.headers['authorization'];
    if (!token) {
      throw new UnauthorizedException('You are not authorized');
    }
    token = token.split(' ')[1];

    const jwtService = new JwtService({ secret: configService.getJwtSecret() });
    const decoded = jwtService.decode(token) as any;

    if (decoded.role !== Roles.ADMIN) {
      throw new ForbiddenException('You are not permitted to hit this route');
    }

    return true;
  }
}
