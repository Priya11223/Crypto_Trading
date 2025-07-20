"use client"

import type React from "react"
import axios from 'axios'
import { useState } from "react"
import { Bitcoin, Mail, Lock, User, Eye, EyeOff } from "lucide-react"
import { useAuth } from '@/app/context/AuthContext';
import { useRouter } from "next/navigation"
import { format } from "path"


export default function CryptoAuthPage() {
  const {setUser} = useAuth();
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true)
  const [userExist, setUserExist] = useState(false);
  const [showPassword, setShowPassword] = useState(false)
  const [invalidCred, setInvalidCred] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    message: "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const LogIn = async () => {
    try{
      const res = await axios.post('http://localhost:8080/auth/user/login', formData);
      if(res.data.message == "Success"){
        console.log("yeah");
        setUser({
          name: formData.name,
          email: formData.email,
          subId: res.data.subId ?? null,
          pic: res.data.pic ?? null,
          jwt: res.data.jwt,
        })
        localStorage.setItem('bnda', JSON.stringify(res.data));

        
      }
      router.push('/dashboard');
    }
    catch(err){
      setInvalidCred(true);
      setFormData({
        name: "",
        email: "",
        password: "",
        message: "",
      });
      console.log(err);
    }
  }

  const signUp = async () => {
    try {
      const res = await axios.post('http://localhost:8080/auth/user/signIn', formData);
  
      console.log(res.data);

      if(res.data.status == "user"){
        setIsLogin(true);
        setUserExist(true);
        setFormData({
          name: "",
          email: "",
          password: "",
          message: "",
        });
      }
      else{
        setUser({
          name: formData.name,
          email: formData.email,
          subId: res.data.subId ?? null,
          pic: res.data.pic ?? null,
          jwt: res.data.jwt,
        });
  
        localStorage.setItem('bnda', JSON.stringify(res.data));
    
        router.push('/dashboard');
      }
    } catch (err) {
      setFormData({
        name: "",
        email: "",
        password: "",
        message: "",
      });
      console.error(err);
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setUserExist(false);
    setInvalidCred(false);
    if(isLogin == false)
      signUp();
    else
      LogIn();
  }
  

  const handleGoogleLogin = () => {
    const clientId = '935505833036-bj7sl40j8652cbh1thmfg6lvjfuqrpdq.apps.googleusercontent.com';
    const redirectUri = 'http://localhost:3000/oauth/callback'; // your frontend route to handle callback
    const state = 'randomState'; // generate dynamically for CSRF protection

    const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=openid%20email%20profile&state=${state}&access_type=offline&prompt=consent`.replace(/\s+/g, '');;

    window.location.href = authUrl;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Large Bitcoin Background */}
      <div className="absolute -right-32 top-1/2 -translate-y-1/2 opacity-10">
        <Bitcoin className="w-96 h-96 text-yellow-500" />
      </div>

      {/* Floating Bitcoin Icons */}
      <div className="absolute top-20 left-20 opacity-20">
        <Bitcoin className="w-8 h-8 text-yellow-400 animate-pulse" />
      </div>
      <div className="absolute bottom-32 left-32 opacity-20">
        <Bitcoin className="w-6 h-6 text-yellow-400 animate-pulse" style={{ animationDelay: "1s" }} />
      </div>
      <div className="absolute top-40 right-20 opacity-20">
        <Bitcoin className="w-10 h-10 text-yellow-400 animate-pulse" style={{ animationDelay: "2s" }} />
      </div>

      {/* Main Auth Container */}
      <div className="w-full max-w-md relative z-10">
        <div className="bg-slate-800/80 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-8 shadow-2xl">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
            <img src="/favicon.png" alt="TradeKaro Logo" className="w-8 h-8 mr-3" />
              <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-500 bg-clip-text text-transparent">
                TradeKaro
              </h1>
            </div>
            <p className="text-slate-400">
              {isLogin ? "Welcome back to your crypto journey" : "Start your crypto journey today"}
            </p>
          </div>

          {/* Toggle Buttons */}
          <div className="flex bg-slate-700/50 rounded-lg p-1 mb-6">
            <button
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
                isLogin ? "bg-yellow-500 text-slate-900 shadow-lg" : "text-slate-300 hover:text-white"
              }`}
            >
              Login
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
                !isLogin ? "bg-yellow-500 text-slate-900 shadow-lg" : "text-slate-300 hover:text-white"
              }`}
            >
              Sign Up
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div className="space-y-2">
                <label htmlFor="name" className="block text-sm font-medium text-slate-200">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder:text-slate-400 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20 focus:outline-none transition-all"
                    required={!isLogin}
                  />
                </div>
              </div>
            )}

            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium text-slate-200">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder:text-slate-400 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20 focus:outline-none transition-all"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-medium text-slate-200">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-10 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder:text-slate-400 focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20 focus:outline-none transition-all"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {isLogin && (
              <div className="text-right">
                <button type="button" className="text-sm text-yellow-400 hover:text-yellow-300 transition-colors">
                  Forgot password?
                </button>
              </div>
            )}

            {userExist && (
              <div className="text-center text-sm text-red-600">
                User Already exist! please Login
              </div>
            )}

            {invalidCred && (
              <div className="text-center text-sm text-red-600">
              Invalid Email or Password
            </div>
            )}

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-slate-900 font-semibold py-3 px-4 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98]"
            >
              {isLogin ? "Sign In" : "Create Account"}
            </button>
          </form>

          <div className="my-6 flex items-center">
            <div className="flex-1 h-px bg-slate-600"></div>
            <span className="px-4 text-xs text-slate-400 uppercase tracking-wider">or</span>
            <div className="flex-1 h-px bg-slate-600"></div>
          </div>

          {/* Google Login */}
          <button
            type="button"
            onClick={handleGoogleLogin}
            className="w-full bg-slate-700/50 border border-slate-600 text-white hover:bg-slate-600/50 hover:border-slate-500 py-3 px-4 rounded-lg transition-all duration-200 flex items-center justify-center"
          >
            <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="currentColor"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="currentColor"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="currentColor"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Continue with Google
          </button>

          {/* Footer */}
          <div className="mt-6 text-center text-sm text-slate-400">
            {isLogin ? (
              <>
                {"Don't have an account? "}
                <button
                  type="button"
                  onClick={() => setIsLogin(false)}
                  className="text-yellow-400 hover:text-yellow-300 font-medium transition-colors"
                >
                  Sign up
                </button>
              </>
            ) : (
              <>
                {"Already have an account? "}
                <button
                  type="button"
                  onClick={() => setIsLogin(true)}
                  className="text-yellow-400 hover:text-yellow-300 font-medium transition-colors"
                >
                  Sign in
                </button>
              </>
            )}
          </div>
        </div>

        {/* Security Badge */}
        <div className="mt-6 text-center">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-slate-800/50 border border-slate-700/50 text-xs text-slate-400">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
            Secured with 256-bit encryption
          </div>
        </div>
      </div>
    </div>
  );
}