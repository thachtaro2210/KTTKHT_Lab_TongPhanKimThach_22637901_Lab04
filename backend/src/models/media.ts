import { Schema, model } from 'mongoose';

interface IMedia {
  filename: string;
  url: string;
  mimeType: string;
  size: number;
  uploadedBy: Schema.Types.ObjectId;
}

const MediaSchema = new Schema<IMedia>({
  filename: { type: String, required: true },
  url: { type: String, required: true },
  mimeType: { type: String },
  size: { type: Number },
  uploadedBy: { type: Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

export default model<IMedia>('Media', MediaSchema);
