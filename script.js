'use strict';

const ASSET = 'assets/brand/';
const ASSET_VERSION = '?v=20261105-7';
const CART_KEY = 'zhengzhiwei_cart_v2';
const ORDERS_KEY = 'zhengzhiwei_orders_v2';
const COUPON_KEY = 'zhengzhiwei_coupon_claimed';
const ORDER_AUTO_COMPLETE_MS = 10 * 1000;

const dishes = [
  { id:'pork-belly', name:'粉蒸肉', en:'Steamed Pork Belly with Rice Flour', category:'招牌推荐', price:68, image:'pork-belly.jpg', tags:['米粉裹香','软烂入味'], desc:'五花肉裹上细腻米粉，入笼蒸制。米香融入肉香，入口软糯醇厚。', flavors:['原味','微辣','香辣'], scallions:['正常葱花','不加葱花'] },
  { id:'wuchang-fish', name:'清蒸武昌鱼', en:'Steamed Wuchang Fish', category:'招牌推荐', price:78, image:'wuchang-fish.jpg', tags:['鲜嫩细腻','清香原味'], desc:'精选鲜活武昌鱼，以传统清蒸工艺锁住原鲜，鱼肉细嫩鲜美，入口清香爽滑。', flavors:['原味','葱香豉油','鲜香微辣'], scallions:['正常葱花','不加葱花'] },
  { id:'eel', name:'炝蒸鳝鱼', en:'Traditional Spicy Steamed Eel', category:'招牌推荐', price:68, image:'eel.jpg', tags:['香浓醇厚','鲜香入味'], desc:'精选鲜嫩鳝鱼，沿袭天门传统炝蒸工艺。蒸汽锁住鲜香，热油激发葱蒜香气。', flavors:['经典葱蒜','香醋鲜香','蒜香香辣'], scallions:['正常葱花','不加葱花'] },
  { id:'crown-daisy', name:'粉蒸茼蒿', en:'Steamed Crown Daisy with Rice Flour', category:'招牌推荐', price:28, image:'crown-daisy.jpg', tags:['清香软糯','鲜润爽口'], desc:'精选新鲜茼蒿，均匀裹上细腻米粉，以传统蒸制工艺保留食材本味。', flavors:['经典原味','芝麻香味'] },
  { id:'spicy-beef', name:'粉蒸辣牛肉', en:'Spicy Steamed Beef', category:'经典蒸菜', price:68, image:'spicy-beef.jpg', tags:['香辣鲜润','软嫩入味'], desc:'牛肉与米粉慢蒸，香辣不燥，保留丰盈肉汁。', flavors:['微辣','香辣','重辣'], scallions:['正常葱花','不加葱花'] },
  { id:'grass-carp', name:'粉蒸草鱼', en:'Rice-flour Steamed Grass Carp', category:'经典蒸菜', price:52, image:'grass-carp.jpg', tags:['鲜香细嫩','米粉醇香'], desc:'草鱼切块入味，裹粉慢蒸，鱼肉细嫩。', flavors:['原味','微辣'], scallions:['正常葱花','不加葱花'] },
  { id:'ribs', name:'粉蒸排骨', en:'Rice-flour Steamed Ribs', category:'经典蒸菜', price:48, image:'ribs.jpg', tags:['酥香软糯','咸鲜入味'], desc:'精选肋排与香米粉同蒸，骨香浓郁。', flavors:['原味','微辣'], scallions:['正常葱花','不加葱花'] },
  { id:'chicken', name:'粉蒸鸡块', en:'Rice-flour Steamed Chicken', category:'经典蒸菜', price:42, image:'chicken.jpg', tags:['鲜嫩多汁','家常蒸味'], desc:'鸡块腌制入味，蒸得鲜嫩多汁。', flavors:['原味','香辣'], scallions:['正常葱花','不加葱花'] },
  { id:'pumpkin-veg', name:'南瓜粉蒸时蔬', en:'Steamed Seasonal Vegetables', category:'经典蒸菜', price:32, image:'pumpkin-veg.jpg', tags:['清甜软糯','时令鲜蔬'], desc:'南瓜与当季蔬菜同蒸，清甜自然。', flavors:['原味','芝麻香'] },
  { id:'pearl-balls', name:'珍珠糯米丸子', en:'Pearl Glutinous Rice Balls', category:'荆楚特色', price:32, image:'pearl-balls.jpg', tags:['晶莹软糯','肉香丰盈'], desc:'糯米裹肉丸，蒸制后晶莹软糯。', flavors:['经典原味','鲜香微辣'] },
  { id:'panlong', name:'蟠龙菜', en:'Panlong Dish', category:'荆楚特色', price:48, image:'panlong.jpg', tags:['荆楚名菜','鲜香细腻'], desc:'传统荆楚名菜，蛋香与肉香相融。', flavors:['经典原味','豉油鲜香'] },
  { id:'bamboo-tiger', name:'竹筒打老虎', en:'Steamed Pork in Bamboo', category:'荆楚特色', price:58, image:'bamboo-tiger.jpg', tags:['竹香沁润','层次丰富'], desc:'食材置于竹筒中慢蒸，吸收清新竹香。', flavors:['原味','微辣'], scallions:['正常葱花','不加葱花'] },
  { id:'tea-chicken', name:'陆羽茶香蒸鸡', en:'Tea-scented Steamed Chicken', category:'创意融合', price:58, image:'tea-chicken.jpg', tags:['茶香清雅','鸡肉鲜嫩'], desc:'以天门茶香融入蒸鸡，清雅回甘。', flavors:['清香原味','茶香豉油'] },
  { id:'lemon-shrimp', name:'柠香蒜蓉蒸虾', en:'Lemon Garlic Steamed Shrimp', category:'创意融合', price:68, image:'lemon-shrimp.jpg', tags:['柠香清新','蒜香浓郁'], desc:'鲜虾配柠檬与蒜蓉，清新开胃。', flavors:['蒜香原味','鲜香微辣'] },
  { id:'mushroom-ribs', name:'菌香蒸排骨', en:'Mushroom Steamed Ribs', category:'创意融合', price:58, image:'mushroom-ribs.jpg', tags:['菌香醇厚','排骨软嫩'], desc:'菌菇鲜味渗入排骨，醇厚不腻。', flavors:['原味','豉汁味'] },
  { id:'lotus-soup', name:'莲藕排骨汤', en:'Lotus Root Rib Soup', category:'其他菜品', price:58, image:'lotus-soup.jpg', tags:['汤鲜味醇','莲藕粉糯'], desc:'湖北家常莲藕排骨汤，温润鲜美。', flavors:['经典原味'] },
  { id:'lotus-root', name:'酸辣洪湖藕带', en:'Hot and Sour Lotus Root', category:'其他菜品', price:28, image:'lotus-root.jpg', tags:['酸辣脆爽','开胃下饭'], desc:'洪湖藕带脆嫩爽口，酸辣开胃。', flavors:['微辣','香辣'] },
  { id:'artemisia-bacon', name:'泥蒿炒腊肉', en:'Artemisia with Cured Pork', category:'其他菜品', price:38, image:'artemisia-bacon.jpg', tags:['清香脆嫩','腊香浓郁'], desc:'泥蒿清香配腊肉醇香，地道湖北味。', flavors:['原味','微辣'] },
  { id:'rice-wine', name:'孝感桂花米酒', en:'Osmanthus Rice Wine', category:'饮品', price:16, image:'rice-wine.jpg', tags:['桂香清甜','温润解腻'], desc:'桂花香气轻盈，米酒清甜温润。', flavors:['常温','加热'] },
  { id:'plum-tea', name:'青梅柠茶', en:'Green Plum Lemon Tea', category:'饮品', price:16, image:'plum-tea.jpg', tags:['酸甜清爽','茶香回甘'], desc:'青梅与柠檬入茶，酸甜清爽。', flavors:['少冰','正常冰','去冰'] },
  { id:'rice', name:'香蒸白米饭', en:'Steamed Rice', category:'蒸香主食', price:2, image:'rice.jpg', tags:['米香自然','软糯可口'], desc:'粒粒软糯，衬托一笼蒸鲜。', flavors:['标准份'] },
  { id:'claypot-rice', name:'腊味蒸饭', en:'Steamed Rice with Cured Meat', category:'蒸香主食', price:24, image:'claypot-rice.jpg', tags:['腊香浓郁','米润味醇'], desc:'腊味油香浸入米饭，咸香满足。', flavors:['标准份'], scallions:['正常葱花','不加葱花'] }
];

