import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { ChevronLeftIcon, EyeCloseIcon, EyeIcon } from "../../icons";
import Label from "../../component/form/Label";
import Input from "../../component/form/input/InputField";
import Button from "../../component/ui/button/Button";
import apiService from "../../services/api";

interface RegistrationData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  // For tenant registration
  tenantName?: string;
  domain?: string;
  contactEmail?: string;
}

export default function Register() {
  const [registrationType, setRegistrationType] = useState<'superadmin' | 'tenant'>('superadmin');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState<RegistrationData>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    tenantName: '',
    domain: '',
    contactEmail: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  
  const navigate = useNavigate();

  const handleInputChange = (field: keyof RegistrationData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    setError(""); // Clear error when user starts typing
  };

  const validateForm = (): boolean => {
    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      setError("All fields are required");
      return false;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return false;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long");
      return false;
    }

    if (registrationType === 'tenant') {
      if (!formData.tenantName || !formData.domain || !formData.contactEmail) {
        setError("All tenant fields are required");
        return false;
      }
    }

    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    try {
      setIsLoading(true);
      setError("");
      setSuccess("");

      if (registrationType === 'superadmin') {
        // Create super admin
        await apiService.createSuperAdmin({
          name: formData.name,
          email: formData.email,
          password: formData.password
        });
        setSuccess("Super Admin account created successfully! You can now login.");
      } else {
        // Create tenant with owner
        await apiService.createTenant({
          name: formData.tenantName,
          domain: formData.domain,
          contactEmail: formData.contactEmail,
          ownerName: formData.name,
          ownerEmail: formData.email,
          ownerPassword: formData.password
        });
        setSuccess("Tenant and owner account created successfully! You can now login.");
      }

      // Clear form after successful registration
      setFormData({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        tenantName: '',
        domain: '',
        contactEmail: ''
      });

      // Redirect to login after 2 seconds
      setTimeout(() => {
        navigate('/signin');
      }, 2000);

    } catch (error: any) {
      setError(error.message || "Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col flex-1">
      <div className="w-full max-w-md pt-10 mx-auto">
        <Link
          to="/signin"
          className="inline-flex items-center text-sm text-gray-500 transition-colors hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
        >
          <ChevronLeftIcon className="size-5" />
          Back to sign in
        </Link>
      </div>
      
      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
        <div>
          <div className="mb-5 sm:mb-8">
            <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">
              Create Account
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Choose your registration type and create your account
            </p>
          </div>

          {/* Registration Type Selection */}
          <div className="mb-6">
            <Label>Registration Type</Label>
            <div className="grid grid-cols-2 gap-3 mt-2">
              <button
                type="button"
                onClick={() => setRegistrationType('superadmin')}
                className={`p-3 text-sm font-medium rounded-lg border transition-colors ${
                  registrationType === 'superadmin'
                    ? 'border-brand-500 bg-brand-50 text-brand-700 dark:bg-brand-900/20 dark:text-brand-400'
                    : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300'
                }`}
              >
                Super Admin
              </button>
              <button
                type="button"
                onClick={() => setRegistrationType('tenant')}
                className={`p-3 text-sm font-medium rounded-lg border transition-colors ${
                  registrationType === 'tenant'
                    ? 'border-brand-500 bg-brand-50 text-brand-700 dark:bg-brand-900/20 dark:text-brand-400'
                    : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300'
                }`}
              >
                Gym Owner
              </button>
            </div>
            <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
              {registrationType === 'superadmin' 
                ? 'Create the first system administrator account'
                : 'Create a new gym with owner account'
              }
            </p>
          </div>

          {error && (
            <div className="p-3 text-sm text-red-600 bg-red-100 border border-red-300 rounded-lg dark:bg-red-900/20 dark:border-red-800 dark:text-red-400 mb-4">
              {error}
            </div>
          )}

          {success && (
            <div className="p-3 text-sm text-green-600 bg-green-100 border border-green-300 rounded-lg dark:bg-green-900/20 dark:border-green-800 dark:text-green-400 mb-4">
              {success}
            </div>
          )}

          <div className="space-y-6">
            {/* Tenant Information (only for tenant registration) */}
            {registrationType === 'tenant' && (
              <>
                <div>
                  <Label>
                    Gym Name <span className="text-error-500">*</span>
                  </Label>
                  <Input
                    value={formData.tenantName}
                    onChange={(e) => handleInputChange('tenantName', e.target.value)}
                    placeholder="Enter gym name"
                  />
                </div>
                <div>
                  <Label>
                    Domain <span className="text-error-500">*</span>
                  </Label>
                  <Input
                    value={formData.domain}
                    onChange={(e) => handleInputChange('domain', e.target.value)}
                    placeholder="gym-name.com"
                  />
                </div>
                <div>
                  <Label>
                    Contact Email <span className="text-error-500">*</span>
                  </Label>
                  <Input
                    type="email"
                    value={formData.contactEmail}
                    onChange={(e) => handleInputChange('contactEmail', e.target.value)}
                    placeholder="contact@gym-name.com"
                  />
                </div>
              </>
            )}

            {/* User Information */}
            <div>
              <Label>
                Full Name <span className="text-error-500">*</span>
              </Label>
              <Input
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder="Enter your full name"
              />
            </div>

            <div>
              <Label>
                Email <span className="text-error-500">*</span>
              </Label>
              <Input
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder="Enter your email"
              />
            </div>

            <div>
              <Label>
                Password <span className="text-error-500">*</span>
              </Label>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  placeholder="Enter your password"
                />
                <span
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
                >
                  {showPassword ? (
                    <EyeIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
                  ) : (
                    <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
                  )}
                </span>
              </div>
            </div>

            <div>
              <Label>
                Confirm Password <span className="text-error-500">*</span>
              </Label>
              <div className="relative">
                <Input
                  type={showConfirmPassword ? "text" : "password"}
                  value={formData.confirmPassword}
                  onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                  placeholder="Confirm your password"
                />
                <span
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
                >
                  {showConfirmPassword ? (
                    <EyeIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
                  ) : (
                    <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
                  )}
                </span>
              </div>
            </div>

            <div>
              <Button
                className="w-full"
                size="sm"
                disabled={isLoading}
                onClick={handleSubmit}
              >
                {isLoading ? "Creating Account..." : "Create Account"}
              </Button>
            </div>
          </div>

          <div className="mt-5">
            <p className="text-sm font-normal text-center text-gray-700 dark:text-gray-400 sm:text-start">
              Already have an account? {""}
              <Link
                to="/signin"
                className="text-brand-500 hover:text-brand-600 dark:text-brand-400"
              >
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 