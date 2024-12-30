import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { UserListComponent } from './user-list.component';
import { UserService } from '../user.service';
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { By } from '@angular/platform-browser';

describe('UserListComponent', () => {
  let component: UserListComponent;
  let fixture: ComponentFixture<UserListComponent>;
  let userService: jasmine.SpyObj<UserService>;

  beforeEach(async () => {
    const mockUserService = jasmine.createSpyObj('UserService', ['getUsers', 'getSortedUsers']);

    await TestBed.configureTestingModule({
      imports: [UserListComponent, HttpClientTestingModule, RouterTestingModule],
      providers: [{ provide: UserService, useValue: mockUserService }],
    }).compileComponents();

    fixture = TestBed.createComponent(UserListComponent);
    component = fixture.componentInstance;
    userService = TestBed.inject(UserService) as jasmine.SpyObj<UserService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch users on init', () => {
    const mockUsers = [
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
    userService.getUsers.and.returnValue(of(mockUsers));

    component.ngOnInit();

    expect(userService.getUsers).toHaveBeenCalled();
    expect(component.users).toEqual(mockUsers);
    expect(component.isLoading).toBeFalse();
  });

  it('should fetch sorted users', () => {
    const mockSortedUsers = [
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
    userService.getSortedUsers.and.returnValue(of(mockSortedUsers));

    component.fetchSortedUsers(true);

    expect(userService.getSortedUsers).toHaveBeenCalledWith(true);
    expect(component.users).toEqual(mockSortedUsers);
    expect(component.isLoading).toBeFalse();
  });

  it('should navigate to user details on viewDetails', () => {
    spyOn(component['router'], 'navigate');
    component.viewDetails(1);

    expect(component['router'].navigate).toHaveBeenCalledWith(['/users/1']);
  });
});
