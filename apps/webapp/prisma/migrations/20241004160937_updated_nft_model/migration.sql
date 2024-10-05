/*
  Warnings:

  - Added the required column `description` to the `NFT` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imageUrl` to the `NFT` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `NFT` table without a default value. This is not possible if the table is not empty.
  - Added the required column `symbol` to the `NFT` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "NFT" ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "imageUrl" TEXT NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "symbol" TEXT NOT NULL;
