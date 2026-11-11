/**
 * ==============================================================================
 * FOR MUSKAN - MULTI-PAGE DIGITAL GIFT APPLICATION
 * 7-Screen Complete Journey Engine:
 * Screen 1: Heart & Arrow
 * Screen 2: Tree of Love
 * Screen 3: Cinematic Confession
 * Screen 4: Photo Collage & Puzzle (8 Real Photos)
 * Screen 5: The Letters
 * Screen 6: Unlock For Surprise (Passcode 1210)
 * Screen 7: Grand Finale (Fireworks & Lightning)
 * ==============================================================================
 */

(function () {
  'use strict';

  // --------------------------------------------------------------------------
  // 1. STATE & AUDIO
  // --------------------------------------------------------------------------
  let currentScreen = 1;
  const isTouch = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);
  let isAudioPlaying = false;
  let webAudioCtx = null;

  function getAudioCtx() {
    if (!webAudioCtx) {
      const AudioClass = window.AudioContext || window.webkitAudioContext;
      if (AudioClass) webAudioCtx = new AudioClass();
    }
    if (webAudioCtx && webAudioCtx.state === 'suspended') {
      webAudioCtx.resume();
    }
    return webAudioCtx;
  }

  function playTone(type) {
    try {
      const ctx = getAudioCtx();
      if (!ctx) return;
      const now = ctx.currentTime;

      if (type === 'hit') {
        [523.25, 659.25, 783.99, 1046.50].forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, now + idx * 0.05);
          gain.gain.setValueAtTime(0.08, now + idx * 0.05);
          gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.2);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now + idx * 0.05);
          osc.stop(now + 1.25);
        });
      } else if (type === 'flip') {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(320, now);
        osc.frequency.exponentialRampToValueAtTime(540, now + 0.08);
        gain.gain.setValueAtTime(0.06, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.11);
      } else if (type === 'key') {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(587.33, now);
        gain.gain.setValueAtTime(0.05, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.09);
      } else if (type === 'error') {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(140, now);
        gain.gain.setValueAtTime(0.06, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.26);
      } else if (type === 'chime') {
        [587.33, 739.99, 880.00, 1174.66, 1479.98].forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, now + idx * 0.08);
          gain.gain.setValueAtTime(0.1, now + idx * 0.08);
          gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.08 + 1.6);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now + idx * 0.08);
          osc.stop(now + idx * 0.08 + 1.7);
        });
      }
    } catch (e) {}
  }

  const appAudio = document.getElementById('appAudio');
  const soundBtn = document.getElementById('soundBtn');

  function initAudioControls() {
    if (!soundBtn) return;
    if (appAudio) appAudio.volume = (CONFIG.audio && CONFIG.audio.volume) || 0.6;

    soundBtn.addEventListener('click', () => {
      if (isAudioPlaying) {
        pauseAudio();
      } else {
        startAudio();
      }
    });
  }

  function startAudio() {
    isAudioPlaying = true;
    getAudioCtx();
    if (soundBtn) soundBtn.classList.add('playing');
    if (appAudio) {
      appAudio.play().catch(() => {});
    }
  }

  function pauseAudio() {
    isAudioPlaying = false;
    if (soundBtn) soundBtn.classList.remove('playing');
    if (appAudio) appAudio.pause();
  }

  // --------------------------------------------------------------------------
  // 2. MULTI-SCREEN TRANSITION CONTROLLER (7-SCREEN SEQUENCE)
  // --------------------------------------------------------------------------
  function goToScreen(targetScreenNum) {
    if (targetScreenNum === currentScreen) return;

    const currentScreenEl = document.getElementById(`screen-${currentScreen}`);
    const nextScreenEl = document.getElementById(`screen-${targetScreenNum}`);

    if (!nextScreenEl) return;

    // Update progress dots
    const dots = document.querySelectorAll('.prog-dot');
    dots.forEach((dot, idx) => {
      dot.classList.toggle('active', idx + 1 === targetScreenNum);
    });

    if (window.gsap && currentScreenEl) {
      gsap.to(currentScreenEl, {
        duration: 0.5,
        opacity: 0,
        scale: 0.95,
        ease: 'power2.inOut',
        onComplete: () => {
          currentScreenEl.classList.remove('active');
          nextScreenEl.classList.add('active');

          gsap.fromTo(nextScreenEl,
            { opacity: 0, scale: 0.97 },
            { duration: 0.6, opacity: 1, scale: 1, ease: 'power2.out' }
          );

          currentScreen = targetScreenNum;
          onScreenActivated(targetScreenNum);
        }
      });
    } else {
      if (currentScreenEl) currentScreenEl.classList.remove('active');
      nextScreenEl.classList.add('active');
      currentScreen = targetScreenNum;
      onScreenActivated(targetScreenNum);
    }
  }

  function onScreenActivated(screenNum) {
    if (screenNum === 2) {
      initTreeOfLove();
    } else if (screenNum === 4) {
      initPhotoCollage();
    } else if (screenNum === 5) {
      initLetters();
    } else if (screenNum === 6) {
      initPasscodeScreen();
    } else if (screenNum === 7) {
      initCakeCutting();
    } else if (screenNum === 8) {
      initFinaleScreen();
    }
  }

  // --------------------------------------------------------------------------
  // 3. SCREEN 1: THE INTERACTIVE HEART & ARROW
  // --------------------------------------------------------------------------
  function initScreen1() {
    const bowArea = document.getElementById('bowArea');
    const arrow = document.getElementById('arrowActor');
    const bowString = document.getElementById('bowStringPath');
    const aimGuide = document.getElementById('aimGuide');
    const targetHeart = document.getElementById('targetHeart');
    const pullText = document.getElementById('pullText');

    if (pullText && CONFIG.screen1) {
      pullText.textContent = CONFIG.screen1.promptText;
    }

    if (!arrow || !bowString || !targetHeart || !bowArea) return;

    let isPulling = false;
    let startY = 0;
    let pullDistance = 0;
    const maxPull = 80;
    let arrowShot = false;

    function onPointerDown(e) {
      if (arrowShot) return;
      isPulling = true;
      startY = e.clientY || (e.touches && e.touches[0].clientY);
      if (aimGuide) aimGuide.style.opacity = '1';
    }

    function onPointerMove(e) {
      if (!isPulling || arrowShot) return;
      const clientY = e.clientY || (e.touches && e.touches[0].clientY);
      const deltaY = clientY - startY;

      pullDistance = Math.max(0, Math.min(deltaY, maxPull));
      arrow.style.transform = `translateX(-50%) translateY(${pullDistance}px)`;
      bowString.setAttribute('d', `M 30 100 Q 140 ${100 + pullDistance * 1.1} 250 100`);
    }

    function onPointerUp() {
      if (!isPulling || arrowShot) return;
      isPulling = false;
      if (aimGuide) aimGuide.style.opacity = '0';

      if (pullDistance > 18) {
        launchArrow();
      } else {
        arrow.style.transition = 'transform 0.25s var(--ease-spring)';
        arrow.style.transform = 'translateX(-50%) translateY(0px)';
        bowString.setAttribute('d', 'M 30 100 Q 140 100 250 100');
        setTimeout(() => { arrow.style.transition = ''; }, 250);
      }
    }

    bowArea.addEventListener('mousedown', onPointerDown);
    window.addEventListener('mousemove', onPointerMove);
    window.addEventListener('mouseup', onPointerUp);

    bowArea.addEventListener('touchstart', onPointerDown, { passive: true });
    window.addEventListener('touchmove', onPointerMove, { passive: true });
    window.addEventListener('touchend', onPointerUp);

    bowArea.addEventListener('click', () => {
      if (!arrowShot && pullDistance === 0) {
        arrow.style.transition = 'transform 0.15s ease-out';
        arrow.style.transform = 'translateX(-50%) translateY(45px)';
        bowString.setAttribute('d', 'M 30 100 Q 140 145 250 100');
        setTimeout(() => { launchArrow(); }, 160);
      }
    });

    function launchArrow() {
      if (arrowShot) return;
      arrowShot = true;
      startAudio();

      const heartRect = targetHeart.getBoundingClientRect();
      const arrowRect = arrow.getBoundingClientRect();

      const travelY = heartRect.top + heartRect.height / 2 - (arrowRect.top + arrowRect.height / 2);

      arrow.style.transition = 'transform 0.35s cubic-bezier(0.2, 0.9, 0.3, 1)';
      arrow.style.transform = `translateX(-50%) translateY(${travelY}px) scale(0.8)`;
      bowString.setAttribute('d', 'M 30 100 Q 140 100 250 100');

      setTimeout(() => {
        playTone('hit');
        triggerHeartBurst(heartRect.left + heartRect.width / 2, heartRect.top + heartRect.height / 2);

        setTimeout(() => {
          goToScreen(2);
        }, 1100);
      }, 340);
    }
  }

  function triggerHeartBurst(x, y) {
    const fxCanvas = document.getElementById('fx-canvas');
    if (!fxCanvas) return;
    const ctx = fxCanvas.getContext('2d');
    fxCanvas.width = window.innerWidth;
    fxCanvas.height = window.innerHeight;

    const particles = [];
    const colors = ['#f472b6', '#db2777', '#fbcfe8', '#ffd700', '#ffffff'];

    for (let i = 0; i < 75; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 11 + 3;
      particles.push({
        x: x,
        y: y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        r: Math.random() * 5 + 2,
        color: colors[Math.floor(Math.random() * colors.length)],
        life: 0,
        maxLife: Math.random() * 30 + 30
      });
    }

    function render() {
      ctx.clearRect(0, 0, fxCanvas.width, fxCanvas.height);
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.96;
        p.vy *= 0.96;
        p.life++;

        if (p.life >= p.maxLife) {
          particles.splice(i, 1);
          continue;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = 1 - (p.life / p.maxLife);
        ctx.fill();
      }

      if (particles.length > 0) {
        requestAnimationFrame(render);
      } else {
        ctx.clearRect(0, 0, fxCanvas.width, fxCanvas.height);
      }
    }
    render();
  }

  // --------------------------------------------------------------------------
  // 4. SCREEN 2: THE TREE OF LOVE (HEART-LEAF CANOPY RUSTLING)
  // --------------------------------------------------------------------------
  let treeInitialized = false;

  function initTreeOfLove() {
    if (treeInitialized) return;
    treeInitialized = true;

    const canvas = document.getElementById('heart-tree-canvas');
    const nextBtn = document.getElementById('treeNextBtn');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const rect = canvas.parentElement.getBoundingClientRect();
    canvas.width = rect.width || 450;
    canvas.height = rect.height || 360;

    const leafCount = 160;
    const leaves = [];
    const leafColors = ['#f472b6', '#ec4899', '#fbcfe8', '#fde68a', '#fbbf24', '#f43f5e'];

    const centerX = canvas.width / 2;
    const canopyCenterY = canvas.height * 0.42;

    for (let i = 0; i < leafCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radiusX = Math.pow(Math.random(), 0.7) * (canvas.width * 0.34);
      const radiusY = Math.pow(Math.random(), 0.7) * (canvas.height * 0.3);

      leaves.push({
        baseX: centerX + Math.cos(angle) * radiusX,
        baseY: canopyCenterY + Math.sin(angle) * radiusY,
        x: 0,
        y: 0,
        size: Math.random() * 8 + 6,
        color: leafColors[Math.floor(Math.random() * leafColors.length)],
        swayOffset: Math.random() * Math.PI * 2,
        swaySpeed: Math.random() * 0.04 + 0.02
      });
    }

    let time = 0;

    function renderTree() {
      if (currentScreen !== 2) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      time += 0.03;

      ctx.strokeStyle = '#831843';
      ctx.lineWidth = 10;
      ctx.lineCap = 'round';

      // Trunk
      ctx.beginPath();
      ctx.moveTo(centerX, canvas.height);
      ctx.quadraticCurveTo(centerX - 10, canvas.height * 0.7, centerX, canopyCenterY + 40);
      ctx.stroke();

      // Branches
      ctx.lineWidth = 6;
      ctx.beginPath();
      ctx.moveTo(centerX, canopyCenterY + 50);
      ctx.quadraticCurveTo(centerX - 40, canopyCenterY + 20, centerX - 70, canopyCenterY - 10);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(centerX, canopyCenterY + 45);
      ctx.quadraticCurveTo(centerX + 40, canopyCenterY + 15, centerX + 75, canopyCenterY - 15);
      ctx.stroke();

      for (let i = 0; i < leaves.length; i++) {
        const l = leaves[i];
        const sway = Math.sin(time + l.swayOffset) * 4;
        l.x = l.baseX + sway;
        l.y = l.baseY + Math.cos(time * 0.8 + l.swayOffset) * 2;

        drawMiniHeart(ctx, l.x, l.y, l.size, l.color);
      }

      requestAnimationFrame(renderTree);
    }

    function drawMiniHeart(ctx, x, y, size, color) {
      ctx.save();
      ctx.translate(x, y);
      ctx.fillStyle = color;
      ctx.beginPath();
      const topCurveHeight = size * 0.3;
      ctx.moveTo(0, topCurveHeight);
      ctx.bezierCurveTo(0, 0, -size / 2, 0, -size / 2, topCurveHeight);
      ctx.bezierCurveTo(-size / 2, (size + topCurveHeight) / 2, 0, size, 0, size);
      ctx.bezierCurveTo(0, size, size / 2, (size + topCurveHeight) / 2, size / 2, topCurveHeight);
      ctx.bezierCurveTo(size / 2, 0, 0, 0, 0, topCurveHeight);
      ctx.fill();
      ctx.restore();
    }

    renderTree();

    const p1 = document.querySelector('.phrase-1');
    const p2 = document.querySelector('.phrase-2');
    const p3 = document.querySelector('.phrase-3');

    setTimeout(() => { if (p1) p1.classList.add('visible'); }, 600);
    setTimeout(() => { if (p2) p2.classList.add('visible'); }, 1400);
    setTimeout(() => { if (p3) p3.classList.add('visible'); }, 2200);
    setTimeout(() => { if (nextBtn) nextBtn.classList.add('visible'); }, 2900);

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        goToScreen(3);
      });
    }
  }

  // --------------------------------------------------------------------------
  // 5. SCREEN 3: THE CINEMATIC CONFESSION
  // --------------------------------------------------------------------------
  function initScreen3() {
    const nextBtn = document.getElementById('confessionNextBtn');
    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        goToScreen(4);
      });
    }
  }

  // --------------------------------------------------------------------------
  // 6. SCREEN 4: THE PHOTO COLLAGE & PUZZLE (8 REAL POLAROIDS)
  // --------------------------------------------------------------------------
  let collageInitialized = false;

  function initPhotoCollage() {
    if (collageInitialized) return;
    collageInitialized = true;

    const stage = document.getElementById('polaroidsStage');
    const revealAllBtn = document.getElementById('revealAllBtn');
    const toLettersBtn = document.getElementById('toLettersBtn');

    const lightbox = document.getElementById('photoLightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxCaption = document.getElementById('lightboxCaption');
    const lightboxClose = document.getElementById('lightboxClose');
    const lightboxBackdrop = document.getElementById('lightboxBackdrop');

    function openLightbox(src, caption) {
      if (!lightbox || !lightboxImg) return;
      lightboxImg.src = src;
      if (lightboxCaption) lightboxCaption.textContent = caption;
      lightbox.classList.remove('hidden');
    }

    function closeLightbox() {
      if (lightbox) lightbox.classList.add('hidden');
    }

    if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
    if (lightboxBackdrop) lightboxBackdrop.addEventListener('click', closeLightbox);

    if (!stage || !CONFIG.screen4 || !CONFIG.screen4.photos) return;

    stage.innerHTML = '';
    const photos = CONFIG.screen4.photos;
    let flippedCount = 0;

    photos.forEach((item, index) => {
      const card = document.createElement('div');
      card.className = 'polaroid-flip-card';
      card.dataset.id = item.id;

      card.innerHTML = `
        <div class="card-inner">
          <div class="card-back">
            <span class="lock-heart">💖</span>
            <span class="card-num">${index + 1}</span>
          </div>
          <div class="card-front">
            <img src="${item.src}" alt="${item.caption}" class="card-photo" loading="lazy">
            <span class="card-caption">${item.caption}</span>
          </div>
        </div>
      `;

      card.addEventListener('click', () => {
        if (!card.classList.contains('flipped')) {
          card.classList.add('flipped');
          flippedCount++;
          playTone('flip');
          checkAllFlipped();
        } else {
          openLightbox(item.src, item.caption);
        }
      });

      stage.appendChild(card);
    });

    function checkAllFlipped() {
      if (flippedCount === photos.length) {
        playTone('chime');
        if (revealAllBtn) revealAllBtn.classList.add('hidden');
        if (toLettersBtn) toLettersBtn.classList.remove('hidden');

        const cards = stage.querySelectorAll('.polaroid-flip-card');
        cards.forEach((c, idx) => {
          c.style.transform = `rotate(${photos[idx].rotate}) scale(1.02)`;
        });
      }
    }

    if (revealAllBtn) {
      revealAllBtn.addEventListener('click', () => {
        const cards = stage.querySelectorAll('.polaroid-flip-card');
        cards.forEach((c, idx) => {
          setTimeout(() => {
            if (!c.classList.contains('flipped')) {
              c.classList.add('flipped');
              playTone('flip');
            }
            if (idx === cards.length - 1) {
              flippedCount = photos.length;
              checkAllFlipped();
            }
          }, idx * 100);
        });
      });
    }

    if (toLettersBtn) {
      toLettersBtn.addEventListener('click', () => {
        goToScreen(5);
      });
    }
  }

  // --------------------------------------------------------------------------
  // 7. SCREEN 5: THE LETTER & SURPRISE UNLOCK (THE BRIDGE SCREEN)
  // --------------------------------------------------------------------------
  let lettersInitialized = false;

  function initLetters() {
    if (lettersInitialized) return;
    lettersInitialized = true;

    const cfg5 = CONFIG.screen5 || {};
    const paragraphs = cfg5.paragraphs || [];
    const headerBadge = document.querySelector('#screen-5 .letter-top-badge');
    const cardViewport = document.querySelector('#screen-5 .letters-card-viewport');
    const textWrapper = document.querySelector('#screen-5 .letter-text-wrapper');
    const textBody = document.getElementById('letterTextBody');
    const stepBadge = document.getElementById('letterStepBadge');
    const dotsContainer = document.getElementById('letterDots');
    const prevBtn = document.getElementById('letterPrev');
    const nextBtn = document.getElementById('letterNext');
    const signoffQuote = document.getElementById('signoffQuote');
    const toPasscodeBtn = document.getElementById('toPasscodeBtn');

    if (headerBadge && cfg5.headerTitle) headerBadge.textContent = cfg5.headerTitle;
    if (signoffQuote && cfg5.signature) signoffQuote.textContent = cfg5.signature;
    if (toPasscodeBtn && cfg5.unlockButtonText) {
      toPasscodeBtn.innerHTML = `<span>${cfg5.unlockButtonText}</span>`;
    }

    let currentParagraphIndex = 0;
    let slideTimer = null;

    if (dotsContainer) {
      dotsContainer.innerHTML = '';
      paragraphs.forEach((_, idx) => {
        const dot = document.createElement('span');
        dot.className = `letter-dot ${idx === 0 ? 'active' : ''}`;
        dot.addEventListener('click', () => {
          const dir = idx >= currentParagraphIndex ? 1 : -1;
          showParagraph(idx, dir);
        });
        dotsContainer.appendChild(dot);
      });
    }

    function showParagraph(index, direction = 0) {
      if (!paragraphs.length) return;
      currentParagraphIndex = index;

      if (stepBadge) {
        stepBadge.textContent = `PARAGRAPH ${currentParagraphIndex + 1} OF ${paragraphs.length}`;
      }

      if (dotsContainer) {
        const dots = dotsContainer.querySelectorAll('.letter-dot');
        dots.forEach((d, idx) => d.classList.toggle('active', idx === currentParagraphIndex));
      }

      if (textBody) {
        if (slideTimer) clearTimeout(slideTimer);

        if (direction === 0) {
          textBody.style.transition = 'none';
          textBody.style.opacity = '1';
          textBody.style.transform = 'translateX(0)';
          textBody.textContent = `"${paragraphs[currentParagraphIndex]}"`;
          if (textWrapper) textWrapper.scrollTop = 0;
        } else {
          playTone('flip');
          const outOffset = direction > 0 ? '-24px' : '24px';
          const inOffset = direction > 0 ? '24px' : '-24px';

          textBody.style.transition = 'transform 0.16s ease-in, opacity 0.16s ease-in';
          textBody.style.opacity = '0';
          textBody.style.transform = `translateX(${outOffset})`;

          slideTimer = setTimeout(() => {
            textBody.textContent = `"${paragraphs[currentParagraphIndex]}"`;
            if (textWrapper) textWrapper.scrollTop = 0;

            textBody.style.transition = 'none';
            textBody.style.transform = `translateX(${inOffset})`;

            requestAnimationFrame(() => {
              requestAnimationFrame(() => {
                textBody.style.transition = 'transform 0.32s var(--ease-smooth), opacity 0.32s var(--ease-smooth)';
                textBody.style.opacity = '1';
                textBody.style.transform = 'translateX(0)';
              });
            });
          }, 160);
        }
      }
    }

    function goPrev() {
      const target = currentParagraphIndex > 0 ? currentParagraphIndex - 1 : paragraphs.length - 1;
      showParagraph(target, -1);
    }

    function goNext() {
      const target = currentParagraphIndex < paragraphs.length - 1 ? currentParagraphIndex + 1 : 0;
      showParagraph(target, 1);
    }

    showParagraph(0, 0);

    if (prevBtn) prevBtn.addEventListener('click', goPrev);
    if (nextBtn) nextBtn.addEventListener('click', goNext);

    // Swipe carousel gesture inside white card
    if (cardViewport) {
      let swipeStartX = 0;
      let swipeStartY = 0;
      cardViewport.addEventListener('touchstart', (e) => {
        swipeStartX = e.touches[0].clientX;
        swipeStartY = e.touches[0].clientY;
      }, { passive: true });
      cardViewport.addEventListener('touchend', (e) => {
        const dx = e.changedTouches[0].clientX - swipeStartX;
        const dy = e.changedTouches[0].clientY - swipeStartY;
        if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy) * 1.3) {
          if (dx < 0) goNext();
          else goPrev();
        }
      }, { passive: true });
    }

    // Keyboard arrow support on Screen 5
    window.addEventListener('keydown', (e) => {
      if (currentScreen !== 5) return;
      if (e.key === 'ArrowRight') goNext();
      else if (e.key === 'ArrowLeft') goPrev();
    });

    // Bridge Action: Transition to Screen 6 (Passcode Lock Screen)
    if (toPasscodeBtn) {
      toPasscodeBtn.addEventListener('click', () => {
        goToScreen(6);
      });
    }
  }

  // --------------------------------------------------------------------------
  // 8. SCREEN 6: THE "UNLOCK FOR SURPRISE" PASSCODE PAGE (PIN: 1210)
  // --------------------------------------------------------------------------
  let passcodeInitialized = false;
  let enteredPin = "";
  const REQUIRED_PIN = (CONFIG.screen6 && CONFIG.screen6.passcode) || "1210";

  function initPasscodeScreen() {
    if (passcodeInitialized) return;
    passcodeInitialized = true;

    const keys = document.querySelectorAll('.keypad-key');
    const deleteBtn = document.getElementById('keypadBackspace');
    const enterBtn = document.getElementById('keypadEnter');
    const pinDisplayRow = document.getElementById('pinDisplayRow');
    const screenFlash = document.getElementById('screenFlash');

    function updatePinDisplay() {
      for (let i = 0; i < 4; i++) {
        const box = document.getElementById(`pinBox${i}`);
        if (!box) continue;
        if (i < enteredPin.length) {
          box.textContent = "💜"; // Sweet filled indicator
          box.classList.add('filled');
        } else {
          box.textContent = "";
          box.classList.remove('filled');
        }
      }
    }

    function handleKeyPress(keyVal) {
      if (enteredPin.length < 4) {
        enteredPin += keyVal;
        playTone('key');
        updatePinDisplay();

        // Auto verify when 4 digits entered
        if (enteredPin.length === 4) {
          setTimeout(verifyPin, 250);
        }
      }
    }

    function handleDelete() {
      if (enteredPin.length > 0) {
        enteredPin = enteredPin.slice(0, -1);
        playTone('key');
        updatePinDisplay();
      }
    }

    function verifyPin() {
      if (enteredPin === REQUIRED_PIN) {
        // SUCCESS STATE!
        playTone('chime');

        // White screen flash transition to Screen 7 (The Cake Cutting Experience)
        if (screenFlash) {
          screenFlash.classList.remove('hidden');
          setTimeout(() => {
            goToScreen(7);
            setTimeout(() => {
              screenFlash.classList.add('hidden');
            }, 600);
          }, 350);
        } else {
          goToScreen(7);
        }

      } else {
        // ERROR STATE: Shake and clear
        playTone('error');
        if (pinDisplayRow) pinDisplayRow.classList.add('shake-error');

        setTimeout(() => {
          if (pinDisplayRow) pinDisplayRow.classList.remove('shake-error');
          enteredPin = "";
          updatePinDisplay();
        }, 500);
      }
    }

    keys.forEach((keyEl) => {
      keyEl.addEventListener('click', () => {
        const val = keyEl.getAttribute('data-key');
        if (val) handleKeyPress(val);
      });
    });

    if (deleteBtn) deleteBtn.addEventListener('click', handleDelete);
    if (enterBtn) enterBtn.addEventListener('click', verifyPin);

    // Keyboard support (typing 1210, Backspace, Enter)
    window.addEventListener('keydown', (e) => {
      if (currentScreen !== 6) return;
      if (e.key >= '0' && e.key <= '9') {
        handleKeyPress(e.key);
      } else if (e.key === 'Backspace') {
        handleDelete();
      } else if (e.key === 'Enter') {
        verifyPin();
      }
    });
  }

  // --------------------------------------------------------------------------
  // 9. SCREEN 7: THE CAKE CUTTING EXPERIENCE (SLICE TO REVEAL)
  // --------------------------------------------------------------------------
  let cakeCuttingInitialized = false;

  function initCakeCutting() {
    if (cakeCuttingInitialized) return;
    cakeCuttingInitialized = true;

    const stage = document.getElementById('cakeInteractiveStage');
    const knife = document.getElementById('virtualKnife');
    const topTier = document.getElementById('cakeTopTier');
    const laser = document.querySelector('.slice-laser');
    const titleEl = document.getElementById('cakeCutTitle');
    const hintEl = document.getElementById('cakeCutHint');
    const promptText = document.getElementById('slicePromptText');

    if (CONFIG.screen7) {
      if (titleEl && CONFIG.screen7.title) titleEl.textContent = CONFIG.screen7.title;
      if (hintEl) hintEl.textContent = isTouch ? CONFIG.screen7.instructionMobile : CONFIG.screen7.instructionDesktop;
      if (promptText) promptText.textContent = isTouch ? "Swipe across the cake to cut! ✨" : "Click or Slice across the cake! ✨";
    }

    if (!stage || !topTier) return;

    // Follow knife cursor on desktop
    if (!isTouch && knife) {
      stage.addEventListener('mousemove', (e) => {
        const rect = stage.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        knife.style.left = `${x}px`;
        knife.style.top = `${y}px`;
      });
    }

    let isSliced = false;

    function triggerSliceCut() {
      if (isSliced) return;
      isSliced = true;

      playTone('hit');

      // Animate laser cutting line down
      if (laser) {
        laser.style.height = '100%';
      }

      // Cut piece animation
      setTimeout(() => {
        topTier.classList.add('sliced');
        playTone('chime');

        // Confetti explosion
        triggerCakeConfetti();

        // Smooth transition to Screen 8 (Grand Finale)
        setTimeout(() => {
          goToScreen(8);
        }, 1300);
      }, 250);
    }

    // Click on cake to cut
    stage.addEventListener('click', triggerSliceCut);

    // Touch swipe gesture detection on mobile
    let touchStartX = 0;
    let touchStartY = 0;

    stage.addEventListener('touchstart', (e) => {
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
    }, { passive: true });

    stage.addEventListener('touchend', (e) => {
      const touchEndX = e.changedTouches[0].clientX;
      const touchEndY = e.changedTouches[0].clientY;
      const dist = Math.hypot(touchEndX - touchStartX, touchEndY - touchStartY);

      if (dist > 25 || dist === 0) {
        triggerSliceCut();
      }
    });
  }

  function triggerCakeConfetti() {
    const fxCanvas = document.getElementById('fx-canvas');
    if (!fxCanvas) return;
    const ctx = fxCanvas.getContext('2d');
    fxCanvas.width = window.innerWidth;
    fxCanvas.height = window.innerHeight;

    const confetti = [];
    const colors = ['#f472b6', '#fbbf24', '#ffd700', '#ec4899', '#c084fc', '#ffffff', '#38bdf8'];

    for (let i = 0; i < 90; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 12 + 4;
      confetti.push({
        x: fxCanvas.width / 2,
        y: fxCanvas.height * 0.45,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 3,
        r: Math.random() * 6 + 3,
        color: colors[Math.floor(Math.random() * colors.length)],
        life: 0,
        maxLife: Math.random() * 35 + 35
      });
    }

    function renderConfetti() {
      ctx.clearRect(0, 0, fxCanvas.width, fxCanvas.height);
      for (let i = confetti.length - 1; i >= 0; i--) {
        const c = confetti[i];
        c.x += c.vx;
        c.y += c.vy;
        c.vy += 0.35; // gravity
        c.vx *= 0.98;
        c.life++;

        if (c.life >= c.maxLife) {
          confetti.splice(i, 1);
          continue;
        }

        ctx.beginPath();
        ctx.arc(c.x, c.y, c.r, 0, Math.PI * 2);
        ctx.fillStyle = c.color;
        ctx.globalAlpha = 1 - (c.life / c.maxLife);
        ctx.fill();
      }

      if (confetti.length > 0) {
        requestAnimationFrame(renderConfetti);
      } else {
        ctx.clearRect(0, 0, fxCanvas.width, fxCanvas.height);
      }
    }
    renderConfetti();
  }

  // --------------------------------------------------------------------------
  // 10. SCREEN 8: THE GRAND FINALE (GLOWING LETTER & FIREWORKS)
  // --------------------------------------------------------------------------
  let finaleInitialized = false;

  function initFinaleScreen() {
    if (finaleInitialized) return;
    finaleInitialized = true;

    // Populate customized texts strictly per user prompt
    const pillBadge = document.getElementById('finalePillBadge');
    const headingEl = document.getElementById('finaleMassiveHeading');
    const subheadingEl = document.getElementById('finalePinkSubheading');
    const paragraphEl = document.getElementById('finaleLoveParagraph');
    const signatureEl = document.getElementById('finaleGoldSignature');
    const reliveBtn = document.getElementById('reliveJourneyBtn');

    if (CONFIG.screen8) {
      if (pillBadge) pillBadge.textContent = CONFIG.screen8.badge || "A PROMISE WRITTEN IN THE STARS";
      if (headingEl) headingEl.textContent = CONFIG.screen8.heading || "I LOVE YOU";
      if (subheadingEl) subheadingEl.textContent = CONFIG.screen8.subheading || "HAPPY BIRTHDAY, MY MUSKAN ♥️";
      if (paragraphEl && CONFIG.screen8.message) paragraphEl.textContent = CONFIG.screen8.message;
      if (signatureEl) signatureEl.textContent = CONFIG.screen8.signature || "Always and forever yours ♥️";
      if (reliveBtn && CONFIG.screen8.replayButtonText) reliveBtn.innerHTML = `<span>${CONFIG.screen8.replayButtonText}</span>`;
    }

    // Reset entire app back to Screen 1
    if (reliveBtn) {
      reliveBtn.addEventListener('click', () => {
        window.location.reload();
      });
    }

    // Dynamic Looping Fireworks & Lightning Background Engine
    const canvas = document.getElementById('fireworks-lightning-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    const fireworks = [];
    const particles = [];
    const colors = ['#f472b6', '#ec4899', '#fbbf24', '#ffd700', '#c084fc', '#ffffff', '#38bdf8'];

    let lightningBranches = [];
    let lightningFlashAlpha = 0;
    let nextLightningTime = Date.now() + 2000;

    function triggerLightning() {
      lightningFlashAlpha = 0.32;
      const startX = Math.random() * canvas.width;
      lightningBranches = createLightningBranch(startX, 0, Math.PI / 2, canvas.height * 0.75, 4);
      nextLightningTime = Date.now() + Math.random() * 4000 + 2500;
    }

    function createLightningBranch(x, y, angle, length, depth) {
      if (depth <= 0 || length < 10) return [];
      const branch = [];
      let curX = x;
      let curY = y;
      const steps = Math.floor(length / 15);

      for (let i = 0; i < steps; i++) {
        const nextX = curX + (Math.random() - 0.5) * 24 + Math.cos(angle) * 15;
        const nextY = curY + Math.sin(angle) * 15 + Math.random() * 8;
        branch.push({ x1: curX, y1: curY, x2: nextX, y2: nextY });
        curX = nextX;
        curY = nextY;

        if (Math.random() < 0.25 && depth > 1) {
          const subAngle = angle + (Math.random() - 0.5) * 0.8;
          const subBranches = createLightningBranch(curX, curY, subAngle, length * 0.5, depth - 1);
          branch.push(...subBranches);
        }
      }
      return branch;
    }

    function spawnFirework() {
      const startX = Math.random() * canvas.width * 0.8 + canvas.width * 0.1;
      const targetY = Math.random() * canvas.height * 0.45 + 50;
      fireworks.push({
        x: startX,
        y: canvas.height,
        targetY: targetY,
        vx: (Math.random() - 0.5) * 3,
        vy: -(Math.random() * 5 + 12),
        color: colors[Math.floor(Math.random() * colors.length)]
      });
    }

    function explodeFirework(x, y, color) {
      const count = Math.floor(Math.random() * 40 + 50);
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 7 + 2;
        particles.push({
          x: x,
          y: y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          color: color,
          alpha: 1,
          life: 0,
          maxLife: Math.random() * 45 + 35,
          size: Math.random() * 3 + 1.5
        });
      }
    }

    let lastFireworkSpawn = 0;

    function renderFinaleLoop(timestamp) {
      if (currentScreen !== 8) return;

      ctx.fillStyle = 'rgba(3, 1, 11, 0.22)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      if (Date.now() > nextLightningTime) {
        triggerLightning();
      }

      if (lightningFlashAlpha > 0) {
        ctx.fillStyle = `rgba(238, 210, 255, ${lightningFlashAlpha})`;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        lightningFlashAlpha *= 0.85;
      }

      if (lightningBranches.length > 0) {
        ctx.strokeStyle = '#f3e8ff';
        ctx.lineWidth = 2.5;
        ctx.shadowColor = '#c084fc';
        ctx.shadowBlur = 15;
        ctx.beginPath();
        lightningBranches.forEach((b) => {
          ctx.moveTo(b.x1, b.y1);
          ctx.lineTo(b.x2, b.y2);
        });
        ctx.stroke();
        ctx.shadowBlur = 0;

        if (Math.random() < 0.4) lightningBranches = [];
      }

      if (timestamp - lastFireworkSpawn > 800) {
        spawnFirework();
        lastFireworkSpawn = timestamp;
      }

      for (let i = fireworks.length - 1; i >= 0; i--) {
        const fw = fireworks[i];
        fw.x += fw.vx;
        fw.y += fw.vy;

        ctx.beginPath();
        ctx.arc(fw.x, fw.y, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = fw.color;
        ctx.shadowColor = fw.color;
        ctx.shadowBlur = 10;
        ctx.fill();

        if (fw.y <= fw.targetY || fw.vy >= -1) {
          explodeFirework(fw.x, fw.y, fw.color);
          fireworks.splice(i, 1);
        }
      }

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.08;
        p.vx *= 0.98;
        p.life++;
        p.alpha = 1 - (p.life / p.maxLife);

        if (p.life >= p.maxLife) {
          particles.splice(i, 1);
          continue;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.globalAlpha = 1;
      }

      ctx.shadowBlur = 0;
      requestAnimationFrame(renderFinaleLoop);
    }

    requestAnimationFrame(renderFinaleLoop);
  }

  // --------------------------------------------------------------------------
  // 10. INITIALIZATION
  // --------------------------------------------------------------------------
  window.addEventListener('DOMContentLoaded', () => {
    initAudioControls();
    initScreen1();
    initScreen3();
  });

})();
