
const azure = require('azure-storage');
const hapi = require('hapi');
const dotenv = require('dotenv').config();

const config = {
    port: process.env.PORT || 3000,
    host: process.env.host || "localhost",
    routes: { cors: true },
    router: {
        isCaseSensitive: false,
        stripTrailingSlash: true
    }
};

const server = new hapi.Server(config);

const init = async () => {
    await server.start();
    console.log('Im working! Maybe!');
};

server.route({
    method: 'GET',
    path: '/',
    handler: function (request, h) {
        return 200;
    }
});

process.on('unhandledRejection', function (err) {
    console.log(err);
    process.exit(1);
});

init();