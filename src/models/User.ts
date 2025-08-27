import { Schema, model } from 'mongoose';

interface IUser {
  nombre: string;
  email: string;
  rol: string;
  password: string;
}

const userSchema = new Schema<IUser>({
  nombre: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  rol: { type: String, required: true },
  password: { type: String, required: true },
});

const User = model<IUser>('User', userSchema);
export default User;
