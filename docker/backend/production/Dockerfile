FROM node:18.15-alpine

# Add the required repositories and install dependencies
RUN apk update \
    && apk add --no-cache vips-dev fftw-dev build-base

# Create the /app directory
RUN mkdir -p /app

# Set /app as the working directory
WORKDIR /app

# Set SHARP_IGNORE_GLOBAL_LIBVIPS to use the globally installed libvips
ENV SHARP_IGNORE_GLOBAL_LIBVIPS=1

# Copy package.json and yarn.lock first for caching
COPY ./backend/package.json /app/
COPY ./backend/yarn.lock /app/

# Install dependencies
RUN yarn config set network-timeout 600000 -g && yarn install

# Copy source files and build the project
COPY ./backend/src /app/src
COPY ./backend /app

# Set environment variables from Railway
ENV PUBLIC_URL=${PUBLIC_URL}
ENV NODE_ENV=${NODE_ENV}

# Build the project
RUN yarn build

# Expose the application port
EXPOSE 1337

# Run the application
CMD ["yarn", "start"]
