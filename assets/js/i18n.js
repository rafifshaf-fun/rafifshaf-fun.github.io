// === i18n — English ↔ Indonesian Translation System ===

const i18n = {
  currentLang: 'en',
  translations: {},

  async init() {
    this.currentLang = localStorage.getItem('lang') || 'en';
    this.handleArticleRedirect();
    await this.loadTranslations();
    this.apply();
    this.renderToggle();
  },

  handleArticleRedirect() {
    if (!document.body.hasAttribute('data-article')) return;
    
    const path = window.location.pathname;
    const isIdFile = path.endsWith('-id.html');
    
    if (this.currentLang === 'id' && !isIdFile) {
      window.location.replace(path.replace('.html', '-id.html'));
    } else if (this.currentLang === 'en' && isIdFile) {
      window.location.replace(path.replace('-id.html', '.html'));
    }
  },

  async loadTranslations() {
    // All translations are inline (no external file needed for GitHub Pages)
    this.translations = {
      en: { /* English is the base — empty means use original HTML */ },
      id: TRANSLATIONS_ID,
    };
  },

  t(key) {
    if (this.currentLang === 'en') return null; // Use original HTML
    return this.translations.id[key] || null;
  },

  apply() {
    document.documentElement.lang = this.currentLang;
    
    if (this.currentLang === 'en') {
      // Restore original HTML
      document.querySelectorAll('[data-i18n]').forEach(el => {
        const orig = el.getAttribute('data-i18n-orig');
        if (orig !== null) {
          if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
            el.placeholder = orig;
          } else {
            el.innerHTML = orig;
          }
        }
      });
      return;
    }

    // Apply Indonesian translations
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      const text = this.t(key);
      if (!text) return;
      
      // Store original HTML if not stored
      if (!el.getAttribute('data-i18n-orig')) {
        const orig = el.tagName === 'INPUT' || el.tagName === 'TEXTAREA' 
          ? el.placeholder : el.innerHTML;
        el.setAttribute('data-i18n-orig', orig);
      }

      if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
        el.placeholder = text;
      } else if (el.children.length === 0) {
        // Pure text element — use textContent for safety
        el.textContent = text;
      } else {
        // Has child elements — use innerHTML carefully
        el.innerHTML = text;
      }
    });
  },

  toggle() {
    this.currentLang = this.currentLang === 'en' ? 'id' : 'en';
    localStorage.setItem('lang', this.currentLang);

    if (document.body.hasAttribute('data-article')) {
      this.handleArticleRedirect();
      return;
    }

    // Fade out, swap, fade in
    document.body.classList.add('lang-fading');
    
    setTimeout(() => {
      this.apply();
      this.renderToggle();
      
      // Trigger reflow then fade in
      requestAnimationFrame(() => {
        document.body.classList.remove('lang-fading');
      });
    }, 180);
  },

  renderToggle() {
    document.querySelectorAll('.lang-toggle').forEach(btn => {
      btn.textContent = this.currentLang === 'en' ? 'ID' : 'EN';
      btn.setAttribute('aria-label', this.currentLang === 'en' 
        ? 'Switch to Indonesian' 
        : 'Ganti ke Inggris');
    });
  },
};

