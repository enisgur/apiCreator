const fs = require("fs");
const pathLib = require("path");



const sslCredentials = () => {
// NEWWW SSSLLL
let privateKey =  fs.readFileSync(
	pathLib.join(
	  "/",
	  "etc",
	  "letsencrypt",
	  "live",
	  "dlcserver.xyz",
	  "privkey.pem"
	),
	"utf8"
      );
      let certificate =  fs.readFileSync(
	pathLib.join(
	  "/",
	  "etc",
	  "letsencrypt",
	  "live",
	  "dlcserver.xyz",
	  "fullchain.pem"
	),
	"utf8"
      );
      
      const credentials = { key: privateKey, cert: certificate };

      return credentials;



}

module.exports = sslCredentials;