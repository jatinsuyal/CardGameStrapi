FROM node:18.15-alpine

# Add the required repositories and install vips-dev
RUN echo "https://dl-cdn.alpinelinux.org/alpine/edge/main" >> /etc/apk/repositories \
    && echo "https://dl-cdn.alpinelinux.org/alpine/edge/community" >> /etc/apk/repositories \
    && echo "https://dl-cdn.alpinelinux.org/alpine/edge/testing" >> /etc/apk/repositories \
    && apk update \
    && apk add vips-dev fftw-dev build-base

# where our Strapi app will live
RUN mkdir -p /app

# Set /app as the working directory
WORKDIR /app

# Set SHARP_IGNORE_GLOBAL_LIBVIPS to use the globally installed libvips
ENV SHARP_IGNORE_GLOBAL_LIBVIPS=1

# Copy .env file
# Copy individual files/folders
COPY ./backend/package.json /app/
COPY ./backend/yarn.lock /app/
COPY ./.env /app/
COPY ./backend/src /app/src  

# Install dependencies in /app
RUN yarn config set network-timeout 600000 -g && yarn install

# Copy the rest of our Strapi folder into /app
COPY ./backend /app

ENV PUBLIC_URL ${PUBLIC_URL}

# For production build
ENV NODE_ENV=${NODE_ENV}

# Install dependencies and build the project
RUN yarn build

EXPOSE 1337

# Run yarn start, as we would via the command line 
CMD ["yarn", "start"]
