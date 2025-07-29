"use client"

import "@/styles/global.css"

import React, { useState } from 'react';
import { Eye, EyeOff, Mail, Lock, ArrowRight, Shield } from 'lucide-react';
import Input from "@/components/Input/Input"

export default function Home() {

    const [formData, setFormData] = useState({
        email: '',
        password: '',
        rememberMe: false,
    });
    const [errors, setErrors] = useState([]);

    const [isLoading, setIsLoading] = useState(false);

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validatePassword = (password) => {
        return password.length >= 8;
    };

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        const inputValue = type === 'checkbox' ? checked : value;

        setFormData(prev => ({
            ...prev,
            [name]: inputValue,
        }));

        // Clear errors when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: undefined,
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newErrors = {};

        if (!formData.email) {
            newErrors.email = 'Email is required';
        } else if (!validateEmail(formData.email)) {
            newErrors.email = 'Please enter a valid email address';
        }

        if (!formData.password) {
            newErrors.password = 'Password is required';
        } else if (!validatePassword(formData.password)) {
            newErrors.password = 'Password must be at least 8 characters long';
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setIsLoading(true);

        // Simulate API call
        try {
            await new Promise(resolve => setTimeout(resolve, 2000));
            console.log('Login successful:', formData);
            // Handle successful login here
        } catch (error) {
            console.error('Login failed:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="login-container">
            <div className="background-pattern"></div>

            <div className="login-wrapper">
                {/* Main Card */}
                <div className="login-card">
                    {/* Header */}
                    <div className="login-header">
                        <div className="header-pattern"></div>
                        <div className="header-content">
                            <div className="header-icon">
                                <Shield size={32} color="white" />
                            </div>
                            <h1 className="header-title">Welcome Back</h1>
                            <p className="header-subtitle">Sign in to your account to continue</p>
                        </div>
                    </div>

                    {/* Form */}
                    <div className="login-form">
                        <form onSubmit={handleSubmit}>

                            {/* ================================ Email Field ================================ */}
                            <Input
                                value={formData.email}
                                errors={errors}
                                setValue={handleInputChange}
                                isPassword={false}
                            />
                            {/* ================================ Email Field ================================ */}

                            {/* ================================ Email Field ================================ */}
                            <Input
                                value={formData.password}
                                errors={errors}
                                setValue={handleInputChange}
                                isPassword={true}
                            />
                            {/* ================================ Email Field ================================ */}

                            {/* Remember Me & Forgot Password */}
                            <div className="form-row">
                                <label className="checkbox-wrapper">
                                    <input
                                        type="checkbox"
                                        name="rememberMe"
                                        checked={formData.rememberMe}
                                        onChange={handleInputChange}
                                        className="form-checkbox"
                                    />
                                    <span className="checkbox-label">
                    Remember me
                  </span>
                                </label>
                                <a href="#" className="forgot-link">
                                    Forgot password?
                                </a>
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="submit-button"
                            >
                                {isLoading ? (
                                    <div className="loading-spinner"></div>
                                ) : (
                                    <div className="button-content">
                                        <span>Sign In</span>
                                        <ArrowRight className="button-icon" />
                                    </div>
                                )}
                            </button>
                        </form>

                        {/* Footer */}
                        <div className="form-footer">
                            <p className="footer-text">
                                Don't have an account?{' '}
                                <a href="#" className="signup-link">
                                    Sign up here
                                </a>
                            </p>
                        </div>
                    </div>
                </div>

                {/* Security Badge */}
                <div className="security-badge">
                    <div className="badge-content">
                        <Shield className="badge-icon" />
                        <span className="badge-text">Secured with enterprise-grade encryption</span>
                    </div>
                </div>
            </div>
        </div>
    );
}