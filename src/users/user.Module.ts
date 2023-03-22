import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { grpcClientOptions } from '../grpc-client.options';
import { UserController } from './users.controller';
import { JetStreamDataService } from '../jetStream/jetstreamservice';

@Module({
    imports: [
        ClientsModule.register([
            {
                name: 'USER_PACKAGE',
                ...grpcClientOptions,
            },

        ]),
    ],
    providers: [JetStreamDataService],
    controllers: [UserController],
})
export class UserModule { }