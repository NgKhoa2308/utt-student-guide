// Tọa độ trường UTT Hà Nội: 54 Triều Khúc, Thanh Xuân Nam, Thanh Xuân, Hà Nội
const UTT_LOCATION = [20.9809, 105.8016];

const CATEGORIES = [
  { id: 'an-uong', name: 'Ăn uống', icon: '🍜' },
  { id: 'in-an', name: 'In ấn', icon: '🖨️' },
  { id: 'sua-chua', name: 'Sửa chữa', icon: '🔧' },
  { id: 'nha-thuoc', name: 'Nhà thuốc', icon: '💊' },
  { id: 'cua-hang', name: 'Cửa hàng', icon: '🛒' },
  { id: 'hoc-tap', name: 'Học tập', icon: '📚' },
  { id: 'khac', name: 'Khác', icon: '🏪' }
];

const PLACES = [
  {
    id: 1,
    name: 'Quán Cơm Sinh Viên Triều Khúc',
    category: 'an-uong',
    address: 'Ngõ 54 Triều Khúc, Thanh Xuân Nam, Hà Nội',
    price: '20.000 - 30.000đ',
    hours: '10:00 - 21:00',
    lat: 20.9815,
    lng: 105.8025,
    description: 'Quán cơm bình dân giá rẻ, phù hợp sinh viên. Cơm đầy đủ, canh miễn phí. Rất đông vào giờ trưa.',
    featured: true
  },
  {
    id: 2,
    name: 'Photocopy Triều Khúc',
    category: 'in-an',
    address: 'Số 12 Triều Khúc, Thanh Xuân Nam, Hà Nội',
    price: '500đ/trang A4',
    hours: '7:00 - 21:00',
    lat: 20.9805,
    lng: 105.8010,
    description: 'In tài liệu, photocopy, đóng quyển, in màu. Phục vụ nhanh, giá sinh viên. Có máy in laser.',
    featured: true
  },
  {
    id: 3,
    name: 'Nhà thuốc Long Châu',
    category: 'nha-thuoc',
    address: 'Số 88 Triều Khúc, Thanh Xuân Nam, Hà Nội',
    price: 'Tùy loại thuốc',
    hours: '7:00 - 22:00',
    lat: 20.9795,
    lng: 105.8015,
    description: 'Nhà thuốc chuỗi uy tín, có dược sĩ tư vấn. Đầy đủ các loại thuốc thông dụng.',
    featured: true
  },
  {
    id: 4,
    name: 'Cafe Study Corner',
    category: 'hoc-tap',
    address: 'Ngõ 165 Triều Khúc, Thanh Xuân Nam, Hà Nội',
    price: '25.000 - 45.000đ',
    hours: '7:00 - 23:00',
    lat: 20.9825,
    lng: 105.8035,
    description: 'Không gian yên tĩnh, wifi mạnh, nhiều ổ cắm điện. Phù hợp học nhóm, làm bài tập. Có máy lạnh.',
    featured: true
  },
  {
    id: 5,
    name: 'Circle K Triều Khúc',
    category: 'cua-hang',
    address: 'Số 45 Triều Khúc, Thanh Xuân Nam, Hà Nội',
    price: 'Tùy sản phẩm',
    hours: '24/7',
    lat: 20.9800,
    lng: 105.8012,
    description: 'Cửa hàng tiện lợi mở 24/7. Có đồ ăn nhanh, nước uống, đồ dùng học tập.',
    featured: true
  },
  {
    id: 6,
    name: 'Sửa xe Thanh Tùng',
    category: 'sua-chua',
    address: 'Số 20 Triều Khúc, Thanh Xuân Nam, Hà Nội',
    price: '20.000 - 100.000đ',
    hours: '7:00 - 20:00',
    lat: 20.9802,
    lng: 105.8008,
    description: 'Sửa xe đạp, xe máy, xe điện. Vá săm 20k, thay săm 60k, sửa phanh 50k. Có bơm miễn phí.',
    featured: false
  },
  {
    id: 7,
    name: 'Quán Bún Chả Hà Nội',
    category: 'an-uong',
    address: 'Ngõ 132 Triều Khúc, Thanh Xuân Nam, Hà Nội',
    price: '25.000 - 40.000đ',
    hours: '10:00 - 20:00',
    lat: 20.9820,
    lng: 105.8028,
    description: 'Bún chả, bún nem chuẩn vị Hà Nội. Nước chấm ngon, thịt nướng thơm. Đông khách buổi trưa.',
    featured: false
  },
  {
    id: 8,
    name: 'Photocopy Ngọc Hà',
    category: 'in-an',
    address: 'Số 156 Triều Khúc, Thanh Xuân Nam, Hà Nội',
    price: '400đ/trang đen trắng',
    hours: '8:00 - 22:00',
    lat: 20.9828,
    lng: 105.8040,
    description: 'Chuyên in luận văn, đóng quyển, in bìa. Có nhận in qua Zalo, đến lấy. Giá rẻ nhất khu vực.',
    featured: false
  },
  {
    id: 9,
    name: 'Phở Bò 24h Triều Khúc',
    category: 'an-uong',
    address: 'Số 200 Triều Khúc, Thanh Xuân Nam, Hà Nội',
    price: '30.000 - 50.000đ',
    hours: '6:00 - 23:00',
    lat: 20.9832,
    lng: 105.8045,
    description: 'Phở bò, phở gà mở cả ngày. Nước dùng đậm đà, bánh phở tươi. Đông khách buổi sáng và đêm.',
    featured: false
  },
  {
    id: 10,
    name: 'Nhà thuốc Pharmacity',
    category: 'nha-thuoc',
    address: 'Số 240 Nguyễn Trãi, Thanh Xuân, Hà Nội',
    price: 'Tùy loại thuốc',
    hours: '7:00 - 23:00',
    lat: 20.9790,
    lng: 105.7995,
    description: 'Chuỗi nhà thuốc lớn, uy tín. Có app tích điểm, giao hàng tận nơi.',
    featured: false
  },
  {
    id: 11,
    name: 'Cơm Rang Dưa Bò',
    category: 'an-uong',
    address: 'Ngõ 165 Triều Khúc, Thanh Xuân Nam, Hà Nội',
    price: '25.000 - 35.000đ',
    hours: '10:00 - 22:00',
    lat: 20.9822,
    lng: 105.8032,
    description: 'Cơm rang dưa bò, cơm rang thập cẩm. Ngon, rẻ, đầy đặn. Có bán mang về.',
    featured: false
  },
  {
    id: 12,
    name: 'WinMart+ Triều Khúc',
    category: 'cua-hang',
    address: 'Số 60 Triều Khúc, Thanh Xuân Nam, Hà Nội',
    price: 'Tùy sản phẩm',
    hours: '6:00 - 23:00',
    lat: 20.9808,
    lng: 105.8018,
    description: 'Siêu thị mini, có đầy đủ đồ ăn, nước uống, bánh kẹo. Giá cả hợp lý.',
    featured: false
  }
];