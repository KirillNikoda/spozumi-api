import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UpdateUserDto } from 'src/dtos/updateUser.dto';
import { User } from '../../entities/user.entity';
import { UserService } from './user.service';
import * as bcrypt from 'bcrypt';

describe('Test UserService', () => {
  let service: UserService;
  let mockedRepository = {
    findOne: jest.fn((criterion: string | number) => {
      return {
        id: 1,
        email: 'test@gmail.com'
      };
    }),
    save: jest.fn(() => ({
      id: 1,
      email: 'test@gmail.com'
    })),
    delete: jest.fn((id: number) => ({ id, text: 'success' })),
    update: jest.fn(async (id: number, dto: UpdateUserDto) => {
      const hashed = await bcrypt.hash(dto.password, 10);
      dto.password = hashed;
      return dto;
    })
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useValue: mockedRepository
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

  it('Should delete user', async () => {
    const result = (await service.deleteUser(1)) as any;

    expect(result.id).toEqual(1);
    expect(result.text).toEqual('success');
  });

  it('Should update user', async () => {
    const dto = {
      id: 1,
      email: 'emailtoupdate@gmail.com',
      password: 'changedpassword'
    };

    const result = (await service.updateUser(1, dto)) as any;
    const compare = await bcrypt.compare(dto.password, result.password);

    expect(compare).toBeTruthy;
    expect(result.id).toEqual(dto.id);
    expect(result.email).toEqual(dto.email);
  });
});
