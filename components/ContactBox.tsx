import React, { useState } from 'react';
import { Mail, MessageSquare, Send, User, Contact, Check, X, Loader2, AlertCircle } from 'lucide-react';
import ExceptionalButton from './Button';
import { useEmail } from '@/hooks/useEmail';

interface FormData {
  name: string;
  email: string;
  message: string;
}
type FocusedField = 'name' | 'email' | 'message' | null;

export interface ContactBoxProps {
  setShowContactBox: (showContactBox: boolean) => void;
}

const ContactBox = ({ setShowContactBox }: ContactBoxProps) => {
  const { sendEmail, isLoading, error } = useEmail();
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: 'Hello Sabin! I came across your portfolio and I\'m really impressed with your work. I would love to connect and discuss potential opportunities or collaborations. Looking forward to hearing from you!'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [focusedField, setFocusedField] = useState<FocusedField>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    // Clear any previous errors when user starts typing
    setSubmitError(null);
    setSubmitSuccess(false);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isFormValid) return;

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      // Send email with proper data structure
      await sendEmail({
        to: 'sabin.shrestha.er@gmail.com',
        type: 'contact',
        data: {
          name: formData.name,
          email: formData.email,
          message: formData.message,
        },
      });

      // Success! 
      setSubmitSuccess(true);

      // Close form after a brief delay
      setTimeout(() => {
        setShowContactBox(false);
        setFormData({
          name: '',
          email: '',
          message: 'Hello Sabin! I came across your portfolio and I\'m really impressed with your work. I would love to connect and discuss potential opportunities or collaborations. Looking forward to hearing from you!'
        });
      }, 1500);

    } catch (err) {
      console.error('Failed to send contact email:', err);
      setSubmitError(err instanceof Error ? err.message : 'Failed to send email. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormValid = formData.name.trim().length > 1 &&
    formData.email.includes('@') &&
    formData.email.includes('.') &&
    formData.message.trim().length > 10;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="max-w-lg w-full">
        <div className="bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden animate-fade-in">
          {/* Header */}
          <div className="relative bg-gradient-to-r from-emerald-500 via-teal-600 to-cyan-600 p-4 text-white">
            {/* Enhanced Close Button */}
            <button
              onClick={() => setShowContactBox(false)}
              className="absolute top-3 right-3 group p-1.5 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 hover:border-white/40 transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-transparent cursor-pointer"
              aria-label="Close dialog"
            >
              <X
                size={16}
                className="text-white group-hover:text-white group-hover:rotate-90 transform transition-transform duration-300"
              />
            </button>

            <div className="flex items-center gap-3 mb-1">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                <Contact size={20} />
              </div>
              <div>
                <h2 className="text-xl font-bold">Get In Touch</h2>
                <p className="text-emerald-100 text-sm">Let&apos;s connect and build something amazing together!</p>
              </div>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-5 space-y-4">
            {/* Success Message */}
            {submitSuccess && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-3 flex items-center gap-3">
                <Check className="text-green-600 flex-shrink-0" size={18} />
                <div>
                  <p className="text-green-600 text-sm">Message sent successfully!</p>
                </div>
              </div>
            )}

            {/* Error Message */}
            {(submitError || error) && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-center gap-3">
                <AlertCircle className="text-red-600 flex-shrink-0" size={18} />
                <div>
                  <p className="text-red-800 font-medium text-sm">Failed to send message.</p>
                  <p className="text-red-600 text-xs">{submitError || error}</p>
                </div>
              </div>
            )}

            {/* Name Input */}
            <div className="space-y-1">
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                <User size={14} className="text-emerald-500" />
                Your Name
              </label>
              <div className={`relative transition-all duration-300 ${focusedField === 'name' ? 'transform scale-[1.01]' : ''
                }`}>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  onFocus={() => setFocusedField('name')}
                  onBlur={() => setFocusedField(null)}
                  placeholder="Your full name"
                  className={`w-full px-3 py-3 pl-10 border-2 rounded-lg transition-all duration-300 bg-gray-50 text-gray-700 focus:bg-white focus:outline-none text-sm ${focusedField === 'name'
                    ? 'border-emerald-500 shadow-lg shadow-emerald-500/20'
                    : formData.name.trim().length > 1
                      ? 'border-green-400'
                      : 'border-gray-200 hover:border-gray-300'
                    }`}
                  required
                />
                <User size={18} className={`absolute left-3 top-1/2 transform -translate-y-1/2 transition-colors duration-300 ${focusedField === 'name' ? 'text-emerald-500' : 'text-gray-400'
                  }`} />

                {/* Name validation indicator */}
                {formData.name && (
                  <div className={`absolute right-3 top-1/2 transform -translate-y-1/2 transition-all duration-300 ${formData.name.trim().length > 1
                    ? 'text-green-500 scale-100'
                    : 'text-red-400 scale-110'
                    }`}>
                    {formData.name.trim().length > 1 ? (
                      <Check size={16} />
                    ) : (
                      <div className="w-1.5 h-1.5 bg-red-400 rounded-full"></div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Email Input */}
            <div className="space-y-1">
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                <Mail size={14} className="text-blue-500" />
                Your Email
              </label>
              <div className={`relative transition-all duration-300 ${focusedField === 'email' ? 'transform scale-[1.01]' : ''
                }`}>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  onFocus={() => setFocusedField('email')}
                  onBlur={() => setFocusedField(null)}
                  placeholder="your.email@example.com"
                  className={`w-full px-3 py-3 pl-10 border-2 rounded-lg transition-all duration-300 bg-gray-50 text-gray-700 focus:bg-white focus:outline-none text-sm ${focusedField === 'email'
                    ? 'border-blue-500 shadow-lg shadow-blue-500/20'
                    : formData.email && formData.email.includes('@') && formData.email.includes('.')
                      ? 'border-green-400'
                      : 'border-gray-200 hover:border-gray-300'
                    }`}
                  required
                />
                <Mail size={18} className={`absolute left-3 top-1/2 transform -translate-y-1/2 transition-colors duration-300 ${focusedField === 'email' ? 'text-blue-500' : 'text-gray-400'
                  }`} />

                {/* Email validation indicator */}
                {formData.email && (
                  <div className={`absolute right-3 top-1/2 transform -translate-y-1/2 transition-all duration-300 ${formData.email.includes('@') && formData.email.includes('.')
                    ? 'text-green-500 scale-100'
                    : 'text-red-400 scale-110'
                    }`}>
                    {formData.email.includes('@') && formData.email.includes('.') ? (
                      <Check size={16} />
                    ) : (
                      <div className="w-1.5 h-1.5 bg-red-400 rounded-full"></div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Message Input */}
            <div className="space-y-1">
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                <MessageSquare size={14} className="text-purple-500" />
                Your Message
                <span className="text-xs text-gray-500">({formData.message.length}/500)</span>
              </label>
              <div className={`relative transition-all duration-300 ${focusedField === 'message' ? 'transform scale-[1.01]' : ''
                }`}>
                <textarea
                  value={formData.message}
                  onChange={(e) => handleInputChange('message', e.target.value)}
                  onFocus={() => setFocusedField('message')}
                  onBlur={() => setFocusedField(null)}
                  placeholder="Hello Sabin! I came across your portfolio and would love to connect..."
                  rows={4}
                  maxLength={500}
                  className={`w-full px-3 py-3 border-2 rounded-lg transition-all duration-300 bg-gray-50 text-gray-700 focus:bg-white focus:outline-none resize-none text-sm ${focusedField === 'message'
                    ? 'border-purple-500 shadow-lg shadow-purple-500/20'
                    : formData.message.length > 10
                      ? 'border-green-400'
                      : 'border-gray-200 hover:border-gray-300'
                    }`}
                  required
                />

                {/* Character count and validation */}
                <div className="absolute bottom-2 right-2 flex items-center gap-2">
                  <span className={`text-xs ${formData.message.length > 450 ? 'text-red-500' : 'text-gray-400'
                    }`}>
                    {formData.message.length}/500
                  </span>
                  {formData.message.length > 10 && (
                    <Check size={14} className="text-green-500" />
                  )}
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <ExceptionalButton
              type="submit"
              disabled={!isFormValid || isSubmitting || isLoading}
              variant={submitSuccess ? "success" : "primary"}
            >
              {isSubmitting || isLoading ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  <span>Sending your message...</span>
                </>
              ) : submitSuccess ? (
                <>
                  <Check size={20} />
                  <span>Message Sent Successfully!</span>
                </>
              ) : (
                <>
                  <Send size={20} />
                  <span>Send Message</span>
                </>
              )}
            </ExceptionalButton>

            {/* Form Validation Hints */}
            <div className="flex items-center gap-3 text-xs flex-wrap">
              <div className={`flex items-center gap-1.5 ${formData.name.trim().length > 1
                ? 'text-green-600'
                : 'text-gray-400'
                }`}>
                <div className={`w-1.5 h-1.5 rounded-full ${formData.name.trim().length > 1
                  ? 'bg-green-500'
                  : 'bg-gray-300'
                  }`}></div>
                Valid name
              </div>
              <div className={`flex items-center gap-1.5 ${formData.email.includes('@') && formData.email.includes('.')
                ? 'text-green-600'
                : 'text-gray-400'
                }`}>
                <div className={`w-1.5 h-1.5 rounded-full ${formData.email.includes('@') && formData.email.includes('.')
                  ? 'bg-green-500'
                  : 'bg-gray-300'
                  }`}></div>
                Valid email
              </div>
              <div className={`flex items-center gap-1.5 ${formData.message.length > 10 ? 'text-green-600' : 'text-gray-400'
                }`}>
                <div className={`w-1.5 h-1.5 rounded-full ${formData.message.length > 10 ? 'bg-green-500' : 'bg-gray-300'
                  }`}></div>
                Message (10+ chars)
              </div>
            </div>
          </form>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }
      `}</style>
    </div>
  );
};

export default ContactBox;