/* ══════════════════════════════
   products.js — New Products Logic
   Link this at bottom of index.html:
   <script src="products.js"></script>
══════════════════════════════ */

/* ── Product Data ── */
const products = {
  1: {
    name: "Pink Peony Bouquet",
    img: "flowers2.jpg",
    price: "$38.00",
    oldPrice: "",
    bg: "#fce8ed",
    desc: "Our Pink Peony Bouquet is a lush, romantic arrangement bursting with fully bloomed garden peonies in the softest shades of blush and rose. Hand-tied with satin ribbon and nestled in tissue wrap, this bouquet is a timeless expression of love and admiration.",
    reasons: [
      "Peonies symbolise love, prosperity, and a happy life — perfect for Mother's Day.",
      "Long-lasting blooms that stay fresh for 7–10 days with proper care.",
      "Hand-picked and arranged by our in-house floral artists.",
      "Arrives in a signature gift box — ready to present with no extra wrapping needed."
    ]
  },
  2: {
    name: "Purple Lavender Bundle",
    img: "flowers3.jpg",
    price: "$42.00",
    oldPrice: "",
    bg: "#f0e8f8",
    desc: "The Purple Lavender Bundle is a calming, aromatic bouquet featuring dried and fresh lavender stems tied with rustic twine. It brings a touch of Provençal charm to any room and fills the space with a soothing natural scent your mum will adore.",
    reasons: [
      "Lavender is known for its calming, stress-relieving properties — a thoughtful gift.",
      "Doubles as a natural home fragrance — no candles needed.",
      "Dried elements last for months, making it a lasting keepsake.",
      "Ideal for mums who love wellness, aromatherapy, or home décor."
    ]
  },
  3: {
    name: "Sunflower & Rose Mix",
    img: "flowers4.jpg",
    price: "$35.75",
    oldPrice: "$55.00",
    bg: "#fff8e8",
    desc: "A bold and joyful combination of golden sunflowers and velvety red roses, this bouquet radiates warmth and energy. The contrasting colours make a striking visual impact, and the mixed arrangement suits any style of home — traditional or modern.",
    reasons: [
      "Sunflowers represent adoration and loyalty — the perfect message for Mother's Day.",
      "Roses add a classic romantic touch that never goes out of style.",
      "Currently 35% off — best value pick in our new arrivals.",
      "Comes with a personalised message card slot for your heartfelt note."
    ]
  },
  4: {
    name: "Spring Snowflake Bouquet",
    img: "flowers5.jpg",
    price: "$29.00",
    oldPrice: "",
    bg: "#e8f4f0",
    desc: "Light, delicate and beautifully fresh, the Spring Snowflake Bouquet features white blooms with soft green foliage — a serene, elegant choice that feels like the first morning of spring. Clean, minimal, and utterly charming.",
    reasons: [
      "White blooms symbolise purity and new beginnings — a meaningful Mother's Day gesture.",
      "The soft green foliage pairs beautifully with any home interior.",
      "Our most affordable bouquet without compromising on quality.",
      "Sourced from sustainable local growers every week for guaranteed freshness."
    ]
  }
};

/* ── Show Detail Panel ── */
function showDetails(id) {
  const p = products[id];
  const panel = document.getElementById("detailPanel");

  document.getElementById("detailImg").src       = p.img;
  document.getElementById("detailImg").style.background = p.bg;
  document.getElementById("detailName").textContent     = p.name;
  document.getElementById("detailPrice").textContent    = p.price;
  document.getElementById("detailDesc").textContent     = p.desc;

  const oldEl = document.getElementById("detailOldPrice");
  oldEl.textContent = p.oldPrice || "";

  const ul = document.getElementById("detailReasons");
  ul.innerHTML = "";
  p.reasons.forEach(r => {
    const li = document.createElement("li");
    li.textContent = r;
    ul.appendChild(li);
  });

  panel.classList.add("active");

  // Smooth scroll to panel
  setTimeout(() => {
    panel.scrollIntoView({ behavior: "smooth", block: "start" });
  }, 60);
}

/* ── Hide Detail Panel ── */
function hideDetails() {
  const panel = document.getElementById("detailPanel");
  panel.classList.remove("active");

  // Scroll back to the products grid
  document.getElementById("new-products").scrollIntoView({ behavior: "smooth", block: "start" });
}

/* ── Interactive Star Rating ── */
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".prod-stars").forEach(starGroup => {
    const stars = starGroup.querySelectorAll(".star");
    const label = starGroup.querySelector(".star-label");

    stars.forEach((star, idx) => {
      /* Hover highlight */
      star.addEventListener("mouseenter", () => {
        stars.forEach((s, i) => {
          s.classList.toggle("bi-star-fill", i <= idx);
          s.classList.toggle("bi-star",      i > idx);
          s.style.color = i <= idx ? "var(--pink-accent)" : "var(--pink-mid)";
        });
      });

      /* Reset on mouse leave (back to saved rating) */
      star.addEventListener("mouseleave", () => {
        const saved = parseInt(starGroup.dataset.rating || 0);
        stars.forEach((s, i) => {
          s.classList.toggle("bi-star-fill", i < saved);
          s.classList.toggle("bi-star",      i >= saved);
          s.style.color = i < saved ? "var(--pink-accent)" : "var(--pink-mid)";
        });
        label.textContent = saved ? `${saved}/5` : "Rate";
      });

      /* Click to save */
      star.addEventListener("click", () => {
        const rating = idx + 1;
        starGroup.dataset.rating = rating;
        label.textContent = `${rating}/5`;
        stars.forEach((s, i) => {
          s.classList.toggle("bi-star-fill", i < rating);
          s.classList.toggle("bi-star",      i >= rating);
          s.style.color = i < rating ? "var(--pink-accent)" : "var(--pink-mid)";
        });
      });
    });
  });
});

/* ── Countdown Timer (card 3) ── */
(function startCountdown() {
  const target = new Date();
  target.setDate(target.getDate() + 2);
  target.setHours(23, 59, 59, 0);

  function update() {
    const now  = new Date();
    const diff = target - now;
    if (diff <= 0) return;

    const d = Math.floor(diff / 86400000);
    const h = Math.floor((diff % 86400000) / 3600000);
    const m = Math.floor((diff % 3600000)  / 60000);
    const s = Math.floor((diff % 60000)    / 1000);

    const pad = n => String(n).padStart(2, "0");
    document.getElementById("cd-days").textContent  = pad(d);
    document.getElementById("cd-hours").textContent = pad(h);
    document.getElementById("cd-mins").textContent  = pad(m);
    document.getElementById("cd-secs").textContent  = pad(s);
  }
  update();
  setInterval(update, 1000);
})();