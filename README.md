URLShortenerService

A complete version of URL Shortener Service. It takes a long url and return a short url to user. 
The service is built using MEAN stack, and can be ran within or without docker.
There are two version:
1. dockerized:
  This version utilized docker-compose to run multiple service instances with redis as cache and using nginx as load balancer.
2. standalone:
  The standalone version could be built into docker image or run directly using node or nodemon. There is no redis using in this version. The main purpose of this version is to do further experiments on UI/ front-end.
  
Both versions are using cloud MongoDB service (https://mlab.com/). I'm using a .js module to store the authentication information for MongoDB, just for convenience. You may want to use a more formal/ secure way to do the authentication when depolying the service.

If you want to use my current way to access a cloud database service, you will need to:
  1. Under '/app' directory, create a file called 'DBaccess.js'
  2. Add following code:
  
    var dbLink = '<your cloud db uri>';
    module.exports = {
      dbLink : dbLink
    };
