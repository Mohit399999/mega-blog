import React, { useState } from 'react'
import authService from '../appwrite/auth'
import { Link, useNavigate } from 'react-router-dom'
import { login } from '../store/authSlice'
import { Button, Input, Logo } from './index.js'
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'

function Signup() {
    const navigate = useNavigate()
    const [error, setError] = useState("")
    const dispatch = useDispatch()
    const { register, handleSubmit } = useForm()

    const create = async (data) => {
        setError("")
        try {
            const userData = await authService.createAccount(data)
            if (userData) {
                const userData = await authService.getCurrentUser()
                if (userData) dispatch(login(userData))
                navigate("/")
            }
        } catch (error) {
            setError(error.message)
        }
    }

    return (
        <div className="w-full max-w-md mx-auto">
            <div className="bg-white rounded-2xl border border-gray-200 p-10 shadow-sm">
                {/* Logo */}
                <div className="flex justify-center mb-6">
                    <span className="inline-block w-[80px]">
                        <Logo width="100%" />
                    </span>
                </div>

                {/* Heading */}
                <h2 className="text-2xl font-semibold text-gray-900 text-center tracking-tight">
                    Create your account
                </h2>
                <p className="mt-2 text-sm text-gray-500 text-center">
                    Already have an account?{' '}
                    <Link
                        to="/login"
                        className="text-gray-900 font-medium hover:underline underline-offset-2"
                    >
                        Sign in
                    </Link>
                </p>

                {/* Error */}
                {error && (
                    <div className="mt-4 px-4 py-3 bg-red-50 border border-red-100 rounded-xl">
                        <p className="text-sm text-red-600 text-center">{error}</p>
                    </div>
                )}

                {/* Form */}
                <form onSubmit={handleSubmit(create)} className="mt-6 space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">Full Name</label>
                        <input
                            placeholder="Enter your full name"
                            className="w-full px-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all"
                            {...register("name", { required: true })}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">Email</label>
                        <input
                            placeholder="Enter your email"
                            type="email"
                            className="w-full px-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all"
                            {...register("email", {
                                required: true,
                                validate: {
                                    matchPatern: (value) =>
                                        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                        "Email address must be a valid address",
                                }
                            })}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">Password</label>
                        <input
                            placeholder="Enter your password"
                            type="password"
                            className="w-full px-4 py-2.5 text-sm bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all"
                            {...register("password", { required: true })}
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-2.5 mt-2 bg-gray-900 text-white text-sm font-medium rounded-full hover:bg-gray-700 transition-all"
                    >
                        Create Account
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Signup