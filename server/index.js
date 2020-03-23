module.exports = () => {
  const data = { users: [] };
  const whatRole = i => (i % 2 === 0 ? "reader" : "writer");
  // Create 100 users
  for (let i = 0; i < 100; i++) {
    data.users.push({
      id: i,
      login: `user${i}@gmail.com`,
      password: "123456",
      role: whatRole(i)
    });
  }
  return data;
};
