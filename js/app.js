/* ================================================================
   app.js — Rendu des pages depuis les API PHP
   ================================================================ */

/* --- Helpers --- */
function esc(str) {
    const d = document.createElement('div');
    d.textContent = str ?? '';
    return d.innerHTML;
}

function setSolidNav() {
    const nav = document.getElementById('main-nav');
    if (!nav) return;
    nav.classList.add('bg-white/95', 'backdrop-blur-xl', 'border-b', 'border-slate-100', 'py-4', 'shadow-sm');
    nav.classList.remove('bg-transparent', 'py-7', 'md:py-9');
}

/* --- API --- */
async function getProducts() {
    return fetch('/api/products.php').then(r => r.json());
}
async function getArticles() {
    return fetch('/api/articles.php').then(r => r.json());
}

/* ================================================================
   PAGE : ACCUEIL
   ================================================================ */
async function initHome() {
    const [products, articles] = await Promise.all([getProducts(), getArticles()]);

    /* Grille des services */
    const grid = document.getElementById('products-grid');
    if (grid) {
        grid.innerHTML = products.map(p => `
            <a href="/product.html?id=${p.id}"
               class="group bg-white rounded-3xl p-5 border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] hover:border-blue-100 transition-all duration-500 flex flex-col h-full active:scale-[0.98] reveal" style="text-decoration:none">
                <div class="relative aspect-[4/3] rounded-2xl overflow-hidden mb-8 bg-slate-50">
                    <img src="${esc(p.imageUrl)}" alt="${esc(p.name)}" loading="lazy" width="400" height="300"
                         class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out">
                    <div class="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/10 transition-colors duration-500"></div>
                    <div class="absolute top-4 left-4">
                        <span class="px-5 py-2 bg-white/90 backdrop-blur-md rounded-full text-[10px] font-bold uppercase tracking-widest text-[#001A72] border border-white/20 shadow-sm">${esc(p.category)}</span>
                    </div>
                </div>
                <div class="flex-1 flex flex-col px-3 pb-3">
                    <div class="flex flex-col mb-4 gap-2">
                        <h3 class="text-2xl font-black text-slate-900 leading-tight tracking-tight group-hover:text-blue-600 transition-colors">${esc(p.name)}</h3>
                        <span class="text-xl font-bold text-blue-600">${esc(p.priceLabel || p.price + '€')}</span>
                    </div>
                    <p class="text-slate-500 text-sm leading-relaxed mb-8 font-light line-clamp-2">${esc(p.tagline || p.description)}</p>
                    <div class="mt-auto flex items-center justify-between pt-6 border-t border-slate-50">
                        <span class="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400 group-hover:text-blue-600 transition-colors">En savoir plus</span>
                        <div class="w-12 h-12 rounded-full bg-slate-50 text-slate-400 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 shadow-sm">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-5 h-5">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"/>
                            </svg>
                        </div>
                    </div>
                </div>
            </a>
        `).join('');
        initReveal();
    }

    /* Grille des articles */
    const artGrid = document.getElementById('articles-grid');
    if (artGrid) {
        artGrid.innerHTML = articles.map(a => `
            <a href="/article.html?id=${a.id}"
               class="group flex flex-col text-left bg-white rounded-3xl overflow-hidden border border-slate-100 hover:shadow-2xl transition-all duration-500 reveal" style="text-decoration:none">
                <div class="w-full aspect-video overflow-hidden bg-slate-50 relative">
                    <img src="${esc(a.image)}" alt="${esc(a.title)}" width="600" height="400"
                         class="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-105">
                    <div class="absolute inset-0 bg-[#001A72]/5 group-hover:bg-transparent transition-colors"></div>
                </div>
                <div class="flex flex-col flex-1 p-10 md:p-12">
                    <div class="flex items-center gap-3 mb-6">
                        <span class="w-1.5 h-1.5 bg-[#2563EB] rounded-full"></span>
                        <span class="text-[10px] font-black uppercase tracking-widest text-slate-400">${esc(a.date)}</span>
                    </div>
                    <h3 class="text-2xl md:text-3xl font-black text-[#001A72] mb-6 leading-tight group-hover:text-[#2563EB] transition-colors">${esc(a.title)}</h3>
                    <p class="text-slate-500 font-medium leading-relaxed line-clamp-3 mb-8">${esc(a.excerpt)}</p>
                    <div class="mt-auto flex items-center gap-4 text-[#001A72] font-black uppercase tracking-[0.2em] text-[10px]">
                        <span>Lire l'article</span>
                        <div class="w-10 h-10 rounded-xl bg-slate-50 text-[#001A72] flex items-center justify-center transition-all group-hover:bg-[#2563EB] group-hover:text-white">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="3" stroke="currentColor" class="w-4 h-4">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"/>
                            </svg>
                        </div>
                    </div>
                </div>
            </a>
        `).join('');
        initReveal();
    }
}

