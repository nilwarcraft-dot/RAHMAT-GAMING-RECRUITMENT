document.getElementById('recruitForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const data = Object.fromEntries(formData.entries());

  try {
    const res = await fetch('http://localhost:3000/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (res.ok) {
      alert('Data berhasil dikirim!');
      e.target.reset();
    } else {
      alert('Gagal mengirim data.');
    }
  } catch (err) {
    console.error(err);
    alert('Error mengirim data.');
  }
});
