FROM node:0.10

MAINTAINER Raul Geana

ENV PLUGIN_HOME /home/plugin

RUN mkdir $PLUGIN_HOME
WORKDIR $PLUGIN_HOME

ADD ./package.json $PLUGIN_HOME/package.json

RUN npm install
RUN mv node_modules ../

ADD ./src $PLUGIN_HOME/src
ADD ./test $PLUGIN_HOME/test

# Port 3000 for server
EXPOSE 3000
EXPOSE 5858
