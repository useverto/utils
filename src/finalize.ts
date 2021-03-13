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

async function finalize(id: number) {
  const txID = await interactWrite(
    client,
    jwk,
    "usjm4PCxUd5mtaon7zc97-dt-3qf67yPyqgzLnLqk5A",
    {
      function: "finalize",
      id,
    }
  );
  console.log(`Vote ${id}: ${txID}`);
}

console.log("\nFinalizing ...\n");
finalize(62);
finalize(63);
finalize(64);
finalize(65);
finalize(66);
