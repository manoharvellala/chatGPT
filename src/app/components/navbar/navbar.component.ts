import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { AuthService } from '@auth0/auth0-angular';

interface Category {
  id: number;
  name: string;
}

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  categories: Category[] = [];
  loggedInUser: any;
  hideNavbar: boolean = false;

  constructor(
    private http: HttpClient,
    private router: Router,
    private location: Location,
    public auth: AuthService
  ) {}

  async ngOnInit() {
    await this.getUserInfo();
  }

  fetchCategories(userName: any) {
    const body = { username: userName }; // Create the request body
    console.log(body);
    this.http
      .post<Category[]>(
        'https://manoharvellala.pythonanywhere.com/getNavBarData',
        body
      )
      .subscribe(
        (response) => {
          this.categories = response;
          console.log(this.categories);
        },
        (error) => {
          console.error('Error fetching categories:', error);
        }
      );
  }

  navigateToCategory(categoryName: string) {
    // Replace with the desired route path for the category details
    const routePath = `/previous-chats/${categoryName}`;

    this.router.navigate([routePath], {
      queryParams: {
        categoryName: categoryName,
        username: 'manohar',
      },
    });
  }
  async newChatButtonHandler() {
    if (await this.getUserInfo()) {
      if (window.location.pathname == '/layout') {
        this.router.navigateByUrl('/layout', {
          skipLocationChange: true,
        });
      } else {
        this.router.navigate(['/layout']);
      }
    }
  }
  getUserInfo() {
    return new Promise((resolve) => {
      this.auth.user$.subscribe((user) => {
        this.loggedInUser = 'manohar';
        console.log(this.loggedInUser);
        if (this.loggedInUser != null) {
          this.fetchCategories(this.loggedInUser.name);
          resolve(true); // Resolves the promise when user info is available
        } else {
          resolve(false); // Resolves the promise when user info is not available
        }
      });
    });
  }

  logout() {
    // Add your logout logic here
    // Example: Call the logout method from AuthService if available
    this.auth.logout();
  }
  clearConversation() {
    fetch('https://manoharvellala.pythonanywhere.com/deleteConversation', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: this.loggedInUser.name,
      }),
    })
      .then((response) => {
        this.newChatButtonHandler();
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }
  hideNavbarHandler() {
    this.hideNavbar = !this.hideNavbar;
  }
}
