import { Test, TestingModule } from '@nestjs/testing';
import { User } from 'src/entities/user.entity';
import { UserService } from 'src/services/user/user.service';
import { UserController } from './user.controller';

describe('Test UserController', () => {
  let controller: UserController;
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: {
            findUser: jest.fn(
              () => ({ id: 1, email: 'test@gmail.com' } as User)
            )
          }
        }
      ]
    }).compile();

    controller = module.get<UserController>(UserController);
    service = module.get<UserService>(UserService);
  });

  it('Should find user by id', async () => {
    const userToFind = { id: 1, email: 'test@gmail.com' };
    const founded = (await controller.getUser(userToFind.id)) as {
      email: string;
      id: number;
    };
    expect(userToFind.email).toEqual(founded.email);
    expect(userToFind.id).toEqual(founded.id);
  });
});