/* ================================================================
   PAGE : DÉTAIL PRODUIT
   ================================================================ */
async function initProduct() {
    const id = new URLSearchParams(location.search).get('id');
    const products = await getProducts();
    const p = products.find(x => x.id === id);
    if (!p) { location.href = '/'; return; }

    setSolidNav();
    document.title = p.name + ' | DETAILWAVE Liège';

    window._product = p;
    window._selectedOption = p.priceList ? p.priceList[0] : null;

    const initialPrice = p.priceList
        ? (p.priceList[0].priceLabel || p.priceList[0].price + '€')
        : (p.priceLabel || p.price + '€');

    const optionsHTML = p.priceList
        ? p.priceList.map((opt, i) => `
            <div class="option-row flex justify-between items-center p-5 rounded-2xl cursor-pointer transition-all border-2 ${i === 0 ? 'border-blue-600 bg-white shadow-lg' : 'border-transparent bg-white/50 hover:bg-white hover:border-slate-200'}"
                 onclick="selectOption(this, ${i})">
                <div class="flex items-center gap-4">
                    <div class="option-radio w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${i === 0 ? 'border-blue-600' : 'border-slate-200'}">
                        ${i === 0 ? '<div class="w-2.5 h-2.5 bg-blue-600 rounded-full"></div>' : ''}
                    </div>
                    <span class="option-label font-bold text-sm ${i === 0 ? 'text-slate-900' : 'text-slate-500'}">${esc(opt.label)}</span>
                </div>
                <span class="option-price font-bold text-lg ${i === 0 ? 'text-blue-600' : 'text-slate-900'}">${esc(opt.priceLabel || opt.price + '€')}</span>
            </div>
        `).join('')
        : `<div class="flex justify-between items-center p-6 bg-white rounded-2xl border border-slate-100">
               <span class="text-slate-500 font-bold text-sm uppercase tracking-widest">Tarif fixe</span>
               <span class="text-2xl font-bold text-slate-900">${esc(p.priceLabel || p.price + '€')}</span>
           </div>`;

    const featuresHTML = p.features.map(f => `
        <li class="flex items-center gap-4 text-sm text-slate-500 font-light">
            <div class="w-5 h-5 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="3" stroke="currentColor" class="w-2.5 h-2.5 text-blue-600">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5"/>
                </svg>
            </div>
            ${esc(f)}
        </li>
    `).join('');

    document.getElementById('product-detail').innerHTML = `
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
            <div class="lg:col-span-7">
                <div class="w-full aspect-square md:aspect-[4/3] rounded-[2.5rem] overflow-hidden shadow-2xl bg-slate-50 border border-slate-100 compare-slider">
                    <img class="cs-after" src="${esc(p.imageUrl)}" alt="Après - ${esc(p.name)}">
                    <div class="cs-before-wrap">
                        <img src="${esc(p.gallery && p.gallery[1] ? p.gallery[1] : p.imageUrl)}" alt="Avant">
                    </div>
                    <div class="cs-handle"><div class="cs-circle">⟺</div></div>
                    <span class="absolute top-6 left-6 pointer-events-none px-4 py-2 bg-slate-900/80 backdrop-blur-md rounded-full text-xs font-bold uppercase tracking-widest text-white border border-white/20 shadow-lg">Avant</span>
                    <span class="absolute top-6 right-6 pointer-events-none px-4 py-2 bg-blue-600/90 backdrop-blur-md rounded-full text-xs font-bold uppercase tracking-widest text-white border border-white/20 shadow-lg">Après</span>
                </div>
            </div>
            <div class="lg:col-span-5 flex flex-col pt-4">
                <div class="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-[10px] font-bold uppercase tracking-widest w-fit mb-6 border border-blue-100">
                    <span class="w-1 h-1 bg-blue-600 rounded-full animate-pulse"></span>
                    ${esc(p.category)}
                </div>
                <h1 class="text-4xl md:text-6xl font-bold text-slate-900 mb-8 leading-[1.1] tracking-tight">${esc(p.name)}</h1>
                <p class="text-slate-500 leading-relaxed text-lg mb-10 font-light">${esc(p.longDescription || p.description)}</p>
                <div class="bg-slate-50/50 p-8 rounded-[2rem] border border-slate-100 shadow-sm mb-10">
                    <h3 class="text-sm font-bold text-slate-900 mb-6 uppercase tracking-widest">Options de service</h3>
                    <div ${p.priceList ? 'class="space-y-4"' : ''}>${optionsHTML}</div>
                </div>
                <div class="mt-auto space-y-6">
                    <div class="flex items-end justify-between px-2">
                        <div class="space-y-1">
                            <span class="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Prix total</span>
                            <p id="display-price" class="text-4xl font-bold text-slate-900">${esc(initialPrice)}</p>
                        </div>
                        <span class="text-green-600 font-bold text-xs uppercase tracking-widest">Déplacement Offert</span>
                    </div>
                    <button onclick="addCurrentToCart()"
                        class="w-full py-5 bg-blue-600 text-white rounded-2xl uppercase tracking-[0.2em] text-sm font-bold hover:bg-blue-700 transition-all shadow-xl shadow-blue-600/20 flex items-center justify-center gap-3 active:scale-[0.98]">
                        Ajouter au devis
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2.5" stroke="currentColor" class="w-5 h-5">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15"/>
                        </svg>
                    </button>
                    <div class="pt-8 border-t border-slate-100">
                        <h4 class="font-bold text-slate-900 mb-6 text-sm uppercase tracking-widest">Ce qui est inclus :</h4>
                        <ul class="grid grid-cols-1 gap-4">${featuresHTML}</ul>
                    </div>
                </div>
            </div>
        </div>
    `;

    initCompareSliders();
}

