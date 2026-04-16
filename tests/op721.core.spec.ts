import { OP721 } from '../contracts/OP721'

describe('OP721 — Core', () => {
  it('mints and stores owner correctly', () => {
    const nft = new OP721('TestNFT', 'TNFT')

    nft['_mint']('0x1111', 1n)

    const owner = nft.ownerOf(1n)
    expect(owner).toBe('0x1111')
  })

  it('tracks balances correctly', () => {
    const nft = new OP721('TestNFT', 'TNFT')

    nft['_mint']('0x2222', 10n)
    nft['_mint']('0x2222', 11n)

    const bal = nft.balanceOf('0x2222')
    expect(bal).toBe(2n)
  })

  it('throws on querying non‑minted token', () => {
    const nft = new OP721('TestNFT', 'TNFT')

    expect(() => nft.ownerOf(999n)).toThrow()
  })
})