const categories = ['招牌推荐','经典蒸菜','荆楚特色','创意融合','其他菜品','饮品','蒸香主食'];
const patternStories = [
  { icon:'✣', title:'蒸汽纹·热气成花', text:'将升腾的蒸汽重组为花形，寓意热气腾腾、四方相聚的家常温味。' },
  { icon:'双鱼', title:'锦鱼纹·双鱼呈祥', text:'将传统蓝印花布中的鱼纹与祥云纹相融合，寓意年年有余、吉庆成双。' },
  { icon:'花叶', title:'茼蒿纹·清润迎福', text:'提取天门蒸菜中茼蒿的枝叶与花朵形态，呈现自然清新的健康滋味。' },
  { icon:'福猪', title:'福猪纹·丰盈蒸祥', text:'提取蒸菜中猪肉的食材意象，以福猪踏云造型寓意丰衣足食、福运绵长。' }
];

const state = {
  view: 'home',
  previous: [],
  activeCategory: categories[0],
  search: '',
  cart: readJson(CART_KEY, {}),
  serviceMode: 'dinein',
  note: '',
  orderTab: 'all',
  modal: null,
  pattern: 0
};

const $ = id => document.getElementById(id);
const money = value => `¥${Number(value).toFixed(0)}`;
const versionedAsset = path => `${ASSET}${path}${ASSET_VERSION}`;
const assetFor = dish => versionedAsset(`dishes/${dish.image}`);
const escapeAttribute = value => String(value).replace(/[&"<>]/g, char => ({ '&':'&amp;', '"':'&quot;', '<':'&lt;', '>':'&gt;' })[char]);

function loadDeferredImages(root) {
  const images = [...root.querySelectorAll('img[data-src]')];
  if (!images.length) return;

  const load = image => {
    image.src = image.dataset.src;
    image.removeAttribute('data-src');
  };

  if (!('IntersectionObserver' in window)) {
    images.forEach(load);
    return;
  }

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      load(entry.target);
      observer.unobserve(entry.target);
    });
  }, { rootMargin: '300px 0px' });

  images.forEach(image => observer.observe(image));
}

