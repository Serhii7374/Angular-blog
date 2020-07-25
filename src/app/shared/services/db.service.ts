import { Injectable } from '@angular/core';
import { IUser } from "../../interface/user.interface";
import { IBlog } from "../../interface/blog.interface";

@Injectable({
  providedIn: 'root'
})
export class DbService {
  private arrUsers: Array<IUser> = [
    {
      id: 1,
      username: 'Admin',
      email: 'serhiyne@gmail.com',
      password: 'admin'
    }
  ];
  private arrBlogs: Array<IBlog> = [
    {
      id: 1,
      postedBy: 'Admin',
      topic: 'First post',
      date: new Date(2020, 4, 22, 10, 0, 1),
      message: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Qui odio molestias, quae deleniti commodi, quia suscipit soluta sit id vero exercitationem a optio modi reiciendis expedita sunt. Numquam, quibusdam quia.'
    }
  ];
  
  constructor() { }

  getUser(): Array<IUser> {
    return this.arrUsers;
  }
  getBlog(): Array<IBlog> {
    return this.arrBlogs;
  }
}