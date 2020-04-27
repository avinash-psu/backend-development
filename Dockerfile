FROM ubuntu

RUN apt-get update -y
RUN apt-get upgrade -y
RUN apt-get insall nodejs -y && apt-get install npm -y

RUN npm cache clean -f
RUN npm install -g n
RUN n stable

ADD . . 
RUN npm -i

EXPOSE 1337
