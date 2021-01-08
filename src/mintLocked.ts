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
    recipient: "VOVgJ8yrpsYTHxI4ElnQfja49J_bT4urMufJPcfLvmg",
    qty: 625000,
    lockLength: 262800,
    note: "(#3) Private Investor 12-Month Mint Lock",
  },
  {
    recipient: "VOVgJ8yrpsYTHxI4ElnQfja49J_bT4urMufJPcfLvmg",
    qty: 625000,
    lockLength: 394200,
    note: "(#3) Private Investor 18-Month Mint Lock",
  },
  {
    recipient: "VOVgJ8yrpsYTHxI4ElnQfja49J_bT4urMufJPcfLvmg",
    qty: 625000,
    lockLength: 525600,
    note: "(#3) Private Investor 24-Month Mint Lock",
  },
  {
    recipient: "Apba2kQp8U1Rq1K-0YaX0M4POgaC8d0jEGRzIx0vMQQ",
    qty: 260416,
    lockLength: 262800,
    note: "(#4) Private Investor 12-Month Mint Lock",
  },
  {
    recipient: "Apba2kQp8U1Rq1K-0YaX0M4POgaC8d0jEGRzIx0vMQQ",
    qty: 260417,
    lockLength: 394200,
    note: "(#4) Private Investor 18-Month Mint Lock",
  },
  {
    recipient: "Apba2kQp8U1Rq1K-0YaX0M4POgaC8d0jEGRzIx0vMQQ",
    qty: 260417,
    lockLength: 525600,
    note: "(#4) Private Investor 24-Month Mint Lock",
  },
  {
    recipient: "--X7CXQPTIKbyY4hbBLDnjIiEU9R433sI__HO_TPHm4",
    qty: 208333,
    lockLength: 262800,
    note: "(#5) Private Investor 12-Month Mint Lock",
  },
  {
    recipient: "--X7CXQPTIKbyY4hbBLDnjIiEU9R433sI__HO_TPHm4",
    qty: 208333,
    lockLength: 394200,
    note: "(#5) Private Investor 18-Month Mint Lock",
  },
  {
    recipient: "--X7CXQPTIKbyY4hbBLDnjIiEU9R433sI__HO_TPHm4",
    qty: 208334,
    lockLength: 525600,
    note: "(#5) Private Investor 24-Month Mint Lock",
  },
  {
    recipient: "3CbmnFJnY3uwrT6EYh3GoJ0bo-fWfUh9hS6XNQAEavY",
    qty: 729166,
    lockLength: 262800,
    note: "(#6) Private Investor 12-Month Mint Lock",
  },
  {
    recipient: "3CbmnFJnY3uwrT6EYh3GoJ0bo-fWfUh9hS6XNQAEavY",
    qty: 729167,
    lockLength: 394200,
    note: "(#6) Private Investor 18-Month Mint Lock",
  },
  {
    recipient: "3CbmnFJnY3uwrT6EYh3GoJ0bo-fWfUh9hS6XNQAEavY",
    qty: 729167,
    lockLength: 525600,
    note: "(#6) Private Investor 24-Month Mint Lock",
  },
  {
    recipient: "kVTh0bR5pGGwr7Hv3NDp7rC-B14MxqsYWMKTQyJ2RP0",
    qty: 333750,
    lockLength: 262800,
    note: "(#6) Private Investor 12-Month Mint Lock",
  },
  {
    recipient: "kVTh0bR5pGGwr7Hv3NDp7rC-B14MxqsYWMKTQyJ2RP0",
    qty: 333750,
    lockLength: 394200,
    note: "(#6) Private Investor 18-Month Mint Lock",
  },
  {
    recipient: "kVTh0bR5pGGwr7Hv3NDp7rC-B14MxqsYWMKTQyJ2RP0",
    qty: 333750,
    lockLength: 525600,
    note: "(#6) Private Investor 24-Month Mint Lock",
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