function readJson(key, fallback) {
  try {
    const value = JSON.parse(localStorage.getItem(key));
    return value && typeof value === 'object' ? value : fallback;
  } catch {
    return fallback;
  }
}

function writeJson(key, value) {
  try { localStorage.setItem(key, JSON.stringify(value)); } catch { /* private mode fallback */ }
}

function cartLines() {
  return dishes.filter(dish => state.cart[dish.id]?.qty > 0).map(dish => ({ ...dish, ...state.cart[dish.id] }));
}

function cartCount() { return cartLines().reduce((sum, item) => sum + item.qty, 0); }
function cartSubtotal() { return cartLines().reduce((sum, item) => sum + item.price * item.qty, 0); }
function discount() { return cartSubtotal() >= 50 ? 10 : 0; }

function persistCart() {
  writeJson(CART_KEY, state.cart);
  renderChrome();
}

function showToast(message) {
  const node = $('toast');
  node.textContent = message;
  node.classList.remove('is-hidden');
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => node.classList.add('is-hidden'), 1800);
}

function brandLockup() {
  return `<button class="brand-lockup" data-action="go-home" aria-label="返回首页"><span class="brand-seal">蒸</span><span class="brand-words"><strong>蒸知味</strong><small>ZHENGZHIWEI</small></span></button>`;
}

function capsule() { return '<span class="mini-capsule" aria-hidden="true">•••<i></i>◉</span>'; }

function headerMarkup() {
  const rootTitles = { home:'', menu:'', orders:'订单', profile:'我的' };
  const subTitles = { checkout:'确认订单', member:'会员中心', story:'蓝印故事', error:'' };
  if (Object.prototype.hasOwnProperty.call(rootTitles, state.view)) {
    return `<div class="header-row">${brandLockup()}<h1 class="header-title">${rootTitles[state.view]}</h1>${capsule()}</div>`;
  }
  return `<div class="header-row"><button class="header-back" data-action="back" aria-label="返回">‹</button><h1 class="header-title">${subTitles[state.view] || '蒸知味'}</h1><span class="header-spacer"></span></div>`;
}

function tabMarkup() {
  const tabs = [
    ['home','⌂','首页'], ['menu','▦','菜单'], ['orders','▤','订单'], ['profile','♟','我的']
  ];
  return tabs.map(([view, icon, label]) => `<button class="tab-button ${state.view === view ? 'active' : ''}" data-action="navigate" data-view="${view}"><i>${icon}</i><span>${label}</span></button>`).join('');
}

function cartDockMarkup() {
  if (state.view !== 'menu' || !cartCount()) return '';
  return `<div class="cart-dock"><div class="cart-summary"><span class="cart-bag" aria-hidden="true"><b class="cart-badge">${cartCount()}</b></span></div><div>已选${cartCount()}份　<span class="cart-total"><small>¥</small>${cartSubtotal()}</span></div><button class="checkout-button" data-action="checkout">去结算</button></div>`;
}

function renderChrome() {
  const isRoot = ['home','menu','orders','profile'].includes(state.view);
  $('appHeader').innerHTML = headerMarkup();
  $('appHeader').classList.toggle('is-hidden', state.view === 'story');
  $('tabbar').innerHTML = isRoot ? tabMarkup() : '';
  $('tabbar').classList.toggle('is-hidden', !isRoot);
  $('cartDock').innerHTML = cartDockMarkup();
  $('app').classList.toggle('no-tabs', !isRoot);
}

function navigate(view, options = {}) {
  if (!options.replace && state.view !== view) state.previous.push(state.view);
  state.view = view;
  state.modal = null;
  closeModal();
  render();
  if (!options.keepScroll) window.scrollTo({ top: 0, behavior: 'instant' });
}

function goBack() {
  navigate(state.previous.pop() || 'home', { replace: true });
}

function render() {
  renderChrome();
  const renders = { home:renderHome, menu:renderMenu, checkout:renderCheckout, orders:renderOrders, profile:renderProfile, member:renderMember, story:renderStory, error:renderError };
  $('view').innerHTML = (renders[state.view] || renderHome)();
  $('view').focus({ preventScroll: true });
  attachViewListeners();
}

