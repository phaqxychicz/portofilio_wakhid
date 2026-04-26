// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });
}

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        if (navMenu) navMenu.classList.remove('active');
    });
});

// Portfolio Filter
const filterBtns = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

if (filterBtns.length > 0) {
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const filter = btn.getAttribute('data-filter');
            
            portfolioItems.forEach(item => {
                if (filter === 'all' || item.getAttribute('data-category') === filter) {
                    item.style.display = 'block';
                    item.style.animation = 'fadeIn 0.5s ease';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
}

// Add fadeIn animation
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
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

// Contact form submission with Netlify
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const form = e.target;
        const formData = new FormData(form);
        
        fetch('/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams(formData).toString()
        })
        .then(() => {
            alert('✅ Pesan terkirim! Gue bakal bales ASAP.');
            form.reset();
        })
        .catch(() => {
            alert('⚠️ Gagal kirim. Coba lagi tai.');
        });
    });
}

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(10, 10, 15, 0.98)';
            navbar.style.backdropFilter = 'blur(10px)';
        } else {
            navbar.style.background = 'rgba(10, 10, 15, 0.95)';
        }
    }
});

// Add glitch effect randomly
const glitchText = document.querySelector('.glitch-text');
if (glitchText) {
    setInterval(() => {
        glitchText.style.animation = 'none';
        setTimeout(() => {
            glitchText.style.animation = 'glitch 3s infinite';
        }, 10);
    }, 5000);
}

// ========== LIGHTBOX MODAL ==========
const modal = document.getElementById('imageModal');
const modalImg = document.getElementById('modalImage');
const modalCaption = document.getElementById('modalCaption');
const closeModal = document.querySelector('.modal-close');

