import { Component, OnInit } from '@angular/core';
import { DbService } from '../../shared/services/db.service';
import { IUser } from "../../interface/user.interface";
import { User } from "../../models/user.models";
import { IBlog } from "../../interface/blog.interface";
import { Blog } from "../../models/blog.models";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  users: Array<IUser> = [];
  blogs: Array<IBlog> = [];
  name: string;
  email: string;
  password: string;
  whoLogined: string;
  title: string;
  text: string;
  newId = 1;
  tempIndex: number;
  modalLoginSwich: boolean;
  modalBlogSwich: boolean;
  modalEditSwich: boolean;
  signUpModalSwich: boolean;
  swichLogin: boolean;
  swichEditDelete: boolean;
  check: boolean;

  constructor(private dbService: DbService) { }

  ngOnInit(): void {
    this.getUser();
    this.getBlog();
  }

  private getUser(): void {
    this.users = this.dbService.getUser();
  }
  private getBlog(): void {
    this.blogs = this.dbService.getBlog();
  }

  // залогінення
  submit(): void {
    for (let i = 0; i < this.users.length; i++) {
      if (this.email == this.users[i].email && this.password == this.users[i].password) {
        this.check = true
        this.whoLogined = this.users[i].username;
      }
    }
    if (this.check) {
      this.email = '';
      this.password = '';
      this.swichLogin = !this.swichLogin;
      this.modalLoginSwich = !this.modalLoginSwich;
      this.swichEditDelete = !this.swichEditDelete;
      this.check = false;
    } else {
      alert('incorrect data')
    }
  }
  // розлогін
  signOut(): void {
    this.swichLogin = !this.swichLogin;
    this.whoLogined = '';
    this.swichEditDelete = !this.swichEditDelete;
  }

  // добавляння поста
  post(): void {
    if (this.title && this.text) {
      if (this.blogs.length > 0) {
        this.newId = this.blogs.slice(-1)[0].id + 1;
      }
      const post: IBlog = new Blog(this.newId, this.whoLogined, this.title, new Date, this.text);
      this.blogs.push(post);
      this.title = '';
      this.text = '';
      this.modalBlogSwich = !this.modalBlogSwich;
    } else alert('Fill all fields');
  }

  // видалення поста
  deleteBlog(index: number): void {
    this.blogs.splice(index, 1);
  }
  // редагування поста
  editPost(): void {
    const post: IBlog = new Blog(this.newId, this.whoLogined, this.title, new Date, this.text);
    this.blogs.splice(this.tempIndex, 1, post);
    this.title = '';
    this.text = '';
    this.modalEditSwich = !this.modalEditSwich;
  }
  // добавлення нового юзера
  submitNewUser(): void {
    if (this.email && this.users && this.password) {
      for (let i = 0; i < this.users.length; i++) {
        if (this.email == this.users[i].email || this.name == this.users[i].username) {
          this.check = true
        }
      };
      if (!this.check) {
        if (this.users.length > 0) {
          this.newId = this.users.slice(-1)[0].id + 1;
        };
        const user: IUser = new User(this.newId, this.name, this.email, this.password);
        this.users.push(user);
        this.name = '';
        this.email = '';
        this.password = '';
        this.signUpModalSwich = !this.signUpModalSwich;
        this.check = false;
      } else {
        alert('This user or email is already exist');
        this.check = false;
      }
    } else alert('Fill all fields');
  }

  // відкриття модалки логіну
  openModalLogin(): void {
    this.modalLoginSwich = !this.modalLoginSwich;
  }
  // закриття модалки логіну
  closeModalLogin(): void {
    this.modalLoginSwich = !this.modalLoginSwich;
  }
  // відкриття модалки додавання блогу
  openModalBlog(): void {
    this.modalBlogSwich = !this.modalBlogSwich;
  }
  // закриття модалки додавання блогу
  closeModalBlog(): void {
    this.modalBlogSwich = !this.modalBlogSwich;
  }
  // відкриття модалки редагування блогу
  // і підставляння туди значеть з обєкту
  openEditBlog(index: number): void {
    this.modalEditSwich = !this.modalEditSwich;
    this.title = this.blogs[index].topic;
    this.text = this.blogs[index].message;
    this.newId = this.blogs[index].id;
    this.tempIndex = index;
  }
  // закриття модалки редагування блогу
  closeEditBlog(): void {
    this.modalEditSwich = !this.modalEditSwich;
  }
  // відкриття модалки додавання юзера
  openSignUpModal(): void {
    this.signUpModalSwich = !this.signUpModalSwich;
  }
  // закриття модалки додавання юзера
  closeSignUpModal(): void {
    this.signUpModalSwich = !this.signUpModalSwich;
  }
}
