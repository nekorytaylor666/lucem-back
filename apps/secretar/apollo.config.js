module.exports = {
    client: {
        includes: [__dirname + "/src/api/**"],
        service: {
            name: "Lucem",
            url: "http://lucem-back-production.up.railway.app/graphql",
        },
    },
};
