
// สไลด์ภาพหน้าแรก
const slides = document.querySelectorAll(".slide");
const dots = document.querySelectorAll(".slide-dots span");

if (slides.length) {
    let current = 0;

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.style.display = i === index ? "block" : "none";
        });

        dots.forEach((dot, i) => {
            dot.classList.toggle("active", i === index);
        });

        current = index;
    }

    showSlide(0);

    let slideTimer = setInterval(() => {
        showSlide((current + 1) % slides.length);
    }, 3000);

    dots.forEach((dot, i) => {
        dot.addEventListener("click", () => {
            showSlide(i);
            clearInterval(slideTimer);

            slideTimer = setInterval(() => {
                showSlide((current + 1) % slides.length);
            }, 3000);
        });
    });
}


// ระบบสมัครสมาชิก
function registerUser(event) {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    if (!name || !email || !password) {
        alert("กรุณากรอกข้อมูลให้ครบ");
        return;
    }

    localStorage.setItem("travelUser", JSON.stringify({
        name,
        email,
        password
    }));

    alert("สมัครสมาชิกเรียบร้อยแล้ว");
    window.location.href = "login.html";
}


// ระบบเข้าสู่ระบบ
function loginUser(event) {
    event.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    const user = JSON.parse(localStorage.getItem("travelUser") || "null");

    if (user && user.email === email && user.password === password) {
        localStorage.setItem("travelLoggedIn", user.name);

        alert("เข้าสู่ระบบสำเร็จ ยินดีต้อนรับ " + user.name);
        window.location.href = "index.html";
    } else {
        alert("อีเมลหรือรหัสผ่านไม่ถูกต้อง หรือยังไม่ได้สมัครสมาชิก");
    }
}


// ระบบออกจากระบบ
function logoutUser() {
    localStorage.removeItem("travelLoggedIn");

    alert("ออกจากระบบแล้ว");
    window.location.href = "index.html";
}