function renderHome() {
  const featured = ['pork-belly','wuchang-fish','eel'].map(id => dishes.find(d => d.id === id));
  return `<div class="page-pad">
    <div class="location-row"><div class="location-main"><strong>⌖　蒸知味·天门店</strong><small>堂食点单 · A01桌</small></div><button class="switch-link" data-action="switch-store">⇄ 切换 ›</button></div>
    <section class="hero-card"><img src="${versionedAsset('home-hero.jpg')}" alt="蒸知味招牌蒸菜" decoding="async"></section>
    <section class="service-card" aria-label="用餐方式">
      <button class="service-option" data-action="service-menu" data-mode="dinein"><span class="service-icon">♨</span><span><strong>堂食点单　›</strong><small>扫码点单，即点即蒸</small></span></button>
      <button class="service-option" data-action="service-menu" data-mode="takeaway"><span class="service-icon">▣</span><span><strong>打包带走　›</strong><small>提前下单，到店直取</small></span></button>
    </section>
    <div class="section-heading"><h2>今日蒸鲜</h2><button class="text-link" data-action="navigate" data-view="menu">查看更多 ›</button></div>
    <section class="today-grid">${featured.map(dish => `<button class="today-card" data-action="open-product" data-id="${dish.id}"><img data-src="${assetFor(dish)}" alt="${dish.name}" loading="lazy" decoding="async"><span>${dish.name}<b class="round-plus">+</b></span></button>`).join('')}</section>
    <button class="member-banner full-button" data-action="navigate" data-view="member"><strong>蒸知味</strong><small>蒸味会员 · 积分享好礼</small><span>查看权益 ›</span></button>
    <button class="story-entry" data-action="navigate" data-view="story"><img data-src="${versionedAsset('story/hero.jpg')}" alt="蓝印花布" loading="lazy" decoding="async"><span><strong>一方蓝白，一笼家常</strong><small>蓝印花布里的蒸味故事</small></span><span>›</span></button>
  </div>`;
}

function renderMenu() {
  const query = state.search.trim().toLowerCase();
  const sections = categories.map(category => {
    const items = dishes.filter(dish => dish.category === category && (!query || `${dish.name}${dish.en}${dish.tags.join('')}`.toLowerCase().includes(query)));
    if (!items.length) return '';
    return `<section class="menu-section" id="category-${category}"><h2>${category}</h2>${items.map(dishCard).join('')}</section>`;
  }).join('');
  return `<div class="location-row page-pad" style="padding-bottom:0"><div class="location-main"><strong>⌖　蒸知味·天门店</strong><small>堂食点单 · A01桌</small></div><button class="switch-link" data-action="switch-store">⇄ 切换 ›</button></div>
    <label class="search-box"><input id="menuSearch" type="search" value="${escapeAttribute(state.search)}" placeholder="搜索想吃的蒸菜" aria-label="搜索菜品"></label>
    <div class="menu-slogan">✣　现点现蒸，一笼鲜香</div>
    <div class="menu-layout"><aside class="category-rail">${categories.map(category => `<button class="category-button ${state.activeCategory === category ? 'active' : ''}" data-action="category" data-category="${category}">${category}</button>`).join('')}</aside><div class="menu-content">${sections || '<div class="empty-state">没有找到相关菜品</div>'}</div></div>`;
}

function dishCard(dish) {
  const qty = state.cart[dish.id]?.qty || 0;
  return `<article class="dish-card" data-action="open-product" data-id="${dish.id}"><div class="dish-thumb"><img data-src="${assetFor(dish)}" alt="${dish.name}" loading="lazy" decoding="async"></div><div class="dish-info"><h3>${dish.name}</h3><p>${dish.tags.join('，')}</p><span class="dish-price"><small>¥</small>${dish.price}</span></div><div class="qty-inline">${qty ? `<button class="minus" data-action="quick-minus" data-id="${dish.id}" aria-label="减少${dish.name}">−</button><b>${qty}</b>` : ''}<button data-action="open-product" data-id="${dish.id}" aria-label="选择${dish.name}">+</button></div></article>`;
}

function openProduct(id) {
  const dish = dishes.find(item => item.id === id);
  if (!dish) return;
  const existing = state.cart[id];
  state.modal = { id, qty: existing?.qty || 1, flavor: existing?.flavor || '', scallion: existing?.scallion || '' };
  renderModal();
}

