
export const GQL_MUTATION = `
type Mutation {
  addUser(name: String!, email: String!, password: String!): User
  addTask(title: String!): Task
  updateTask(id: String!, title: String!): Task
  deleteTask(id: String!): Task  
}
`;
