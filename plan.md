# Kế Hoạch Triển Khai: Smart Profile Khương Bình

## 1. Tình trạng thư mục hiện tại
- Thư mục chỉ chứa 1 file duy nhất: `avatar.jpg`.
- Chưa có framework, mã nguồn hay file cấu hình nào khác.

## 2. Quyết định công nghệ
- Sử dụng **HTML / CSS / JS thuần**.
- Lý do: Đáp ứng tốt yêu cầu nhẹ, gọn, nhanh, không phụ thuộc thư viện nặng, không cần cài đặt Node.js hay các build tools, phù hợp để tạo một "Smart Profile" sang trọng và mượt mà trên môi trường local.

## 3. Đề xuất cấu trúc thư mục & file
```text
f:\1_A_Disk_D\Khương Bình\E-name-card\
│
├── index.html                 # Trang chính chứa toàn bộ nội dung
│
└── assets/
    ├── css/
    │   └── style.css          # Style CSS tùy chỉnh (màu sắc, layout, typography)
    │
    ├── js/
    │   └── main.js            # Script xử lý kéo ngang (carousel), nút mobile bar, form...
    │
    ├── images/
    │   ├── avatar.jpg         # (Sẽ di chuyển avatar hiện tại vào đây)
    │   ├── ecosystem-ungdungthongminh.jpg  # Placeholder
    │   ├── ecosystem-hairlab.jpg           # Placeholder
    │   ├── ecosystem-congnghiep.jpg        # Placeholder
    │   └── project-placeholder.jpg         # Placeholder chung cho dự án
    │
    └── files/
        └── khuong-binh.vcf    # File danh bạ vCard để lưu nhanh
```

## 4. Danh sách các file dự kiến tạo mới
1. `index.html`
2. `assets/css/style.css`
3. `assets/js/main.js`
4. `assets/files/khuong-binh.vcf` (File text định dạng vCard)

## 5. Hướng dẫn chạy Preview Local
- Sau khi hoàn thành code, tôi sẽ cung cấp cho bạn một lệnh tạo server cục bộ đơn giản bằng Python (hoặc Node.js nếu có sẵn), hoặc bạn chỉ cần **click đúp vào file `index.html`** để mở thẳng bằng trình duyệt (Chrome/Edge/Safari).
- Nếu muốn xem bằng tính năng Preview của Gemini CLI, tôi sẽ hướng dẫn chi tiết khi code xong.

## 6. Các dữ liệu / Placeholder cần bạn bổ sung sau
- **Link Zalo:** Hiện tại sẽ để `#` tạm thời.
- **Hình ảnh các lĩnh vực & dự án:** Tôi sẽ thiết lập các ô xám placeholder kèm kích thước khuyên dùng, bạn sẽ thay thế ảnh thật sau.
- **File vCard (Nâng cao):** Tôi sẽ tạo một file `.vcf` cơ bản, bạn có thể kiểm tra lại thông tin sau.

## 7. Đánh giá rủi ro & Điểm cần lưu ý
- **Không có backend:** Form "Gửi nhu cầu" chỉ mô phỏng thao tác trên giao diện, dữ liệu sẽ không được gửi đi đâu. Để form hoạt động thật trong tương lai, cần tích hợp với Google Forms, EmailJS hoặc một API backend nhỏ.
- **Trải nghiệm Mobile Local:** Mở file `index.html` trực tiếp trên máy tính sẽ hiển thị bản Desktop. Để xem chuẩn Mobile, bạn cần mở DevTools (F12) trên trình duyệt và chọn chế độ Mobile view.

---
**Trạng thái:** Đang chờ người dùng duyệt để bắt đầu code.
