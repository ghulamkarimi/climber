export interface IUser {
    _id:string,
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    telephone: string;
    isAdmin: boolean;
    gender: string;
    profile_photo: string;
    access_token: string;
    address :{
        country: string;
        city: string;
        street: string;
        number: string;
        postalCode: string;
    }
    isPasswordMatched(enteredPassword: string): Promise<boolean>;
}