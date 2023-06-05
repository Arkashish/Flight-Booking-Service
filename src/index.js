
const express = require('express');

const { ServerConfig, Queue } = require('./config');
const apiRoutes = require('./routes');
const CRON = require('./utils/common/cron-jobs');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/api', apiRoutes);
app.use('/bookingService/api', apiRoutes);

app.listen(ServerConfig.PORT, async () => {
    console.log(`Successfully started the server on PORT : ${ServerConfig.PORT}`);
    CRON();
    await Queue.connectQueue();
    console.log("queue connected")
});
// const express = require('express');
// const amqlib = require('amqplib');

// async function connectQueue() {
//     try {
//         const conn = await amqlib.connect("amqp://localhost");
//         const channel = await conn.createChannel();

//         await channel.assertQueue('noti-queue');
//         await channel.sendToQueue("noti-queue", Buffer.from("this is a msg"));
//     } catch (error) {
//         console.log(error);
//     }
// }

// const { ServerConfig } = require('./config');
// const apiRoutes = require('./routes');
// const CRON = require('./utils/common/cron-jobs')
// const app = express();

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// app.use('/api', apiRoutes);
// app.use('/bookingService/api', apiRoutes);

// app.listen(ServerConfig.PORT, async () => {
//     console.log(`Successfully started the server on PORT : ${ServerConfig.PORT}`);
//     CRON();
//     await connectQueue();
//     console.log('queue connected');
// });