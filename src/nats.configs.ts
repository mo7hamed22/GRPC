import { connect, JSONCodec } from 'nats';

const nc = connect({ servers: 'nats://localhost:4222' });
const jc = JSONCodec();

