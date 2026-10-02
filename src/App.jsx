import React, { useState } from "react";
import { Routes, Route, Link, NavLink, useLocation } from "react-router-dom";
import { CakeSlice, Menu, X, Heart, Phone, MapPin, Clock, Instagram, MessageCircle, ArrowRight, CalendarDays, Sparkles, ShoppingCart, Plus, Minus, Trash2, Star, Check } from "lucide-react";

const WHATSAPP_NUMBER = "919345506095";
const INSTAGRAM_URL = "https://www.instagram.com/aora_bakes/";
const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hi Aora Bakes! I would like to enquire about your cakes.")}`;
const formatPrice = amount => new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0
}).format(amount);

const parsePrice = priceStr => {
  if (typeof priceStr === "number") return priceStr;
  const match = String(priceStr || "").match(/₹?\s*(\d+)/);
  return match ? Number(match[1]) : 0;
};

const MENU_CATEGORIES = [
  "All",
  "Brownies",
  "Cupcakes",
  "Tres Leches",
  "Cakes",
  "Celebration",
  "Cookies"
];

const menuItems = [
  // Brownies
  {
    name: "Classic Brownie (1/2 kg)",
    category: "Brownies",
    price: "₹500 / box (1/2 kg)",
    description: "Rich, fudgy chocolate brownies made with premium cocoa. Available in 3/4kg (₹750) and 1kg (₹900).",
    image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=900&q=85"
  },
  {
    name: "Assorted Classic Brownie",
    category: "Brownies",
    price: "₹50 / pc",
    description: "Single piece of our signature classic brownie.",
    image: "https://images.unsplash.com/photo-1515037893149-de7f840978e2?auto=format&fit=crop&w=900&q=85"
  },
  {
    name: "Nutella Brownie",
    category: "Brownies",
    price: "₹550 / box (1/2 kg)",
    description: "Our signature brownies swirled with generous amounts of Nutella.",
    image: "https://images.unsplash.com/photo-1624353365286-3f8d62daad51?auto=format&fit=crop&w=900&q=85"
  },

  // Cupcakes
  {
    name: "Vanilla Cupcakes",
    category: "Cupcakes",
    price: "₹120 / pack of 4",
    description: "Light and fluffy vanilla sponge. 6pcs: ₹180, 12pcs: ₹360.",
    image: "https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?auto=format&fit=crop&w=900&q=85"
  },
  {
    name: "Chocolate Cupcakes",
    category: "Cupcakes",
    price: "₹140 / pack of 4",
    description: "Decadent chocolate cupcakes. 6pcs: ₹210, 12pcs: ₹420.",
    image: "https://images.unsplash.com/photo-1587668178277-295251f900ce?auto=format&fit=crop&w=900&q=85"
  },

  // Tres Leches
  {
    name: "Chocolate Tres Leches",
    category: "Tres Leches",
    price: "₹80 / pc",
    description: "Soaked in three milks, rich chocolate flavor.",
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=900&q=85"
  },
  {
    name: "Rosemilk Tres Leches",
    category: "Tres Leches",
    price: "₹60 / pc",
    description: "A floral twist on the classic milk cake. 1kg available at ₹900.",
    image: "https://images.unsplash.com/photo-1535141192574-5d4897c12636?auto=format&fit=crop&w=900&q=85"
  },
  {
    name: "Badam Milk Tres Leches",
    category: "Tres Leches",
    price: "₹80 / pc",
    description: "Rich almond milk flavor soaked to perfection.",
    image: "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?auto=format&fit=crop&w=900&q=85"
  },

  // Cakes
  {
    name: "Signature Mug Cake",
    category: "Cakes",
    price: "₹60 / pc",
    description: "Warm, gooey cake in a mug - perfect for instant cravings.",
    image: "/signature-mug-cake.jpg"
  },
  {
    name: "Belgium Chocolate Mug Cake",
    category: "Cakes",
    price: "₹150 / pc",
    description: "Premium Belgium chocolate delight.",
    image: "/belgium-chocolate-mug-cake.jpg"
  },

  // Celebration
  {
    name: "Customize Birthday Cake & Brownie",
    category: "Celebration",
    price: "₹550 / 1/2 kg",
    description: "Customized cakes and brownie cakes. 1kg available at ₹1000.",
    image: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=900&q=85"
  },

  // Cookies
  {
    name: "Cookies",
    category: "Cookies",
    price: "₹120 / pack",
    description: "Freshly baked artisan cookies, crisp on the edges and soft inside.",
    image: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&w=900&q=85"
  }
];

