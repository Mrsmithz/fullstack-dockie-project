import { UserTC } from "../../model/User"

export const userById = UserTC.mongooseResolvers.findById()
export const user = UserTC.mongooseResolvers.findOne()
export const users = UserTC.mongooseResolvers.findMany()
export const userCount = UserTC.mongooseResolvers.count()
