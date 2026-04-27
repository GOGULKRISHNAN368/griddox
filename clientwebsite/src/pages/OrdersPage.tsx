import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Package, MapPin, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import Header from '@/components/Header';
import BottomNav from '@/components/BottomNav';

interface OrderItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
  size: string;
}

interface Order {
  _id: string;
  items: OrderItem[];
  totalAmount: number;
  status: string;
  createdAt: string;
  address: {
    name: string;
    phone: string;
    addressLine: string;
    pincode: string;
  };
}

const OrdersPage = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        // Get user email
        const userRes = await fetch('/api/dashboard', { credentials: 'include' });
        if (!userRes.ok) {
          toast.error("Please login to view your orders");
          navigate('/cart');
          return;
        }
        const userData = await userRes.json();
        const email = userData.user.email;

        // Fetch orders using email
        const response = await fetch(`/api/orders/${email}`, { credentials: 'include' });
        if (response.ok) {
          const data = await response.json();
          setOrders(data);
        } else {
          setError(true);
        }
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <Loader2 className="animate-spin" size={32} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <Header />
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6 font-serif flex items-center gap-2">
          <Package /> My Orders
        </h1>

        {error ? (
          <div className="bg-red-50 text-red-600 p-4 rounded-md">
            Failed to load orders. Please try refreshing the page.
          </div>
        ) : orders.length === 0 ? (
          <div className="bg-white p-12 text-center border border-border flex flex-col items-center">
            <Package size={48} className="text-muted-foreground mb-4" />
            <p className="text-lg text-muted-foreground mb-6">You haven't placed any orders yet.</p>
            <button 
              onClick={() => navigate('/#categories')}
              className="px-6 py-2 bg-black text-white text-sm font-medium tracking-wider hover:bg-gray-800 transition-colors"
            >
              START SHOPPING
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div key={order._id} className="bg-white border border-border overflow-hidden">
                <div className="bg-gray-100 px-6 py-4 border-b border-border flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-sm">
                  <div className="flex gap-6">
                    <div>
                      <p className="text-muted-foreground">ORDER PLACED</p>
                      <p className="font-medium">{new Date(order.createdAt).toLocaleDateString('en-IN', {
                        year: 'numeric', month: 'long', day: 'numeric'
                      })}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">TOTAL</p>
                      <p className="font-medium">₹{order.totalAmount.toLocaleString()}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-muted-foreground sm:text-right">ORDER # {order._id.substring(0, 8).toUpperCase()}</p>
                    <p className="font-medium sm:text-right text-primary">{order.status}</p>
                  </div>
                </div>
                
                <div className="p-6">
                  {order.items.map((item, index) => (
                    <div key={index} className="flex gap-4 mb-4 pb-4 border-b border-border last:mb-0 last:pb-0 last:border-0">
                      <img src={item.image} alt={item.name} className="w-20 h-28 object-cover bg-muted" />
                      <div className="flex-1">
                        <h3 className="font-medium">{item.name}</h3>
                        <p className="text-sm text-muted-foreground mt-1">Size: {item.size}</p>
                        <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                        <p className="font-medium mt-2">₹{item.price.toLocaleString()}</p>
                      </div>
                    </div>
                  ))}

                  {order.address && (
                    <div className="mt-4 pt-4 border-t border-gray-100 flex gap-2 text-sm text-muted-foreground">
                      <MapPin size={16} className="shrink-0 mt-0.5" />
                      <div>
                        <span className="font-medium text-black">Delivered to: </span>
                        {order.address.name}, {order.address.addressLine}, {order.address.pincode}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <BottomNav />
    </div>
  );
};

export default OrdersPage;
