const { Thought } = require('../models');

const thoughtsController = {
    // Get All Known Thoughts
    getAllThoughts(req, res) {
        Thought.find({})
        .select('-__v')
            .sort({_id: -1})
            .then(dbUserData => res.json(dbUserData))
            .catch(err => {
                console.log(err)
                res.sendStatus(400);
            });
    },
    //Create Thought
    thoughtCreation({ body }, res) {
        Thought.create(body)
            .then(dbUserData => res.json(dbUserData))
            .catch(err => res.json(err));
    },

    //Get Thought By ID
    getThoughtID({ params }, res) {
        Thought.findOne({ _id: params.id })
            .select('-__v')
            .then(dbUserData => res.json(dbUserData))
            .catch(err => {
                console.log(err);
                res.sendStatus(400);
            });
    },

    //Update Thought By ID
    updateThoughtID({ params, body }, res) {
        Thought.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
           .then(dbUserData => {
             if (!dbUserData) {
               res.status(404).json({ message: 'There is no Thought with that id!' });
               return;
             }
             res.json(dbUserData);
           })
           .catch(err => res.json(err));
    },
    //Delete Thought By ID
    deleteThoughtID({ params }, res) {
        Thought.findOneAndDelete({ _id: params.id })
          .then(dbUserData => res.json(dbUserData))
          .catch(err => res.json(err));
    },

    //Add Reaction to Thought
    createReaction({ params, body }, res) {
        Thought.findOneAndUpdate(
          { _id: params.thoughtId },
          { $addToSet: { reactions: body } },
          { new: true }
        )
        .then((dbUserData) => res.json(dbUserData))
        .catch((err) => res.status(400).json(err));
    },

    //Delete Reaction from Thought
    eraseReaction({ params }, res) {
        Thought.findOneAndUpdate(
          { _id: params.thoughtId },
          { $pull: { reactions: { reactionId: params.reactionId } } },
          { new: true }
        )
          .then((dbUserData) => res.json(dbUserData))
          .catch((err) => res.json(err));
      },
}