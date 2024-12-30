import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { UserDetailsComponent } from './user-details.component';
import { UserService } from '../user.service';
import { of } from 'rxjs';

describe('UserDetailsComponent', () => {
  let component: UserDetailsComponent;
  let fixture: ComponentFixture<UserDetailsComponent>;
  let userService: jasmine.SpyObj<UserService>;

  beforeEach(async () => {
    const mockUserService = jasmine.createSpyObj('UserService', ['getUserById']);

    await TestBed.configureTestingModule({
      imports: [
        UserDetailsComponent, // Include standalone component here
        HttpClientTestingModule, // Mock HTTP calls
      ],
      providers: [
        { provide: UserService, useValue: mockUserService },
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { paramMap: { get: () => '1' } } }, // Mock route
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(UserDetailsComponent);
    component = fixture.componentInstance;
    userService = TestBed.inject(UserService) as jasmine.SpyObj<UserService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch user details on init', () => {
    const mockUser = {
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      age: 30, 
      email: 'john.doe@example.com',
      role: 'Admin', 
      image: 'profile.jpg', 
    };
    userService.getUserById.and.returnValue(of(mockUser)); // Mock API call

    component.ngOnInit();

    expect(userService.getUserById).toHaveBeenCalledOnceWith(1);
    expect(component.user).toEqual(mockUser);
    expect(component.isLoading).toBeFalse();
  });
});
