FROM mcr.microsoft.com/devcontainers/ruby:3.2

# Install any additional dependencies here
# RUN apt-get update && apt-get install -y <package-name>
RUN apt-get update && apt-get install -y libcups2-dev

# install google chrome:
RUN apt-get update && apt-get install -y wget unzip
RUN wget https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb
RUN apt-get install -y ./google-chrome-stable_current_amd64.deb 

# Set environment variable to skip Chromium download when installing puppeteer
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true