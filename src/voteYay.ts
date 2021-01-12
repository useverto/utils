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

async function voteYay() {
  for (let vote = 38; vote <= 52; vote++) {
    const txID = await interactWrite(
      client,
      jwk,
      "usjm4PCxUd5mtaon7zc97-dt-3qf67yPyqgzLnLqk5A",
      {
        function: "vote",
        id: vote,
        cast: "yay",
      }
    );
    console.log(`Vote ${vote}: ${txID}`);
  }
}

voteYay();
