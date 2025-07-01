"use client";
import React, { useState } from "react";
import { register } from "../services/auth";
import Button from "./Button";

export default function RegisterForm() {
  const [form, setForm] = useState({ fullName: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);
    try {
      await register(form);
      setSuccess(true);
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      {/* Full Name */}
      <div>
        <label className="block font-heading text-h6 mb-2 text-paragraph-black">
          Name<span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="fullName"
          value={form.fullName}
          onChange={handleChange}
          placeholder="Input Full Name.."
          required
          className="w-full px-4 py-3 border border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-[#fafafa] text-paragraph-black"
        />
      </div>
      {/* Email */}
      <div>
        <label className="block font-heading text-h6 mb-2 text-paragraph-black">
          Email Address<span className="text-red-500">*</span>
        </label>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Input Email Address.."
          required
          className="w-full px-4 py-3 border border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-[#fafafa] text-paragraph-black"
        />
      </div>
      {/* Password */}
      <div>
        <label className="block font-heading text-h6 mb-2 text-paragraph-black">
          Password<span className="text-red-500">*</span>
        </label>
        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          placeholder="Input Password.."
          required
          className="w-full px-4 py-3 border border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-[#fafafa] text-paragraph-black"
        />
      </div>
      {/* Error / Success */}
      {error && <div className="text-red-500 text-sm">{error}</div>}
      {success && (
        <div className="text-green-600 text-sm mb-2">
          Registration successful! Please login.
        </div>
      )}
      {/* Button */}
      <Button
        label="Register"
        type="submit"
        fullWidth
      />
    </form>
  );
}