import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

const notFound = () => {
  return (
    <div className='my-20 w-full space-y-3 text-center'>
        <h1 className='text-3xl font-bold'>😮Uh-oh!😮</h1>
        <h2>404 Not Found</h2>
        <p>You took a wrong turn but <br /> finding you here makes it worth the detour!</p>
        <Button variant={"link"} className='text-primary-100' asChild>
            <Link href={"/hub"} className='text-primary-100'>Go home</Link>
        </Button>
        {/* Uh-oh, we took a wrong turn, but finding you here makes it worth the detour! */}
    </div>
  )
}

export default notFound