function renderModal() {
  if (!state.modal) return closeModal();
  const dish = dishes.find(item => item.id === state.modal.id);
  const scallionMarkup = dish.scallions ? `<div class="option-group"><h3>葱花 <small>（必选）</small></h3><div class="option-grid two">${dish.scallions.map(value => `<button class="option-button ${state.modal.scallion === value ? 'active' : ''}" data-action="select-option" data-group="scallion" data-value="${value}">${value}${state.modal.scallion === value ? '　✓' : ''}</button>`).join('')}</div></div>` : '';
  $('modalRoot').innerHTML = `<div class="modal-backdrop"><section class="product-modal" role="dialog" aria-modal="true" aria-label="${dish.name}详情"><button class="modal-close" data-action="close-modal" aria-label="关闭">×</button><img class="product-image" src="${assetFor(dish)}" alt="${dish.name}" decoding="async"><div class="product-body"><div class="product-title-line"><h2>${dish.name}</h2><span class="badge">招牌</span></div><p class="english-name">${dish.en}</p><div class="flavor-tags">${dish.tags.map(tag => `<span>${tag}</span>`).join('')}</div><p class="description"><b>菜品介绍</b><br>${dish.desc}</p><div class="option-group"><h3>口味 <small>（必选）</small></h3><div class="option-grid ${dish.flavors.length === 2 ? 'two' : ''}">${dish.flavors.map(value => `<button class="option-button ${state.modal.flavor === value ? 'active' : ''}" data-action="select-option" data-group="flavor" data-value="${value}">${value}${state.modal.flavor === value ? '　✓' : ''}</button>`).join('')}</div></div>${scallionMarkup}<div class="selection-line">${selectionText(dish)}</div><div class="product-purchase"><span class="product-price"><small>¥</small>${dish.price}<small> / 份</small></span><div class="qty-inline"><button class="minus" data-action="modal-minus">−</button><b>${state.modal.qty}</b><button data-action="modal-plus">+</button></div></div><button class="primary-button full-button" data-action="add-to-cart">加入购物车</button></div></section></div>`;
  document.body.style.overflow = 'hidden';
}

function selectionText(dish) {
  const selected = [state.modal.flavor, dish.scallions ? state.modal.scallion : ''].filter(Boolean);
  return selected.length ? `已选：${selected.join(' / ')}` : '未选';
}

function closeModal() {
  $('modalRoot').innerHTML = '';
  document.body.style.overflow = '';
}

function renderCheckout() {
  const lines = cartLines();
  if (!lines.length) return `<div class="empty-state"><p>购物车还是空的</p><button class="primary-button" data-action="navigate" data-view="menu">去选菜</button></div>`;
  return `<div class="checkout-page"><section class="white-card store-card"><div class="store-title">⌖ 蒸知味·天门店</div><div class="mode-switch"><button class="${state.serviceMode === 'dinein' ? 'active' : ''}" data-action="set-mode" data-mode="dinein">♨　堂食</button><button class="${state.serviceMode === 'takeaway' ? 'active' : ''}" data-action="set-mode" data-mode="takeaway">▣　打包</button></div><div class="mode-meta"><span>${state.serviceMode === 'dinein' ? '桌号 A01' : '到店自取'}</span><span>${state.serviceMode === 'dinein' ? '2人用餐' : '预计 20 分钟'}</span></div></section>
    <section class="white-card selected-list"><h2>已选菜品</h2>${lines.map(item => `<div class="checkout-dish"><img data-src="${assetFor(item)}" alt="${item.name}" loading="lazy" decoding="async"><div><strong>${item.name}</strong><small> × ${item.qty}</small><br><small>${[item.flavor,item.scallion].filter(Boolean).join(' / ')}</small></div><span>${money(item.price * item.qty)}</span></div>`).join('')}</section>
    <section class="white-card"><div class="setting-row"><strong>订单备注</strong><button data-action="edit-note">${state.note || '口味、忌口等'}　›</button></div><div class="setting-row"><strong>优惠券</strong><span>${discount() ? `已优惠 ${money(discount())}` : '暂无可用'}　›</span></div></section>
    <section class="white-card"><div class="amount-row"><span>商品金额</span><span>${money(cartSubtotal())}</span></div><div class="amount-row"><span>优惠金额</span><span class="discount">− ${money(discount())}</span></div><div class="amount-row total"><span>合计</span><span class="discount">${money(cartSubtotal() - discount())}</span></div></section>
    ${state.serviceMode === 'takeaway' ? '<p class="checkout-hint">打包订单请到店后凭订单号取餐</p>' : ''}</div><footer class="checkout-footer"><span>实付　<strong>${money(cartSubtotal() - discount())}</strong></span><button class="primary-button" data-action="place-order">确认下单</button></footer>`;
}

function readOrders() {
  const orders = readJson(ORDERS_KEY, []);
  if (!Array.isArray(orders)) return [];

  const now = Date.now();
  let changed = false;
  const synced = orders.map(order => {
    if (order.status === 'completed') return order;

    const createdAtMs = Number(order.createdAtMs) || now;
    const completeAt = Number(order.completeAt) || createdAtMs + ORDER_AUTO_COMPLETE_MS;
    const status = now >= completeAt ? 'completed' : order.status;
    if (createdAtMs === order.createdAtMs && completeAt === order.completeAt && status === order.status) return order;

    changed = true;
    return { ...order, createdAtMs, completeAt, status };
  });

  if (changed) writeJson(ORDERS_KEY, synced);
  return synced;
}

