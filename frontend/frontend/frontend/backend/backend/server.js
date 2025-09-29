const express = require('express');
const fetch = require('node-fetch');
const nodemailer = require('nodemailer');

const app = express();
app.use(express.json());

const TELEGRAM_BOT_TOKEN = '8494724800:AAF_umgpa8MS6gZraFTNUFFBxIKdVb78im0';
const TELEGRAM_CHAT_ID = '1664446777';


const EMAIL_USER = 'your_email@example.com';
const EMAIL_PASS = 'your_email_password';
const EMAIL_TO = 'admin_email@example.com';

app.post('/submit', async (req, res) => {
  const data = req.body;
  const message = `
Nama: ${data.nama}
Alamat: ${data.alamat}
Jenis Kelamin: ${data.jenis_kelamin}
Usia: ${data.usia}
Pengalaman: ${data.pengalaman}
Game yang diminati: ${data.game_diminati}
Nomor Telepon: ${data.nomor_telepon}
`;

  try {
    // Kirim ke Telegram
    const telegramUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
    await fetch(telegramUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: message
      }),
    });

    // Kirim ke Email
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: EMAIL_USER,
      to: EMAIL_TO,
      subject: 'Lamaran Rahmat Gaming',
      text: message,
    });

    res.status(200).json({ message: 'Data berhasil dikirim!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Gagal mengirim data' });
  }
});

app.listen(3000, () => {
  console.log('Server berjalan di http://localhost:3000');
});
