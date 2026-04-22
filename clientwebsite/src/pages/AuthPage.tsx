import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, User, Github, Chrome, ArrowRight, CheckCircle2, AlertCircle, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

const API_URL = '/api';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showOtp, setShowOtp] = useState(false);
  const [otp, setOtp] = useState('');
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isLogin && formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match', {
        icon: <AlertCircle className="text-red-500" />,
      });
      return;
    }

    setLoading(true);

    try {
      if (!showOtp) {
        // Step 1: Send OTP
        const endpoint = isLogin ? '/auth/login' : '/auth/send-otp';
        const payload = isLogin 
          ? { email: formData.email, password: formData.password } 
          : { email: formData.email, type: 'signup' };

        const response = await fetch(`${API_URL}${endpoint}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
          credentials: 'include'
        });

        const data = await response.json();

        if (response.ok) {
          if (isLogin && data.otpRequired) {
            setShowOtp(true);
            toast.success('OTP sent to your email');
          } else if (!isLogin) {
            setShowOtp(true);
            toast.success('OTP sent to your email');
          } else {
            // Already logged in? (Shouldn't happen with the new logic but good to handle)
            toast.success(data.message);
            navigate('/');
          }
        } else {
          toast.error(data.message || 'Error sending OTP');
        }
      } else {
        // Step 2: Verify OTP and Login/Signup
        const endpoint = isLogin ? '/auth/login' : '/auth/signup';
        const payload = isLogin 
          ? { ...formData, otp } 
          : { ...formData, otp };

        const response = await fetch(`${API_URL}${endpoint}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
          credentials: 'include'
        });

        const data = await response.json();

        if (response.ok) {
          toast.success(data.message, {
            icon: <CheckCircle2 className="text-green-500" />,
          });
          navigate('/');
        } else {
          toast.error(data.message || 'Verification failed');
        }
      }
    } catch (error) {
      toast.error('Failed to connect to server');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = `${API_URL}/auth/google`;
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fafafa] p-4 font-outfit">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden flex flex-col md:flex-row shadow-rose-100/50">
        <div className="w-full p-8 md:p-12">
          <div className="text-center mb-10">
            <h1 className="text-4xl font-bold text-gray-900 mb-2 tracking-tight">
              {isLogin ? 'Welcome Back' : 'Create Account'}
            </h1>
            <p className="text-gray-500 text-sm">
              {isLogin ? 'Enter your credentials to access your account' : 'Join our premium community today'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {!isLogin && (
              <div className="space-y-1.5 transition-all duration-300 transform translate-y-0 opacity-100">
                <Label htmlFor="name">Full Name</Label>
                <div className="relative group">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-[#8b231a] transition-colors" />
                  <Input 
                    id="name" 
                    placeholder="John Doe" 
                    className="pl-10 h-12 rounded-xl border-gray-200 focus:ring-2 focus:ring-[#8b231a]/10 focus:border-[#8b231a] transition-all"
                    value={formData.name}
                    onChange={handleChange}
                    required={!isLogin}
                  />
                </div>
              </div>
            )}

            <div className="space-y-1.5">
              <Label htmlFor="email">Email Address</Label>
              <div className="relative group">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-[#8b231a] transition-colors" />
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="name@example.com" 
                  className="pl-10 h-12 rounded-xl border-gray-200 focus:ring-2 focus:ring-[#8b231a]/10 focus:border-[#8b231a] transition-all"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between items-center">
                <Label htmlFor="password">Password</Label>
                {isLogin && (
                  <button type="button" className="text-xs text-[#8b231a] hover:underline font-medium">
                    Forgot password?
                  </button>
                )}
              </div>
              <div className="relative group">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-[#8b231a] transition-colors" />
                <Input 
                  id="password" 
                  type={showPassword ? "text" : "password"} 
                  placeholder="••••••••" 
                  className="pl-10 pr-10 h-12 rounded-xl border-gray-200 focus:ring-2 focus:ring-[#8b231a]/10 focus:border-[#8b231a] transition-all"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none transition-colors"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {!isLogin && (
              <div className="space-y-1.5 transition-all duration-300">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <div className="relative group">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-[#8b231a] transition-colors" />
                  <Input 
                    id="confirmPassword" 
                    type={showPassword ? "text" : "password"} 
                    placeholder="••••••••" 
                    className="pl-10 h-12 rounded-xl border-gray-200 focus:ring-2 focus:ring-[#8b231a]/10 focus:border-[#8b231a] transition-all"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required={!isLogin}
                  />
                </div>
              </div>
            )}

            {showOtp && (
              <div className="space-y-1.5 animate-in fade-in slide-in-from-top-2 duration-300">
                <Label htmlFor="otp">Verification Code (OTP)</Label>
                <div className="relative group">
                  <CheckCircle2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 group-focus-within:text-[#8b231a] transition-colors" />
                  <Input 
                    id="otp" 
                    placeholder="123456" 
                    className="pl-10 h-12 rounded-xl border-gray-200 focus:ring-2 focus:ring-[#8b231a]/10 focus:border-[#8b231a] transition-all text-center tracking-[0.5em] font-bold text-lg"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    maxLength={6}
                    required
                  />
                </div>
                <p className="text-[10px] text-gray-400 text-center">
                  Please enter the 6-digit code sent to your email.
                </p>
              </div>
            )}

            <Button 
                type="submit" 
                className="w-full h-12 rounded-xl bg-[#8b231a] hover:bg-[#6e1c14] text-white font-semibold transition-all flex items-center justify-center gap-2 group shadow-lg shadow-rose-900/20"
                disabled={loading}
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  {showOtp ? 'Verify & Continue' : (isLogin ? 'Sign In' : 'Get Started')}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </Button>
          </form>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-100"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-gray-400 font-medium">Or continue with</span>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3">
            <Button 
                variant="outline" 
                type="button" 
                className="h-12 rounded-xl border-gray-200 hover:bg-gray-50 flex items-center justify-center gap-3 transition-all"
                onClick={handleGoogleLogin}
            >
              <Chrome className="w-5 h-5 text-blue-500" />
              <span className="font-medium text-gray-700">Google Account</span>
            </Button>
          </div>

          <div className="mt-8 text-center">
            <p className="text-gray-500 text-sm">
              {isLogin ? "Don't have an account?" : "Already have an account?"}{' '}
              <button 
                onClick={() => {
                  setIsLogin(!isLogin);
                  setShowOtp(false);
                  setOtp('');
                }}
                className="text-[#8b231a] font-bold hover:underline transition-all"
              >
                {isLogin ? 'Register Now' : 'Log In'}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
