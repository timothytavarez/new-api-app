
const azure = require('azure-storage');
const hapi = require('hapi');
const dotenv = require('dotenv').config();

const tableService = azure.createTableService(process.env.CUSTOMCONNSTR_cosmosTables);

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
    console.log('Im HAPI!');
};

server.route({
    method: 'GET',
    path: '/',
    handler: function (request, h) {
        return 200;
    }
});

server.route({
    method: 'GET',
    path: '/dogs',
    handler: function (request, h) {

        const query = new azure.TableQuery()
            .where("PartitionKey eq 'dogData'");

        const promise = new Promise((resolve, reject) => {

            tableService.queryEntities('dogs', query, null, (err, result, response) => {
                if (err) {
                    reject(err)
                }
    
                resolve(result);
            })
        });

        return promise;
    }
});

process.on('unhandledRejection', function (err) {
    console.log(err);
 
});

init();