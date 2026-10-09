// ============ STATE ============
let state = {
  category: null,   // 'an-uong' hoặc null
  priceFilter: null, // 'duoi-30', '30-50', 'tren-50' hoặc null
  keyword: ''       // từ khóa tìm kiếm
};

// ============ ĐỌC URL PARAMS ============
function readParams() {
  const params = new URLSearchParams(window.location.search);
  state.category = params.get('cat');
  state.keyword = params.get('q') || '';
  const searchInput = document.getElementById('searchInput');
  if (searchInput) searchInput.value = state.keyword;
}

// ============ CẬP NHẬT TIÊU ĐỀ ============
function updateTitle() {
  const title = document.getElementById('pageTitle');
  const breadcrumb = document.getElementById('breadcrumb');

  if (state.category) {
    const cat = CATEGORIES.find(c => c.id === state.category);
    if (cat) {
      title.textContent = `${cat.icon} ${cat.name}`;
      breadcrumb.textContent = cat.name;
    }
  } else if (state.keyword) {
    title.textContent = `Kết quả tìm kiếm: "${state.keyword}"`;
    breadcrumb.textContent = 'Tìm kiếm';
  } else {
    title.textContent = 'Tất cả địa điểm';
    breadcrumb.textContent = 'Tất cả địa điểm';
  }
}

// ============ LỌC ĐỊA ĐIỂM ============
function getFilteredPlaces() {
  return PLACES.filter(place => {
    // Lọc theo danh mục
    if (state.category && place.category !== state.category) return false;

    // Lọc theo giá
    if (state.priceFilter) {
      const priceNum = extractPrice(place.price);
      if (state.priceFilter === 'duoi-30' && priceNum > 30000) return false;
      if (state.priceFilter === '30-50' && (priceNum < 30000 || priceNum > 50000)) return false;
      if (state.priceFilter === 'tren-50' && priceNum < 50000) return false;
    }

    // Lọc theo từ khóa
    if (state.keyword) {
      const kw = state.keyword.toLowerCase();
      const searchText = `${place.name} ${place.description} ${place.address}`.toLowerCase();
      if (!searchText.includes(kw)) return false;
    }

    return true;
  });
}

// Trích số giá thấp nhất từ chuỗi giá
function extractPrice(priceStr) {
  // VD: "20.000 - 30.000đ" → 20000
  const match = priceStr.replace(/\./g, '').match(/\d+/);
  return match ? parseInt(match[0]) : 0;
}

// ============ RENDER BỘ LỌC DANH MỤC ============
function renderCategoryFilter() {
  const el = document.getElementById('categoryFilter');
  if (!el) return;

  const allBtn = `<button class="filter-btn ${!state.category ? 'active' : ''} px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-700 hover:bg-blue-100 transition" data-cat="">
    Tất cả
  </button>`;

  const catBtns = CATEGORIES.map(cat => `
    <button class="filter-btn ${state.category === cat.id ? 'active' : ''} px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-700 hover:bg-blue-100 transition" data-cat="${cat.id}">
      ${cat.icon} ${cat.name}
    </button>
  `).join('');

  el.innerHTML = allBtn + catBtns;

  el.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      state.category = btn.dataset.cat || null;
      updateTitle();
      renderCategoryFilter();
      renderPlaces();
    });
  });
}

// ============ RENDER BỘ LỌC GIÁ ============
function renderPriceFilter() {
  const el = document.getElementById('priceFilter');
  if (!el) return;

  const options = [
    { id: null, label: 'Tất cả mức giá', icon: '💰' },
    { id: 'duoi-30', label: 'Dưới 30.000đ', icon: '💵' },
    { id: '30-50', label: '30.000 - 50.000đ', icon: '💴' },
    { id: 'tren-50', label: 'Trên 50.000đ', icon: '💸' }
  ];

  el.innerHTML = options.map(opt => `
    <label class="flex items-center gap-2 cursor-pointer text-sm p-2 rounded hover:bg-gray-50">
      <input type="radio" name="price" value="${opt.id || ''}" ${state.priceFilter === opt.id ? 'checked' : ''} class="accent-blue-600">
      <span>${opt.icon} ${opt.label}</span>
    </label>
  `).join('');

  el.querySelectorAll('input[name="price"]').forEach(radio => {
    radio.addEventListener('change', () => {
      state.priceFilter = radio.value || null;
      renderPlaces();
    });
  });
}

