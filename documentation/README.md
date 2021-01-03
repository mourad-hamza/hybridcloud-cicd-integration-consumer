## Install

### Kubernetes
 ```yaml
apiVersion: v1
kind: Secret
metadata:
  name: hybridcloud-cicd-integration-consumer
type: Opaque
stringData:
    KAFKA_USERNAME: 'my-kafka-user'
    KAFKA_PASSWORD: 'my-kafka-password'
---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: hybridcloud-cicd-integration-consumer
spec:
  replicas: 1
  selector:
    matchLabels:
      app: hybridcloud-cicd
      type: consumer
  template:
    metadata:
      labels:
        app: hybridcloud-cicd
        type: consumer
    spec:
      containers:
      - image: docker.io/hamourad/hybridcloud-cicd-integration-consumer:latest
        name: consumer
        env:
          - name: JENKINS_URI
            value: "http://fqdn-to-my-jenkins:8080"
          - name: KAFKA_CLIENT_ID
            value: "cicd-consumer-sample"
          - name: KAFKA_BROKERS
            value: "my-brokers:port"
          - name: KAFKA_AUTHENTICATION_TIMEOUT
            value: "1000"
          - name: KAFKA_REAUTHENTICATION_THRESHOLD
            value: "10000"
          - name: KAFKA_CONNECTION_TIMEOUT
            value: "1000"
          - name: KAFKA_REQUEST_TIMEOUT          
            value: "30000"
          - name: KAFKA_MECHANISM
            value: "scram-sha-256"
          - name: KAFKA_USERNAME
            valueFrom:
              secretKeyRef:
                name: hybridcloud-cicd-integration-consumer
                key: KAFKA_USERNAME
          - name: KAFKA_PASSWORD
            valueFrom:
              secretKeyRef:
                name: hybridcloud-cicd-integration-consumer
                key: KAFKA_PASSWORD
          - name: KAFKA_TOPIC
            value: "my-cicd-topic"
          - name: KAFKA_CONSUMER_GROUP_ID
            value: "my-consumer-group"
```
### Heroku
```console
export HEROKU_APP=my-heroku-app
curl https://cli-assets.heroku.com/install.sh | sh
docker pull hamourad/hybridcloud-cicd-integration-consumer:latest
docker tag hamourad/hybridcloud-cicd-integration-consumer:latest registry.heroku.com/$HEROKU_APP/web
heroku login -i
heroku container:login
docker push registry.heroku.com/$HEROKU_APP/web
heroku container:release -a $HEROKU_APP web
```
## Variables

### API Access
| Environement variables | Config file varialbes | Description | Value sample            |
---------------------- | ---------------------- | ----------- | ------------
| `JENKINS_URI` | `config.jenkinsUri` | Jenkins URL to CALL | `http://fqdn-to-my-jenkins:8080` |

### Kafka variables
| Environement variables | Config file varialbes | Description | Value sample            |
---------------------- | ---------------------- | ----------- | ------------
| `KAFKA_CLIENT_ID` | `config.kafkaClientId` | Kafka client ID | `cicd-consumer-sample` |
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
