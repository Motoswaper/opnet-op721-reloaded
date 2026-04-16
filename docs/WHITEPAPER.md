# OP721 Reloaded — Whitepaper  
### Next‑Generation NFT Standard for OP_NET

## 1. Introduction
OP721 Reloaded is the evolution of the original OP_721 NFT standard.  
It fixes critical design flaws, restores ERC‑721 compatibility, and enables trustless NFT commerce across the OP_NET ecosystem.

The goal is simple:

- A clean, modern, secure NFT standard  
- Fully compatible with OP_NET’s WASM contract model  
- Fully compatible with OP‑20 tokens  
- Fully compatible with OP721 Marketplace  
- Fully indexer‑friendly  
- Fully wallet‑friendly  

OP721 Reloaded is the foundation for the next generation of OP_NET NFTs.

---

## 2. Problems with the Original OP_721
The original OP_721 implementation introduced two major issues:

### 2.1 ownerOf returns a hash
This breaks:
- Wallets  
- Indexers  
- Marketplaces  
- Metadata services  
- Any ERC‑721 integration  

### 2.2 Non‑standard method signatures
Some methods require the caller to pass the owner address manually.

This breaks:
- ERC‑721 compatibility  
- Security assumptions  
- Marketplace logic  
- Transfer validation  

---

## 3. OP721 Reloaded — Design Goals
- Full ERC‑721 compatibility  
- Direct address storage (no hashing)  
- Standard transfer semantics  
- Safe transfer support  
- Approval system  
- Operator approvals  
- Metadata support  
- Receiver interface  
- Indexer‑friendly events  
- OP‑20 payment compatibility  

---

## 4. Storage Model
```
owners: Map<u64, Address>
balances: Map<Address, u64>
tokenApprovals: Map<u64, Address>
operatorApprovals: Map<Address, Map<Address, bool>>
tokenURIs: Map<u64, string>
```

---

## 5. Events
- Transfer  
- Approval  
- ApprovalForAll  

These events follow ERC‑721 semantics for maximum compatibility.

---

## 6. Safe Transfers
Contracts receiving NFTs must implement:

```
onOP721Received(operator, from, tokenId, data)
```

Returning:

```
OP721_ACCEPTED
```

---

## 7. Compatibility
OP721 Reloaded is compatible with:

- OP721 Marketplace  
- OP‑20 tokens  
- MotoSettle (escrow)  
- MotoSwap (routing)  
- TrustLayer (reputation)  
- Indexers  
- Wallets  
- Explorers  

---

## 8. Security Model
- Reentrancy protection  
- Strict ownership checks  
- Safe transfer enforcement  
- Approval validation  
- Overflow/underflow safety  
- Deterministic WASM execution  

---

## 9. Migration Path
See `docs/MIGRATION.md`.

---

## 10. Conclusion
OP721 Reloaded is the official next‑generation NFT standard for OP_NET.  
It is secure, compatible, modern, and ready for large‑scale adoption.
