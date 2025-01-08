import React from 'react'
import { SignUp } from '@clerk/clerk-react'
const SignUpPage = () => {
  return (
    <div>
      <SignUp 
        signInUrl='/sign-in'
        forceRedirectUrl='/home'
      />
    </div>
  )
}

export default SignUpPage
