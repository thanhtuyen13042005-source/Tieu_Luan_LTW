// Hàm rút gọn để chọn phần tử trên trang
const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

/* 1. Menu hamburger trên điện thoại */
const burger = $(".burger");
if (burger) {
    burger.onclick = () => {
        const nav = $("nav");
        if (nav) nav.classList.toggle("open");
    };
}

/* 2. Nút trở về đầu trang (hiện khi cuộn xuống quá 400px) */
const upButton = $("#top");
if (upButton) {
    addEventListener("scroll", () => {
        upButton.style.display = scrollY > 400 ? "block" : "none";
    });

    upButton.onclick = () => {
        scrollTo({ top: 0, behavior: "smooth" });
    };
}

/* 3. Lọc thực đơn theo nhóm món */
const filterButtons = $$(".filters button");
if (filterButtons.length > 0) {
    filterButtons.forEach((button) => {
        button.onclick = () => {
            // Đổi màu nút đang chọn
            filterButtons.forEach((b) => {
                b.classList.toggle("on", b === button);
            });

            // Ẩn hoặc hiện từng thẻ món
            $$(".card[data-cat]").forEach((card) => {
                const show = button.dataset.f === "all" || card.dataset.cat === button.dataset.f;
                card.hidden = !show;
            });
        };
    });
}

/* 4. Xem ảnh lớn ở trang Không gian (lightbox) */
const lightbox = $("#lb");
if (lightbox) {
    $$(".tile").forEach((tile) => {
        tile.onclick = () => {
            const photo = $("img", tile);
            const lbImg = $("img", lightbox);
            const lbText = $("p", lightbox);
            const figcaption = $("figcaption", tile);

            if (photo && lbImg) {
                lbImg.src = photo.src;
                lbImg.alt = photo.alt;
            }
            if (lbText && figcaption) {
                lbText.textContent = figcaption.textContent;
            }
            lightbox.classList.add("open");
        };
    });

    // Nhấn ra nền hoặc nút × để đóng
    lightbox.onclick = (e) => {
        if (e.target === lightbox || e.target.tagName === "BUTTON") {
            lightbox.classList.remove("open");
        }
    };

    // Nhấn phím Esc để đóng
    addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
            lightbox.classList.remove("open");
        }
    });
}

/* 5. Kiểm tra biểu mẫu liên hệ */
const form = $("#contact");
if (form) {
    // Mỗi quy tắc trả về true nếu hợp lệ, hoặc câu thông báo lỗi
    const rules = {
        name: (v) => v.trim().length >= 2 || "Nhập họ tên (ít nhất 2 ký tự).",
        email: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) || "Email chưa đúng định dạng, ví dụ ten@email.com.",
        phone: (v) => /^(0|\+84)\d{9}$/.test(v.replace(/\s/g, "")) || "Số điện thoại gồm 10 số, bắt đầu bằng 0.",
        msg: (v) => v.trim().length >= 10 || "Nội dung cần ít nhất 10 ký tự."
    };

    form.onsubmit = (e) => {
        e.preventDefault();
        let valid = true;

        for (const field in rules) {
            const inputElem = form.elements[field];
            const errElem = $(`.err[data-for=${field}]`);
            
            if (inputElem && errElem) {
                const result = rules[field](inputElem.value);
                errElem.textContent = result === true ? "" : result;
                if (result !== true) valid = false;
            }
        }

        const resElem = $("#res");
        if (resElem) {
            resElem.textContent = valid ? "Đã gửi! Quán sẽ phản hồi bạn sớm nhất." : "";
        }
        if (valid) form.reset();
    };
} 
