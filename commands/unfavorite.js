const http = require("http");
const isInteger = require("../is_integer");

function unfavorite(args) {
  const parsedNumber = parseInt(args.number);

  if (args.number && !isInteger(parsedNumber)) {
    console.log("Invalid parameter.");
    return;
  }

  const options = {
    hostname: "localhost",
    port: 4000,
    path: "/api/favorites/" + parsedNumber,
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  };

  const req = http.request(options, (res) => {
    let dataResult = "";
    res.on("data", (chunk) => {
      dataResult += chunk;
    });

    res.on("end", () => {
      if (res.statusCode === 204) {
        console.log("204: Number unfavored successfully.");
      } else if (res.statusCode === 404) {
        console.log("404: This number was not found as a favorite.");
      } else {
        console.log("Something wrong happened.");
      }
    });
  });

  req.on("error", (error) => {
    if (error.code === "ECONNREFUSED") {
      console.log("Connection to the app was refused. Is the app running?");
    } else {
      console.log("Couldn't connect to the app for an unknown reason.");
    }
  });
  req.end();
}
module.exports = unfavorite;
