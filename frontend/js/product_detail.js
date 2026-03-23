(function () {
  const params = new URLSearchParams(window.location.search);
  const id = parseInt(params.get('id'));
  const p = allProducts.find(x => x.id === id);
  const d = productDetails[id];
  const section = document.getElementById('pdSection');

  if (!p || !d) {
    section.innerHTML = '<p style="text-align:center;padding:40px">Product not found. <a href="products.html">Go back</a></p>';
    return;
  }

  document.title = `${p.name} (${p.model}) — Star King Power Tools`;

  section.innerHTML = `
    <div class="pd-layout">

      <!-- Gallery -->
      <div class="pd-gallery">
        <div class="pd-main-wrap">
          <img class="pd-main-img" id="pdMainImg" src="${p.images[0]}" alt="${p.name}" />
          <button class="img-nav img-prev" id="pdPrev" aria-label="Previous">&#8249;</button>
          <button class="img-nav img-next" id="pdNext" aria-label="Next">&#8250;</button>
        </div>
        <div class="pd-thumbs">
          ${p.images.map((src, i) => `
            <img src="${src}" alt="${p.name} ${i+1}" class="pd-thumb ${i===0?'active':''}" data-idx="${i}" />
          `).join('')}
        </div>
      </div>

      <!-- Info -->
      <div class="pd-info">
        <span class="product-category">${d.category}</span>
        <h1 class="pd-title">${p.name} <span class="pd-model">(${p.model})</span></h1>
        <div class="pd-price">₹${p.price.toLocaleString('en-IN')}</div>
        <p class="pd-overview">${d.overview}</p>

        <div class="pd-actions">
          <button class="btn-add-cart" id="pdAddCart">🛒 Add to Cart</button>
        </div>

        <div class="pd-accordion">

          <details open>
            <summary>Key Features</summary>
            <ul>${d.features.map(f => `<li>${f}</li>`).join('')}</ul>
          </details>

          <details>
            <summary>Technical Specifications</summary>
            <table class="pm-specs-table">
              ${d.specs.map(([k,v]) => `<tr><td>${k}</td><td>${v}</td></tr>`).join('')}
            </table>
          </details>

          <details>
            <summary>Applications</summary>
            <ul>${d.applications.map(a => `<li>${a}</li>`).join('')}</ul>
          </details>

          <details>
            <summary>What's in the Box</summary>
            <ul>${d.inbox.map(i => `<li>${i}</li>`).join('')}</ul>
          </details>

          <details>
            <summary>Safety & Maintenance</summary>
            <ul>${d.safety.map(s => `<li>${s}</li>`).join('')}</ul>
          </details>

        </div>
      </div>
    </div>
  `;

  // Gallery logic
  let currentIdx = 0;
  const mainImg = document.getElementById('pdMainImg');
  const thumbs = document.querySelectorAll('.pd-thumb');

  function setImage(idx) {
    currentIdx = (idx + p.images.length) % p.images.length;
    mainImg.src = p.images[currentIdx];
    thumbs.forEach((t, i) => t.classList.toggle('active', i === currentIdx));
  }

  document.getElementById('pdPrev').addEventListener('click', () => setImage(currentIdx - 1));
  document.getElementById('pdNext').addEventListener('click', () => setImage(currentIdx + 1));
  thumbs.forEach(t => t.addEventListener('click', () => setImage(parseInt(t.dataset.idx))));

  // Add to cart
  document.getElementById('pdAddCart').addEventListener('click', () => addToCart(p));
})();