const cakes = menuItems;

function Header({ cartCount }) {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  React.useEffect(() => setOpen(false), [location.pathname]);

  return (
    <>
      <header className="header">
        <div className="container nav">
          <Link to="/" className="brand" onClick={() => setOpen(false)}>
            <span className="brand-icon"><CakeSlice size={23} /></span>
            <span>Aora <b>Bakes</b></span>
          </Link>

          <button className="menu-btn" onClick={() => setOpen(!open)} aria-label="Toggle menu">
            {open ? <X size={23} /> : <Menu size={23} />}
          </button>
          <Link to="/cart" className="header-cart" aria-label={`Shopping cart, ${cartCount} items`} onClick={() => setOpen(false)}>
            <ShoppingCart size={20} /><b>{cartCount}</b>
          </Link>

          <nav className={open ? "nav-links open" : "nav-links"}>
            <NavLink to="/" onClick={() => setOpen(false)} className={({ isActive }) => isActive ? "active" : ""}>Home</NavLink>
            <NavLink to="/cakes" onClick={() => setOpen(false)} className={({ isActive }) => isActive ? "active" : ""}>Our Menu</NavLink>
            <NavLink to="/customize" onClick={() => setOpen(false)} className={({ isActive }) => isActive ? "active" : ""}>Customize</NavLink>
            <NavLink to="/about" onClick={() => setOpen(false)} className={({ isActive }) => isActive ? "active" : ""}>Reviews</NavLink>
            <NavLink to="/contact" onClick={() => setOpen(false)} className={({ isActive }) => isActive ? "active" : ""}>Contact</NavLink>
            <Link to="/cart" onClick={() => setOpen(false)} className="nav-cart" aria-label={`Shopping cart, ${cartCount} items`}>
              <ShoppingCart size={19} /><span>Cart</span><b>{cartCount}</b>
            </Link>
            <a className="nav-whatsapp" href={whatsappUrl} target="_blank" rel="noreferrer" onClick={() => setOpen(false)}>
              <MessageCircle size={17} /> WhatsApp
            </a>
          </nav>
        </div>
      </header>
      {open && <div className="nav-backdrop" onClick={() => setOpen(false)} />}
    </>
  );
}

