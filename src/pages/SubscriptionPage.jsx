import React, { useState, useEffect } from 'react';
import {planOptions, mealTypeOptions, deliveryDayOptions} from "../constants"
import { Button } from '../components';
import { subscriptionAPI } from '../services/api';

const SubscriptionPage = () => {
  // state utk form data
  const [formData, setFormData] = useState({
    name: '',
    phoneNumber: '',
    selectedPlan: '',
    mealTypes: [],
    deliveryDays: [],
    allergies: ''
  });

  // state utk validasi dan UI
  const [errors, setErrors] = useState({});
  const [showOrderSummary, setShowOrderSummary] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Check if all required fields are filled
  const isFormValid = () => {
    return formData.name.trim() && 
           formData.phoneNumber.trim() && 
           formData.selectedPlan && 
           formData.mealTypes.length > 0 && 
           formData.deliveryDays.length > 0;
  };

  // useEffect untuk order summary
  useEffect(() => {
    if (isFormValid()) {
      setShowOrderSummary(true);
      // Clear any previous submit errors when form becomes valid
      if (submitStatus === 'error') {
        setSubmitStatus('');
      }
    } else {
      setShowOrderSummary(false);
      // Clear success status when form becomes invalid
      if (submitStatus === 'success') {
        setSubmitStatus('');
      }
    }
  }, [formData, submitStatus]);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // Handle plan selection
  const handlePlanChange = (planId) => {
    setFormData(prev => ({
      ...prev,
      selectedPlan: planId
    }));
    
    if (errors.selectedPlan) {
      setErrors(prev => ({
        ...prev,
        selectedPlan: ''
      }));
    }
  };

  // Handle meal type selection
  const handleMealTypeChange = (mealTypeId) => {
    setFormData(prev => {
      const updatedMealTypes = prev.mealTypes.includes(mealTypeId)
        ? prev.mealTypes.filter(id => id !== mealTypeId)
        : [...prev.mealTypes, mealTypeId];
      
      return {
        ...prev,
        mealTypes: updatedMealTypes
      };
    });

    if (errors.mealTypes) {
      setErrors(prev => ({
        ...prev,
        mealTypes: ''
      }));
    }
  };

  // Handle delivery day selection
  const handleDeliveryDayChange = (dayId) => {
    setFormData(prev => {
      const updatedDeliveryDays = prev.deliveryDays.includes(dayId)
        ? prev.deliveryDays.filter(id => id !== dayId)
        : [...prev.deliveryDays, dayId];
      
      return {
        ...prev,
        deliveryDays: updatedDeliveryDays
      };
    });

    if (errors.deliveryDays) {
      setErrors(prev => ({
        ...prev,
        deliveryDays: ''
      }));
    }
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = 'Phone number is required';
    }

    if (!formData.selectedPlan) {
      newErrors.selectedPlan = 'Please select a plan';
    }

    if (formData.mealTypes.length === 0) {
      newErrors.mealTypes = 'Please select at least one meal type';
    }

    if (formData.deliveryDays.length === 0) {
      newErrors.deliveryDays = 'Please select at least one delivery day';
    }

    return newErrors;
  };

  // Calculate total price
  const calculateTotalPrice = () => {
    if (!isFormValid()) return 0;

    const selectedPlanData = planOptions.find(plan => plan.id === formData.selectedPlan);
    if (!selectedPlanData) return 0;

    const planPrice = selectedPlanData.price;
    const mealTypeCount = formData.mealTypes.length;
    const deliveryDayCount = formData.deliveryDays.length;

    return planPrice * mealTypeCount * deliveryDayCount * 4.3;
  };

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const validationErrors = validateForm();
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setSubmitStatus('error');
      
      // Scroll to first error
      setTimeout(() => {
        const firstErrorElement = document.querySelector('.error-field');
        if (firstErrorElement) {
          firstErrorElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      }, 100);
      
      return;
    }

    // Prepare data for API (jika sudah membuat API service)
    const subscriptionData = {
      ...formData,
      totalPrice: calculateTotalPrice()
    };

    setIsLoading(true);
    setSubmitStatus('');

    try {
      // Uncomment ini ketika API sudah siap
      // const response = await subscriptionAPI.create(subscriptionData);
      // 
      // if (response.success) {
        // Success case
        setErrors({});
        setSubmitStatus('success');
        
        // Scroll to success message
        setTimeout(() => {
          const successElement = document.querySelector('.success-message');
          if (successElement) {
            successElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        }, 100);

        // Reset form after successful submission
        setTimeout(() => {
          setFormData({
            name: '',
            phoneNumber: '',
            selectedPlan: '',
            mealTypes: [],
            deliveryDays: [],
            allergies: ''
          });
          setSubmitStatus('');
        }, 3000);
      // } else {
      //   throw new Error(response.message || 'Failed to create subscription');
      // }
    } catch (error) {
      console.error('Subscription submission error:', error);
      setSubmitStatus('error');
      setErrors({
        submit: error.message || 'Failed to submit subscription. Please try again.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Get selected plan data
  const getSelectedPlanData = () => {
    return planOptions.find(plan => plan.id === formData.selectedPlan);
  };

  // Get selected meal type names
  const getSelectedMealTypeNames = () => {
    return formData.mealTypes.map(id => 
      mealTypeOptions.find(meal => meal.id === id)?.name
    ).join(', ');
  };

  // Get selected delivery day names
  const getSelectedDeliveryDayNames = () => {
    return formData.deliveryDays.map(id => 
      deliveryDayOptions.find(day => day.id === id)?.name
    ).join(', ');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="font-heading text-h1 text-primary mb-4">
            Subscription
          </h1>
        </div>

        {/* Form Container */}
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Section 1: Fill Your Identity */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="font-heading text-h3 text-primary mb-6">
                1. Fill Your Identity
              </h2>
              
              {/* Name Field */}
              <div className="mb-6">
                <label className="block font-paragraph text-paragraph-black mb-2">
                  Name<span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Input Full Name.."
                  disabled={isLoading}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
                    errors.name ? 'border-red-500 error-field' : 'border-gray-300'
                  } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                )}
              </div>

              {/* Phone Number Field */}
              <div className="mb-6">
                <label className="block font-paragraph text-paragraph-black mb-2">
                  Phone Number<span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleInputChange}
                  placeholder="Input Phone Number.."
                  disabled={isLoading}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
                    errors.phoneNumber ? 'border-red-500 error-field' : 'border-gray-300'
                  } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                />
                {errors.phoneNumber && (
                  <p className="text-red-500 text-sm mt-1">{errors.phoneNumber}</p>
                )}
              </div>

              {/* Allergies Field */}
              <div className="mb-6">
                <label className="block font-paragraph text-paragraph-black mb-2">
                  Allergies
                </label>
                <textarea
                  name="allergies"
                  value={formData.allergies}
                  onChange={handleInputChange}
                  placeholder="Text Here.."
                  rows="4"
                  disabled={isLoading}
                  className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none ${
                    isLoading ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                />
              </div>
            </div>

            {/* Section 2: Choose Your Plan */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="font-heading text-h3 text-primary mb-6">
                2. Choose Your Plan
              </h2>

              {/* Plan Selection */}
              <div className="mb-6">
                <label className="block font-paragraph text-paragraph-black mb-2">
                  Plan Selection<span className="text-red-500">*</span>
                </label>
                <div className={`space-y-3 ${errors.selectedPlan ? 'error-field' : ''}`}>
                  {planOptions.map((plan) => (
                    <label key={plan.id} className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="selectedPlan"
                        value={plan.id}
                        checked={formData.selectedPlan === plan.id}
                        onChange={() => handlePlanChange(plan.id)}
                        disabled={isLoading}
                        className="mr-3 text-primary focus:ring-primary"
                      />
                      <div>
                        <span className="text-paragraph-black font-semibold">{plan.name}</span>
                        <p className="text-gray-600 text-sm">{formatCurrency(plan.price)}/serving</p>
                      </div>
                    </label>
                  ))}
                </div>
                {errors.selectedPlan && (
                  <p className="text-red-500 text-sm mt-1">{errors.selectedPlan}</p>
                )}
              </div>

              {/* Meal Type Selection */}
              <div className="mb-6">
                <label className="block font-paragraph text-paragraph-black mb-2">
                  Meal Type<span className="text-red-500">*</span> <span className="text-gray-500 text-sm">(choose at least one)</span>
                </label>
                <div className={`space-y-3 ${errors.mealTypes ? 'error-field' : ''}`}>
                  {mealTypeOptions.map((meal) => (
                    <label key={meal.id} className="flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.mealTypes.includes(meal.id)}
                        onChange={() => handleMealTypeChange(meal.id)}
                        disabled={isLoading}
                        className="mr-3 text-primary focus:ring-primary"
                      />
                      <span className="text-paragraph-black">{meal.name}</span>
                    </label>
                  ))}
                </div>
                {errors.mealTypes && (
                  <p className="text-red-500 text-sm mt-1">{errors.mealTypes}</p>
                )}
              </div>

              {/* Delivery Days Selection */}
              <div className="mb-6">
                <label className="block font-paragraph text-paragraph-black mb-2">
                  Delivery Days<span className="text-red-500">*</span> <span className="text-gray-500 text-sm">(choose at least one)</span>
                </label>
                <div className={`grid grid-cols-2 gap-3 ${errors.deliveryDays ? 'error-field' : ''}`}>
                  {deliveryDayOptions.map((day) => (
                    <label key={day.id} className="flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.deliveryDays.includes(day.id)}
                        onChange={() => handleDeliveryDayChange(day.id)}
                        disabled={isLoading}
                        className="mr-3 text-primary focus:ring-primary"
                      />
                      <span className="text-paragraph-black">{day.name}</span>
                    </label>
                  ))}
                </div>
                {errors.deliveryDays && (
                  <p className="text-red-500 text-sm mt-1">{errors.deliveryDays}</p>
                )}
              </div>
            </div>

            {/* Section 3: Summary */}
            <div className="bg-white rounded-2xl shadow-lg p-8" id="order-summary">
              <h2 className="font-heading text-h3 text-primary mb-6">
                3. Summary
              </h2>

              {/* Order Summary */}
              {showOrderSummary ? (
                <div className="mb-6 animate-fadeIn">
                  <h3 className="font-heading text-h4 text-paragraph-black mb-4">
                    Order Summary
                  </h3>
                  <div className="space-y-2 text-paragraph-black">
                    <div>
                      <span className="font-semibold">Plan Selection:</span> {getSelectedPlanData()?.name}
                    </div>
                    <div>
                      <span className="font-semibold">Meal Type:</span> {getSelectedMealTypeNames()}
                    </div>
                    <div>
                      <span className="font-semibold">Delivery Days:</span> {getSelectedDeliveryDayNames()}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="mb-6">
                  <h3 className="font-heading text-h4 text-gray-400 mb-4">
                    Order Summary
                  </h3>
                  <p className="text-gray-400 text-sm">
                    Complete the form to see your order summary
                  </p>
                </div>
              )}

              {/* Total Price */}
              {showOrderSummary && (
                <div className="mb-6 p-4 bg-primary-50 rounded-lg animate-fadeIn">
                  <div className="flex justify-between items-center">
                    <span className="font-heading text-h4 text-paragraph-black">Total Price:</span>
                    <span className="font-heading text-h3 text-primary">
                      {formatCurrency(calculateTotalPrice())}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">*Per month (estimated)</p>
                </div>
              )}

              {/* Submit Button - PERBAIKAN UTAMA DI SINI */}
              <Button
                label={isLoading ? 'Processing...' : 'Subscribe Now'}
                onClick={handleSubmit}
                fullWidth={true}
                backgroundColor={
                  !isFormValid() || isLoading
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-secondary-yellow hover:bg-yellow-400'
                }
                textColor="text-primary"
                borderColor="border-transparent"
              />

              {/* Status Messages */}
              {submitStatus === 'success' && (
                <div className="mt-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg success-message animate-fadeIn">
                  <div className="flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="font-semibold">Success!</span>
                  </div>
                  <p className="mt-1">Your subscription has been processed successfully!</p>
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg animate-fadeIn">
                  <div className="flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                    <span className="font-semibold">Error!</span>
                  </div>
                  <p className="mt-1">
                    {errors.submit || 'There was an error processing your subscription. Please try again.'}
                  </p>
                </div>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SubscriptionPage;