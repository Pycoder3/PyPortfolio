// تأثير الكتابة
const typedTextSpan = document.querySelector(".typing-text");
const textArray = ["تطوير الويب", "تطبيقات سطح المكتب", "المونتاج", "العروض التقديمية"];
const typingDelay = 200;
const erasingDelay = 100;
const newTextDelay = 2000;
let textArrayIndex = 0;
let charIndex = 0;

function type() {
    if (charIndex < textArray[textArrayIndex].length) {
        typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
        charIndex++;
        setTimeout(type, typingDelay);
    } else {
        setTimeout(erase, newTextDelay);
    }
}

function erase() {
    if (charIndex > 0) {
        typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex-1);
        charIndex--;
        setTimeout(erase, erasingDelay);
    } else {
        textArrayIndex++;
        if(textArrayIndex>=textArray.length) textArrayIndex=0;
        setTimeout(type, typingDelay + 1100);
    }
}

document.addEventListener("DOMContentLoaded", function() {
    setTimeout(type, newTextDelay + 250);
});

// تغيير لون شريط التنقل عند التمرير
window.addEventListener("scroll", function() {
    const header = document.querySelector("header");
    header.classList.toggle("sticky", window.scrollY > 0);
});

// إضافة تأثير التمرير السلس
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// فلترة المشاريع
const filterBtns = document.querySelectorAll('.filter-btn');
const projectBoxes = document.querySelectorAll('.project-box');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // إزالة التنشيط من جميع الأزرار
        filterBtns.forEach(btn => btn.classList.remove('active'));
        // تنشيط الزر المحدد
        btn.classList.add('active');
        
        const filter = btn.getAttribute('data-filter');
        
        projectBoxes.forEach(box => {
            if (filter === 'all' || box.getAttribute('data-category') === filter) {
                box.style.display = 'block';
            } else {
                box.style.display = 'none';
            }
        });
    });
});

// إدارة نافذة إضافة مشروع
const modal = document.getElementById('project-modal');
const addProjectBtn = document.getElementById('add-project-btn');
const closeBtn = document.querySelector('.close-btn');
const addProjectForm = document.getElementById('add-project-form');

addProjectBtn.addEventListener('click', () => {
    modal.style.display = 'flex';
});

closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
});

window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});

addProjectForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('project-name').value;
    const category = document.getElementById('project-category').value;
    const desc = document.getElementById('project-desc').value;
    const link = document.getElementById('project-link').value;
    const imageFile = document.getElementById('project-image').files[0];
    
    // هنا يمكنك إضافة الكود لإرسال البيانات إلى الخادم أو معالجتها
    console.log({name, category, desc, link, imageFile});
    
    // إنشاء عنصر المشروع الجديد
    const projectsContainer = document.querySelector('.projects-container');
    const newProject = document.createElement('div');
    newProject.className = 'project-box';
    newProject.setAttribute('data-category', category);
    
    let imageSrc = 'placeholder.jpg'; // صورة افتراضية
    if (imageFile) {
        // إذا تم تحميل صورة، يمكنك استخدام URL.createObjectURL لعرضها
        imageSrc = URL.createObjectURL(imageFile);
    }
    
    newProject.innerHTML = `
        <img src="${imageSrc}" alt="${name}">
        <div class="project-layer">
            <h4>${name}</h4>
            <p>${desc}</p>
            ${link ? `<a href="${link}" target="_blank"><i class="fas fa-external-link-alt"></i></a>` : ''}
        </div>
    `;
    
    projectsContainer.appendChild(newProject);
    
    // إغلاق النافذة وإعادة تعيين النموذج
    modal.style.display = 'none';
    addProjectForm.reset();
    
    // إضافة حدث hover للمشروع الجديد
    newProject.addEventListener('mouseenter', () => {
        newProject.querySelector('.project-layer').style.transform = 'translateY(0)';
    });
    
    newProject.addEventListener('mouseleave', () => {
        newProject.querySelector('.project-layer').style.transform = 'translateY(100%)';
    });
    
    alert('تمت إضافة المشروع بنجاح!');
});