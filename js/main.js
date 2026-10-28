/**
 * ==========================================================================
 * Hair Salon RICHE - LP仕様スクリプト (script.js)
 * AI-company 専属エンジニア実装
 * ==========================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. 設定ファイル (config.js) の読み込み確認と予約リンクの一元反映
  initReservationSystem();

  // 2. ヘッダーのスクロール追従
  initStickyHeader();

  // 3. スクロール連動アニメーション
  initScrollReveal();

  // 4. ★FAQ（よくある質問）のアコーディオン開閉機能
  initFaqAccordion();

  // 5. 予約方法選択モーダルの制御
  initReservationModal();

  // 6. クイックご予約・ご相談フォームの送信ハンドリング
  initBookingForm();

  // 7. スムーズスクロール
  initSmoothScroll();
});

function initReservationSystem() {
  const config = window.SALON_CONFIG;
  if (!config) return;

  document.querySelectorAll('.js-tel-link').forEach(link => {
    link.setAttribute('href', `tel:${config.reservation.telLink}`);
  });
  document.querySelectorAll('.js-tel-display').forEach(el => {
    el.textContent = config.reservation.telDisplay;
  });
  document.querySelectorAll('.js-address-display').forEach(el => {
    el.textContent = config.address.fullAddress;
  });
}

function initStickyHeader() {
  const header = document.querySelector('.header');
  if (!header) return;

  const handleScroll = () => {
    if (window.scrollY > 40) {
      header.classList.add('is-scrolled');
    } else {
      header.classList.remove('is-scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
}

function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal');
  if (reveals.length === 0) return;

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    }, {
      rootMargin: '0px 0px -40px 0px',
      threshold: 0.1
    });

    reveals.forEach(el => observer.observe(el));
  } else {
    reveals.forEach(el => el.classList.add('is-visible'));
  }
}

/**
 * ★FAQ（よくある質問）のアコーディオン開閉
 */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    if (!question) return;

    question.addEventListener('click', () => {
      const isOpen = item.classList.contains('is-open');
      // 他を閉じる（1つだけ開く上品な仕様）
      faqItems.forEach(i => i.classList.remove('is-open'));
      if (!isOpen) {
        item.classList.add('is-open');
      }
    });
  });
}

function initReservationModal() {
  const modalOverlay = document.getElementById('reservationModal');
  const closeBtn = document.querySelector('.modal-close');
  const reserveBtns = document.querySelectorAll('.js-reserve-btn');

  if (!modalOverlay) return;

  const config = window.SALON_CONFIG || {};
  const hotpepperUrl = config.reservation?.hotpepperUrl || '#';
  const lineUrl = config.reservation?.lineUrl || '#';
  const telLink = config.reservation?.telLink || '';
  const actionType = config.reservation?.actionType || 'modal';

  const modalHotpepper = document.getElementById('modalHotpepperBtn');
  const modalLine = document.getElementById('modalLineBtn');
  const modalTel = document.getElementById('modalTelBtn');

  if (modalHotpepper) modalHotpepper.setAttribute('href', hotpepperUrl);
  if (modalLine) modalLine.setAttribute('href', lineUrl);
  if (modalTel) modalTel.setAttribute('href', `tel:${telLink}`);

  const openModal = (e) => {
    if (e) e.preventDefault();

    if (actionType === 'direct') {
      window.open(hotpepperUrl, '_blank', 'noopener,noreferrer');
      return;
    }

    modalOverlay.classList.add('is-active');
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    modalOverlay.classList.remove('is-active');
    document.body.style.overflow = '';
  };

  reserveBtns.forEach(btn => {
    btn.addEventListener('click', openModal);
  });

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay.classList.contains('is-active')) {
      closeModal();
    }
  });

  window.openReservationModal = openModal;
  window.closeReservationModal = closeModal;
}

function initBookingForm() {
  const form = document.getElementById('quickBookingForm');
  const messageArea = document.getElementById('formSuccessMessage');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const submitBtn = form.querySelector('button[type="submit"]');
    submitBtn.textContent = '送信中...';
    submitBtn.disabled = true;

    setTimeout(() => {
      form.style.display = 'none';
      if (messageArea) {
        messageArea.style.display = 'block';
        messageArea.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 800);
  });
}

function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || targetId === '#reservation') return; // モーダル等は除外
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        const headerOffset = 70;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}
