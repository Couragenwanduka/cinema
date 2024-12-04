/*
  Warnings:

  - You are about to drop the column `showTime` on the `Schedule` table. All the data in the column will be lost.
  - You are about to drop the column `theaterName` on the `Schedule` table. All the data in the column will be lost.
  - Added the required column `theaterId` to the `Schedule` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Schedule" DROP COLUMN "showTime",
DROP COLUMN "theaterName",
ADD COLUMN     "theaterId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Schedule" ADD CONSTRAINT "Schedule_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "Movie"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Schedule" ADD CONSTRAINT "Schedule_theaterId_fkey" FOREIGN KEY ("theaterId") REFERENCES "Theater"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
