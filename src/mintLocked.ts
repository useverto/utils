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
  // Mar 29th, 2021 - 654719
  // May 03rd, 2021 - 678484
  // Difference     = 23765

  // 12 months      ~ 262800
  // 18 months      ~ 394200
  // 24 months      ~ 525600

  {
    recipient: "VlpcjrQ8mirGC-gsnkYbSscYY-sFkLxkRhjPrbdDfyU",
    qty: 725694,
    lockLength: 239035,
    note: "(#2) Strategic Partner 12-Month Mint Lock",
  },
  {
    recipient: "VlpcjrQ8mirGC-gsnkYbSscYY-sFkLxkRhjPrbdDfyU",
    qty: 725694,
    lockLength: 370435,
    note: "(#2) Strategic Partner 18-Month Mint Lock",
  },
  {
    recipient: "VlpcjrQ8mirGC-gsnkYbSscYY-sFkLxkRhjPrbdDfyU",
    qty: 725695,
    lockLength: 501835,
    note: "(#2) Strategic Partner 24-Month Mint Lock",
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
