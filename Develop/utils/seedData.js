const users = [
    {
      username: 'lernantino',
      email: 'lernantino@gmail.com',
      thoughts: [],
      friends: []
    },
    {
      username: 'john_doe',
      email: 'john_doe@gmail.com',
      thoughts: [],
      friends: []
    },
    {
      username: 'jane_doe',
      email: 'jane_doe@gmail.com',
      thoughts: [],
      friends: []
    }
  ];
  
  const thoughts = [
    {
      thoughtText: "Here's a cool thought...",
      username: 'lernantino',
      reactions: []
    },
    {
      thoughtText: "Another interesting thought...",
      username: 'john_doe',
      reactions: []
    },
    {
      thoughtText: "Yet another fascinating thought...",
      username: 'jane_doe',
      reactions: []
    }
  ];
  
  module.exports = { users, thoughts };
  