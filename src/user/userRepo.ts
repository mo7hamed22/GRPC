// import { Injectable } from '@nestjs/common';
// import { Client, ClientGrpc, GrpcMethod } from '@nestjs/microservices';
// import { loadPackageDefinition, credentials } from '@grpc/grpc-js';
// import { User, UserService } from '../generated/user_pb';

// @Injectable()
// export class UserRepository {
//     @Client({
//         transport: 'grpc',
//         options: {
//             package: 'user',
//             protoPath: './src/generated/user.proto',
//             url: 'localhost:5000',
//             loader: loadPackageDefinition,
//             credentials: credentials.createInsecure(),
//         },
//     })
//     private client: ClientGrpc;

//     private service: UserService;

//     onModuleInit() {
//         this.service = this.client.getService<UserService>('UserService');
//     }

//     async create(user: User): Promise<User> {
//         const response = await this.service.createUser(user).toPromise();
//         const createdUser = User.fromObject(response);
//         return createdUser;
//     }

//     async getById(id: number): Promise<User> {
//         const request = { id };
//         const response = await this.service.getUserById(request).toPromise();
//         const user = User.fromObject(response);
//         return user;
//     }

//     async update(user: User): Promise<User> {
//         const response = await this.service.updateUser(user).toPromise();
//         const updatedUser