/* Actions produit */
function selectOption(row, idx) {
    const opt = window._product.priceList[idx];
    document.querySelectorAll('.option-row').forEach(r => {
        r.classList.remove('border-blue-600', 'bg-white', 'shadow-lg');
        r.classList.add('border-transparent', 'bg-white/50');
        r.querySelector('.option-radio').className = 'option-radio w-6 h-6 rounded-full border-2 border-slate-200 flex items-center justify-center';
        r.querySelector('.option-radio').innerHTML = '';
        r.querySelector('.option-label').classList.replace('text-slate-900', 'text-slate-500');
        r.querySelector('.option-price').classList.replace('text-blue-600', 'text-slate-900');
    });
    row.classList.add('border-blue-600', 'bg-white', 'shadow-lg');
    row.classList.remove('border-transparent', 'bg-white/50');
    row.querySelector('.option-radio').className = 'option-radio w-6 h-6 rounded-full border-2 border-blue-600 flex items-center justify-center';
    row.querySelector('.option-radio').innerHTML = '<div class="w-2.5 h-2.5 bg-blue-600 rounded-full"></div>';
    row.querySelector('.option-label').classList.replace('text-slate-500', 'text-slate-900');
    row.querySelector('.option-price').classList.replace('text-slate-900', 'text-blue-600');
    window._selectedOption = opt;
    document.getElementById('display-price').textContent = opt.priceLabel || opt.price + '€';
}

function addCurrentToCart() {
    Cart.add(window._product, window._selectedOption);
}

/* ================================================================
   PAGE : ARTICLE
   ================================================================ */
async function initArticle() {
    const id = parseInt(new URLSearchParams(location.search).get('id'));
    const articles = await getArticles();
    const a = articles.find(x => x.id === id);
    if (!a) { location.href = '/'; return; }

    setSolidNav();
    document.title = a.title + ' | DETAILWAVE';

    const set = (id, val, html = false) => {
        const el = document.getElementById(id);
        if (!el) return;
        html ? (el.innerHTML = val) : (el.textContent = val);
    };

    set('article-date',    a.date);
    set('article-title',   a.title);
    set('article-excerpt', a.excerpt);
    set('article-body',    a.content, true);

    const img = document.getElementById('article-image');
    if (img) { img.src = a.image; img.alt = a.title; }
}

/* ================================================================
   PAGE : CHECKOUT
   ================================================================ */
