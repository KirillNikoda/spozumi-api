import { Test, TestingModule } from '@nestjs/testing';
import { User } from 'src/entities/user.entity';
import { UserService } from 'src/services/user/user.service';
import { UserController } from './user.controller';

describe('Test UserController', () => {
  let controller: UserController;
  let service: UserService;
  let mockedUserService = {
    findUser: jest.fn(() => ({ id: 1, email: 'test@gmail.com' } as User)),
    getAllUsers: jest.fn(() => [
      { id: 1, email: '123@gmail.com' },
      { id: 2, email: '123@gmail.com' },
      { id: 3, email: '123@gmail.com' }
    ]),
    deleteUser: jest.fn((id: number) => ({ id, text: 'success' })),
    updateUser: jest.fn((id: number, dto: any) => ({ id, email: dto.email }))
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [UserService]
    })
      .overrideProvider(UserService)
      .useValue(mockedUserService)
      .compile();

    controller = module.get<UserController>(UserController);
    service = module.get<UserService>(UserService);
  });

  it('Should find user by id', async () => {
    const userToFind = { id: 1, email: 'test@gmail.com' };
    const founded = await controller.getUser(userToFind.id);
    expect(userToFind.email).toEqual(founded.email);
    expect(userToFind.id).toEqual(founded.id);
    expect(mockedUserService.findUser).toBeCalledTimes(1);
  });

  it('should find all users and return them', async () => {
    const users = await controller.getAllUsers();

    expect(users).toHaveLength(3);
    expect(users[0].email).toEqual('123@gmail.com');
    expect(mockedUserService.getAllUsers).toBeCalledTimes(1);
  });

  it('should delete user', async () => {
    const result = (await controller.deleteUser(1)) as any;

    expect(result.text).toEqual('success');
    expect(result.id).toEqual(1);
    expect(mockedUserService.deleteUser).toBeCalledTimes(1);
  });

  it('should update user', async () => {
    const dto = { email: 'updated@gmail.com' };

    const result = (await controller.updateUser(1, dto as any)) as any;

    expect(result.id).toEqual(1);
    expect(result.email).toEqual(dto.email);
    expect(mockedUserService.updateUser).toBeCalledTimes(1);
  });
});
