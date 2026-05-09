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

    // --- 3. Xử lý Tìm Nhanh (Quick Search) ---
    const searchData = [
        {
            group: "Liên hệ nhanh",
            items: [
                { title: "Gọi ngay", keywords: "gọi ngay số điện thoại hotline phone", url: "tel:0902964685", type: "link" },
                { title: "Zalo", keywords: "zalo nhắn tin chat", url: "https://zalo.me/0902964685", type: "link", target: "_blank" },
                { title: "Lưu danh bạ", keywords: "lưu danh bạ vcf contact", url: "assets/files/khuong-binh.vcf", type: "download", download: "khuong-binh.vcf" }
            ]
        },
        {
            group: "Lĩnh vực",
            items: [
                { title: "Quản trị kinh doanh", keywords: "quản trị kinh doanh sales phát triển thị trường", url: "#competencies", type: "scroll" },
                { title: "Ứng Dụng Thông Minh", keywords: "ứng dụng thông minh website app ai giải pháp số", url: "#domains", type: "scroll" },
                { title: "The Hair Lab", keywords: "the hair lab salon tóc mỹ phẩm tóc", url: "#domains", type: "scroll" },
                { title: "Truyền Động Công Nghiệp", keywords: "truyền động công nghiệp phụ tùng mã sản phẩm b2b", url: "#domains", type: "scroll" }
            ]
        },
        {
            group: "Dự án & Công cụ",
            items: [
                { title: "Web salon tóc", keywords: "web salon tóc", url: "#projects", type: "scroll" },
                { title: "Web doanh nghiệp nhỏ", keywords: "web doanh nghiệp nhỏ", url: "#projects", type: "scroll" },
                { title: "QR đặt lịch", keywords: "qr đặt lịch", url: "#projects", type: "scroll" },
                { title: "QR báo giá", keywords: "qr báo giá", url: "#projects", type: "scroll" },
                { title: "App desktop quản lý", keywords: "app desktop quản lý", url: "#projects", type: "scroll" },
                { title: "Tra mã sản phẩm B2B", keywords: "tra mã sản phẩm b2b", url: "#projects", type: "scroll" }
            ]
        },
        {
            group: "Website",
            items: [
                { title: "ungdungthongminh.shop", keywords: "ungdungthongminh.shop", url: "https://ungdungthongminh.shop", type: "link", target: "_blank" },
                { title: "thehairlab.top", keywords: "thehairlab.top", url: "https://thehairlab.top", type: "link", target: "_blank" },
                { title: "truyendongcongnghiep.top", keywords: "truyendongcongnghiep.top", url: "https://truyendongcongnghiep.top", type: "link", target: "_blank" }
            ]
        }
    ];

    const searchTrigger = document.getElementById('search-trigger');
    const searchModal = document.getElementById('search-modal');
    const searchOverlay = document.getElementById('search-overlay');
    const searchClose = document.getElementById('search-close');
    const searchInput = document.getElementById('search-input');
    const searchResults = document.getElementById('search-results');
    const searchEmpty = document.getElementById('search-empty');

    const openSearch = () => {
        searchModal.classList.add('active');
        searchModal.setAttribute('aria-hidden', 'false');
        setTimeout(() => searchInput.focus(), 100);
        renderSearch(searchInput.value);
    };

    const closeSearch = () => {
        searchModal.classList.remove('active');
        searchModal.setAttribute('aria-hidden', 'true');
        searchInput.value = '';
    };

    if (searchTrigger) searchTrigger.addEventListener('click', openSearch);
    if (searchClose) searchClose.addEventListener('click', closeSearch);
    if (searchOverlay) searchOverlay.addEventListener('click', closeSearch);

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && searchModal.classList.contains('active')) {
            closeSearch();
        }
    });

    const normalizeString = (str) => {
        return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
    };

    const renderSearch = (query) => {
        const normalizedQuery = normalizeString(query);
        let hasResults = false;
        searchResults.innerHTML = '';

        searchData.forEach(group => {
            const filteredItems = group.items.filter(item => {
                return normalizeString(item.title).includes(normalizedQuery) || 
                       normalizeString(item.keywords).includes(normalizedQuery);
            });

            if (filteredItems.length > 0) {
                hasResults = true;
                const groupEl = document.createElement('div');
                groupEl.className = 'search-group';
                
                const titleEl = document.createElement('div');
                titleEl.className = 'search-group-title';
                titleEl.textContent = group.group;
                groupEl.appendChild(titleEl);

                filteredItems.forEach(item => {
                    const itemEl = document.createElement('a');
                    itemEl.className = 'search-item';
                    itemEl.href = item.url;
                    
                    if (item.target) itemEl.target = item.target;
                    if (item.download) itemEl.download = item.download;

                    let iconSvg = '';
                    if (item.type === 'link' || item.type === 'download') {
                        iconSvg = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="color: var(--color-muted)"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>`;
                    } else if (item.type === 'scroll') {
                        iconSvg = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="color: var(--color-muted)"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>`;
                    }

                    itemEl.innerHTML = `${iconSvg}<div><div class="search-item-title">${item.title}</div></div>`;

                    if (item.type === 'scroll') {
                        itemEl.addEventListener('click', (e) => {
                            e.preventDefault();
                            closeSearch();
                            const targetId = item.url.substring(1);
                            const targetEl = document.getElementById(targetId);
                            if (targetEl) {
                                const y = targetEl.getBoundingClientRect().top + window.scrollY - 80;
                                window.scrollTo({ top: y, behavior: 'smooth' });
                            }
                        });
                    } else {
                        itemEl.addEventListener('click', closeSearch);
                    }

                    groupEl.appendChild(itemEl);
                });
                searchResults.appendChild(groupEl);
            }
        });

        if (!hasResults && query.trim() !== '') {
            searchEmpty.style.display = 'block';
            searchResults.style.display = 'none';
        } else {
            searchEmpty.style.display = 'none';
            searchResults.style.display = 'block';
        }
    };

    if (searchInput) {
        searchInput.addEventListener('input', (e) => renderSearch(e.target.value));
    }
});