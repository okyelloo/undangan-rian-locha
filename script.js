// INIT AOS
AOS.init({ duration: 1000, once: true });

// BUKA UNDANGAN
function bukaUndangan() {
  document.getElementById('cover').classList.add('hide');
  document.getElementById('konten').classList.add('show');
  document.getElementById('bgm').play();
  document.body.style.overflow = 'auto';
}

// KUPU2 RANDOM
function buatKupu() {
  const kupu = document.createElement('div');
  kupu.classList.add('kupu');
  kupu.innerHTML = ['🦋', '🌸', '🌺'][Math.floor(Math.random() * 3)];
  kupu.style.left = Math.random() * 100 + 'vw';
  kupu.style.animationDuration = Math.random() * 5 + 8 + 's';
  kupu.style.fontSize = Math.random() * 10 + 20 + 'px';
  document.getElementById('kupu-container').appendChild(kupu);
  setTimeout(() => kupu.remove(), 13000);
}
setInterval(buatKupu, 1500);

// COUNTDOWN
const tglNikah = new Date("Jan 18, 2027 08:00:00").getTime();
function updateCountdown() {
  const jarak = tglNikah - new Date().getTime();
  if (jarak < 0) {
    document.getElementById('countdown').innerHTML = "<h4>Acara Telah Berlangsung</h4>";
    return;
  }
  const h = Math.floor(jarak / (1000*60*60*24));
  const j = Math.floor((jarak % (1000*60*60*24)) / (1000*60*60));
  const m = Math.floor((jarak % (1000*60*60)) / (1000*60));
  const d = Math.floor((jarak % (1000*60)) / 1000);
  
  document.getElementById('countdown').innerHTML = `
    <div class="col-3 col-md-2"><div class="box-countdown"><h4>${h}</h4><p>Hari</p></div></div>
    <div class="col-3 col-md-2"><div class="box-countdown"><h4>${j}</h4><p>Jam</p></div></div>
    <div class="col-3 col-md-2"><div class="box-countdown"><h4>${m}</h4><p>Menit</p></div></div>
    <div class="col-3 col-md-2"><div class="box-countdown"><h4>${d}</h4><p>Detik</p></div></div>
  `;
}
setInterval(updateCountdown, 1000);
updateCountdown();

// SWIPER GALLERY
new Swiper(".mySwiper", {
  slidesPerView: 1.2,
  spaceBetween: 20,
  centeredSlides: true,
  pagination: { el: ".swiper-pagination", clickable: true },
  breakpoints: {
    768: { slidesPerView: 3 }
  }
});

// COPY REKENING
function copyRek() {
  navigator.clipboard.writeText(document.getElementById('noRek').innerText);
  alert('No. rekening berhasil disalin!');
}

// RSVP KE GOOGLE SHEET
document.getElementById('rsvpForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const data = {
    nama: document.getElementById('nama').value,
    kehadiran: document.getElementById('kehadiran').value,
    ucapan: document.getElementById('ucapan').value,
    waktu: new Date().toLocaleString()
  };
  
  // Ganti URL ini dengan URL Web App Google Apps Script lu
  fetch('https://script.google.com/macros/s/URL_KAMU/exec', {
    method: 'POST',
    body: JSON.stringify(data)
  })
  .then(res => {
    document.getElementById('notif').innerText = 'Terima kasih atas ucapan & konfirmasinya!';
    document.getElementById('rsvpForm').reset();
  })
  .catch(err => {
    document.getElementById('notif').innerText = 'Gagal kirim, coba lagi ya';
  });
});