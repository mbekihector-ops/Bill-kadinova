
window.currentLanguage = 'sw';
let currency = 'USD';
const rates = { USD: 1, TZS: 2600 };
let selectedCard = null;
 
// Kategoria kuu nne ulizoomba na zinginezo
const categoriesList = &#91;
{ name: 'Harusi', emoji: '🌸', count: 50 },
{ name: 'Sherehe ya kuzaliwa', emoji: '🎂', count: 50 },
{ name: 'Mahafali', emoji: '🎓', count: 50 },
{ name: 'Hafla ya mtoto', emoji: '🍼', count: 50 },
{ name: 'Mila na Desturi', emoji: '🌺', count: 50 },
{ name: 'Biashara', emoji: '💼', count: 50 }
&#93;;
 
const imagesList = &#91;
'https://images.unsplash.com/photo-1523438885200-e635ba2c371e?auto=format&fit=crop&w=700&q=85',
'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=700&q=85',
'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=700&q=85',
'https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=700&q=85',
'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=700&q=85'
&#93;;
 
// Tunatengeneza kadi 50 kamili kwa kila kategoria (Jumla ya kadi nyingi za kisasa)
const cardsData = &#91;&#93;;
let globalId = 1;
 
categoriesList.forEach(cat => {
for (let i = 1; i &lt;= cat.count; i++) {
cardsData.push({
id: globalId++,
sw: `Mwaliko wa ${cat.name} – ${i < 10 ? '0' + i : i}`,
en: `${cat.name} Invitation – ${i < 10 ? '0' + i : i}`,
kind: cat.name,
emoji: cat.emoji,
price: (i % 3 === 0) ? 15 : 10, // Thamani tofauti za kadi
img: imagesList&#91;(i - 1) % imagesList.length&#93;
});
}
});
 
let currentPage = 1;
const itemsPerPage = 12;
let filteredCards = &#91;...cardsData&#93;;
 
function renderCards() {
const container = document.getElementById('cardsGrid');
if (!container) return;
container.innerHTML = '';
 
const start = (currentPage - 1) \* itemsPerPage;
const end = start + itemsPerPage;
const pageItems = filteredCards.slice(start, end);
 
pageItems.forEach((card) => {
const cardEl = document.createElement('article');
cardEl.className = 'card';
cardEl.onclick = () => openCardModal(card);
 
```
const priceText = currency === 'USD' ? `$${card.price}.00` : `TSh ${(card.price * rates.TZS).toLocaleString()}`;  
const title = window.currentLanguage === 'sw' ? card.sw : card.en;  

cardEl.innerHTML = `  
  <div class="preview"><img src="${card.img}" alt="${title}" loading="lazy"></div>  
  <div class="tag">${card.emoji} ${card.kind}</div>  
  <h3>${title}</h3>  
  <p class="price">${priceText}</p>  
  <button class="buy" onclick="event.stopPropagation(); openPaymentModal(${card.id});">🛒 Nunua / Pata Kifurushi</button>  
`;  
container.appendChild(cardEl);  
```
 
});
 
renderPagination();
}
 
function renderPagination() {
const pagContainer = document.getElementById('pagination');
if (!pagContainer) return;
pagContainer.innerHTML = '';
 
const totalPages = Math.ceil(filteredCards.length / itemsPerPage);
if (totalPages &lt;= 1) return;
 
for (let p = 1; p &lt;= totalPages; p++) {
const btn = document.createElement('button');
btn.textContent = p;
if (p === currentPage) btn.className = 'active';
btn.onclick = () => {
currentPage = p;
renderCards();
window.scrollTo({ top: 400, behavior: 'smooth' });
};
pagContainer.appendChild(btn);
}
}
 
function filterCategory(catName) {
if (catName === 'All') {
filteredCards = &#91;...cardsData&#93;;
} else {
filteredCards = cardsData.filter(c => c.kind.toLowerCase() === catName.toLowerCase());
}
currentPage = 1;
renderCards();
}
 
function openCardModal(card) {
selectedCard = card;
document.getElementById('modalTitle').textContent = window.currentLanguage === 'sw' ? card.sw : card.en;
document.getElementById('cardPreviewContainer').hidden = true;
document.getElementById('inviteForm').reset();
document.getElementById('cardModal').hidden = false;
document.body.classList.add('modal-open');
}
 
function closeModal(id) {
document.getElementById(id).hidden = true;
document.body.classList.remove('modal-open');
}
 
