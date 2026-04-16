// OP721.ts — OP_NET AssemblyScript Contract

@contract
export class OP721 {
  @storage private owners: Map<u64, Address> = new Map()
  @storage private balances: Map<Address, u64> = new Map()
  @storage private tokenApprovals: Map<u64, Address> = new Map()
  @storage private operatorApprovals: Map<Address, Map<Address, bool>> = new Map()
  @storage private tokenURIs: Map<u64, string> = new Map()

  private _name: string
  private _symbol: string

  constructor(name: string, symbol: string) {
    this._name = name
    this._symbol = symbol
  }

  // -----------------------------
  // Metadata
  // -----------------------------

  name(): string {
    return this._name
  }

  symbol(): string {
    return this._symbol
  }

  tokenURI(tokenId: u64): string {
    this._requireMinted(tokenId)
    return this.tokenURIs.get(tokenId) || ""
  }

  // -----------------------------
  // Views
  // -----------------------------

  balanceOf(owner: Address): u64 {
    assert(owner != ZERO_ADDRESS, "ZERO_ADDRESS")
    return this.balances.get(owner) || 0
  }

  ownerOf(tokenId: u64): Address {
    const owner = this.owners.get(tokenId)
    assert(owner != null && owner != ZERO_ADDRESS, "TOKEN_NOT_MINTED")
    return owner!
  }

  // -----------------------------
  // Approvals
  // -----------------------------

  approve(to: Address, tokenId: u64): void {
    const owner = this.ownerOf(tokenId)
    const sender = Context.sender()

    assert(to != owner, "APPROVE_TO_OWNER")
    assert(
      sender == owner || this.isApprovedForAll(owner, sender),
      "NOT_AUTHORIZED"
    )

    this.tokenApprovals.set(tokenId, to)
    emit("Approval", owner, to, tokenId)
  }

  getApproved(tokenId: u64): Address | null {
    this._requireMinted(tokenId)
    return this.tokenApprovals.get(tokenId) || null
  }

  setApprovalForAll(operator: Address, approved: bool): void {
    const owner = Context.sender()
    assert(operator != owner, "APPROVE_SELF")

    let ops = this.operatorApprovals.get(owner)
    if (!ops) {
      ops = new Map()
      this.operatorApprovals.set(owner, ops)
    }

    ops.set(operator, approved)
    emit("ApprovalForAll", owner, operator, approved)
  }

  isApprovedForAll(owner: Address, operator: Address): bool {
    const ops = this.operatorApprovals.get(owner)
    return ops ? (ops.get(operator) || false) : false
  }

  // -----------------------------
  // Transfers
  // -----------------------------

  transferFrom(from: Address, to: Address, tokenId: u64): void {
    const owner = this.ownerOf(tokenId)
    const sender = Context.sender()

    assert(owner == from, "NOT_OWNER")
    assert(to != ZERO_ADDRESS, "ZERO_ADDRESS")
    assert(
      sender == owner ||
      sender == this.getApproved(tokenId) ||
      this.isApprovedForAll(owner, sender),
      "NOT_AUTHORIZED"
    )

    this._clearApproval(tokenId)
    this._decreaseBalance(from)
    this._increaseBalance(to)
    this.owners.set(tokenId, to)

    emit("Transfer", from, to, tokenId)
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

    if (isContract(to)) {
      const result = call<OP721Receiver>(
        to,
        "onOP721Received",
        [Context.sender(), from, tokenId, data]
      )

      assert(result == "OP721_ACCEPTED", "RECEIVER_REJECTED")
    }
  }

  // -----------------------------
  // Mint / Burn
  // -----------------------------

  protected _mint(to: Address, tokenId: u64, uri?: string): void {
    assert(to != ZERO_ADDRESS, "ZERO_ADDRESS")
    assert(!this.owners.get(tokenId), "TOKEN_ALREADY_MINTED")

    this._increaseBalance(to)
    this.owners.set(tokenId, to)

    if (uri) this.tokenURIs.set(tokenId, uri)

    emit("Transfer", ZERO_ADDRESS, to, tokenId)
  }

  protected _burn(tokenId: u64): void {
    const owner = this.ownerOf(tokenId)

    this._clearApproval(tokenId)
    this._decreaseBalance(owner)
    this.owners.delete(tokenId)
    this.tokenURIs.delete(tokenId)

    emit("Transfer", owner, ZERO_ADDRESS, tokenId)
  }

  // -----------------------------
  // Internal helpers
  // -----------------------------

  private _requireMinted(tokenId: u64): void {
    const owner = this.owners.get(tokenId)
    assert(owner != null && owner != ZERO_ADDRESS, "TOKEN_NOT_MINTED")
  }

  private _clearApproval(tokenId: u64): void {
    this.tokenApprovals.delete(tokenId)
  }

  private _increaseBalance(owner: Address): void {
    const prev = this.balances.get(owner) || 0
    this.balances.set(owner, prev + 1)
  }

  private _decreaseBalance(owner: Address): void {
    const prev = this.balances.get(owner) || 0
    assert(prev > 0, "BALANCE_UNDERFLOW")
    this.balances.set(owner, prev - 1)
  }
}
