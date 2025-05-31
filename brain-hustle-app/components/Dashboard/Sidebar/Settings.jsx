"use client";

import React, { useState } from "react";
import {
	User,
	Bell,
	Moon,
	Sun,
	Trash2,
	Edit3,
	Mail,
	Shield,
	Key,
	Globe,
	Camera,
	Palette,
	Download,
	Settings as SettingsIcon,
} from "lucide-react";

const Settings = () => {
	const [darkMode, setDarkMode] = useState(false);
	const [notifications, setNotifications] = useState(true);
	const [emailNotifications, setEmailNotifications] = useState(false);
	const [publicProfile, setPublicProfile] = useState(true);

	const handleDarkModeToggle = () => setDarkMode(!darkMode);
	const handleNotificationsToggle = () => setNotifications(!notifications);
	const handleEmailNotificationsToggle = () =>
		setEmailNotifications(!emailNotifications);
	const handlePublicProfileToggle = () => setPublicProfile(!publicProfile);

	return (
		<div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-2 sm-phone:p-3 md-phone:p-4 sm-tablet:p-6 md-laptop:p-8">
			<div className="w-full max-w-7xl mx-auto">
				{/* Responsive Header */}
				<div className="mb-4 sm-phone:mb-6 md-phone:mb-8 text-center relative">
					<div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 blur-3xl rounded-full"></div>
					<div className="relative">
						<div className="inline-flex items-center gap-2 sm-phone:gap-3 mb-3 sm-phone:mb-4 p-2 sm-phone:p-3 bg-white/40 backdrop-blur-xl rounded-full border border-white/20 shadow-lg">
							<div className="p-1.5 sm-phone:p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full">
								<SettingsIcon
									size={16}
									className="sm-phone:w-5 sm-phone:h-5 text-white"
								/>
							</div>
							<span className="text-slate-600 font-medium text-sm sm-phone:text-base">
								Account Settings
							</span>
						</div>
						<h1 className="text-2xl sm-phone:text-3xl md-phone:text-4xl sm-tablet:text-5xl md-laptop:text-6xl font-bold bg-gradient-to-r from-slate-800 via-blue-600 to-purple-600 bg-clip-text text-transparent mb-2 sm-phone:mb-4">
							Settings
						</h1>
						<p className="text-slate-600 text-sm sm-phone:text-base md-phone:text-lg max-w-2xl mx-auto px-2 sm-phone:px-0">
							Customize your experience and manage your account preferences with
							our intuitive settings panel
						</p>
					</div>
				</div>

				{/* Responsive Settings Grid */}
				<div className="grid gap-3 sm-phone:gap-4 md-phone:gap-6 grid-cols-1 md-laptop:grid-cols-12">
					{/* Profile Card - Responsive */}
					<div className="md-laptop:col-span-8 group relative overflow-hidden">
						<div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 blur-xl"></div>
						<div className="relative bg-white/70 backdrop-blur-xl border border-white/30 rounded-2xl sm-phone:rounded-3xl p-4 sm-phone:p-6 md-phone:p-8 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 hover:scale-[1.02]">
							{/* Responsive Profile Header */}
							<div className="flex flex-col sm-tablet:flex-row sm-tablet:items-center sm-tablet:justify-between mb-6 sm-phone:mb-8 gap-4">
								<div className="flex items-center gap-3 sm-phone:gap-4">
									<div className="relative">
										<div className="p-3 sm-phone:p-4 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl sm-phone:rounded-2xl text-white shadow-lg">
											<User size={20} className="sm-phone:w-7 sm-phone:h-7" />
										</div>
										<div className="absolute -top-1 -right-1 w-3 h-3 sm-phone:w-4 sm-phone:h-4 bg-green-500 rounded-full border-2 border-white animate-pulse"></div>
									</div>
									<div>
										<h3 className="text-lg sm-phone:text-xl md-phone:text-2xl font-bold text-slate-800">
											Profile Information
										</h3>
										<p className="text-slate-500 text-sm sm-phone:text-base">
											Manage your personal details and avatar
										</p>
									</div>
								</div>
								<button className="self-start sm-tablet:self-auto p-2 sm-phone:p-3 bg-slate-100 hover:bg-slate-200 rounded-lg sm-phone:rounded-xl transition-colors">
									<Camera
										size={16}
										className="sm-phone:w-5 sm-phone:h-5 text-slate-600"
									/>
								</button>
							</div>

							{/* Responsive Profile Details */}
							<div className="space-y-3 sm-phone:space-y-4 mb-6 sm-phone:mb-8">
								<div className="group/item flex items-center gap-3 sm-phone:gap-4 p-4 sm-phone:p-5 bg-gradient-to-r from-slate-50/80 to-blue-50/80 rounded-xl sm-phone:rounded-2xl hover:from-blue-50/80 hover:to-indigo-50/80 transition-all duration-300 border border-slate-100/50 hover:border-blue-200/50 hover:shadow-lg">
									<div className="p-2 sm-phone:p-3 bg-white rounded-lg sm-phone:rounded-xl shadow-sm group-hover/item:scale-110 transition-transform">
										<User
											size={14}
											className="sm-phone:w-[18px] sm-phone:h-[18px] text-blue-600"
										/>
									</div>
									<div className="flex-1 min-w-0">
										<p className="font-semibold text-slate-800 text-base sm-phone:text-lg truncate">
											Ayan
										</p>
										<p className="text-xs sm-phone:text-sm text-slate-500">
											Display Name
										</p>
									</div>
									<div className="hidden sm-tablet:block opacity-0 group-hover/item:opacity-100 transition-opacity">
										<Edit3 size={16} className="text-slate-400" />
									</div>
								</div>

								<div className="group/item flex items-center gap-3 sm-phone:gap-4 p-4 sm-phone:p-5 bg-gradient-to-r from-slate-50/80 to-purple-50/80 rounded-xl sm-phone:rounded-2xl hover:from-purple-50/80 hover:to-pink-50/80 transition-all duration-300 border border-slate-100/50 hover:border-purple-200/50 hover:shadow-lg">
									<div className="p-2 sm-phone:p-3 bg-white rounded-lg sm-phone:rounded-xl shadow-sm group-hover/item:scale-110 transition-transform">
										<Mail
											size={14}
											className="sm-phone:w-[18px] sm-phone:h-[18px] text-purple-600"
										/>
									</div>
									<div className="flex-1 min-w-0">
										<p className="font-semibold text-slate-800 text-base sm-phone:text-lg truncate">
											ayan@example.com
										</p>
										<p className="text-xs sm-phone:text-sm text-slate-500">
											Email Address
										</p>
									</div>
									<div className="hidden sm-tablet:block opacity-0 group-hover/item:opacity-100 transition-opacity">
										<Edit3 size={16} className="text-slate-400" />
									</div>
								</div>
							</div>

							{/* Responsive Action Buttons */}
							<div className="flex flex-col sm-tablet:flex-row gap-3">
								<button className="flex-1 bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-4 sm-phone:px-6 py-3 sm-phone:py-4 rounded-xl sm-phone:rounded-2xl font-semibold hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 sm-phone:gap-3 group-hover:scale-[1.02] hover:scale-105 text-sm sm-phone:text-base">
									<Edit3 size={16} className="sm-phone:w-5 sm-phone:h-5" />
									Edit Profile
								</button>
								<button className="px-4 sm-phone:px-6 py-3 sm-phone:py-4 bg-slate-100 hover:bg-slate-200 rounded-xl sm-phone:rounded-2xl font-semibold text-slate-700 transition-all duration-300 flex items-center justify-center gap-2 sm-phone:gap-3 text-sm sm-phone:text-base">
									<Download size={16} className="sm-phone:w-5 sm-phone:h-5" />
									Export
								</button>
							</div>
						</div>
					</div>

					{/* Preferences Card - Responsive */}
					<div className="md-laptop:col-span-4 group relative overflow-hidden">
						<div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 blur-xl"></div>
						<div className="relative bg-white/70 backdrop-blur-xl border border-white/30 rounded-2xl sm-phone:rounded-3xl p-4 sm-phone:p-6 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 h-fit">
							<div className="flex items-center gap-3 mb-6 sm-phone:mb-8">
								<div className="p-3 sm-phone:p-4 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl sm-phone:rounded-2xl text-white shadow-lg">
									<Shield size={20} className="sm-phone:w-7 sm-phone:h-7" />
								</div>
								<div>
									<h3 className="text-lg sm-phone:text-xl md-phone:text-2xl font-bold text-slate-800">
										Preferences
									</h3>
									<p className="text-slate-500 text-sm sm-phone:text-base">
										Customize your experience
									</p>
								</div>
							</div>

							<div className="space-y-4 sm-phone:space-y-6">
								{/* Responsive Toggle Items */}
								{[
									{
										icon: darkMode ? Moon : Sun,
										label: "Dark Mode",
										description: "Toggle dark theme",
										value: darkMode,
										handler: handleDarkModeToggle,
										activeColor: "bg-slate-700",
										inactiveColor: "bg-amber-100",
										iconColor: darkMode ? "text-white" : "text-amber-600",
									},
									{
										icon: Bell,
										label: "Push Notifications",
										description: "Receive app updates",
										value: notifications,
										handler: handleNotificationsToggle,
										activeColor: "bg-blue-100",
										inactiveColor: "bg-slate-100",
										iconColor: notifications
											? "text-blue-600"
											: "text-slate-400",
									},
									{
										icon: Mail,
										label: "Email Notifications",
										description: "Weekly digest emails",
										value: emailNotifications,
										handler: handleEmailNotificationsToggle,
										activeColor: "bg-green-100",
										inactiveColor: "bg-slate-100",
										iconColor: emailNotifications
											? "text-green-600"
											: "text-slate-400",
									},
									{
										icon: Globe,
										label: "Public Profile",
										description: "Make profile visible",
										value: publicProfile,
										handler: handlePublicProfileToggle,
										activeColor: "bg-purple-100",
										inactiveColor: "bg-slate-100",
										iconColor: publicProfile
											? "text-purple-600"
											: "text-slate-400",
									},
								].map((item, index) => (
									<div
										key={index}
										className="group/toggle p-3 sm-phone:p-4 md-phone:p-5 bg-gradient-to-r from-slate-50/80 to-slate-100/80 rounded-xl sm-phone:rounded-2xl border border-slate-100/50 hover:shadow-lg transition-all duration-300 hover:scale-[1.02]"
									>
										<div className="flex items-center justify-between">
											<div className="flex items-center gap-3 sm-phone:gap-4 flex-1 min-w-0">
												<div
													className={`p-2 sm-phone:p-3 rounded-lg sm-phone:rounded-xl ${
														item.value ? item.activeColor : item.inactiveColor
													} transition-all duration-300 group-hover/toggle:scale-110`}
												>
													<item.icon
														size={14}
														className={`sm-phone:w-[18px] sm-phone:h-[18px] ${item.iconColor}`}
													/>
												</div>
												<div className="min-w-0 flex-1">
													<p className="font-semibold text-slate-700 text-sm sm-phone:text-base truncate">
														{item.label}
													</p>
													<p className="text-xs text-slate-500 truncate">
														{item.description}
													</p>
												</div>
											</div>
											<button
												onClick={item.handler}
												className={`relative w-12 h-6 sm-phone:w-14 sm-phone:h-7 rounded-full transition-all duration-300 shadow-inner ${
													item.value
														? "bg-gradient-to-r from-blue-500 to-indigo-600"
														: "bg-slate-300"
												} hover:scale-110 flex-shrink-0`}
											>
												<div
													className={`absolute top-0.5 w-5 h-5 sm-phone:w-6 sm-phone:h-6 bg-white rounded-full shadow-lg transition-all duration-300 ${
														item.value
															? "translate-x-6 sm-phone:translate-x-7"
															: "translate-x-0.5"
													}`}
												/>
											</button>
										</div>
									</div>
								))}
							</div>
						</div>
					</div>

					{/* Security & Privacy Card - Responsive */}
					<div className="md-laptop:col-span-6 group relative overflow-hidden">
						<div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-emerald-500/10 blur-xl"></div>
						<div className="relative bg-white/70 backdrop-blur-xl border border-white/30 rounded-2xl sm-phone:rounded-3xl p-4 sm-phone:p-6 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
							<div className="flex items-center gap-3 mb-4 sm-phone:mb-6">
								<div className="p-3 sm-phone:p-4 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl sm-phone:rounded-2xl text-white shadow-lg">
									<Key size={20} className="sm-phone:w-7 sm-phone:h-7" />
								</div>
								<div>
									<h3 className="text-lg sm-phone:text-xl md-phone:text-2xl font-bold text-slate-800">
										Security & Privacy
									</h3>
									<p className="text-slate-500 text-sm sm-phone:text-base">
										Manage your account security
									</p>
								</div>
							</div>

							<div className="space-y-3 sm-phone:space-y-4">
								<button className="w-full p-3 sm-phone:p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl sm-phone:rounded-2xl border border-green-100 hover:border-green-200 transition-all duration-300 hover:shadow-md text-left group/btn">
									<div className="flex items-center gap-3">
										<div className="p-1.5 sm-phone:p-2 bg-green-100 rounded-lg group-hover/btn:scale-110 transition-transform">
											<Key
												size={14}
												className="sm-phone:w-4 sm-phone:h-4 text-green-600"
											/>
										</div>
										<div className="min-w-0 flex-1">
											<p className="font-semibold text-green-800 text-sm sm-phone:text-base truncate">
												Change Password
											</p>
											<p className="text-xs sm-phone:text-sm text-green-600 truncate">
												Last updated 30 days ago
											</p>
										</div>
									</div>
								</button>

								<button className="w-full p-3 sm-phone:p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl sm-phone:rounded-2xl border border-blue-100 hover:border-blue-200 transition-all duration-300 hover:shadow-md text-left group/btn">
									<div className="flex items-center gap-3">
										<div className="p-1.5 sm-phone:p-2 bg-blue-100 rounded-lg group-hover/btn:scale-110 transition-transform">
											<Shield
												size={14}
												className="sm-phone:w-4 sm-phone:h-4 text-blue-600"
											/>
										</div>
										<div className="min-w-0 flex-1">
											<p className="font-semibold text-blue-800 text-sm sm-phone:text-base truncate">
												Two-Factor Authentication
											</p>
											<p className="text-xs sm-phone:text-sm text-blue-600 truncate">
												Currently enabled
											</p>
										</div>
									</div>
								</button>
							</div>
						</div>
					</div>

					{/* Theme Customization Card - Responsive */}
					<div className="md-laptop:col-span-6 group relative overflow-hidden">
						<div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 to-rose-500/10 blur-xl"></div>
						<div className="relative bg-white/70 backdrop-blur-xl border border-white/30 rounded-2xl sm-phone:rounded-3xl p-4 sm-phone:p-6 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
							<div className="flex items-center gap-3 mb-4 sm-phone:mb-6">
								<div className="p-3 sm-phone:p-4 bg-gradient-to-br from-pink-500 to-rose-600 rounded-xl sm-phone:rounded-2xl text-white shadow-lg">
									<Palette size={20} className="sm-phone:w-7 sm-phone:h-7" />
								</div>
								<div>
									<h3 className="text-lg sm-phone:text-xl md-phone:text-2xl font-bold text-slate-800">
										Theme & Appearance
									</h3>
									<p className="text-slate-500 text-sm sm-phone:text-base">
										Customize your visual experience
									</p>
								</div>
							</div>

							<div className="grid grid-cols-3 gap-2 sm-phone:gap-3 mb-4">
								{[
									{ name: "Blue", colors: "from-blue-400 to-blue-600" },
									{ name: "Purple", colors: "from-purple-400 to-purple-600" },
									{ name: "Green", colors: "from-green-400 to-green-600" },
								].map((theme, index) => (
									<button
										key={index}
										className="group/theme p-2 sm-phone:p-3 bg-slate-50 rounded-lg sm-phone:rounded-xl hover:bg-slate-100 transition-all duration-300 hover:scale-105"
									>
										<div
											className={`w-full h-6 sm-phone:h-8 bg-gradient-to-r ${theme.colors} rounded-md sm-phone:rounded-lg mb-1 sm-phone:mb-2 group-hover/theme:shadow-lg transition-shadow`}
										></div>
										<p className="text-xs font-medium text-slate-600">
											{theme.name}
										</p>
									</button>
								))}
							</div>
						</div>
					</div>

					{/* Enhanced Danger Zone - Responsive */}
					<div className="md-laptop:col-span-12 group relative overflow-hidden">
						<div className="absolute inset-0 bg-gradient-to-br from-red-500/10 to-pink-500/10 blur-xl"></div>
						<div className="relative bg-white/70 backdrop-blur-xl border border-white/30 rounded-2xl sm-phone:rounded-3xl p-4 sm-phone:p-6 md-phone:p-8 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
							<div className="flex items-center gap-3 sm-phone:gap-4 mb-6 sm-phone:mb-8">
								<div className="p-3 sm-phone:p-4 bg-gradient-to-br from-red-500 to-pink-600 rounded-xl sm-phone:rounded-2xl text-white shadow-lg">
									<Trash2 size={20} className="sm-phone:w-7 sm-phone:h-7" />
								</div>
								<div>
									<h3 className="text-lg sm-phone:text-xl md-phone:text-2xl font-bold text-slate-800">
										Account Management
									</h3>
									<p className="text-slate-500 text-sm sm-phone:text-base">
										Manage your account settings and data
									</p>
								</div>
							</div>

							<div className="bg-gradient-to-r from-red-50/80 to-pink-50/80 border border-red-200/50 rounded-xl sm-phone:rounded-2xl p-4 sm-phone:p-6 backdrop-blur-sm">
								<div className="flex flex-col sm-tablet:flex-row items-start gap-4 sm-phone:gap-6">
									<div className="p-2 sm-phone:p-3 bg-gradient-to-br from-red-100 to-red-200 rounded-xl sm-phone:rounded-2xl">
										<Trash2
											size={20}
											className="sm-phone:w-6 sm-phone:h-6 text-red-600"
										/>
									</div>
									<div className="flex-1">
										<h4 className="font-bold text-red-800 mb-2 sm-phone:mb-3 text-lg sm-phone:text-xl">
											Danger Zone
										</h4>
										<p className="text-red-700 mb-4 sm-phone:mb-6 leading-relaxed text-sm sm-phone:text-base">
											Once you delete your account, there is no going back.
											Please be certain before proceeding with this action. All
											your data will be permanently removed.
										</p>
										<div className="flex flex-col sm-tablet:flex-row gap-3">
											<button className="bg-gradient-to-r from-red-500 to-red-600 text-white px-4 sm-phone:px-6 py-3 rounded-lg sm-phone:rounded-xl font-semibold hover:from-red-600 hover:to-red-700 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 sm-phone:gap-3 hover:scale-105 text-sm sm-phone:text-base">
												<Trash2
													size={16}
													className="sm-phone:w-[18px] sm-phone:h-[18px]"
												/>
												Delete Account
											</button>
											<button className="px-4 sm-phone:px-6 py-3 bg-red-100 hover:bg-red-200 text-red-700 rounded-lg sm-phone:rounded-xl font-semibold transition-all duration-300 text-sm sm-phone:text-base">
												Export Data First
											</button>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Settings;
