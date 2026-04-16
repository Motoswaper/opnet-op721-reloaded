# OP721 Reloaded — Metadata Standard

## Overview
OP721 Reloaded includes a metadata extension similar to ERC‑721 Metadata.

## Required Methods
```
name(): string
symbol(): string
tokenURI(tokenId: u64): string
```

## Token URI Format
The `tokenURI` must return a URL or IPFS link pointing to a JSON file.

Example JSON:

```
{
  "name": "My NFT #1",
  "description": "An OP721 Reloaded NFT",
  "image": "ipfs://Qm...",
  "attributes": [
    { "trait_type": "Level", "value": 5 },
    { "trait_type": "Rarity", "value": "Epic" }
  ]
}
```

## Indexer Requirements
Indexers must:
- Cache tokenURI results  
- Fetch metadata JSON  
- Store attributes  
- Expose metadata in API responses  