// ============ RENDER DANH SÁCH ĐỊA ĐIỂM ============
function renderPlaces() {
  const grid = document.getElementById('placesGrid');
  const empty = document.getElementById('emptyState');
  const count = document.getElementById('resultCount');

  const places = getFilteredPlaces();

  count.textContent = `Tìm thấy ${places.length} địa điểm`;

  if (places.length === 0) {
    grid.innerHTML = '';
    empty.classList.remove('hidden');
    return;
  }

  empty.classList.add('hidden');

  const catColor = {
    'an-uong': 'bg-orange-100 text-orange-700',
    'in-an': 'bg-blue-100 text-blue-700',
    'sua-chua': 'bg-gray-100 text-gray-700',
    'nha-thuoc': 'bg-red-100 text-red-700',
    'cua-hang': 'bg-green-100 text-green-700',
    'hoc-tap': 'bg-purple-100 text-purple-700',
    'khac': 'bg-yellow-100 text-yellow-700'
  };

  grid.innerHTML = places.map(place => {
    const cat = CATEGORIES.find(c => c.id === place.category);
    const color = catColor[place.category] || 'bg-gray-100 text-gray-700';

    return `
      <a href="detail.html?id=${place.id}" class="place-card bg-white rounded-2xl shadow-md overflow-hidden block">
        <div class="h-28 bg-gradient-to-br from-blue-500 to-purple-600 relative flex items-center justify-center">
          <i class="fas fa-store text-5xl text-white/30"></i>
          ${place.featured ? `
            <div class="absolute top-3 right-3 bg-yellow-400 text-yellow-900 text-xs font-bold px-2 py-1 rounded-full">
              <i class="fas fa-star mr-1"></i>Nổi bật
            </div>
          ` : ''}
        </div>
        <div class="p-4">
          <span class="inline-block text-xs font-semibold px-2 py-1 rounded-full ${color} mb-2">
            ${cat ? cat.icon + ' ' + cat.name : ''}
          </span>
          <h3 class="font-bold text-gray-800 mb-1 line-clamp-1">${place.name}</h3>
          <p class="text-sm text-gray-500 mb-2 line-clamp-2">${place.description}</p>
          <div class="flex items-center text-xs text-gray-400 mb-2">
            <i class="fas fa-map-marker-alt mr-1 text-red-400"></i>
            <span class="line-clamp-1">${place.address}</span>
          </div>
          <div class="flex items-center justify-between pt-2 border-t border-gray-100">
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

// ============ XỬ LÝ SỰ KIỆN ============
function handleSearch() {
  const input = document.getElementById('searchInput');
  state.keyword = input.value.trim();
  updateTitle();
  renderPlaces();
}

// ============ KHỞI TẠO ============
document.addEventListener('DOMContentLoaded', () => {
  readParams();
  updateTitle();
  renderCategoryFilter();
  renderPriceFilter();
  renderPlaces();

  const searchBtn = document.getElementById('searchBtn');
  const searchInput = document.getElementById('searchInput');
  if (searchBtn) searchBtn.addEventListener('click', handleSearch);
  if (searchInput) {
    searchInput.addEventListener('keypress', e => { if (e.key === 'Enter') handleSearch(); });
  }

  // Reset filter
  const resetBtn = document.getElementById('resetFilter');
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      state = { category: null, priceFilter: null, keyword: '' };
      document.getElementById('searchInput').value = '';
      updateTitle();
      renderCategoryFilter();
      renderPriceFilter();
      renderPlaces();
    });
  }

  // Clear search từ empty state
  const clearBtn = document.getElementById('clearSearch');
  if (clearBtn) {
    clearBtn.addEventListener('click', () => document.getElementById('resetFilter').click());
  }
});