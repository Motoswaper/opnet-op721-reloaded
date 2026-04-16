// contracts/OP721.ts

import {
  IOP721,
  Address,
  u64,
} from './interfaces/IOP721'
import { IOP721Metadata } from './interfaces/IOP721Metadata'
import { IOP721Receiver } from './interfaces/IOP721Receiver'
import { isZeroAddress } from './utils/AddressUtils'

export class OP721 implements IOP721, IOP721Metadata {
  private _name: string
  private _symbol: string

  private owners: Map<u64, Address> = new Map()
  private balances: Map<Address, u64> = new Map()
  private tokenApprovals: Map<u64, Address> = new Map()
  private operatorApprovals: Map<Address, Map<Address, boolean>> = new Map()
  private tokenURIs: Map<u64, string> = new Map()

  constructor(name: string, symbol: string) {
    this._name = name
    this._symbol = symbol
  }

  // --- Metadata ---

  name(): string {
    return this._name
  }

  symbol(): string {
    return this._symbol
  }

  tokenURI(tokenId: u64): string {
    this._requireMinted(tokenId)
    const uri = this.tokenURIs.get(tokenId)
    return uri ?? ''
  }

  // --- Core view methods ---

  balanceOf(owner: Address): u64 {
    if (isZeroAddress(owner)) {
      throw new Error('ZERO_ADDRESS')
    }
    return this.balances.get(owner) ?? 0n
  }

  ownerOf(tokenId: u64): Address {
    const owner = this.owners.get(tokenId)
    if (!owner || isZeroAddress(owner)) {
      throw new Error('TOKEN_NOT_MINTED')
    }
    return owner
  }

  // --- Approvals ---

  approve(to: Address, tokenId: u64): void {
    const owner = this.ownerOf(tokenId)
    if (to === owner) {
      throw new Error('APPROVE_TO_OWNER')
    }
    // here you’d check msg.sender / operator in real OP_NET env
    this.tokenApprovals.set(tokenId, to)
    // emit Approval(owner, to, tokenId)
  }

  getApproved(tokenId: u64): Address | null {
    this._requireMinted(tokenId)
    return this.tokenApprovals.get(tokenId) ?? null
  }

  setApprovalForAll(operator: Address, approved: boolean): void {
    if (isZeroAddress(operator)) {
      throw new Error('ZERO_OPERATOR')
    }
    // here you’d use msg.sender as owner
    const owner: Address = '/* msg.sender */'
    let ops = this.operatorApprovals.get(owner)
    if (!ops) {
      ops = new Map()
      this.operatorApprovals.set(owner, ops)
    }
    ops.set(operator, approved)
    // emit ApprovalForAll(owner, operator, approved)
  }

  isApprovedForAll(owner: Address, operator: Address): boolean {
    const ops = this.operatorApprovals.get(owner)
    if (!ops) return false
    return ops.get(operator) ?? false
  }

  // --- Transfers ---

  transferFrom(from: Address, to: Address, tokenId: u64): void {
    const owner = this.ownerOf(tokenId)
    if (owner !== from) {
      throw new Error('NOT_OWNER')
    }
    if (isZeroAddress(to)) {
      throw new Error('ZERO_ADDRESS')
    }
    // here you’d check msg.sender is owner or approved
    this._clearApproval(tokenId)

    this._decreaseBalance(from)
    this._increaseBalance(to)
    this.owners.set(tokenId, to)

    // emit Transfer(from, to, tokenId)
  }

  safeTransferFrom(from: Address, to: Address, tokenId: u64): void {
    this.safeTransferFromWithData(from, to, tokenId, new Uint8Array(0))
  }

  safeTransferFromWithData(
    from: Address,
    to: Address,
    tokenId: u64,
    data: Uint8Array
  ): void {
    this.transferFrom(from, to, tokenId)

    // if `to` is a contract, call onOP721Received
    // pseudo:
    // const receiver = to as unknown as IOP721Receiver
    // const result = receiver.onOP721Received(operator, from, tokenId, data)
    // if (result !== 'OP721_ACCEPTED') throw new Error('RECEIVER_REJECTED')
  }

  // --- Mint / Burn (for creators/admins) ---

  protected _mint(to: Address, tokenId: u64, uri?: string): void {
    if (isZeroAddress(to)) {
      throw new Error('ZERO_ADDRESS')
    }
    if (this.owners.get(tokenId)) {
      throw new Error('TOKEN_ALREADY_MINTED')
    }

    this._increaseBalance(to)
    this.owners.set(tokenId, to)

    if (uri) {
      this.tokenURIs.set(tokenId, uri)
    }

    // emit Transfer(0x0, to, tokenId)
  }

  protected _burn(tokenId: u64): void {
    const owner = this.ownerOf(tokenId)

    this._clearApproval(tokenId)
    this._decreaseBalance(owner)
    this.owners.delete(tokenId)
    this.tokenURIs.delete(tokenId)

    // emit Transfer(owner, 0x0, tokenId)
  }

  // --- Internal helpers ---

  private _requireMinted(tokenId: u64): void {
    const owner = this.owners.get(tokenId)
    if (!owner || isZeroAddress(owner)) {
      throw new Error('TOKEN_NOT_MINTED')
    }
  }

  private _clearApproval(tokenId: u64): void {
    this.tokenApprovals.delete(tokenId)
  }

  private _increaseBalance(owner: Address): void {
    const prev = this.balances.get(owner) ?? 0n
    this.balances.set(owner, prev + 1n)
  }

  private _decreaseBalance(owner: Address): void {
    const prev = this.balances.get(owner) ?? 0n
    if (prev === 0n) {
      throw new Error('BALANCE_UNDERFLOW')
    }
    this.balances.set(owner, prev - 1n)
  }
}
