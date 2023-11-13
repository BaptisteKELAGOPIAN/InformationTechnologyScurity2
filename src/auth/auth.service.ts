import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { MongoClient, ServerApiVersion } from 'mongodb';

@Injectable()
export class AuthService {
  private client: MongoClient;
  constructor(private jwtService: JwtService) {}

  async connect() {
    const uri =
      'mongodb+srv://baptistekela:2HzJY4nN8TTojYKf@cluster0.kpmcsoq.mongodb.net/?retryWrites=true&w=majority';

    this.client = new MongoClient(uri, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      },
    });

    try {
      await this.client.connect();
      console.log('Connected to MongoDB!');
    } catch (err) {
      console.log(err);
    }
  }

  async insertUser(username: string, password: string) {
    if (!this.client) {
      await this.connect();
    }

    const usersCollection = this.client.db('login').collection('user');

    try {
      const result = await usersCollection.insertOne({ username, password });
      console.log(`Inserted user: ${username}`);
      return result;
    } catch (err) {
      console.log(err);
      return null;
    }
  }

  async findUser(username: string, password: string) {
    if (!this.client) {
      await this.connect();
    }

    const usersCollection = this.client.db('login').collection('user');

    try {
      const user = await usersCollection.findOne({ username, password });
      if (user) {
        console.log(`User found: ${user.username}`);
        return true;
      } else {
        console.log('User not found or incorrect password');
        return false;
      }
    } catch (err) {
      console.log(err);
      return false;
    }
  }

  async createUser(username: string, pass: string) {
    await this.insertUser(username, pass);
  }
  async disconnect() {
    if (this.client) {
      await this.client.close();
      console.log('Disconnected from MongoDB!');
    }
  }
}