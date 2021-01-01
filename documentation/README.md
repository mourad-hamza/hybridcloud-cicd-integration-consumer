### Variables
                    
| Environement variables | Config file varialbes | Description | Value sample            |
---------------------- | ---------------------- | ----------- | ------------
| `JENKINS_URI` | `config.jenkinsUri` | Jenkins URL to CALL | `http://fqdn-to-my-jenkins:8080` |
| `KAFKA_CLIENT_ID` | `config.kafkaClientId` | Kafka client ID | `cicd-producer-sample` |
| `KAFKA_BROKERS` | `config.kafkaBrokers` | Kafka brokers URIs | `my-brokers:port` |
| `KAFKA_AUTHENTICATION_TIMEOUT` | `config.kafkaAuthenticationTimeout` | Kafka authentication timeout | `1000` |
| `KAFKA_REAUTHENTICATION_THRESHOLD` | `config.kafkaReauthenticationThreshold` | Kafka reuthntication threshold | `10000` |
| `KAFKA_CONNECTION_TIMEOUT` | `config.kafkaConnectionTimeout` | Kafka connection timout | `1000` |
| `KAFKA_REQUEST_TIMEOUT` | `config.kafkaRequestTimeout` | Kafka request timeout | `30000` |
| `KAFKA_MECHANISM` | `config.kafkaMechanism` | Kafka authentication mechanism | `scram-sha-256` or `scram-sha-512` |
| `KAFKA_USERNAME` | `config.kafkaUsername` | Kafka authentication username | `my-kafka-user` |
| `KAFKA_PASSWORD` | `config.kafkaPassword` | Kafka authentication password | `my-kafka-password` |
| `KAFKA_TOPIC` | `config.kafkaTopic` | Kafka topic | `my-cicd-topic` |
| `KAFKA_CONSUMER_GROUP_ID` | `config.kafkaConsumerGroupID` | Description ... | `my-consumer-group` |