function sampleOrder() {
  return { id:'SAMPLE-1025', createdAt:'2026.10.25', status:'completed', mode:'dinein', items:[{ id:'wuchang-fish', qty:1, price:78 },{ id:'eel', qty:1, price:68 }], total:146, count:2 };
}

function ordersForTab() {
  const all = [...readOrders(), sampleOrder()];
  if (state.orderTab === 'progress') return all.filter(order => order.status !== 'completed');
  if (state.orderTab === 'completed') return all.filter(order => order.status === 'completed');
  return all;
}

function renderOrders() {
  const orders = ordersForTab();
  return `<div class="order-tabs"><button class="${state.orderTab === 'all' ? 'active' : ''}" data-action="order-tab" data-tab="all">全部</button><button class="${state.orderTab === 'progress' ? 'active' : ''}" data-action="order-tab" data-tab="progress">进行中</button><button class="${state.orderTab === 'completed' ? 'active' : ''}" data-action="order-tab" data-tab="completed">已完成</button></div><div class="orders-list">${orders.length ? orders.map(orderCard).join('') : '<div class="empty-state">这里还没有订单</div>'}<div class="brand-signoff"><i>✣</i>蒸以致鲜，味以至真</div></div>`;
}

function orderCard(order) {
  const items = order.items.map(line => ({ ...dishes.find(d => d.id === line.id), ...line })).filter(item => item.name);
  const active = order.status !== 'completed';
  return `<article class="order-card"><div class="order-head"><div><strong>▱ 蒸知味·天门店</strong><small>${order.mode === 'takeaway' ? '打包' : '堂食'} · ${order.createdAt}</small></div><span class="order-status">${active ? '制作中' : `共${order.count}份`}</span></div>${active ? `<div class="steps">${[['✓','已下单','done'],['✓','已接单','done'],['','制作中','current'],['','完成','']].map(step => `<span class="step ${step[2]}"><i>${step[0]}</i>${step[1]}</span>`).join('')}</div>` : ''}${items.map(item => `<div class="order-item"><img data-src="${assetFor(item)}" alt="${item.name}" loading="lazy" decoding="async"><strong>${item.name}</strong><span>${money(item.price)} × ${item.qty}</span></div>`).join('')}<div class="order-total"><span>共${order.count}份</span><span>合计 <strong>${money(order.total)}</strong></span></div><div class="order-actions">${active ? '<button class="outline-button" data-action="contact">联系门店</button><button class="primary-button" data-action="navigate" data-view="menu">继续加菜</button>' : `<button class="outline-button" data-action="reorder" data-order="${order.id}">再来一单</button>`}</div></article>`;
}

function renderProfile() {
  const orderCount = readOrders().length + 1;
  return `<div class="profile-page"><section class="profile-head"><div class="profile-avatar">✣</div><div><h2>蒸味食客</h2><p>欢迎回来，今天想蒸点什么</p></div><button data-action="edit-profile">编辑资料 ›</button></section><button class="member-banner full-button" data-action="navigate" data-view="member"><strong>蒸知味</strong><small>蒸味会员 · 积分享好礼</small><span>查看权益 ›</span></button><div class="stats"><div><strong>120</strong><small>积分</small></div><div><strong>${localStorage.getItem(COUPON_KEY) ? 3 : 2}</strong><small>优惠券</small></div><div><strong>${orderCount}</strong><small>累计订单</small></div></div>
    <section class="profile-card"><div class="section-heading" style="margin:0 0 10px"><h2>我的订单</h2><button class="text-link" data-action="orders-filter" data-tab="all">全部订单 ›</button></div><div class="profile-order-grid"><button data-action="orders-filter" data-tab="all"><i>▣</i>待付款</button><button data-action="orders-filter" data-tab="progress"><i>♨</i>待上桌</button><button data-action="orders-filter" data-tab="completed"><i>▤</i>已完成</button></div></section>
    <section class="profile-card"><h2>常用服务</h2><div class="service-grid"><button data-action="navigate" data-view="member">🎟　我的优惠券</button><button data-action="points">◉　积分记录</button><button data-action="store-info">▱　门店信息</button><button data-action="contact">♧　联系客服</button></div></section>
    <section class="profile-card simple-list"><button data-action="about">ⓘ　关于蒸知味</button><button data-action="settings">⚙　设置</button></section></div>`;
}

