import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UserService } from './user.service';
import { User } from './user.model';

describe('UserService', () => {
  let service: UserService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserService],
    });
    service = TestBed.inject(UserService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Ensures no outstanding requests
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch all users', () => {
    const mockUsers: User[] = [
      {
        id: 1,
        firstName: 'John',
        lastName: 'Doe',
        age: 30,
        email: 'john.doe@example.com',
        role: 'Admin',
        image: 'profile.jpg',
      },
      {
        id: 2,
        firstName: 'Jane',
        lastName: 'Smith',
        age: 25,
        email: 'jane.smith@example.com',
        role: 'User',
        image: 'profile2.jpg',
      },
    ];

    service.getUsers().subscribe((users) => {
      expect(users).toEqual(mockUsers);
    });

    const req = httpMock.expectOne('http://localhost:8080/api/users');
    expect(req.request.method).toBe('GET');
    req.flush(mockUsers);
  });

  it('should fetch a user by ID', () => {
    const mockUser: User = {
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      age: 30,
      email: 'john.doe@example.com',
      role: 'Admin',
      image: 'profile.jpg',
    };

    service.getUserById(1).subscribe((user) => {
      expect(user).toEqual(mockUser);
    });

    const req = httpMock.expectOne('http://localhost:8080/api/users/1?id=1');
    expect(req.request.method).toBe('GET');
    req.flush(mockUser);
  });

  it('should fetch sorted users by age', () => {
    const mockSortedUsers: User[] = [
      {
        id: 2,
        firstName: 'Jane',
        lastName: 'Smith',
        age: 25,
        email: 'jane.smith@example.com',
        role: 'User',
        image: 'profile2.jpg',
      },
      {
        id: 1,
        firstName: 'John',
        lastName: 'Doe',
        age: 30,
        email: 'john.doe@example.com',
        role: 'Admin',
        image: 'profile.jpg',
      },
    ];

    service.getSortedUsers(true).subscribe((users) => {
      expect(users).toEqual(mockSortedUsers);
    });

    const req = httpMock.expectOne('http://localhost:8080/api/users/sorted?ascending=true');
    expect(req.request.method).toBe('GET');
    req.flush(mockSortedUsers);
  });
});

