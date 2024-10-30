import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { ApiServiceService } from '../../service/api-service.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatButtonModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  apiSevice = inject(ApiServiceService);
  data: any[] = [];

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.apiSevice.getUser().subscribe(
      (res: any) => {
        this.data = res.data;
      },
      (error: any) => {
        console.log('Error get user : ', error);
      }
    );
  }

  deleteUser(id: any) {
    let userResponse = confirm('Do you want to delete this user');
    if (userResponse) {
      this.apiSevice.deleteUser(id).subscribe(
        (res: any) => {
          if (res.success) {
            this.getData();
          } else {
            alert('User not deleted');
          }
        },
        (error: any) => {
          console.log('Error delete user : ', error);
        }
      );
    }
    return;
  }
}
