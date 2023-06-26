module.exports = {
    client: {
        includes: [__dirname + "/src/api/**"],
        service: {
            name: "Lucem",
            url: "http://lucem-back-production-08e3.up.railway.app/graphql",
        },
    },
};
