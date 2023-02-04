import { Injectable, OnApplicationShutdown, OnModuleInit, Session } from "@nestjs/common";
import { Kafka, Producer, ProducerRecord } from "kafkajs";

@Injectable()
export class ProducerService implements OnModuleInit, OnApplicationShutdown{
    private readonly kafka = new Kafka({
        brokers: [process.env.KAFKA_BROKERS],
        clientId: process.env.KAFKA_CLIENT,
        ssl: true,
        sasl: {
            mechanism: 'plain',
            username: process.env.KAFKA_APIKEY,
            password: process.env.KAFKA_APISECRET
        }
    });
    private readonly producer: Producer = this.kafka.producer();

    async onModuleInit(){
        await this.producer.connect();
    }

    async produce(record: ProducerRecord) {
        await this.producer.send(record);
    }

    async onApplicationShutdown() {
        await this.producer.disconnect();
    }
}