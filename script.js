(() => {
  const key = 'beanBoutiqueCart';
  const cart = () => JSON.parse(localStorage.getItem(key) || '[]');
  const save = items => localStorage.setItem(key, JSON.stringify(items));
  const money = value => `£${Number(value).toFixed(2)}`;
  const updateCount = () => { const count = cart().reduce((sum, item) => sum + item.quantity, 0); document.querySelectorAll('.cart-count').forEach(el => el.textContent = count); };
  const add = (name, price) => { const items = cart(); const found = items.find(item => item.name === name); if (found) found.quantity += 1; else items.push({ name, price: Number(price), quantity: 1 }); save(items); updateCount(); };
  document.querySelectorAll('.add-to-cart').forEach(button => button.addEventListener('click', () => { add(button.dataset.name, button.dataset.price); const original = button.textContent; button.textContent = 'Added to basket ✓'; setTimeout(() => button.textContent = original, 1300); }));
  const menu = document.querySelector('.menu-toggle'); const nav = document.querySelector('nav'); if (menu && nav) menu.addEventListener('click', () => { const open = nav.classList.toggle('open'); menu.setAttribute('aria-expanded', open); });
  const eventForm = document.querySelector('#event-form'); if (eventForm) eventForm.addEventListener('submit', event => { event.preventDefault(); const message = document.querySelector('#event-registration-message'); message.textContent = 'Registration successful.'; message.hidden = false; window.alert('Registration successful.'); });
  const search = document.querySelector('#product-search'); if (search) { const products = [...document.querySelectorAll('.product-card')]; const output = document.querySelector('#search-result'); const none = document.querySelector('.no-results'); search.addEventListener('input', () => { const query = search.value.toLowerCase().trim(); const exactMatches = query ? products.filter(card => card.querySelector('h2').textContent.trim().toLowerCase() === query) : []; const visible = exactMatches.length ? exactMatches : products.filter(card => (card.textContent + ' ' + card.dataset.search).toLowerCase().includes(query)); products.forEach(card => { const isVisible = visible.includes(card); card.hidden = !isVisible; card.style.display = isVisible ? '' : 'none'; }); output.textContent = `Showing ${visible.length} coffee${visible.length === 1 ? '' : 's'}`; none.hidden = visible.length !== 0; }); }
  const slides = [...document.querySelectorAll('.slide')]; const dots = [...document.querySelectorAll('.slide-dots button')]; if (slides.length) { let current = 0; const show = i => { current = (i + slides.length) % slides.length; slides.forEach((slide, n) => slide.classList.toggle('is-active', n === current)); dots.forEach((dot, n) => dot.classList.toggle('active', n === current)); }; document.querySelector('.next').addEventListener('click', () => show(current + 1)); document.querySelector('.previous').addEventListener('click', () => show(current - 1)); dots.forEach((dot, n) => dot.addEventListener('click', () => show(n))); setInterval(() => show(current + 1), 5500); }
  const modal = document.querySelector('#welcome-modal'); if (modal && !sessionStorage.getItem('beanWelcomeSeen')) { setTimeout(() => { modal.hidden = false; document.querySelector('#signup-email').focus(); }, 700); } const closeModal = () => { if (modal) { modal.hidden = true; sessionStorage.setItem('beanWelcomeSeen', 'yes'); } }; document.querySelector('.modal-close')?.addEventListener('click', closeModal); document.querySelector('#signup-form')?.addEventListener('submit', event => { event.preventDefault(); const input = document.querySelector('#signup-email'); const message = document.querySelector('.form-message'); if (!input.validity.valid) { message.textContent = 'Please enter a valid email address.'; return; } message.style.color = '#287344'; message.textContent = 'Thank you — your code is BEAN10.'; setTimeout(closeModal, 1500); });
  const list = document.querySelector('#cart-items'); if (list) { const render = () => { const items = cart(); list.innerHTML = items.length ? items.map((item, i) => `<article class="cart-row"><div><h2>${item.name}</h2><p>${money(item.price)} each</p></div><div class="quantity-controls"><button type="button" data-action="minus" data-index="${i}" aria-label="Decrease quantity">−</button><span>${item.quantity}</span><button type="button" data-action="plus" data-index="${i}" aria-label="Increase quantity">+</button><button class="remove-item" type="button" data-action="remove" data-index="${i}">Remove</button></div></article>`).join('') : '<p class="empty-cart">Your basket is waiting for something delicious. <a href="coffee.html">Browse coffee</a>.</p>'; document.querySelector('#cart-total').textContent = money(items.reduce((sum, item) => sum + item.price * item.quantity, 0)); list.querySelectorAll('button[data-action]').forEach(button => button.addEventListener('click', () => { const itemsNow = cart(); const index = Number(button.dataset.index); if (button.dataset.action === 'plus') itemsNow[index].quantity++; if (button.dataset.action === 'minus') itemsNow[index].quantity--; if (button.dataset.action === 'remove' || itemsNow[index].quantity < 1) itemsNow.splice(index, 1); save(itemsNow); updateCount(); render(); })); }; render(); }
  const checkoutButton = document.querySelector('#checkout-button'); if (checkoutButton) checkoutButton.addEventListener('click', () => { const hasItems = cart().length > 0; save([]); updateCount(); const list = document.querySelector('#cart-items'); if (list) { list.innerHTML = '<p class="empty-cart">Your basket is waiting for something delicious. <a href="coffee.html">Browse coffee</a>.</p>'; document.querySelector('#cart-total').textContent = money(0); } window.alert(hasItems ? 'Your demo checkout is complete. Your cart has been cleared.' : 'Your cart is already empty.'); });
  const mapUrl = 'https://www.bing.com/maps/search?v=2&sV=1&mepi=59%7E%7EEmbedded%7ELargeMapLink&FORM=MIRE&style=r&q=Panchan+tower&cp=16.803474%7E96.140556&lvl=16';
  document.querySelectorAll('.site-footer h2').forEach(heading => {
    if (heading.textContent.trim() !== 'Visit') return;
    const address = heading.nextElementSibling;
    const link = document.createElement('a');
    link.href = mapUrl;
    link.target = '_blank';
    link.rel = 'noopener';
    link.textContent = 'Pancchan Tower';
    address.replaceChildren(link, document.createElement('br'), 'Open daily, 8am–5pm');
  });
  const mapSection = document.querySelector('.map-section');
  if (mapSection) {
    const mapHeading = mapSection.querySelector('h2');
    const mapText = mapSection.querySelector('div p:last-of-type');
    const mapFrame = mapSection.querySelector('iframe');
    if (mapHeading) mapHeading.textContent = 'Find us at Panchan Tower.';
    if (mapText) {
      mapText.textContent = 'Bean Boutique is located at Panchan Tower. Open daily, 8am–5pm.';
      const directMapLink = document.createElement('a');
      directMapLink.className = 'map-direct-link';
      directMapLink.href = mapUrl;
      directMapLink.target = '_blank';
      directMapLink.rel = 'noopener';
      directMapLink.textContent = 'Open Panchan Tower in Bing Maps ↗';
      mapText.insertAdjacentElement('afterend', directMapLink);
    }
    if (mapFrame) {
      mapFrame.title = 'Map showing Panchan Tower';
      mapFrame.src = 'https://www.openstreetmap.org/export/embed.html?bbox=96.130556%2C16.798474%2C96.150556%2C16.808474&layer=mapnik&marker=16.803474%2C96.140556';
    }
  }
  updateCount();
})();
