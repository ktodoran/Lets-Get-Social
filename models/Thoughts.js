const { Schema, Types, model } = require('mongoose');
const dateFormat = require('../utils/dateformat');

const reactSchema = new Schema({
    reaction_id: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId()
    },
    reaction_body: {
        type: String,
        required: true,
        maxlength: 240
    },
    username: {
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now,
        get: createdValue => dateFormat(createdValue)
    },
})

const thoughtsSchema = new Schema({
    thoughts_text: {
        type: String,
        required: true,
        minlength: 6,
        maxlength: 240
    },
    created_at: {
        type: Date,
        default: Date.now,
        get: createdValue => dateFormat(createdValue)
    },
    username: {
        type: String,
        required: true
    },
    reactions: [
        reactSchema
    ]
},
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    });

thoughtsSchema.virtual('reactCount').get(function () {
    return this.reaction.length
});

const Thought = model('Thought', thoughtsSchema);

module.exports = Thought;