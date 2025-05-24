import React, { useState, useEffect } from "react";
import { Mail, LogIn, Lock } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

import Container from "../../components/UI/Container/Container";
import Input from "../../components/UI/Input/Input";
// import { loginAdmin, clearAuthError } from "../../features/Auth/authSlice";
import {loginAdmin, clearAuthError} from "../../features/Auth/authSlice"

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { token, loading, error } = useSelector((state) => state.auth);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginAdmin(formData));
  };

  useEffect(() => {
    if (token) {
      toast.success("Login successful!");
      navigate("/dashboard");
    }
  }, [token, navigate]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      // Clear error after showing toast to prevent repeat
      dispatch(clearAuthError());
    }
  }, [error, dispatch]);

  return (
    <Container>
      <section className="min-h-[80vh] w-full max-w-xl shadow-2xl flex items-center justify-center rounded-xl overflow-hidden">
        <div className="bg-black rounded-2xl shadow-xl w-full">
          <div className="p-8 md:p-10">
            <h2 className="text-3xl font-bold text-white mb-6 text-center flex items-center justify-center gap-2">
              <LogIn className="text-orange-500" />
              Login
            </h2>
            <form onSubmit={handleSubmit} className="space-y-5">
              <Input
                label="Email Address"
                name="email"
                type="email"
                placeholder="lorem@gmail.com"
                value={formData.email}
                onChange={handleChange}
                icon={Mail}
              />
              <Input
                label="Password"
                name="password"
                type="password"
                placeholder="*********"
                value={formData.password}
                onChange={handleChange}
                icon={Lock}
              />

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-orange-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-orange-600 transition disabled:opacity-50"
              >
                <span className="flex items-center justify-center gap-2">
                  <LogIn />
                  {loading ? "Logging in..." : "Login"}
                </span>
              </button>
            </form>
          </div>
        </div>
      </section>
    </Container>
  );
};

export default LoginPage;
