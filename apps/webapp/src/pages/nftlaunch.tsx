"use client";
import {
  WalletDisconnectButton,
  WalletModalProvider,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";
import { useState, useEffect } from "react";
import {
  createAssociatedTokenAccountInstruction,
  createInitializeMetadataPointerInstruction,
  createInitializeMint2Instruction,
  createMintToInstruction,
  ExtensionType,
  getAssociatedTokenAddressSync,
  getMintLen,
  LENGTH_SIZE,
  TOKEN_2022_PROGRAM_ID,
  TYPE_SIZE,
} from "@solana/spl-token";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { Keypair, SystemProgram, Transaction } from "@solana/web3.js";
import { createInitializeInstruction, pack } from "@solana/spl-token-metadata";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

export default function Page() {
  const { data: sessionData } = useSession();
  const router = useRouter();

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    if (!sessionData?.user) {
      //   router.push("/auth/signup");
      console.log(sessionData);
    }
  }, []);

  const wallet = useWallet();
  const { connection } = useConnection();
  console.log(wallet.publicKey);

  const handleClick = async () => {
    console.log("clicked");

    if (!wallet.publicKey) return;

    const keypair = Keypair.generate();

    const metadata = {
      mint: keypair.publicKey,
      name: name,
      symbol: symbol,
      uri: "https://cdn.100xdevs.com/metadata.json",
      additionalMetadata: [],
    };
    const mintLen = getMintLen([ExtensionType.MetadataPointer]);
    const metadataLen = TYPE_SIZE + LENGTH_SIZE + pack(metadata).length;

    const lamports = await connection.getMinimumBalanceForRentExemption(
      mintLen + metadataLen
    );

    const transaction = new Transaction().add(
      SystemProgram.createAccount({
        fromPubkey: wallet.publicKey,
        newAccountPubkey: keypair.publicKey,
        space: mintLen,
        lamports,
        programId: TOKEN_2022_PROGRAM_ID,
      }),
      createInitializeMetadataPointerInstruction(
        keypair.publicKey,
        wallet.publicKey,
        keypair.publicKey,
        TOKEN_2022_PROGRAM_ID
      ),
      createInitializeMint2Instruction(
        keypair.publicKey,
        0,
        wallet.publicKey,
        wallet.publicKey,
        TOKEN_2022_PROGRAM_ID
      ),
      createInitializeInstruction({
        programId: TOKEN_2022_PROGRAM_ID,
        mint: keypair.publicKey,
        metadata: keypair.publicKey,
        name: metadata.name,
        symbol: metadata.symbol,
        uri: metadata.uri,
        mintAuthority: wallet.publicKey,
        updateAuthority: wallet.publicKey,
      })
    );

    transaction.feePayer = wallet.publicKey;
    transaction.recentBlockhash = (
      await connection.getLatestBlockhash()
    ).blockhash;
    transaction.partialSign(keypair);
    let response = await wallet.sendTransaction(transaction, connection);
    console.log(response);
  };

  const [name, setName] = useState("");
  const [symbol, setSymbol] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");

  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [uploadProgress, setUploadProgress] = useState(0);

  async function uploadFile(file: File | null) {
    if (!file) {
      console.error("No file provided");
      return;
    }

    try {
      const res = await fetch(
        `http://localhost:3000/api/aws/getSignedUrl?filename=${file.name}&contentType=${file.type}`,
        {
          method: "GET",
        }
      );

      if (!res.ok) {
        throw new Error("Failed to get signed URL");
      }

      const data = await res.json();
      const signedUrl = data.url;

      console.log("Signed URL: ", signedUrl);

      const uploadResponse = await fetch(signedUrl, {
        method: "PUT",
        body: file,
        headers: {
          "Content-Type": file.type,
        },
      });

      if (!uploadResponse.ok) {
        throw new Error("Failed to upload file");
      }


      console.log("File uploaded successfully");
    } catch (error) {
      console.error("Error during file upload:", error);
    }
  }

  const handleFileChange = (e: any) => {
    setFile(e.target.files[0]);
    setFileName(e.target.files[0].name);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    // Form submission logic
    // Simulate file upload progress
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setUploadProgress(progress);
      if (progress >= 100) clearInterval(interval);
    }, 100);
  };

  return (
    <div>
      {isMounted && (
        <WalletModalProvider>
          <form
            className="flex justify-between px-[7vw] py-[7vh]"
            onSubmit={handleSubmit}
          >
            <div>
              <div className="mb-5">
                <label
                  htmlFor="email"
                  className="mb-3 block text-base font-medium"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="text"
                  placeholder="enter nft name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-md border border-[#e0e0e0] bg-black px-6 py-3 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                />
              </div>

              <div className="mb-5">
                <label
                  htmlFor="email"
                  className="mb-3 block text-base font-medium"
                >
                  Symbol
                </label>
                <input
                  type="text"
                  name="symbol"
                  id="symbol"
                  placeholder="enter nft symbol"
                  value={symbol}
                  onChange={(e) => setSymbol(e.target.value)}
                  className="w-full rounded-md border border-[#e0e0e0] bg-black px-6 py-3 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                />
              </div>

              <div className="mb-5">
                <label
                  htmlFor="text"
                  className="mb-3 w-[30vw]  block text-base font-medium"
                >
                  Description
                </label>
                <textarea
                  name="description"
                  id="text"
                  placeholder="enter nft description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="h-[20vh] w-full rounded-md border border-[#e0e0e0] bg-black px-6 py-3 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                />
              </div>
              <button
                className="p-3 text-sm w-[30vw] rounded-md bg-violet-800 font-semibold"
                onClick={handleClick}
              >
                Save
              </button>
              <div className="flex justify-between mt-[5vh]">
                {wallet.publicKey ? (
                  <WalletDisconnectButton />
                ) : (
                  <WalletMultiButton />
                )}
                <button
                  className="p-3 text-sm rounded-md bg-violet-800 font-semibold"
                  onClick={handleClick}
                >
                  Create Token
                </button>
              </div>
            </div>

            <div className="w-1/2">
              <div className="mb-6 pt-4">
                <label className="mb-5 block text-xl font-semibold ">
                  Upload Image
                </label>

                <div className="mb-8">
                  <input
                    type="file"
                    name="file"
                    id="file"
                    onChange={handleFileChange}
                    className="sr-only"
                  />
                  <label
                    htmlFor="file"
                    className="relative flex min-h-[200px] items-center justify-center rounded-md border border-dashed border-[#e0e0e0] p-12 text-center"
                  >
                    <div>
                      <span className="mb-2 block text-xl font-semibold">
                        Drop Image here
                      </span>
                      <span className="mb-2 block text-base font-medium text-[#6B7280]">
                        Or
                      </span>
                      <span className="inline-flex rounded border border-[#e0e0e0] px-7 py-2 text-base font-medium ">
                        Browse
                      </span>
                    </div>
                  </label>
                </div>

                {fileName && (
                  <div className="mb-5 rounded-md bg-black px-8 py-4">
                    <div className="flex items-center justify-between">
                      <span className="truncate pr-3 text-base font-medium ">
                        {fileName}
                      </span>
                      <button
                        type="button"
                        onClick={() => {
                          setFile(null);
                          setFileName("");
                          setUploadProgress(0);
                        }}
                        className="text-white"
                      >
                        <svg
                          width="10"
                          height="10"
                          viewBox="0 0 10 10"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M0.279337 0.279338C0.651787 -0.0931121 1.25565 -0.0931121 1.6281 0.279338L9.72066 8.3719C10.0931 8.74435 10.0931 9.34821 9.72066 9.72066C9.34821 10.0931 8.74435 10.0931 8.3719 9.72066L0.279337 1.6281C-0.0931125 1.25565 -0.0931125 0.651788 0.279337 0.279338Z"
                            fill="currentColor"
                          />
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M0.279337 9.72066C-0.0931125 9.34821 -0.0931125 8.74435 0.279337 8.3719L8.3719 0.279338C8.74435 -0.0931127 9.34821 -0.0931123 9.72066 0.279338C10.0931 0.651787 10.0931 1.25565 9.72066 1.6281L1.6281 9.72066C1.25565 10.0931 0.651787 10.0931 0.279337 9.72066Z"
                            fill="currentColor"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                )}

                {fileName && (
                  <div className="rounded-md bg-black px-8 py-4">
                    <div className="flex items-center justify-between">
                      <span className="truncate pr-3 text-base font-medium text-white">
                        {fileName}
                      </span>
                      <button
                        type="button"
                        onClick={() => {
                          setFile(null);
                          setFileName("");
                          setUploadProgress(0);
                        }}
                        className="text-white"
                      >
                        <svg
                          width="10"
                          height="10"
                          viewBox="0 0 10 10"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M0.279337 0.279338C0.651787 -0.0931121 1.25565 -0.0931121 1.6281 0.279338L9.72066 8.3719C10.0931 8.74435 10.0931 9.34821 9.72066 9.72066C9.34821 10.0931 8.74435 10.0931 8.3719 9.72066L0.279337 1.6281C-0.0931125 1.25565 -0.0931125 0.651788 0.279337 0.279338Z"
                            fill="currentColor"
                          />
                          <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M0.279337 9.72066C-0.0931125 9.34821 -0.0931125 8.74435 0.279337 8.3719L8.3719 0.279338C8.74435 -0.0931127 9.34821 -0.0931123 9.72066 0.279338C10.0931 0.651787 10.0931 1.25565 9.72066 1.6281L1.6281 9.72066C1.25565 10.0931 0.651787 10.0931 0.279337 9.72066Z"
                            fill="currentColor"
                          />
                        </svg>
                      </button>
                    </div>
                    <div className="relative mt-5 h-[6px] w-full rounded-lg bg-[#E2E5EF]">
                      <div
                        className="absolute left-0 right-0 h-full w-[75%] rounded-lg bg-[#6A64F1]"
                        style={{ width: `${uploadProgress}%` }}
                      ></div>
                    </div>
                  </div>
                )}
              </div>

              <div>
                <button
                  type="submit"
                  className="hover:shadow-form w-full rounded-md bg-violet-700 px-8 py-3 text-center text-base font-semibold text-white outline-none"
                >
                  Upload
                </button>
              </div>
            </div>
          </form>
        </WalletModalProvider>
      )}
    </div>
  );
}
