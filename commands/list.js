const http = require("http");
const isInteger = require("../is_integer");

const list = (args) => {
  const parsedPage = parseInt(args.page);
  const parsedPageSize = parseInt(args.pageSize);
  if (args.page && !isInteger(parsedPage)) {
    console.log("Invalid page parameter.");
    return;
  }

  if (args.pageSize && !isInteger(parsedPageSize)) {
    console.log("Invalid page size parameter.");
    return;
  }
  const params = new URLSearchParams({
    page: args.page ? parsedPage : 1,
    page_size: args.pageSize ? parsedPageSize : 100,
  });

  const options = {
    hostname: "localhost",
    port: 4000,
    path: "/api?" + params.toString(),
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };

  const req = http.request(options, (res) => {
    let dataResult = "";
    let parsedResult;
    console.log(`statusCode: ${res.statusCode}`);
    res.on("data", (chunk) => {
      dataResult += chunk;
    });

    res.on("end", () => {
      if (res.statusCode === 200) {
        parsedResult = JSON.parse(dataResult);
        console.log(parsedResult);
      } else if (res.statusCode === 404) {
        console.log("404: Not Found.");
      } else if (res.statusCode === 400) {
        console.log("400: Invalid params.");
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
};

module.exports = list;
