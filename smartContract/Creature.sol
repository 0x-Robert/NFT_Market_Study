// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

//이 스마트 컨트랙트는 ERC721Tradable.sol 파일을 가져와서 상속하고 있습니다. ERC721Tradable은 OpenZeppelin에서 제공하는 라이브러리로, ERC721 토큰 표준을 준수하는 토큰(즉, 비휘발성 토큰)을 생성하고 거래가 가능하도록 해주는 기능을 제공합니다.
import "./ERC721Tradable.sol";

/**
 * @title Creature
 * Creature - a contract for my non-fungible creatures.
 */
contract Creature is ERC721Tradable {
    //Creature 스마트 컨트랙트는 이 ERC721Tradable 라이브러리를 사용하여,
    // "Creature"라는 이름의 새로운 ERC721 토큰을 만듭니다. 이 토큰의 심볼은 "OSC"이며, 생성된 토큰은 OpenSea에서 거래되도록 설계되어 있습니다.
    constructor(address _proxyRegistryAddress)
        ERC721Tradable("Creature", "OSC", _proxyRegistryAddress)
    {}

    //새로운 토큰의 기본 URI 주소를 반환하는 함수입니다. 이 URI 주소는 OpenSea에서 생성된 Creature 토큰에 대한 정보를 제공합니다.
    function baseTokenURI() override public pure returns (string memory) {
        return "https://creatures-api.opensea.io/api/creature/";
    }

     //contractURI 함수는 컨트랙트 자체의 URI 주소를 반환하는 함수입니다. 이 URI 주소는 Creature 토큰의 정보를 포함한 전체 컨트랙트 정보를 제공합니다.
    function contractURI() public pure returns (string memory) {
        return "https://creatures-api.opensea.io/contract/opensea-creatures";
    }
}