import SignUp from "@/components/shared/SignUp"

export default function Page() {
  
  return <div className='w-full h-screen flex items-center justify-center'>
    {/* CAPTCHA Widget */}
    <div id="clerk-captcha"></div>
    <SignUp />
  </div>
}