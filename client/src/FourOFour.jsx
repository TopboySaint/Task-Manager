import React from 'react'
import { Link } from 'react-router-dom'

const FourOFour = () => {
	return (
		<div className="min-h-screen bg-surface-2 flex items-center justify-center px-4">
			<div className="max-w-lg w-full text-center space-y-6">
				{/* Logo */}
				<div className="flex items-center justify-center gap-3">
					<div className="w-10 h-10 bg-brand rounded-lg flex items-center justify-center">
						<svg className="w-6 h-6 text-brand-contrast" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
						</svg>
					</div>
					<span className="text-xl font-bold text-text">TaskMint</span>
				</div>

				{/* Message */}
				<div className="card p-8">
					<h1 className="text-4xl font-extrabold text-text">404</h1>
					<p className="mt-2 text-text text-lg">The page you’re looking for can’t be found.</p>
					<p className="text-muted mt-1">It might have been moved or deleted.</p>

					<div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
						<Link to="/" className="btn btn-neutral btn-md">Back to Home</Link>
						<Link to="/signin" className="btn btn-primary btn-md">Go to Sign in</Link>
					</div>
				</div>

				{/* Footer */}
				<p className="text-xs text-muted">If this keeps happening, please check the URL or try again later.</p>
			</div>
		</div>
	)
}

export default FourOFour

