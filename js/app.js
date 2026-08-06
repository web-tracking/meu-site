(function (w, d) {
  var CATEGORY_ICONS = {
    notebooks: "💻",
    smartphones: "📱",
    audio: "🎧",
    wearables: "⌚",
  };

  function qs(sel, root) {
    return (root || d).querySelector(sel);
  }

  function qsa(sel, root) {
    return Array.prototype.slice.call((root || d).querySelectorAll(sel));
  }

  function categoryLabel(id) {
    var found = (w.NEXUS_CATEGORIES || []).find(function (c) {
      return c.id === id;
    });
    return found ? found.label : id;
  }

  function productCard(product) {
    var icon = CATEGORY_ICONS[product.category] || "✦";
    return (
      '<article class="product-card">' +
      '<a class="product-card__media product-card__media--' +
      product.category +
      '" href="produto.html?id=' +
      encodeURIComponent(product.id) +
      '">' +
      '<span class="product-card__icon" aria-hidden="true">' +
      icon +
      "</span>" +
      (product.badge
        ? '<span class="product-card__badge">' + product.badge + "</span>"
        : "") +
      "</a>" +
      '<div class="product-card__body">' +
      '<p class="product-card__cat">' +
      categoryLabel(product.category) +
      "</p>" +
      '<h3 class="product-card__title"><a href="produto.html?id=' +
      encodeURIComponent(product.id) +
      '">' +
      product.name +
      "</a></h3>" +
      '<p class="product-card__desc">' +
      product.short +
      "</p>" +
      '<div class="product-card__footer">' +
      '<span class="product-card__price">' +
      w.formatPrice(product.price) +
      "</span>" +
      '<button type="button" class="btn btn--ghost btn--sm" data-add="' +
      product.id +
      '">Adicionar</button>' +
      "</div>" +
      "</div>" +
      "</article>"
    );
  }

  function updateCartBadge() {
    var count = w.NexusCart ? w.NexusCart.getCount() : 0;
    qsa("[data-cart-count]").forEach(function (el) {
      el.textContent = String(count);
      el.hidden = count === 0;
    });
  }

  function bindAddButtons(root) {
    qsa("[data-add]", root).forEach(function (btn) {
      btn.addEventListener("click", function () {
        var id = btn.getAttribute("data-add");
        if (!id || !w.NexusCart) return;
        w.NexusCart.add(id, 1);
        btn.classList.add("is-added");
        btn.textContent = "Adicionado";
        setTimeout(function () {
          btn.classList.remove("is-added");
          btn.textContent = "Adicionar";
        }, 1200);
      });
    });
  }

  function renderFeatured() {
    var el = qs("[data-featured]");
    if (!el) return;
    var featured = w.NEXUS_PRODUCTS.slice(0, 4);
    el.innerHTML = featured.map(productCard).join("");
    bindAddButtons(el);
  }

  function renderCatalog() {
    var grid = qs("[data-catalog]");
    if (!grid) return;

    var filters = qs("[data-filters]");
    var active = "all";

    function paint() {
      var list =
        active === "all"
          ? w.NEXUS_PRODUCTS
          : w.NEXUS_PRODUCTS.filter(function (p) {
              return p.category === active;
            });
      grid.innerHTML = list.map(productCard).join("");
      bindAddButtons(grid);
    }

    if (filters) {
      filters.innerHTML = w.NEXUS_CATEGORIES.map(function (cat) {
        return (
          '<button type="button" class="chip' +
          (cat.id === active ? " is-active" : "") +
          '" data-filter="' +
          cat.id +
          '">' +
          cat.label +
          "</button>"
        );
      }).join("");

      filters.addEventListener("click", function (e) {
        var btn = e.target.closest("[data-filter]");
        if (!btn) return;
        active = btn.getAttribute("data-filter");
        qsa("[data-filter]", filters).forEach(function (b) {
          b.classList.toggle("is-active", b === btn);
        });
        paint();
      });
    }

    paint();
    if (typeof w.track === "function") w.track("view_catalog");
  }

  function renderProductDetail() {
    var root = qs("[data-product-detail]");
    if (!root) return;

    var params = new URLSearchParams(w.location.search);
    var id = params.get("id");
    var product = id ? w.getProductById(id) : null;

    if (!product) {
      root.innerHTML =
        '<div class="empty-state">' +
        "<h1>Produto não encontrado</h1>" +
        '<p>Esse item não existe no catálogo.</p>' +
        '<a class="btn btn--primary" href="produtos.html">Ver catálogo</a>' +
        "</div>";
      return;
    }

    var icon = CATEGORY_ICONS[product.category] || "✦";
    root.innerHTML =
      '<div class="detail">' +
      '<div class="detail__media product-card__media--' +
      product.category +
      '">' +
      '<span class="detail__icon" aria-hidden="true">' +
      icon +
      "</span>" +
      "</div>" +
      '<div class="detail__info">' +
      '<p class="detail__cat">' +
      categoryLabel(product.category) +
      "</p>" +
      "<h1>" +
      product.name +
      "</h1>" +
      '<p class="detail__price">' +
      w.formatPrice(product.price) +
      "</p>" +
      '<p class="detail__desc">' +
      product.description +
      "</p>" +
      '<div class="detail__actions">' +
      '<button type="button" class="btn btn--primary" data-add="' +
      product.id +
      '">Adicionar ao carrinho</button>' +
      '<a class="btn btn--ghost" href="carrinho.html">Ir ao carrinho</a>' +
      "</div>" +
      "</div>" +
      "</div>";

    bindAddButtons(root);
    if (typeof w.track === "function") w.track("view_product");
  }

  function renderCart() {
    var root = qs("[data-cart]");
    if (!root) return;

    function paint() {
      var items = w.NexusCart.getItems();
      if (!items.length) {
        root.innerHTML =
          '<div class="empty-state">' +
          "<h1>Seu carrinho está vazio</h1>" +
          "<p>Explore o catálogo e adicione produtos para continuar.</p>" +
          '<a class="btn btn--primary" href="produtos.html">Ver produtos</a>' +
          "</div>";
        return;
      }

      var rows = items
        .map(function (item) {
          var product = w.getProductById(item.id);
          if (!product) return "";
          return (
            '<div class="cart-row" data-cart-id="' +
            product.id +
            '">' +
            '<div class="cart-row__info">' +
            "<strong>" +
            product.name +
            "</strong>" +
            "<span>" +
            w.formatPrice(product.price) +
            "</span>" +
            "</div>" +
            '<div class="cart-row__qty">' +
            '<button type="button" class="qty-btn" data-qty="-1" aria-label="Diminuir">−</button>' +
            "<span>" +
            item.qty +
            "</span>" +
            '<button type="button" class="qty-btn" data-qty="1" aria-label="Aumentar">+</button>' +
            "</div>" +
            '<div class="cart-row__total">' +
            w.formatPrice(product.price * item.qty) +
            "</div>" +
            '<button type="button" class="cart-row__remove" data-remove aria-label="Remover">×</button>' +
            "</div>"
          );
        })
        .join("");

      root.innerHTML =
        '<div class="cart-layout">' +
        '<div class="cart-list">' +
        rows +
        "</div>" +
        '<aside class="cart-summary">' +
        "<h2>Resumo</h2>" +
        '<div class="cart-summary__line"><span>Itens</span><strong>' +
        w.NexusCart.getCount() +
        "</strong></div>" +
        '<div class="cart-summary__line"><span>Total</span><strong>' +
        w.formatPrice(w.NexusCart.getTotal()) +
        "</strong></div>" +
        '<a class="btn btn--primary btn--block" href="checkout.html">Finalizar compra</a>' +
        '<a class="btn btn--ghost btn--block" href="produtos.html">Continuar comprando</a>' +
        "</aside>" +
        "</div>";

      qsa(".cart-row", root).forEach(function (row) {
        var id = row.getAttribute("data-cart-id");
        var item = items.find(function (i) {
          return i.id === id;
        });
        qsa("[data-qty]", row).forEach(function (btn) {
          btn.addEventListener("click", function () {
            var delta = Number(btn.getAttribute("data-qty"));
            w.NexusCart.setQty(id, (item ? item.qty : 0) + delta);
            paint();
          });
        });
        var removeBtn = qs("[data-remove]", row);
        if (removeBtn) {
          removeBtn.addEventListener("click", function () {
            w.NexusCart.remove(id);
            paint();
          });
        }
      });
    }

    paint();
    if (typeof w.track === "function") w.track("view_cart");
  }

  function bindCheckout() {
    var form = qs("[data-checkout-form]");
    if (!form) return;

    if (!w.NexusCart.getCount()) {
      w.location.href = "carrinho.html";
      return;
    }

    var totalEl = qs("[data-checkout-total]");
    if (totalEl) totalEl.textContent = w.formatPrice(w.NexusCart.getTotal());

    if (typeof w.track === "function") w.track("begin_checkout");

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!form.reportValidity()) return;
      if (typeof w.track === "function") w.track("purchase");
      w.NexusCart.clear();
      w.location.href = "sucesso.html";
    });
  }

  function init() {
    updateCartBadge();
    w.addEventListener("nexus:cartchange", updateCartBadge);
    renderFeatured();
    renderCatalog();
    renderProductDetail();
    renderCart();
    bindCheckout();
  }

  if (d.readyState === "loading") {
    d.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})(window, document);
