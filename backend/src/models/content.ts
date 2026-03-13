import { Schema, model, Types } from 'mongoose';

interface IVersion {
  body: string;
  author: Types.ObjectId;
  createdAt: Date;
}

interface IContent {
  title: string;
  slug: string;
  body: string;
  status: 'draft' | 'published';
  author: Types.ObjectId;
  tags: string[];
  versions: IVersion[];
  publishedAt?: Date;
}

const VersionSchema = new Schema<IVersion>({
  body: { type: String, required: true },
  author: { type: Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now }
});

const ContentSchema = new Schema<IContent>({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  body: { type: String, required: true },
  status: { type: String, enum: ['draft', 'published'], default: 'draft' },
  author: { type: Schema.Types.ObjectId, ref: 'User' },
  tags: { type: [String], default: [] },
  versions: { type: [VersionSchema], default: [] },
  publishedAt: { type: Date }
}, { timestamps: true });

export default model<IContent>('Content', ContentSchema);
