document.addEventListener('DOMContentLoaded', function() {
    console.log('JavaScript loaded');
    
    // 测试微信链接是否存在
    const wechatLink = document.getElementById('wechatLink');
    console.log('Wechat link:', wechatLink);

    // 照片轮播功能
    const carousel = document.querySelector('.carousel-container');
    const images = carousel.querySelectorAll('img');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    let currentIndex = 0;

    // 设置初始位置
    carousel.style.transform = 'translateX(0)';

    function showImage(index) {
        // 使用百分比移动
        carousel.style.transform = `translateX(-${index * 100}%)`;
        currentIndex = index;
        updateDots();
    }

    // 添加过渡效果
    carousel.style.transition = 'transform 0.5s ease-in-out';

    // 创建轮播点
    const dotsContainer = document.querySelector('.carousel-dots');
    images.forEach((_, index) => {
        const dot = document.createElement('span');
        dot.classList.add('dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => showImage(index));
        dotsContainer.appendChild(dot);
    });

    function updateDots() {
        document.querySelectorAll('.dot').forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }

    prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        showImage(currentIndex);
    });

    nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % images.length;
        showImage(currentIndex);
    });

    // 平滑滚动
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            document.querySelector(targetId).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // 微信弹窗功能
    const wechatQR = document.getElementById('wechatQR');
    const closeQR = document.querySelector('.close-qr');

    if (wechatLink && wechatQR && closeQR) {
        wechatLink.onclick = function(e) {
            e.preventDefault();
            wechatQR.style.display = 'block';
        };

        closeQR.onclick = function() {
            wechatQR.style.display = 'none';
        };

        window.onclick = function(e) {
            if (e.target == wechatQR) {
                wechatQR.style.display = 'none';
            }
        };
    } else {
        console.error('Some elements are missing');
    }

    // 计算恋爱天数
    const startDate = new Date('2022-10-19');
    const today = new Date();
    const days = Math.floor((today - startDate) / (1000 * 60 * 60 * 24));
    document.getElementById('loveDays').textContent = days;

    // 添加触摸滑动支持
    let touchStartX = 0;
    let touchEndX = 0;

    carousel.addEventListener('touchstart', e => {
        touchStartX = e.changedTouches[0].screenX;
    });

    carousel.addEventListener('touchend', e => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });

    function handleSwipe() {
        const swipeThreshold = 50; // 滑动阈值
        const diff = touchEndX - touchStartX;
        
        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                // 向右滑动，显示上一张
                currentIndex = (currentIndex - 1 + images.length) % images.length;
            } else {
                // 向左滑动，显示下一张
                currentIndex = (currentIndex + 1) % images.length;
            }
            showImage(currentIndex);
        }
    }

    // 添加自动轮播
    setInterval(() => {
        currentIndex = (currentIndex + 1) % images.length;
        showImage(currentIndex);
    }, 3000);  // 每3秒切换一次
}); 