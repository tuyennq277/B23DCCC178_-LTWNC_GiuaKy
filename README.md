# B23DCCC178_-LTWNC_GiuaKy

Mini Library là ứng dụng tra cứu và mượn/trả sách dành cho sinh viên, xây dựng bằng React, TypeScript, Redux Toolkit và Zustand.

## Chạy dự án

```powershell
npm.cmd install
npm.cmd run dev
```

Mở địa chỉ Vite hiển thị trong terminal, thường là `http://localhost:5173/`.

## Kiểm thử và build

```powershell
npm.cmd test
npm.cmd run build
```

## Chức năng

- Tải sách từ API giả lập có độ trễ 500ms và xử lý lỗi.
- Tìm kiếm theo tên hoặc tác giả với debounce 300ms, lọc theo thể loại.
- Mượn và trả sách, giới hạn tối đa 3 cuốn cùng lúc.
- Giao diện sáng/tối và trang thống kê tại `/stats`.
