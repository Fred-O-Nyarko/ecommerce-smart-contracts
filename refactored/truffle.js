module.exports = {
  migrations_directory: "./src/smc/migrations",
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*", // Match any network id
    },
  },
  compiler: {
    solc: {
      // version: "^0.4.17",
    },
  },
};