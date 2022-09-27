const http = require("http");
const isInteger = require("../is_integer");

function favorite(args) {
  const parsedNumber = parseInt(args.number);

  if (args.number && !isInteger(parsedNumber)) {
    console.log("Invalid parameter.");
    return;
  }
  const postData = JSON.stringify({
    favorite: { number: args.number },
  });

  const options = {
    hostname: "localhost",
    port: 4000,
    path: "/api/favorites",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Content-Length": postData.length,
    },
  };

  const req = http.request(options, (res) => {
    let dataResult = "";
    let parsedResult;
    res.on("data", (chunk) => {
      dataResult += chunk;
    });

    res.on("end", () => {
      if (res.statusCode === 201) {
        parsedResult = JSON.parse(dataResult);
        console.log("201: Number favored successfully.");
        console.log(parsedResult);
      } else if (res.statusCode === 400) {
        console.log("400: Invalid params.");
      } else if (res.statusCode === 422) {
        console.log(
          "422: Unprocessable. Perhaps this number has already been favored?"
        );
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
  req.write(postData);
  req.end();
}
module.exports = favorite;
