# Dockerized Multi-instance version

This version utilized docker-compose to run multiple service instance. 
To run it:
  1. Prepare the DBaccess.js file
  2. npm install
  3. docker-compose up --build
  
Known issues:
  - Need to npm install before build into docker image, even if I have 'npm install' command written in the dockerfile.
