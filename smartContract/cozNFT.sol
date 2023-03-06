// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";

//다음 컨트랙트를 배포한  트랜잭션 해시 : 0x1f8ad8ac3ba1166840824a2e0803a7da219b596d62a72f3790165021e854dc7a
//컨트랙트 배포 이더스캔 : URL : https://goerli.etherscan.io/tx/0x1f8ad8ac3ba1166840824a2e0803a7da219b596d62a72f3790165021e854dc7a

//NFT 민트 트랜잭션 해시: 0x3b80e0bb90d6cc4366242ba62304b40f36e264ddd46df1881d9b405131d3c41f  
//NFT 민트 이더스캔 URL : https://goerli.etherscan.io/tx/0x3b80e0bb90d6cc4366242ba62304b40f36e264ddd46df1881d9b405131d3c41f

contract cozNFTs is ERC721URIStorage, Ownable, ERC721Enumerable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    constructor() public ERC721("cozNFT", "NFT"){}

    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 tokenId,
        uint256 batchSize
    ) internal  override(ERC721, ERC721Enumerable)
    {
        super._beforeTokenTransfer(from, to, tokenId,batchSize);
    }

    function _burn(
        uint256 tokenId
    ) internal
      override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721Enumerable)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }

    function tokenURI(
        uint256 tokenId
    ) public view
      override(ERC721, ERC721URIStorage) returns (string memory) {
        return super.tokenURI(tokenId);
    }

    function mintNFT(address recipient, string memory tokenURI) public onlyOwner returns (uint256) {
        _tokenIds.increment();

        uint256 newItemId = _tokenIds.current();
        _mint(recipient, newItemId);
        _setTokenURI(newItemId, tokenURI);

        return newItemId;
    }
}