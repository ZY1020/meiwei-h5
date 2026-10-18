'use strict';
const dishes=[
{id:1,name:'招牌牛肉饭',category:'主食',price:28,emoji:'🍛',desc:'牛肉软嫩，米饭香糯'},
{id:2,name:'鸡腿套餐',category:'主食',price:25,emoji:'🍗',desc:'香煎鸡腿搭配时蔬'},
{id:3,name:'番茄意面',category:'主食',price:24,emoji:'🍝',desc:'酸甜番茄酱汁'},
{id:4,name:'黄金薯条',category:'小吃',price:12,emoji:'🍟',desc:'现炸酥脆'},
{id:5,name:'香酥鸡块',category:'小吃',price:16,emoji:'🍖',desc:'外酥里嫩'},
{id:6,name:'柠檬茶',category:'饮品',price:10,emoji:'🍋',desc:'清爽解腻'},
{id:7,name:'鲜橙汁',category:'饮品',price:14,emoji:'🍊',desc:'清甜果香'},
{id:8,name:'招牌汉堡',category:'热销',price:22,emoji:'🍔',desc:'人气推荐'}];
const categories=['全部','热销','主食','小吃','饮品'];
const ORDERS_KEY='meiwei_demo_orders_v1';
let active='全部',cart={};
const $=id=>document.getElementById(id);
const money=n=>'¥'+n.toFixed(2);
const getItems=()=>dishes.filter(d=>(cart[d.id]||0)>0).map(d=>({...d,qty:cart[d.id]}));
const getTotal=()=>getItems().reduce((s,d)=>s+d.price*d.qty,0);
const getCount=()=>getItems().reduce((s,d)=>s+d.qty,0);
function toast(message){$('toast').textContent=message;$('toast').classList.remove('hidden');clearTimeout(toast.timer);toast.timer=setTimeout(()=>$('toast').classList.add('hidden'),1700)}
function render(){
 $('categories').innerHTML=categories.map(c=>`<button class="${c===active?'active':''}" data-category="${c}">${c}</button>`).join('');
 $('dishes').innerHTML=dishes.filter(d=>active==='全部'||d.category===active).map(d=>`<article class="dish"><div class="emoji">${d.emoji}</div><div class="info"><h3>${d.name}</h3><p>${d.desc}</p><span class="price">${money(d.price)}</span></div><div class="qty">${cart[d.id]?`<button class="minus" data-id="${d.id}" data-delta="-1" aria-label="减少${d.name}">−</button><span>${cart[d.id]}</span>`:''}<button data-id="${d.id}" data-delta="1" aria-label="增加${d.name}">+</button></div></article>`).join('');
 $('cartTotal').textContent=money(getTotal());$('cartCount').textContent=`${getCount()} 件菜品 · 点击查看购物车`;
 $('cartItems').innerHTML=getItems().length?getItems().map(d=>`<div class="cart-row"><div><strong>${d.emoji} ${d.name}</strong><small>${money(d.price*d.qty)}</small></div><div class="qty"><button class="minus" data-id="${d.id}" data-delta="-1">−</button><span>${d.qty}</span><button data-id="${d.id}" data-delta="1">+</button></div></div>`).join(''):'<div class="empty">购物车还是空的，快去选菜吧</div>';
 $('sheetTotal').textContent='合计 '+money(getTotal());
}
function changeQty(id,delta){if(!dishes.some(d=>d.id===id))return;cart[id]=Math.max(0,(cart[id]||0)+delta);render()}
function showCart(show){$('overlay').classList.toggle('hidden',!show);$('overlay').setAttribute('aria-hidden',String(!show))}
function showPage(show){$('pageOverlay').classList.toggle('hidden',!show);$('pageOverlay').setAttribute('aria-hidden',String(!show))}
function readOrders(){try{const result=JSON.parse(localStorage.getItem(ORDERS_KEY)||'[]');return Array.isArray(result)?result:[]}catch{return []}}
function saveOrders(orders){localStorage.setItem(ORDERS_KEY,JSON.stringify(orders))}
function orderMarkup(order){return `<article class="order-card"><h3>订单 ${order.id}</h3><p>${order.createdAt} · ${order.status}</p>${order.items.map(d=>`<div class="order-line"><span>${d.name} × ${d.qty}</span><span>${money(d.price*d.qty)}</span></div>`).join('')}<div class="total-line">共 ${order.count} 件 · 合计 ${money(order.total)}</div></article>`}
function history(){showCart(false);$('panelTitle').textContent='历史订单';const orders=readOrders();$('panelContent').innerHTML=`<div class="panel-body">${orders.length?orders.map(orderMarkup).join(''):'<div class="empty">暂无历史订单</div>'}<p class="empty" style="font-size:11px">订单仅保存在当前浏览器，不会发送给商家。</p></div>`;showPage(true)}
function submit(){const items=getItems();if(!items.length){toast('请先选择菜品');return}const now=new Date();const order={id:'OD'+Date.now()+Math.floor(Math.random()*1000),items:items.map(({id,name,price,qty})=>({id,name,price,qty})),count:getCount(),total:getTotal(),createdAt:now.toLocaleString('zh-CN',{hour12:false}),status:'已提交（本地演示）'};try{saveOrders([order,...readOrders()]);cart={};render();showCart(false);$('panelTitle').textContent='提交成功';$('panelContent').innerHTML=`<div class="panel-body"><div class="order-card" style="text-align:center"><div style="font-size:40px">✅</div><h3>模拟订单提交成功</h3><p>订单仅保存在此设备，不会发送给商家。</p></div>${orderMarkup(order)}</div>`;showPage(true)}catch(e){toast('保存失败，请检查浏览器存储权限')}}
$('categories').addEventListener('click',e=>{const btn=e.target.closest('[data-category]');if(btn){active=btn.dataset.category;render()}});
function quantityHandler(e){const btn=e.target.closest('[data-id][data-delta]');if(btn)changeQty(Number(btn.dataset.id),Number(btn.dataset.delta))}
$('dishes').addEventListener('click',quantityHandler);$('cartItems').addEventListener('click',quantityHandler);
$('cartBtn').addEventListener('click',()=>showCart(true));$('closeCart').addEventListener('click',()=>showCart(false));$('overlay').addEventListener('click',e=>{if(e.target===$('overlay'))showCart(false)});
$('submitBtn').addEventListener('click',submit);$('sheetSubmit').addEventListener('click',submit);$('historyBtn').addEventListener('click',history);$('backBtn').addEventListener('click',()=>showPage(false));
render();
