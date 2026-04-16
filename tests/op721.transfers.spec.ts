import { OP721 } from '../contracts/OP721'

describe('OP721 — Transfers', () => {
  it('transfers ownership', () => {
    const nft = new OP721('TestNFT', 'TNFT')

    nft['_mint']('0xAAAA', 1n)
    nft.transferFrom('0xAAAA', '0xBBBB', 1n)

    expect(nft.ownerOf(1n)).toBe('0xBBBB')
  })

  it('updates balances on transfer', () => {
    const nft = new OP721('TestNFT', 'TNFT')

    nft['_mint']('0xAAAA', 1n)
    nft.transferFrom('0xAAAA', '0xBBBB', 1n)

    expect(nft.balanceOf('0xAAAA')).toBe(0n)
    expect(nft.balanceOf('0xBBBB')).toBe(1n)
  })

  it('rejects transfer from wrong owner', () => {
    const nft = new OP721('TestNFT', 'TNFT')

    nft['_mint']('0xAAAA', 1n)

    expect(() =>
      nft.transferFrom('0xBBBB', '0xCCCC', 1n)
    ).toThrow()
  })
})
