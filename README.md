# OP_NET Standards — OP721 Reloaded & OP20 Reloaded

This repository contains the canonical token standards for OP_NET:

- **OP721 Reloaded** — Non‑fungible token (NFT) standard
- **OP20 Reloaded** — Fungible token standard

Both are:

- deterministic
- minimal and opinionated
- AssemblyScript‑based for the OP_NET VM
- designed for indexers, DEXes, and marketplaces

---

## Contracts

Located in `./contracts`:

- `OP721.ts` — OP721 Reloaded NFT standard
- `OP20.ts` — OP20 Reloaded fungible token standard

Each contract exposes a stable public interface and frozen storage layout suitable for long‑term use.

---

## Documentation

Located in `./docs`:

- `OP721.md` — OP721 interface, events, and behavior
- `OP20.md` — OP20 interface, events, and behavior

These documents define the expected external behavior for integrators (wallets, explorers, DEXes, marketplaces).

---

## License

This repository is intended as a public good for the OP_NET ecosystem.
