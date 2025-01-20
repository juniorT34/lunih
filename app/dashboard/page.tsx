import Header from '@/components/shared/Header'
import Sidebar from '@/components/shared/Sidebar'
// import Sidebar from '@components/shared/Sidebar'
import React from 'react'

const Dashboard = () => {
  return (
    <>
    <div className="min-h-screen">
      {/* <Header /> */}
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-8">
      <h1>Welcome back junior </h1>

          <h1 className="text-2xl font-bold mb-6">Dashboard Overview</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-6 bg-white rounded-lg shadow">
              <h2 className="font-semibold mb-2">Total Posts</h2>
              <p className="text-3xl font-bold">12</p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow">
              <h2 className="font-semibold mb-2">joined projects</h2>
              <p className="text-3xl font-bold">5</p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow">
              <h2 className="font-semibold mb-2">Pending requests</h2>
              <p className="text-3xl font-bold">8</p>
            </div>
          </div>
        </main>
      </div>
    </div>
    </>
  )
}

export default Dashboard