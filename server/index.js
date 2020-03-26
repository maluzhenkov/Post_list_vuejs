module.exports = () => {
  const data = { users: [], posts: [] };
  const whatRole = i => (i % 2 === 0 ? "reader" : "writer");
  // Create 100 users and posts
  let i = 1;
  for (i; i <= 100; i++) {
    data.users.push({
      id: i,
      login: `user${i}@gmail.com`,
      password: "123456",
      role: whatRole(i)
    });
    data.posts.push({
      id: i,
      title: `Название поста ${i}`,
      description:
        "Далеко-далеко за словесными горами в стране, гласных и согласных живут рыбные тексты. Сих точках большой сбить гор которое одна предупреждал ipsum буквенных живет ее путь, семь подзаголовок там города подпоясал маленькая речью даль свою использовало вопрос что себя коварных лучше. Ручеек, сих толку. Речью маленький власти свой там предупредила путь, себя диких!",
      likes: i,
      createdAt: "2019-09-29T00:00:00.000Z",
      updateAt: "2019-09-29T00:00:00.000Z",
      userId: i
    });
  }
  return data;
};
