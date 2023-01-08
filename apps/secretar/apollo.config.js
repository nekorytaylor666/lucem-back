module.exports = {
    client: {
        includes: [__dirname + "/src/api/**"],
        service: {
            name: "Lucem",
            url: "https://api.pulse.org.kg/graphql",
        },
    },
};
