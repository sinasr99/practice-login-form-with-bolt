import React, {useState} from "react";
import { Eye, EyeOff, Mail, Lock} from 'lucide-react';

// -+-+-+-+-+-+-+-+-+-+ Style -+-+-+-+-+-+-+-+-+-+
import styles from "./Input.module.css"

export default ({value, setValue, isPassword, errors}) => {
    const [focusedField, setFocusedField] = useState(null);
    const [showPassword, setShowPassword] = useState(false);
    return (
        <>
            {/* Email Field */}
            {
                isPassword
                    ? <>
                        {/* Password Field */}
                        <div className={styles['form-group']}>
                            <div className={`${styles['input-wrapper']} ${styles['password-wrapper']}`}>
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    name="password"
                                    value={value}
                                    onChange={setValue}
                                    onFocus={() => setFocusedField('password')}
                                    onBlur={() => setFocusedField(null)}
                                    className={`${styles['form-input']} ${errors.password ? `${styles['error']}` : ''}`}
                                    placeholder="Enter your password"
                                    aria-label="Password"
                                />
                                <Lock
                                    className={styles['input-icon']}
                                    style={{
                                        color: focusedField === 'password' ? '#3b82f6' : '#9ca3af'
                                    }}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className={styles['password-toggle']}
                                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                                >
                                    {showPassword ? <EyeOff size={20}/> : <Eye size={20}/>}
                                </button>
                            </div>
                            {
                                errors.password ? <p className={styles['error-message']}>
                                    {errors.password}
                                </p> : null
                            }
                        </div>
                    </>
                    : <div className={styles['form-group']}>
                        <div className={styles['input-wrapper']}>
                            <input
                                type="email"
                                name="email"
                                value={value}
                                onChange={setValue}
                                onFocus={() => setFocusedField('email')}
                                onBlur={() => setFocusedField(null)}
                                className={`${styles['form-input']} ${errors.email ? `${styles['error']}` : ''}`}
                                placeholder="Enter your email address"
                                aria-label="Email address"
                            />
                            <Mail
                                className={styles['input-icon']}
                                style={{
                                    color: focusedField === 'email' ? '#3b82f6' : '#9ca3af'
                                }}
                            />
                        </div>
                        {
                            errors.email ? <p className={styles['error-message']}>
                                {errors.email}
                            </p> : null
                        }
                    </div>
            }
        </>
    )
}