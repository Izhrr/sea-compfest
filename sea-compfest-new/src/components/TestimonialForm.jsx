import React, { useState } from "react";
import { ratingOptions, testimonialFormMessages, testimonialFormConfig } from "../constants";
import { Button } from ".";

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

  // Handle button click - PERBAIKAN UTAMA
  const handleButtonClick = (e) => {
    e.preventDefault();
    handleSubmit(e);
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
          className={`w-full bg-gray-50 border rounded-md p-3 font-paragraph focus:outline-primary ${
            error.customerName ? 'border-red-500' : 'border-gray-200'
          }`}
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
          className={`w-full bg-gray-50 border rounded-md p-3 font-paragraph focus:outline-primary resize-none ${
            error.reviewMessage ? 'border-red-500' : 'border-gray-200'
          }`}
          value={form.reviewMessage}
          onChange={handleChange}
          disabled={isSubmitting}
          required
        />
        <div className="flex justify-between items-center mt-1">
          {error.reviewMessage && (
            <p className="text-xs text-red-500">{error.reviewMessage}</p>
          )}
          <p className="text-xs text-gray-500 ml-auto">
            {form.reviewMessage.length}/{testimonialFormConfig.reviewMessage.maxLength}
          </p>
        </div>
      </div>
      
      <div>
        <label className="block font-paragraph mb-1" htmlFor="rating">
          Rating <span className="text-red-500">*</span>
        </label>
        <select
          id="rating"
          name="rating"
          className={`w-full bg-gray-50 border rounded-md p-3 font-paragraph focus:outline-primary ${
            error.rating ? 'border-red-500' : 'border-gray-200'
          }`}
          value={form.rating}
          onChange={handleChange}
          disabled={isSubmitting}
          required
        >
          <option value="">{testimonialFormConfig.rating.placeholder}</option>
          {ratingOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.stars} ({option.value} Star{option.value > 1 ? 's' : ''})
            </option>
          ))}
        </select>
        {error.rating && (
          <p className="text-xs text-red-500 mt-1">{error.rating}</p>
        )}
      </div>

      {/* Success Message */}
      {success && (
        <div className="p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg animate-fadeIn">
          <div className="flex items-center">
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <span className="font-semibold">Success!</span>
          </div>
          <p className="mt-1 text-sm">{success}</p>
        </div>
      )}
      <Button
        label={isSubmitting ? "Submitting..." : "Submit Review"}
        onClick={handleButtonClick}
        fullWidth={true}
        backgroundColor={isSubmitting ? "bg-gray-400" : "bg-secondary-yellow"}
        textColor={isSubmitting ? "text-gray-600" : "text-primary"}
        borderColor="border-transparent"
      />
    </form>
  );
};

export default TestimonialForm;