import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { User, Mail, MapPin, Calendar, Users, ArrowLeft } from 'lucide-react';
import { useLocation } from 'wouter';
import { useState } from 'react';

export default function Register() {
  const [, setLocation] = useLocation();
  const [gender, setGender] = useState<string>('');

  const handleBackToLogin = () => {
    setLocation('/');
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-8" style={{ background: 'linear-gradient(135deg, #EEE60D 0%, #D4CC0A 50%, #C2B909 100%)' }}>
      <div className="w-full max-w-2xl">
        {/* Back Button */}
        <div className="mb-6 ml-4">
          <button
            onClick={handleBackToLogin}
            className="flex items-center text-white hover:text-gray-200 transition-colors"
            data-testid="button-back-to-login"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Login
          </button>
        </div>

        {/* Registration Form Card */}
        <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-2xl p-8 mx-4">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4" style={{ background: 'linear-gradient(135deg, #EEE60D 0%, #D4CC0A 100%)' }}>
              <Users className="text-white h-8 w-8" />
            </div>
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">Registration Info</h1>
            <p className="text-gray-600 dark:text-gray-400">Create your account with Google</p>
          </div>

          {/* Registration Form */}
          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* First Name */}
              <div className="space-y-2">
                <Label htmlFor="firstName" className="text-gray-700 dark:text-gray-300 font-medium">
                  First Name *
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <Input
                    id="firstName"
                    type="text"
                    placeholder="Enter your first name"
                    className="pl-10 h-12 border-gray-300 dark:border-gray-600 rounded-lg"
                    style={{
                      '--tw-ring-color': '#EEE60D',
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = '#EEE60D';
                      e.target.style.boxShadow = '0 0 0 3px rgba(238, 230, 13, 0.1)';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = 'rgb(209 213 219)';
                      e.target.style.boxShadow = 'none';
                    }}
                    data-testid="input-first-name"
                    required
                  />
                </div>
              </div>

              {/* Last Name */}
              <div className="space-y-2">
                <Label htmlFor="lastName" className="text-gray-700 dark:text-gray-300 font-medium">
                  Last Name *
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <Input
                    id="lastName"
                    type="text"
                    placeholder="Enter your last name"
                    className="pl-10 h-12 border-gray-300 dark:border-gray-600 rounded-lg"
                    style={{
                      '--tw-ring-color': '#EEE60D',
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = '#EEE60D';
                      e.target.style.boxShadow = '0 0 0 3px rgba(238, 230, 13, 0.1)';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = 'rgb(209 213 219)';
                      e.target.style.boxShadow = 'none';
                    }}
                    data-testid="input-last-name"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-gray-700 dark:text-gray-300 font-medium">
                Email Address *
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email address"
                  className="pl-10 h-12 border-gray-300 dark:border-gray-600 rounded-lg"
                  style={{
                    '--tw-ring-color': '#EEE60D',
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#EEE60D';
                    e.target.style.boxShadow = '0 0 0 3px rgba(238, 230, 13, 0.1)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = 'rgb(209 213 219)';
                    e.target.style.boxShadow = 'none';
                  }}
                  data-testid="input-email"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Phone Number */}
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-gray-700 dark:text-gray-300 font-medium">
                  Phone Number
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="Enter your phone number"
                  className="h-12 border-gray-300 dark:border-gray-600 rounded-lg"
                  style={{
                    '--tw-ring-color': '#EEE60D',
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = '#EEE60D';
                    e.target.style.boxShadow = '0 0 0 3px rgba(238, 230, 13, 0.1)';
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = 'rgb(209 213 219)';
                    e.target.style.boxShadow = 'none';
                  }}
                  data-testid="input-phone"
                />
              </div>

              {/* Date of Birth */}
              <div className="space-y-2">
                <Label htmlFor="dateOfBirth" className="text-gray-700 dark:text-gray-300 font-medium">
                  Date of Birth
                </Label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <Input
                    id="dateOfBirth"
                    type="date"
                    className="pl-10 h-12 border-gray-300 dark:border-gray-600 rounded-lg"
                    style={{
                      '--tw-ring-color': '#EEE60D',
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = '#EEE60D';
                      e.target.style.boxShadow = '0 0 0 3px rgba(238, 230, 13, 0.1)';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = 'rgb(209 213 219)';
                      e.target.style.boxShadow = 'none';
                    }}
                    data-testid="input-date-of-birth"
                  />
                </div>
              </div>
            </div>

            {/* Gender Selection */}
            <div className="space-y-3">
              <Label className="text-gray-700 dark:text-gray-300 font-medium">Gender *</Label>
              <RadioGroup value={gender} onValueChange={setGender} className="flex space-x-6" data-testid="radio-gender">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="male" id="male" />
                  <Label htmlFor="male" className="text-gray-700 dark:text-gray-300 cursor-pointer">Male</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="female" id="female" />
                  <Label htmlFor="female" className="text-gray-700 dark:text-gray-300 cursor-pointer">Female</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="other" id="other" />
                  <Label htmlFor="other" className="text-gray-700 dark:text-gray-300 cursor-pointer">Other</Label>
                </div>
              </RadioGroup>
            </div>

            {/* Country/Region */}
            <div className="space-y-2">
              <Label htmlFor="country" className="text-gray-700 dark:text-gray-300 font-medium">
                Country/Region
              </Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5 z-10" />
                <Select>
                  <SelectTrigger className="pl-10 h-12 border-gray-300 dark:border-gray-600 rounded-lg" data-testid="select-country"
                    style={{
                      '--tw-ring-color': '#EEE60D',
                    }}
                    onFocus={(e) => {
                      e.currentTarget.style.borderColor = '#EEE60D';
                      e.currentTarget.style.boxShadow = '0 0 0 3px rgba(238, 230, 13, 0.1)';
                    }}
                    onBlur={(e) => {
                      e.currentTarget.style.borderColor = 'rgb(209 213 219)';
                      e.currentTarget.style.boxShadow = 'none';
                    }}>
                    <SelectValue placeholder="Select your country" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="us">United States</SelectItem>
                    <SelectItem value="uk">United Kingdom</SelectItem>
                    <SelectItem value="ca">Canada</SelectItem>
                    <SelectItem value="au">Australia</SelectItem>
                    <SelectItem value="de">Germany</SelectItem>
                    <SelectItem value="fr">France</SelectItem>
                    <SelectItem value="jp">Japan</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Google Account Notice */}
            <div className="rounded-lg p-4" style={{ backgroundColor: 'rgba(238, 230, 13, 0.1)', borderColor: '#EEE60D', borderWidth: '1px' }}>
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <svg className="w-5 h-5" style={{ color: '#EEE60D' }} fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium" style={{ color: '#C2B909' }}>
                    Google Account Integration
                  </h3>
                  <p className="mt-1 text-sm" style={{ color: '#D4CC0A' }}>
                    Your account will be created and linked with your Google account for secure authentication.
                  </p>
                </div>
              </div>
            </div>

            {/* Submit Button - Inactive */}
            <Button
              type="submit"
              disabled
              className="w-full h-12 bg-gray-400 cursor-not-allowed text-white font-semibold rounded-lg shadow-lg opacity-50"
              data-testid="button-create-account"
            >
              Create Account with Google (Coming Soon)
            </Button>

            {/* Terms */}
            <div className="text-center text-sm text-gray-600 dark:text-gray-400">
              By creating an account, you agree to our{' '}
              <a href="#" style={{ color: '#EEE60D' }} onMouseEnter={(e) => (e.target as HTMLAnchorElement).style.color = '#D4CC0A'} onMouseLeave={(e) => (e.target as HTMLAnchorElement).style.color = '#EEE60D'}>
                Terms of Service
              </a>{' '}
              and{' '}
              <a href="#" style={{ color: '#EEE60D' }} onMouseEnter={(e) => (e.target as HTMLAnchorElement).style.color = '#D4CC0A'} onMouseLeave={(e) => (e.target as HTMLAnchorElement).style.color = '#EEE60D'}>
                Privacy Policy
              </a>
            </div>
          </form>
        </div>

        {/* Footer */}
        <div className="text-center mt-6">
          <p className="text-white text-xs opacity-75">
            © 2025 CompanyName. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}