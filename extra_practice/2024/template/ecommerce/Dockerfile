FROM node:23 as angular-builder

WORKDIR /src

RUN npm i -g @angular/cli
# RUN npm i -g @angular/cli@17.1.0

COPY ./client/*.json .
COPY ./client/src src

RUN npm ci

RUN ng build


FROM eclipse-temurin:23-noble AS springboot-builder

WORKDIR /app

COPY mvnw .
COPY mvnw.cmd .
COPY pom.xml .
COPY .mvn .mvn
COPY src src

COPY --from=angular-builder /src/dist/client-side/browser ./src/main/resources/static/

RUN chmod a+x ./mvnw && ./mvnw clean package -Dmaven.test.skip=true



FROM eclipse-temurin:23-jre-noble

WORKDIR /app
COPY --from=springboot-builder /app/target/ecommerce-0.0.1-SNAPSHOT.jar myApp.jar

ENV SERVER_PORT=8080
EXPOSE ${SERVER_PORT}

ENTRYPOINT java -jar myApp.jar