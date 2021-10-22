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
}[] = [
  // 12 months      ~ 262800
  // 18 months      ~ 394200
  // 24 months      ~ 525600
  {
    recipient: "NDQwbjnrUIWXyOVyc3k_vn6dzF8ZuqZTy8vQbz5vjSY",
    qty: 1041667,
    lockLength: 262800,
  },
  {
    recipient: "NDQwbjnrUIWXyOVyc3k_vn6dzF8ZuqZTy8vQbz5vjSY",
    qty: 1041667,
    lockLength: 394200,
  },
  {
    recipient: "NDQwbjnrUIWXyOVyc3k_vn6dzF8ZuqZTy8vQbz5vjSY",
    qty: 1041666,
    lockLength: 525600,
  },
//
  {
    recipient: "3PGmzyVfx42tLV4WmYRImNt1th6NduZmRpXoHVAYGrw",
    qty: 1041667,
    lockLength: 262800,
  },
  {
    recipient: "3PGmzyVfx42tLV4WmYRImNt1th6NduZmRpXoHVAYGrw",
    qty: 1041667,
    lockLength: 394200,
  },
  {
    recipient: "3PGmzyVfx42tLV4WmYRImNt1th6NduZmRpXoHVAYGrw",
    qty: 1041666,
    lockLength: 525600,
  },
//
  {
    recipient: "t8i_MHAPl-mwDSthhyBAwGWGrI-_foX5SZV_h9f6Vrc",
    qty: 416667,
    lockLength: 262800,
  },
  {
    recipient: "t8i_MHAPl-mwDSthhyBAwGWGrI-_foX5SZV_h9f6Vrc",
    qty: 416667,
    lockLength: 394200,
  },
  {
    recipient: "t8i_MHAPl-mwDSthhyBAwGWGrI-_foX5SZV_h9f6Vrc",
    qty: 416666,
    lockLength: 525600,
  },
  //
  {
    recipient: "DSQfzhOk75tIqafUIEQ0tF0zzeI-BrfjrrS9CfrFet0",
    qty: 416667,
    lockLength: 262800,
  },
  {
    recipient: "DSQfzhOk75tIqafUIEQ0tF0zzeI-BrfjrrS9CfrFet0",
    qty: 416667,
    lockLength: 394200,
  },
  {
    recipient: "DSQfzhOk75tIqafUIEQ0tF0zzeI-BrfjrrS9CfrFet0",
    qty: 416666,
    lockLength: 525600,
  },
    //
    {
      recipient: "IU2B15NYim6lgzQiaKK8Dw2gP_t4HcoqKxEQvdqU5yI",
      qty: 416667,
      lockLength: 262800,
    },
    {
      recipient: "IU2B15NYim6lgzQiaKK8Dw2gP_t4HcoqKxEQvdqU5yI",
      qty: 416667,
      lockLength: 394200,
    },
    {
      recipient: "IU2B15NYim6lgzQiaKK8Dw2gP_t4HcoqKxEQvdqU5yI",
      qty: 416666,
      lockLength: 525600,
    },
  //
  {
    recipient: "to2r4qzI2B5JGGTtFHunyoBbLpG0Ql0YvzlGScvnG5Q",
    qty: 41667,
    lockLength: 262800,
  },
  {
    recipient: "to2r4qzI2B5JGGTtFHunyoBbLpG0Ql0YvzlGScvnG5Q",
    qty: 41667,
    lockLength: 394200,
  },
  {
    recipient: "to2r4qzI2B5JGGTtFHunyoBbLpG0Ql0YvzlGScvnG5Q",
    qty: 41666,
    lockLength: 525600,
  },
    //
    {
      recipient: "to2r4qzI2B5JGGTtFHunyoBbLpG0Ql0YvzlGScvnG5Q",
      qty: 41667,
      lockLength: 262800,
    },
    {
      recipient: "to2r4qzI2B5JGGTtFHunyoBbLpG0Ql0YvzlGScvnG5Q",
      qty: 41667,
      lockLength: 394200,
    },
    {
      recipient: "to2r4qzI2B5JGGTtFHunyoBbLpG0Ql0YvzlGScvnG5Q",
      qty: 41666,
      lockLength: 525600,
    }  
];

async function mintLocked() {
  for (const vote of votes) {
    const txID = await interactWrite(
      client,
      key,
      "usjm4PCxUd5mtaon7zc97-dt-3qf67yPyqgzLnLqk5A",
      {
        function: "transferLocked",
        target: vote.recipient,
        qty: vote.qty,
        lockLength: vote.lockLength,
      }
    );
    console.log(JSON.stringify({
      voteID: txID,
      recipient: vote.recipient,
      lockLength: vote.lockLength
    }));
  }
}

mintLocked();
