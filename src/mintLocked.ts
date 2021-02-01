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
    recipient: "h1ubFR8QUumVdTGtZ4spwqolmJUq1dsWVDWsS0Dsyw0",
    qty: 104166,
    lockLength: 262800,
    note: "(#8) Private Investor 12-Month Mint Lock",
  },
  {
    recipient: "h1ubFR8QUumVdTGtZ4spwqolmJUq1dsWVDWsS0Dsyw0",
    qty: 104167,
    lockLength: 394200,
    note: "(#8) Private Investor 18-Month Mint Lock",
  },
  {
    recipient: "h1ubFR8QUumVdTGtZ4spwqolmJUq1dsWVDWsS0Dsyw0",
    qty: 104167,
    lockLength: 525600,
    note: "(#8) Private Investor 24-Month Mint Lock",
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
