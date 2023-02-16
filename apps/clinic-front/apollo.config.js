module.exports = {
    client: {
        includes: [__dirname + "/graphql/**"],
        service: {
            name: "graphql",
            url: "http://lucem-back-production.up.railway.app/graphql",
        },
    },
};
