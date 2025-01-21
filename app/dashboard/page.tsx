import { getDashboardStats } from "@/lib/actions/post.actions";
import { auth } from "@clerk/nextjs/server";
import React from "react";

const Dashboard = async() => {
  const {userId} = await auth()
  const stats = await getDashboardStats()

  if (!userId) {
    return <div>Please login to view dashboard</div>;
  }

  if (!stats) {
    return <div>Error loading dashboard stats</div>;
  }

  // console.log(userId)
  // console.log(stats)
  return (
    <>
      <div className="min-h-screen">
        <div className="flex">
          <main className="flex-1 p-8">
            <h1 className="text-2xl font-bold mb-6">Dashboard Overview</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="p-6 bg-white rounded-lg shadow">
                <h2 className="font-semibold mb-2">Total Posts</h2>
                <p className="text-3xl font-bold">{stats.data?.totalPosts}</p>
              </div>
              <div className="p-6 bg-white rounded-lg shadow">
                <h2 className="font-semibold mb-2">joined projects</h2>
                <p className="text-3xl font-bold">{stats.data?.joinedProjects}</p>
              </div>
              <div className="p-6 bg-white rounded-lg shadow">
                <h2 className="font-semibold mb-2">Pending join requests</h2>
                <p className="text-3xl font-bold">{stats.data?.pendingRequests}</p>
              </div>
              <div className="p-6 bg-white rounded-lg shadow">
                <h2 className="font-semibold mb-2">Pending post requests</h2>
                <p className="text-3xl font-bold">{stats.data?.pendingPosts}</p>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
