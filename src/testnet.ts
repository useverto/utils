import ArLocalUtils from "arlocal-utils";
import Arweave from "arweave";
import fs from "fs";
import path from "path";
import { createContract } from "smartweave";
import request from "supertest";

const testnet = new Arweave({
  host: "arweave-testnet.herokuapp.com",
  port: 443,
  protocol: "https",
});
const mainnet = new Arweave({
  host: "arweave.net",
  port: 443,
  protocol: "https",
});

async function copyContracts() {
  const wallet = await mainnet.wallets.generate();
  const address = await mainnet.wallets.getAddress(wallet);

  try {
    const server = "https://arweave-testnet.herokuapp.com:443";
    const route = "/mint/" + address + "/10000000000000";
    const mintRes = await request(server).get(route);

    console.log(await testnet.wallets.getBalance(address));
  } catch (err) {
    console.log(err);
  }
  // save the wallet
  fs.writeFileSync(
    path.join(__dirname, `../arweave-wallet-${address}.json`),
    JSON.stringify(wallet, null, 2)
  );

  const arLocalUtils = new ArLocalUtils(testnet, wallet, mainnet);
  console.log("contract 1 before");
  const communityContract = await arLocalUtils.copyContract(
    "t9T7DIOGxx4VWXoCEeYYarFYeERTpWIC1V3y-BPZgKE",
    true,
    (state) => {
      state.people.push({
        name: "Supreme Leader Control Wallet",
        username: "XxSupremeLeaderxX",
        addresses: [address],
        bio: "Cooler than u",
        links: {},
      });

      return state;
    }
  );
  console.log("contract 1 after");
  console.log(communityContract);

  console.log("contract 2 before");
  const vrt1 = await arLocalUtils.copyContract(
    "usjm4PCxUd5mtaon7zc97-dt-3qf67yPyqgzLnLqk5A",
    true,
    (state) => {
      state.ticker = "MRTN";
      state.name = "Sir Marton's Token";
      return state;
    }
  );
  console.log("contract 2 after");

  console.log("Marton's token", vrt1);

  console.log("contract 3 before");
  const vrt2 = await arLocalUtils.copyContract(
    "usjm4PCxUd5mtaon7zc97-dt-3qf67yPyqgzLnLqk5A",
    true,
    (state) => {
      state.ticker = "T8T";
      state.name = "Sir Tate's Token";
      return state;
    }
  );
  console.log("contract 3 after");

  console.log("Tate's token", vrt2);

  console.log("contract 4 before");
  const vrt3 = await arLocalUtils.copyContract(
    "usjm4PCxUd5mtaon7zc97-dt-3qf67yPyqgzLnLqk5A",
    true,
    (state) => {
      state.ticker = "JOEL";
      state.name = "Codingknite's Token";
      return state;
    }
  );

  console.log("contract 4 after");
  console.log("Joel's token", vrt3);

  const clob_source = new TextDecoder().decode(
    fs.readFileSync(path.join(__dirname, "../assets/clob.js"))
  );
  const CLOB = await createContract(
    testnet,
    wallet,
    clob_source,
    JSON.stringify(
      {
        emergencyHaltWallet: "address",
        halted: false,
        protocolFeePercent: 0.01,
        pairGatekeeper: false,
        communityContract: "communityContract",
        pairs: [
          {
            pair: [vrt1, vrt2],
            orders: [],
          },
          {
            pair: [vrt2, vrt3],
            orders: [],
          },
          {
            pair: [vrt3, vrt1],
            orders: [],
          },
        ],
        invocations: [],
        foreignCalls: [],
      },
      null,
      2
    )
  );

  await testnet.api.get("mine");

  console.log("Clob contract", CLOB);

  // write a file with all the ids
  fs.writeFileSync(
    path.join(__dirname, "../testnet.json"),
    JSON.stringify(
      {
        communityContract,
        vrt1,
        vrt2,
        vrt3,
        CLOB,
      },
      null,
      2
    )
  );
}

copyContracts();
