# OP721 Reloaded — Indexer Specification

## Overview
The indexer listens to OP721 events and builds a searchable database of NFTs, owners, transfers, and metadata.

## Required Events
- Transfer  
- Approval  
- ApprovalForAll  

## Indexer Responsibilities
1. Track ownership  
2. Track balances  
3. Track approvals  
4. Track metadata  
5. Track historical transfers  
6. Expose API endpoints  

## Recommended Stack
- Node.js  
- TypeScript  
- PostgreSQL  
- Prisma  
- Redis cache  
- WebSocket event listener  

## API Endpoints
```
GET /nft/:contract/:tokenId
GET /owner/:address
GET /collection/:contract
GET /transfers/:contract/:tokenId
GET /search?query=
```
