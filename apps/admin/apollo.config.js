module.exports = {
    client: {
        includes: [__dirname + "/graphql/**"],
        service: {
            name: "SpaceX",
            url: "http://localhost:3000/graphql",
        },
    },
};
