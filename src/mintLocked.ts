import Arweave from "arweave";
import { readFileSync } from "fs";
import { join } from "path";
import { interactWrite } from "smartweave";

const client = new Arweave({
  host: "arweave.net",
  port: 443,
  protocol: "https",
});

const key = JSON.parse(
  new TextDecoder().decode(
    readFileSync(join(__dirname, "../assets/keyfile.json"))
  )
);

const votes: {
  recipient: string;
  qty: number;
  lockLength: number;
  note: string;
}[] = [
  {
    recipient: "jM402DHNU1y0GJ53BNh3n6Osk_1iEljGNHLRuUbedE0",
    qty: 75000,
    lockLength: 131400,
    note: "(#1) Strategic Partner 6-Month Mint Lock",
  },
  {
    recipient: "jM402DHNU1y0GJ53BNh3n6Osk_1iEljGNHLRuUbedE0",
    qty: 75000,
    lockLength: 262800,
    note: "(#1) Strategic Partner 12-Month Mint Lock",
  },
  {
    recipient: "jM402DHNU1y0GJ53BNh3n6Osk_1iEljGNHLRuUbedE0",
    qty: 75000,
    lockLength: 394200,
    note: "(#1) Strategic Partner 18-Month Mint Lock",
  },
  {
    recipient: "jM402DHNU1y0GJ53BNh3n6Osk_1iEljGNHLRuUbedE0",
    qty: 75000,
    lockLength: 525600,
    note: "(#1) Strategic Partner 24-Month Mint Lock",
  },

  // Sep 10th, 2020 - 524420
  // Mar 13th, 2021 - 643836
  // Difference     = 119416
  // 1 Year         ~ 262800
  {
    recipient: "WNeEQzI24ZKWslZkQT573JZ8bhatwDVx6XVDrrGbUyk",
    qty: 2500000,
    lockLength: 143384,
    note: "(#1) Private Trading Post Incentive Agreement",
  },
];

async function mintLocked() {
  for (const vote of votes) {
    const txID = await interactWrite(
      client,
      key,
      "usjm4PCxUd5mtaon7zc97-dt-3qf67yPyqgzLnLqk5A",
      {
        function: "propose",
        type: "mintLocked",
        recipient: vote.recipient,
        qty: vote.qty,
        lockLength: vote.lockLength,
        note: vote.note,
      }
    );
    console.log(vote.note, "\n", txID);
  }
}

mintLocked();
