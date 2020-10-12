const { Thought, User } = require('../models');
const thoughtController = {
  // Controller to get all thoughts
  getAllThoughts(req, res) {
    Thought.find({})
      .then(dbThoughtData => res.json(dbThoughtData))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  // Controller to get thought by thoughtId
  getThoughtById({ params }, res) {
    Thought.findOne({ _id: params.id })
      .then(dbThoughtData => res.json(dbThoughtData))
      .catch(err => {
        console.log(err);
        res.sendStatus(400);
      });
  },
  // Controller to add thought using userId
  addThought({ body }, res) {
    console.log(body);
    Thought.create(body)
      .then(({ _id }) => {
        return User.findOneAndUpdate(
          { _id: body.userId },
          { $push: { thoughts: _id } },
          { new: true }
        );
      })
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'Invalid userId' });
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => res.json(err));
  },
  // Controller to update thought using thoughtID
  updateThought({ params, body }, res) {
    Thought.findOneAndUpdate({ _id: params.thoughtId }, { $set: body }, { runValidators: true, new: true })
      .then(updateThought => {
        if (!updateThought) {
          return res.status(404).json({ message: 'Invalid thoughtId' });
        }
        return res.json({ message: "Success updating" });
      })
      .catch(err => res.json(err));
  },
  // Controller to remove thought using thoughtId
  removeThought({ params }, res) {
    Thought.findOneAndDelete({ _id: params.thoughtId })
      .then(deletedThought => {
        if (!deletedThought) {
          return res.status(404).json({ message: 'Invalid thoughtId' });
        }
        return User.findOneAndUpdate(
          { thoughts: params.thoughtId },
          { $pull: { thoughts: params.thoughtId } },
          { new: true }
        );
      })
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'Invalid thoughtId' });
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => res.json(err));
  },
  // Controller to add reaction
  addReaction({ params, body }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $push: { reactions: body } },
      { new: true, runValidators: true }
    )
      .then(updatedThought => {
        if (!updatedThought) {
          res.status(404).json({ message: 'Invalid thoughtId' });
          return;
        }
        res.json(updatedThought);
      })
      .catch(err => res.json(err));
  },
  // Controller to remove reaction
  removeReaction({ params }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $pull: { reactions: { reactionId: params.reactionId } } },
      { new: true, runValidators: true }
    )
      .then((thought) => {
        if (!thought) {
          res.status(404).json({ message: 'Invalid reactionId' });
          return;
        }
        res.json(thought)
      })
      .catch(err => res.json(err));
  },

};

module.exports = thoughtController;