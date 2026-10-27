# Futurebook Miền Nam — eCard

Trang danh thiếp điện tử của **Khương Bình — Giám sát Kinh doanh**.

- Repo: https://github.com/gustavjung24-ops/kb-info
- Vercel project: `khuongbinh24-info` (`prj_KLgmMUD9tpM7sYf9nTsx7WwIUbvD`)
- Production URL / mã QR cố định: https://khuongbinh24-info.vercel.app/qr-khuong-binh.html
- Nhánh triển khai: `main`

## Cấu trúc nguồn (viết lại từ đầu)

- `qr-khuong-binh.html`: trang eCard hoàn chỉnh, HTML có ngữ nghĩa và hỗ trợ mobile
- `index.html`: chuyển hướng về URL eCard cố định
- `assets/css/ecard.css`: stylesheet DUY NHẤT của giao diện, không kế thừa CSS cũ
- `assets/js/ecard.js`: chức năng chia sẻ eCard và nạp ảnh từ R2
- `assets/files/khuong-binh.vcf`: file lưu danh bạ
- `config/media.json`: cấu hình công khai của R2 bucket `fbmn`; các đường dẫn ảnh đang để trống
- `deploy.cmd`: triển khai từ CMD trên Windows
- `vercel.json`: cấu hình static deployment, chuyển hướng URL cũ

## Lệnh CMD

Clone repo trên máy Windows, mở CMD trong thư mục repo và chạy:

```cmd
deploy.cmd check
deploy.cmd
```

`deploy.cmd` kiểm tra đúng repository và `main`, rồi commit + push GitHub.
Vercel Git Integration tự deploy khi nhận commit mới. Không cần gọi `vercel --prod` trong luồng thông thường.

Nếu cần triển khai thủ công (chỉ khi project đã liên kết đúng):

```cmd
npm i -g vercel
vercel login
vercel link
deploy.cmd manual
```

Script từ chối deploy thủ công nếu `.vercel/project.json` không khớp project ID.

## Ảnh trên Cloudflare R2

Bucket đã xác minh trên tài khoản Cloudflare `khuongbinh.info@gmail.com`:
- Tên bucket: `fbmn`
- Public URL: https://pub-259185b8bdab4d64b5b56f224663bf33.r2.dev/
- `r2PublicBaseUrl` đã cấu hình cố định tại `config/media.json`.
- **Các trường ảnh hiện vẫn để rỗng**, không dùng hình mẫu hay hình từ các website ngoài.

Khi có ảnh thật đã được duyệt:
1. Upload ảnh vào bucket `fbmn` ở đường dẫn phân nhóm (`ecard/avatar.webp`, `ecard/hero.webp`, v.v.).
2. Chỉ cập nhật đường dẫn tương đối tương ứng trong `config/media.json`, ví dụ `images.avatar: "ecard/avatar.webp"`.
3. Commit/push lên nhánh `main`; Git Integration tự cập nhật Vercel.
4. Nếu ảnh lỗi, trang vẫn hiển thị vùng trống đồng bộ. **Không nối thêm CSS hoặc hardcode URL ảnh vào HTML.**

## Liên kết

Nút Gọi / Zalo / Lưu danh bạ đã sử dụng số điện thoại hiện có trong repo cũ: **0902 964 685**. Cần thay số tại HTML và vCard nếu thông tin liên hệ thay đổi.

Website công ty và app chưa được xác minh URL nên hiển thị trạng thái “Đang cập nhật”, không trỏ tới trang giả.
