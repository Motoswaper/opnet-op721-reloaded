// contracts/interfaces/IOP721Receiver.ts

import { Address, u64 } from './IOP721'

export interface IOP721Receiver {
  onOP721Received(
    operator: Address,
    from: Address,
    tokenId: u64,
    data: Uint8Array
  ): string // must return "OP721_ACCEPTED"
}
