'use client';
import { createInitializeMint2Instruction, createMint, getMinimumBalanceForRentExemptMint, MINT_SIZE, TOKEN_PROGRAM_ID } from "@solana/spl-token";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { Keypair, SystemProgram, Transaction } from "@solana/web3.js";

export async function createNFT() {
    const wallet = useWallet();
    const { connection } = useConnection();

    if (!wallet.publicKey) return;

    const lamports = await getMinimumBalanceForRentExemptMint(connection);

    const keypair = Keypair.generate();

    const transaction = new Transaction().add(
        SystemProgram.createAccount({
            fromPubkey: wallet.publicKey,
            newAccountPubkey: keypair.publicKey,
            space: MINT_SIZE,
            lamports,
            programId: TOKEN_PROGRAM_ID,
        }),
        createInitializeMint2Instruction(keypair.publicKey, 0, wallet.publicKey, wallet.publicKey, TOKEN_PROGRAM_ID)
    );

    transaction.partialSign(keypair);
    let response = await wallet.sendTransaction(transaction, connection);
    console.log(response);

}