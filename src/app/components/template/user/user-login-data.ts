export class UserLoginData {

    email: string | null;
    password: string | null;

    constructor(email: string | null, password: string | null) {
        this.email = email;
        this.password = password;
    }

}
