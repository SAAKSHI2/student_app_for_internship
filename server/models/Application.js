import mongoose from "mongoose";

const Schema = mongoose.Schema;

const applicationSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'Users', required: true },
  internship: { type: Schema.Types.ObjectId, ref: 'Internships', required: true },
  coinsSpent: { type: Number, default: 0 },
  appliedAt: { type: Date, default: Date.now },
});
const Application = mongoose.model('Application', applicationSchema);
export default Application;
