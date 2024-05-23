const { User, Thought } = require('../models');

module.exports = {
  async getUsers(req, res) {
    try {
      const users = await User.find().populate('thoughts').populate('friends');
      res.json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async getSingleUser(req, res) {
    try {
      const user = await User.findById(req.params.id)
        .populate('thoughts')
        .populate('friends');
      if (!user) {
        res.status(404).json({ message: 'No user found with this id!' });
      } else {
        res.json(user);
      }
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async createUser(req, res) {
    try {
      const newUser = await User.create(req.body);
      res.json(newUser);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async updateUser(req, res) {
    try {
      const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
      if (!updatedUser) {
        res.status(404).json({ message: 'No user found with this id!' });
      } else {
        res.json(updatedUser);
      }
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async deleteUser(req, res) {
    try {
      const deletedUser = await User.findByIdAndDelete(req.params.id);
      if (!deletedUser) {
        res.status(404).json({ message: 'No user found with this id!' });
      } else {
        await Thought.deleteMany({ username: deletedUser.username });
        res.json(deletedUser);
      }
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async addFriend(req, res) {
    try {
      const user = await User.findByIdAndUpdate(
        req.params.userId,
        { $addToSet: { friends: req.params.friendId } },
        { new: true }
      ).populate('friends');
      if (!user) {
        res.status(404).json({ message: 'No user found with this id!' });
      } else {
        res.json(user);
      }
    } catch (err) {
      res.status(500).json(err);
    }
  },

  async removeFriend(req, res) {
    try {
      const user = await User.findByIdAndUpdate(
        req.params.userId,
        { $pull: { friends: req.params.friendId } },
        { new: true }
      ).populate('friends');
      if (!user) {
        res.status(404).json({ message: 'No user found with this id!' });
      } else {
        res.json(user);
      }
    } catch (err) {
      res.status(500).json(err);
    }
  }
};
