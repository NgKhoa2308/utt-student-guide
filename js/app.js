// Hiển thị danh mục
function renderCategories() {
  const grid = document.getElementById('categoriesGrid');
  if (!grid) return;

  grid.innerHTML = CATEGORIES.map(cat => `
    <div class="bg-white rounded-xl p-4 text-center shadow hover:shadow-lg transition cursor-pointer">
      <div class="text-3xl mb-2">${cat.icon}</div>
      <div class="text-sm font-semibold text-gray-700">${cat.name}</div>
    </div>
  `).join('');
}

// Hiển thị địa điểm nổi bật
function renderFeatured() {
  const grid = document.getElementById('featuredGrid');
  if (!grid) return;

  const featured = PLACES.filter(p => p.featured);

  grid.innerHTML = featured.map(place => {
    const cat = CATEGORIES.find(c => c.id === place.category);
    return `
      <a href="detail.html?id=${place.id}" class="block bg-white rounded-xl shadow p-4 hover:shadow-lg transition">
        <span class="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
          ${cat ? cat.icon + ' ' + cat.name : ''}
        </span>
        <h3 class="font-bold text-gray-800 mt-2 mb-1">${place.name}</h3>
        <p class="text-sm text-gray-500 mb-2">${place.description}</p>
        <p class="text-xs text-gray-400 mb-2">📍 ${place.address}</p>
        <div class="flex justify-between text-sm">
          <span class="text-green-600 font-semibold">${place.price}</span>
          <span class="text-gray-400">🕐 ${place.hours}</span>
        </div>
      </a>
    `;
  }).join('');
}

// Vẽ bản đồ (dùng CartoDB thay OSM để tránh bị chặn)
function initMap() {
  const mapEl = document.getElementById('map');
  if (!mapEl) return;

  const map = L.map('map').setView(UTT_LOCATION, 16);

  // Dùng CartoDB Positron - miễn phí, không bị chặn
  L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {
    attribution: '© Esri',
    maxZoom: 19
  }).addTo(map);

  // Marker UTT
  const uttIcon = L.divIcon({
    className: 'utt-marker',
    html: '<div style="background:#2563eb;color:white;padding:6px 10px;border-radius:8px;font-weight:bold;font-size:13px;white-space:nowrap;box-shadow:0 2px 6px rgba(0,0,0,0.3);">🏫 UTT</div>',
    iconSize: [70, 28],
    iconAnchor: [35, 14]
  });
  L.marker(UTT_LOCATION, { icon: uttIcon })
    .addTo(map)
    .bindPopup('<strong>Trường ĐH Giao thông Vận tải</strong><br>54 Triều Khúc, Thanh Xuân, Hà Nội');

  // Marker từng địa điểm
  PLACES.forEach(place => {
    const cat = CATEGORIES.find(c => c.id === place.category);
    L.marker([place.lat, place.lng])
      .addTo(map)
      .bindPopup(`
        <div style="min-width:220px">
          <strong style="font-size:14px">${place.name}</strong><br>
          <small style="color:#666">${cat ? cat.icon + ' ' + cat.name : ''}</small><br>
          <small style="color:#666">📍 ${place.address}</small><br>
          <small style="color:#16a34a;font-weight:bold">${place.price}</small><br>
          <small style="color:#666">🕐 ${place.hours}</small>
        </div>
      `);
  });
}

// Chạy khi trang load xong
document.addEventListener('DOMContentLoaded', () => {
  renderCategories();
  renderFeatured();
  initMap();
});