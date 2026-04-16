// OP20.ts — OP_NET AssemblyScript Fungible Token Standard (OP20 Reloaded)

@contract
export class OP20 {
  // -----------------------------
  // Storage (final layout — do not reorder)
  // -----------------------------
  @storage private balances: Map<Address, u64> = new Map()
  @storage private allowances: Map<Address, Map<Address, u64>> = new Map()
  @storage private _totalSupply: u64 = 0

  // Reserved storage for future extensions (do not repurpose)
  @storage private _reserved1: Map<string, string> = new Map()
  @storage private _reserved2: Map<string, string> = new Map()

  private _name: string
  private _symbol: string
  private _decimals: u8

  constructor(
    name: string,
    symbol: string,
    decimals: u8,
    initialOwner: Address,
    initialSupply: u64
  ) {
    this._name = name
    this._symbol = symbol
    this._decimals = decimals

    if (initialSupply > 0) {
      assert(initialOwner != ZERO_ADDRESS, "ZERO_ADDRESS")
      this._mint(initialOwner, initialSupply)
    }
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

  decimals(): u8 {
    return this._decimals
  }

  totalSupply(): u64 {
    return this._totalSupply
  }

  // -----------------------------
  // Views
  // -----------------------------

  balanceOf(owner: Address): u64 {
    assert(owner != ZERO_ADDRESS, "ZERO_ADDRESS")
    return this.balances.get(owner) || 0
  }

  allowance(owner: Address, spender: Address): u64 {
    assert(owner != ZERO_ADDRESS, "ZERO_ADDRESS")
    assert(spender != ZERO_ADDRESS, "ZERO_ADDRESS")

    const inner = this.allowances.get(owner)
    return inner ? (inner.get(spender) || 0) : 0
  }

  // -----------------------------
  // Core transfers
  // -----------------------------

  transfer(to: Address, amount: u64): bool {
    const sender = Context.sender()
    this._transfer(sender, to, amount)
    return true
  }

  transferFrom(from: Address, to: Address, amount: u64): bool {
    const spender = Context.sender()

    const currentAllowance = this.allowance(from, spender)
    assert(currentAllowance >= amount, "INSUFFICIENT_ALLOWANCE")

    // BEFORE STATE CHANGES
    this._beforeTokenTransfer(from, to, amount)

    this._decreaseBalance(from, amount)
    this._increaseBalance(to, amount)

    this._updateAllowance(from, spender, currentAllowance - amount)

    // AFTER STATE CHANGES
    this._afterTokenTransfer(from, to, amount)

    emit("Transfer", from, to, amount)
    return true
  }

  // -----------------------------
  // Approvals
  // -----------------------------

  approve(spender: Address, amount: u64): bool {
    const owner = Context.sender()
    assert(owner != ZERO_ADDRESS, "ZERO_ADDRESS")
    assert(spender != ZERO_ADDRESS, "ZERO_ADDRESS")

    this._setAllowance(owner, spender, amount)
    emit("Approval", owner, spender, amount)
    return true
  }

  // -----------------------------
  // Internal transfer logic
  // -----------------------------

  private _transfer(from: Address, to: Address, amount: u64): void {
    assert(from != ZERO_ADDRESS, "ZERO_ADDRESS")
    assert(to != ZERO_ADDRESS, "ZERO_ADDRESS")
    assert(amount > 0, "ZERO_AMOUNT")

    // BEFORE STATE CHANGES
    this._beforeTokenTransfer(from, to, amount)

    this._decreaseBalance(from, amount)
    this._increaseBalance(to, amount)

    // AFTER STATE CHANGES
    this._afterTokenTransfer(from, to, amount)

    emit("Transfer", from, to, amount)
  }

  // -----------------------------
  // Mint / Burn (internal, for extensions)
  // -----------------------------

  protected _mint(to: Address, amount: u64): void {
    assert(to != ZERO_ADDRESS, "ZERO_ADDRESS")
    assert(amount > 0, "ZERO_AMOUNT")

    // BEFORE STATE CHANGES
    this._beforeTokenTransfer(ZERO_ADDRESS, to, amount)

    this._totalSupply += amount
    this._increaseBalance(to, amount)

    // AFTER STATE CHANGES
    this._afterTokenTransfer(ZERO_ADDRESS, to, amount)

    emit("Transfer", ZERO_ADDRESS, to, amount)
  }

  protected _burn(from: Address, amount: u64): void {
    assert(from != ZERO_ADDRESS, "ZERO_ADDRESS")
    assert(amount > 0, "ZERO_AMOUNT")

    // BEFORE STATE CHANGES
    this._beforeTokenTransfer(from, ZERO_ADDRESS, amount)

    this._decreaseBalance(from, amount)
    this._totalSupply -= amount

    // AFTER STATE CHANGES
    this._afterTokenTransfer(from, ZERO_ADDRESS, amount)

    emit("Transfer", from, ZERO_ADDRESS, amount)
  }

  // -----------------------------
  // Internal helpers
  // -----------------------------

  private _increaseBalance(owner: Address, amount: u64): void {
    const prev = this.balances.get(owner) || 0
    this.balances.set(owner, prev + amount)
  }

  private _decreaseBalance(owner: Address, amount: u64): void {
    const prev = this.balances.get(owner) || 0
    assert(prev >= amount, "INSUFFICIENT_BALANCE")
    this.balances.set(owner, prev - amount)
  }

  private _setAllowance(owner: Address, spender: Address, amount: u64): void {
    let inner = this.allowances.get(owner)
    if (!inner) {
      inner = new Map<Address, u64>()
      this.allowances.set(owner, inner)
    }
    inner.set(spender, amount)
  }

  private _updateAllowance(owner: Address, spender: Address, newAmount: u64): void {
    let inner = this.allowances.get(owner)
    assert(inner != null, "NO_ALLOWANCE_ENTRY")
    inner!.set(spender, newAmount)
  }

  // -----------------------------
  // Extension hooks (future overrides)
  // -----------------------------

  protected _beforeTokenTransfer(from: Address, to: Address, amount: u64): void {
    // intentionally empty
  }

  protected _afterTokenTransfer(from: Address, to: Address, amount: u64): void {
    // intentionally empty
  }
}
