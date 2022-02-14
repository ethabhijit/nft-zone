import SVG from "../public/matic.svg";

const Card = ({ title, description, image, price, isBuy, buyNft, nft }) => {
  return (
    <div className="border border-gray-800 shadow rounded overflow-hidden md:w-64">
      <img src={image} className="w-full border-b border-gray-800" />
      <div className="p-3 w-full bg-gray-800">
        <p className="text-xl font-semibold text-gray-300">{title}</p>
        <div className="w-full">
          <p className="text-gray-400">{description}</p>
        </div>
      </div>
      <div className="p-3 bg-gray-800">
        <p className="text-2xl mb-4 font-bold text-white flex items-center">
          <SVG />
          {price}
        </p>
        {isBuy && (
          <button
            className="w-full bg-blue-500 text-white font-bold py-2 px-12 rounded transition ease-in-out hover:bg-blue-400 hover:scale-105 duration-300"
            onClick={() => buyNft(nft)}
          >
            Buy
          </button>
        )}
      </div>
    </div>
  );
};

export default Card;
