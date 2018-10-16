FROM openjdk:8-jdk-slim

LABEL maintainter="yago.dorea@gmail.com"

VOLUME /tmp

EXPOSE 4244

ARG JAR_FILE=target/petgree-api-ong-1.0-SNAPSHOT.jar

ADD ${JAR_FILE} petgree-api-ong.jar

ENTRYPOINT ["java","-Djava.security.egd=file:/dev/./urandom","-jar","/petgree-api-ong.jar"]
