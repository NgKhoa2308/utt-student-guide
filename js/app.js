// ============ RENDER DANH MỤC ============
function renderCategories() {
  const grid = document.getElementById('categoriesGrid');
  if (!grid) return;
  const colorMap = {
    'an-uong': 'from-orange-400 to-red-400',
    'in-an': 'from-blue-400 to-cyan-400',
    'sua-chua': 'from-gray-400 to-gray-600',
    'nha-thuoc': 'from-red-400 to-pink-500',
    'cua-hang': 'from-green-400 to-emerald-500',
    'hoc-tap': 'from-purple-400 to-indigo-500',
    'khac': 'from-yellow-400 to-amber-500'
  };
  grid.innerHTML = CATEGORIES.map(cat => {
    const count = PLACES.filter(p => p.category === cat.id).length;
    return `
      <a href="category.html?cat=${cat.id}" class="category-card bg-white rounded-2xl p-5 text-center shadow-md block cursor-pointer">
        <div class="bg-gradient-to-br ${colorMap[cat.id]} w-14 h-14 rounded-2xl mx-auto mb-3 flex items-center justify-center text-2xl shadow-lg">
          ${cat.icon}
        </div>
        <div class="font-bold text-gray-800 mb-1">${cat.name}</div>
        <div class="text-xs text-gray-400">${count} địa điểm</div>
      </a>
    `;
  }).join('');
}

// ============ RENDER ĐỊA ĐIỂM NỔI BẬT ============
function renderFeatured() {
  const grid = document.getElementById('featuredGrid');
  if (!grid) return;
  const featured = PLACES.filter(p => p.featured);
  grid.innerHTML = featured.map(place => {
    const cat = CATEGORIES.find(c => c.id === place.category);
    const catColor = {
      'an-uong': 'bg-orange-100 text-orange-700',
      'in-an': 'bg-blue-100 text-blue-700',
      'sua-chua': 'bg-gray-100 text-gray-700',
      'nha-thuoc': 'bg-red-100 text-red-700',
      'cua-hang': 'bg-green-100 text-green-700',
      'hoc-tap': 'bg-purple-100 text-purple-700',
      'khac': 'bg-yellow-100 text-yellow-700'
    }[place.category] || 'bg-gray-100 text-gray-700';
    return `
      <a href="detail.html?id=${place.id}" class="place-card bg-white rounded-2xl shadow-md overflow-hidden block cursor-pointer">
        <div class="h-32 bg-gradient-to-br from-blue-500 to-purple-600 relative flex items-center justify-center">
          <i class="fas fa-store text-5xl text-white/30"></i>
          ${place.featured ? `<div class="absolute top-3 right-3 bg-yellow-400 text-yellow-900 text-xs font-bold px-2 py-1 rounded-full"><i class="fas fa-star mr-1"></i>Nổi bật</div>` : ''}
        </div>
        <div class="p-5">
          <div class="flex items-start justify-between mb-2">
            <span class="text-xs font-semibold px-2 py-1 rounded-full ${catColor}">${cat ? cat.icon + ' ' + cat.name : ''}</span>
          </div>
          <h3 class="font-bold text-gray-800 text-lg mb-2 line-clamp-1">${place.name}</h3>
          <p class="text-sm text-gray-500 mb-3 line-clamp-2">${place.description}</p>
          <div class="flex items-center text-xs text-gray-400 mb-3">
            <i class="fas fa-map-marker-alt mr-1 text-red-400"></i>
            <span class="line-clamp-1">${place.address}</span>
          </div>
          <div class="flex items-center justify-between pt-3 border-t border-gray-100">
            <span class="text-green-600 font-bold text-sm"><i class="fas fa-tag mr-1"></i>${place.price}</span>
            <span class="text-gray-400 text-xs"><i class="fas fa-clock mr-1"></i>${place.hours}</span>
          </div>
        </div>
      </a>
    `;
  }).join('');
}

// ============ BẢN ĐỒ (CHỈ CÓ NỀN, KHÔNG MARKER) ============
function initMap() {
  const mapEl = document.getElementById('map');
  if (!mapEl) return;

  const map = L.map('map').setView(UTT_LOCATION, 16);

  // 2 lớp bản đồ
  const streetLayer = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {
    attribution: '© Esri',
    maxZoom: 19
  });

  const satelliteLayer = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    attribution: '© Esri',
    maxZoom: 19
  });

  streetLayer.addTo(map);

  // Nút chuyển đổi bản đồ
  L.control.layers({
    '🗺️ Đường phố': streetLayer,
    '🛰️ Vệ tinh': satelliteLayer
  }, null, { position: 'topright' }).addTo(map);

  // Nút "Về UTT"
  const homeControl = L.control({ position: 'topleft' });
  homeControl.onAdd = function() {
    const div = L.DomUtil.create('div', 'leaflet-bar leaflet-control');
    div.innerHTML = `
      <a href="#" title="Về UTT" style="width:34px;height:34px;display:flex;align-items:center;justify-content:center;font-size:16px;text-decoration:none;color:#1e40af;background:white;font-weight:bold;border-radius:4px;">
        🏫
      </a>
    `;
    div.onclick = function(e) {
      e.preventDefault();
      map.setView(UTT_LOCATION, 16);
    };
    return div;
  };
  homeControl.addTo(map);

  // ===============================================
  // KHIÊM SẼ VIẾT CODE MARKER Ở ĐÂY
  // ===============================================
  // Bước 1: Khai báo các marker cho tòa nhà
  // Bước 2: Khai báo marker cho UTT
  // Bước 3: Khai báo marker cho 12 địa điểm từ PLACES
  // Bước 4: Thêm marker vào bản đồ
  // ===============================================
}

// ============ SEARCH ============
function handleSearch() {
  const input = document.getElementById('searchInput');
  const keyword = input.value.trim().toLowerCase();
  if (!keyword) { alert('Vui lòng nhập từ khóa'); return; }
  window.location.href = `category.html?q=${encodeURIComponent(keyword)}`;
}

// ============ KHỞI TẠO ============
document.addEventListener('DOMContentLoaded', () => {
  renderCategories();
  renderFeatured();
  initMap();

  const searchBtn = document.getElementById('searchBtn');
  const searchInput = document.getElementById('searchInput');
  if (searchBtn) searchBtn.addEventListener('click', handleSearch);
  if (searchInput) {
    searchInput.addEventListener('keypress', e => { if (e.key === 'Enter') handleSearch(); });
  }
  document.querySelectorAll('.quick-search').forEach(btn => {
    btn.addEventListener('click', () => {
      window.location.href = `category.html?q=${encodeURIComponent(btn.dataset.keyword)}`;
    });
  });
});