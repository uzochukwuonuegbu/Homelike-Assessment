import { UserNotFoundException, InvalidCredentialsException, UserAlreadyExistsException } from './auth.exceptions';
import { Test, TestingModule } from '@nestjs/testing';
import { UserDataService } from './user';
import { AuthModule } from './auth.module';
import { AuthService } from './auth.service';
import bcrypt, { hash } from 'bcrypt';
import { User } from './types';

describe('AuthService', () => {
  let authService: AuthService;
  let userDataService: UserDataService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AuthModule],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    userDataService = module.get<UserDataService>(UserDataService);
  });

  describe('Login', () => {
    it('should throw if user is not defined', async () => {
      jest.spyOn(userDataService, 'getUserByEmail').mockImplementation(() => new Promise(resolve => resolve()));
      jest.spyOn(bcrypt, 'compare');

      const loginCredentials = {
        email: 'placeholder.email@gmail.com',
        password: 'placeholder password',
      };

      try {
        await authService.login(loginCredentials);
        expect(userDataService.getUserByEmail).toHaveBeenCalledWith(loginCredentials.email);
        expect(bcrypt.compare).not.toHaveBeenCalled();
      } catch (error) {
        expect(error).toEqual(new UserNotFoundException());
      }
    });

    it('should throw if user credentials is invalid', async () => {
      const randomPassword = await hash('randomPassword', 12);

      jest.spyOn(userDataService, 'getUserByEmail').mockImplementation(
        () =>
          new Promise(resolve =>
            resolve({
              email: 'placeholder.email@gmail.com',
              password: randomPassword,
            } as User),
          ),
      );
      jest.spyOn(bcrypt, 'compare');

      const loginCredentials = {
        email: 'placeholder.email@gmail.com',
        password: 'placeholder password',
      };

      try {
        await authService.login(loginCredentials);
        expect(bcrypt.compare).toHaveBeenCalledTimes(1);
      } catch (error) {
        expect(error).toEqual(new InvalidCredentialsException());
      }
    });

    it('should successfully log user in', async () => {
      const randomPassword = await hash('randomPassword', 12);

      jest.spyOn(userDataService, 'getUserByEmail').mockImplementation(
        () =>
          new Promise(resolve =>
            resolve({
              email: 'placeholder.email@gmail.com',
              password: randomPassword,
            } as User),
          ),
      );

      const loginCredentials = {
        email: 'placeholder.email@gmail.com',
        password: 'randomPassword',
      };

      const data = await authService.login(loginCredentials);
      expect(Object.keys(data)).toEqual(['token', 'user']);
      expect(data).not.toHaveProperty('password');
      expect(data).not.toHaveProperty('sKey');
    });
  });

  describe('Register', () => {
    it('should throw if user already exists', async () => {
      jest.spyOn(userDataService, 'getUserByEmail').mockImplementation(
        () =>
          new Promise(resolve =>
            resolve({
              email: 'placeholder.email@gmail.com',
            } as User),
          ),
      );
      jest.spyOn(bcrypt, 'hash');

      const signupCredentials = {
        firstName: 'Max',
        lastName: 'Smith',
        email: 'max.smith@gmail.com',
        password: 'use.max.smith',
      };

      try {
        await authService.register(signupCredentials);
        expect(userDataService.getUserByEmail).toHaveBeenCalledWith(signupCredentials.email);
        expect(bcrypt.hash).not.toHaveBeenCalledWith();
      } catch (error) {
        expect(error).toEqual(new UserAlreadyExistsException());
      }
    });

    it('should successfully complete user registration', async () => {
      jest.spyOn(userDataService, 'getUserByEmail').mockImplementation(() => new Promise(resolve => resolve()));
      jest.spyOn(userDataService, 'saveUser').mockImplementation(() => new Promise(resolve => resolve()));
      jest.spyOn(bcrypt, 'hash');

      const signupCredentials = {
        firstName: 'Max',
        lastName: 'Smith',
        email: 'max.smith@gmail.com',
        password: 'use.max.smith',
      };

      const response = await authService.register(signupCredentials);
      expect(userDataService.getUserByEmail).toHaveBeenCalledWith(signupCredentials.email);
      expect(bcrypt.hash).toHaveBeenCalledTimes(1);
      expect(userDataService.saveUser).toHaveBeenCalledWith(
        expect.objectContaining({
          firstName: 'Max',
          lastName: 'Smith',
          email: 'max.smith@gmail.com',
        }),
      );
      expect(response).toHaveProperty('id');
      expect(response).not.toHaveProperty('password');
    });
  });
});
