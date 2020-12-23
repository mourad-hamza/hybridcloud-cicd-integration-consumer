console.log(`
 ██████╗ ██████╗ ███╗   ██╗███████╗██╗   ██╗███╗   ███╗███████╗██████╗ 
██╔════╝██╔═══██╗████╗  ██║██╔════╝██║   ██║████╗ ████║██╔════╝██╔══██╗
██║     ██║   ██║██╔██╗ ██║███████╗██║   ██║██╔████╔██║█████╗  ██████╔╝
██║     ██║   ██║██║╚██╗██║╚════██║██║   ██║██║╚██╔╝██║██╔══╝  ██╔══██╗
╚██████╗╚██████╔╝██║ ╚████║███████║╚██████╔╝██║ ╚═╝ ██║███████╗██║  ██║
 ╚═════╝ ╚═════╝ ╚═╝  ╚═══╝╚══════╝ ╚═════╝ ╚═╝     ╚═╝╚══════╝╚═╝  ╚═╝
                                                                       
████████╗██╗  ██╗██╗███████╗    ██╗███████╗    ████████╗██╗  ██╗███████╗    ██╗    ██╗ █████╗ ██╗   ██╗
╚══██╔══╝██║  ██║██║██╔════╝    ██║██╔════╝    ╚══██╔══╝██║  ██║██╔════╝    ██║    ██║██╔══██╗╚██╗ ██╔╝
   ██║   ███████║██║███████╗    ██║███████╗       ██║   ███████║█████╗      ██║ █╗ ██║███████║ ╚████╔╝ 
   ██║   ██╔══██║██║╚════██║    ██║╚════██║       ██║   ██╔══██║██╔══╝      ██║███╗██║██╔══██║  ╚██╔╝  
   ██║   ██║  ██║██║███████║    ██║███████║       ██║   ██║  ██║███████╗    ╚███╔███╔╝██║  ██║   ██║   
   ╚═╝   ╚═╝  ╚═╝╚═╝╚══════╝    ╚═╝╚══════╝       ╚═╝   ╚═╝  ╚═╝╚══════╝     ╚══╝╚══╝ ╚═╝  ╚═╝   ╚═╝                                                                                       
`);
/***
 *    ██╗███╗   ███╗██████╗  ██████╗ ██████╗ ████████╗███████╗
 *    ██║████╗ ████║██╔══██╗██╔═══██╗██╔══██╗╚══██╔══╝██╔════╝
 *    ██║██╔████╔██║██████╔╝██║   ██║██████╔╝   ██║   ███████╗
 *    ██║██║╚██╔╝██║██╔═══╝ ██║   ██║██╔══██╗   ██║   ╚════██║
 *    ██║██║ ╚═╝ ██║██║     ╚██████╔╝██║  ██║   ██║   ███████║
 *    ╚═╝╚═╝     ╚═╝╚═╝      ╚═════╝ ╚═╝  ╚═╝   ╚═╝   ╚══════╝
 *                                                            
 */
const config = require('./configs/config')
const appInfo = require('./package.json')
const request = require('request')
const { Kafka, CompressionTypes, logLevel } = require('kafkajs')
/***
 *    ███████╗███╗   ██╗██╗   ██╗██╗██████╗  ██████╗ ███╗   ██╗███████╗███╗   ███╗███████╗███╗   ██╗████████╗
 *    ██╔════╝████╗  ██║██║   ██║██║██╔══██╗██╔═══██╗████╗  ██║██╔════╝████╗ ████║██╔════╝████╗  ██║╚══██╔══╝
 *    █████╗  ██╔██╗ ██║██║   ██║██║██████╔╝██║   ██║██╔██╗ ██║█████╗  ██╔████╔██║█████╗  ██╔██╗ ██║   ██║   
 *    ██╔══╝  ██║╚██╗██║╚██╗ ██╔╝██║██╔══██╗██║   ██║██║╚██╗██║██╔══╝  ██║╚██╔╝██║██╔══╝  ██║╚██╗██║   ██║   
 *    ███████╗██║ ╚████║ ╚████╔╝ ██║██║  ██║╚██████╔╝██║ ╚████║███████╗██║ ╚═╝ ██║███████╗██║ ╚████║   ██║   
 *    ╚══════╝╚═╝  ╚═══╝  ╚═══╝  ╚═╝╚═╝  ╚═╝ ╚═════╝ ╚═╝  ╚═══╝╚══════╝╚═╝     ╚═╝╚══════╝╚═╝  ╚═══╝   ╚═╝   
 *                                                                                                           
 */
