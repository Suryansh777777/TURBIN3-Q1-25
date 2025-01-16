import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import {
  createSignerFromKeypair,
  signerIdentity,
  generateSigner,
  percentAmount,
} from "@metaplex-foundation/umi";
import {
  createNft,
  mplTokenMetadata,
} from "@metaplex-foundation/mpl-token-metadata";

import wallet from "../turbine3-wallet.json";
import base58 from "bs58";

const RPC_ENDPOINT = "https://api.devnet.solana.com";
const umi = createUmi(RPC_ENDPOINT);

let keypair = umi.eddsa.createKeypairFromSecretKey(new Uint8Array(wallet));
const myKeypairSigner = createSignerFromKeypair(umi, keypair);
umi.use(signerIdentity(myKeypairSigner));
umi.use(mplTokenMetadata());

const mint = generateSigner(umi);

(async () => {
  let tx = await createNft(umi, {
    mint,
    name: "PurpleRug",
    symbol: "PR",
    uri: " https://devnet.irys.xyz/Dz1wSrgrDkrppk1MdrJfecDepw7BLg9trCSKda5aQMrV",
    sellerFeeBasisPoints: percentAmount(40),
    isMutable: false,
    collection: null,
  });
  let result = await tx.sendAndConfirm(umi);
  const signature = base58.encode(result.signature);

  console.log(
    `Succesfully Minted! Check out your TX here:\nhttps://explorer.solana.com/tx/${signature}?cluster=devnet`
  );

  console.log("Mint Address: ", mint.publicKey);
})();
// Succesfully Minted! Check out your TX here:
// https://explorer.solana.com/tx/2G5d5UqKRGpvvukKPDEf9YSvwXhjUWHAS3inmVtugqMpbuKs45AqaqeLGHXaPnBHov2Y65xPzcX1RAMmJ171sDi1?cluster=devnet
// Mint Address:  38NE2n6D64foTAhqLxzGhUEgfhEWFCMeA2e1SsEBdaik
// Mint TX: https://explorer.solana.com/address/38NE2n6D64foTAhqLxzGhUEgfhEWFCMeA2e1SsEBdaik?cluster=devnet