function CakeCard({ cake, onAddToCart }) {
  const orderUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(`Hi Aora Bakes! I would like to order ${cake.name} (${cake.price}).`)}`;

  return (
    <article className="cake-card">
      <div className="cake-image-wrap">
        <img src={cake.image} alt={cake.name} className="cake-image" loading="lazy" />
        <button className="add-cart-btn" type="button" onClick={() => onAddToCart(cake)} aria-label={`Add ${cake.name} to cart`} title="Add to cart">
          <ShoppingCart size={19} />
        </button>
        <div className="cake-overlay">
          <a href={orderUrl} target="_blank" rel="noreferrer" className="overlay-btn">
            Order on WhatsApp <ArrowRight size={16} />
          </a>
        </div>
        <span className="category">{cake.category}</span>
      </div>
      <div className="cake-info">
        <div>
          <h3>{cake.name}</h3>
          <p>{cake.description || "Freshly baked with love"}</p>
        </div>
        <strong>{cake.price}</strong>
      </div>
    </article>
  );
}

function Home({ onAddToCart }) {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredItems = activeCategory === "All"
    ? menuItems
    : menuItems.filter(item => item.category === activeCategory);

  return (
    <>
      <section className="hero">
        <div className="hero-bg"></div>
        <div className="container hero-content">
          <div className="hero-copy">
            <span className="eyebrow">Freshly baked • Made with love</span>
            <h1>Sweet moments<br /><em>start here.</em></h1>
            <p>Brownies, cupcakes, tres leches, celebration cakes, cookies, and more — baked fresh to order in Erode,TamilNadu.</p>
            <div className="hero-actions">
              <a className="primary-btn" href="#menu">Explore Our Menu <ArrowRight size={18} /></a>
              <Link className="secondary-btn" to="/customize">
                <Sparkles size={18} /> Customize your cake
              </Link>
            </div>
            <div className="hero-trust">
              <span>★</span> Fresh ingredients&nbsp;&nbsp; • &nbsp;&nbsp;Custom designs&nbsp;&nbsp; • &nbsp;&nbsp;Made to order
            </div>
          </div>
        </div>
      </section>

      <section className="section menu-section" id="menu">
        <div className="container">
          <div className="section-heading text-center">
            <div>
              <span className="eyebrow">Fresh From Our Kitchen</span>
              <h2>Explore Our <em>Menu</em></h2>
              <p className="section-subtext">Pick your favourite treat, or message us for custom creations.</p>
            </div>
          </div>

          <div className="menu-category-tabs">
            {MENU_CATEGORIES.map(category => {
              const count = category === "All" ? menuItems.length : menuItems.filter(i => i.category === category).length;
              return (
                <button
                  key={category}
                  type="button"
                  className={activeCategory === category ? "menu-tab active" : "menu-tab"}
                  onClick={() => setActiveCategory(category)}
                >
                  <span>{category}</span>
                  <small className="tab-count">{count}</small>
                </button>
              );
            })}
          </div>

          <div className="cake-grid">
            {filteredItems.map(item => (
              <CakeCard key={item.name} cake={item} onAddToCart={onAddToCart} />
            ))}
          </div>

          <div className="menu-footer-cta">
            <p>Want a personalized cake design, theme, or custom celebration flavors?</p>
            <Link to="/customize" className="primary-btn small">
              <Sparkles size={16} /> Customize your dream cake
            </Link>
          </div>
        </div>
      </section>

      <section className="story-strip">
        <div className="container story-grid">
          <div className="story-photo">
            <img src="https://images.unsplash.com/photo-1558301211-0d8c8ddee6ec?auto=format&fit=crop&w=1100&q=85" alt="A beautifully decorated cake" />
          </div>
          <div className="story-copy">
            <span className="eyebrow">A little sweetness</span>
            <h2>From our oven<br />to your <em>heart.</em></h2>
            <p>At Aora Bakes, every cake, brownie, and treat is baked fresh and finished with care. We believe a good bake is more than dessert — it is part of the memory.</p>
            <Link className="primary-btn small" to="/about">Customer reviews <ArrowRight size={17} /></Link>
          </div>
        </div>
      </section>

      <section className="cta">
        <div className="container cta-inner">
          <div>
            <span className="eyebrow">Ready to celebrate?</span>
            <h2>Tell us what you're <em>dreaming of.</em></h2>
          </div>
          <a href={whatsappUrl} target="_blank" rel="noreferrer" className="primary-btn light">
            <MessageCircle size={19} /> Chat on WhatsApp
          </a>
        </div>
      </section>
    </>
  );
}

function Cakes({ onAddToCart }) {
  const [filter, setFilter] = useState("All");
  const filtered = filter === "All" ? menuItems : menuItems.filter(c => c.category === filter);

  return (
    <main>
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">Fresh from our kitchen</span>
          <h1>Our <em>Menu</em></h1>
          <p>Explore our brownies, cupcakes, tres leches, cakes, celebration bakes, and cookies.</p>
        </div>
      </section>
      <section className="section cakes-page">
        <div className="container">
          <div className="menu-category-tabs">
            {MENU_CATEGORIES.map(c => {
              const count = c === "All" ? menuItems.length : menuItems.filter(i => i.category === c).length;
              return (
                <button
                  key={c}
                  type="button"
                  className={filter === c ? "menu-tab active" : "menu-tab"}
                  onClick={() => setFilter(c)}
                >
                  <span>{c}</span>
                  <small className="tab-count">{count}</small>
                </button>
              );
            })}
          </div>
          <div className="cake-grid">
            {filtered.map(cake => <CakeCard key={cake.name} cake={cake} onAddToCart={onAddToCart} />)}
          </div>
        </div>
      </section>
    </main>
  );
}

function Cart({ items, onChangeQuantity, onRemove }) {
  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    deliveryDate: "",
    address: "",
    notes: ""
  });

  const subtotal = items.reduce((sum, item) => sum + parsePrice(item.price) * item.quantity, 0);

  const formattedItems = items.map(item => `• ${item.quantity}x ${item.name} (${item.price}) = ${formatPrice(parsePrice(item.price) * item.quantity)}`).join("\n");

  const checkoutMessage = [
    "🎂 *NEW ORDER - AORA BAKES* 🎂",
    "",
    customerInfo.name ? `👤 *Customer Name:* ${customerInfo.name}` : null,
    customerInfo.deliveryDate ? `📅 *Delivery Date:* ${customerInfo.deliveryDate}` : null,
    customerInfo.address ? `📍 *Delivery Area:* ${customerInfo.address}, Erode` : null,
    customerInfo.notes ? `📝 *Special Note:* ${customerInfo.notes}` : null,
    "",
    "🧁 *Items in Cart:*",
    formattedItems,
    "",
    `💰 *Total Amount:* ${formatPrice(subtotal)}`,
    "",
    "Please confirm my order and share payment details. Thank you! ✨"
  ].filter(Boolean).join("\n");

  const whatsappCheckoutUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(checkoutMessage)}`;

  return (
    <main className="cart-page">
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">Your sweet selection</span>
          <h1>Your <em>Cart</em></h1>
          <p>Review your cakes and quantities before placing your order.</p>
        </div>
      </section>
      <section className="section cart-section">
        <div className="container">
          {items.length === 0 ? (
            <div className="empty-cart">
              <span className="empty-cart-icon"><ShoppingCart size={28} /></span>
              <h2>Your cart is waiting for something sweet.</h2>
              <p>Explore our cakes and add your favourites here.</p>
              <Link className="primary-btn" to="/cakes">Browse cakes <ArrowRight size={17} /></Link>
            </div>
          ) : (
            <div className="cart-layout">
              <div className="cart-items">
                <div className="cart-list-heading"><h2>Your items <span>({items.reduce((sum, item) => sum + item.quantity, 0)})</span></h2><span>Price</span></div>
                {items.map(item => {
                  const unitPrice = parsePrice(item.price);
                  return (
                    <article className="cart-item" key={item.name}>
                      <img src={item.image} alt={item.name} />
                      <div className="cart-item-details">
                        <span className="eyebrow">{item.category}</span>
                        <h3>{item.name}</h3>
                        <p>{item.price}</p>
                        <div className="quantity-control" aria-label={`Quantity for ${item.name}`}>
                          <button type="button" onClick={() => onChangeQuantity(item.name, item.quantity - 1)} aria-label={`Decrease ${item.name} quantity`}><Minus size={15} /></button>
                          <span>{item.quantity}</span>
                          <button type="button" onClick={() => onChangeQuantity(item.name, item.quantity + 1)} aria-label={`Increase ${item.name} quantity`}><Plus size={15} /></button>
                        </div>
                      </div>
                      <div className="cart-item-total">
                        <b>{formatPrice(unitPrice * item.quantity)}</b>
                        <button className="remove-item" type="button" onClick={() => onRemove(item.name)} aria-label={`Remove ${item.name}`}><Trash2 size={17} /></button>
                      </div>
                    </article>
                  );
                })}
                <Link className="continue-shopping" to="/cakes"><ArrowRight size={16} /> Continue shopping</Link>
              </div>
              <aside className="cart-summary">
                <span className="eyebrow">Order summary</span>
                <h2>Almost <em>yours.</em></h2>

                <div className="cart-customer-fields">
                  <div className="cart-field">
                    <label htmlFor="cart-name">Your Name <span>(optional)</span></label>
                    <input
                      id="cart-name"
                      type="text"
                      placeholder="e.g. Priya"
                      value={customerInfo.name}
                      onChange={e => setCustomerInfo({ ...customerInfo, name: e.target.value })}
                    />
                  </div>

                  <div className="cart-field-row">
                    <div className="cart-field">
                      <label htmlFor="cart-date">Delivery Date <span>(optional)</span></label>
                      <input
                        id="cart-date"
                        type="date"
                        min={new Date().toISOString().split("T")[0]}
                        value={customerInfo.deliveryDate}
                        onChange={e => setCustomerInfo({ ...customerInfo, deliveryDate: e.target.value })}
                      />
                    </div>
                    <div className="cart-field">
                      <label htmlFor="cart-area">Delivery Area <span>(Erode)</span></label>
                      <input
                        id="cart-area"
                        type="text"
                        placeholder="e.g. Perundurai Rd"
                        value={customerInfo.address}
                        onChange={e => setCustomerInfo({ ...customerInfo, address: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="cart-field">
                    <label htmlFor="cart-notes">Special Note <span>(optional)</span></label>
                    <input
                      id="cart-notes"
                      type="text"
                      placeholder="Eggless, candles, message..."
                      value={customerInfo.notes}
                      onChange={e => setCustomerInfo({ ...customerInfo, notes: e.target.value })}
                    />
                  </div>
                </div>

                <div className="summary-line"><span>Subtotal</span><b>{formatPrice(subtotal)}</b></div>
                <div className="summary-line"><span>Delivery</span><b>Confirmed on WhatsApp</b></div>
                <div className="cart-total"><span>Total</span><b>{formatPrice(subtotal)}</b></div>
                <p>Delivery and payment details will be confirmed directly on WhatsApp with our baker.</p>
                <a className="whatsapp-checkout-btn" href={whatsappCheckoutUrl} target="_blank" rel="noreferrer">
                  <MessageCircle size={19} /> Checkout on WhatsApp <ArrowRight size={17} />
                </a>
              </aside>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

const CAKE_STYLES = [
  {
    name: "Chocolate celebration cake",
    subtitle: "Rich layered chocolate sponge & silky ganache",
    badge: "Bestseller",
    previewImage: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=1000&q=85"
  },
  {
    name: "Fresh cream cake",
    subtitle: "Airy vanilla sponge with fluffy whipped cream",
    badge: "Light & Soft",
    previewImage: "https://images.unsplash.com/photo-1535141192574-5d4897c13136?auto=format&fit=crop&w=1000&q=85"
  },
  {
    name: "Classic buttercream cake",
    subtitle: "Velvety frosting with elegant artisanal finish",
    badge: "Timeless",
    previewImage: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=1000&q=85"
  },
  {
    name: "Custom theme cake",
    subtitle: "Handcrafted milestone & birthday theme design",
    badge: "Bespoke",
    previewImage: "https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?auto=format&fit=crop&w=1000&q=85"
  }
];

const CAKE_FLAVORS = [
  {
    name: "Chocolate truffle",
    description: "Deep Belgian cocoa & ganache",
    color: "#3d231e",
    tag: "Decadent"
  },
  {
    name: "Classic vanilla",
    description: "Madagascar vanilla bean cream",
    color: "#d4a359",
    tag: "Classic"
  },
  {
    name: "Red velvet",
    description: "Silky cocoa & cream cheese touch",
    color: "#8b263e",
    tag: "Signature"
  },
  {
    name: "Strawberry cream",
    description: "Fresh strawberry compote & cream",
    color: "#d9657b",
    tag: "Fruity"
  },
  {
    name: "Butterscotch",
    description: "Caramelized praline crunch & butter",
    color: "#c27d2c",
    tag: "Crunchy"
  }
];

function CustomizeOrder() {
  const [order, setOrder] = useState({
    cake: "Chocolate celebration cake",
    flavor: "Chocolate truffle",
    size: "1 kg",
    occasion: "Birthday",
    date: "",
    message: "",
    notes: ""
  });
  const sizePrices = { "0.5 kg": 599, "1 kg": 999, "1.5 kg": 1399, "2 kg": 1799 };
  const estimatedPrice = sizePrices[order.size];
  const minimumDate = new Date().toISOString().split("T")[0];

  const orderMessage = [
    "Hi Aora Bakes! I'd like to customize a cake:",
    `Cake: ${order.cake}`,
    `Flavor: ${order.flavor}`,
    `Size: ${order.size}`,
    `Occasion: ${order.occasion}`,
    `Needed by: ${order.date || "Please confirm availability"}`,
    `Cake message: ${order.message || "No message"}`,
    `Design notes: ${order.notes || "None"}`,
    `Estimated starting price: ₹${estimatedPrice}`
  ].join("\n");

  function updateOrder(event) {
    setOrder(current => ({ ...current, [event.target.name]: event.target.value }));
  }

  return (
    <main className="customize-page">
      <section className="customize-heading">
        <div className="container">
          <span className="eyebrow">A cake made just for you</span>
          <h1>Make it <em>yours.</em></h1>
          <p>Choose the details and we’ll bring your celebration cake to life.</p>
        </div>
      </section>
      <section className="customize-section">
        <div className="container customize-layout">
          <form className="customize-form" onSubmit={event => event.preventDefault()}>
            <div className="form-intro">
              <span className="step-number">01</span>
              <div><h2>Your cake details</h2><p>Tell us what you’re celebrating.</p></div>
            </div>

            <fieldset className="custom-picker-fieldset">
              <legend className="field-label">Cake style</legend>
              <div className="cake-style-grid">
                {CAKE_STYLES.map(style => {
                  const isSelected = order.cake === style.name;
                  return (
                    <label
                      key={style.name}
                      className={`cake-style-card ${isSelected ? "selected" : ""}`}
                    >
                      <input
                        type="radio"
                        name="cake"
                        value={style.name}
                        checked={isSelected}
                        onChange={updateOrder}
                      />
                      <div className="style-card-header">
                        <span className="style-badge">{style.badge}</span>
                        <span className={`picker-check-circle ${isSelected ? "active" : ""}`}>
                          {isSelected && <Check size={12} strokeWidth={3} />}
                        </span>
                      </div>
                      <div className="style-card-body">
                        <span className="style-title">{style.name}</span>
                        <span className="style-desc">{style.subtitle}</span>
                      </div>
                    </label>
                  );
                })}
              </div>
            </fieldset>

            <fieldset className="custom-picker-fieldset">
              <legend className="field-label">Flavor</legend>
              <div className="flavor-grid">
                {CAKE_FLAVORS.map(flv => {
                  const isSelected = order.flavor === flv.name;
                  return (
                    <label
                      key={flv.name}
                      className={`flavor-card ${isSelected ? "selected" : ""}`}
                    >
                      <input
                        type="radio"
                        name="flavor"
                        value={flv.name}
                        checked={isSelected}
                        onChange={updateOrder}
                      />
                      <div className="flavor-header">
                        <div className="flavor-swatch-wrap">
                          <span className="flavor-dot" style={{ backgroundColor: flv.color }} />
                          <span className="flavor-tag">{flv.tag}</span>
                        </div>
                        <span className={`picker-check-circle ${isSelected ? "active" : ""}`}>
                          {isSelected && <Check size={11} strokeWidth={3} />}
                        </span>
                      </div>
                      <div className="flavor-body">
                        <span className="flavor-name">{flv.name}</span>
                        <span className="flavor-notes">{flv.description}</span>
                      </div>
                    </label>
                  );
                })}
              </div>
            </fieldset>

            <fieldset className="size-fieldset">
              <legend>Choose a size</legend>
              <div className="size-options">
                {Object.entries(sizePrices).map(([size, price]) => (
                  <label className={order.size === size ? "size-option selected" : "size-option"} key={size}>
                    <input type="radio" name="size" value={size} checked={order.size === size} onChange={updateOrder} />
                    <span>{size}</span><small>from ₹{price}</small>
                  </label>
                ))}
              </div>
            </fieldset>

            <div className="field-row">
              <div>
                <label className="field-label" htmlFor="occasion">Occasion</label>
                <select id="occasion" name="occasion" value={order.occasion} onChange={updateOrder}>
                  <option>Birthday</option><option>Anniversary</option><option>Wedding</option><option>Baby shower</option><option>Just because</option>
                </select>
              </div>
              <div>
                <label className="field-label" htmlFor="date">Date needed</label>
                <div className="date-input-wrap"><CalendarDays size={17} /><input id="date" name="date" type="date" min={minimumDate} value={order.date} onChange={updateOrder} /></div>
              </div>
            </div>

            <label className="field-label" htmlFor="message">Message on the cake <span>optional</span></label>
            <input id="message" name="message" type="text" maxLength={45} placeholder="e.g. Happy birthday, Anya!" value={order.message} onChange={updateOrder} />

            <label className="field-label" htmlFor="notes">Design notes <span>optional</span></label>
            <textarea id="notes" name="notes" rows="3" placeholder="Colors, theme, or little details you have in mind" value={order.notes} onChange={updateOrder} />

            <a className="primary-btn customize-submit" href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(orderMessage)}`} target="_blank" rel="noreferrer">
              Send your cake brief <ArrowRight size={18} />
            </a>

            <p className="form-footnote">We’ll confirm the final design, availability, and price with you on WhatsApp.</p>
          </form>

          <aside className="order-preview">
            <div className="preview-photo">
              <img
                src={(CAKE_STYLES.find(s => s.name === order.cake) || CAKE_STYLES[0]).previewImage}
                alt={order.cake}
              />
              <span>
                <Sparkles size={15} />
                {(CAKE_STYLES.find(s => s.name === order.cake) || CAKE_STYLES[0]).badge} • Baked fresh
              </span>
            </div>
            <div className="preview-summary">
              <span className="eyebrow">Your starting estimate</span>
              <div className="estimate-price">₹{estimatedPrice}<small>+</small></div>
              <p>Final pricing depends on your design and decoration. We’ll confirm everything before your order is placed.</p>
              <div className="summary-line"><span>Style</span><b>{order.cake}</b></div>
              <div className="summary-line"><span>Flavor</span><b>{order.flavor}</b></div>
              <div className="summary-line"><span>Size</span><b>{order.size}</b></div>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}

const CUSTOMER_REVIEWS = [
  {
    id: 1,
    name: "Priya S.",
    time: "2 days ago",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&h=200&q=80",
    text: "The Nutella brownies are absolutely divine! Perfect crust and gooey center. Best in Erode hands down."
  },
  {
    id: 2,
    name: "Rahul M.",
    time: "1 week ago",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&h=200&q=80",
    text: "Ordered a custom birthday cake for my daughter. The design was exactly what we wanted and the taste was incredible."
  },
  {
    id: 3,
    name: "Anitha K.",
    time: "2 weeks ago",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&h=200&q=80",
    text: "Tres leches jars are a must try. The Rose milk flavor is unique and very refreshing."
  },
  {
    id: 4,
    name: "Karthik R.",
    time: "3 weeks ago",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&h=200&q=80",
    text: "Prompt delivery and excellent packaging. The brownies survived the travel perfectly."
  }
];

function About() {
  return (
    <main>
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">Customer reviews</span>
          <h1>Customer <em>Reviews</em></h1>
          <p>Real stories, sweet moments, and kind words from cake lovers in Erode,TamilNadu.</p>
        </div>
      </section>

      <section className="section reviews-section">
        <div className="container">
          <div className="reviews-grid">
            {CUSTOMER_REVIEWS.map(review => (
              <div key={review.id} className="review-card">
                <div className="review-header">
                  <div className="review-user-info">
                    <img src={review.avatar} alt={review.name} className="review-avatar" />
                    <div>
                      <h3 className="review-author">{review.name}</h3>
                      <div className="review-stars">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={15} color="#d4a359" strokeWidth={1.8} fill="rgba(212, 163, 89, 0.15)" />
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="review-meta">
                    <span className="review-quote-sym">”</span>
                    <span className="review-time">{review.time}</span>
                  </div>
                </div>
                <p className="review-text">"{review.text}"</p>
              </div>
            ))}
          </div>

          <div className="reviews-cta">
            <p>Had a sweet experience with Aora Bakes? Share your feedback with us!</p>
            <a href={whatsappUrl} target="_blank" rel="noreferrer" className="primary-btn">
              Share Your Review on WhatsApp <MessageCircle size={17} />
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}

function Contact() {
  return (
    <main>
      <section className="page-hero">
        <div className="container">
          <span className="eyebrow">We'd love to hear from you</span>
          <h1>Let's make it <em>sweet.</em></h1>
          <p>Have a question or want to order a cake? Send us a WhatsApp message or reach out on Instagram.</p>
        </div>
      </section>
      <section className="section contact-section">
        <div className="container contact-grid">
          <div className="contact-card">
            <span className="eyebrow">Get in touch</span>
            <h2>Order your cake<br /><em>with a message.</em></h2>
            <p>Tap the WhatsApp button and tell us the flavour, size, date, and design you have in mind.</p>

            <a className="whatsapp-big" href={whatsappUrl} target="_blank" rel="noreferrer">
              <MessageCircle size={25} />
              <span><b>Chat on WhatsApp</b><small>+91 93455 06095</small></span>
              <ArrowRight size={20} />
            </a>

            <div className="contact-details">
              <div><Phone size={20} /><span><b>Phone / WhatsApp</b><small>+91 93455 06095</small></span></div>
              <div><Clock size={20} /><span><b>Order hours</b><small>10:00 AM – 8:00 PM</small></span></div>
              <div><MapPin size={20} /><span><b>Location</b><small>Erode,TamilNadu</small></span></div>
              <div>
                <Instagram size={20} />
                <span>
                  <b>Instagram</b>
                  <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer" className="contact-insta-link">
                    @aora_bakes
                  </a>
                </span>
              </div>
            </div>

            <a className="instagram-strip-btn" href={INSTAGRAM_URL} target="_blank" rel="noreferrer">
              <Instagram size={20} />
              <span>Follow our sweet creations on Instagram <b>@aora_bakes</b></span>
              <ArrowRight size={17} />
            </a>
          </div>

          <div className="contact-image">
            <img src="https://images.unsplash.com/photo-1557979619-445218f326b9?auto=format&fit=crop&w=1100&q=85" alt="Decorated celebration cake" />
            <div className="image-caption"><CakeSlice size={18} /> Made fresh for your special day</div>
          </div>
        </div>
      </section>
    </main>
  );
}

function Footer() {
  return (
    <footer>
      <div className="container footer-grid">
        <div className="footer-col">
          <Link to="/" className="brand footer-brand">
            <span className="brand-icon"><CakeSlice size={21} /></span>
            Aora <b>Bakes</b>
          </Link>
          <p>Sweet moments, freshly baked with love in Erode,TamilNadu.</p>
          <div className="footer-social">
            <a href={whatsappUrl} target="_blank" rel="noreferrer" aria-label="WhatsApp" title="Chat on WhatsApp">
              <MessageCircle size={18} />
            </a>
            <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer" aria-label="Instagram" title="Follow on Instagram @aora_bakes">
              <Instagram size={18} />
            </a>
          </div>
        </div>

        <div className="footer-col">
          <h4>Quick Links</h4>
          <div className="footer-links-col">
            <Link to="/">Home</Link>
            <Link to="/cakes">Our Menu</Link>
            <Link to="/customize">Customize</Link>
            <Link to="/about">Reviews</Link>
            <Link to="/contact">Contact</Link>
          </div>
        </div>

        <div className="footer-col footer-contact-col">
          <h4>Contact Information</h4>
          <div className="footer-contact-list">
            <div>
              <MapPin size={16} />
              <span>Erode,TamilNadu</span>
            </div>
            <div>
              <Phone size={16} />
              <a href="tel:+919345506095">+91 93455 06095</a>
            </div>
            <div>
              <Clock size={16} />
              <span>10:00 AM – 8:00 PM</span>
            </div>
            <div>
              <Instagram size={16} />
              <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer">@aora_bakes</a>
            </div>
          </div>
        </div>
      </div>
      <div className="copyright">© {new Date().getFullYear()} Aora Bakes • Erode,TamilNadu. Made with love.</div>
    </footer>
  );
}

export default function App() {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const savedCart = JSON.parse(localStorage.getItem("aora-bakes-cart") || "[]");
      return Array.isArray(savedCart) ? savedCart : [];
    } catch {
      return [];
    }
  });

  React.useEffect(() => {
    localStorage.setItem("aora-bakes-cart", JSON.stringify(cartItems));
  }, [cartItems]);

  function addToCart(cake) {
    setCartItems(current => {
      const existing = current.find(item => item.name === cake.name);
      if (existing) {
        return current.map(item => item.name === cake.name ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...current, { ...cake, quantity: 1 }];
    });
  }

  function changeQuantity(name, quantity) {
    if (quantity < 1) {
      setCartItems(current => current.filter(item => item.name !== name));
      return;
    }
    setCartItems(current => current.map(item => item.name === name ? { ...item, quantity } : item));
  }

  function removeFromCart(name) {
    setCartItems(current => current.filter(item => item.name !== name));
  }

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="app">
      <Header cartCount={cartCount} />
      <Routes>
        <Route path="/" element={<Home onAddToCart={addToCart} />} />
        <Route path="/cakes" element={<Cakes onAddToCart={addToCart} />} />
        <Route path="/cart" element={<Cart items={cartItems} onChangeQuantity={changeQuantity} onRemove={removeFromCart} />} />
        <Route path="/customize" element={<CustomizeOrder />} />
        <Route path="/about" element={<About />} />
        <Route path="/reviews" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <Footer />
      <a className="floating-wa" href={whatsappUrl} target="_blank" rel="noreferrer" aria-label="Chat on WhatsApp"><MessageCircle size={25} /></a>
    </div>
  );
}