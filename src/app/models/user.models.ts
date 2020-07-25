import { IUser } from "../interface/user.interface";

export class User implements IUser{
    constructor(public id: number,
        public username: string,
        public email: string,
        public password: string) {}
}