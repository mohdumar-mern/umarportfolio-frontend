import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Mail, Phone, User, MessageSquareText } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";

import Input from "../../components/UI/Input/Input";
import Container from "../../components/UI/Container/Container";
import AvatarCard from "../../components/UI/card/AvatarCard";
import ResumeDownload from "../../components/UI/card/ResumeDownload";
import SocialLinksComponents from "../../components/Sociallinks/SocialLinksComponents";

import {
  sendContactRequest,
  clearContactStatus,
} from "../../features/Contact/contactSlice";

const initialFormState = { name: "", email: "", phone: "", message: "" };

const ContactPage = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState(initialFormState);
  const [formError, setFormError] = useState(null);

  const { error, loading, message } = useSelector((state) => state.contact);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setFormError(null);
  }, []);

  const validateForm = () => {
    if (Object.values(formData).some((v) => !v.trim())) {
      return "Please fill in all fields.";
    }
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = validateForm();
    if (validationError) {
      setFormError(validationError);
      return;
    }

    dispatch(sendContactRequest(formData)).then((res) => {
      if (res.meta.requestStatus === "fulfilled") {
        setFormData(initialFormState);
      }
    });
  };

  useEffect(() => {
    if (message) {
      toast.success(message);
      dispatch(clearContactStatus());
    }
    if (error) {
      toast.error(error);
      dispatch(clearContactStatus());
    }
  }, [message, error, dispatch]);

  useEffect(() => {
    return () => {
      dispatch(clearContactStatus());
    };
  }, [dispatch]);

  return (
    <Container>
      <section className="grid grid-cols-1 lg:grid-cols-2 min-h-[80vh] w-full shadow-2xl rounded-xl overflow-hidden">
        {/* Form Section */}
        <div className="bg-black px-6 lg:px-12 py-12">
          <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-2 justify-center">
            <Phone className="text-orange-500" />
            Contact Us
          </h2>

          <form onSubmit={handleSubmit} className="space-y-5 max-w-md mx-auto">
            {formError && (
              <p className="text-red-500 text-center">{formError}</p>
            )}

            <Input
              label="Full Name"
              name="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
              icon={User}
            />
            <Input
              label="Email Address"
              name="email"
              type="email"
              placeholder="Enter your Email"
              value={formData.email}
              onChange={handleChange}
              icon={Mail}
            />
            <Input
              label="Phone Number"
              name="phone"
              type="tel"
              placeholder="Enter your phone number"
              value={formData.phone}
              onChange={handleChange}
              icon={Phone}
            />

            <div>
              <label className="block text-sm font-semibold text-[#BDC3C7] mb-2">
                Message
              </label>
              <div className="relative">
                <MessageSquareText className="absolute left-3 top-3 text-orange-500 w-5 h-5" />
                <textarea
                  name="message"
                  rows="4"
                  value={formData.message}
                  placeholder="Type your message..."
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2 border text-gray-300 bg-transparent border-orange-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition resize-none"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-orange-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-orange-600 transition disabled:opacity-50"
            >
              {loading ? "Sending..." : "Send Message"}
            </button>
          </form>
        </div>

        {/* Contact Info Section */}
        <div className="hidden md:flex flex-col bg-orange-500 text-white p-10 items-center justify-center gap-6">
          <AvatarCard size="w-20 h-20" />

          <div className="text-center space-y-1">
            <div>
              Phone:{" "}
              <a href="tel:9628787975" className="underline">
                9628787975
              </a>
            </div>
            <div>
              Email:{" "}
              <a href="mailto:uk1941404@gmail.com" className="underline">
                uk1941404@gmail.com
              </a>
            </div>
          </div>

          <SocialLinksComponents />

          <div className="flex gap-4">
            <ResumeDownload />
            <Link
              to="/contact"
              className="border border-black text-black font-medium px-4 py-2 rounded-lg hover:bg-black hover:text-orange-500 transition"
            >
              Contact Me
            </Link>
          </div>
        </div>
      </section>
    </Container>
  );
};

export default ContactPage;