// Kuchora Kadi ya Kisasa yenye Maua kwenye Canvas (Iende kama Picha WhatsApp)
function drawCardOnCanvas(data) {
const canvas = document.getElementById('cardCanvas');
const ctx = canvas.getContext('2d');
 
// Mandhari ya kisasa (Gradient ya kifahari)
const grad = ctx.createLinearGradient(0, 0, 0, 850);
grad.addColorStop(0, '#0b1727');
grad.addColorStop(0.5, '#16283d');
grad.addColorStop(1, '#0b1727');
ctx.fillStyle = grad;
ctx.fillRect(0, 0, 600, 850);
 
// Fremu ya Dhahabu (Gold Borders)
ctx.strokeStyle = '#d7ad62';
ctx.lineWidth = 6;
ctx.strokeRect(20, 20, 560, 810);
 
ctx.strokeStyle = '#f5dba7';
ctx.lineWidth = 2;
ctx.strokeRect(28, 28, 544, 794);
 
// Mapambo ya Maua Pembeni
drawFloralCorner(ctx, 35, 35);
drawFloralCorner(ctx, 565, 35);
drawFloralCorner(ctx, 35, 815);
drawFloralCorner(ctx, 565, 815);
 
// Vichwa vya habari
ctx.fillStyle = '#d7ad62';
ctx.font = 'bold 20px Georgia, serif';
ctx.textAlign = 'center';
ctx.fillText('✨ MWALIKO WA KISASA ✨', 300, 85);
 
ctx.fillStyle = '#ffffff';
ctx.font = 'bold 30px Georgia, serif';
ctx.fillText(selectedCard ? selectedCard.sw : 'MWALIKO MAALUM', 300, 135);
 
ctx.strokeStyle = '#d7ad62';
ctx.lineWidth = 1;
ctx.beginPath();
ctx.moveTo(120, 155);
ctx.lineTo(480, 155);
ctx.stroke();
 
// Taarifa za Tukio zilizojazwa na Mteja
ctx.fillStyle = '#f5dba7';
ctx.font = 'italic 18px Georgia, serif';
ctx.fillText('Tunayo furaha kukukaribisha kwenye:', 300, 205);
 
ctx.fillStyle = '#ffffff';
ctx.font = 'bold 34px Georgia, serif';
ctx.fillText(data.eventName, 300, 260);
 
ctx.fillStyle = '#d7ad62';
ctx.font = 'bold 18px Georgia, serif';
ctx.fillText('📅 TAREHE NA MUDA', 300, 330);
 
ctx.fillStyle = '#ffffff';
ctx.font = '20px Georgia, serif';
const dateStr = data.eventDate ? new Date(data.eventDate).toLocaleDateString('sw-TZ', { day: 'numeric', month: 'long', year: 'numeric' }) : '';
ctx.fillText(`${dateStr}  |  ${data.eventTime || ''}`, 300, 370);
 
ctx.fillStyle = '#d7ad62';
ctx.font = 'bold 18px Georgia, serif';
ctx.fillText('📍 MAHALI / UKUMBI', 300, 440);
 
ctx.fillStyle = '#ffffff';
ctx.font = '20px Georgia, serif';
ctx.fillText(data.venue, 300, 480);
 
if (data.message) {
ctx.fillStyle = '#e0e4ea';
ctx.font = 'italic 17px Georgia, serif';
ctx.fillText(`"${data.message}"`, 300, 550);
}
 
// QR Code ya Kadi
const qrImg = new Image();
qrImg.crossOrigin = 'anonymous';
const qrText = `${data.eventName} | ${selectedCard?.sw} | ${dateStr} | ${data.venue}`;
qrImg.src = 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=' + encodeURIComponent(qrText);
qrImg.onload = () => {
ctx.fillStyle = '#ffffff';
ctx.fillRect(235, 610, 130, 130);
ctx.drawImage(qrImg, 240, 615, 120, 120);
 
```
ctx.fillStyle = '#b8c2d0';  
ctx.font = '13px Arial';  
ctx.fillText('Bill KadiNova • Imesanifiwa Kisasa kwa ajili ya WhatsApp', 300, 775);  
```
 
};
}
 
function drawFloralCorner(ctx, x, y) {
ctx.save();
ctx.fillStyle = '#f4a9bb';
ctx.beginPath();
ctx.arc(x, y, 10, 0, Math.PI \* 2);
ctx.fill();
ctx.fillStyle = '#d7ad62';
ctx.beginPath();
ctx.arc(x, y, 4, 0, Math.PI \* 2);
ctx.fill();
ctx.restore();
}
 
function downloadCardImage() {
const canvas = document.getElementById('cardCanvas');
const link = document.createElement('a');
link.download = `${selectedCard?.sw || 'Kadi_Mwaliko'}.png`;
link.href = canvas.toDataURL('image/png');
link.click();
toast('Picha ya Kadi imepakuliwa! Sasa unaweza kuituma WhatsApp kama picha.');
}
 
function shareWhatsappImage() {
downloadCardImage();
setTimeout(() => {
const text = encodeURIComponent(`Habari! Karibu sana kwenye mwaliko wangu (${selectedCard?.sw}). Tafadhali angalia picha ya kadi niliyoambatisha hapa juu! 🌸✨`);
window.open(`https://wa.me/?text=${text}`, '\_blank');
}, 1200);
}
 
function openPaymentModal(cardId) {
document.getElementById('paymentModal').hidden = false;
document.body.classList.add('modal-open');
}
 
document.addEventListener('DOMContentLoaded', () => {
renderCards();
 
document.getElementById('closeModal').onclick = () => closeModal('cardModal');
document.getElementById('closePayment').onclick = () => closeModal('paymentModal');
 
document.getElementById('inviteForm').onsubmit = (e) => {
e.preventDefault();
const formData = new FormData(e.target);
const data = Object.fromEntries(formData.entries());
 
```
drawCardOnCanvas(data);  
document.getElementById('cardPreviewContainer').hidden = false;  
document.getElementById('cardPreviewContainer').scrollIntoView({ behavior: 'smooth' });  
```
 
};
 
document.getElementById('downloadCardBtn').onclick = downloadCardImage;
document.getElementById('shareWhatsappBtn').onclick = shareWhatsappImage;
 
document.querySelectorAll('&#91;data-payment&#93;').forEach(btn => {
btn.onclick = () => {
const payType = btn.dataset.payment;
const details = document.getElementById('paymentDetails');
const instruction = document.getElementById('payInstruction');
details.style.display = 'block';
instruction.textContent = `Lipa kwa ${payType}: Namba ya Kampuni 888999 (KadiNova Bundle 50)`;
};
;
 
