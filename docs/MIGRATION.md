# Migration Guide — OP721 → OP721 Reloaded

## Why migrate?
The original OP_721 implementation had issues:
- `ownerOf` returned a hash instead of an address
- Non‑standard method signatures
- Unsafe transfer logic
- Missing receiver interface

OP721 Reloaded fixes all of these.

## Migration Steps

### 1. Replace imports
Old:
