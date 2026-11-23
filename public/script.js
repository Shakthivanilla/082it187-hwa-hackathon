(function(){
  // ---------- State ----------
  const state = {
    age: 'puppy',
    breed: 'scent',
    plan: 'onetime', // onetime | monthly | yearly
    cart: null,      // {age, breed, plan, console, pack, packLabel, totalLabel, totalNum}
  };

  const PLAN_LABELS = {
    onetime:  { console: 149, pack: 0, packLabel: 'Included', totalLabel: '$149 one-time', totalNum: 149 },
    monthly:  { console: 149, pack: 24, packLabel: '$24/mo', totalLabel: '$149 + $24/mo', totalNum: 149 },
    yearly:   { console: 149, pack: 19, packLabel: '$19/mo billed annually', totalLabel: '$149 + $19/mo ($228/yr)', totalNum: 149 },
  };

  // Personalization advice by age + breed
  const PERSONALIZATION = {
    puppy: {
      matters: "Growing jaws and curious noses need gentle, safe challenges.",
      scent: "Mild, happy scents like meadow grass and blueberry.",
      games: "Easy nose-work puzzles that build confidence without frustration.",
      monthly: "Monthly Refresh Pack ($24/mo) — puppies grow fast and go through kibble quickly.",
      yearly: "Yearly Refresh Pack ($19/mo billed annually) — best value if you&rsquo;re in it long-term.",
      pick: "Monthly"
    },
    adult: {
      matters: "Prime chewing years — durability and mental stimulation matter most.",
      scent: "Rich, engaging scents like pine forest and roast chicken.",
      games: "Medium-to-hard sequential puzzles that keep working minds sharp.",
      monthly: "Monthly Refresh Pack ($24/mo) — flexible for active dogs.",
      yearly: "Yearly Refresh Pack ($19/mo billed annually) — save $60/year vs monthly.",
      pick: "Yearly"
    },
    senior: {
      matters: "Gentle on joints and teeth, easy to access, low frustration.",
      scent: "Soothing, familiar scents like fresh apple and wild herb.",
      games: "Easy, short sessions — free-for-all kibble scatter on Sundays.",
      monthly: "Monthly Refresh Pack ($24/mo) — low commitment.",
      yearly: "Yearly Refresh Pack ($19/mo billed annually) — steady supply, great value.",
      pick: "Monthly"
    },
  };

  const BREED_FOCUS = {
    scent: "Scent Hounds: The 6-chamber scent wheel is the star — nose-work is their superpower.",
    working: "Working Brains: Daily WiFi game updates keep their minds sharp with fresh puzzle rules.",
    earth: "Earth Dogs: Foraging-style zones and sequential chambers satisfy their digging instincts.",
    power: "Power Chewers: The chew-proof, cordless shell stands up to enthusiastic chompers.",
  };

  // ---------- Elements ----------
  const $ = (sel)=>document.querySelector(sel);
  const $$ = (sel)=>Array.from(document.querySelectorAll(sel));

  const ageRadios = $$('input[name="age"]');
  const breedRadios = $$('input[name="breed"]');
  const planRadios = $$('input[name="plan"]');
  const priceConsole = $('#price-console');
  const pricePack = $('#price-pack');
  const priceTotal = $('#price-total');
  const addToCartBtn = $('#add-to-cart');
  const adviceBody = $('#advice-body');

  // ---------- Configurator ----------
  function updateConfig(){
    const p = PLAN_LABELS[state.plan];
    priceConsole.textContent = '$' + p.console;
    pricePack.textContent = p.packLabel;
    priceTotal.textContent = p.totalLabel;
    priceTotal.setAttribute('aria-live','polite');
    updateAdvice();
  }

  function updateAdvice(){
    const ageData = PERSONALIZATION[state.age];
    const breedFocus = BREED_FOCUS[state.breed];
    const planRec = state.plan === 'monthly' ? ageData.monthly : ageData.yearly;
    adviceBody.innerHTML =
      '<strong>What matters:</strong> ' + ageData.matters + '<br>' +
      '<strong>Scent &amp; game focus:</strong> ' + breedFocus + '<br>' +
      '<strong>Recommended:</strong> ' + ageData.games + '<br>' +
      '<strong>Refresh pack:</strong> ' + planRec + '<br>' +
      '<strong>Our pick:</strong> ' + ageData.pick + ' plan alongside the $149 console.';
  }

  ageRadios.forEach(r=>r.addEventListener('change',()=>{ if(r.checked){ state.age = r.value; updateConfig(); } }));
  breedRadios.forEach(r=>r.addEventListener('change',()=>{ if(r.checked){ state.breed = r.value; updateConfig(); } }));
  planRadios.forEach(r=>r.addEventListener('change',()=>{ if(r.checked){ state.plan = r.value; updateConfig(); } }));

  addToCartBtn.addEventListener('click',()=>{
    const p = PLAN_LABELS[state.plan];
    state.cart = {
      age: state.age,
      breed: state.breed,
      plan: state.plan,
      console: p.console,
      pack: p.pack,
      packLabel: p.packLabel,
      totalLabel: p.totalLabel,
      totalNum: p.console + p.pack,
    };
    refreshCartUI();
    openCart();
    // dazzle the cart button
    const cartBtn = $('#cart-open-btn');
    cartBtn.classList.add('dazzling');
    const hint = $('#cart-hint');
    hint.style.display = 'block';
    setTimeout(()=>{
      cartBtn.classList.remove('dazzling');
      hint.style.display = 'none';
    }, 2500);
    addToCartBtn.textContent = 'Added to Cart';
    addToCartBtn.disabled = true;
    setTimeout(()=>{ addToCartBtn.textContent = 'Add to Cart'; addToCartBtn.disabled = false; }, 1400);
  });

  // ---------- 7-Day Rotation ----------
  const dayTabs = $$('.day-tab');
  const days = ['mon','tue','wed','thu','fri','sat','sun'];
  dayTabs.forEach(tab=>{
    tab.addEventListener('click',()=>{
      const day = tab.dataset.day;
      dayTabs.forEach(t=>{
        t.classList.remove('active');
        t.setAttribute('aria-selected','false');
      });
      tab.classList.add('active');
      tab.setAttribute('aria-selected','true');
      days.forEach(d=>{
        const el = $('#day-'+d);
        el.classList.toggle('active', d===day);
        el.classList.toggle('hidden', d!==day);
      });
    });
  });

  // ---------- Kibble Portion Estimator ----------
  const weightInput = $('#weight');
  const estAgeSelect = $('#est-age');
  const calcBtn = $('#calc-estimate');
  const resultPortion = $('#result-portion');
  const resultDifficulty = $('#result-difficulty');
  const resultFeeds = $('#result-feeds');

  function estimate(){
    const w = parseFloat(weightInput.value) || 30;
    const age = estAgeSelect.value;
    let pct = 0.03;
    let feeds = 2;
    let difficulty = 'Medium';
    if(age==='puppy'){ pct = 0.06; feeds = 3; difficulty = 'Easy'; }
    else if(age==='senior'){ pct = 0.025; feeds = 2; difficulty = 'Easy'; }
    else if(w>60){ difficulty = 'Medium-Hard'; }
    const lbs = w * pct;
    const cups = (lbs / 0.25).toFixed(1);
    resultPortion.textContent = cups + ' cups';
    resultDifficulty.textContent = difficulty;
    resultFeeds.textContent = feeds + ' per day';
  }
  calcBtn.addEventListener('click', estimate);
  [weightInput, estAgeSelect].forEach(el=>el.addEventListener('input', estimate));
  estimate();

  // ---------- FAQ Accordion ----------
  $$('.faq-question').forEach(btn=>{
    btn.addEventListener('click',()=>{
      const expanded = btn.getAttribute('aria-expanded') === 'true';
      $$('.faq-question').forEach(b=>{
        b.setAttribute('aria-expanded','false');
        const ans = $('#'+b.getAttribute('aria-controls'));
        if(ans) ans.hidden = true;
      });
      if(!expanded){
        btn.setAttribute('aria-expanded','true');
        const ans = $('#'+btn.getAttribute('aria-controls'));
        if(ans) ans.hidden = false;
      }
    });
  });

  // ---------- Cart Drawer ----------
  const cartOpenBtn = $('#cart-open-btn');
  const cartClose = $('#cart-close');
  const cartBackdrop = $('#cart-backdrop');
  const cartDrawer = $('#cart-drawer');
  const cartItems = $('#cart-items');
  const cartSummary = $('#cart-summary');
  const cartEmpty = cartItems.querySelector('.cart-empty');
  const cartCount = $('#cart-count');
  const cartPriceConsole = $('#cart-price-console');
  const cartPricePack = $('#cart-price-pack');
  const cartPriceTotal = $('#cart-price-total');
  const checkoutForm = $('#checkout-form');
  const orderStatus = $('#order-status');
  const orderConfirmation = $('#order-confirmation');
  const confirmMsg = $('#confirm-msg');
  const emailStatusBadge = $('#email-status-badge');
  const emailStatusDetail = $('#email-status-detail');
  const emailError = $('#email-error');

  function refreshCartUI(){
    const has = !!state.cart;
    cartCount.textContent = has ? '1' : '0';
    cartEmpty.style.display = has ? 'none' : 'block';
    cartSummary.style.display = has ? 'block' : 'none';
    if(has){
      cartPriceConsole.textContent = '$' + state.cart.console;
      cartPricePack.textContent = state.cart.packLabel;
      cartPriceTotal.textContent = state.cart.totalLabel;
    }
    orderConfirmation.style.display = 'none';
    emailError.textContent = '';
  }
  refreshCartUI();

  function openCart(){ cartDrawer.style.display = 'flex'; cartDrawer.setAttribute('aria-hidden','false'); document.body.style.overflow='hidden'; }
  function closeCart(){ cartDrawer.style.display = 'none'; cartDrawer.setAttribute('aria-hidden','true'); document.body.style.overflow=''; }

  cartOpenBtn.addEventListener('click', openCart);
  cartClose.addEventListener('click', closeCart);
  cartBackdrop.addEventListener('click', closeCart);
  document.addEventListener('keydown',(e)=>{ if(e.key==='Escape') closeCart(); });

  // Email validation helper
  function validateEmail(email){
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  // ---------- Hero video toggle ----------
  const playBtn = $('.play-btn');
  const demoVideo = $('#demo-video');
  const heroImg = $('#hero-img');
  if(playBtn && demoVideo){
    playBtn.addEventListener('click',()=>{
      const playing = demoVideo.style.display !== 'none';
      if(playing){
        demoVideo.pause(); demoVideo.style.display='none';
        heroImg.style.display='block';
        playBtn.querySelector('.play-label').textContent='Watch demo';
      } else {
        heroImg.style.display='none';
        demoVideo.style.display='block';
        demoVideo.play().catch(()=>{});
        playBtn.querySelector('.play-label').textContent='Hide video';
      }
    });
  }

  // ---------- Checkout / order endpoint ----------
  checkoutForm.addEventListener('submit', async (e)=>{
    e.preventDefault();
    const btn = checkoutForm.querySelector('button[type="submit"]');
    const orig = btn.textContent;
    const emailInput = $('#order-email');
    btn.textContent = 'Submitting...';
    btn.disabled = true;
    orderStatus.textContent = '';
    orderStatus.style.color = '';
    emailError.textContent = '';

    const email = emailInput.value.trim();
    if(!validateEmail(email)){
      emailError.textContent = 'Please enter a valid email address (e.g. you@example.com).';
      orderStatus.style.color = '#b91c1c';
      orderStatus.textContent = 'Checkout blocked — fix the email above.';
      btn.textContent = orig;
      btn.disabled = false;
      return;
    }

    const payload = {
      email,
      name: $('#order-name').value.trim(),
      address: $('#order-address').value.trim(),
      config: state.cart,
      createdAt: new Date().toISOString(),
    };

    try{
      const res = await fetch('/api/order', {
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(()=>({}));
      if(res.ok){
        orderStatus.style.color = '#166534';
        orderStatus.textContent = 'Test order received! ' + (data.message || '');
        // Show order confirmation email flow
        const emailInfo = data.email || {};
        orderConfirmation.style.display = 'block';
        confirmMsg.textContent = 'Your test order #' + (data.order && data.order.id ? data.order.id : 'received') + ' has been placed.';
        emailStatusBadge.textContent = emailInfo.status || 'sent';
        emailStatusBadge.className = 'email-badge ' + (emailInfo.status === 'sent' ? 'sent' : '');
        emailStatusDetail.textContent = emailInfo.detail || 'A test-order confirmation has been queued to ' + email + '.';
        // Reset cart after successful checkout
        state.cart = null;
        refreshCartUI();
        checkoutForm.reset();
      } else {
        orderStatus.style.color = '#b91c1c';
        orderStatus.textContent = 'Order failed: ' + (data.error || res.status);
      }
    } catch(err){
      orderStatus.style.color = '#b91c1c';
      orderStatus.textContent = 'Could not reach order endpoint.';
      console.error(err);
    } finally{
      btn.textContent = orig;
      btn.disabled = false;
    }
  });

  // ---------- Footer year ----------
  $('#year').textContent = new Date().getFullYear();

  // Initialize advice
  updateAdvice();

})();
