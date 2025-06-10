import mongoose, { Model, Document } from "mongoose";

const SubmissionSchema = new mongoose.Schema(
      {
            isWorkingBy: { type: String, default: null },
      },
      { strict: false }
);

// Define a generic document type
export interface SubmissionDoc extends Document {
      isWorkingBy?: string;
      status?: string;
      [key: string]: any;
}

export default function getSubmissionModel(collectionName: string): Model<SubmissionDoc> {
      try {
            return mongoose.model<SubmissionDoc>(collectionName);
      } catch {
            return mongoose.model<SubmissionDoc>(collectionName, SubmissionSchema, collectionName);
      }
}