// Cek apakah modal ada di halaman
if (modal && modalImg && modalCaption) {
    // Add click event to all portfolio items
    document.querySelectorAll('.portfolio-item').forEach(item => {
        const img = item.querySelector('img');
        const titleEl = item.querySelector('.portfolio-overlay h4');
        const subtitleEl = item.querySelector('.portfolio-overlay p');
        
        const title = titleEl ? titleEl.innerText : 'Project';
        const subtitle = subtitleEl ? subtitleEl.innerText : '';
        
        item.addEventListener('click', function(e) {
            // Jangan trigger kalo yang diklik adalah link "View Project"
            if (e.target.tagName === 'A') return;
            
            if (img && img.src) {
                modal.style.display = 'block';
                modalImg.src = img.src;
                modalCaption.innerHTML = `${title} — ${subtitle}`;
                document.body.style.overflow = 'hidden';
            }
        });
    });

    // Close modal when clicking X
    if (closeModal) {
        closeModal.addEventListener('click', () => {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
    }

    // Close modal when clicking outside the image
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    // Close with ESC key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.style.display === 'block') {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
}

// ========== OTHER THINGS SECTION ==========

// 1. FITUR LINK (Modal popup deretan link)
const linkModal = document.getElementById('linkModal');
const linkBtn = document.getElementById('linkBtn');
const linkClose = document.querySelector('.link-modal-close');
const linkList = document.getElementById('linkList');

// Daftar link yang bakal muncul (EDIT DI SINI)
const links = [
    { name: "Buat Belajar CorelDraw", url: "https://youtu.be/8GMCpXM_NFM?si=DZdKuZLNaG67aGQn" },
    { name: "note-crypt-web", url: "https://note-crypt-web.vercel.app/" },
];

// Generate link ke modal
function generateLinks() {
    linkList.innerHTML = '';
    links.forEach(link => {
        const li = document.createElement('li');
        li.innerHTML = `<a href="${link.url}" target="_blank">🔗 ${link.name}</a>`;
        linkList.appendChild(li);
    });
}

if (linkBtn) {
    linkBtn.addEventListener('click', () => {
        generateLinks();
        linkModal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    });
}

if (linkClose) {
    linkClose.addEventListener('click', () => {
        linkModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });
}

window.addEventListener('click', (e) => {
    if (e.target === linkModal) {
        linkModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

// 2. FITUR RANDOM PICTURE (Lihat gambar -> pilih -> fullscreen)
const picBtn = document.getElementById('picBtn');
const galleryModal = document.getElementById('galleryModal');
const galleryGrid = document.getElementById('galleryGrid');
const galleryClose = document.querySelector('.gallery-modal-close');

// Modal untuk fullscreen
const modalRandom = document.getElementById('imageModalRandom');
const modalImgRandom = document.getElementById('modalImageRandom');
const modalCaptionRandom = document.getElementById('modalCaptionRandom');
const randomModalClose = document.getElementById('randomModalClose');

// DAFTAR GAMBAR (EDIT DI SINI)
const imageGallery = [
    { src: "images/random-1.jpg", title: "Gambar 1" },
    { src: "images/random-2.png", title: "Gambar 2" },
    { src: "images/random-3.png", title: "Gambar 3" },
];

// Generate thumbnail di gallery
function generateGallery() {
    galleryGrid.innerHTML = '';
    imageGallery.forEach((img, index) => {
        const item = document.createElement('div');
        item.className = 'gallery-item';
        item.innerHTML = `<img src="${img.src}" alt="${img.title}" data-fullsrc="${img.src}" data-title="${img.title}">`;
        
                // Klik thumbnail buka fullscreen (TAPI GAK TUTUP GALLERY MODAL)
        item.addEventListener('click', () => {
            const fullSrc = item.querySelector('img').dataset.fullsrc;
            const title = item.querySelector('img').dataset.title;
            
            // Simpan state bahwa kita dari gallery
            window.isFromGallery = true;
            
            modalRandom.style.display = 'block';
            modalImgRandom.src = fullSrc;
            modalCaptionRandom.innerHTML = title;
            document.body.style.overflow = 'hidden';
            
            // JANGAN tutup galleryModal biar balik lagi nanti
            // galleryModal.style.display = 'none'; ← HAPUS BARIS INI
        });
        
        galleryGrid.appendChild(item);
    });
}

// Klik tombol "Lihat Gambar"
if (picBtn) {
    picBtn.addEventListener('click', () => {
        generateGallery();
        galleryModal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    });
}

// Close gallery modal
if (galleryClose) {
    galleryClose.addEventListener('click', () => {
        galleryModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });
}

// Klik di luar gallery modal
window.addEventListener('click', (e) => {
    if (e.target === galleryModal) {
        galleryModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

// Close modal fullscreen gambar (kembali ke gallery)
if (randomModalClose) {
    randomModalClose.addEventListener('click', () => {
        modalRandom.style.display = 'none';
        document.body.style.overflow = 'auto';
        
        // Balikin ke gallery modal kalo emang dari gallery
        if (window.isFromGallery && galleryModal) {
            galleryModal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        }
        window.isFromGallery = false;
    });
}

if (modalRandom) {
    modalRandom.addEventListener('click', (e) => {
        if (e.target === modalRandom) {
            modalRandom.style.display = 'none';
            document.body.style.overflow = 'auto';
            
            // Balikin ke gallery modal kalo emang dari gallery
            if (window.isFromGallery && galleryModal) {
                galleryModal.style.display = 'block';
                document.body.style.overflow = 'hidden';
            }
            window.isFromGallery = false;
        }
    });
}

// Tombol ESC juga balik ke gallery
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        if (modalRandom && modalRandom.style.display === 'block') {
            modalRandom.style.display = 'none';
            document.body.style.overflow = 'auto';
            
            if (window.isFromGallery && galleryModal) {
                galleryModal.style.display = 'block';
                document.body.style.overflow = 'hidden';
            }
            window.isFromGallery = false;
        }
    }
});

if (modalRandom) {
    modalRandom.addEventListener('click', (e) => {
        if (e.target === modalRandom) {
            modalRandom.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
}

// 3. FITUR NOW PLAYING (Buka link musik)
const musicBtn = document.getElementById('musicBtn');

if (musicBtn) {
    musicBtn.addEventListener('click', () => {
        // GANTI URL INI pake link musik lu
        window.open('https://music.youtube.com/playlist?list=PLJyCpapXsxzVCurrtmZ0FtIHf4PYLrlp-&si=jAq7cRdpQbv8qRX4');
    });
}

console.log('🔥 Other Things section active');

console.log('🔥 REX-EYE PORTFOLIO ACTIVE | Wakhid si Vector Alchemist');