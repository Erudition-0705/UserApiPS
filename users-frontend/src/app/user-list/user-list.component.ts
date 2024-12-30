import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../user.model';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-user-list',
  standalone: true,
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
  imports: [CommonModule, RouterModule],
})
export class UserListComponent implements OnInit {
  users: User[] = [];
  isLoading = true;

  constructor(private userService: UserService, private router: Router) {}

  // ngOnInit(): void {
  //   this.userService.getUsers().subscribe({
  //     next: (data) => {
  //       this.users = data;
  //       this.isLoading = false;
  //     },
  //     error: (err) => {
  //       console.error('Error fetching users:', err);
  //       this.isLoading = false;
  //     },
  //   });
  // }



  ngOnInit(): void {
    this.fetchUsers();
  }

  fetchUsers(): void {
    this.isLoading = true;
    this.userService.getUsers().subscribe({
      next: (data) => {
        this.users = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching users:', err);
        this.isLoading = false;
      },
    });
  }

  fetchSortedUsers(ascending: boolean): void {
    this.isLoading = true;
    this.userService.getSortedUsers(ascending).subscribe({
      next: (data) => {
        this.users = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching sorted users:', err);
        this.isLoading = false;
      },
    });
  }
  // viewDetails(userId: number): void {
  //   // Navigate to the user details page
  //   this.router.navigate(['/user-details', userId]);
  // }

  viewDetails(userId: number): void {
    this.router.navigate([`/users/${userId}`]); // Corrected path
  }
  
}
