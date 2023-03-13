module.exports = {
    client: {
        includes: [__dirname + "/graphql/**"],
        service: {
            name: "graphql",
            url: "http://localhost:3000/graphql",
        },
    },
};
