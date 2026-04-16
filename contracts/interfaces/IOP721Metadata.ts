// contracts/interfaces/IOP721Metadata.ts

import { Address, u64 } from './IOP721'

export interface IOP721Metadata {
  name(): string
  symbol(): string
  tokenURI(tokenId: u64): string
}
