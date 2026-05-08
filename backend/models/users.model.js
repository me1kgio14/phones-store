const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const usersSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: [true, "Full name is required"],
        lowercase: true,
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        validate: validator.isEmail,
        lowercase: true,
        
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [6, "Password must be at least 6 characters long"],
        maxLength: [12, "Password must be less than 20 characters long"],
        trim: true ,
        select: false
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    },
    isActive: {
        type: Boolean,
        default: true
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    verificationCode:{
        type: String
    }
},
    {
    timestamps: true
}
);
usersSchema.pre("save", async function () {
    if (!this.isModified("password")) return;
    this.password = await bcrypt.hash(this.password, 10);
});
usersSchema.methods.createEmailVerificationToken = function() {
    const verificationCode = crypto.randomBytes(12).toString('hex');
    this.verificationCode = verificationCode;
    return verificationCode;
}

usersSchema.methods.signToken = function() {
    return jwt.sign({id: this._id}, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    })
}

usersSchema.methods.comparePassword = async function(candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
}

const Users = mongoose.model("Users", usersSchema);

module.exports = Users;