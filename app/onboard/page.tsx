import Link from 'next/link'
import React from 'react'

type Props = {}

const Onboard = (props: Props) => {
  return (
    <div>
      <h2>Welcome to the Platform!</h2>
      <p>We’re excited to have you! Let’s get started by setting up your profile and exploring the platform.</p>
      <Link href="/onboarding/step2">
        <button>Next: Set Up Profile</button>
      </Link>
    </div>
  )
}

export default Onboard