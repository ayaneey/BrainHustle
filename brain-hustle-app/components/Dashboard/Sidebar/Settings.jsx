import React, { useState, useCallback, useMemo } from "react";
import {
	User,
	Mail,
	Camera,
	Edit,
	Download,
	Shield,
	Sun,
	Moon,
	Bell,
	Globe,
	Key,
	Trash2,
	X,
	Check,
	AlertTriangle,
	Upload,
} from "lucide-react";

export default function SettingsPage() {
	// State for toggles
	const [darkMode, setDarkMode] = useState(false);
	const [emailNotifications, setEmailNotifications] = useState(false);

	// State for modals
	const [editProfileModal, setEditProfileModal] = useState(false);
	const [deleteAccountModal, setDeleteAccountModal] = useState(false);
	const [exportModal, setExportModal] = useState(false);
	const [changePasswordModal, setChangePasswordModal] = useState(false);
	const [twoFactorModal, setTwoFactorModal] = useState(false);

	// State for 2FA
	const [selectedAuthMethod, setSelectedAuthMethod] = useState(null);
	const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);

	// State for profile editing
	const [profileData, setProfileData] = useState({
		name: "Ayan",
		email: "ayan@example.com",
		avatar: null,
	});
	const [tempProfileData, setTempProfileData] = useState(profileData);
	const [tempAvatar, setTempAvatar] = useState(null);
	const [deleteConfirmText, setDeleteConfirmText] = useState("");

	// Memoized theme classes to prevent recalculation
	const themeClasses = useMemo(
		() => ({
			background: darkMode
				? "bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900"
				: "bg-gradient-to-br from-orange-100 via-purple-50 to-blue-100",
			card: darkMode ? "bg-gray-800 border border-gray-700" : "bg-white",
			text: darkMode ? "text-white" : "text-gray-800",
			subtext: darkMode ? "text-gray-300" : "text-gray-600",
			hover: darkMode ? "hover:bg-gray-700" : "hover:bg-gray-50",
		}),
		[darkMode]
	);

	// Optimized toggle handlers using useCallback
	const handleDarkModeToggle = useCallback(
		() => setDarkMode((prev) => !prev),
		[]
	);
	const handleEmailToggle = useCallback(
		() => setEmailNotifications((prev) => !prev),
		[]
	);

	// Profile edit handlers
	const handleEditProfile = useCallback(() => {
		setTempProfileData(profileData);
		setEditProfileModal(true);
	}, [profileData]);

	const handleSaveProfile = useCallback(() => {
		setProfileData(tempProfileData);
		setEditProfileModal(false);
	}, [tempProfileData]);

	// File upload handler for avatar (camera icon - stores in temp)
	const handleAvatarUpload = useCallback((event) => {
		const file = event.target.files[0];
		if (file && file.type.startsWith("image/")) {
			const reader = new FileReader();
			reader.onload = (e) => {
				setTempAvatar(e.target.result);
			};
			reader.readAsDataURL(file);
		}
	}, []);

	// Save avatar handler
	const handleSaveAvatar = useCallback(() => {
		if (tempAvatar) {
			setProfileData((prev) => ({
				...prev,
				avatar: tempAvatar,
			}));
			setTempAvatar(null);
		}
	}, [tempAvatar]);

	// File upload handler for avatar in modal (only updates temp until save)
	const handleModalAvatarUpload = useCallback((event) => {
		const file = event.target.files[0];
		if (file && file.type.startsWith("image/")) {
			const reader = new FileReader();
			reader.onload = (e) => {
				setTempProfileData((prev) => ({
					...prev,
					avatar: e.target.result,
				}));
			};
			reader.readAsDataURL(file);
		}
	}, []);

	// Security handlers
	const handleChangePassword = useCallback(() => {
		setChangePasswordModal(true);
	}, []);

	const handleTwoFactor = useCallback(() => {
		setTwoFactorModal(true);
		setSelectedAuthMethod(null);
	}, []);

	const handleEnable2FA = useCallback(() => {
		if (selectedAuthMethod) {
			setTwoFactorEnabled(true);
			alert(`Two-factor authentication enabled via ${selectedAuthMethod}!`);
			setTwoFactorModal(false);
			setSelectedAuthMethod(null);
		} else {
			alert("Please select an authentication method first.");
		}
	}, [selectedAuthMethod]);

	// Export handler
	const handleExportData = useCallback(() => {
		setExportModal(true);
		setTimeout(() => {
			const data = {
				profile: profileData,
				settings: {
					darkMode,
					emailNotifications,
				},
				exportDate: new Date().toISOString(),
			};

			const blob = new Blob([JSON.stringify(data, null, 2)], {
				type: "application/json",
			});
			const url = URL.createObjectURL(blob);
			const a = document.createElement("a");
			a.href = url;
			a.download = "user-data-export.json";
			document.body.appendChild(a);
			a.click();
			document.body.removeChild(a);
			URL.revokeObjectURL(url);

			setExportModal(false);
		}, 2000);
	}, [profileData, darkMode, emailNotifications]);

	// Delete account handler
	const handleDeleteAccount = useCallback(() => {
		if (deleteConfirmText === "DELETE") {
			alert(
				"Account deletion confirmed - this would delete the account in a real app"
			);
			setDeleteAccountModal(false);
			setDeleteConfirmText("");
		}
	}, [deleteConfirmText]);

	// Toggle Switch Component (memoized)
	const ToggleSwitch = React.memo(({ checked, onChange }) => (
		<div className="relative flex-shrink-0">
			<input
				type="checkbox"
				className="sr-only"
				checked={checked}
				onChange={onChange}
			/>
			<div
				className={`w-10 h-5 sm-phone:w-11 sm-phone:h-6 lg-tablet:w-12 lg-tablet:h-6 rounded-full cursor-pointer transition-colors ${
					checked ? "bg-blue-500" : "bg-gray-300"
				}`}
				onClick={onChange}
			>
				<div
					className={`w-4 h-4 sm-phone:w-5 sm-phone:h-5 bg-white rounded-full shadow transform translate-y-0.5 transition-transform ${
						checked
							? "translate-x-5 sm-phone:translate-x-5 lg-tablet:translate-x-6"
							: "translate-x-0.5"
					}`}
				></div>
			</div>
		</div>
	));

	// Modal Component
	const Modal = ({ isOpen, onClose, title, children }) => {
		if (!isOpen) return null;

		return (
			<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
				<div className="bg-white rounded-xl max-w-md w-full max-h-96 overflow-y-auto">
					<div className="flex items-center justify-between p-6 border-b">
						<h3 className="text-lg font-semibold text-gray-800">{title}</h3>
						<button
							onClick={onClose}
							className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
						>
							<X className="w-5 h-5 text-gray-500" />
						</button>
					</div>
					<div className="p-6">{children}</div>
				</div>
			</div>
		);
	};

	return (
		<div
			className={`min-h-screen transition-colors duration-300 ${themeClasses.background}`}
		>
			<div className="w-full max-w-6xl mx-auto p-4 sm-phone:p-5 md-phone:p-6 lg-tablet:p-8 space-y-4 sm-phone:space-y-5 md-phone:space-y-6 lg-tablet:space-y-8">
				{/* Header */}
				<div className="text-center mb-6 sm-phone:mb-8 md-phone:mb-10 lg-tablet:mb-12">
					<h1
						className={`text-2xl sm-phone:text-3xl md-phone:text-3xl lg-tablet:text-4xl font-bold mb-2 sm-phone:mb-3 ${themeClasses.text}`}
					>
						Settings
					</h1>
				</div>

				{/* Main Content Grid */}
				<div className="grid grid-cols-1 2xl-tablet:grid-cols-2 gap-4 sm-phone:gap-5 md-phone:gap-6 lg-tablet:gap-8">
					{/* Profile Information Card */}
					<div
						className={`rounded-xl lg-tablet:rounded-2xl shadow-lg p-4 sm-phone:p-5 md-phone:p-6 lg-tablet:p-8 h-fit ${themeClasses.card}`}
					>
						<div className="flex items-start sm-tablet:items-center gap-3 sm-phone:gap-4 mb-4 sm-phone:mb-6 lg-tablet:mb-8">
							<div className="w-10 h-10 sm-phone:w-12 sm-phone:h-12 lg-tablet:w-14 lg-tablet:h-14 bg-blue-500 rounded-lg lg-tablet:rounded-xl flex items-center justify-center flex-shrink-0">
								<User className="w-5 h-5 sm-phone:w-6 sm-phone:h-6 lg-tablet:w-7 lg-tablet:h-7 text-white" />
							</div>
							<div className="flex-1 min-w-0">
								<h2
									className={`text-lg sm-phone:text-xl font-semibold ${themeClasses.text}`}
								>
									Profile Information
								</h2>
								<p
									className={`text-sm sm-phone:text-base ${themeClasses.subtext}`}
								>
									Manage your personal details and avatar
								</p>
							</div>
							<div className="relative">
								<input
									type="file"
									accept="image/*"
									onChange={handleAvatarUpload}
									className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
									title="Upload profile picture"
								/>
								<Camera
									className={`w-4 h-4 sm-phone:w-5 sm-phone:h-5 cursor-pointer hover:text-blue-500 flex-shrink-0 transition-colors ${
										darkMode ? "text-gray-400" : "text-gray-400"
									}`}
								/>
							</div>
						</div>

						{/* Avatar Preview */}
						{(profileData.avatar || tempAvatar) && (
							<div className="mb-4 text-center">
								<img
									src={tempAvatar || profileData.avatar}
									alt="Profile avatar"
									className="w-16 h-16 sm-phone:w-20 sm-phone:h-20 rounded-full mx-auto object-cover border-2 border-blue-500"
								/>
								{tempAvatar && (
									<button
										onClick={handleSaveAvatar}
										className="mt-2 bg-green-500 text-white px-3 py-1.5 rounded-lg hover:bg-green-600 transition-colors text-sm flex items-center gap-1 mx-auto"
									>
										<Check className="w-3 h-3" />
										Save Avatar
									</button>
								)}
							</div>
						)}

						{/* Profile Details */}
						<div className="space-y-4 sm-phone:space-y-5 lg-tablet:space-y-6 mb-4 sm-phone:mb-6 lg-tablet:mb-8">
							<div className="flex items-center gap-3 sm-phone:gap-4">
								<User
									className={`w-4 h-4 sm-phone:w-5 sm-phone:h-5 flex-shrink-0 ${
										darkMode ? "text-gray-400" : "text-gray-400"
									}`}
								/>
								<div className="min-w-0">
									<p
										className={`text-xs sm-phone:text-sm ${themeClasses.subtext}`}
									>
										Display Name
									</p>
									<p
										className={`font-medium text-sm sm-phone:text-base lg-tablet:text-lg ${themeClasses.text}`}
									>
										{profileData.name}
									</p>
								</div>
							</div>
							<div className="flex items-center gap-3 sm-phone:gap-4">
								<Mail
									className={`w-4 h-4 sm-phone:w-5 sm-phone:h-5 flex-shrink-0 ${
										darkMode ? "text-gray-400" : "text-gray-400"
									}`}
								/>
								<div className="min-w-0">
									<p
										className={`text-xs sm-phone:text-sm ${themeClasses.subtext}`}
									>
										Email Address
									</p>
									<p
										className={`font-medium text-sm sm-phone:text-base lg-tablet:text-lg break-all ${themeClasses.text}`}
									>
										{profileData.email}
									</p>
								</div>
							</div>
						</div>

						{/* Action Buttons */}
						<div className="flex flex-col sm-tablet:flex-row gap-3 sm-phone:gap-4">
							<button
								onClick={handleEditProfile}
								className="flex-1 bg-blue-500 text-white px-4 sm-phone:px-6 py-2.5 sm-phone:py-3 rounded-lg xl-phone:rounded-xl font-medium hover:bg-blue-600 transition-colors flex items-center justify-center gap-2 text-sm sm-phone:text-base"
							>
								<Edit className="w-3.5 h-3.5 sm-phone:w-4 sm-phone:h-4" />
								Edit Profile
							</button>
							<button
								onClick={handleExportData}
								className={`px-4 sm-phone:px-6 py-2.5 sm-phone:py-3 border rounded-lg xl-phone:rounded-xl font-medium hover:bg-opacity-50 transition-colors flex items-center justify-center gap-2 text-sm sm-phone:text-base ${
									darkMode
										? "border-gray-600 text-gray-300 hover:bg-gray-700"
										: "border-gray-300 text-gray-700 hover:bg-gray-50"
								}`}
							>
								<Download className="w-3.5 h-3.5 sm-phone:w-4 sm-phone:h-4" />
								Export
							</button>
						</div>
					</div>

					{/* Preferences Card */}
					<div
						className={`rounded-xl lg-tablet:rounded-2xl shadow-lg p-4 sm-phone:p-5 md-phone:p-6 lg-tablet:p-8 ${themeClasses.card}`}
					>
						<div className="flex items-start sm-tablet:items-center gap-3 sm-phone:gap-4 mb-4 sm-phone:mb-6 lg-tablet:mb-8">
							<div className="w-10 h-10 sm-phone:w-12 sm-phone:h-12 lg-tablet:w-14 lg-tablet:h-14 bg-purple-500 rounded-lg lg-tablet:rounded-xl flex items-center justify-center flex-shrink-0">
								<Shield className="w-5 h-5 sm-phone:w-6 sm-phone:h-6 lg-tablet:w-7 lg-tablet:h-7 text-white" />
							</div>
							<div className="min-w-0">
								<h2
									className={`text-lg sm-phone:text-xl font-semibold ${themeClasses.text}`}
								>
									Preferences
								</h2>
								<p
									className={`text-sm sm-phone:text-base ${themeClasses.subtext}`}
								>
									Customise your experience
								</p>
							</div>
						</div>

						{/* Settings List */}
						<div className="space-y-2 sm-phone:space-y-3 lg-tablet:space-y-4">
							{/* Dark Mode */}
							<div
								className={`flex items-center justify-between p-3 sm-phone:p-3.5 lg-tablet:p-4 rounded-lg xl-phone:rounded-xl hover:bg-opacity-50 transition-colors cursor-pointer ${themeClasses.hover}`}
							>
								<div className="flex items-center gap-3 sm-phone:gap-4 flex-1 min-w-0">
									<div
										className={`w-8 h-8 sm-phone:w-9 sm-phone:h-9 lg-tablet:w-10 lg-tablet:h-10 rounded-lg xl-phone:rounded-xl flex items-center justify-center flex-shrink-0 ${
											darkMode ? "bg-blue-900" : "bg-yellow-100"
										}`}
									>
										{darkMode ? (
											<Moon className="w-4 h-4 sm-phone:w-4.5 sm-phone:h-4.5 lg-tablet:w-5 lg-tablet:h-5 text-blue-400" />
										) : (
											<Sun className="w-4 h-4 sm-phone:w-4.5 sm-phone:h-4.5 lg-tablet:w-5 lg-tablet:h-5 text-yellow-600" />
										)}
									</div>
									<div className="min-w-0">
										<p
											className={`font-medium text-sm sm-phone:text-base ${themeClasses.text}`}
										>
											Dark Mode
										</p>
										<p
											className={`text-xs sm-phone:text-sm ${themeClasses.subtext}`}
										>
											Toggle dark theme
										</p>
									</div>
								</div>
								<ToggleSwitch
									checked={darkMode}
									onChange={handleDarkModeToggle}
								/>
							</div>

							{/* Email Notifications */}
							<div
								className={`flex items-center justify-between p-3 sm-phone:p-3.5 lg-tablet:p-4 rounded-lg xl-phone:rounded-xl hover:bg-opacity-50 transition-colors cursor-pointer ${themeClasses.hover}`}
							>
								<div className="flex items-center gap-3 sm-phone:gap-4 flex-1 min-w-0">
									<div
										className={`w-8 h-8 sm-phone:w-9 sm-phone:h-9 lg-tablet:w-10 lg-tablet:h-10 rounded-lg xl-phone:rounded-xl flex items-center justify-center flex-shrink-0 ${
											darkMode ? "bg-gray-700" : "bg-gray-100"
										}`}
									>
										<Mail
											className={`w-4 h-4 sm-phone:w-4.5 sm-phone:h-4.5 lg-tablet:w-5 lg-tablet:h-5 ${
												darkMode ? "text-gray-400" : "text-gray-600"
											}`}
										/>
									</div>
									<div className="min-w-0">
										<p
											className={`font-medium text-sm sm-phone:text-base ${themeClasses.text}`}
										>
											Email Notifications
										</p>
										<p
											className={`text-xs sm-phone:text-sm ${themeClasses.subtext}`}
										>
											Weekly digest emails
										</p>
									</div>
								</div>
								<ToggleSwitch
									checked={emailNotifications}
									onChange={handleEmailToggle}
								/>
							</div>
						</div>
					</div>
				</div>

				{/* Security & Privacy Section */}
				<div
					className={`rounded-xl lg-tablet:rounded-2xl shadow-lg p-4 sm-phone:p-5 md-phone:p-6 lg-tablet:p-8 ${themeClasses.card}`}
				>
					<div className="flex items-start sm-tablet:items-center gap-3 sm-phone:gap-4 mb-4 sm-phone:mb-6 lg-tablet:mb-8">
						<div className="w-10 h-10 sm-phone:w-12 sm-phone:h-12 lg-tablet:w-14 lg-tablet:h-14 bg-green-500 rounded-lg lg-tablet:rounded-xl flex items-center justify-center flex-shrink-0">
							<Key className="w-5 h-5 sm-phone:w-6 sm-phone:h-6 lg-tablet:w-7 lg-tablet:h-7 text-white" />
						</div>
						<div className="min-w-0">
							<h2
								className={`text-lg sm-phone:text-xl font-semibold ${themeClasses.text}`}
							>
								Security & Privacy
							</h2>
							<p
								className={`text-sm sm-phone:text-base ${themeClasses.subtext}`}
							>
								Manage your account security
							</p>
						</div>
					</div>

					<div className="grid grid-cols-1 lg-tablet:grid-cols-2 gap-4 sm-phone:gap-5 lg-tablet:gap-6">
						{/* Change Password */}
						<button
							onClick={handleChangePassword}
							className={`p-4 sm-phone:p-5 lg-tablet:p-6 border rounded-lg xl-phone:rounded-xl hover:bg-opacity-50 cursor-pointer transition-colors text-left ${
								darkMode
									? "border-gray-600 hover:bg-gray-700"
									: "border-gray-200 hover:bg-gray-50"
							}`}
						>
							<div className="flex items-center gap-3 sm-phone:gap-4 mb-2 sm-phone:mb-3">
								<Key className="w-5 h-5 sm-phone:w-6 sm-phone:h-6 text-green-600 flex-shrink-0" />
								<h3
									className={`font-medium text-base sm-phone:text-lg ${themeClasses.text}`}
								>
									Change Password
								</h3>
							</div>
							<p
								className={`text-sm sm-phone:text-base ${themeClasses.subtext}`}
							>
								Last updated 30 days ago
							</p>
						</button>

						{/* Two-Factor Authentication */}
						<button
							onClick={handleTwoFactor}
							className={`p-4 sm-phone:p-5 lg-tablet:p-6 border rounded-lg xl-phone:rounded-xl hover:bg-opacity-50 cursor-pointer transition-colors text-left ${
								darkMode
									? "border-gray-600 hover:bg-gray-700"
									: "border-gray-200 hover:bg-gray-50"
							}`}
						>
							<div className="flex items-center gap-3 sm-phone:gap-4 mb-2 sm-phone:mb-3">
								<Shield className="w-5 h-5 sm-phone:w-6 sm-phone:h-6 text-green-600 flex-shrink-0" />
								<h3
									className={`font-medium text-base sm-phone:text-lg ${themeClasses.text}`}
								>
									Two-Factor Authentication
								</h3>
							</div>
							<p
								className={`text-sm sm-phone:text-base ${themeClasses.subtext}`}
							>
								{twoFactorEnabled
									? "Currently enabled"
									: "Enable additional security"}
							</p>
						</button>
					</div>
				</div>

				{/* Account Management Section */}
				<div
					className={`rounded-xl lg-tablet:rounded-2xl shadow-lg p-4 sm-phone:p-5 md-phone:p-6 lg-tablet:p-8 ${themeClasses.card}`}
				>
					<div className="flex items-start sm-tablet:items-center gap-3 sm-phone:gap-4 mb-4 sm-phone:mb-6 lg-tablet:mb-8">
						<div className="w-10 h-10 sm-phone:w-12 sm-phone:h-12 lg-tablet:w-14 lg-tablet:h-14 bg-red-500 rounded-lg lg-tablet:rounded-xl flex items-center justify-center flex-shrink-0">
							<Trash2 className="w-5 h-5 sm-phone:w-6 sm-phone:h-6 lg-tablet:w-7 lg-tablet:h-7 text-white" />
						</div>
						<div className="min-w-0">
							<h2
								className={`text-lg sm-phone:text-xl font-semibold ${themeClasses.text}`}
							>
								Account Management
							</h2>
							<p
								className={`text-sm sm-phone:text-base ${themeClasses.subtext}`}
							>
								Manage your account settings and data
							</p>
						</div>
					</div>

					{/* Danger Zone */}
					<div
						className={`border rounded-lg xl-phone:rounded-xl p-4 sm-phone:p-5 md-phone:p-6 lg-tablet:p-8 ${
							darkMode
								? "border-red-800 bg-red-900 bg-opacity-20"
								: "border-red-200 bg-red-50"
						}`}
					>
						<div className="flex items-center gap-3 sm-phone:gap-4 mb-4 sm-phone:mb-5 lg-tablet:mb-6">
							<div
								className={`w-8 h-8 sm-phone:w-10 sm-phone:h-10 lg-tablet:w-12 lg-tablet:h-12 rounded-lg xl-phone:rounded-xl flex items-center justify-center flex-shrink-0 ${
									darkMode ? "bg-red-900" : "bg-red-100"
								}`}
							>
								<Trash2 className="w-4 h-4 sm-phone:w-5 sm-phone:h-5 lg-tablet:w-6 lg-tablet:h-6 text-red-600" />
							</div>
							<h3
								className={`text-base sm-phone:text-lg font-semibold ${
									darkMode ? "text-red-400" : "text-red-800"
								}`}
							>
								Danger Zone
							</h3>
						</div>
						<p
							className={`mb-4 sm-phone:mb-6 lg-tablet:mb-8 text-sm sm-phone:text-base lg-tablet:text-lg lg-tablet:leading-relaxed ${
								darkMode ? "text-red-300" : "text-red-700"
							}`}
						>
							Once you delete your account, there is no going back. Please be
							certain before proceeding with this action. All your data will be
							permanently removed.
						</p>
						<div className="flex flex-col sm-tablet:flex-row gap-3 sm-phone:gap-4">
							<button
								onClick={() => setDeleteAccountModal(true)}
								className="bg-red-600 text-white px-4 sm-phone:px-6 lg-tablet:px-8 py-2.5 sm-phone:py-3 rounded-lg xl-phone:rounded-xl font-medium hover:bg-red-700 transition-colors flex items-center justify-center gap-2 text-sm sm-phone:text-base"
							>
								<Trash2 className="w-3.5 h-3.5 sm-phone:w-4 sm-phone:h-4" />
								Delete Account
							</button>
							<button
								onClick={handleExportData}
								className={`px-4 sm-phone:px-6 lg-tablet:px-8 py-2.5 sm-phone:py-3 rounded-lg xl-phone:rounded-xl font-medium hover:bg-red-200 transition-colors text-sm sm-phone:text-base ${
									darkMode
										? "bg-red-800 text-red-200 hover:bg-red-700"
										: "bg-red-100 text-red-600"
								}`}
							>
								Export Data First
							</button>
						</div>
					</div>
				</div>
			</div>

			{/* Edit Profile Modal */}
			<Modal
				isOpen={editProfileModal}
				onClose={() => setEditProfileModal(false)}
				title="Edit Profile"
			>
				<div className="space-y-4">
					{/* Avatar Upload */}
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-2">
							Profile Picture
						</label>
						<div className="flex items-center gap-4">
							{tempProfileData.avatar ? (
								<img
									src={tempProfileData.avatar}
									alt="Avatar"
									className="w-16 h-16 rounded-full object-cover border-2 border-gray-300"
								/>
							) : (
								<div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center">
									<User className="w-8 h-8 text-gray-400" />
								</div>
							)}
							<div className="relative">
								<input
									type="file"
									accept="image/*"
									onChange={handleModalAvatarUpload}
									className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
								/>
								<button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2">
									<Upload className="w-4 h-4" />
									Upload
								</button>
							</div>
						</div>
					</div>
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-2">
							Display Name
						</label>
						<input
							type="text"
							value={tempProfileData.name}
							onChange={(e) =>
								setTempProfileData({ ...tempProfileData, name: e.target.value })
							}
							className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
						/>
					</div>
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-2">
							Email Address
						</label>
						<input
							type="email"
							value={tempProfileData.email}
							onChange={(e) =>
								setTempProfileData({
									...tempProfileData,
									email: e.target.value,
								})
							}
							className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
						/>
					</div>
					<div className="flex gap-3 pt-4">
						<button
							onClick={handleSaveProfile}
							className="flex-1 bg-blue-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-600 transition-colors flex items-center justify-center gap-2"
						>
							<Check className="w-4 h-4" />
							Save Changes
						</button>
						<button
							onClick={() => setEditProfileModal(false)}
							className="px-4 py-2 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors"
						>
							Cancel
						</button>
					</div>
				</div>
			</Modal>

			{/* Change Password Modal */}
			<Modal
				isOpen={changePasswordModal}
				onClose={() => setChangePasswordModal(false)}
				title="Change Password"
			>
				<div className="space-y-4">
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-2">
							Current Password
						</label>
						<input
							type="password"
							className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
							placeholder="Enter current password"
						/>
					</div>
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-2">
							New Password
						</label>
						<input
							type="password"
							className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
							placeholder="Enter new password"
						/>
					</div>
					<div>
						<label className="block text-sm font-medium text-gray-700 mb-2">
							Confirm New Password
						</label>
						<input
							type="password"
							className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
							placeholder="Confirm new password"
						/>
					</div>
					<div className="flex gap-3 pt-4">
						<button
							onClick={() => {
								alert("Password changed successfully!");
								setChangePasswordModal(false);
							}}
							className="flex-1 bg-green-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-600 transition-colors"
						>
							Update Password
						</button>
						<button
							onClick={() => setChangePasswordModal(false)}
							className="px-4 py-2 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors"
						>
							Cancel
						</button>
					</div>
				</div>
			</Modal>

			{/* Two Factor Modal */}
			<Modal
				isOpen={twoFactorModal}
				onClose={() => setTwoFactorModal(false)}
				title="Two-Factor Authentication"
			>
				<div className="space-y-4">
					<div className="text-center">
						<div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center mb-4">
							<Shield className="w-8 h-8 text-green-600" />
						</div>
						<h3 className="text-lg font-semibold text-gray-800 mb-2">
							Secure Your Account
						</h3>
						<p className="text-gray-600 text-sm mb-4">
							Enable two-factor authentication to add an extra layer of security
							to your account.
						</p>
					</div>
					<div className="space-y-3">
						<button
							onClick={() => setSelectedAuthMethod("SMS")}
							className={`w-full p-3 border rounded-lg transition-colors text-left ${
								selectedAuthMethod === "SMS"
									? "border-green-500 bg-green-50"
									: "border-gray-300 hover:bg-gray-50"
							}`}
						>
							<div className="flex items-center justify-between">
								<div>
									<div className="font-medium text-gray-800">
										SMS Authentication
									</div>
									<div className="text-sm text-gray-600">
										Receive codes via text message
									</div>
								</div>
								{selectedAuthMethod === "SMS" && (
									<Check className="w-5 h-5 text-green-600" />
								)}
							</div>
						</button>
						<button
							onClick={() => setSelectedAuthMethod("Authenticator App")}
							className={`w-full p-3 border rounded-lg transition-colors text-left ${
								selectedAuthMethod === "Authenticator App"
									? "border-green-500 bg-green-50"
									: "border-gray-300 hover:bg-gray-50"
							}`}
						>
							<div className="flex items-center justify-between">
								<div>
									<div className="font-medium text-gray-800">
										Authenticator App
									</div>
									<div className="text-sm text-gray-600">
										Use Google Authenticator or similar
									</div>
								</div>
								{selectedAuthMethod === "Authenticator App" && (
									<Check className="w-5 h-5 text-green-600" />
								)}
							</div>
						</button>
					</div>
					<div className="flex gap-3 pt-4">
						<button
							onClick={handleEnable2FA}
							className={`flex-1 px-4 py-2 rounded-lg font-medium transition-colors ${
								selectedAuthMethod
									? "bg-green-500 text-white hover:bg-green-600"
									: "bg-gray-300 text-gray-500 cursor-not-allowed"
							}`}
							disabled={!selectedAuthMethod}
						>
							Enable 2FA
						</button>
						<button
							onClick={() => setTwoFactorModal(false)}
							className="px-4 py-2 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors"
						>
							Later
						</button>
					</div>
				</div>
			</Modal>

			{/* Delete Account Modal */}
			<Modal
				isOpen={deleteAccountModal}
				onClose={() => setDeleteAccountModal(false)}
				title="Delete Account"
			>
				<div className="space-y-4">
					<div className="flex items-center gap-3 p-4 bg-red-50 rounded-lg">
						<AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0" />
						<p className="text-red-800 text-sm">
							This action cannot be undone. All your data will be permanently
							deleted.
						</p>
					</div>
					<p className="text-gray-600 text-sm">
						Type "DELETE" to confirm account deletion:
					</p>
					<input
						type="text"
						value={deleteConfirmText}
						onChange={(e) => setDeleteConfirmText(e.target.value)}
						placeholder="Type DELETE here"
						className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
					/>
					<div className="flex gap-3 pt-4">
						<button
							onClick={handleDeleteAccount}
							disabled={deleteConfirmText !== "DELETE"}
							className="flex-1 bg-red-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-red-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
						>
							Delete Account
						</button>
						<button
							onClick={() => {
								setDeleteAccountModal(false);
								setDeleteConfirmText("");
							}}
							className="px-4 py-2 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors"
						>
							Cancel
						</button>
					</div>
				</div>
			</Modal>

			{/* Export Modal */}
			<Modal
				isOpen={exportModal}
				onClose={() => setExportModal(false)}
				title="Exporting Data"
			>
				<div className="text-center space-y-4">
					<div className="w-16 h-16 mx-auto bg-blue-100 rounded-full flex items-center justify-center">
						<Download className="w-8 h-8 text-blue-600 animate-bounce" />
					</div>
					<p className="text-gray-600">
						Preparing your data export. This may take a few moments...
					</p>
					<div className="w-full bg-gray-200 rounded-full h-2">
						<div className="bg-blue-600 h-2 rounded-full animate-pulse w-3/4"></div>
					</div>
				</div>
			</Modal>
		</div>
	);
}
