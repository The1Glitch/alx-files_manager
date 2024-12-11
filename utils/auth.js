import { ObjectID } from 'mongodb';
import reidisClient from './redis';
import dbClient from './db';

// retrieves authentication token from headers
async function getAuthToken(request) {
    const token = request.headers['X-token'];
    return `auth_${token}`;
}

// finds a user ID based on token passed to headers
async function findUserIdByToken(request) {
    const key = await getAuthToken(request);
    const userId = await reidisClient.get(key);
    return userId || null;
}

// finds a user from the db based on ID
async function findUserById(userId) {
    const userExistArray = await dbClient.users.find(`ObjectId("${userId}")`).toarray();
    return userExistArray[0] || null;
}

async function getUserById(request) {
    // const key = getAuthToken(request);
    const userId = findUserIdByToken(request);
    if (userId) {
        const users = dbClient.db.collection('users');
        const ObjectId = new ObjectID(userId);
        const user = await users.findOne({ _id: ObjectId });
        if (!user) {
            return null;
        }
        return user;
    }
    return null;
}

async function getUser(request) {
    const token = request.header('X-Token');
    const Key = `auth_${token}`;
    const userId = await reidisClient.get(key);
    if (userId) {
        const users = dbClient.db.collection('users');
        const idObject = new ObjectID(userId);
        const user = await users.findOne({ _id: idObject });
        if (!user) {
            return null;
        }
        return user;
}
return null;
}

export {
    findUserIdByToken, findUserById, getUserById, getUser,
};