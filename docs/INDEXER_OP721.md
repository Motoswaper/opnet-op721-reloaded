# OP721 Indexer Schema

## Events

### Transfer(from: Address, to: Address, tokenId: u64)

### Approval(owner: Address, approved: Address, tokenId: u64)

### ApprovalForAll(owner: Address, operator: Address, approved: bool)

---

## Suggested tables

### tokens

- `tokenId: u64`
- `owner: Address`
- `mintedAtBlock: u64`
- `mintedAtTx: string`

### transfers

- `id: string`
- `blockNumber: u64`
- `txHash: string`
- `from: Address`
- `to: Address`
- `tokenId: u64`
- `timestamp: u64`

### approvals

- `id: string`
- `blockNumber: u64`
- `txHash: string`
- `owner: Address`
- `approved: Address`
- `tokenId: u64`
- `timestamp: u64`

### operators

- `owner: Address`
- `operator: Address`
- `approved: bool`
