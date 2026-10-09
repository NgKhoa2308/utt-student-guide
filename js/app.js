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
    // Đếm số địa điểm trong danh mục này
    const count = PLACES.filter(p => p.category === cat.id).length;
    return `
      <a href="category.html?cat=${cat.id}" 
         class="category-card bg-white rounded-2xl p-5 text-center shadow-md block cursor-pointer">
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
      <a href="detail.html?id=${place.id}" 
         class="place-card bg-white rounded-2xl shadow-md overflow-hidden block cursor-pointer">
        <!-- Placeholder ảnh -->
        <div class="h-32 bg-gradient-to-br from-blue-500 to-purple-600 relative flex items-center justify-center">
          <i class="fas fa-store text-5xl text-white/30"></i>
          <div class="absolute top-3 right-3 bg-yellow-400 text-yellow-900 text-xs font-bold px-2 py-1 rounded-full">
            <i class="fas fa-star mr-1"></i>Nổi bật
          </div>
        </div>
        <div class="p-5">
          <div class="flex items-start justify-between mb-2">
            <span class="text-xs font-semibold px-2 py-1 rounded-full ${catColor}">
              ${cat ? cat.icon + ' ' + cat.name : ''}
            </span>
          </div>
          <h3 class="font-bold text-gray-800 text-lg mb-2 line-clamp-1">${place.name}</h3>
          <p class="text-sm text-gray-500 mb-3 line-clamp-2">${place.description}</p>
          <div class="flex items-center text-xs text-gray-400 mb-3">
            <i class="fas fa-map-marker-alt mr-1 text-red-400"></i>
            <span class="line-clamp-1">${place.address}</span>
          </div>
          <div class="flex items-center justify-between pt-3 border-t border-gray-100">
            <span class="text-green-600 font-bold text-sm">
              <i class="fas fa-tag mr-1"></i>${place.price}
            </span>
            <span class="text-gray-400 text-xs">
              <i class="fas fa-clock mr-1"></i>${place.hours}
            </span>
          </div>
        </div>
      </a>
    `;
  }).join('');
}

// ============ BẢN ĐỒ ============
// ============ BẢN ĐỒ ============
function initMap() {
  const mapEl = document.getElementById('map');
  if (!mapEl) return;

  const map = L.map('map').setView(UTT_LOCATION, 15);

  L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {
    attribution: '© Esri',
    maxZoom: 19
  }).addTo(map);

  // ===== MARKER UTT =====
  const uttIcon = L.divIcon({
    className: 'utt-marker',
    html: `
      <div style="background:linear-gradient(135deg,#1e40af,#3b82f6);color:white;padding:8px 12px;border-radius:10px;font-weight:bold;font-size:13px;white-space:nowrap;box-shadow:0 4px 12px rgba(30,64,175,0.4);border:2px solid white;">
        <i class='fas fa-university'></i> UTT
      </div>
    `,
    iconSize: [80, 32],
    iconAnchor: [40, 16]
  });
  L.marker(UTT_LOCATION, { icon: uttIcon })
    .addTo(map)
    .bindPopup(`
      <div style="padding:4px">
        <strong style="color:#1e40af"><i class='fas fa-university'></i> Trường ĐH Giao thông Vận tải</strong><br>
        <small style="color:#666">54 Triều Khúc, Thanh Xuân, Hà Nội</small>
      </div>
    `);

  // ===== NHIỆM VỤ 3: GOM MARKER BẰNG MARKERCLUSTER =====
  const markers = L.markerClusterGroup({
    showCoverageOnHover: false,
    maxClusterRadius: 50,
    spiderfyOnMaxZoom: true,
    iconCreateFunction: function(cluster) {
      const count = cluster.getChildCount();
      return L.divIcon({
        html: `
          <div style="background:linear-gradient(135deg,#1e40af,#3b82f6);color:white;width:44px;height:44px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:bold;font-size:16px;border:3px solid white;box-shadow:0 4px 12px rgba(30,64,175,0.4);">
            ${count}
          </div>
        `,
        className: 'custom-cluster',
        iconSize: [44, 44]
      });
    }
  });

  // ===== VẼ MARKER CHO TỪNG ĐỊA ĐIỂM =====
  PLACES.forEach(place => {
    const cat = CATEGORIES.find(c => c.id === place.category);
    const gmapUrl = `https://www.google.com/maps/dir/?api=1&destination=${place.lat},${place.lng}`;

    const placeIcon = L.divIcon({
      className: 'place-marker',
      html: `
        <div style="background:#ef4444;width:32px;height:32px;border-radius:50% 50% 50% 0;transform:rotate(-45deg);box-shadow:0 3px 8px rgba(0,0,0,0.3);border:2px solid white;display:flex;align-items:center;justify-content:center;">
          <span style="transform:rotate(45deg);font-size:12px;color:white;">${cat ? cat.icon : '📍'}</span>
        </div>
      `,
      iconSize: [32, 32],
      iconAnchor: [16, 32],
      popupAnchor: [0, -32]
    });

    const marker = L.marker([place.lat, place.lng], { icon: placeIcon })
      .bindPopup(`
        <div style="min-width:220px;font-family:'Segoe UI',sans-serif;">
          <div style="font-size:15px;font-weight:bold;color:#1e40af;margin-bottom:6px;">${place.name}</div>
          <div style="font-size:12px;color:#666;margin-bottom:4px;">
            <i style="color:#ef4444">📍</i> ${place.address}
          </div>
          <div style="font-size:13px;color:#16a34a;font-weight:bold;margin-bottom:4px;">
            💰 ${place.price}
          </div>
          <div style="font-size:12px;color:#666;margin-bottom:8px;">
            🕐 ${place.hours}
          </div>
          <div style="display:flex;gap:6px;">
            <a href="detail.html?id=${place.id}" style="flex:1;text-align:center;background:#3b82f6;color:white;padding:6px;border-radius:6px;text-decoration:none;font-size:12px;font-weight:bold;">Chi tiết</a>
            <a href="${gmapUrl}" target="_blank" style="flex:1;text-align:center;background:#16a34a;color:white;padding:6px;border-radius:6px;text-decoration:none;font-size:12px;font-weight:bold;">Chỉ đường</a>
          </div>
        </div>
      `);

    markers.addLayer(marker);
  });

  // Đặt cụm marker lên bản đồ
  map.addLayer(markers);

  // ===== NHIỆM VỤ 4: NÚT "VỀ UTT" TRÊN BẢN ĐỒ =====
  const homeControl = L.control({ position: 'topleft' });
  homeControl.onAdd = function() {
    const div = L.DomUtil.create('div', 'leaflet-bar leaflet-control');
    div.innerHTML = `
      <a href="#" title="Về UTT" 
         style="width:34px;height:34px;display:flex;align-items:center;justify-content:center;font-size:16px;text-decoration:none;color:#1e40af;background:white;font-weight:bold;border-radius:4px;">
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

  // Menu mobile
  const menuBtn = document.getElementById('menuBtn');
  if (menuBtn) menuBtn.addEventListener('click', () => alert('Menu mobile sẽ được bổ sung sau'));
});