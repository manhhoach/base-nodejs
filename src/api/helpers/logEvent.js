const fs = require("fs").promises;
const path = require("path");
const { format } = require("date-fns");

const fileName = path.join(__dirname, "../logs", "logs.log");

module.exports.logEvent = async (msg) => {
  let dateTime = `${format(new Date(), "dd-MM-yyyy\thh:mm:ss")}`;
  let content = `${dateTime}: ${msg}\n`;
  try {
    fs.appendFile(fileName, content);
  } catch (err) {
    console.log(err);
  }
};
