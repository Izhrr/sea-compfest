"use client";
import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import Button from "./Button";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const { handleLogin } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const router = useRouter();

  const onChange = (e) => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await handleLogin(form.email, form.password);
      setError("");
      router.push("/"); // Redirect after login
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-6">
      {/* Email */}
      <div>
        <label className="block font-heading text-h6 mb-2 text-paragraph-black">
          Email Address<span className="text-red-500">*</span>
        </label>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={onChange}
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
          onChange={onChange}
          placeholder="Input Password.."
          required
          className="w-full px-4 py-3 border border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-primary bg-[#fafafa] text-paragraph-black"
        />
      </div>
      {error && <div className="text-red-500 text-sm">{error}</div>}
      <Button
        label="Login"
        type="submit"
        fullWidth
      />
    </form>
  );
}