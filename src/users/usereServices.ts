// import { Injectable } from '@nestjs/common';
// import { Client, ClientProxy } from '@nestjs/microservices';
// import { nanoid } from 'nanoid';
// import { connect, JetStreamClient, NatsConnectionOptions } from 'nats';

// @Injectable()
// export class UserService {
//     private client: ClientProxy;
//     private js: JetStreamClient | null = null;

//     // async connect() {
//     //     const opts: NatsConnectionOptions = {
//     //         servers: ['nats://localhost:4222'],
//     //     };
//     //     const nc = await connect(opts);
//     //     const js = nc.jetstream();
//     //     this.js = js;
//     // }
//     // constructor() {
//     //     const nc = connect({
//     //         servers: ['nats://localhost:4222'],
//     //         connectionName: 'user-service',
//     //         jetstream: true,
//     //         nkeyFile: '/path/to/nkey/file',
//     //     });

//     //     this.client = nc.jetstream();
//     //     this.setupJetstream();
//     // }

//     async createUser(name: string): Promise<string> {
//         const id = nanoid();

//         await this.client.emit('createUser', { id, name }).toPromise();

//         return id;
//     }

//     async getUsers(): Promise<any[]> {
//         const response = await this.client.send('getUsers', {}).toPromise();

//         return response.users;
//     }

//     private async setupJetstream() {
//         const streamExists = await this.client.streamExists('users');

//         if (!streamExists) {
//             await this.client.addStream({
//                 name: 'users',
//                 subjects: ['user.*'],
//             });
//         }

//         await this.client.subscribe('createUser', async (data) => {
//             const msg = JSON.stringify(data);

//             await this.client.publish('user.created', msg);
//         });

//         await this.client.subscribe('getUsers', async () => {
//             const users = [];

//             for await (const message of nc.jetstream().pullSubscribe('users').iterator()) {
//                 users.push(JSON.parse(message.data));
//             }

//             return { users };
//         });
//     }
// }