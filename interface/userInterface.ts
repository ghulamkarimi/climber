export interface IUser {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    telephone: string;
    gender: string;
    profile_photo: string;
    addres :{
        country: string;
        city: string;
        street: string;
        number: string;
        postalCode: string;
    }
}