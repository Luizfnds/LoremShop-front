export class UserRegistryData {
    
    name: string | null;
    surname: string | null;
    email: string | null;
    password: string | null;

    constructor(
        name: string | null,
        surname: string | null,
        email: string | null,
        password: string | null
    ) {
        this.name = name;
        this.surname = surname;
        this.email = email;
        this.password = password;
    }
    
}
