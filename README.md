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

## Mobile / logo chính thức

Logo FBMN tải trực tiếp từ R2 `https://pub-259185b8bdab4d64b5b56f224663bf33.r2.dev/ecard/brand/fbmn-logo.webp` bằng thẻ `img` trong HTML, không phụ thuộc tải `media.json` hoặc JavaScript. Sáu chức năng chỉ có tiêu đề, không subtitle; trên mobile hiển thị hai cột. Bốn lĩnh vực hiển thị hai cột, ảnh lớn hơn vùng chữ, không có mô tả phụ. Breakpoint chỉnh ngay trong stylesheet chính, không dùng CSS đè.

## Cập nhật ghi chú thiết kế 27/10/2026

- Card chức năng: Website / Order / Sản phẩm / Báo giá / Khách hàng / Đặt lịch.
- Không hiện mô tả phụ ở cả 6 card, tránh card cao.
- Card lĩnh vực: ảnh có tỷ lệ khung cố định 1.65:1 trên mobile, chú thích chỉ có biểu tượng và tên.
- Logo chính thức được lấy trực tiếp bằng URL từ R2 trong HTML, để không bị mất khi lỗi script hoặc media.json.
- Các đường dẫn chưa xác minh (Website/Order/Sản phẩm) giữ trạng thái không thể bấm; không tạo URL giả.

## Avatar mặc định nhân sự (27/10/2026)

- Logo FBMN chuẩn (SVG vector 512 × 512, được dựng từ logo anh cung cấp): `ecard/profile/avatar-default-fbmn-v1.svg`, trên bucket R2 `fbmn`.
- `config/media.json` có `defaultAvatar`; JS tự dùng file này cho avatar nhân viên chưa có ảnh riêng hoặc khi ảnh cá nhân bị lỗi tải.
- Ảnh cá nhân (`images.avatar` với anh Bình) vẫn ưu tiên và không bị ghi đè.
- ECard Nguyễn Thị Diễm My có `images.avatarMy` trống nên dùng logo FBMN mặc định; không dùng avatar DM nữa.
- Nhân viên mới có thể đặt `data-media="avatarTen"` và để ảnh tương ứng trống trong `images` để dùng ảnh chung; khi có ảnh thật, chỉ điền đường dẫn R2 vào `images.avatarTen`.
