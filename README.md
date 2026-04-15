# OPNET OP721 Reloaded

**Next‑gen NFT standard for OP_NET — ERC‑721 compatible, OP‑20 ready, marketplace‑ready.**

This repo defines **OP721 Reloaded**, a production‑grade NFT standard for the OP_NET ecosystem:

- ✅ ERC‑721‑style interface (`ownerOf`, `balanceOf`, `transferFrom`, `safeTransferFrom`, approvals)
- ✅ Clean, hash‑free ownership model (stores real addresses on‑chain)
- ✅ Designed for OP_NET’s WASM / TypeScript‑like contract language
- ✅ Compatible with OP‑20 tokens and OP721‑based marketplaces
- ✅ Built for indexers, wallets, explorers, and DeFi integrations

## Key goals

- **Fix** the known issues of the original `OP_721` implementation:
  - `ownerOf` returning a hash instead of an address
  - Non‑standard method signatures requiring the caller to pass the owner
- **Provide** a clean, secure, and composable NFT standard for OP_NET
- **Enable** trustless marketplaces, lending, and DeFi on top of OP721 NFTs

## Structure

- `contracts/` — core OP721 implementation and interfaces
- `tests/` — core behavior and transfer tests
- `docs/` — spec, migration, and integration guides

## Status

- Core contract: ✅
- Interfaces: ✅
- Basic tests: ✅
- Docs: ✅ (initial version)

Contributions, audits, and ecosystem integrations are welcome.
