import Arweave from "arweave";
import { readFileSync } from "fs";
import { join } from "path";
import { interactWrite } from "smartweave";

const client = new Arweave({
  host: "arweave.net",
  port: 443,
  protocol: "https",
});

const jwk = JSON.parse(
  new TextDecoder().decode(
    readFileSync(join(__dirname, "../assets/keyfile.json"))
  )
);

const numberPerUnlock = 937500;
const lengths = [
  131400, // 6 months
  262800, // 12 months
  394200, // 18 months
  525600, // 24 months
  657000, // 30 months
  788400, // 36 months
  919800, // 42 months
  1051200, // 48 months
];

async function lock() {
  for (const length of lengths) {
    const txID = await interactWrite(
      client,
      jwk,
      "usjm4PCxUd5mtaon7zc97-dt-3qf67yPyqgzLnLqk5A",
      {
        function: "lock",
        qty: numberPerUnlock,
        lockLength: length,
      }
    );
    console.log(
      `Locked ${numberPerUnlock} VRT tokens for ${length} blocks.\n\ttxID = ${txID}`
    );
  }
}

lock();
