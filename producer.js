import { Kafka } from 'kafkajs'
import { randomUUID } from 'node:crypto'

async function bootstrap() {
  const kafka = new Kafka({
    clientId: 'kafka-producer',
    brokers: ['robust-kiwi-7745-us1-kafka.upstash.io:9092'],
    sasl: {
      mechanism: 'scram-sha-256',
      username:
        'cm9idXN0LWtpd2ktNzc0NSS53YH-vcOy2VgSfKtMQXbAGqtKtZTwMk1FFdLCJeo',
      password:
        'bNnA-RbolWsJaQPVvUbaGF1rMqEdxuWRdYB6gZ8sNICO9FrftoTgRQyOGErn3z72XIDsHg==',
    },
    ssl: true,
  })

  const producer = kafka.producer()

  await producer.connect()

  await producer.send({
    topic: 'notifications.send-notification',
    messages: [
      {
        value: JSON.stringify({
          content: 'Hello World',
          category: 'general',
          recipientId: randomUUID(),
        }),
      },
    ],
  })

  await producer.disconnect()
}

bootstrap()