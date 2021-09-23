const { Schema, Types, model } = require('mongoose');

const userSchema = new Schema ({
    username: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/.+\@.+\..+/, 'Invalid Email Address. Please try again!']
    },
    thoughts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Thought'
        }
    ],
    friends: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
  },
  {
      toJSON: {
          virtuals: true,
          getters: true
      },
      id: false
});

userSchema.virtual('friendAmount').get(function() {
    return this.friends.length
});

const User = model('User', userSchema);

module.exports = User;