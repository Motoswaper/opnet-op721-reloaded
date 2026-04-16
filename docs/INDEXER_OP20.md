# OP20 Indexer Schema

## Events

### Transfer(from: Address, to: Address, amount: u64)

### Approval(owner: Address, spender: Address, amount: u64)

---

## Suggested tables

### balances

- `owner: Address`
- `balance: u64`

### transfers

- `id: string`
- `blockNumber: u64`
- `txHash: string`
- `from: Address`
- `to: Address`
- `amount: u64`
- `timestamp: u64`

### approvals

- `id: string`
- `blockNumber: u64`
- `txHash: string`
- `owner: Address`
- `spender: Address`
- `amount: u64`
- `timestamp: u64`
