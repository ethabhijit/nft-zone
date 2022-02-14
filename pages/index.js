import axios from "axios";
import { ethers } from "ethers";
import { useEffect, useState } from "react";
import Web3Modal from "web3modal";

import { nftmarketaddress, nftaddress } from "../config";

import NFT from "../artifacts/contracts/NFT.sol/NFT.json";
import Market from "../artifacts/contracts/NFTMarket.sol/NFTMarket.json";

import Card from "../components/Card";
import Grid from "../components/Grid";
import { InfoAlert } from "../components/Alert";
import ProgressBar from "../components/ProgressBar";

export default function Home() {
  const [nfts, setNfts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadNFTs();
  }, []);

  const loadNFTs = async () => {
    setLoading(true);
    // create a generic provider and query for unsold market items
    const provider = new ethers.providers.JsonRpcProvider(
      "https://rpc-mumbai.matic.today"
    );
    const tokenContract = new ethers.Contract(nftaddress, NFT.abi, provider);
    const marketContract = new ethers.Contract(
      nftmarketaddress,
      Market.abi,
      provider
    );
    const data = await marketContract.fetchMarketItems();

    // map over items returned from smart contract and format
    // them as well as fetch their token metadata
    const items = await Promise.all(
      data.map(async (i) => {
        const tokenUri = await tokenContract.tokenURI(i.tokenId);
        const meta = await axios.get(tokenUri);
        let price = ethers.utils.formatUnits(i.price.toString(), "ether");
        let item = {
          price,
          tokenId: i.tokenId.toNumber(),
          seller: i.seller,
          owner: i.owner,
          image: meta.data.image,
          name: meta.data.name,
          description: meta.data.description,
        };
        return item;
      })
    );
    setNfts(items);
    setLoading(false);
  };

  const buyNft = async (nft) => {
    // needs the user to sign the transaction, so will use Web3Provider and sign it
    const web3Model = new Web3Modal();
    const connection = await web3Model.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(nftmarketaddress, Market.abi, signer);

    // user will be prompted to pay the asking proces to complete the transaction
    const price = ethers.utils.parseUnits(nft.price.toString(), "ether");
    const transaction = await contract.createMarketSale(
      nftaddress,
      nft.tokenId,
      {
        value: price,
      }
    );
    await transaction.wait();
    loadNFTs();
  };

  return (
    <div>
      {loading && <ProgressBar />}
      {!nfts.length && !loading && (
        <InfoAlert message="No items found in marketplace" />
      )}

      <Grid>
        {nfts.map((nft, i) => (
          <Card
            key={i}
            title={nft.name}
            description={nft.description}
            image={nft.image}
            price={nft.price}
            isBuy={true}
            nft={nft}
            buyNft={buyNft}
          />
        ))}
      </Grid>
    </div>
  );
}
