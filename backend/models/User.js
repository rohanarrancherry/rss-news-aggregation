const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    role: {
        type: String,
        default: 'user'
    },
});

// pre save hooks - 'this' refers to the document which about to be saved
UserSchema.pre('save', async function (next) {
    try {
      /* 
      Using Mongoose predefined function salting the password
      */
      if (this.isNew) {
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(this.password, salt)
        this.password = hashedPassword
      }
      next()
    } catch (error) {
      next(error)
    }
  })


  UserSchema.methods.isValidPassword = async function (password) {
    try {
      return await bcrypt.compare(password, this.password)
    } catch (error) {
      throw error
    }
  }

const User = mongoose.model('User', UserSchema);

// module.exports = User;

// userSchema.set('toJSON', {
//   transform: (document, returnedObject) => {
//     returnedObject.id = returnedObject._id.toString()
//     delete returnedObject._id
//     delete returnedObject.__v
//     // the passwordHash should not be revealed
//     delete returnedObject.passwordHash
//   }
// })

userSchema.plugin(uniqueValidator)
// // const User = mongoose.model('User', userSchema)

module.exports = User
