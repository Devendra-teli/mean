import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Router, ActivatedRoute } from '@angular/router';

import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { ApiServiceService } from '../../service/api-service.service';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [MatButtonModule, ReactiveFormsModule],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.scss',
})
export class UserFormComponent implements OnInit {
  userForm!: FormGroup;
  isEditUserForm: boolean = false;

  constructor(
    private fb: FormBuilder,
    private apiService: ApiServiceService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    let userId = this.route.snapshot.paramMap.get('id');
    if (userId) {
      this.isEditUserForm = true;
      this.getUserData(userId);
    } else {
      this.isEditUserForm = false;
    }
  }

  initializeForm() {
    this.userForm = this.fb.group({
      _id: [''],
      name: ['', Validators.required],
      age: ['', Validators.required],
      dob: ['', Validators.required],
      address: ['', Validators.required],
    });
  }

  addUser() {
    if (this.userForm.valid) {
      const formData = this.userForm.value;
      let postdata = {
        data: formData,
      };
      this.apiService.addUser(postdata).subscribe(
        (res: any) => {
          if (res.success) {
            this.router.navigate(['/']);
            alert('User added successfully');
          } else {
            alert('User not added');
          }
        },
        (error) => {
          console.log('Error add user', error);
          alert('User not added');
        }
      );
    } else {
      alert('All Fields are require');
    }
  }

  getUserData(userId: any) {
    this.apiService.getUserById(userId).subscribe(
      (res: any) => {
        if (res.success) {
          this.populateEditUserForm(res.data);
        } else {
          alert('User not found in database');
        }
      },
      (error) => {
        console.log('Error get user data by id :', error);
        alert('Internal server error.Try again');
      }
    );
  }

  populateEditUserForm(data: any) {
    this.userForm.patchValue({
      _id: data._id,
      name: data.name,
      age: data.age,
      dob: data.dob,
      address: data.address,
    });
  }
  editUser() {
    let id = this.userForm.get('_id')?.value;
    let postdata = {
      data: this.userForm.value,
    };
    this.apiService.editUser(id,postdata).subscribe((res: any)=>{
      if(res.success){
        this.router.navigate(['/']);
        alert("User edit successfully");
      }else{
        alert(res.msg);
      }
    },(error:any)=>{
      console.log("Error edit user : ",error);
    })
  }
}
