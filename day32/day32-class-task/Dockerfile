# Stage 1 - Build Angular
FROM node:23 as angular-builder

WORKDIR /src

RUN npm i -g @angular/cli

COPY ./angular/*.json .
COPY ./angular/src src

RUN npm ci

RUN ng build


# Stage 2 - Copy the /browser files to spring-boot's static and build springboot
FROM eclipse-temurin:23-noble AS springboot-builder

WORKDIR /app

COPY ./springboot/mvnw .
COPY ./springboot/mvnw.cmd .
COPY ./springboot/pom.xml .
COPY ./springboot/.mvn .mvn
COPY ./springboot/src src

COPY --from=angular-builder /src/dist/day32-class-task/browser ./src/main/resources/static/

RUN chmod a+x ./mvnw && ./mvnw clean package -Dmaven.test.skip=true


# Stage 3 - Create final container with jar file
FROM eclipse-temurin:23-jre-noble

WORKDIR /app
COPY --from=springboot-builder /app/target/springboot-0.0.1-SNAPSHOT.jar myApp.jar

ENV SERVER_PORT=8080
EXPOSE ${SERVER_PORT}

ENTRYPOINT java -jar myApp.jar
