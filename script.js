document.addEventListener('DOMContentLoaded', function() {
    
    const poemItems = document.querySelectorAll('.poem-item');
    
    poemItems.forEach(item => {
        item.addEventListener('click', function() {
            poemItems.forEach(otherItem => {
                if (otherItem !== this) {
                    otherItem.classList.remove('active');
                }
            });
            
            this.classList.toggle('active');
            
            const arrow = this.querySelector('.arrow');
            if (this.classList.contains('active')) {
                arrow.textContent = '▼';
            } else {
                arrow.textContent = '▶';
            }
        });
    });

    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            const date = this.querySelector('.item-date').textContent;
            const img = this.querySelector('img');
            
            showImageModal(img.src, date);
        });
    });

    function showImageModal(src, date) {
        const existingModal = document.querySelector('.image-modal');
        if (existingModal) {
            existingModal.remove();
        }

        const modal = document.createElement('div');
        modal.className = 'image-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <span class="close-modal">&times;</span>
                <img src="${src}" alt="Увеличенное изображение">
                <p class="modal-date">${date}</p>
            </div>
        `;

        document.body.appendChild(modal);

        addModalStyles();

        const closeBtn = modal.querySelector('.close-modal');
        closeBtn.addEventListener('click', () => {
            modal.remove();
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
            }
        });

        document.addEventListener('keydown', function closeOnEscape(e) {
            if (e.key === 'Escape') {
                modal.remove();
                document.removeEventListener('keydown', closeOnEscape);
            }
        });
    }

    function addModalStyles() {
        if (document.querySelector('#modal-styles')) return;

        const style = document.createElement('style');
        style.id = 'modal-styles';
        style.textContent = `
            .image-modal {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.9);
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 1000;
                animation: fadeIn 0.3s ease;
            }

            .modal-content {
                position: relative;
                max-width: 90%;
                max-height: 90%;
            }

            .modal-content img {
                max-width: 100%;
                max-height: 85vh;
                border-radius: 10px;
                box-shadow: 0 8px 40px rgba(0, 0, 0, 0.5);
            }

            .modal-date {
                text-align: center;
                color: white;
                font-family: 'Comfortaa', cursive;
                font-size: 1.2rem;
                margin-top: 15px;
            }

            .close-modal {
                position: absolute;
                top: -40px;
                right: 0;
                color: white;
                font-size: 40px;
                cursor: pointer;
                transition: transform 0.3s ease;
            }

            .close-modal:hover {
                transform: scale(1.2);
                color: #8B5FBF;
            }
        `;

        document.head.appendChild(style);
    }

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallax = document.querySelector('body');
        if (parallax) {
            parallax.style.backgroundPositionY = `${scrolled * 0.5}px`;
        }
    });

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.gallery-item, .list-item, .poem-item');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });

    console.log('Сайт загружен! Все интерактивные элементы активны.');
});



function filterGallery(category) {
    const items = document.querySelectorAll('.gallery-item');
    items.forEach(item => {
        if (category === 'all' || item.dataset.category === category) {
            item.style.display = 'block';
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'scale(1)';
            }, 100);
        } else {
            item.style.opacity = '0';
            item.style.transform = 'scale(0.8)';
            setTimeout(() => {
                item.style.display = 'none';
            }, 300);
        }
    });
}

function searchPoems(query) {
    const poems = document.querySelectorAll('.poem-item');
    const searchTerm = query.toLowerCase();

    poems.forEach(poem => {
        const title = poem.querySelector('h3').textContent.toLowerCase();
        const preview = poem.querySelector('.poem-preview')?.textContent.toLowerCase() || '';
        
        if (title.includes(searchTerm) || preview.includes(searchTerm)) {
            poem.style.display = 'flex';
        } else {
            poem.style.display = 'none';
        }
    });
}
