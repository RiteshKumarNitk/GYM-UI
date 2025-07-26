import { Link } from "react-router";
import PageMeta from "../../component/common/PageMeta";

export default function Unauthorized() {
  return (
    <>
      <PageMeta
        title="Unauthorized Access"
        description="You don't have permission to access this page"
      />
      <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="text-center">
          <div className="mb-8">
            <svg
              className="mx-auto h-24 w-24 text-red-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>
          </div>
          
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Access Denied
          </h1>
          
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-md mx-auto">
            You don't have permission to access this page. Please contact your administrator if you believe this is an error.
          </p>
          
          <div className="space-x-4">
            <Link
              to="/Home"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-brand-500 hover:bg-brand-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500"
            >
              Go to Dashboard
            </Link>
            
            <Link
              to="/signin"
              className="inline-flex items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700"
            >
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </>
  );
} 