module.exports = {
    client: {
        includes: [__dirname + "/src/api/**"],
        service: {
            name: "Lucem",
            url: "http://localhost:3000/graphql",
        },
    },
};
