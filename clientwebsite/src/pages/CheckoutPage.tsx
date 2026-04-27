import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingBag, ArrowLeft, CheckCircle, MapPin, CreditCard } from 'lucide-react';
import Header from '@/components/Header';
import BottomNav from '@/components/BottomNav';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  size: string;
}

const CheckoutPage = () => {
  const navigate = useNavigate();
  
  const [isOrderComplete, setIsOrderComplete] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [subtotal, setSubtotal] = useState(0);
  
  const [authLoading, setAuthLoading] = useState(true);
  const [user, setUser] = useState<any>(null);

  const [address, setAddress] = useState({
    name: '',
    phone: '',
    addressLine: '',
    pincode: ''
  });

  const [isPlacingOrder, setIsPlacingOrder] = useState(false);

  useEffect(() => {
    // 1. Check Auth Status
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/dashboard', { credentials: 'include' });
        if (response.ok) {
          const data = await response.json();
          setUser(data.user);
        } else {
          navigate('/cart');
        }
      } catch (error) {
        navigate('/cart');
      } finally {
        setAuthLoading(false);
      }
    };

    // 2. Load Cart
    const savedCart = localStorage.getItem('gridox_cart');
    if (savedCart) {
      const items = JSON.parse(savedCart);
      setCartItems(items);
      setSubtotal(items.reduce((sum: number, i: CartItem) => sum + i.price * i.quantity, 0));
    }

    checkAuth();
  }, [navigate]);

  const placeOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsPlacingOrder(true);
    try {
      const orderData = {
        userEmail: user.email,
        items: cartItems.map(item => ({
          productId: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          image: item.image,
          size: item.size
        })),
        address: address,
        paymentMethod: "COD",
        totalAmount: subtotal
      };

      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData),
        credentials: 'include'
      });

      if (response.ok) {
        setIsOrderComplete(true);
        localStorage.removeItem('gridox_cart');
        window.dispatchEvent(new Event('cartUpdated'));
      } else {
        alert("Failed to place order. Please try again.");
      }
    } catch (error) {
      console.error("Order error:", error);
      alert("An error occurred. Please try again.");
    } finally {
      setIsPlacingOrder(false);
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  // If no items in cart and not on success page
  if (cartItems.length === 0 && !isOrderComplete) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Header />
        <div className="flex-1 flex flex-col items-center justify-center p-4">
          <ShoppingBag size={48} className="text-muted-foreground mb-4" />
          <h2 className="text-xl font-medium mb-4">Your cart is empty</h2>
          <button onClick={() => navigate('/')} className="px-6 py-2 bg-black text-white text-sm tracking-wider">
            CONTINUE SHOPPING
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <Header />
      
      {!isOrderComplete && (
        <div className="bg-white border-b border-border sticky top-0 z-10 hidden md:block">
          <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between text-sm">
            <button onClick={() => navigate('/cart')} className="flex items-center text-muted-foreground hover:text-black">
              <ArrowLeft size={16} className="mr-2" /> Back to Cart
            </button>
            <div className="font-medium">Secure Checkout</div>
            <div className="w-24"></div>
          </div>
        </div>
      )}

      <div className="max-w-4xl mx-auto px-4 py-8">
        {isOrderComplete ? (
          // SUCCESS PAGE
          <div className="bg-white p-8 md:p-12 text-center border border-border mt-8 flex flex-col items-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
              <CheckCircle size={32} className="text-green-600" />
            </div>
            <h1 className="text-3xl font-serif mb-2">Order Confirmed!</h1>
            <p className="text-muted-foreground mb-8 max-w-md mx-auto">
              Thank you for shopping with Gridox. Your order has been placed successfully and will be delivered soon.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <button 
                onClick={() => navigate('/my-orders')}
                className="px-8 py-3 bg-black text-white text-sm font-medium tracking-wider w-full sm:w-auto hover:bg-gray-800 transition-colors"
              >
                VIEW MY ORDERS
              </button>
              <button 
                onClick={() => navigate('/#categories')}
                className="px-8 py-3 border border-border text-black text-sm font-medium tracking-wider w-full sm:w-auto hover:bg-gray-50 transition-colors"
              >
                CONTINUE SHOPPING
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-8">
            {/* MAIN CONTENT AREA */}
            <div className="flex-1">
              <div className="bg-white p-6 border border-border mb-8">
                <h2 className="text-xl font-medium mb-6 flex items-center">
                  <MapPin className="mr-2" size={20} /> Shipping Address
                </h2>
                <form id="checkout-form" onSubmit={placeOrder} className="space-y-4">
                  <div>
                    <label className="block text-sm text-muted-foreground mb-1">Full Name *</label>
                    <input 
                      required 
                      type="text" 
                      value={address.name}
                      onChange={e => setAddress({...address, name: e.target.value})}
                      className="w-full border border-border p-3 focus:outline-none focus:border-black"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-muted-foreground mb-1">Mobile Number *</label>
                    <input 
                      required 
                      type="tel" 
                      pattern="[0-9]{10}"
                      title="10 digit mobile number"
                      value={address.phone}
                      onChange={e => setAddress({...address, phone: e.target.value})}
                      className="w-full border border-border p-3 focus:outline-none focus:border-black"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-muted-foreground mb-1">Address Line *</label>
                    <textarea 
                      required 
                      rows={3}
                      value={address.addressLine}
                      onChange={e => setAddress({...address, addressLine: e.target.value})}
                      className="w-full border border-border p-3 focus:outline-none focus:border-black"
                    ></textarea>
                  </div>
                  <div>
                    <label className="block text-sm text-muted-foreground mb-1">Pincode *</label>
                    <input 
                      required 
                      type="text" 
                      pattern="[0-9]{6}"
                      title="6 digit pincode"
                      value={address.pincode}
                      onChange={e => setAddress({...address, pincode: e.target.value})}
                      className="w-full border border-border p-3 focus:outline-none focus:border-black"
                    />
                  </div>
                </form>
              </div>

              <div className="bg-white p-6 border border-border">
                <h2 className="text-xl font-medium mb-6 flex items-center">
                  <CreditCard className="mr-2" size={20} /> Payment Method
                </h2>
                
                <div className="border border-black p-4 bg-gray-50 flex items-center justify-between mb-8">
                  <div className="flex items-center">
                    <div className="w-4 h-4 rounded-full bg-black mr-3 flex items-center justify-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
                    </div>
                    <span className="font-medium">Cash on Delivery (COD)</span>
                  </div>
                  <span className="text-sm text-muted-foreground">Pay when you receive</span>
                </div>

                <div className="border-t border-border pt-6">
                  <button 
                    type="submit"
                    form="checkout-form"
                    disabled={isPlacingOrder}
                    className="w-full py-4 bg-black text-white font-medium tracking-wider hover:bg-gray-800 transition-colors disabled:opacity-50"
                  >
                    {isPlacingOrder ? 'PLACING ORDER...' : `PLACE ORDER • ₹${subtotal.toLocaleString()}`}
                  </button>
                </div>
              </div>
            </div>

            {/* ORDER SUMMARY SIDEBAR */}
            <div className="lg:w-80">
              <div className="bg-white p-6 border border-border sticky top-24">
                <h3 className="font-medium text-lg mb-4">Order Summary</h3>
                
                <div className="space-y-4 mb-6 max-h-[40vh] overflow-y-auto pr-2">
                  {cartItems.map(item => (
                    <div key={item.id} className="flex gap-4">
                      <img src={item.image} alt={item.name} className="w-16 h-20 object-cover bg-muted" />
                      <div className="flex-1 text-sm">
                        <p className="font-medium line-clamp-1">{item.name}</p>
                        <p className="text-muted-foreground mt-0.5">Size: {item.size} • Qty: {item.quantity}</p>
                        <p className="font-medium mt-1">₹{(item.price * item.quantity).toLocaleString()}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t border-border pt-4 space-y-3 text-sm">
                  <div className="flex justify-between text-muted-foreground">
                    <span>Subtotal ({cartItems.length} items)</span>
                    <span>₹{subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Shipping</span>
                    <span className="text-green-600">FREE</span>
                  </div>
                  <div className="border-t border-border pt-3 flex justify-between font-bold text-base">
                    <span>Total</span>
                    <span>₹{subtotal.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>
            
          </div>
        )}
      </div>
      <BottomNav />
    </div>
  );
};

export default CheckoutPage;
