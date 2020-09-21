import arweave from "./utils/client";
import { writeFileSync } from "fs";
import { join } from "path";

arweave.wallets.generate().then((key) => {
  console.log("Generated key:\n", key);
  writeFileSync(join(__dirname, "../assets/keyfile.json"), JSON.stringify(key));
  console.log('Written file into "keyfile.json"');
});
