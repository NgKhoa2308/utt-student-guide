// Lấy id địa điểm từ URL
function getPlaceId() {
  const params = new URLSearchParams(window.location.search);
  return parseInt(params.get('id')) || 1;
}

// Hiển thị chi tiết địa điểm
function renderDetail() {
  const container = document.getElementById('detailContent');
  if (!container) return;

  const id = getPlaceId();
  const place = PLACES.find(p => p.id === id);

  if (!place) {
    container.innerHTML = `
      <div class="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
        <p class="text-red-700 font-semibold">Không tìm thấy địa điểm</p>
        <a href="index.html" class="text-blue-600 hover:underline text-sm mt-2 inline-block">
          ← Về trang chủ
        </a>
      </div>
    `;
    return;
  }

  const cat = CATEGORIES.find(c => c.id === place.category);

  // Tạo link Google Maps chỉ đường
  const gmapUrl = `https://www.google.com/maps/dir/?api=1&destination=${place.lat},${place.lng}`;

  container.innerHTML = `
    <!-- Breadcrumb -->
    <nav class="text-sm text-gray-500 mb-4">
      <a href="index.html" class="hover:text-blue-600">Trang chủ</a>
      <span class="mx-2">›</span>
      <span>${cat ? cat.name : 'Địa điểm'}</span>
      <span class="mx-2">›</span>
      <span class="text-gray-800 font-semibold">${place.name}</span>
    </nav>

    <!-- Card chính -->
    <div class="bg-white rounded-xl shadow-lg overflow-hidden">
      
      <!-- Header với tên -->
      <div class="p-6 border-b border-gray-100">
        <div class="flex items-start justify-between mb-3">
          <span class="inline-block text-sm bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
            ${cat ? cat.icon + ' ' + cat.name : ''}
          </span>
        </div>
        <h1 class="text-2xl md:text-3xl font-bold text-gray-800 mb-2">${place.name}</h1>
        <p class="text-gray-500">📍 ${place.address}</p>
      </div>

      <!-- Thông tin nhanh -->
      <div class="grid grid-cols-2 md:grid-cols-3 gap-4 p-6 bg-gray-50 border-b border-gray-100">
        <div>
          <p class="text-xs text-gray-500 mb-1">Giá tham khảo</p>
          <p class="text-green-600 font-bold">${place.price}</p>
        </div>
        <div>
          <p class="text-xs text-gray-500 mb-1">Giờ mở cửa</p>
          <p class="text-gray-800 font-semibold">${place.hours}</p>
        </div>
        <div class="col-span-2 md:col-span-1">
          <p class="text-xs text-gray-500 mb-1">Tọa độ</p>
          <p class="text-gray-600 text-sm">${place.lat}, ${place.lng}</p>
        </div>
      </div>

      <!-- Mô tả -->
      <div class="p-6 border-b border-gray-100">
        <h2 class="text-lg font-bold text-gray-800 mb-2">Mô tả</h2>
        <p class="text-gray-600 leading-relaxed">${place.description}</p>
      </div>

      <!-- Bản đồ mini -->
      <div class="p-6 border-b border-gray-100">
        <h2 class="text-lg font-bold text-gray-800 mb-3">Vị trí trên bản đồ</h2>
        <div id="miniMap" style="height: 300px; border-radius: 8px;"></div>
      </div>

      <!-- Nút hành động -->
      <div class="p-6 flex flex-col md:flex-row gap-3">
        <a href="${gmapUrl}" target="_blank" 
           class="flex-1 bg-blue-600 text-white text-center py-3 rounded-lg font-semibold hover:bg-blue-700 transition">
          🧭 Chỉ đường đến đây
        </a>
        <a href="index.html" 
           class="flex-1 bg-gray-200 text-gray-700 text-center py-3 rounded-lg font-semibold hover:bg-gray-300 transition">
          ← Về trang chủ
        </a>
      </div>

    </div>
  `;

  // Vẽ bản đồ mini
  initMiniMap(place);
}

// Vẽ bản đồ mini cho địa điểm
function initMiniMap(place) {
  const mapEl = document.getElementById('miniMap');
  if (!mapEl) return;

  const map = L.map('miniMap').setView([place.lat, place.lng], 17);

  L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {
    attribution: '© Esri',
    maxZoom: 19
  }).addTo(map);

  L.marker([place.lat, place.lng])
    .addTo(map)
    .bindPopup(`<strong>${place.name}</strong>`)
    .openPopup();
}

// Khởi tạo khi trang load
document.addEventListener('DOMContentLoaded', () => {
  renderDetail();
});