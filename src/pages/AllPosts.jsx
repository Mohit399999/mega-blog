import React, { useState, useEffect } from 'react'
import { Container, PostCard } from '../components'
import appwriteService from "../appwrite/config"

function AllPosts() {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    appwriteService.getPosts([]).then((posts) => {
      if (posts) setPosts(posts.documents)
    })
  }, [])

  return (
    <div className="bg-[#f5f5f7] min-h-screen">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="mb-10">
          <h1 className="text-3xl font-semibold text-gray-900 tracking-tight">All Posts</h1>
          <p className="text-gray-500 mt-1 text-sm">{posts.length} {posts.length === 1 ? 'story' : 'stories'} published</p>
        </div>
        {posts.length === 0 ? (
          <div className="text-center py-24">
            <p className="text-gray-400">No posts found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map(post => (
              <PostCard key={post.$id} {...post} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default AllPosts
