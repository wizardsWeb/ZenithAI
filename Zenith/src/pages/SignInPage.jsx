import React from 'react'
import { SignIn } from '@clerk/clerk-react'

const SignInPage = () => {
  return (
    <main>
        <SignIn
          signUpUrl="/sign-up"
          forceRedirectUrl='/home'
        />
    </main>
  )
}

export default SignInPage
