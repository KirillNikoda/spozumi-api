import { JwtService } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { LoginUserDto } from 'src/dtos/loginUser.dto';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';
import * as bcrypt from 'bcrypt';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UserService,
          useValue: {
            validateUser: jest.fn(async (criterion: string | number) => {
              if (criterion !== 'test@gmail.com') {
                return null;
              }
              return {
                id: 1,
                email: 'test@gmail.com',
                password: await bcrypt.hash('testpass', 10)
              };
            }),
            createUser: jest.fn((user: LoginUserDto) => ({ ...user, id: 1 }))
          }
        },
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn((payload: { sub: number; email: string }) => 'token')
          }
        }
      ]
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should register user and return it', async () => {
    const userToRegister = { email: 'test123@gmail.com', password: 'testpass' };

    const createdUser = await service.register(userToRegister);

    expect(createdUser.email).toEqual(userToRegister.email);
    expect(createdUser.id).toEqual(1);
    expect(service).toBeDefined();
  });

  it('should login user and return it', async () => {
    const userToLogin = { email: 'test@gmail.com', password: 'testpass' };
    const loggedUser = await service.login(userToLogin);

    expect(loggedUser.access_token).toEqual('token');
  });
});
