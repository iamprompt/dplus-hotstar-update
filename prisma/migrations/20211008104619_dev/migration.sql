-- CreateTable
CREATE TABLE "Asset" (
    "contentId" INTEGER NOT NULL,
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "shortTitle" TEXT,
    "engTitle" TEXT,
    "description" TEXT,
    "studioId" TEXT,
    "channelId" TEXT,
    "contentProvider" TEXT,
    "productionHouse" TEXT,
    "entityType" TEXT NOT NULL,
    "contentType" TEXT,
    "assetType" TEXT,
    "clipType" TEXT,
    "startDate" TIMESTAMP(3),
    "endDate" TIMESTAMP(3),
    "broadCastDate" TIMESTAMP(3),
    "genre" TEXT[],
    "year" INTEGER,
    "duration" INTEGER,
    "clipCnt" INTEGER,
    "images" TEXT,
    "imageSets" TEXT[],
    "seasonCnt" INTEGER,
    "episodeCnt" INTEGER,
    "seasonNo" INTEGER,
    "seasonName" TEXT,
    "episodeNo" INTEGER,
    "supportSimulcast" BOOLEAN,
    "encrypted" BOOLEAN,

    CONSTRAINT "Asset_pkey" PRIMARY KEY ("contentId")
);

-- CreateTable
CREATE TABLE "Studio" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Studio_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Channel" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Channel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tray" (
    "id" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "engTitle" TEXT,
    "uqId" TEXT,
    "assetIds" TEXT[],

    CONSTRAINT "Tray_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Lang" (
    "id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "displayName" TEXT NOT NULL,
    "iso3Code" TEXT NOT NULL,
    "assetIds" TEXT[],

    CONSTRAINT "Lang_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AssetLang" (
    "assetId" INTEGER NOT NULL,
    "langId" INTEGER NOT NULL,

    CONSTRAINT "AssetLang_pkey" PRIMARY KEY ("assetId","langId")
);

-- CreateTable
CREATE TABLE "AssetTray" (
    "assetId" INTEGER NOT NULL,
    "trayId" INTEGER NOT NULL,

    CONSTRAINT "AssetTray_pkey" PRIMARY KEY ("assetId","trayId")
);

-- CreateTable
CREATE TABLE "_assetParent" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_assetParent_AB_unique" ON "_assetParent"("A", "B");

-- CreateIndex
CREATE INDEX "_assetParent_B_index" ON "_assetParent"("B");

-- AddForeignKey
ALTER TABLE "Asset" ADD CONSTRAINT "Asset_studioId_fkey" FOREIGN KEY ("studioId") REFERENCES "Studio"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Asset" ADD CONSTRAINT "Asset_channelId_fkey" FOREIGN KEY ("channelId") REFERENCES "Channel"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AssetLang" ADD CONSTRAINT "AssetLang_assetId_fkey" FOREIGN KEY ("assetId") REFERENCES "Asset"("contentId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AssetLang" ADD CONSTRAINT "AssetLang_langId_fkey" FOREIGN KEY ("langId") REFERENCES "Lang"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AssetTray" ADD CONSTRAINT "AssetTray_assetId_fkey" FOREIGN KEY ("assetId") REFERENCES "Asset"("contentId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AssetTray" ADD CONSTRAINT "AssetTray_trayId_fkey" FOREIGN KEY ("trayId") REFERENCES "Tray"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_assetParent" ADD FOREIGN KEY ("A") REFERENCES "Asset"("contentId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_assetParent" ADD FOREIGN KEY ("B") REFERENCES "Asset"("contentId") ON DELETE CASCADE ON UPDATE CASCADE;
