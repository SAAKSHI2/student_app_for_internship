import mongoose from "mongoose";

const Schema = mongoose.Schema;

const internshipSchema = new Schema({
  roleName: String,
  companyName: String,
  companyLogo: String,
  stipend: String,
  location: String,
  start_date: String,
});

const Internships = mongoose.model('Internships', internshipSchema)
export default Internships;
