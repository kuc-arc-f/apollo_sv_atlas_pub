const {gql} = require('apollo-server-express');
import {GQL_QUERY} from './query'
import {GQL_MUTATION} from './mutation'

const scheme = {
  getTypeDefs : function(){
    return gql`
    type Task {
      id: String
      title: String
      content: String
      created_at: String
    }
    type User {
      id: String
      mail: String
      name: String
      password: String
    } 
    ${GQL_QUERY}
    ${GQL_MUTATION}
  `;
  }
}
export default scheme;
