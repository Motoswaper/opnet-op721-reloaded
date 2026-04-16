# OP721 Reloaded — Specification

## Overview
OP721 Reloaded is the official NFT standard for OP_NET, fully compatible with ERC‑721 while optimized for OP_NET’s WASM/TypeScript contract model.

## Core Interfaces
- `ownerOf(tokenId)`
- `balanceOf(owner)`
- `transferFrom(from, to, tokenId)`
- `safeTransferFrom(from, to, tokenId)`
- `approve(to, tokenId)`
- `setApprovalForAll(operator, approved)`
- `isApprovedForAll(owner, operator)`

## Events
- `Transfer(from, to, tokenId)`
- `Approval(owner, approved, tokenId)`
- `ApprovalForAll(owner, operator, approved)`

## Storage Model
- Direct address storage (no hashing)
- Mapping: `tokenId → owner`
- Mapping: `owner → balance`
- Mapping: `tokenId → approved`
- Mapping: `owner → operator approvals`

## Safe Transfers
Contracts must implement:

