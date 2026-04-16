// OP721Receiver.ts — OP_NET AssemblyScript Contract

@contract
export class OP721Receiver {
  /**
   * Called when an OP721 token is transferred to this contract.
   * Must return "OP721_ACCEPTED" to approve the transfer.
   */
  onOP721Received(
    operator: Address,
    from: Address,
    tokenId: u64,
    data: Uint8Array
  ): string {
    // You can add custom logic here if needed.
    return "OP721_ACCEPTED"
  }
}
