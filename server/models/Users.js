import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: { type: String, required: true, unique: true },
  otp: { type: String, required: true },
  coins: { type: Number, default: 0 },
  profile: {
    name: String,
    mobile: String,
    profilePic: String,
    linkedinLink: String,
    githubLink: String,
    resume: String,
  },
  education: [{
    type: String, // 'School' or 'College'
    name: String,
    startDate: Date,
    endDate: Date,
  }],
  projects: [{
    name: String,
    description: String,
    solo: Boolean,
    link: String,
  }],
  experiences: [{
    type: String, // 'Internship' or 'Job'
    companyName: String,
    companyWebsite: String,
    role: String,
    startDate: Date,
    endDate: Date,
    coverLetter: String,
  }],
});

const Users = mongoose.model('Users', userSchema);

export default Users;