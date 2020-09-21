import Arweave from "arweave";

const arweave = Arweave.init({
  host: "arweave.dev",
  port: 443,
  protocol: "https",
});

export default arweave;
