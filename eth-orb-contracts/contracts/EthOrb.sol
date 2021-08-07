// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "./@openzeppelin/contracts/utils/Counters.sol";
import "./@openzeppelin/contracts/access/Ownable.sol";
import "./@openzeppelin/contracts/utils/Strings.sol";

contract EthOrb is ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    constructor() ERC721("Tales From The Stop", "ECZ") {}


    function concatenate(string memory s1, string memory s2, string memory s3) public pure returns (string memory) {
        return string(abi.encodePacked(s1, s2, s3));
    }

    function totalSupply() public view returns (uint256) {
        return _tokenIds.current();
    }

    //for opensea
    function contractURI() public pure returns (string memory) {
        return "https://ipfs.io/ipfs/QmWLKVDtGD4KCbjjxgNBPBjo28aGG3auivdcgApS9XmMXh/";
    }

    function mintItem(address player, string memory tokenURI)
        public
        onlyOwner
        returns (uint256)
    {
        _tokenIds.increment();

        uint256 newItemId = _tokenIds.current();
        _mint(player, newItemId);
        _setTokenURI(newItemId, tokenURI);
        return newItemId;
    }


}
