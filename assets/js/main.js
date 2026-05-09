document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Xử lý Carousel Kéo Ngang V3 ---
    // Setup logic chung cho bất kỳ nhóm rail nào có ID điều khiển
    const setupRailNavigation = (trackSelector, prevSelector, nextSelector) => {
        const track = document.querySelector(trackSelector);
        const prevBtns = document.querySelectorAll(prevSelector);
        const nextBtns = document.querySelectorAll(nextSelector);

        if (!track) return;

        // Dùng kích thước phần tử con đầu tiên làm khoảng cuộn chuẩn
        const scrollAmount = track.firstElementChild ? track.firstElementChild.clientWidth + 24 : 300;

        prevBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                track.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
            });
        });

        nextBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                track.scrollBy({ left: scrollAmount, behavior: 'smooth' });
            });
        });
    };

    // Kích hoạt cho Rail Lĩnh vực (trong Hero)
    setupRailNavigation('#domain-rail .rail-track', '.hero-right .prev-btn', '.hero-right .next-btn');
    
    // Kích hoạt cho Rail Dự án
    setupRailNavigation('#projects .rail-track', '#proj-controls .prev-btn', '#proj-controls .next-btn');


    // --- 2. Xử lý Form Gửi Nhu Cầu ---
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault(); // Ngăn chặn tải lại trang
            
            // Lấy dữ liệu demo
            const name = document.getElementById('name').value;
            const service = document.getElementById('service').value;
            
            // Hiển thị thông báo (Alert)
            alert(`Cảm ơn anh/chị ${name}!\n\nThông tin yêu cầu về "${service}" đã được ghi nhận ở bản demo.\n\n(Đây là bản xem trước nội bộ, dữ liệu chưa thực sự được gửi đi).`);
            
            // Reset form
            contactForm.reset();
        });
    }
});