import { connectGridFS, closeGridFSConnection } from "../../../src/utils/uploadsBucket";
import { MongoMemoryServer } from 'mongodb-memory-server'
import { connectDB, disconnectDB, clearDB} from '../../../src/utils/db'
import mongoose, {Mongoose} from "mongoose";


describe('Database Connection Test', () => {

    it('Database Should Connected', async () => {
        const mongo = await MongoMemoryServer.create()
        const uri = mongo.getUri()
        const result = await connectDB(uri)
        expect(result).toBeInstanceOf(Mongoose)
        await disconnectDB()
        await mongo.stop()
    })
})