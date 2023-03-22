// import { Injectable } from '@nestjs/common';
// import { Client, ClientGrpc, Transport } from '@nestjs/microservices';
// import { validate } from 'class-validator';
// import { User } from '';
// import {
//     CreateUserRequest,
//     CreateUserResponse,
//     ReadUserRequest,
//     ReadUserResponse,
//     UpdateUserRequest,
//     UpdateUserResponse,
//     DeleteUserRequest,
//     DeleteUserResponse,
// } from './user.pb';

// @Injectable()
// export class UserService {
//     @Client({
//         transport: Transport.GRPC,
//         options: {
//             url: 'localhost:50051',
//             package: 'user',
//             protoPath: 'user.proto',
//         },
//     })
//     private client: ClientGrpc;

//     private readonly userGrpcService: any = this.client.getService('UserService');

//     async create(user: User): Promise<User> {
//         const errors = await validate(user);
//         if (errors.length > 0) {
//             throw new Error('Validation failed');
//         }

//         const request = new CreateUserRequest();
//         request.user = user;

//         const response: CreateUserResponse = await this.userGrpcService.create(request).toPromise();

//         return response.user;
//     }

//     async read(id: string): Promise<User> {
//         const request = new ReadUserRequest();
//         request.id = id;

//         const response: ReadUserResponse = await this.userGrpcService.read(request).toPromise();

//         return response.user;
//     }

//     async update(user: User): Promise<User> {
//         const errors = await validate(user);
//         if (errors.length > 0) {
//             throw new Error('Validation failed');
//         }
//     }
// }

//     // const request = new UpdateUserRequest();
//     // request.user
