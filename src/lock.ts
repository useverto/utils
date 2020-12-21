import Community from "community-js";
import arweave from "./utils/client";

import { contractID } from "./balance";
import { readFileSync } from "fs";
import { join } from "path";

const community: Community = new Community(arweave);
const key = JSON.parse(
  new TextDecoder().decode(
    readFileSync(join(__dirname, "../assets/keyfile.json"))
  )
);

async function initialize() {
  await community.setCommunityTx(contractID);
  await community.setWallet(key);
}

async function vote() {
  await initialize();
  let lockTX = await community.lockBalance(25000000, 129600);
  console.log(lockTX);
}

vote();