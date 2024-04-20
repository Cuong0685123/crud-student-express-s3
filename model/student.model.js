import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true,
  },
  dayOfBirth: {
    type: String,
    required: true,
  },
  gender: {
    type: Boolean,
    required: true,
  },
  major: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
    required: true,
  },
}, { timestamps: true }
);


const Student = mongoose.model("Student", studentSchema);
export default Student;
