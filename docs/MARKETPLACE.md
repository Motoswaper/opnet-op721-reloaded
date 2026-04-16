# OP721 Reloaded — Marketplace Integration Guide

## Overview
This document explains how OP721 Reloaded integrates with OP721 Marketplace.

## Requirements
A collection must implement:
- OP721 core  
- OP721Metadata  
- OP721Receiver (optional but recommended)  

## Listing Flow
1. Marketplace verifies ownership via `ownerOf(tokenId)`
2. Marketplace transfers NFT into escrow
3. Marketplace emits `ListingCreated`

## Purchase Flow
1. Buyer pays with OP‑20
2. Escrow holds NFT + payment
3. Seller confirms
4. Escrow releases NFT to buyer
5. Escrow releases payment to seller

## Offer Flow
- Offers can be made on listed or unlisted NFTs
- Owner accepts → escrow opens → trade completes

## Disputes
- TrustLayer handles arbitration
- Marketplace updates reputation scores
