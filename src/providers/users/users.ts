import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { AngularFireAuth } from "@angular/fire/auth";
import { UserResponse } from "../interfaces/UserResponse"

@Injectable()
export class UsersProvider {

  usersUrl = 'http://localhost:4243/users'

  constructor(
    private http: HttpClient,
    private afAuth: AngularFireAuth
  ) { }

  getAllUsers() {
    let users: UserResponse[] = []
    return new Promise(resolve => {
      this.http.get(this.usersUrl)
        .subscribe(data => {
          if (data) {
            Array.prototype.forEach.call(data, element => users.push(element))
            resolve(users)
          }
        })
    })
  }

  getCurrentUser() {
    let email
    if (this.afAuth.auth.currentUser) {
      email = this.afAuth.auth.currentUser.email;
    }
    let user
    return new Promise(resolve => {
      this.http.get(this.usersUrl + '/email/' + email)
        .subscribe(data => {
          if (data) {
            user = data;
            resolve(user)
          } else {
            resolve(null)
          }
        }, error => {
          console.log(error)
          resolve(null)
        })
    })
  }

  getUserById(id) {
    let user
    return new Promise(resolve => {
      this.http.get(this.usersUrl + '/' + id)
        .subscribe(data => {
          if (data) {
            user = data
            resolve(user)
          } else {
            resolve(null)
          }
        }, error => {
          console.log(error)
          resolve(null)
        })
    })
  }

  getUserByEmail(email) {
    let user
    return new Promise(resolve => {
      this.http.get(this.usersUrl + '/email/' + email)
        .subscribe(data => {
          if (data) {
            user = data
            resolve(user)
          } else {
            resolve(null)
          }
        }, error => {
          console.log(error)
          resolve(null)
        })
    })
  }

  userExists() {
    return new Promise(resolve => { this.getCurrentUser().then(res => resolve(res != null)) })
  }

  putUser(user: UserResponse) {
    return new Promise(resolve => {
      this.http.put(this.usersUrl + '/' + user.id, user)
      .subscribe(data => {
        resolve(data)
      }, error => {
        console.log(error)
        resolve(null)
      })
    })
    
  }

}