module.exports = {
    client: {
        includes: [__dirname + "/graphql/**"],
        service: {
            name: "graphql",
            url: "https://api.pulse.org.kg/graphql",
        },
    },
};
