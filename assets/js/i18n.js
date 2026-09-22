// === i18n: English ↔ Indonesian Translation System ===

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
      en: { /* English is the base; empty means use original HTML */ },
      id: TRANSLATIONS_ID,
    };
  },

  t(key) {
    if (this.currentLang === 'en') return null; // Use original HTML
    return this.translations.id[key] || null;
  },

  apply() {
    document.documentElement.lang = this.currentLang;
    this.applyAssetLinks();

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
        // Pure text element; use textContent for safety
        el.textContent = text;
      } else {
        // Has child elements; use innerHTML carefully
        el.innerHTML = text;
      }
    });
  },

  // Swap language-specific asset links (e.g. the EN/ID CV PDF)
  applyAssetLinks() {
    document.querySelectorAll('[data-cv-en]').forEach(el => {
      const href = this.currentLang === 'id'
        ? el.getAttribute('data-cv-id')
        : el.getAttribute('data-cv-en');
      if (href) el.setAttribute('href', href);
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
  'nav-opensource': 'Open Source',
  'nav-contact': 'Kontak',

  // ===== HERO (index) =====
  'hero-badge': 'Terbuka untuk posisi AI/ML Engineer, Data Scientist, atau Fullstack Engineer. Siap mulai bekerja secara remote maupun hybrid.',
  'hero-cta-work': 'Lihat Portofolio →',
  'hero-cta-about': 'Tentang Saya',
  'hero-cta-cv': 'Download CV',
  'hero-scroll': 'scroll',

  // ===== STATS =====
  'stat-exp': 'Tahun Pengalaman',
  'stat-enterprise': 'Proyek Enterprise',
  'stat-studies': 'Studi Kasus Publik',
  'stat-remote': 'Remote-First',

  // ===== STACK =====
  'stack-label': 'Tech Stack',
  'stack-title': 'Teknologi Utama Saya',
  'stack-ml': 'ML / AI',
  'stack-mlops': 'MLOps',
  'stack-backend': 'Backend / Data',

  // ===== FEATURED WORK =====
  'featured-label': 'Proyek Pilihan',
  'featured-title': 'Studi Kasus Arsitektur',
  'featured-desc': 'Masalah, arsitektur, dan alasan teknis di balik setiap sistem yang saya bangun.',
  'read-case-study': 'Baca selengkapnya →',

  // ===== PROJECT CARDS =====
  'project-sovereign-title': 'Sovereign Ledger',
  'project-stock-title': 'Indonesian Stock MLOps',
  'project-cv-title': 'Pipeline CV Multi-Tahap',
  'project-rag-title': 'Chatbot RAG CV',
  'project-magic-title': 'Magic Chess', 

  'project-sovereign-desc': 'Sistem keuangan untuk koperasi tenaga kesehatan. Meliputi akuntansi double-entry, pemrosesan batch, manajemen peran pengguna, dan migrasi data Excel, yang di-deploy on-premise dengan Docker.',
  'project-stock-desc': 'Pipeline ML end-to-end penentu sinyal BUY/SELL untuk 45 saham IDXBLUE. Dilengkapi dengan tracking MLflow, monitoring Grafana, deployment Docker, dan pelatihan ulang model otomatis.',
  'project-cv-desc': 'Pendekatan detect-then-classify untuk mendeteksi objek dengan akurasi tinggi. Solusi ini menggabungkan model YOLO/SSD dengan klasifikasi kustom PyTorch yang dioptimasi untuk edge deployment.',
  'project-rag-desc': 'Chatbot Retrieval-Augmented Generation untuk menjawab pertanyaan seputar CV saya. Dibangun dengan LangChain, FAISS, FastEmbed, Groq Llama 3.3, dan dievaluasi menggunakan RAGAS.',
  'project-magic-desc': 'Varian catur AI untuk eksplorasi state-space search dan heuristik evaluasi, menggunakan algoritma Minimax dan Alpha-Beta pruning.',
  'project-makmur-desc': 'Scraper berbasis Playwright yang secara otomatis mencari gambar produk dari 4 platform e-commerce Indonesia, dilengkapi dengan mekanisme anti-bot, penjadwalan otomatis, dan dukungan resume.',

  // ===== PHILOSOPHY =====
  'philosophy-label': 'Filosofi',
  'philosophy-title': 'Dari Notebook<br>ke Production',
  'philosophy-p1': 'Banyak proyek ML terhenti di tahap eksperimen Jupyter notebook. Saya memastikan setiap model berjalan stabil di production lewat arsitektur yang rapi, lengkap dengan monitoring dan pipeline evaluasi sejak awal.',
  'philosophy-p2': 'Baik itu sistem akuntansi maupun prediksi saham, standar kerjanya tetap sama: <strong>Rilis, ukur, dan iterasi.</strong>',
  'philosophy-cta': 'Pelajari cara kerja saya →',
  
  'phil-principle-1': 'Rilis lebih awal, ukur hasilnya',
  'phil-principle-1-sub': 'Model tanpa metrik evaluasi hanyalah opini.',
  'phil-principle-2': 'Arsitektur lebih penting dari kompleksitas model',
  'phil-principle-2-sub': 'Model sederhana dengan pipeline yang kokoh akan selalu menang.',
  'phil-principle-3': 'Dokumentasikan alasan keputusan',
  'phil-principle-3-sub': 'Alasan di balik keputusan arsitektur sama pentingnya dengan kode itu sendiri.',
  'phil-principle-4': 'Bangun untuk penerus Anda',
  'phil-principle-4-sub': 'Yang seringkali adalah diri Anda sendiri dalam enam bulan ke depan.',

  // ===== LIVE DEMO =====
  'demo-label': 'Demo Interaktif',
  'demo-title': 'Tanya Chatbot RAG Saya',
  'demo-desc': 'Demo interaktif dari sistem Retrieval-Augmented Generation. Tanyakan apa saja tentang latar belakang, keahlian, atau proyek saya. Dibangun dengan LangChain, FAISS, dan Streamlit.',
  'demo-cta': '🤖 Coba Chatbot →',
  'demo-alt': 'Baca studi kasus',

  // ===== BLOG =====
  'blog-label': 'Artikel',
  'blog-title': 'Dari Blog',
  'blog-desc': 'Catatan teknis seputar ML engineering, MLOps, dan best practice membangun sistem production.',
  'blog-rag-title': 'Alasan Utama Mengukur Sistem RAG',
  'blog-rag-desc': 'Membahas evaluasi RAGAS dan metrik retrieval. Karena bisa jalan di lokal belum tentu aman untuk production.',
  'blog-cv-title': 'Memahami Pola Detect-Then-Classify',
  'blog-cv-desc': 'Pemisahan deteksi dan klasifikasi memberikan tingkat akurasi, kemudahan perbaikan, dan fleksibilitas deployment yang jauh lebih baik.',
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
  'about-page-sub': 'AI/ML Engineer & Data Scientist. Berpengalaman 6+ tahun mengubah model ML menjadi sistem yang berjalan stabil di production.',
  'about-who': 'Tentang Saya',
  'about-philosophy': 'Filosofi Kerja',
  'about-nda': 'Tentang NDA',
  'about-looking': 'Yang Saya Cari',
  'about-beyond': 'Di Luar Layar',
  'about-education': 'Pendidikan',
  'about-certifications': 'Sertifikasi',
  'about-who-p1': 'Saya seorang ML engineer dan konsultan AI dari <strong>Garut, Jawa Barat</strong>. Saya terbiasa bekerja secara remote dengan klien di Asia Tenggara maupun global untuk membangun pipeline computer vision, infrastruktur MLOps, chatbot RAG, hingga platform ML full-stack.',
  'about-who-p2': 'Pengalaman kerja saya mencakup seluruh siklus ML: mulai dari melatih model YOLO untuk inspeksi pabrik, men-deploy pipeline XGBoost menggunakan MLflow dan Grafana, hingga membangun aplikasi web Laravel dengan fitur AI.',
  'about-quote': '"Setiap sistem yang saya rilis sudah dilengkapi monitoring, pipeline evaluasi, dan arsitektur yang rapi. Memilih model yang tepat hanyalah langkah awal."',
  'about-philo-p': 'Banyak proyek AI gagal saat bermigrasi dari Jupyter Notebook ke server production. Pendekatan kerja saya fokus menuntaskan transisi ini:',
  'about-philo-1': '<strong>Rilis cepat, ukur semuanya</strong>: model tanpa evaluasi sama dengan menebak-nebak.',
  'about-philo-2': '<strong>Arsitektur yang rapi melampaui kerumitan model</strong>: model sederhana dengan pipeline yang kokoh jauh lebih berguna daripada AI canggih yang sulit di-deploy.',
  'about-philo-3': '<strong>Dokumentasi adalah kunci</strong>: alasan di balik keputusan arsitektur sama pentingnya dengan kode itu sendiri.',
  'about-philo-4': '<strong>Coding untuk masa depan</strong>: tulis kode yang mudah dipahami, karena kemungkinan besar Anda sendirilah yang akan melakukan perbaikan enam bulan lagi.',
  'about-nda-p1': 'Sebagian besar proyek andalan saya terikat NDA klien enterprise sehingga kodenya bersifat tertutup. Repository GitHub saya umumnya hanya berisi versi demo yang disederhanakan. Versi aslinya jauh lebih kompleks dan siap menanggung beban skala institusi.',
  'about-nda-p2': 'Bagi recruiter atau calon klien: label NDA menandakan adanya versi production yang lebih lengkap. Pengecualian untuk Sovereign Ledger, sistem akuntansi nyata yang saya buat untuk KPRI Warga Kesehatan Garut dan terus beroperasi hingga hari ini.',
  'about-looking-p': 'Saat ini saya terbuka untuk posisi <strong>ML Engineer</strong>, <strong>Data Scientist</strong>, atau <strong>AI/ML Specialist</strong> secara penuh remote maupun hybrid. Saya paling cocok dengan tim yang:',
  'about-looking-1': 'Memperlakukan ML sebagai disiplin software engineering, bukan sekadar eksperimen riset.',
  'about-looking-2': 'Memberikan kebebasan untuk mengelola pipeline secara utuh dari data mentah hingga deployment.',
  'about-looking-3': 'Mengedepankan komunikasi transparan dan mengutamakan dokumentasi teknis yang jelas.',
  'about-looking-4': 'Peduli pada stabilitas sistem sama besarnya dengan kepedulian terhadap akurasi model.',
  'about-beyond-p': 'Di waktu luang, saya rutin membaca dan menulis seputar teknologi. Blog ini menjadi wadah untuk mendokumentasikan hasil belajar saya. Saya juga senang bermain catur (alasan utama saya membangun AI Magic Chess), mengeksplorasi arsitektur sistem, dan membimbing engineer muda yang berminat masuk ke dunia AI.',

  // ===== PROJECTS LISTING =====
  'projects-label': 'Proyek',
  'projects-page-title': 'Studi Kasus',
  'projects-page-sub': 'Lebih dari sekadar kode. Ini adalah kisah di balik penemuan masalah, rancangan arsitektur, dan eksekusi teknis dari tiap proyek.',

  // ===== TOOLS / USES =====
  'uses-page-title': 'Alat Tempur Saya',
  'uses-page-sub': 'Kumpulan software, bahasa pemrograman, framework, hingga hardware yang saya gunakan sehari-hari dari tahap riset ML sampai deployment.',

  // ===== CONTACT =====
  'contact-page-title': 'Mari Berdiskusi',
  'contact-page-sub': 'Terbuka untuk posisi ML Engineer, Data Scientist, dan AI/ML, baik remote maupun hybrid. Saya juga menerima tawaran konsultasi dan proyek freelance.',

  // ===== BLOG LISTING =====
  'blog-page-title': 'Blog Teknis',
  'blog-rag-desc-list': 'Membahas penggunaan RAGAS dan metrik retrieval. Kode yang berjalan mulus di lokal seringkali belum siap untuk production. Artikel ini membedah cara saya membangun pipeline evaluasi chatbot CV.',
  'blog-cv-desc-list': 'Pelajaran penting dari mengurus pipeline CV di production: memisahkan tahap deteksi dan klasifikasi objek memberikan tingkat akurasi, kemudahan perbaikan, dan fleksibilitas deployment yang unggul.',
  'blog-mlops-desc-list': 'Menjalankan MLflow, Grafana, dan Docker di server standar. Pendekatan MLOps yang praktis dan efisien untuk solo engineer dan tim kecil dalam ekosistem tanpa Kubernetes.',
  'contact-reach': 'Sapa Saya',
  'contact-email': 'Email',
  'contact-phone': 'Telepon',
  'contact-location': 'Lokasi',
  'contact-availability': 'Status',
  'contact-open': 'Terbuka untuk peluang baru',
  'contact-cta-title': 'Ingin langsung diskusi lewat email?',
  'contact-cta-p': 'Saya biasanya membalas pesan dalam waktu 24 jam. Jangan ragu untuk menghubungi saya.',

  // ===== EXPERIENCE TIMELINE (About) =====
  'about-experience': 'Pengalaman Kerja',
  'about-exp-intro': 'Perjalanan karier saya dari ranah data engineering menuju pengembangan sistem ML siap pakai.',
  'about-exp-1-role': 'Freelance Data Scientist & ML Engineer',
  'about-exp-1-org': 'Konsultan Independen',
  'about-exp-1-date': '2020–Sekarang',
  'about-exp-1-1': 'Membangun pipeline pelatihan ulang ML yang sepenuhnya otomatis dan berjalan tanpa campur tangan manual.',
  'about-exp-1-2': 'Menerapkan monitoring production real-time lengkap dengan sistem peringatan dini dan deteksi anomali.',
  'about-exp-1-3': 'Merancang inferensi computer vision multi-tahap yang kinerjanya melampaui model standar satu tahap.',
  'about-exp-1-4': 'Mengelola seluruh siklus MLOps: pelacakan eksperimen, versi model, layanan inferensi, dan pemantauan sistem.',
  'about-exp-1-5': 'Menghadirkan sistem keuangan utuh yang memiliki pembukuan double-entry dan log audit lengkap.',
  'about-exp-2-role': 'Data Analyst',
  'about-exp-2-org': 'Klien Sektor Publik (rahasia)',
  'about-exp-2-date': 'Jun 2021–Jul 2022',
  'about-exp-2-1': 'Menganalisis performa konten digital di berbagai platform untuk menunjang tim komunikasi sektor publik.',
  'about-exp-2-2': 'Menyusun dashboard dan laporan ringkas agar data dapat langsung dimanfaatkan oleh pengambil keputusan non-teknis.',
  'about-exp-2-3': 'Melakukan EDA untuk menemukan tren penting yang mengarahkan strategi kampanye.',
  'about-exp-3-role': 'Data Engineer Intern',
  'about-exp-3-org': 'Star Energy',
  'about-exp-3-date': 'Jan 2019–Feb 2019',
  'about-exp-3-1': 'Turut membantu kelancaran migrasi dari sistem file lama menuju SharePoint, termasuk penyeragaman metadata dan validasi integritas data.',
  'about-exp-cta-p': 'Saya juga aktif berkontribusi di berbagai proyek open source, seperti pembuatan modul provider pencarian kerja Indonesia.',
  'about-exp-cta-btn': 'Lihat kontribusi open source →',

  // ===== OPEN SOURCE PAGE =====
  'oss-label': 'Kontribusi',
  'oss-page-title': 'Kontribusi Open Source',
  'oss-page-sub': 'Kumpulan pull request yang telah diterima ke dalam proyek pihak lain: penyelesaian bug, integrasi API, dan penyempurnaan dokumentasi.',
  'oss-intro': 'Karena sebagian besar pekerjaan komersial saya terikat NDA, kode publik menjadi acuan terbaik untuk menilai kualitas kerja saya. Kontribusi di bawah ini telah bergabung ke basis kode eksternal, di mana hasil kerja saya dievaluasi seketat kode kontributor lainnya.',
  'oss-co-role': 'Kontributor',
  'oss-co-desc': 'Sistem manajemen karier berbasis AI untuk para pencari kerja: fitur pelacakan lowongan, pembuatan CV otomatis, dan pengelolaan alur lamaran.',
  'oss-co-stat-offers': '740+',
  'oss-co-stat-offers-label': 'Lowongan dievaluasi',
  'oss-co-stat-cvs': '100+',
  'oss-co-stat-cvs-label': 'CV dihasilkan',
  'oss-co-pr1-title': 'Dukungan terminologi Resume/CV',
  'oss-co-pr1-desc': 'Menambahkan template serta dokumentasi khusus untuk resume, agar pengguna bisa secara fleksibel memilih antara format "resume" industri AS atau "CV" akademik. Pembaruan ini mencakup revisi dokumentasi dan terjemahan README yang menyeluruh.',
  'oss-co-pr2-title': 'Provider portal kerja Indonesia',
  'oss-co-pr2-desc': 'Membangun modul provider <code>jobstreet.mjs</code> dan <code>glints.mjs</code> yang menghubungkan API publik untuk menarik data lowongan dari platform kerja terkemuka di Indonesia. Fitur ini sudah dilengkapi query GraphQL, validasi URL, pencegahan SSRF, penanganan pagination, dan unit test.',
  'oss-co-pr3-title': 'Pemulihan API Glints + Jobstreet',
  'oss-co-pr3-desc': 'Mengarahkan provider Glints ke endpoint <code>/api/v2-alc/graphql</code> dan Jobstreet ke REST API v5 menyusul penghentian dukungan API sebelumnya, sehingga fungsi pemindaian bisa beroperasi kembali normal. Saya juga menambahkan font fallback Arab dan Jepang ke template CV serta berkontribusi membenahi workflow rilis otomatis.',
  'oss-na-role': 'Kontributor',
  'oss-na-desc': 'Asisten AI desktop open source berbalut Electron dan React, fokus utama pada perbaikan penyimpanan kredensial dan antarmuka pengguna.',
  'oss-na-pr1-title': 'Perbaikan tombol tutup panel Pengaturan',
  'oss-na-pr1-desc': 'Menyelesaikan permasalahan antarmuka di mana panel Pengaturan kehilangan tombol tutup akibat interaksi layout <code>flex-1</code>. Saya menempatkan kembali tombol tutup di sudut atas yang disertai efek backdrop blur dan hover.',
  'oss-na-pr2-title': 'Penyelesaian masalah persistensi kredensial',
  'oss-na-pr2-desc': 'Menemukan dan membereskan bug yang menyebabkan hilangnya API key secara diam-diam pasca-restart, yang diakibatkan oleh penumpukan proses penulisan keyring pada satu blok try-catch yang sama. Perbaikan ini memisahkan proses penyimpanan kunci dan menyediakan enkripsi fallback AES-256-GCM. Pembaruan ini juga melampirkan sensor pesan error demi keamanan bersama serangkaian regression test.',
  'oss-cta-title': 'Ingin memeriksa kode saya langsung?',
  'oss-cta-p': 'Setiap riwayat kontribusi di halaman ini dapat Anda tinjau, mencakup rincian diff kode, catatan reviewer, dan dinamika diskusinya.',
  'oss-cta-btn': 'Kunjungi GitHub Saya →',

  // ===== MULTI-AGENT RAG =====
  'project-multiagent-title': 'Sistem RAG Multi-Agent',
  'project-multiagent-desc': 'Sistem RAG yang dikelola oleh sejumlah agen pintar: router, retrieval, evaluator, dan summarizer. Agen-agen ini berkomunikasi menggunakan standar kontrak data yang ketat. Sistem ini mampu menangani beragam jenis dokumen, mulai dari buku dan manual teknis sampai basis pengetahuan internal.',
  'project-multiagent-meta': 'LLM · RAG · Multi-Agent Systems',

  // ===== 404 =====
  '404-title': 'Halaman Tidak Ditemukan',
  '404-desc': 'Halaman yang Anda tuju mungkin telah dihapus, berganti nama, atau memang belum pernah ada.',
  '404-cta': '← Kembali ke Beranda',
};
