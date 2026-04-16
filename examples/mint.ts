import { OP721 } from '../contracts/OP721'

async function main() {
  const nft = new OP721({
    name: 'ExampleNFT',
    symbol: 'EXNFT'
  })

  const tokenId = 1
  const owner = '0x1234567890abcdef1234567890abcdef12345678'

  nft.mint(owner, tokenId)

  console.log('Minted token', tokenId, 'to', owner)
}

main()
