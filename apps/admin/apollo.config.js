module.exports = {
    client: {
        includes: [__dirname + "/graphql/**"],
        service: {
            name: "SpaceX",
            url: "http://lucem-back-production-08e3.up.railway.app/graphql",
        },
    },
};
