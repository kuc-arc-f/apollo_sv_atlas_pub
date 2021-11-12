
export const GQL_QUERY = `
  type Query {
    hello: String
    tasks: [Task]
    task(id: String): Task
    users: [User]
    user(mail: String, password: String): User
    userCount: Int
    userValid(email: String!, password: String!): User  
  }
`;