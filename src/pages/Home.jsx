import React, { useEffect, useState } from 'react'
import appwriteService from "../appwrite/config"
import { Container, PostCard } from '../components'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

function Home() {
  const [posts, setPosts] = useState([])
  const userData = useSelector(state => state.auth.userData)

  useEffect(() => {
    appwriteService.getPosts().then((posts) => {
      if (posts) setPosts(posts.documents)
    })
  }, [])

  if (!userData) {
    return (
      <div className="bg-[#f5f5f7]">
        {/* Hero */}
        <section className="max-w-6xl mx-auto px-6 pt-24 pb-20 text-center">
          <p className="text-sm font-medium text-blue-600 mb-4 tracking-wide uppercase">Welcome to MegaBlog</p>
          <h1 className="text-5xl md:text-6xl font-semibold text-gray-900 tracking-tight leading-tight mb-6">
            Ideas worth<br />sharing.
          </h1>
          <p className="text-xl text-gray-500 max-w-xl mx-auto mb-10 leading-relaxed">
            A clean, minimal space to write, discover, and engage with stories that matter to you.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Link to="/signup" className="px-6 py-3 bg-gray-900 text-white text-sm rounded-full hover:bg-gray-700 transition-all">
              Start writing
            </Link>
            <Link to="/login" className="px-6 py-3 text-sm text-gray-600 hover:text-gray-900 transition-colors">
              Sign in →
            </Link>
          </div>
        </section>

        {/* Features */}
        <section className="max-w-6xl mx-auto px-6 pb-24">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: '✦', title: 'Beautiful Writing', desc: 'A distraction-free editor that lets your ideas shine without getting in the way.' },
              { icon: '◈', title: 'Rich Media', desc: 'Upload images and embed content to make your posts truly come alive.' },
              { icon: '⬡', title: 'Stay in Control', desc: 'Edit, update or delete your posts anytime. Your content, your rules.' },
            ].map(f => (
              <div key={f.title} className="bg-white rounded-2xl p-8 border border-gray-100">
                <div className="text-2xl mb-4">{f.icon}</div>
                <h3 className="text-base font-semibold text-gray-900 mb-2">{f.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    )
  }

  return (
    <div className="bg-[#f5f5f7] min-h-screen">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="mb-10">
          <h1 className="text-3xl font-semibold text-gray-900 tracking-tight">Latest Posts</h1>
          <p className="text-gray-500 mt-1 text-sm">Discover stories from our community</p>
        </div>
        {posts.length === 0 ? (
          <div className="text-center py-24">
            <p className="text-gray-400 text-lg mb-4">No posts yet.</p>
            <Link to="/add-post" className="px-6 py-3 bg-gray-900 text-white text-sm rounded-full hover:bg-gray-700 transition-all">
              Write the first post
            </Link>
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

export default Home
