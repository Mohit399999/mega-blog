import React from 'react'
import appwriteService from "../appwrite/config"
import { Link } from 'react-router-dom'

function PostCard({ $id, title, featuredImage }) {
  return (
    <Link to={`/post/${$id}`} className="group block">
      <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
        <div className="w-full h-48 bg-gray-100 overflow-hidden">
          {featuredImage ? (
            <img
              src={appwriteService.getFilePreview(featuredImage)}
              alt={title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-300 text-4xl">✦</div>
          )}
        </div>
        <div className="p-5">
          <h2 className="text-base font-semibold text-gray-900 leading-snug group-hover:text-blue-600 transition-colors line-clamp-2">
            {title}
          </h2>
          <p className="mt-2 text-xs text-gray-400">Read more →</p>
        </div>
      </div>
    </Link>
  )
}

export default PostCard
