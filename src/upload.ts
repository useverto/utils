import Arweave from "arweave";
import { readFileSync } from "fs";
import { join } from "path";

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

const data = readFileSync(join(__dirname, "../assets/test.pdf"));

async function upload() {
  console.log("here");
  const transaction = await client.createTransaction({ data }, jwk);
  transaction.addTag("Content-Type", "application/pdf");
  await client.transactions.sign(transaction, jwk);
  const uploader = await client.transactions.getUploader(transaction);
  while (!uploader.isComplete) {
    await uploader.uploadChunk();
    console.log(
      `${uploader.pctComplete} % complete, ${uploader.uploadedChunks} / ${uploader.totalChunks}`
    );
  }
}

upload();
