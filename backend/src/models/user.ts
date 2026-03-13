import { Schema, model } from 'mongoose';

interface IUser {
  name: string;
  email: string;
  passwordHash: string;
  roles: string[];
}

const UserSchema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  roles: { type: [String], default: ['editor'] }
}, { timestamps: true });

export default model<IUser>('User', UserSchema);
