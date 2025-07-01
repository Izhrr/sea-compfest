"use client";
import React, { useState } from "react";
import { Button } from "../../components";
import { contactAPI } from "../../services/api";

const ContactPage = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [isSent, setIsSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => {
    setForm(f => ({
      ...f,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg("");
    try {
      const response = await contactAPI.create(form);
      if (response.success) {
        setIsSent(true);
        setForm({ name: "", email: "", message: "" });
        setTimeout(() => setIsSent(false), 2500);
      } else {
        setErrorMsg(response.message || "Failed to send message.");
      }
    } catch (err) {
      setErrorMsg(err.message || "Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="flex flex-col items-center justify-center min-h-[70vh] bg-[#FAFAFA] py-20 px-4">
      <div className="w-full max-w-xl mx-auto">
        <h1 className="text-center font-heading text-h1 text-primary mb-2">
          Contact Us
        </h1>
        <p className="text-center font-paragraph text-p2 text-paragraph-black mb-10">
          Ready to revolutionize your healthy eating? We're here to help!
        </p>
        <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
          <div>
            <label className="font-subheading text-h5 text-paragraph-black font-bold" htmlFor="name">
              Name<span className="text-[#FF2626]">*</span>
            </label>
            <input
              id="name"
              name="name"
              required
              type="text"
              placeholder="Input Full Name.."
              className="w-full rounded-md border border-[#393939] px-4 py-2 mt-1 text-p3 font-paragraph outline-none focus:border-primary transition"
              value={form.name}
              onChange={handleChange}
              disabled={isLoading}
            />
          </div>
          <div>
            <label className="font-subheading text-h5 text-paragraph-black font-bold" htmlFor="email">
              Email Address<span className="text-[#FF2626]">*</span>
            </label>
            <input
              id="email"
              name="email"
              required
              type="email"
              placeholder="Input Email Address.."
              className="w-full rounded-md border border-[#393939] px-4 py-2 mt-1 text-p3 font-paragraph outline-none focus:border-primary transition"
              value={form.email}
              onChange={handleChange}
              disabled={isLoading}
            />
          </div>
          <div>
            <label className="font-subheading text-h5 text-paragraph-black font-bold" htmlFor="message">
              Your Message<span className="text-[#FF2626]">*</span>
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={6}
              placeholder="Enter your question or message.."
              className="w-full rounded-md border border-[#393939] px-4 py-2 mt-1 text-p3 font-paragraph outline-none focus:border-primary transition resize-none"
              value={form.message}
              onChange={handleChange}
              disabled={isLoading}
            />
          </div>
          <Button
            type="submit"
            label={isLoading ? "Sending..." : "Submit"}
            backgroundColor="bg-secondary-yellow"
            textColor="text-primary"
            borderColor="border-transparent"
            fullWidth
            className="py-3 text-h5 font-heading shadow hover:bg-[#e1f300] transition"
            disabled={isLoading}
          />
          {errorMsg && <div className="text-red-500 text-center">{errorMsg}</div>}
        </form>
      </div>

      {/* POP-UP NOTIFICATION */}
      {isSent && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center pointer-events-none">
          <div
            className="bg-green-500 text-white font-paragraph text-p2 shadow-xl rounded-xl px-8 py-6 animate-fadeInUp"
            style={{
              minWidth: "260px",
              textAlign: "center",
              opacity: 0.96,
            }}
          >
            Pesan terkirim!
          </div>
          <style jsx global>{`
            @keyframes fadeInUp {
              0% {
                opacity: 0;
                transform: translateY(40px) scale(0.95);
              }
              80% {
                opacity: 1;
                transform: translateY(-4px) scale(1.03);
              }
              100% {
                opacity: 0.96;
                transform: translateY(0) scale(1);
              }
            }
            .animate-fadeInUp {
              animation: fadeInUp 0.5s cubic-bezier(0.38, 0.6, 0.62, 1.2);
            }
          `}</style>
        </div>
      )}
    </section>
  );
};

export default ContactPage;