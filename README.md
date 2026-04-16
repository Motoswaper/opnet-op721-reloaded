<div align="center">

# 🚀 OP_NET Standards  
### **OP721 Reloaded + OP20 Reloaded**

Modern, deterministic, production‑grade token standards for the OP_NET ecosystem.

<br>

![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)
![OP_NET](https://img.shields.io/badge/Network-OP__NET-blue.svg)
![AssemblyScript](https://img.shields.io/badge/Language-AssemblyScript-purple.svg)

<br>

### 🔗 Quick Links

[📘 OP721 Docs](./docs/OP721.md) •  
[📗 OP20 Docs](./docs/OP20.md) •  
[🧩 OP721 Indexer Schema](./docs/INDEXER_OP721.md) •  
[🧮 OP20 Indexer Schema](./docs/INDEXER_OP20.md)

<br><br>

</div>

---

# 🧬 Overview

This repository contains the **official token standards** for the OP_NET virtual machine:

### **OP721 Reloaded**  
A deterministic, minimal NFT standard designed for wallets, explorers, marketplaces, and OP_NET dApps.

### **OP20 Reloaded**  
A fungible token standard analogous to ERC‑20, rewritten for OP_NET with deterministic behavior and frozen storage layout.

Both standards are:

- deterministic  
- AssemblyScript‑based  
- indexer‑friendly  
- gas‑efficient  
- future‑proof (reserved storage + hooks)  
- production‑ready  

---

# 📂 Repository Structure
/contracts
├── OP721.ts
└── OP20.ts

/docs
├── OP721.md
├── OP20.md
├── INDEXER_OP721.md
└── INDEXER_OP20.md

README.md
LICENSE

---

# 🧱 Standards Included

## 🔵 OP721 Reloaded (NFT Standard)

- `balanceOf`
- `ownerOf`
- `transferFrom`
- `safeTransferFrom`
- `approve`
- `setApprovalForAll`
- deterministic hooks  
- frozen storage layout  
- `"OP721_ACCEPTED"` receiver interface  

📘 **Docs:** [`docs/OP721.md`](./docs/OP721.md)

---

## 🟢 OP20 Reloaded (Fungible Token Standard)

- `transfer`
- `approve`
- `transferFrom`
- `balanceOf`
- `allowance`
- deterministic mint/burn  
- frozen storage layout  
- short error codes  
- indexer‑friendly events  

📗 **Docs:** [`docs/OP20.md`](./docs/OP20.md)

---

# 🧩 Indexer Schemas

These schemas define how explorers, DEXes, and marketplaces should index OP_NET events.

- 🧩 [`INDEXER_OP721.md`](./docs/INDEXER_OP721.md)  
- 🧮 [`INDEXER_OP20.md`](./docs/INDEXER_OP20.md)

---

# 📜 License

MIT — open and free for the OP_NET ecosystem.

---

<div align="center">

### Built for the OP_NET ecosystem  
**Deterministic. Minimal. Future‑proof.**

</div>