const JENKINS_URI = process.env.JENKINS_URI || config.jenkinsUri
const KAFKA_CLIENT_ID = process.env.KAFKA_CLIENT_ID || config.kafkaClientId
const KAFKA_BROKERS = process.env.KAFKA_BROKERS || config.kafkaBrokers
const KAFKA_AUTHENTICATION_TIMEOUT = process.env.KAFKA_AUTHENTICATION_TIMEOUT || config.kafkaAuthenticationTimeout
const KAFKA_REAUTHENTICATION_THRESHOLD = process.env.KAFKA_REAUTHENTICATION_THRESHOLD || config.kafkaReauthenticationThreshold
const KAFKA_CONNECTION_TIMEOUT = process.env.KAFKA_CONNECTION_TIMEOUT || config.kafkaConnectionTimeout
const KAFKA_REQUEST_TIMEOUT = process.env.KAFKA_REQUEST_TIMEOUT || config.kafkaRequestTimeout
const KAFKA_MECHANISM = process.env.KAFKA_MECHANISM || config.kafkaMechanism
const KAFKA_USERNAME = process.env.KAFKA_USERNAME || config.kafkaUsername
const KAFKA_PASSWORD = process.env.KAFKA_PASSWORD || config.kafkaPassword
const KAFKA_TOPIC = process.env.KAFKA_TOPIC || config.kafkaTopic
const KAFKA_CONSUMER_GROUP_ID = process.env.KAFKA_CONSUMER_GROUP_ID || config.kafkaConsumerGroupID
/***
 *     ██████╗ ██████╗ ███╗   ██╗███████╗██╗ ██████╗ ██╗   ██╗██████╗  █████╗ ████████╗██╗ ██████╗ ███╗   ██╗
 *    ██╔════╝██╔═══██╗████╗  ██║██╔════╝██║██╔════╝ ██║   ██║██╔══██╗██╔══██╗╚══██╔══╝██║██╔═══██╗████╗  ██║
 *    ██║     ██║   ██║██╔██╗ ██║█████╗  ██║██║  ███╗██║   ██║██████╔╝███████║   ██║   ██║██║   ██║██╔██╗ ██║
 *    ██║     ██║   ██║██║╚██╗██║██╔══╝  ██║██║   ██║██║   ██║██╔══██╗██╔══██║   ██║   ██║██║   ██║██║╚██╗██║
 *    ╚██████╗╚██████╔╝██║ ╚████║██║     ██║╚██████╔╝╚██████╔╝██║  ██║██║  ██║   ██║   ██║╚██████╔╝██║ ╚████║
 *     ╚═════╝ ╚═════╝ ╚═╝  ╚═══╝╚═╝     ╚═╝ ╚═════╝  ╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═╝   ╚═╝   ╚═╝ ╚═════╝ ╚═╝  ╚═══╝
 *                                                                                                           
 */
const kafka = new Kafka({
  clientId: KAFKA_CLIENT_ID,
  brokers: [KAFKA_BROKERS],
  authenticationTimeout: KAFKA_AUTHENTICATION_TIMEOUT,
  reauthenticationThreshold: KAFKA_REAUTHENTICATION_THRESHOLD,
  connectionTimeout: KAFKA_CONNECTION_TIMEOUT,
  requestTimeout: KAFKA_REQUEST_TIMEOUT,
  ssl: true,
  sasl: {
    mechanism: KAFKA_MECHANISM,
    username: KAFKA_USERNAME,
    password: KAFKA_PASSWORD
  },
})
const topic = KAFKA_TOPIC
const consumer = kafka.consumer({ groupId: KAFKA_CONSUMER_GROUP_ID })
/***
 *     █████╗ ██████╗ ██╗     ██████╗ █████╗ ██╗     ██╗     ███████╗
 *    ██╔══██╗██╔══██╗██║    ██╔════╝██╔══██╗██║     ██║     ██╔════╝
 *    ███████║██████╔╝██║    ██║     ███████║██║     ██║     ███████╗
 *    ██╔══██║██╔═══╝ ██║    ██║     ██╔══██║██║     ██║     ╚════██║
 *    ██║  ██║██║     ██║    ╚██████╗██║  ██║███████╗███████╗███████║
 *    ╚═╝  ╚═╝╚═╝     ╚═╝     ╚═════╝╚═╝  ╚═╝╚══════╝╚══════╝╚══════╝
 *                                                                   
 */
const apiCaller = async (url,req) => {
  req_headers = JSON.parse(req).headers
        // filter headers
        var req_headers_filtred = "{";
        for(var req_header in req_headers){
            switch (req_header) {
                // Headers to remove from source
                case "x-forwarded-for":
                case "x-forwarded-proto":
                case "x-forwarded-port":
                case "user-agent":
                case "host":
                case "accept":
                case "content-length":
                case "expect":
                case "authorization":
                    break;
                default:
                    req_headers_filtred = req_headers_filtred+'"'+req_header+'": "'+req_headers[req_header]+'",'
              }
        }
        //req_headers_filtred = req_headers_filtred+'"x-forwarded-port":"8082"';
        // For test directly whihout github and Kafka
        // curl -H "x-github-event:push" --data-urlencode payload@github-event.json -v -s -XPOST http://192.168.56.110:8082/github-webhook/
        // To test directly whihout github and from Kafka
        // curl  -H "x-github-event:push" -d@github-event.json -v -s -XPOST -u ****:******* http://localhost:8082/github-webhook/
        // Delete last ,
        req_headers_filtred = req_headers_filtred.slice(0, -1);
        req_headers_filtred = req_headers_filtred+"}";
        const req_options = {
            url: JENKINS_URI + `${url}`,
            method: 'POST',
            headers: JSON.parse(req_headers_filtred),
            body: JSON.stringify(JSON.parse(req).body),
        };
        console.log(JENKINS_URI + `${url}`)
        console.log("###################################")
        console.log(JSON.parse(req_headers_filtred))
        //console.log("###################################")
        //console.log(JSON.stringify(JSON.parse(req).body))
        request(req_options, function(err, res, body) {
            console.log('API Called ...')
        });
}
/***
 *    ██╗  ██╗ █████╗ ███████╗██╗  ██╗ █████╗ 
 *    ██║ ██╔╝██╔══██╗██╔════╝██║ ██╔╝██╔══██╗
 *    █████╔╝ ███████║█████╗  █████╔╝ ███████║
 *    ██╔═██╗ ██╔══██║██╔══╝  ██╔═██╗ ██╔══██║
 *    ██║  ██╗██║  ██║██║     ██║  ██╗██║  ██║
 *    ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝     ╚═╝  ╚═╝╚═╝  ╚═╝
 *                                            
 */
const run = async () => {
  await consumer.connect()
  await consumer.subscribe({ topic, fromBeginning: true })
  await consumer.run({
    // eachBatch: async ({ batch }) => {
    //   console.log(batch)
    // },
    eachMessage: async ({ topic, partition, message }) => {
      //const prefix = `${topic}[${partition} | ${message.offset}] / ${message.timestamp}`
      console.log(`Topic:${topic} [Partition: ${partition} | Offreset: ${message.offset}] / Timestamp: ${message.timestamp}`)
      url = message.key
      req = message.value
      apiCaller(url, req)
    },
  })
}

run().catch(e => console.error(`[example/consumer] ${e.message}`, e))

const errorTypes = ['unhandledRejection', 'uncaughtException']
const signalTraps = ['SIGTERM', 'SIGINT', 'SIGUSR2']

errorTypes.map(type => {
  process.on(type, async e => {
    try {
      console.log(`process.on ${type}`)
      console.error(e)
      await consumer.disconnect()
      process.exit(0)
    } catch (_) {
      process.exit(1)
    }
  })
})

signalTraps.map(type => {
  process.once(type, async () => {
    try {
      await consumer.disconnect()
    } finally {
      process.kill(process.pid, type)
    }
  })
})