function renderMember() {
  const claimed = Boolean(localStorage.getItem(COUPON_KEY));
  return `<div class="subpage"><section class="member-card"><div class="brand-lockup"><span class="brand-seal" style="border-color:white">蒸</span><span class="brand-words"><strong>蒸知味</strong><small>ZHENGZHIWEI</small></span></div><h2>蒸味会员</h2><p>一笼好味，常来常新　　普通会员</p></section><section class="member-progress"><strong>成长值　<span style="color:var(--gold);font-size:24px">320</span></strong><span style="float:right">距升级还差 180</span><div class="progress-track"><span></span></div></section><div class="section-heading"><h2>会员权益</h2></div><section class="benefit-grid"><div class="benefit"><i>♨</i><strong>蒸味会员</strong><small>新会员专享券</small></div><div class="benefit"><i>◉</i><strong>积分兑礼</strong><small>好味随心换</small></div><div class="benefit"><i>♕</i><strong>生日好礼</strong><small>当月专属礼</small></div><div class="benefit"><i>◇</i><strong>会员专享价</strong><small>指定菜品优惠</small></div></section><section class="coupon"><strong>¥10</strong><span><b>新会员券</b><br><small>满 50 元可用</small></span><button class="outline-button" data-action="claim-coupon" ${claimed ? 'disabled' : ''}>${claimed ? '已领取' : '立即领取'}</button></section><button class="primary-button full-button" data-action="claim-member">${claimed ? '已加入蒸味会员' : '免费加入会员'}</button></div>`;
}

function renderStory() {
  const overlay = state.pattern > 0 ? `<img class="story-pattern-overlay" src="${versionedAsset(`story/pattern-${state.pattern + 1}.jpg`)}" alt="${patternStories[state.pattern].title}" decoding="async">` : '';
  return `<article class="story-fidelity"><div class="story-artboard"><img class="story-full" src="${versionedAsset('story/full.jpg')}" alt="蓝印故事：一方蓝白，一笼家常，介绍蓝印花布工艺、品牌纹样与餐桌应用" decoding="async">${overlay}<button class="story-back-hotspot" data-action="back" aria-label="返回上一页"></button><div class="story-pattern-hotspots" aria-label="切换品牌纹样">${patternStories.map((item,index) => `<button data-action="pattern" data-index="${index}" aria-label="查看${item.title}" title="${item.title}"></button>`).join('')}</div><button class="story-arrival-hotspot" data-action="arrival" aria-label="进入到店体验"></button><div class="story-accessible-copy"><h2>蓝印故事</h2><p>蓝印花布，不只是传统印染技艺，也承载着朴素、丰盈与团圆的生活记忆。蒸知味将这份蓝白之美融入一餐一饭。</p><h3>${patternStories[state.pattern].title}</h3><p>${patternStories[state.pattern].text}</p></div></div></article>`;
}

function renderError() {
  return `<section class="error-page"><div><div class="error-mark">✣</div><h2>数据加载失败</h2><p>网络开小差了，请稍后重试</p><button class="primary-button" data-action="retry">重新加载</button><button class="text-link" data-action="go-home">返回首页</button></div></section>`;
}

function attachViewListeners() {
  loadDeferredImages($('view'));
  if (attachViewListeners.menuScrollHandler) {
    window.removeEventListener('scroll', attachViewListeners.menuScrollHandler);
    attachViewListeners.menuScrollHandler = null;
  }
  if (attachViewListeners.orderTimer) {
    clearTimeout(attachViewListeners.orderTimer);
    attachViewListeners.orderTimer = null;
  }
  const input = $('menuSearch');
  if (input) input.addEventListener('input', event => {
    const position = event.target.selectionStart;
    state.search = event.target.value;
    $('view').innerHTML = renderMenu();
    const next = $('menuSearch');
    next.focus();
    next.setSelectionRange(position, position);
    attachViewListeners();
  });
  if (state.view === 'menu' && !state.search.trim()) {
    attachViewListeners.menuScrollHandler = () => {
      let current = categories[0];
      document.querySelectorAll('.menu-section').forEach(section => {
        if (section.getBoundingClientRect().top <= 150) current = section.id.replace('category-', '');
      });
      if (current === state.activeCategory) return;
      state.activeCategory = current;
      document.querySelectorAll('.category-button').forEach(button => button.classList.toggle('active', button.dataset.category === current));
    };
    window.addEventListener('scroll', attachViewListeners.menuScrollHandler, { passive:true });
  }
  if (state.view === 'orders') {
    const nextCompletion = readOrders()
      .filter(order => order.status !== 'completed')
      .map(order => Number(order.completeAt))
      .filter(Number.isFinite)
      .sort((a, b) => a - b)[0];
    if (nextCompletion) {
      const delay = Math.max(0, nextCompletion - Date.now()) + 50;
      attachViewListeners.orderTimer = setTimeout(() => {
        if (state.view !== 'orders') return;
        render();
        showToast('订单制作完成');
      }, delay);
    }
  }
}

function quickMinus(id) {
  const entry = state.cart[id];
  if (!entry) return;
  entry.qty -= 1;
  if (entry.qty <= 0) delete state.cart[id];
  persistCart();
  if (state.view === 'menu') render();
}

function addModalToCart() {
  const dish = dishes.find(item => item.id === state.modal.id);
  if (!state.modal.flavor || (dish.scallions && !state.modal.scallion)) return showToast('请先选择必选口味');
  state.cart[dish.id] = { qty:state.modal.qty, flavor:state.modal.flavor, scallion:state.modal.scallion };
  persistCart();
  state.modal = null;
  closeModal();
  render();
  showToast(`已加入 ${dish.name}`);
}

