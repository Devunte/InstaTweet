const mongoose = require('mongoose');
const { User, Thought } = require('./models');
const { users, thoughts } = require('./seedData');

const seedDatabase = async () => {
  try {
    // Connect to the database
    await mongoose.connect('mongodb://localhost/socialnetwork', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // Clear existing data
    await User.deleteMany({});
    await Thought.deleteMany({});

    // Insert users
    const createdUsers = await User.insertMany(users);

    // Insert thoughts and update user thought arrays
    for (let thoughtData of thoughts) {
      const createdThought = await Thought.create(thoughtData);
      const user = await User.findOneAndUpdate(
        { username: createdThought.username },
        { $push: { thoughts: createdThought._id } },
        { new: true }
      );
    }

    console.log('Database seeded successfully');
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seedDatabase();
