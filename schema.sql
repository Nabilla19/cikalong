-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,
    "nama" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'admin',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Berita" (
    "id" TEXT NOT NULL,
    "judul" TEXT NOT NULL,
    "isi" TEXT NOT NULL,
    "foto_url" TEXT,
    "diterbitkan_oleh" TEXT,
    "diterbitkan_pada" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Berita_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StrukturOrganisasi" (
    "id" TEXT NOT NULL,
    "jabatan" TEXT NOT NULL,
    "nama" TEXT NOT NULL,
    "urutan" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "StrukturOrganisasi_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProdukHukum" (
    "id" TEXT NOT NULL,
    "judul" TEXT NOT NULL,
    "file_url" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ProdukHukum_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ArsipDokumen" (
    "id" TEXT NOT NULL,
    "judul" TEXT NOT NULL,
    "file_url" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ArsipDokumen_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Geografi" (
    "id" SERIAL NOT NULL,
    "letak_dan_luas" TEXT,
    "kondisi_tanah" JSONB,
    "kependudukan" JSONB,
    "mata_pencaharian" JSONB,
    "tingkat_pendidikan" JSONB,
    "sarana_prasarana" JSONB,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Geografi_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Beranda" (
    "id" SERIAL NOT NULL,
    "judul_hero" TEXT,
    "foto_hero_url" TEXT,
    "pengumuman_judul" TEXT,
    "pengumuman_deskripsi" TEXT,
    "pengumuman_foto_url" TEXT,
    "sambutan_judul" TEXT,
    "sambutan_isi" TEXT,
    "sambutan_nama" TEXT,
    "sambutan_foto_url" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Beranda_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PandanganMasyarakat" (
    "id" TEXT NOT NULL,
    "nama" TEXT NOT NULL,
    "kutipan" TEXT NOT NULL,
    "pekerjaan" TEXT,
    "urutan" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PandanganMasyarakat_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PengaturanWeb" (
    "id" SERIAL NOT NULL,
    "nama_desa" TEXT,
    "alamat" TEXT,
    "telepon" TEXT,
    "email" TEXT,
    "facebook" TEXT,
    "instagram" TEXT,
    "youtube" TEXT,
    "teks_footer" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PengaturanWeb_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProfilDesa" (
    "id" SERIAL NOT NULL,
    "sejarah" TEXT,
    "visi" TEXT,
    "misi" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ProfilDesa_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Budaya" (
    "id" TEXT NOT NULL,
    "judul" TEXT NOT NULL,
    "deskripsi" TEXT,
    "foto_url" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Budaya_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Umkm" (
    "id" TEXT NOT NULL,
    "nama_usaha" TEXT NOT NULL,
    "pemilik" TEXT,
    "deskripsi" TEXT,
    "kontak" TEXT,
    "foto_url" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Umkm_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

