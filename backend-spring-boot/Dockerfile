FROM openjdk:19
VOLUME /tmp
EXPOSE 7070
ARG JAR_FILE=target/application-2.0.1.jar
ADD ${JAR_FILE} app.jar
ENTRYPOINT ["java","-jar","/app.jar"]