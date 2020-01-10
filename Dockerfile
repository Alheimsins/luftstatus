###########################################################
#
# Dockerfile for luftstatus
#
###########################################################

# Setting the base to nodejs 10
FROM mhart/alpine-node:10@sha256:247bee813ef20d375d37e9cf81ce0eb8f920ffff1742cabb7d2388d00eb45cdd

# Maintainer
MAINTAINER Jonas Enge

#### Begin setup ####

# Extra tools for native dependencies
#RUN apk add --no-cache make gcc g++ python git

# Bundle app source
COPY . /src

# Change working directory
WORKDIR "/src"

# Install dependencies
RUN npm install --production

RUN npm run build

# Expose 3000
EXPOSE 3000

# Startup
ENTRYPOINT npm run start

