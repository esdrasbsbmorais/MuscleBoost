-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "flavor" TEXT,
ADD COLUMN     "photoPath" TEXT;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "emailVerified" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "verificationToken" TEXT;

-- CreateTable
CREATE TABLE "_LikedProducts" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_LikedProducts_AB_unique" ON "_LikedProducts"("A", "B");

-- CreateIndex
CREATE INDEX "_LikedProducts_B_index" ON "_LikedProducts"("B");

-- AddForeignKey
ALTER TABLE "_LikedProducts" ADD CONSTRAINT "_LikedProducts_A_fkey" FOREIGN KEY ("A") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_LikedProducts" ADD CONSTRAINT "_LikedProducts_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
