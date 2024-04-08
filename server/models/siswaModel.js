import mongoose from 'mongoose';

const siswaSchema = new mongoose.Schema(
  {
    nama: {
      type: String,
      required: true,
    },
    jeniskelamin: {
      type: String,
      required: true,
    },
    nis: {
      type: String,
      required: true,
      unique: true,
    },
    sekolah: {
      type: String,
      required: true,
    },
    tgllahir: {
      type: Date,
      required: true,
    },
    kelas: {
      type: mongoose.ObjectId,
      ref: 'Kelas',
      required: true,
    },
    jurusan: {
      type: mongoose.ObjectId,
      ref: 'Jurusan',
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model('siswa', siswaSchema);
