const API = 'https://travel-management-system-trgd.onrender.com/api';
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
  document.getElementById('modal-title').textContent = trip ? 'Сапарды өзгерту' : 'Жаңа сапар қосу';
  document.getElementById('trip-id').value = trip?.id || '';
  document.getElementById('trip-title').value = trip?.title || '';
  document.getElementById('trip-country').value = trip?.country || '';
  document.getElementById('trip-city').value = trip?.city || '';
  document.getElementById('trip-price').value = trip?.price || '';
  document.getElementById('trip-duration').value = trip?.duration || '';
  document.getElementById('trip-start').value = trip?.start_date?.split('T')[0] || '';
  document.getElementById('trip-end').value = trip?.end_date?.split('T')[0] || '';
  document.getElementById('trip-desc').value = trip?.description || '';
  document.getElementById('trip-includes').value = trip?.includes || '';
  document.getElementById('trip-image').value = trip?.image_url || '';
  document.getElementById('modal-error').textContent = '';
  document.getElementById('modal').classList.add('show');
}

function closeModal() {
  document.getElementById('modal').classList.remove('show');
}

// Сапар сақтау
async function saveTrip() {
  const id = document.getElementById('trip-id').value;
  const body = {
    title: document.getElementById('trip-title').value,
    country: document.getElementById('trip-country').value,
    city: document.getElementById('trip-city').value,
    price: document.getElementById('trip-price').value,
    duration: document.getElementById('trip-duration').value,
    start_date: document.getElementById('trip-start').value,
    end_date: document.getElementById('trip-end').value,
    description: document.getElementById('trip-desc').value,
    includes: document.getElementById('trip-includes').value,
    image_url: document.getElementById('trip-image').value,
  };

  try {
    const res = await fetch(`${API}/trips${id ? '/'+id : ''}`, {
      method: id ? 'PUT' : 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getToken()}`
      },
      body: JSON.stringify(body)
    });
    const data = await res.json();
    if (!data.success) {
      document.getElementById('modal-error').textContent = 
        data.error || data.errors?.[0]?.message || 'Қате болды';
      return;
    }
    closeModal();
    loadTrips();
  } catch {
    document.getElementById('modal-error').textContent = 'Сервермен байланыс жоқ';
  }
}

// Сапар өзгерту
async function editTrip(id) {
  const res = await fetch(`${API}/trips/${id}`, {
    headers: { 'Authorization': `Bearer ${getToken()}` }
  });
  const data = await res.json();
  if (data.success) openModal(data.data);
}

// Сапар өшіру
async function deleteTrip(id) {
  if (!confirm('Сапарды өшіресіз бе?')) return;
  await fetch(`${API}/trips/${id}`, {
    method: 'DELETE',
    headers: { 'Authorization': `Bearer ${getToken()}` }
  });
  loadTrips();
}

// Шығу
function logout() {
  localStorage.clear();
  window.location.href = 'login.html';
}

// Бет жүктелгенде
window.onload = loadTrips;