module.exports = {
    client: {
        includes: [__dirname + "/src/api/**"],
        service: {
            name: "Lucem",
            url: "https://lucem-back-production.up.railway.app/graphql",
        },
    },
};
