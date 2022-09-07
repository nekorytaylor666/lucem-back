module.exports = {
    client: {
        includes: [__dirname + "/src/api/**"],
        service: {
            name: "Lucem",
            url: "https://api.lucem.kz/graphql",
        },
    },
};
