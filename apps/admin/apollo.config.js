module.exports = {
    client: {
        includes: [__dirname + "/graphql/**"],
        service: {
            name: "SpaceX",
            url: "http://lucem-back-production.up.railway.app/graphql",
        },
    },
};
