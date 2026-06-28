import React, { useState } from 'react';
import { X, Trash2, ShoppingBag, Send, AlertTriangle, ArrowRight, Table, Check, Plus, Minus } from 'lucide-react';
import { CartItem, OrderType, MenuItem } from '../types';
import { motion, AnimatePresence } from 'motion/react';

interface CartSectionProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onAddToCart: (item: MenuItem) => void;
  onRemoveFromCart: (item: MenuItem) => void;
  onClearCart: () => void;
}

export default function CartSection({
  isOpen,
  onClose,
  cart,
  onAddToCart,
  onRemoveFromCart,
  onClearCart,
}: CartSectionProps) {
  const [orderType, setOrderType] = useState<OrderType>('dine-in');
  const [tableNumber, setTableNumber] = useState<string>('');
  const [customerName, setCustomerName] = useState<string>('');
  const [customerPhone, setCustomerPhone] = useState<string>('');
  const [customerAddress, setCustomerAddress] = useState<string>('');
  const [kitchenInstructions, setKitchenInstructions] = useState<string>('');
  const [isOrdering, setIsOrdering] = useState<boolean>(false);
  const [orderSuccess, setOrderSuccess] = useState<boolean>(false);
  const [receiptNumber, setReceiptNumber] = useState<string>('');

  // Calculate prices
  const subtotal = cart.reduce((acc, item) => acc + item.menuItem.price * item.quantity, 0);
  const gst = subtotal * 0.05; // 5% GST
  const serviceCharge = orderType === 'delivery' ? 40 : 0; // ₹40 delivery fee
  const total = subtotal + gst + serviceCharge;

  // Form check
  const isFormValid = () => {
    if (!customerName || !customerPhone) return false;
    if (orderType === 'dine-in' && !tableNumber) return false;
    if (orderType === 'delivery' && !customerAddress) return false;
    return true;
  };

  const handlePlaceOrder = () => {
    if (!isFormValid()) return;
    setIsOrdering(true);

    // Simulate order placement
    setTimeout(() => {
      setIsOrdering(false);
      setOrderSuccess(true);
      setReceiptNumber('SADHYA-' + Math.floor(1000 + Math.random() * 9000));
    }, 1500);
  };

  // Compile formatted WhatsApp message
  const handleWhatsAppCheckout = () => {
    if (!isFormValid()) return;

    const receiptNum = receiptNumber || 'SADHYA-' + Math.floor(1000 + Math.random() * 9000);
    let msg = `*🍽️ SADHYA RESTAURANT ORDER - ${receiptNum}*\n`;
    msg += `--------------------------------------\n`;
    msg += `*Name:* ${customerName}\n`;
    msg += `*Phone:* ${customerPhone}\n`;
    msg += `*Type:* ${orderType.toUpperCase()}\n`;
    if (orderType === 'dine-in') msg += `*Table No:* ${tableNumber}\n`;
    if (orderType === 'delivery') msg += `*Address:* ${customerAddress}\n`;
    if (kitchenInstructions) msg += `*Notes:* ${kitchenInstructions}\n`;
    msg += `--------------------------------------\n`;
    msg += `*ORDER ITEMS:*\n`;

    cart.forEach((item) => {
      msg += `• ${item.menuItem.name} x ${item.quantity} - ₹${(item.menuItem.price * item.quantity).toFixed(2)}\n`;
    });

    msg += `--------------------------------------\n`;
    msg += `*Subtotal:* ₹${subtotal.toFixed(2)}\n`;
    msg += `*GST (5%):* ₹${gst.toFixed(2)}\n`;
    if (serviceCharge > 0) msg += `*Delivery Fee:* ₹${serviceCharge.toFixed(2)}\n`;
    msg += `*TOTAL PAYABLE:* ₹${total.toFixed(2)}\n`;
    msg += `--------------------------------------\n`;
    msg += `_Thank you for ordering with Sadhya Restaurant!_`;

    // Encode URL and trigger window.open (using safe approach, fallback to copy if browser blocks popup)
    const encoded = encodeURIComponent(msg);
    const whatsappUrl = `https://wa.me/919999999999?text=${encoded}`; // Dummy restaurant number
    window.open(whatsappUrl, '_blank');
  };

  const handleReset = () => {
    onClearCart();
    setOrderSuccess(false);
    setTableNumber('');
    setCustomerName('');
    setCustomerPhone('');
    setCustomerAddress('');
    setKitchenInstructions('');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop overlay */}
          <motion.div
            id="cart-backdrop-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 z-50 backdrop-blur-sm"
          />

          {/* Sliding Cart Panel */}
          <motion.div
            id="cart-sliding-drawer"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-lg bg-neutral-950 border-l border-neutral-800 z-50 shadow-2xl flex flex-col justify-between"
          >
            {/* Header */}
            <div className="p-6 border-b border-neutral-800 flex items-center justify-between bg-neutral-900/40">
              <div className="flex items-center space-x-2.5">
                <div className="p-2 rounded-lg bg-amber-500/10 text-amber-500 border border-amber-500/20">
                  <ShoppingBag className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-sans font-bold text-lg text-white">Your Food Basket</h3>
                  <p className="text-xs text-neutral-400 font-mono">
                    {cart.length === 0 ? 'EMPTY' : `${cart.length} UNIQUE DISHES`}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                {cart.length > 0 && (
                  <button
                    id="clear-cart-bin-btn"
                    onClick={onClearCart}
                    className="p-2 text-neutral-500 hover:text-red-500 transition-colors rounded-lg hover:bg-red-500/5 cursor-pointer"
                    title="Clear Cart"
                  >
                    <Trash2 className="h-4.5 w-4.5" />
                  </button>
                )}
                <button
                  id="close-cart-drawer-btn"
                  onClick={onClose}
                  className="p-2 text-neutral-400 hover:text-white transition-colors bg-neutral-900 border border-neutral-800 rounded-xl cursor-pointer"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Scrollable Content Panel */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {orderSuccess ? (
                /* --- Success State Receipt Screen --- */
                <motion.div
                  id="order-success-receipt"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="space-y-6 py-6"
                >
                  <div className="text-center space-y-3">
                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
                      <Check className="h-8 w-8" />
                    </div>
                    <h4 className="text-xl font-bold text-white">Order Placed Successfully!</h4>
                    <p className="text-xs text-neutral-400 max-w-sm mx-auto">
                      Your order has been sent to the Sadhya Restaurant kitchen. You can also send a duplicate copy via WhatsApp.
                    </p>
                  </div>

                  {/* Styled Receipt Card */}
                  <div className="bg-neutral-900/60 border border-neutral-800 rounded-2xl p-5 font-mono text-xs text-neutral-300 space-y-4 shadow-inner relative overflow-hidden">
                    <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 to-amber-600" />
                    
                    <div className="flex justify-between font-bold text-white text-sm">
                      <span>{receiptNumber}</span>
                      <span>{new Date().toLocaleTimeString()}</span>
                    </div>

                    <div className="border-t border-dashed border-neutral-800 my-2" />

                    <div className="space-y-1">
                      <p><span className="text-neutral-500">GUEST:</span> <span className="text-white font-sans">{customerName}</span></p>
                      <p><span className="text-neutral-500">PHONE:</span> {customerPhone}</p>
                      <p><span className="text-neutral-500">SERVICE:</span> <span className="uppercase text-amber-500">{orderType}</span></p>
                      {orderType === 'dine-in' && <p><span className="text-neutral-500">TABLE NO:</span> {tableNumber}</p>}
                      {orderType === 'delivery' && <p><span className="text-neutral-500">DELIVER TO:</span> <span className="text-white font-sans">{customerAddress}</span></p>}
                    </div>

                    <div className="border-t border-dashed border-neutral-800 my-2" />

                    <div className="space-y-2">
                      <span className="text-neutral-500 block font-bold">ITEMS:</span>
                      {cart.map((item) => (
                        <div key={item.menuItem.id} className="flex justify-between">
                          <span className="text-white truncate max-w-[200px] font-sans">{item.menuItem.name}</span>
                          <span>{item.quantity}x ₹{item.menuItem.price}</span>
                        </div>
                      ))}
                    </div>

                    <div className="border-t border-dashed border-neutral-800 my-2" />

                    <div className="space-y-1 text-right">
                      <p><span className="text-neutral-500">Subtotal:</span> ₹{subtotal.toFixed(2)}</p>
                      <p><span className="text-neutral-500">CGST/SGST (5%):</span> ₹{gst.toFixed(2)}</p>
                      {serviceCharge > 0 && <p><span className="text-neutral-500">Delivery:</span> ₹{serviceCharge.toFixed(2)}</p>}
                      <p className="text-sm font-bold text-amber-500 pt-1">
                        <span className="text-neutral-400 font-normal">Total Paid:</span> ₹{total.toFixed(2)}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col gap-3 pt-4">
                    <button
                      id="whatsapp-receipt-share-btn"
                      onClick={handleWhatsAppCheckout}
                      className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all cursor-pointer flex items-center justify-center space-x-2 shadow-lg shadow-emerald-500/10"
                    >
                      <Send className="h-4 w-4 fill-white" />
                      <span>Send to Restaurant WhatsApp</span>
                    </button>
                    <button
                      id="order-reset-btn"
                      onClick={handleReset}
                      className="w-full py-3 bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all cursor-pointer"
                    >
                      Place a New Order
                    </button>
                  </div>
                </motion.div>
              ) : cart.length === 0 ? (
                /* --- Empty State --- */
                <div id="cart-empty-view" className="h-full flex flex-col items-center justify-center text-center space-y-4 py-20">
                  <div className="h-16 w-16 bg-neutral-900 border border-neutral-800 rounded-2xl flex items-center justify-center text-neutral-500">
                    <ShoppingBag className="h-8 w-8" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-base">Your Basket is Empty</h4>
                    <p className="text-xs text-neutral-500 max-w-xs mt-1.5 mx-auto">
                      Browse our high-quality categories and add scrumptious meals, teas, and milkshakes to start your order.
                    </p>
                  </div>
                  <button
                    id="cart-browse-menu-fallback-btn"
                    onClick={onClose}
                    className="px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-neutral-950 text-xs font-bold uppercase tracking-wider rounded-xl transition-all cursor-pointer"
                  >
                    Browse Categories
                  </button>
                </div>
              ) : (
                /* --- Active Cart Screen --- */
                <div id="cart-active-view" className="space-y-6">
                  {/* Cart Items List */}
                  <div className="space-y-3">
                    <span className="text-xs font-mono font-bold text-neutral-400 uppercase tracking-widest block">
                      Selected Dishes
                    </span>
                    <div className="space-y-3">
                      {cart.map((item) => (
                        <div
                          key={item.menuItem.id}
                          id={`cart-item-row-${item.menuItem.id}`}
                          className="flex items-center justify-between p-3.5 bg-neutral-900 border border-neutral-850 rounded-2xl hover:border-neutral-800 transition-colors"
                        >
                          <div className="flex-1 min-w-0 pr-3">
                            <span className="text-[10px] font-mono font-bold text-amber-500 block uppercase mb-0.5">
                              {item.menuItem.categoryLabel}
                            </span>
                            <h4 className="text-sm font-bold text-white truncate">{item.menuItem.name}</h4>
                            <span className="text-xs text-neutral-400 font-mono block mt-1">
                              ₹{item.menuItem.price.toFixed(2)} x {item.quantity}
                            </span>
                          </div>

                          <div className="flex items-center space-x-3">
                            {/* Subtotal for Item */}
                            <span className="text-xs font-bold font-mono text-neutral-300 w-16 text-right pr-2">
                              ₹{(item.menuItem.price * item.quantity).toFixed(0)}
                            </span>

                            {/* Qty Modifier */}
                            <div className="flex items-center bg-neutral-950 border border-neutral-800 rounded-xl overflow-hidden">
                              <button
                                id={`cart-row-decrease-${item.menuItem.id}`}
                                onClick={() => onRemoveFromCart(item.menuItem)}
                                className="px-2 py-1 hover:bg-neutral-800 hover:text-amber-500 text-neutral-400 transition-colors cursor-pointer"
                              >
                                <Minus className="h-3 w-3" />
                              </button>
                              <span className="px-1 text-xs font-bold font-mono text-white w-4 text-center">
                                {item.quantity}
                              </span>
                              <button
                                id={`cart-row-increase-${item.menuItem.id}`}
                                onClick={() => onAddToCart(item.menuItem)}
                                className="px-2 py-1 hover:bg-neutral-800 hover:text-amber-500 text-neutral-400 transition-colors cursor-pointer"
                              >
                                <Plus className="h-3 w-3" />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Order Type Tabs */}
                  <div className="space-y-3 border-t border-neutral-900 pt-5">
                    <span className="text-xs font-mono font-bold text-neutral-400 uppercase tracking-widest block">
                      Order Fulfillment Type
                    </span>
                    <div className="grid grid-cols-3 gap-2">
                      {(['dine-in', 'pickup', 'delivery'] as OrderType[]).map((type) => (
                        <button
                          key={type}
                          id={`order-type-tab-${type}`}
                          onClick={() => setOrderType(type)}
                          className={`py-3 px-1 rounded-2xl text-xs font-bold uppercase tracking-wider border transition-all cursor-pointer text-center ${
                            orderType === type
                              ? 'bg-amber-500 border-amber-600 text-neutral-950 shadow-md shadow-amber-500/10'
                              : 'bg-neutral-900 border-neutral-850 text-neutral-400 hover:text-white hover:bg-neutral-850'
                          }`}
                        >
                          {type === 'dine-in' && 'Dine In'}
                          {type === 'pickup' && 'Pickup'}
                          {type === 'delivery' && 'Delivery'}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Fulfillment Details Fields */}
                  <div className="space-y-4 border-t border-neutral-900 pt-5">
                    <span className="text-xs font-mono font-bold text-neutral-400 uppercase tracking-widest block">
                      Customer Credentials
                    </span>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block">Your Name *</label>
                        <input
                          id="cart-customer-name"
                          type="text"
                          required
                          placeholder="Aman Sharma"
                          value={customerName}
                          onChange={(e) => setCustomerName(e.target.value)}
                          className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block">Phone Number *</label>
                        <input
                          id="cart-customer-phone"
                          type="tel"
                          required
                          placeholder="91xxxxxxxx"
                          value={customerPhone}
                          onChange={(e) => setCustomerPhone(e.target.value)}
                          className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
                        />
                      </div>
                    </div>

                    {/* Dine-in Table field */}
                    {orderType === 'dine-in' && (
                      <div className="p-4 bg-neutral-900/60 border border-neutral-800 rounded-2xl space-y-2">
                        <div className="flex items-center space-x-2 text-amber-500">
                          <Table className="h-4 w-4" />
                          <span className="text-xs font-bold uppercase tracking-wider">Select Table Details</span>
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-[10px] font-bold text-neutral-400 uppercase block">Table Number *</label>
                          <input
                            id="cart-table-number"
                            type="number"
                            required
                            placeholder="e.g. 5, 12, 18"
                            value={tableNumber}
                            onChange={(e) => setTableNumber(e.target.value)}
                            className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
                          />
                        </div>
                      </div>
                    )}

                    {/* Delivery Address field */}
                    {orderType === 'delivery' && (
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block">Delivery Address in Hathras *</label>
                        <textarea
                          id="cart-customer-address"
                          rows={2}
                          required
                          placeholder="House No, Street, Landmark near Chawar Gate..."
                          value={customerAddress}
                          onChange={(e) => setCustomerAddress(e.target.value)}
                          className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500 resize-none"
                        />
                      </div>
                    )}

                    {/* Cooking notes */}
                    <div className="space-y-1.5">
                      <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-wider block">Kitchen Instruction / Note</label>
                      <input
                        id="cart-kitchen-instructions"
                        type="text"
                        placeholder="Make it spicy, send extra paper cups..."
                        value={kitchenInstructions}
                        onChange={(e) => setKitchenInstructions(e.target.value)}
                        className="w-full bg-neutral-900 border border-neutral-800 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Sticky Order Totals & Actions Footer (Only if not orderSuccess and cart has items) */}
            {!orderSuccess && cart.length > 0 && (
              <div className="p-6 border-t border-neutral-800 bg-neutral-950 space-y-4">
                {/* Visual Breakdowns */}
                <div className="space-y-1.5 text-xs font-mono text-neutral-400">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="text-white">₹{subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>CGST + SGST (5%)</span>
                    <span className="text-white">₹{gst.toFixed(2)}</span>
                  </div>
                  {orderType === 'delivery' && (
                    <div className="flex justify-between">
                      <span>Standard Delivery Fee</span>
                      <span className="text-white">₹{serviceCharge.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="border-t border-neutral-900 my-2 pt-2 flex justify-between font-bold text-sm">
                    <span className="text-neutral-300 font-sans">Grand Total</span>
                    <span className="text-amber-500 text-base">₹{total.toFixed(2)}</span>
                  </div>
                </div>

                {/* Submit Actions */}
                <div className="space-y-2">
                  <button
                    id="place-order-submit-btn"
                    disabled={!isFormValid() || isOrdering}
                    onClick={handlePlaceOrder}
                    className="w-full py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider bg-amber-500 text-neutral-950 hover:bg-amber-400 disabled:opacity-50 disabled:pointer-events-none transition-all cursor-pointer flex items-center justify-center space-x-2 shadow-lg shadow-amber-500/10"
                  >
                    {isOrdering ? (
                      <span className="h-4.5 w-4.5 border-2 border-neutral-950 border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <>
                        <span>Place Kitchen Order</span>
                        <ArrowRight className="h-4 w-4" />
                      </>
                    )}
                  </button>

                  {!isFormValid() && (
                    <div className="flex items-center justify-center space-x-1.5 text-[10px] text-red-400/80 font-semibold text-center">
                      <AlertTriangle className="h-3.5 w-3.5" />
                      <span>Please fill credentials: Name, Phone & Type details</span>
                    </div>
                  )}
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
