(function (w) {
  var STORAGE_KEY = "nexus_cart";

  function read() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      var data = raw ? JSON.parse(raw) : [];
      return Array.isArray(data) ? data : [];
    } catch (err) {
      return [];
    }
  }

  function write(items) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    w.dispatchEvent(new CustomEvent("nexus:cartchange"));
  }

  function getItems() {
    return read();
  }

  function getCount() {
    return read().reduce(function (sum, item) {
      return sum + item.qty;
    }, 0);
  }

  function getTotal() {
    return read().reduce(function (sum, item) {
      var product = w.getProductById(item.id);
      if (!product) return sum;
      return sum + product.price * item.qty;
    }, 0);
  }

  function add(productId, qty) {
    qty = qty || 1;
    var items = read();
    var existing = items.find(function (item) {
      return item.id === productId;
    });
    if (existing) {
      existing.qty += qty;
    } else {
      items.push({ id: productId, qty: qty });
    }
    write(items);
    if (typeof w.track === "function") w.track("add_to_cart");
    return items;
  }

  function setQty(productId, qty) {
    var items = read();
    if (qty <= 0) {
      items = items.filter(function (item) {
        return item.id !== productId;
      });
    } else {
      items = items.map(function (item) {
        if (item.id === productId) item.qty = qty;
        return item;
      });
    }
    write(items);
    return items;
  }

  function remove(productId) {
    return setQty(productId, 0);
  }

  function clear() {
    write([]);
  }

  w.NexusCart = {
    getItems: getItems,
    getCount: getCount,
    getTotal: getTotal,
    add: add,
    setQty: setQty,
    remove: remove,
    clear: clear,
  };
})(window);
