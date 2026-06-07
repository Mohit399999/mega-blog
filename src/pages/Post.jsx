import React, { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import appwriteService from "../appwrite/config"
import { Button, Container } from "../components"
import parse from "html-react-parser"
import { useSelector } from "react-redux"

export default function Post() {
  const [post, setPost] = useState(null)
  const { slug } = useParams()
  const navigate = useNavigate()
  const userData = useSelector((state) => state.auth.userData)
  const isAuthor = post && userData ? post.userId === userData.$id : false

  useEffect(() => {
    if (slug) {
      appwriteService.getPost(slug).then((post) => {
        if (post) setPost(post)
        else navigate("/")
      })
    } else navigate("/")
  }, [slug, navigate])

  useEffect(() => {
    if (post) {
      console.log("featuredImage from DB:", post.featuredImage)
      console.log("Preview URL:", appwriteService.getFilePreview(post.featuredImage))
    }
  }, [post])

  const deletePost = () => {
    appwriteService.deletePost(post.$id).then((status) => {
      if (status) {
        appwriteService.deleteFile(post.featuredImage)
        navigate("/")
      }
    })
  }

  if (!post) return null

  return (
    <div className="bg-[#f5f5f7] min-h-screen py-12">
      <div className="max-w-3xl mx-auto px-6">
        {/* Image */}
        <div className="relative rounded-2xl overflow-hidden mb-8 bg-white border border-gray-100">
          {post.featuredImage && (
            <img
              src={appwriteService.getFilePreview(post.featuredImage)}
              alt={post.title}
              className="w-full max-h-[500px] object-cover"
            />
          )}
          {isAuthor && (
            <div className="absolute top-4 right-4 flex gap-2">
              <Link to={`/edit-post/${post.$id}`}>
                <button className="px-4 py-2 text-sm bg-white/90 backdrop-blur text-gray-900 rounded-full border border-gray-200 hover:bg-white transition-all shadow-sm">
                  Edit
                </button>
              </Link>
              <button
                onClick={deletePost}
                className="px-4 py-2 text-sm bg-red-500/90 backdrop-blur text-white rounded-full hover:bg-red-600 transition-all shadow-sm"
              >
                Delete
              </button>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="bg-white rounded-2xl p-8 border border-gray-100">
          <h1 className="text-3xl font-semibold text-gray-900 tracking-tight mb-6">{post.title}</h1>
          <div className="prose prose-gray max-w-none text-gray-700 leading-relaxed">
            {parse(post.content)}
          </div>
        </div>
      </div>
    </div>
  )
}
