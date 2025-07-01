import React, { useState } from "react";
import { ratingOptions, testimonialFormMessages, testimonialFormConfig } from "../constants";
import { Button } from "../components";

const initialForm = {
  customerName: "",
  reviewMessage: "",
  rating: "",
};

const initialError = {
  customerName: "",
  reviewMessage: "",
  rating: "",
};

const TestimonialForm = ({ onSubmit, isSubmitting = false }) => {
  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState(initialError);
  const [success, setSuccess] = useState("");

  // Validation
  const validate = () => {
    let valid = true;
    let err = { ...initialError };
    // Name
    if (!form.customerName.trim()) {
      err.customerName = testimonialFormMessages.customerName.required;
      valid = false;
    } else if (form.customerName.length < testimonialFormConfig.customerName.minLength) {
      err.customerName = testimonialFormMessages.customerName.minLength;
      valid = false;
    } else if (form.customerName.length > testimonialFormConfig.customerName.maxLength) {
      err.customerName = testimonialFormMessages.customerName.maxLength;
      valid = false;
    }
    // Message
    if (!form.reviewMessage.trim()) {
      err.reviewMessage = testimonialFormMessages.reviewMessage.required;
      valid = false;
    } else if (form.reviewMessage.length < testimonialFormConfig.reviewMessage.minLength) {
      err.reviewMessage = testimonialFormMessages.reviewMessage.minLength;
      valid = false;
    } else if (form.reviewMessage.length > testimonialFormConfig.reviewMessage.maxLength) {
      err.reviewMessage = testimonialFormMessages.reviewMessage.maxLength;
      valid = false;
    }
    // Rating
    if (!form.rating) {
      err.rating = testimonialFormMessages.rating.required;
      valid = false;
    } else if (
      Number(form.rating) < 1 ||
      Number(form.rating) > 5
    ) {
      err.rating = testimonialFormMessages.rating.invalid;
      valid = false;
    }
    setError(err);
    return valid;
  };

  // Handle input
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError({ ...error, [e.target.name]: "" });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccess("");
    if (!validate()) return;
    if (onSubmit) {
      onSubmit(form);
      setSuccess("Thank you for your review!");
      setForm(initialForm);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-2xl shadow-xl p-8 flex flex-col gap-6 max-w-xl mx-auto"
      autoComplete="off"
      aria-label="Testimonial Form"
    >
      <h2 className="font-heading text-h3 text-primary mb-2">Share Your Experience</h2>
      <div>
        <label className="block font-paragraph mb-1" htmlFor="customerName">
          Name <span className="text-red-500">*</span>
        </label>
        <input
          id="customerName"
          name="customerName"
          type={testimonialFormConfig.customerName.type}
          placeholder={testimonialFormConfig.customerName.placeholder}
          minLength={testimonialFormConfig.customerName.minLength}
          maxLength={testimonialFormConfig.customerName.maxLength}
          className="w-full bg-gray-50 border border-gray-200 rounded-md p-3 font-paragraph focus:outline-primary"
          value={form.customerName}
          onChange={handleChange}
          disabled={isSubmitting}
          required
        />
        {error.customerName && (
          <p className="text-xs text-red-500 mt-1">{error.customerName}</p>
        )}
      </div>
      <div>
        <label className="block font-paragraph mb-1" htmlFor="reviewMessage">
          Your Review <span className="text-red-500">*</span>
        </label>
        <textarea
          id="reviewMessage"
          name="reviewMessage"
          placeholder={testimonialFormConfig.reviewMessage.placeholder}
          rows={testimonialFormConfig.reviewMessage.rows}
          minLength={testimonialFormConfig.reviewMessage.minLength}
          maxLength={testimonialFormConfig.reviewMessage.maxLength}
          className="w-full bg-gray-50 border border-gray-200 rounded-md p-3 font-paragraph focus:outline-primary"
          value={form.reviewMessage}
          onChange={handleChange}
          disabled={isSubmitting}
          required
        />
        {error.reviewMessage && (
          <p className="text-xs text-red-500 mt-1">{error.reviewMessage}</p>
        )}
      </div>
      <div>
        <label className="block font-paragraph mb-1" htmlFor="rating">
          Rating <span className="text-red-500">*</span>
        </label>
        <select
          id="rating"
          name="rating"
          className="w-full bg-gray-50 border border-gray-200 rounded-md p-3 font-paragraph focus:outline-primary"
          value={form.rating}
          onChange={handleChange}
          disabled={isSubmitting}
          required
        >
          <option value="">Select rating</option>
          {ratingOptions.map(opt => (
            <option key={opt.value} value={opt.value}>{opt.stars} ({opt.value})</option>
          ))}
        </select>
        {error.rating && (
          <p className="text-xs text-red-500 mt-1">{error.rating}</p>
        )}
      </div>
      <Button
        label={isSubmitting ? "Submitting..." : "Submit Review"}
        disabled={isSubmitting}
        fullWidth={true}
        type="submit"
      />
      {success && (
        <div className="text-green-600 font-heading text-center mt-2 animate-fadeIn">{success}</div>
      )}
    </form>
  );
};

export default TestimonialForm;