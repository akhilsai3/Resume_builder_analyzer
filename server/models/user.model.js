const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
        set: function(password) {
            // Always hash unless already hashed
            if (password.startsWith('$2a$') || 
                password.startsWith('$2b$') ||
                password.startsWith('$2y$')) {
                return password;
            }
            console.log('Raw password received:', password);
            const salt = bcrypt.genSaltSync(10);
            const hashed=bcrypt.hashSync(password, salt);
            console.log('Hashed password:', hashed);
            return hashed;
        }
    },
    avatar: {
        type: String,
        default: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-HmAlYRaMiTx6PqSGcL9ifkAFxWHVPvhiHQ&s",
    },
    feedback: {
        type: String,
    },
}, { timestamps: true });



const User = mongoose.model('User', userSchema);

module.exports = User;