function initCheckout() {
    setSolidNav();
    renderCheckoutSummary();

    const dateInput = document.getElementById('date-input');
    if (dateInput) dateInput.min = new Date().toISOString().split('T')[0];

    const photos     = [];
    const photoInput = document.getElementById('photo-input');
    const photoGrid  = document.getElementById('photo-grid');
    const addBtn     = document.getElementById('add-photo-btn');

    if (photoInput) {
        photoInput.addEventListener('change', e => {
            const slots = 8 - photos.length;
            Array.from(e.target.files).slice(0, slots).forEach(file => {
                const url = URL.createObjectURL(file);
                photos.push({ file, url });
                const div = document.createElement('div');
                div.className = 'relative aspect-square rounded-xl overflow-hidden border border-slate-200 group';
                const idx = photos.length - 1;
                div.innerHTML = `<img src="${url}" class="w-full h-full object-cover">
                    <button type="button" class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>
                    </button>`;
                div.querySelector('button').onclick = () => {
                    URL.revokeObjectURL(url);
                    photos.splice(idx, 1);
                    div.remove();
                    if (addBtn) addBtn.style.display = '';
                };
                if (photoGrid && addBtn) photoGrid.insertBefore(div, addBtn);
            });
            if (photos.length >= 8 && addBtn) addBtn.style.display = 'none';
            photoInput.value = '';
        });
    }

    const form = document.getElementById('checkout-form');
    if (!form) return;

    form.addEventListener('submit', async e => {
        e.preventDefault();
        const btn   = document.getElementById('submit-btn');
        const errEl = document.getElementById('form-error');
        errEl.classList.add('hidden');
        btn.disabled = true;
        btn.innerHTML = `<svg class="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path></svg> Envoi en cours...`;

        try {
            const fd        = new FormData(form);
            const hour      = document.getElementById('hour-select').value;
            const min       = document.getElementById('min-select').value;
            const photoData = await Promise.all(photos.map(p => fileToBase64(p.file)));

            const res = await fetch('/send-email.php', {
                method:  'POST',
                headers: { 'Content-Type': 'application/json' },
                body:    JSON.stringify({
                    firstName:     fd.get('firstName'),
                    lastName:      fd.get('lastName'),
                    phone:         fd.get('phone'),
                    email:         fd.get('email'),
                    address:       fd.get('address'),
                    postalCode:    fd.get('postalCode'),
                    city:          fd.get('city'),
                    note:          fd.get('note'),
                    preferredDate: fd.get('preferredDate'),
                    preferredTime: (hour && min) ? `${hour}:${min}` : '',
                    items:         Cart.get(),
                    total:         Cart.total() + '€',
                    photos:        photoData,
                }),
            });

            if (!res.ok) throw new Error((await res.json()).error || 'Erreur serveur');

            document.getElementById('success-msg').innerHTML =
                `Merci <strong>${esc(fd.get('firstName'))}</strong> ! Votre demande a bien été transmise.`
                + (fd.get('preferredDate') ? ` Date souhaitée : <strong>${esc(fd.get('preferredDate'))}</strong>.` : '')
                + ` Nous vous recontacterons sous 24h au <strong class="text-blue-600">${esc(fd.get('phone'))}</strong>.`;
            document.getElementById('checkout-content').style.display = 'none';
            const success = document.getElementById('success-screen');
            success.classList.remove('hidden');
            success.style.display = 'flex';
            localStorage.removeItem('dw_cart');
            Cart.refreshUI();

        } catch (err) {
            errEl.textContent = "Échec de l'envoi : " + err.message;
            errEl.classList.remove('hidden');
            btn.disabled = false;
            btn.textContent = 'Envoyer ma demande';
        }
    });
}

function renderCheckoutSummary() {
    const items    = Cart.get();
    const total    = Cart.total();
    const countEl  = document.getElementById('summary-count');
    const emptyEl  = document.getElementById('summary-empty');
    const itemsEl  = document.getElementById('summary-items');
    const totalBox = document.getElementById('summary-total-box');
    const totalEl  = document.getElementById('summary-total');

    if (countEl) countEl.textContent = items.length + ' service' + (items.length > 1 ? 's' : '');
    if (!emptyEl || !itemsEl || !totalBox) return;

    if (items.length === 0) {
        emptyEl.classList.remove('hidden'); itemsEl.classList.add('hidden'); totalBox.classList.add('hidden');
    } else {
        emptyEl.classList.add('hidden'); itemsEl.classList.remove('hidden'); totalBox.classList.remove('hidden');
        itemsEl.innerHTML = items.map(item => `
            <div class="flex gap-4">
                <div class="w-16 h-16 bg-slate-50 rounded-xl overflow-hidden flex-shrink-0 border border-slate-100">
                    <img src="${esc(item.imageUrl)}" alt="${esc(item.name)}" class="w-full h-full object-cover">
                </div>
                <div class="flex-1 min-w-0">
                    <h3 class="font-bold text-slate-900 text-sm truncate">${esc(item.name)}</h3>
                    ${item.selectedOption
                        ? `<p class="text-[10px] text-blue-600 font-bold uppercase tracking-wider mt-1.5 bg-blue-50 w-fit px-2 py-1 rounded">${esc(item.selectedOption.label)}</p>`
                        : `<p class="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-1.5">${esc(item.category)}</p>`}
                </div>
                <span class="text-sm font-bold text-slate-900 self-start">${item.selectedOption ? (item.selectedOption.price + '€') : (item.priceLabel || item.price + '€')}</span>
            </div>
        `).join('');
        if (totalEl) totalEl.textContent = total + '€';
    }
}

function fileToBase64(file) {
    return new Promise((res, rej) => {
        const r = new FileReader();
        r.readAsDataURL(file);
        r.onload  = () => res(r.result);
        r.onerror = rej;
    });
}

/* ================================================================
   ROUTING
   ================================================================ */
document.addEventListener('DOMContentLoaded', () => {
    const page = location.pathname.split('/').pop().replace('.html', '') || 'index';
    switch (page) {
        case 'index': case '': initHome();     break;
        case 'product':        initProduct();  break;
        case 'article':        initArticle();  break;
        case 'checkout':       initCheckout(); break;
    }
});