function placeOrder() {
  const lines = cartLines();
  if (!lines.length) return showToast('请先选择菜品');
  const now = new Date();
  const order = {
    id:`OD${Date.now()}`,
    createdAt:now.toLocaleString('zh-CN',{ hour12:false, month:'2-digit', day:'2-digit', hour:'2-digit', minute:'2-digit' }),
    createdAtMs:now.getTime(),
    completeAt:now.getTime() + ORDER_AUTO_COMPLETE_MS,
    status:'progress', mode:state.serviceMode, note:state.note,
    items:lines.map(item => ({ id:item.id, qty:item.qty, price:item.price, flavor:item.flavor, scallion:item.scallion })),
    total:cartSubtotal() - discount(), count:cartCount()
  };
  writeJson(ORDERS_KEY, [order, ...readOrders()]);
  state.cart = {};
  state.note = '';
  state.orderTab = 'progress';
  persistCart();
  state.previous = [];
  navigate('orders', { replace:true });
  showToast('下单成功，后厨正在接单');
}

function reorder(id) {
  const order = [...readOrders(), sampleOrder()].find(item => item.id === id);
  if (!order) return;
  state.cart = {};
  order.items.forEach(item => {
    const dish = dishes.find(value => value.id === item.id);
    if (dish) state.cart[item.id] = { qty:item.qty, flavor:item.flavor || dish.flavors[0], scallion:item.scallion || dish.scallions?.[0] || '' };
  });
  persistCart();
  navigate('menu');
  showToast('已把原订单加入购物车');
}

document.addEventListener('click', event => {
  const control = event.target.closest('[data-action]');
  if (!control) return;
  const action = control.dataset.action;
  if (action === 'navigate') navigate(control.dataset.view);
  if (action === 'go-home') { state.previous = []; navigate('home', { replace:true }); }
  if (action === 'back') goBack();
  if (action === 'service-menu') { state.serviceMode = control.dataset.mode; navigate('menu'); }
  if (action === 'open-product') { event.stopPropagation(); openProduct(control.dataset.id); }
  if (action === 'quick-minus') { event.stopPropagation(); quickMinus(control.dataset.id); }
  if (action === 'category') {
    state.activeCategory = control.dataset.category;
    render();
    requestAnimationFrame(() => document.getElementById(`category-${state.activeCategory}`)?.scrollIntoView({ behavior:'smooth', block:'start' }));
  }
  if (action === 'close-modal') { state.modal = null; closeModal(); }
  if (action === 'select-option') { state.modal[control.dataset.group] = control.dataset.value; renderModal(); }
  if (action === 'modal-minus') { state.modal.qty = Math.max(1, state.modal.qty - 1); renderModal(); }
  if (action === 'modal-plus') { state.modal.qty += 1; renderModal(); }
  if (action === 'add-to-cart') addModalToCart();
  if (action === 'checkout') navigate('checkout');
  if (action === 'set-mode') { state.serviceMode = control.dataset.mode; render(); }
  if (action === 'edit-note') { const value = window.prompt('请输入口味、忌口等备注', state.note); if (value !== null) { state.note = value.trim().slice(0,50); render(); } }
  if (action === 'place-order') placeOrder();
  if (action === 'order-tab') { state.orderTab = control.dataset.tab; render(); }
  if (action === 'orders-filter') { state.orderTab = control.dataset.tab; navigate('orders'); }
  if (action === 'reorder') reorder(control.dataset.order);
  if (action === 'pattern') { state.pattern = Number(control.dataset.index); render(); }
  if (action === 'arrival') navigate('error');
  if (action === 'retry') { showToast('已重新连接'); setTimeout(() => navigate('story', { replace:true }), 550); }
  if (action === 'claim-coupon' || action === 'claim-member') { localStorage.setItem(COUPON_KEY, '1'); render(); showToast('欢迎加入蒸味会员，优惠券已到账'); }
  if (action === 'switch-store') showToast('当前仅开放：蒸知味·天门店');
  if (action === 'contact') showToast('演示页面暂未接入真实客服');
  if (action === 'points') showToast('当前积分：120');
  if (action === 'store-info') showToast('蒸知味·天门店 · 营业中');
  if (action === 'about') showToast('蒸以致鲜，味以至真');
  if (action === 'settings') showToast('设置功能正在完善');
  if (action === 'edit-profile') showToast('演示账号暂不支持编辑');
});

$('skipSplash').addEventListener('click', enterApp);
let splashTimer = setTimeout(enterApp, 2000);
let appRendered = false;

function enterApp() {
  clearTimeout(splashTimer);
  if (!appRendered) {
    render();
    appRendered = true;
  }
  $('splash').classList.add('is-hidden');
  $('app').classList.remove('is-hidden');
}
