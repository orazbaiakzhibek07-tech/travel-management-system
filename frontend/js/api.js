const API = 'http://localhost:3000/api';

function getToken() {
  return localStorage.getItem('token');
}

// Токен жоқ болса login бетіне жібер
if (!getToken() && !window.location.href.includes('login')) {
  window.location.href = 'login.html';
}

// Пайдаланушы атын көрсет
document.getElementById('user-name').textContent = 
  '👤 ' + (localStorage.getItem('userName') || '');

// Сапарларды жүктеу
async function loadTrips() {
  const search = document.getElementById('search-input')?.value || '';
  const status = document.getElementById('filter-status')?.value || '';
  
  let url = `${API}/trips?`;
  if (search) url += `search=${encodeURIComponent(search)}&`;
  if (status) url += `status=${status}`;

  try {
    const res = await fetch(url, {
      headers: { 'Authorization': `Bearer ${getToken()}` }
    });
    const data = await res.json();
    if (!data.success) { logout(); return; }
    renderTrips(data.data);
  } catch {
    document.getElementById('trips-grid').innerHTML = 
      '<div class="empty"><p>Сервермен байланыс жоқ 😢</p></div>';
  }
}

// Сапарларды көрсету
function renderTrips(trips) {
  const grid = document.getElementById('trips-grid');
  if (!trips || trips.length === 0) {
    grid.innerHTML = '<div class="empty"><p>✈️ Сапар жоқ — жаңасын қос!</p></div>';
    return;
  }
  grid.innerHTML = trips.map(t => `
    <div class="trip-card">
      <img src="${t.image_url || 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800'}" 
           alt="${t.title}" onerror="this.src='https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800'">
      <div class="trip-card-body">
        <h3>${t.title}</h3>
        <div class="trip-meta">
          <span class="badge badge-country">🌍 ${t.country}, ${t.city}</span>
          <span class="badge badge-days">📅 ${t.duration} күн</span>
          <span class="badge badge-status">${statusLabel(t.status)}</span>
        </div>
        <div class="trip-price">${Number(t.price).toLocaleString()} ₸</div>
        <div class="trip-includes">✅ ${t.includes || '—'}</div>
        <div class="trip-actions">
          <button class="btn-edit" onclick="editTrip(${t.id})">✏️ Өзгерту</button>
          <button class="btn-delete" onclick="deleteTrip(${t.id})">🗑️ Өшіру</button>
        </div>
      </div>
    </div>
  `).join('');
}

function statusLabel(s) {
  return { planned: '🗓 Жоспарланған', active: '🟢 Белсенді', completed: '✅ Аяқталған' }[s] || s;
}

// Modal ашу
function openModal(trip = null) {
  document.getElementById('modal-title').textContent = trip ? 'Сапарды өзгер