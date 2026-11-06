document.addEventListener("DOMContentLoaded", () => {
    // 1. Xử lý Menu Burger cho thiết bị di động
    const burger = document.querySelector(".burger");
    const nav = document.querySelector("nav");

    if (burger && nav) {
        burger.addEventListener("click", () => {
            nav.classList.toggle("open");
        });
    }

    // 2. Xử lý bộ lọc thực đơn (Tabs)
    const filterBtns = document.querySelectorAll(".filters button");
    const cards = document.querySelectorAll(".grid .card");

    if (filterBtns.length > 0 && cards.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener("click", () => {
                // Đổi nút active
                filterBtns.forEach(b => b.classList.remove("on"));
                btn.classList.add("on");

                const category = btn.getAttribute("data-f");

                // Lọc card
                cards.forEach(card => {
                    const cardCat = card.getAttribute("data-cat");
                    if (category === "all" || cardCat === category) {
                        card.style.display = "block";
                    } else {
                        card.style.display = "none";
                    }
                });
            });
        });
    }

    // 3. Xử lý Lightbox (Phóng to ảnh khi click)
    const lb = document.getElementById("lb");
    if (lb) {
        const lbImg = lb.querySelector("img");
        const lbText = lb.querySelector("p");
        const lbClose = lb.querySelector("button");

        // Chọn tất cả các ảnh có thể click để phóng to (trong .card, .ph, .tile)
        const clickableImages = document.querySelectorAll(".card img, .ph img, .tile img");

        clickableImages.forEach(img => {
            // Tránh click nhầm ảnh trong lightbox hoặc icon
            if (img.closest("#lb")) return;

            img.style.cursor = "pointer";
            img.addEventListener("click", (e) => {
                e.preventDefault();
                let imgSrc = img.getAttribute("src");
                let imgAlt = img.getAttribute("alt") || "";

                // Tìm tiêu đề mô tả gần nhất (nếu có)
                let cardParent = img.closest(".card, .tile, figure");
                if (cardParent) {
                    let titleEl = cardParent.querySelector("h3, figcaption");
                    if (titleEl) {
                        imgAlt = titleEl.textContent;
                    }
                }

                if (lbImg) lbImg.setAttribute("src", imgSrc);
                if (lbText) lbText.textContent = imgAlt;
                lb.classList.add("open");
            });
        });

        // Đóng Lightbox khi bấm nút X hoặc click ra nền tối
        const closeLightbox = () => {
            lb.classList.remove("open");
            if (lbImg) lbImg.setAttribute("src", "");
        };

        if (lbClose) lbClose.addEventListener("click", closeLightbox);
        lb.addEventListener("click", (e) => {
            if (e.target === lb) closeLightbox();
        });

        // Đóng bằng phím ESC
        document.addEventListener("keydown", (e) => {
            if (e.key === "Escape") closeLightbox();
        });
    }

    // 4. Xử lý nút cuộn về đầu trang (Back to top)
    const topBtn = document.getElementById("top");
    if (topBtn) {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 300) {
                topBtn.style.display = "block";
            } else {
                topBtn.style.display = "none";
            }
        });

        topBtn.addEventListener("click", () => {
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    }

    // 5. Xử lý kiểm tra form liên hệ đơn giản (nếu có trang liên hệ)
    const contactForm = document.getElementById("contact");
    if (contactForm) {
        contactForm.addEventListener("submit", (e) => {
            e.preventDefault();
            let isValid = true;

            const nameInput = contactForm.querySelector("input[name='name']");
            const emailInput = contactForm.querySelector("input[name='email']");
            const resMsg = document.getElementById("res");

            if (nameInput && nameInput.value.trim() === "") {
                isValid = false;
                let errSpan = contactForm.querySelector(".err[data-for='name']");
                if (errSpan) errSpan.textContent = "Vui lòng nhập họ tên của bạn.";
            }

            if (emailInput && (emailInput.value.trim() === "" || !emailInput.value.includes("@"))) {
                isValid = false;
                let errSpan = contactForm.querySelector(".err[data-for='email']");
                if (errSpan) errSpan.textContent = "Vui lòng nhập email hợp lệ.";
            }

            if (isValid) {
                if (resMsg) {
                    resMsg.textContent = "Gửi tin nhắn thành công! Cảm ơn bạn đã góp ý.";
                }
                contactForm.reset();
            }
        });
    }
});
