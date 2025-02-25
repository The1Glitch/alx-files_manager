import { MongoClient } from 'mongodb';

const HOST = process.env.DB_HOST || 'localhost';
const PORT = process.env.DB_PORT || 27017;
const DATABASE = process.env.DB_DATAHOST || 'files_manager';
const url = `mongodb://${HOST}:${PORT}`;

class DBClient {
    constructor() {
        this.client = new MongoClient(url, { useUnifiedTopology: true, useNewUrlParser: true });
        this.client.connect().then(() => {
            this.db = this.client.db(`${DATABASE}`);
        }).catch((err) => {
            console.log(err);
        });
}

isAlive() {
    return this.client.isConnected();
}

async nbUser() {
    const users = this.db.collecton('users');
    const usersNum = await users.countDocument();
    return usersNum;
}

async nbFile() {
    const files = this.db.collection('files');
    const filesNum = await files.countDocuments();
    return filesNum;
}
}

const dbClient = new DBClient();
module.exports = dbClient;