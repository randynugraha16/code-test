import { Kafka } from "kafkajs";

const kafka = new Kafka({
  clientId: "app",
  brokers: ["broker"],
});

const consumer = kafka.consumer({ groupId: "consumer-group" });

await consumer.connect();
await consumer.subscribe({ topic: "ACCOUNT", fromBeginning: true });

await consumer.run({
  eachMessage: async ({ topic, partition, message }) => {
    console.log({
      value: message.value.toString(),
    });
  },
});
