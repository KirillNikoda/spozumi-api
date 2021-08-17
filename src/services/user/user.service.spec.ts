import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../../entities/user.entity';
import { UserService } from './user.service';

describe('Test UserService', () => {
  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useValue: {
            findOne: jest.fn((criterion: string | number) => {
              return {
                id: 1,
                email: 'test@gmail.com'
              };
            }),
            save: jest.fn(() => ({
              id: 1,
              email: 'test@gmail.com'
            }))
          }
        }
      ]
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('Should validate if user exists', async () => {
    const potentialUser = await service.validateUser('someemail@gmail.com');

    expect(potentialUser).toBeTruthy;
    expect(service).toBeDefined();
  });

  it('Should create user and return it', async () => {
    const userToCreate = {
      email: 'test@gmail.com',
      password: 'testpass'
    };

    const createdUser = await service.createUser(userToCreate);
    console.log(createdUser);

    expect(userToCreate.email).toEqual(createdUser.email);
    expect(createdUser.id).toEqual(1);
  });

  it('Should find user and return it', async () => {
    const id = 1;
    const user = await service.findUser(1);

    expect('test@gmail.com').toEqual(user.email);
    expect(user.id).toEqual(id);
  });
});