// === Indonesian Translations (matching current site content) ===
const TRANSLATIONS_ID = {
  // ===== NAVBAR =====
  'nav-home': 'Beranda',
  'nav-about': 'Tentang',
  'nav-projects': 'Proyek',
  'nav-blog': 'Blog',
  'nav-uses': 'Setup',
  'nav-contact': 'Kontak',

  // ===== HERO (index) =====
  'hero-badge': 'Terbuka untuk posisi AI/ML Engineer / Data Scientist / Fullstack Engineer — tersedia segera — remote atau hybrid',
  'hero-cta-work': 'Lihat Portofolio →',
  'hero-cta-about': 'Tentang Saya',
  'hero-cta-cv': 'Unduh CV',
  'hero-scroll': 'scroll',

  // ===== STATS =====
  'stat-exp': 'Tahun Pengalaman',
  'stat-enterprise': 'Proyek Enterprise',
  'stat-studies': 'Studi Kasus Publik',
  'stat-remote': 'Remote-First',

  // ===== STACK =====
  'stack-label': 'Tech Stack',
  'stack-title': 'Teknologi Utama',
  'stack-ml': 'ML / AI',
  'stack-mlops': 'MLOps',
  'stack-backend': 'Backend / Data',

  // ===== FEATURED WORK =====
  'featured-label': 'Proyek Pilihan',
  'featured-title': 'Studi Kasus Arsitektur',
  'featured-desc': 'Fokus pada arsitektur, pemecahan masalah, dan skalabilitas di production — lebih dari sekadar kode.',
  'read-case-study': 'Baca selengkapnya →',

  // ===== PROJECT CARDS =====
  'project-sovereign-title': 'Sovereign Ledger',
  'project-stock-title': 'Indonesian Stock MLOps',
  'project-cv-title': 'Pipeline CV Multi-Tahap',
  'project-rag-title': 'Chatbot RAG CV',
  'project-magic-title': 'Magic Chess', 

  'project-sovereign-desc': 'Sistem keuangan untuk koperasi tenaga kesehatan. Meliputi akuntansi double-entry, pemrosesan batch, manajemen user role, dan migrasi data Excel — di-deploy on-premise dengan Docker.',
  'project-stock-desc': 'Pipeline ML end-to-end penentu sinyal BUY/SELL untuk 45 saham IDXBLUE — lengkap dengan tracking MLflow, monitoring Grafana, deployment Docker, dan retrain otomatis.',
  'project-cv-desc': 'Arsitektur detect-then-classify untuk deteksi objek akurasi tinggi. Menggabungkan deteksi YOLO/SSD dengan klasifikasi kustom PyTorch — dioptimasi untuk edge deployment.',
  'project-rag-desc': 'Chatbot Retrieval-Augmented Generation untuk menjawab pertanyaan seputar CV saya. Dibangun dengan LangChain, FAISS, FastEmbed, Groq Llama 3.3, dan dievaluasi via RAGAS.',
  'project-magic-desc': 'Varian catur AI untuk eksplorasi state-space search dan heuristik evaluasi — menggunakan algoritma Minimax dan Alpha-Beta pruning.',
  'project-makmur-desc': 'Scraper berbasis Playwright yang mencari gambar produk dari 4 platform e-commerce Indonesia secara otomatis — dengan anti-bot evasion, jadwal otomatis, dan dukungan resume.',

  // ===== PHILOSOPHY =====
  'philosophy-label': 'Filosofi',
  'philosophy-title': 'ML untuk Production,<br>Bukan Sekadar Notebook',
  'philosophy-p1': 'Banyak proyek ML terhenti di tahap eksperimen (Jupyter notebook). Saya memastikan model berjalan stabil di production dengan membangun arsitektur yang rapi, lengkap dengan monitoring dan pipeline evaluasi sejak awal.',
  'philosophy-p2': 'Baik itu sistem akuntansi maupun prediksi saham — standarnya tetap sama: <strong>Rilis, ukur, dan iterasi.</strong>',
  'philosophy-cta': 'Baca selengkapnya tentang cara kerja saya →',
  
  'phil-principle-1': 'Rilis lebih awal, ukur hasilnya',
  'phil-principle-1-sub': 'Model tanpa metrik evaluasi hanyalah opini.',
  'phil-principle-2': 'Arsitektur lebih penting dari kompleksitas model',
  'phil-principle-2-sub': 'Model sederhana dengan pipeline kokoh akan selalu menang.',
  'phil-principle-3': 'Dokumentasikan alasan di balik keputusan',
  'phil-principle-3-sub': 'Keputusan dan kompromi arsitektur sama berharganya dengan kode itu sendiri.',
  'phil-principle-4': 'Bangun untuk penerus Anda',
  'phil-principle-4-sub': 'Yang seringkali adalah diri Anda sendiri, enam bulan dari sekarang.',

  // ===== LIVE DEMO =====
  'demo-label': 'Demo Interaktif',
  'demo-title': 'Tanya Chatbot RAG Saya',
  'demo-desc': 'Demo live dari sistem Retrieval-Augmented Generation — tanyakan apa pun tentang latar belakang, skill, atau proyek saya. Dibangun dengan LangChain + FAISS + Streamlit.',
  'demo-cta': '🤖 Coba Chatbot →',
  'demo-alt': 'Baca studi kasus',

  // ===== BLOG =====
  'blog-label': 'Artikel',
  'blog-title': 'Dari Blog',
  'blog-desc': 'Catatan teknis seputar ML engineering, MLOps, dan best practice di production.',
  'blog-rag-title': 'Kenapa RAG Anda Harus Diukur (Dan Cara Melakukannya)',
  'blog-rag-desc': 'Membahas evaluasi RAGAS dan metrik retrieval. Karena "jalan di lokal" belum tentu aman untuk production.',
  'blog-cv-title': 'Memahami Pola Detect-Then-Classify',
  'blog-cv-desc': 'Memisahkan deteksi dan klasifikasi memberi akurasi, kemudahan maintenance, dan fleksibilitas deployment yang lebih baik.',
  'blog-mlops-title': 'MLOps yang Masuk Akal',
  'blog-mlops-desc': 'Menjalankan MLflow, Grafana, dan Docker di server standar. Solusi MLOps praktis untuk solo engineer dan tim kecil.',
  'blog-rag-tag': 'RAG · LLM',
  'blog-cv-tag': 'Computer Vision',
  'blog-mlops-tag': 'MLOps',
  'blog-6min': 'Baca 6 mnt',
  'blog-8min': 'Baca 8 mnt',
  'blog-7min': 'Baca 7 mnt',
  'blog-date-june': 'Jun 2024',
  'blog-date-may': 'Mei 2024',
  'blog-date-april': 'Apr 2024',

  // ===== FOOTER =====
  'footer-copy': '© 2026 Rafif Shafwan · Garut, Indonesia',

  // ===== ABOUT PAGE =====
  'about-page-title': 'Di Balik Layar',
  'about-page-sub': 'AI/ML Engineer & Data Scientist. 6+ tahun pengalaman mengubah model ML menjadi sistem yang berjalan stabil di production.',
  'about-who': 'Tentang Saya',
  'about-philosophy': 'Filosofi Kerja',
  'about-nda': 'Tentang NDA',
  'about-looking': 'Yang Saya Cari',
  'about-beyond': 'Di Luar Layar',
  'about-education': 'Pendidikan',
  'about-certifications': 'Sertifikasi',
  'about-who-p1': 'Saya seorang ML engineer dan konsultan AI dari <strong>Garut, Jawa Barat</strong>. Saya terbiasa bekerja remote dengan klien di Asia Tenggara dan global — membangun pipeline computer vision, infrastruktur MLOps, chatbot RAG, hingga platform ML full-stack.',
  'about-who-p2': 'Pengalaman saya mencakup end-to-end ML: mulai dari melatih model YOLO untuk inspeksi pabrik, men-deploy pipeline XGBoost dengan MLflow dan Grafana, hingga membangun aplikasi web berbasis Laravel dengan fitur AI.',
  'about-quote': '"Saya tidak hanya melatih model — saya membangun sistem. Setiap proyek yang saya kerjakan sudah dilengkapi dengan monitoring, evaluasi, dan arsitektur yang rapi."',
  'about-philo-p': 'Banyak proyek AI gagal saat pindah dari Jupyter Notebook ke server production. Pendekatan saya fokus pada transisi ini:',
  'about-philo-1': '<strong>Rilis cepat, ukur semuanya</strong> — model tanpa evaluasi sama dengan menebak-nebak.',
  'about-philo-2': '<strong>Arsitektur yang rapi > model yang rumit</strong> — model simpel dengan pipeline solid lebih berguna dari AI canggih yang sulit di-deploy.',
  'about-philo-3': '<strong>Dokumentasi adalah kunci</strong> — alasan di balik sebuah keputusan arsitektur sama pentingnya dengan kode itu sendiri.',
  'about-philo-4': '<strong>Coding untuk masa depan</strong> — tulis kode yang mudah dipahami, karena kemungkinan besar Anda sendiri yang akan maintain 6 bulan lagi.',
  'about-nda-p1': 'Sebagian besar proyek terbaik saya terikat NDA dengan klien enterprise sehingga kodenya tidak bisa dibuka untuk publik. Repository GitHub saya umumnya berisi versi demo yang telah disederhanakan. Versi aslinya jauh lebih kompleks dan siap digunakan untuk skala institusi.',
  'about-nda-p2': 'Jika Anda recruiter atau calon klien: label NDA berarti ada versi production yang lebih lengkap. Pengecualian untuk Sovereign Ledger — ini adalah sistem nyata yang saya buat untuk KPRI Warga Kesehatan Garut dan aktif digunakan hingga kini.',
  'about-looking-p': 'Saat ini saya terbuka untuk posisi <strong>ML Engineer</strong>, <strong>Data Scientist</strong>, atau <strong>AI/ML Specialist</strong> — baik full-remote maupun hybrid. Saya cocok dengan tim yang:',
  'about-looking-1': 'Melihat ML sebagai cabang software engineering, bukan sekadar eksperimen.',
  'about-looking-2': 'Memberi ruang untuk mengelola pipeline dari raw data hingga deployment.',
  'about-looking-3': 'Mengedepankan komunikasi transparan dan dokumentasi teknis yang baik.',
  'about-looking-4': 'Peduli pada stabilitas sistem, sama seperti peduli pada akurasi model.',
  'about-beyond-p': 'Di waktu luang, saya sering membaca atau menulis tentang teknologi. Blog ini saya gunakan untuk mendokumentasikan apa yang saya pelajari. Saya juga suka main catur (alasan saya membuat AI Magic Chess), mengeksplor arsitektur sistem, dan membantu engineer junior yang ingin masuk ke dunia AI.',

  // ===== PROJECTS LISTING =====
  'projects-label': 'Proyek',
  'projects-page-title': 'Studi Kasus',
  'projects-page-sub': 'Bukan sekadar kode. Ini adalah cerita di balik pemecahan masalah, arsitektur, dan implementasi dari tiap proyek.',

  // ===== TOOLS / USES =====
  'uses-page-title': 'Alat Tempur Saya',
  'uses-page-sub': 'Software, bahasa pemrograman, framework, hingga hardware yang saya gunakan sehari-hari — dari eksperimen ML sampai deployment production.',

  // ===== CONTACT =====
  'contact-page-title': 'Mari Berdiskusi',
  'contact-page-sub': 'Terbuka untuk posisi ML Engineer, Data Scientist, dan AI/ML — remote maupun hybrid. Saya juga menerima konsultasi dan proyek freelance.',

  // ===== BLOG LISTING =====
  'blog-page-title': 'Blog Teknis',
  'blog-rag-desc-list': 'Membahas evaluasi RAGAS dan metrik retrieval. Karena "jalan di lokal" belum tentu aman untuk production. Di sini saya share cara saya membangun pipeline evaluasi chatbot CV saya.',
  'blog-cv-desc-list': 'Pelajaran dari mengurus pipeline CV di production: mengapa memisahkan deteksi dan klasifikasi objek memberi akurasi, maintenance, dan fleksibilitas deployment yang lebih mantap.',
  'blog-mlops-desc-list': 'Menjalankan MLflow, Grafana, dan Docker di server standar. Solusi MLOps praktis untuk solo engineer dan tim kecil di lingkungan tanpa Kubernetes.',
  'contact-reach': 'Sapa Saya',
  'contact-email': 'Email',
  'contact-phone': 'Telepon',
  'contact-location': 'Lokasi',
  'contact-availability': 'Status',
  'contact-open': 'Terbuka untuk peluang baru',
  'contact-cta-title': 'Ingin langsung diskusi via email?',
  'contact-cta-p': 'Saya biasanya merespons dalam 24 jam. Jangan ragu untuk mengirim pesan.',

  // ===== 404 =====
  '404-title': 'Halaman Tidak Ditemukan',
  '404-desc': 'Halaman yang Anda cari mungkin sudah dihapus, dipindah, atau memang tidak pernah ada.',
  '404-cta': '← Kembali ke Beranda',
};
