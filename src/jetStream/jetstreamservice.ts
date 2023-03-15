import { Injectable } from '@nestjs/common';
import { connect } from 'nats';

@Injectable()
export class DataService {
    private natsClient: any;
    private streamName: string = 'myStream';

    constructor() {
        this.natsClient = connect({
            servers: ['nats://localhost:4222'],
        });
    }

    async storeData(data: any) {
        const stream = await this.natsClient.jetstream().createStream(this.streamName);
        await stream.publish(data);
    }

    async getData() {
        const stream = await this.natsClient.jetstream().openNak(this.streamName);
        const messages = await stream.pull({ max: 10 });
        return messages.map((message) => message.data);
    }
}