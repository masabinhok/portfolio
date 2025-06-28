import React, { useState } from 'react';
import { Mail, MessageSquare, Send, User, Briefcase, Check, X } from 'lucide-react';
import ExceptionalButton from './Button';

interface FormData {
  recruiterEmail: string;
  offerMessage: string;
}

type FocusedField = 'email' | 'message' | null;

export interface MessageBoxProps {
  hired: boolean;
  setHired: (hired: boolean) => void;
  setShowMessageBox: (showMessageBox: boolean) => void;
}

const MessageBox = ({ hired, setHired, setShowMessageBox }: MessageBoxProps) => {
  const [formData, setFormData] = useState<FormData>({
    recruiterEmail: '',
    offerMessage: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [focusedField, setFocusedField] = useState<FocusedField>(null);

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));

    setIsSubmitting(false);
    setHired(true);
    setShowMessageBox(false)

    // Reset after 3 seconds
    setTimeout(() => {
      setFormData({ recruiterEmail: '', offerMessage: '' });
    }, 3000);
  };

  const isFormValid = formData.recruiterEmail.includes('@') && formData.offerMessage.trim().length > 10;

  return (
    <div className="max-w-2xl mx-auto p-8 fixed top-0">
      <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
        {/* Header */}
        <div className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 p-6 text-white">
          {/* Enhanced Close Button */}
          <button
            onClick={() => setShowMessageBox(false)}
            className="absolute top-4 right-4 group p-2 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 hover:border-white/40 transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-transparent cursor-pointer"
            aria-label="Close dialog"
          >
            <X
              size={18}
              className="text-white group-hover:text-white  group-hover:rotate-90 transform transition-transform duration-300"
            />
          </button>

          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
              <Briefcase size={24} />
            </div>
            <div>
              <h2 className="text-2xl font-bold">Send Hiring Offer </h2>
              <p className="text-blue-100">Let's discuss an amazing opportunity!</p>
            </div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          {/* Email Input */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
              <Mail size={16} className="text-blue-500" />
              Recruiter Email
            </label>
            <div className={`relative transition-all duration-300 ${focusedField === 'email' ? 'transform scale-[1.02]' : ''
              }`}>
              <input
                type="email"
                value={formData.recruiterEmail}
                onChange={(e) => handleInputChange('recruiterEmail', e.target.value)}
                onFocus={() => setFocusedField('email')}
                onBlur={() => setFocusedField(null)}
                placeholder="recruiter@company.com"
                className={`w-full px-4 py-4 pl-12 border-2 rounded-xl transition-all duration-300 bg-gray-50 text-gray-700 focus:bg-white focus:outline-none ${focusedField === 'email'
                  ? 'border-blue-500 shadow-lg shadow-blue-500/20'
                  : formData.recruiterEmail && formData.recruiterEmail.includes('@')
                    ? 'border-green-400'
                    : 'border-gray-200 hover:border-gray-300'
                  }`}
                required
              />
              <User size={20} className={`absolute left-4 top-1/2 transform -translate-y-1/2 transition-colors duration-300 ${focusedField === 'email' ? 'text-blue-500' : 'text-gray-400'
                }`} />

              {/* Email validation indicator */}
              {formData.recruiterEmail && (
                <div className={`absolute right-4 top-1/2 transform -translate-y-1/2 transition-all duration-300 ${formData.recruiterEmail.includes('@') ? 'text-green-500 scale-100' : 'text-red-400 scale-110'
                  }`}>
                  {formData.recruiterEmail.includes('@') ? (
                    <Check size={20} />
                  ) : (
                    <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Message Input */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700">
              <MessageSquare size={16} className="text-purple-500" />
              Offer Message
              <span className="text-xs text-gray-500">({formData.offerMessage.length}/500)</span>
            </label>
            <div className={`relative transition-all duration-300 ${focusedField === 'message' ? 'transform scale-[1.02]' : ''
              }`}>
              <textarea
                value={formData.offerMessage}
                onChange={(e) => handleInputChange('offerMessage', e.target.value)}
                onFocus={() => setFocusedField('message')}
                onBlur={() => setFocusedField('message')}
                placeholder="Hi! I'm impressed by your skills and would love to discuss an exciting opportunity at our company. We're looking for talented developers like you..."
                rows={6}
                maxLength={500}
                className={`w-full px-4 py-4 border-2 rounded-xl transition-all duration-300 bg-gray-50 text-gray-700 focus:bg-white focus:outline-none resize-none ${focusedField === 'message'
                  ? 'border-purple-500 shadow-lg shadow-purple-500/20'
                  : formData.offerMessage.length > 10
                    ? 'border-green-400'
                    : 'border-gray-200 hover:border-gray-300'
                  }`}
                required
              />

              {/* Character count and validation */}
              <div className="absolute bottom-3 right-3 flex items-center gap-2">
                <span className={`text-xs ${formData.offerMessage.length > 450 ? 'text-red-500' : 'text-gray-400'
                  }`}>
                  {formData.offerMessage.length}/500
                </span>
                {formData.offerMessage.length > 10 && (
                  <Check size={16} className="text-green-500" />
                )}
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <ExceptionalButton
            type='submit'
            disabled={!isFormValid || isSubmitting}
            variant={hired ? "success" : "primary"}
            size="md"
          >
            {isSubmitting ? (
              <>
                <Send size={20} />
                <span>Sending Your Offer...</span>
              </>
            ) : (
              <>
                <Send size={20} />
                <span>Send Hiring Offer</span>
              </>
            )}
          </ExceptionalButton>

          {/* Form Validation Hints */}
          <div className="flex items-center gap-4 text-sm">
            <div className={`flex items-center gap-2 ${formData.recruiterEmail.includes('@') ? 'text-green-600' : 'text-gray-400'
              }`}>
              <div className={`w-2 h-2 rounded-full ${formData.recruiterEmail.includes('@') ? 'bg-green-500' : 'bg-gray-300'
                }`}></div>
              Valid email address
            </div>
            <div className={`flex items-center gap-2 ${formData.offerMessage.length > 10 ? 'text-green-600' : 'text-gray-400'
              }`}>
              <div className={`w-2 h-2 rounded-full ${formData.offerMessage.length > 10 ? 'bg-green-500' : 'bg-gray-300'
                }`}></div>
              Message (10+ characters)
            </div>
          </div>
        </form>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }
        
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default MessageBox;