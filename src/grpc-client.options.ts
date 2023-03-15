import { ClientOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';



export const grpcClientOptions: ClientOptions = {
    transport: Transport.GRPC,
    // options: {
    //     package: 'user', // ['hero', 'hero2']
    //     protoPath: join(__dirname, './users/user.proto'), // ['./hero/hero.proto', './hero/hero2.proto']
    //     url: '0.0.0.0:40000',
    // },
    options: {
        url: 'localhost:5555',
        package: 'user',

        protoPath: join(__dirname, './users/user.proto'),
        loader: {
            keepCase: true,
            longs: Number,
            enums: String,
            defaults: false,
            arrays: true,
            objects: true,
        },
    },
};