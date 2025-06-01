import React from "react";
import {
	User,
	Mail,
	Camera,
	Edit,
	Download,
	Shield,
	Sun,
	Bell,
	Globe,
	Key,
	Trash2,
} from "lucide-react";

export default function SettingsPage() {
	return (
		<div className="min-h-screen bg-gradient-to-br from-orange-100 via-purple-50 to-blue-100">
			<div className="w-full max-w-sm-phone sm-phone:max-w-md-phone md-phone:max-w-lg-phone lg-phone:max-w-xl-phone xl-phone:max-w-2xl-phone 2xl-phone:max-w-sm-tablet sm-tablet:max-w-md-tablet md-tablet:max-w-lg-tablet lg-tablet:max-w-xl-tablet xl-tablet:max-w-2xl-tablet 2xl-tablet:max-w-6xl mx-auto p-4 sm-phone:p-5 md-phone:p-6 lg-tablet:p-8 space-y-4 sm-phone:space-y-5 md-phone:space-y-6 lg-tablet:space-y-8">
				{/* Header */}
				<div className="text-center mb-6 sm-phone:mb-8 md-phone:mb-10 lg-tablet:mb-12">
					<h1 className="text-2xl sm-phone:text-3xl md-phone:text-3xl lg-tablet:text-4xl font-bold text-gray-800 mb-2 sm-phone:mb-3">
						Settings
					</h1>
					<p className="text-gray-600 text-sm sm-phone:text-base lg-tablet:text-lg max-w-xs sm-phone:max-w-sm md-phone:max-w-md lg-tablet:max-w-2xl mx-auto px-2 sm-phone:px-0">
						Customize your experience and manage your account preferences with
						our intuitive settings panel
					</p>
				</div>

				{/* Main Content Grid */}
				<div className="grid grid-cols-1 2xl-tablet:grid-cols-2 gap-4 sm-phone:gap-5 md-phone:gap-6 lg-tablet:gap-8">
					{/* Profile Information Card */}
					<div className="bg-white rounded-xl lg-tablet:rounded-2xl shadow-lg p-4 sm-phone:p-5 md-phone:p-6 lg-tablet:p-8 h-fit">
						<div className="flex items-start sm-tablet:items-center gap-3 sm-phone:gap-4 mb-4 sm-phone:mb-6 lg-tablet:mb-8">
							<div className="w-10 h-10 sm-phone:w-12 sm-phone:h-12 lg-tablet:w-14 lg-tablet:h-14 bg-blue-500 rounded-lg lg-tablet:rounded-xl flex items-center justify-center flex-shrink-0">
								<User className="w-5 h-5 sm-phone:w-6 sm-phone:h-6 lg-tablet:w-7 lg-tablet:h-7 text-white" />
							</div>
							<div className="flex-1 min-w-0">
								<h2 className="text-lg sm-phone:text-xl font-semibold text-gray-800">
									Profile Information
								</h2>
								<p className="text-gray-600 text-sm sm-phone:text-base">
									Manage your personal details and avatar
								</p>
							</div>
							<Camera className="w-4 h-4 sm-phone:w-5 sm-phone:h-5 text-gray-400 cursor-pointer hover:text-gray-600 flex-shrink-0" />
						</div>

						{/* Profile Details */}
						<div className="space-y-4 sm-phone:space-y-5 lg-tablet:space-y-6 mb-4 sm-phone:mb-6 lg-tablet:mb-8">
							<div className="flex items-center gap-3 sm-phone:gap-4">
								<User className="w-4 h-4 sm-phone:w-5 sm-phone:h-5 text-gray-400 flex-shrink-0" />
								<div className="min-w-0">
									<p className="text-gray-600 text-xs sm-phone:text-sm">
										Display Name
									</p>
									<p className="font-medium text-gray-800 text-sm sm-phone:text-base lg-tablet:text-lg">
										Ayan
									</p>
								</div>
							</div>
							<div className="flex items-center gap-3 sm-phone:gap-4">
								<Mail className="w-4 h-4 sm-phone:w-5 sm-phone:h-5 text-gray-400 flex-shrink-0" />
								<div className="min-w-0">
									<p className="text-gray-600 text-xs sm-phone:text-sm">
										Email Address
									</p>
									<p className="font-medium text-gray-800 text-sm sm-phone:text-base lg-tablet:text-lg break-all">
										ayan@example.com
									</p>
								</div>
							</div>
						</div>

						{/* Action Buttons */}
						<div className="flex flex-col sm-tablet:flex-row gap-3 sm-phone:gap-4">
							<button className="flex-1 bg-blue-500 text-white px-4 sm-phone:px-6 py-2.5 sm-phone:py-3 rounded-lg xl-phone:rounded-xl font-medium hover:bg-blue-600 transition-colors flex items-center justify-center gap-2 text-sm sm-phone:text-base">
								<Edit className="w-3.5 h-3.5 sm-phone:w-4 sm-phone:h-4" />
								Edit Profile
							</button>
							<button className="px-4 sm-phone:px-6 py-2.5 sm-phone:py-3 border border-gray-300 rounded-lg xl-phone:rounded-xl font-medium text-gray-700 hover:bg-gray-50 transition-colors flex items-center justify-center gap-2 text-sm sm-phone:text-base">
								<Download className="w-3.5 h-3.5 sm-phone:w-4 sm-phone:h-4" />
								Export
							</button>
						</div>
					</div>

					{/* Preferences Card */}
					<div className="bg-white rounded-xl lg-tablet:rounded-2xl shadow-lg p-4 sm-phone:p-5 md-phone:p-6 lg-tablet:p-8">
						<div className="flex items-start sm-tablet:items-center gap-3 sm-phone:gap-4 mb-4 sm-phone:mb-6 lg-tablet:mb-8">
							<div className="w-10 h-10 sm-phone:w-12 sm-phone:h-12 lg-tablet:w-14 lg-tablet:h-14 bg-purple-500 rounded-lg lg-tablet:rounded-xl flex items-center justify-center flex-shrink-0">
								<Shield className="w-5 h-5 sm-phone:w-6 sm-phone:h-6 lg-tablet:w-7 lg-tablet:h-7 text-white" />
							</div>
							<div className="min-w-0">
								<h2 className="text-lg sm-phone:text-xl font-semibold text-gray-800">
									Preferences
								</h2>
								<p className="text-gray-600 text-sm sm-phone:text-base">
									Customize your experience
								</p>
							</div>
						</div>

						{/* Settings List */}
						<div className="space-y-2 sm-phone:space-y-3 lg-tablet:space-y-4">
							{/* Dark Mode */}
							<div className="flex items-center justify-between p-3 sm-phone:p-3.5 lg-tablet:p-4 rounded-lg xl-phone:rounded-xl hover:bg-gray-50 transition-colors">
								<div className="flex items-center gap-3 sm-phone:gap-4 flex-1 min-w-0">
									<div className="w-8 h-8 sm-phone:w-9 sm-phone:h-9 lg-tablet:w-10 lg-tablet:h-10 bg-yellow-100 rounded-lg xl-phone:rounded-xl flex items-center justify-center flex-shrink-0">
										<Sun className="w-4 h-4 sm-phone:w-4.5 sm-phone:h-4.5 lg-tablet:w-5 lg-tablet:h-5 text-yellow-600" />
									</div>
									<div className="min-w-0">
										<p className="font-medium text-gray-800 text-sm sm-phone:text-base">
											Dark Mode
										</p>
										<p className="text-xs sm-phone:text-sm text-gray-600">
											Toggle dark theme
										</p>
									</div>
								</div>
								<div className="relative flex-shrink-0">
									<input type="checkbox" className="sr-only" />
									<div className="w-10 h-5 sm-phone:w-11 sm-phone:h-6 lg-tablet:w-12 lg-tablet:h-6 bg-gray-300 rounded-full cursor-pointer">
										<div className="w-4 h-4 sm-phone:w-5 sm-phone:h-5 bg-white rounded-full shadow transform translate-x-0.5 translate-y-0.5 transition-transform"></div>
									</div>
								</div>
							</div>

							{/* Push Notifications */}
							<div className="flex items-center justify-between p-3 sm-phone:p-3.5 lg-tablet:p-4 rounded-lg xl-phone:rounded-xl hover:bg-gray-50 transition-colors">
								<div className="flex items-center gap-3 sm-phone:gap-4 flex-1 min-w-0">
									<div className="w-8 h-8 sm-phone:w-9 sm-phone:h-9 lg-tablet:w-10 lg-tablet:h-10 bg-blue-100 rounded-lg xl-phone:rounded-xl flex items-center justify-center flex-shrink-0">
										<Bell className="w-4 h-4 sm-phone:w-4.5 sm-phone:h-4.5 lg-tablet:w-5 lg-tablet:h-5 text-blue-600" />
									</div>
									<div className="min-w-0">
										<p className="font-medium text-gray-800 text-sm sm-phone:text-base">
											Push Notifications
										</p>
										<p className="text-xs sm-phone:text-sm text-gray-600">
											Receive app updates
										</p>
									</div>
								</div>
								<div className="relative flex-shrink-0">
									<input type="checkbox" defaultChecked className="sr-only" />
									<div className="w-10 h-5 sm-phone:w-11 sm-phone:h-6 lg-tablet:w-12 lg-tablet:h-6 bg-blue-500 rounded-full cursor-pointer">
										<div className="w-4 h-4 sm-phone:w-5 sm-phone:h-5 bg-white rounded-full shadow transform translate-x-5 sm-phone:translate-x-5 lg-tablet:translate-x-6 translate-y-0.5 transition-transform"></div>
									</div>
								</div>
							</div>

							{/* Email Notifications */}
							<div className="flex items-center justify-between p-3 sm-phone:p-3.5 lg-tablet:p-4 rounded-lg xl-phone:rounded-xl hover:bg-gray-50 transition-colors">
								<div className="flex items-center gap-3 sm-phone:gap-4 flex-1 min-w-0">
									<div className="w-8 h-8 sm-phone:w-9 sm-phone:h-9 lg-tablet:w-10 lg-tablet:h-10 bg-gray-100 rounded-lg xl-phone:rounded-xl flex items-center justify-center flex-shrink-0">
										<Mail className="w-4 h-4 sm-phone:w-4.5 sm-phone:h-4.5 lg-tablet:w-5 lg-tablet:h-5 text-gray-600" />
									</div>
									<div className="min-w-0">
										<p className="font-medium text-gray-800 text-sm sm-phone:text-base">
											Email Notifications
										</p>
										<p className="text-xs sm-phone:text-sm text-gray-600">
											Weekly digest emails
										</p>
									</div>
								</div>
								<div className="relative flex-shrink-0">
									<input type="checkbox" className="sr-only" />
									<div className="w-10 h-5 sm-phone:w-11 sm-phone:h-6 lg-tablet:w-12 lg-tablet:h-6 bg-gray-300 rounded-full cursor-pointer">
										<div className="w-4 h-4 sm-phone:w-5 sm-phone:h-5 bg-white rounded-full shadow transform translate-x-0.5 translate-y-0.5 transition-transform"></div>
									</div>
								</div>
							</div>

							{/* Public Profile */}
							<div className="flex items-center justify-between p-3 sm-phone:p-3.5 lg-tablet:p-4 rounded-lg xl-phone:rounded-xl hover:bg-gray-50 transition-colors">
								<div className="flex items-center gap-3 sm-phone:gap-4 flex-1 min-w-0">
									<div className="w-8 h-8 sm-phone:w-9 sm-phone:h-9 lg-tablet:w-10 lg-tablet:h-10 bg-purple-100 rounded-lg xl-phone:rounded-xl flex items-center justify-center flex-shrink-0">
										<Globe className="w-4 h-4 sm-phone:w-4.5 sm-phone:h-4.5 lg-tablet:w-5 lg-tablet:h-5 text-purple-600" />
									</div>
									<div className="min-w-0">
										<p className="font-medium text-gray-800 text-sm sm-phone:text-base">
											Public Profile
										</p>
										<p className="text-xs sm-phone:text-sm text-gray-600">
											Make profile visible
										</p>
									</div>
								</div>
								<div className="relative flex-shrink-0">
									<input type="checkbox" defaultChecked className="sr-only" />
									<div className="w-10 h-5 sm-phone:w-11 sm-phone:h-6 lg-tablet:w-12 lg-tablet:h-6 bg-blue-500 rounded-full cursor-pointer">
										<div className="w-4 h-4 sm-phone:w-5 sm-phone:h-5 bg-white rounded-full shadow transform translate-x-5 sm-phone:translate-x-5 lg-tablet:translate-x-6 translate-y-0.5 transition-transform"></div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* Security & Privacy Section */}
				<div className="bg-white rounded-xl lg-tablet:rounded-2xl shadow-lg p-4 sm-phone:p-5 md-phone:p-6 lg-tablet:p-8">
					<div className="flex items-start sm-tablet:items-center gap-3 sm-phone:gap-4 mb-4 sm-phone:mb-6 lg-tablet:mb-8">
						<div className="w-10 h-10 sm-phone:w-12 sm-phone:h-12 lg-tablet:w-14 lg-tablet:h-14 bg-green-500 rounded-lg lg-tablet:rounded-xl flex items-center justify-center flex-shrink-0">
							<Key className="w-5 h-5 sm-phone:w-6 sm-phone:h-6 lg-tablet:w-7 lg-tablet:h-7 text-white" />
						</div>
						<div className="min-w-0">
							<h2 className="text-lg sm-phone:text-xl font-semibold text-gray-800">
								Security & Privacy
							</h2>
							<p className="text-gray-600 text-sm sm-phone:text-base">
								Manage your account security
							</p>
						</div>
					</div>

					<div className="grid grid-cols-1 lg-tablet:grid-cols-2 gap-4 sm-phone:gap-5 lg-tablet:gap-6">
						{/* Change Password */}
						<div className="p-4 sm-phone:p-5 lg-tablet:p-6 border border-gray-200 rounded-lg xl-phone:rounded-xl hover:bg-gray-50 cursor-pointer transition-colors">
							<div className="flex items-center gap-3 sm-phone:gap-4 mb-2 sm-phone:mb-3">
								<Key className="w-5 h-5 sm-phone:w-6 sm-phone:h-6 text-green-600 flex-shrink-0" />
								<h3 className="font-medium text-gray-800 text-base sm-phone:text-lg">
									Change Password
								</h3>
							</div>
							<p className="text-gray-600 text-sm sm-phone:text-base">
								Last updated 30 days ago
							</p>
						</div>

						{/* Two-Factor Authentication */}
						<div className="p-4 sm-phone:p-5 lg-tablet:p-6 border border-gray-200 rounded-lg xl-phone:rounded-xl hover:bg-gray-50 cursor-pointer transition-colors">
							<div className="flex items-center gap-3 sm-phone:gap-4 mb-2 sm-phone:mb-3">
								<Shield className="w-5 h-5 sm-phone:w-6 sm-phone:h-6 text-green-600 flex-shrink-0" />
								<h3 className="font-medium text-gray-800 text-base sm-phone:text-lg">
									Two-Factor Authentication
								</h3>
							</div>
							<p className="text-gray-600 text-sm sm-phone:text-base">
								Enable additional security
							</p>
						</div>
					</div>
				</div>

				{/* Account Management Section */}
				<div className="bg-white rounded-xl lg-tablet:rounded-2xl shadow-lg p-4 sm-phone:p-5 md-phone:p-6 lg-tablet:p-8">
					<div className="flex items-start sm-tablet:items-center gap-3 sm-phone:gap-4 mb-4 sm-phone:mb-6 lg-tablet:mb-8">
						<div className="w-10 h-10 sm-phone:w-12 sm-phone:h-12 lg-tablet:w-14 lg-tablet:h-14 bg-red-500 rounded-lg lg-tablet:rounded-xl flex items-center justify-center flex-shrink-0">
							<Trash2 className="w-5 h-5 sm-phone:w-6 sm-phone:h-6 lg-tablet:w-7 lg-tablet:h-7 text-white" />
						</div>
						<div className="min-w-0">
							<h2 className="text-lg sm-phone:text-xl font-semibold text-gray-800">
								Account Management
							</h2>
							<p className="text-gray-600 text-sm sm-phone:text-base">
								Manage your account settings and data
							</p>
						</div>
					</div>

					{/* Danger Zone */}
					<div className="border border-red-200 rounded-lg xl-phone:rounded-xl p-4 sm-phone:p-5 md-phone:p-6 lg-tablet:p-8 bg-red-50">
						<div className="flex items-center gap-3 sm-phone:gap-4 mb-4 sm-phone:mb-5 lg-tablet:mb-6">
							<div className="w-8 h-8 sm-phone:w-10 sm-phone:h-10 lg-tablet:w-12 lg-tablet:h-12 bg-red-100 rounded-lg xl-phone:rounded-xl flex items-center justify-center flex-shrink-0">
								<Trash2 className="w-4 h-4 sm-phone:w-5 sm-phone:h-5 lg-tablet:w-6 lg-tablet:h-6 text-red-600" />
							</div>
							<h3 className="text-base sm-phone:text-lg font-semibold text-red-800">
								Danger Zone
							</h3>
						</div>
						<p className="text-red-700 mb-4 sm-phone:mb-6 lg-tablet:mb-8 text-sm sm-phone:text-base lg-tablet:text-lg lg-tablet:leading-relaxed">
							Once you delete your account, there is no going back. Please be
							certain before proceeding with this action. All your data will be
							permanently removed.
						</p>
						<div className="flex flex-col sm-tablet:flex-row gap-3 sm-phone:gap-4">
							<button className="bg-red-600 text-white px-4 sm-phone:px-6 lg-tablet:px-8 py-2.5 sm-phone:py-3 rounded-lg xl-phone:rounded-xl font-medium hover:bg-red-700 transition-colors flex items-center justify-center gap-2 text-sm sm-phone:text-base">
								<Trash2 className="w-3.5 h-3.5 sm-phone:w-4 sm-phone:h-4" />
								Delete Account
							</button>
							<button className="bg-red-100 text-red-600 px-4 sm-phone:px-6 lg-tablet:px-8 py-2.5 sm-phone:py-3 rounded-lg xl-phone:rounded-xl font-medium hover:bg-red-200 transition-colors text-sm sm-phone:text-base">
								Export Data First
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
