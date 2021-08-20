import { Test, TestingModule } from '@nestjs/testing';
import { User } from 'src/entities/user.entity';
import { AuthService } from 'src/services/auth/auth.service';
import { AuthController } from './auth.controller';

describe('AuthController', () => {
  let controller: AuthController;
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            register: jest.fn(
              () => ({ id: 1, email: 'registered@gmail.com' } as User)
            ),
            login: jest.fn(() => ({ access_token: 'token' }))
          }
        }
      ]
    }).compile();

    controller = module.get<AuthController>(AuthController);
    service = module.get<AuthService>(AuthService);
  });

  it('Should register user and return it', async () => {
    const userToRegister = {
      email: 'registered@gmail.com',
      password: 'testpass'
    };
    const user = await controller.register(userToRegister);

    expect(userToRegister.email).toEqual(user.email);
    expect(user.id).toEqual(1);
    expect(controller).toBeDefined();
  });

  it('Should login user and return access token', async () => {
    const userToLogin = {
      email: 'login@gmail.com',
      password: 'testpass'
    };
    const { access_token } = await controller.login(userToLogin);

    expect(access_token).toEqual('token');
  });
});
