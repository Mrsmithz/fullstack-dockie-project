import '../model/User'
import { schemaComposer } from 'graphql-compose'
import * as queries from './query'
import * as mutations from './mutation'

schemaComposer.Query.addFields(queries)
schemaComposer.Mutation.addFields(mutations)

export default schemaComposer.buildSchema()