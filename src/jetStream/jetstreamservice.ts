
import { Injectable } from '@nestjs/common';
import { connect, NatsConnection, StringCodec } from 'nats';

@Injectable()
export class JetStreamDataService {
    private natsClient: NatsConnection;
    private streamName: string;
    private servers: string = process.env.NATS_URL || 'nats://localhost:4222';
    private jsm: any;
    private js: any;

    constructor() {
        this.start();
    }

    async start() {
        const sc = StringCodec();

        this.natsClient = await connect({
            servers: this.servers,
        });

        this.jsm = await this.natsClient.jetstreamManager();
        this.js = await this.natsClient.jetstream();

        // this.js = this.natsClient.jetstream();

        console.log('Connected to NATS JetStream');
    }

    async CreateStream(streamName: string, subject: string) {
        await this.jsm.streams.add({ name: streamName, subjects: [subject] });
        // const message = {data: "example data Eissa"};
            // const messageId = await this.jsm.Subjects[subject].messages.add(message);

 // Retrieve information about the stream
 const streamInfo = await this.jsm.streams.info(streamName);
console.log("streams",streamInfo);

 // Check if the subject exists in the stream
 const subjectExists = streamInfo.config.subjects.includes(subject);

 

 if (!subjectExists) {
     // If the subject does not exist, add it to the stream
   const upstream =   await  this.jsm.streams.update(streamName, {
         subjects: [...streamInfo.config.subjects, subject],
     });
     console.log("upstream",upstream);
     

     console.log(`Subject '${subject}' added to stream '${streamName}'`);
 }

 // Add a message to the subject
//  const data = { foo: "bar" };
//  const message = JSON.stringify(data);
//  const encoder = new TextEncoder();
//  const encodedMessage = encoder.encode(message);
//  await this.js.publish(subject, encodedMessage);
// get MSG
 


//  const streamInfo = await this.jsm.streams.info(streamName);
console.log("Js",this.js)
console.log("JSM",this.jsm);
;

 //  await this.jsm.publish(streamName, JSON.stringify(message), {
//     subjects: [...streamInfo.config.subjects, subject],
// });

//  await this.jsm.streams[streamName]
//  const messageId = await this.jsm.streams
//      .stream(streamName)
//      .subject(subject)
//      .publish(message);

            console.log(`Stream '${streamName}' created with subject '${subject}'`);
    }

    async publishData(subject: string, data: any) {
        await this.js.publish(subject, data);
        console.log(`Data published to subject '${subject}': ${JSON.stringify(data)}`);
    }

    async getData(streamName: string, subject: string) {
        const stream = await this.jsm.streams.get(streamName);
        const messages = await stream.pull({ subject: subject, max: 10 });
        const data = messages.map((message) => message.data);
        console.log(`Retrieved data from subject '${subject}': ${JSON.stringify(data)}`);
        return data;
    }

    async updateData(streamName: string, subject: string, data: any) { }
}
/*
async CreateStream(streamName: string, subject: string) {
    // Retrieve information about the stream
    const streamInfo = await this.jsm.streams.info(streamName);

    // Check if the subject exists in the stream
    const subjectExists = streamInfo.config.subjects.includes(subject);

    if (!subjectExists) {
        // If the subject does not exist, add it to the stream
        await this.jsm.streams.update(streamName, {
            subjects: [...streamInfo.config.subjects, subject],
        });

        console.log(`Subject '${subject}' added to stream '${streamName}'`);
    }

    // Add a message to the subject
    const message = { text: 'Hello, world!' };
    const messageId = await this.jsm.streams
        .stream(streamName)
        .subject(subject)
        .publish(message);

    console.log(`Message published with ID ${messageId}`);
}

*/

// async CreateStream(streamName: string, subject: string) {
//     const stream = await this.jsm.streams.add({ name: streamName, subjects: [subject] });
//     console.log(`Stream '${streamName}' created with subject '${subject}'`);
    
//     // Insert an object into the subject
//     const message = {data: "example data"};
//     const messageId = await this.jsm.subjects[subject].messages.add(message);
//     console.log(`Inserted message with ID '${messageId}' into subject '${subject}' of stream '${streamName}'`);

//     // Add another subject to the stream
//     const newSubject = "new subject";
//     await this.jsm.streams.update(stream.id, { subjects: [...stream.subjects, newSubject] });
//     console.log(`Added subject '${newSubject}' to stream '${streamName}'`);
// }

// import { Injectable } from '@nestjs/common';
// import { connect, nanos, StringCodec } from 'nats';

// @Injectable()
// export class JetStreamDataService {

//     private natsClient: any;
//     private streamName: string;
//     private servers: string = process.env.NATS_URL || "nats://localhost:4222";
//     private jsm: any;
//     // JetStream 
//     private js: any;
//     constructor() {
//         this.start();

//     }
//     async start() {
//         const sc = StringCodec();

//         this.natsClient = await connect({
//             servers: "nats://localhost:4222"
//         });
//         // console.log("kkk", this.natsClient);

//         this.jsm = await this.natsClient.jetstreamManager();
//         console.log("jsm", this.jsm);

//         // const msg = await this.natsClient.request("hello", 4222, "me");

//         // console.log("msg: ", msg);
//     }
//     async CreateStream(strName: string, strSub: string) {
//         this.jsm = await this.natsClient.jetstreamManager();
//         const xx = await this.jsm.streams.add({ name: strName, subject: strSub });
//         console.log("[[[", xx);

//         // await this.jsm.streams.get({ name: strName, subject: strSub });
//         console.log(`Stream Created!!${strName}`);


//     }

//     // Publish 
//     async Publish(subject: string, data: any) {
//         this.jsm = await this.natsClient.jetstreamManager();
//         await this.jsm.streams.publish(subject, data);
//     }
//     // async PublishOnSubject(subName: string) {
//     //     this.js = this.natsClient.jetstream();
//     //     console.log("sub", subName);

//     //     await this.js.publish(subName)
//     // }

//     async storeData(streamName: string, data: any) {
//         const stream = await this.jsm.streams.get(streamName);
//         await stream.publish(data);
//     }
//     // async storeData(data: any) {
//     //     const stream = await this.natsClient.jetstream().createStream(this.streamName);
//     //     await stream.publish(data);
//     // }

//     async getData() {
//         const stream = await this.natsClient.jetstream().openNak(this.streamName);
//         const messages = await stream.pull({ max: 10 });
//         return messages.map((message) => message.data);
//     }
// }