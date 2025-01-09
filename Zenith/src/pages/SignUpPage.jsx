import React from 'react';
import { SignUp } from '@clerk/clerk-react';

const SignUpPage = () => {
  return (
    <main className="flex items-center justify-center h-screen w-screen bg-gray-100">
      <div className="w-full max-w-md p-4">
        <SignUp 
          signInUrl="/sign-in"
          forceRedirectUrl="https://zenith-mvbdgb93g-dash10107s-projects.vercel.app/home" // Ensure the redirect after successful signup
        />
      </div>
    </main>
  );
};

export default SignUpPage;
