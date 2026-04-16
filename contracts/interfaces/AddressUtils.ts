// contracts/utils/AddressUtils.ts

import { Address } from '../interfaces/IOP721'

export function isZeroAddress(addr: Address): boolean {
  return addr === '0x0000000000000000000000000000000000000000'
}
