import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {
  apiBaseUrl:string = "http://localhost:3000"
  http = inject(HttpClient)

  constructor(){}
  
  // Get all user
  getUser(){
    return this.http.get(this.apiBaseUrl + '/get-users');
  }

  // Add user
  addUser(postdata:any){
    return this.http.post(this.apiBaseUrl + '/add-user',postdata);
  }

  // Get user by Id
  getUserById(id:any){
    return this.http.get(this.apiBaseUrl + '/get-user-by-id/' + id)
  }

  // Edit user 
  editUser(id:any,postdata:any){
    return this.http.put(this.apiBaseUrl + '/edit-user/' + id, postdata)
  }

  // Delete user
  deleteUser(id:any){
    return this.http.delete(this.apiBaseUrl + "/delete-user/" + id);
  }
}
