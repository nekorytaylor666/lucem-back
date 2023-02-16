module.exports = {
    client: {
        includes: [__dirname + "/graphql/**"],
        service: {
            name: "graphql",
            url: "https://lucem-back-production.up.railway.app/graphql",
        },
    },
};
