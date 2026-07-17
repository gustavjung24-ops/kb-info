# Checklist hoàn thiện eCard và trang chi tiết

Ngày hoàn thành: 2026-07-17

## Mặt tiền eCard

- [x] Giữ nguyên URL cố định của QR thật: `https://khuongbinh24-info.vercel.app/qr-khuong-binh.html`
- [x] Giữ ba nút chính: Gọi, Zalo, Lưu danh bạ
- [x] Bỏ mục “Liên hệ công việc” bị trùng với nút Zalo
- [x] Bỏ icon trong bốn card liên kết nhanh
- [x] Kéo dài bốn card để ảnh và tiêu đề dễ nhìn hơn
- [x] Thêm ảnh cho F&B, MilkTea QR, MCP-Plan và Automation
- [x] Giữ bố cục cố định theo chiều cao mobile
- [x] Bỏ footer và text giải thích thừa
- [x] Tăng phiên bản CSS để tránh cache cũ
- [x] Map ảnh `map-mat-tien-cảd.png` vào phần trống cuối eCard
- [x] Banner tự giãn theo chiều cao còn lại của màn hình
- [x] Banner mở menu F&B đang chạy khi bấm
- [x] Không thêm text demo lên banner

## Trang chi tiết

- [x] Bỏ câu chữ demo và câu giải thích nội bộ
- [x] Bỏ link “Xem mã nguồn” và mọi link repo khỏi giao diện
- [x] Rút gọn hero còn thông điệp nghề nghiệp
- [x] Thay cụm icon nổi bằng collage ảnh F&B, QR menu và phân phối
- [x] Rút gọn bốn nhóm công việc
- [x] Rút gọn phần MilkTea QR
- [x] Chuyển MCP-Plan và Facebook Automation sang danh sách chức năng
- [x] Rút gọn phần kinh nghiệm
- [x] Chỉ giữ Gọi và Zalo ở phần liên hệ
- [x] Tăng phiên bản CSS/JS để tránh cache cũ

## Kiểm tra cuối

- [x] Không còn “Xem mã nguồn” trên `index.html`
- [x] Không còn link GitHub trên `index.html`
- [x] Không còn mục “Liên hệ công việc” trên `qr-khuong-binh.html`
- [x] Bốn card eCard dùng ảnh thay icon
- [x] QR vẫn mã hóa đúng URL eCard cố định
- [x] Các nút Gọi, Zalo, Lưu danh bạ vẫn giữ đúng liên kết
- [x] Mobile eCard không dùng cuộn trang trong khung chính
- [x] Ảnh banner dùng `object-fit: cover` và không làm biến dạng bố cục
- [x] Màn hình thấp tự giảm chiều cao banner
