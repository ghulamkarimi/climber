
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import { IUser } from '../interface/userInterface';

const userSchema = new mongoose.Schema<IUser>({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    telephone: {
        type: String,
       
    },
    gender: {
        type: String,
    },
    profile_photo: {
        type: String,
        default: "",
    },
    access_token: {
        type: String,
      },
   
    isAdmin : {
        type: Boolean,
        default: false
    },
    address: {
        country: {
            type: String,
         
        },
        city: {
            type: String,
           
        },
        street: {
            type: String,
            
        },
        number: {
            type: String,
            
        },
        postalCode: {
            type: String,
            
        }
    },
  

})



userSchema.pre("save", async function (next) {
    if (this.isModified("password") || this.isNew) {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    }
    if (!this.profile_photo) {
        switch (this.gender) {
            case "male":
                this.profile_photo =
                    "https://cdn-icons-png.freepik.com/512/610/610120.png";
                break;
            case "female":
                this.profile_photo =
                    "https://assets.stickpng.com/images/585e4bc4cb11b227491c3395.png";
                break;

        }
    }
});


userSchema.methods.isPasswordMatched = async function (enteredPassword) {
    this.password = await bcrypt.compare(enteredPassword,this.password)
    return this.password
}

const Users = mongoose.model('Users', userSchema);
export default Users;