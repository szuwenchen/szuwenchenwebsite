(function () {
    'use strict';

    document.documentElement.classList.add('js');

    var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var $ = function (sel, root) { return (root || document).querySelector(sel); };
    var $$ = function (sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); };

    function el(tag, className, html) {
        var node = document.createElement(tag);
        if (className) node.className = className;
        if (html != null) node.innerHTML = html;
        return node;
    }

    function escapeHtml(text) {
        return String(text).replace(/[&<>"]/g, function (c) {
            return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c];
        });
    }

    /* ---------- 年份 / 年資 ---------- */

    var now = new Date();
    $('#year').textContent = now.getFullYear();
    // 2014 年 5 月進入遊戲業
    var years = now.getFullYear() - 2014 - (now.getMonth() < 4 ? 1 : 0);
    $('#playTime').textContent = years;

    /* ---------- 音效（Web Audio 合成，預設關閉） ---------- */

    var Sound = (function () {
        var KEY = 'szuwen-sound';
        var AudioCtx = window.AudioContext || window.webkitAudioContext;
        var ctx = null;
        var on = false;
        var unlocked = false; // 瀏覽器要求使用者先有操作才能發聲
        var button = $('#soundToggle');
        var state = $('#soundState');

        // 每個音效：[頻率 Hz, 起始秒, 長度秒]
        var SFX = {
            move: [[660, 0, 0.05]],
            tick: [[520, 0, 0.035]],
            confirm: [[660, 0, 0.07], [990, 0.07, 0.13]],
            open: [[523, 0, 0.06], [659, 0.06, 0.06], [784, 0.12, 0.06], [1047, 0.18, 0.16]],
            close: [[784, 0, 0.06], [523, 0.06, 0.13]],
            off: [[660, 0, 0.06], [440, 0.06, 0.12]],
            secret: [[523, 0, 0.09], [659, 0.09, 0.09], [784, 0.18, 0.09], [1047, 0.27, 0.09], [784, 0.36, 0.09], [1047, 0.45, 0.3]]
        };

        function schedule(notes) {
            if (!ctx) ctx = new AudioCtx();
            if (ctx.state === 'suspended') ctx.resume();
            var t0 = ctx.currentTime + 0.01;
            notes.forEach(function (n) {
                var osc = ctx.createOscillator();
                var gain = ctx.createGain();
                osc.type = 'square';
                osc.frequency.setValueAtTime(n[0], t0 + n[1]);
                gain.gain.setValueAtTime(0.05, t0 + n[1]);
                gain.gain.exponentialRampToValueAtTime(0.0001, t0 + n[1] + n[2]);
                osc.connect(gain);
                gain.connect(ctx.destination);
                osc.start(t0 + n[1]);
                osc.stop(t0 + n[1] + n[2] + 0.02);
            });
        }

        function play(name) {
            if (!on || !unlocked || !AudioCtx) return;
            try { schedule(SFX[name]); } catch (e) { /* 發聲失敗不影響操作 */ }
        }

        function render() {
            button.setAttribute('aria-pressed', on ? 'true' : 'false');
            state.textContent = on ? 'ON' : 'OFF';
        }

        if (AudioCtx) {
            try { on = localStorage.getItem(KEY) === 'on'; } catch (e) { /* 無法讀取就維持關閉 */ }
            button.hidden = false;
            render();

            button.addEventListener('click', function () {
                unlocked = true;
                if (on) play('off');
                on = !on;
                if (on) play('confirm');
                try { localStorage.setItem(KEY, on ? 'on' : 'off'); } catch (e) { /* 忽略 */ }
                render();
            });

            var unlock = function () { unlocked = true; };
            document.addEventListener('pointerdown', unlock, true);
            document.addEventListener('keydown', unlock, true);
        }

        return { play: play };
    })();

    // 滑過 / 點擊時的共用音效
    document.addEventListener('mouseover', function (e) {
        var target = e.target.closest && e.target.closest('.stage-card, .contact-list a, .hud-links a, .btn');
        if (target && !(e.relatedTarget && target.contains(e.relatedTarget))) Sound.play('move');
    });

    document.addEventListener('click', function (e) {
        var target = e.target.closest && e.target.closest('.title-menu a, .hud-links a, .contact-list a, a.btn, .site-footer a, .link-list a');
        if (target) Sound.play('confirm');
    });

    /* ---------- 作品列表 ---------- */

    var stages = []; // 攤平後的所有關卡，供上一關 / 下一關使用
    var worldsRoot = $('#worlds');

    function imgPath(stage, file) {
        return 'img/portfolio/' + stage.id + '/' + file;
    }

    function techChips(stage) {
        return stage.tech.map(function (t) {
            return '<span class="chip">' + escapeHtml(t) + '</span>';
        }).join('');
    }

    (window.WORLDS || []).forEach(function (world, w) {
        var section = el('div', 'world');
        section.appendChild(el('div', 'world-head',
            '<span class="world-label">' + escapeHtml(world.label) + '</span>' +
            '<h3 class="world-title">' + escapeHtml(world.title) + '</h3>' +
            '<span class="world-note">' + escapeHtml(world.note) + '</span>'));

        var grid = el('div', 'stage-grid');
        world.stages.forEach(function (stage, s) {
            stage.no = (w + 1) + '-' + (s + 1);
            var index = stages.push(stage) - 1;

            var card = el('button', 'stage-card reveal');
            card.type = 'button';
            card.innerHTML =
                '<span class="stage-thumb' + (stage.fit === 'contain' ? ' is-contain' : '') + '"' +
                (stage.thumbBg ? ' style="background:' + stage.thumbBg + '"' : '') + '>' +
                '<img src="' + imgPath(stage, stage.thumb) + '" alt="" loading="lazy" width="900" height="650">' +
                '<span class="stage-no">' + stage.no + '</span>' +
                '<span class="stage-enter">ENTER ▶</span>' +
                '</span>' +
                '<span class="stage-info">' +
                '<span class="stage-name">' + escapeHtml(stage.title) + '</span>' +
                '<p class="stage-meta"><b>' + stage.year + '</b>　' + escapeHtml(stage.type) + '</p>' +
                '<span class="stage-tech">' + techChips(stage) + '</span>' +
                '</span>';
            card.addEventListener('click', function () { Sound.play('open'); openStage(index); });
            grid.appendChild(card);
        });

        section.appendChild(grid);
        worldsRoot.appendChild(section);
    });

    /* ---------- 作品詳細視窗 ---------- */

    var dialog = $('#stageDialog');
    var dlgBody = $('#dlgBody');
    var current = 0;
    var shotIndex = 0;

    function renderGallery(stage) {
        if (!stage.shots.length) return '';
        var many = stage.shots.length > 1;
        return '<div class="gallery">' +
            '<div class="gallery-main">' +
            '<img id="shotMain" src="' + imgPath(stage, stage.shots[0]) + '" alt="' + escapeHtml(stage.title) + ' 截圖">' +
            (many
                ? '<button type="button" class="gallery-nav prev" data-shot="prev" aria-label="上一張">◀</button>' +
                  '<button type="button" class="gallery-nav next" data-shot="next" aria-label="下一張">▶</button>' +
                  '<span class="gallery-count" id="shotCount"></span>'
                : '') +
            '</div>' +
            (many
                ? '<div class="gallery-thumbs">' + stage.shots.map(function (file, i) {
                    return '<button type="button" data-shot="' + i + '" aria-label="第 ' + (i + 1) + ' 張">' +
                        '<img src="' + imgPath(stage, file) + '" alt="" loading="lazy"></button>';
                }).join('') + '</div>'
                : '') +
            '</div>';
    }

    function showShot(i) {
        var stage = stages[current];
        var total = stage.shots.length;
        if (!total) return;
        shotIndex = (i + total) % total;
        $('#shotMain').src = imgPath(stage, stage.shots[shotIndex]);
        var count = $('#shotCount');
        if (count) count.textContent = (shotIndex + 1) + ' / ' + total;
        $$('.gallery-thumbs button', dlgBody).forEach(function (btn, n) {
            btn.setAttribute('aria-current', n === shotIndex ? 'true' : 'false');
            if (n === shotIndex && btn.scrollIntoView) btn.scrollIntoView({ block: 'nearest', inline: 'nearest' });
        });
    }

    function openStage(index) {
        current = (index + stages.length) % stages.length;
        var stage = stages[current];

        $('#dlgNo').textContent = 'STAGE ' + stage.no;
        $('#dlgTitle').textContent = stage.title;

        var text = stage.sections.map(function (sec) {
            var body = /^\s*<p[ >]/.test(sec.html) ? sec.html : '<p>' + sec.html + '</p>';
            return '<h3>' + escapeHtml(sec.h) + '</h3>' + body;
        }).join('');

        text += '<h3>My Job</h3><ul class="job-list">' + stage.jobs.map(function (job) {
            return '<li>' + escapeHtml(job) + '</li>';
        }).join('') + '</ul>';

        if (stage.links && stage.links.length) {
            text += '<h3>Links</h3><div class="link-list">' + stage.links.map(function (link) {
                return '<a href="' + escapeHtml(link.href) + '"' +
                    (link.download ? ' download' : ' target="_blank" rel="noopener"') + '>' +
                    escapeHtml(link.label) + '</a>';
            }).join('') + '</div>';
        }

        dlgBody.innerHTML = renderGallery(stage) +
            '<div class="dlg-cols">' +
            '<div class="dlg-text">' + text + '</div>' +
            '<dl class="dlg-meta">' +
            '<div><dt>TYPE</dt><dd>' + escapeHtml(stage.type) + '</dd></div>' +
            '<div><dt>YEAR</dt><dd>' + stage.year + '</dd></div>' +
            '<div><dt>SOURCE</dt><dd>' + escapeHtml(stage.source) + '</dd></div>' +
            '<div><dt>TECH</dt><dd class="stage-tech">' + techChips(stage) + '</dd></div>' +
            '</dl>' +
            '</div>';

        dlgBody.scrollTop = 0;
        showShot(0);
        if (!dialog.open) dialog.showModal();
    }

    dlgBody.addEventListener('click', function (e) {
        var btn = e.target.closest('[data-shot]');
        if (!btn) return;
        var v = btn.getAttribute('data-shot');
        Sound.play('tick');
        showShot(v === 'prev' ? shotIndex - 1 : v === 'next' ? shotIndex + 1 : Number(v));
    });

    function closeStage() { Sound.play('close'); dialog.close(); }

    $('#dlgClose').addEventListener('click', closeStage);
    $('#dlgPrev').addEventListener('click', function () { Sound.play('open'); openStage(current - 1); });
    $('#dlgNext').addEventListener('click', function () { Sound.play('open'); openStage(current + 1); });
    dialog.addEventListener('cancel', function () { Sound.play('close'); }); // Esc 鍵

    // 點擊視窗外側關閉
    dialog.addEventListener('click', function (e) {
        if (e.target === dialog) closeStage();
    });

    dialog.addEventListener('keydown', function (e) {
        if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return;
        if (stages[current].shots.length > 1) Sound.play('tick');
        showShot(shotIndex + (e.key === 'ArrowLeft' ? -1 : 1));
    });

    /* ---------- 標題選單：鍵盤操作 ---------- */

    var menuLinks = $$('#titleMenu a');
    var menuIndex = 0;

    function setMenu(i) {
        var next = (i + menuLinks.length) % menuLinks.length;
        if (next !== menuIndex) Sound.play('move');
        menuIndex = next;
        menuLinks.forEach(function (a, n) { a.classList.toggle('is-active', n === menuIndex); });
    }

    menuLinks.forEach(function (a, n) {
        a.addEventListener('mouseenter', function () { setMenu(n); });
        a.addEventListener('focus', function () { setMenu(n); });
    });

    document.addEventListener('keydown', function (e) {
        if (dialog.open || window.scrollY > window.innerHeight * 0.5) return;
        if (e.key === 'ArrowDown') { setMenu(menuIndex + 1); e.preventDefault(); }
        else if (e.key === 'ArrowUp') { setMenu(menuIndex - 1); e.preventDefault(); }
        else if (e.key === 'Enter' && (document.activeElement === document.body || !document.activeElement)) {
            menuLinks[menuIndex].click();
        }
    });

    /* ---------- HUD：目前區塊 ---------- */

    var hudLinks = $$('.hud-links a');
    var sections = hudLinks.map(function (a) { return $(a.getAttribute('href')); });

    function updateHud() {
        var line = window.scrollY + window.innerHeight * 0.4;
        var active = -1;
        sections.forEach(function (sec, i) { if (sec.offsetTop <= line) active = i; });
        hudLinks.forEach(function (a, i) { a.classList.toggle('is-current', i === active); });
    }

    window.addEventListener('scroll', updateHud, { passive: true });
    updateHud();

    /* ---------- 進場動畫 ---------- */

    var reveals = $$('.reveal');
    if ('IntersectionObserver' in window && !reduceMotion) {
        var io = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-in');
                    io.unobserve(entry.target);
                }
            });
        }, { rootMargin: '0px 0px -8% 0px' });
        reveals.forEach(function (node) { io.observe(node); });
    } else {
        reveals.forEach(function (node) { node.classList.add('is-in'); });
    }

    /* ---------- 像素星空背景 ---------- */

    var canvas = $('#stars');
    var ctx = canvas.getContext('2d');
    var starList = [];
    var COLORS = ['#f4f1ff', '#f4f1ff', '#a9a6d6', '#5ce1ff', '#ffd447', '#ff5c8a'];

    function resizeStars() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        var count = Math.round(canvas.width * canvas.height / 9000);
        starList = [];
        for (var i = 0; i < count; i++) {
            var layer = 1 + Math.floor(Math.random() * 3);
            starList.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                size: layer === 3 ? 4 : 2,
                speed: layer * 0.12,
                color: COLORS[Math.floor(Math.random() * COLORS.length)],
                phase: Math.random() * 6.28
            });
        }
        drawStars(0);
    }

    function drawStars(t) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (var i = 0; i < starList.length; i++) {
            var s = starList[i];
            ctx.globalAlpha = 0.35 + 0.45 * (Math.sin(t / 700 + s.phase) > 0 ? 1 : 0.4);
            ctx.fillStyle = s.color;
            ctx.fillRect(Math.round(s.x / 2) * 2, Math.round(s.y / 2) * 2, s.size, s.size);
        }
    }

    function tickStars(t) {
        for (var i = 0; i < starList.length; i++) {
            var s = starList[i];
            s.y += s.speed;
            if (s.y > canvas.height) { s.y = -4; s.x = Math.random() * canvas.width; }
        }
        drawStars(t);
        if (!document.hidden) requestAnimationFrame(tickStars);
    }

    window.addEventListener('resize', resizeStars);
    resizeStars();
    if (!reduceMotion) {
        requestAnimationFrame(tickStars);
        document.addEventListener('visibilitychange', function () {
            if (!document.hidden) requestAnimationFrame(tickStars);
        });
    }

    /* ---------- 彩蛋：↑↑↓↓←→←→BA ---------- */

    var CODE = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    var codePos = 0;
    var toast = $('#toast');
    var toastTimer;

    document.addEventListener('keydown', function (e) {
        var key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
        codePos = key === CODE[codePos] ? codePos + 1 : (key === CODE[0] ? 1 : 0);
        if (codePos === CODE.length) {
            codePos = 0;
            Sound.play('secret');
            toast.textContent = '★ 隱藏成就解鎖：老玩家';
            toast.classList.add('is-show');
            clearTimeout(toastTimer);
            toastTimer = setTimeout(function () { toast.classList.remove('is-show'); }, 3200);
        }
    });
})();
