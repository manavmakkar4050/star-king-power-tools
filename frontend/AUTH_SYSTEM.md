# Star King Power Tools - Auth System Documentation

## Overview
A complete frontend-only authentication and user profile system using localStorage.

## Files Created

### 1. `login.html`
- Login & Register page with tabbed interface
- **Login Tab**: Email + Password fields
- **Register Tab**: Full Name, Email, Phone, Password, Confirm Password
- Validations for all fields
- Auto-login after registration
- Forgot Password link (shows toast notification)

### 2. `profile.html`
- User profile page (requires login)
- Auto-redirects to login.html if not authenticated
- **Profile Header**: Avatar, name, email, phone
- **Edit Profile**: Inline form to update name and phone
- **My Orders**: Displays all orders from localStorage
- **Change Password**: Update password with validation

### 3. `js/auth.js`
- Handles login and registration logic
- Validates email format, password length, password match
- Stores users in localStorage under `starking_users` key
- Shows toast notifications for feedback
- Tab switching functionality

### 4. `js/profile.js`
- Loads and displays user profile data
- Edit profile functionality
- Load and display user orders
- Change password with validation
- Auth check - redirects to login if not authenticated

### 5. Updated `js/main.js`
- Added `updateAuthZone()` function
- Displays login button when logged out
- Shows user avatar and dropdown menu when logged in
- Dropdown includes: My Profile, My Orders, Logout
- Logout functionality clears current user

### 6. Updated `js/cart.js`
- Modified order placement to save to localStorage
- Orders saved under `starking_orders` key
- Associates orders with user ID if logged in

### 7. Updated all HTML files
- Added `<li class="nav-auth-zone"></li>` to navbar
- Updated: index.html, products.html, cart.html, about.html, contact.html, profile.html

### 8. Updated `css/style.css`
- Auth page styling (login/register page)
- Auth card and tab styling
- User menu and dropdown styling
- Profile page styling
- Order card styling
- Toast notification styling
- Responsive design for mobile

## localStorage Schema

### `starking_users` (Array)
```json
[
  {
    "id": 1234567890,
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+91 98765 43210",
    "password": "hashedPassword",
    "createdAt": "2025-03-17T10:30:00Z"
  }
]
```

### `starking_currentUser` (Object)
```json
{
  "id": 1234567890,
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+91 98765 43210",
  "password": "hashedPassword",
  "createdAt": "2025-03-17T10:30:00Z"
}
```

### `starking_orders` (Array)
```json
[
  {
    "id": 1234567890,
    "userId": 1234567890,
    "date": "2025-03-17T10:30:00Z",
    "items": [
      {
        "id": 1,
        "name": "Impact Drill",
        "category": "Drills",
        "price": 4500,
        "qty": 2,
        "image_url": "../images/impact_drill_1.png"
      }
    ],
    "subtotal": 9000,
    "total": 10620,
    "customer_name": "John Doe",
    "customer_email": "john@example.com",
    "customer_phone": "+91 98765 43210"
  }
]
```

## Features

### Login Page
- Email and password validation
- Error messages for invalid credentials
- "Forgot Password?" link (shows toast)
- Switch to Register tab

### Register Page
- Full Name, Email, Phone, Password fields
- Validations:
  - All fields required
  - Valid email format
  - Password minimum 6 characters
  - Confirm password must match
- Duplicate email check
- Auto-login after successful registration

### User Menu (Navbar)
- Shows when logged in
- Avatar with user's first letter
- User's first name displayed
- Dropdown menu with:
  - My Profile
  - My Orders
  - Logout

### Profile Page
- View profile information
- Edit profile (name and phone)
- View all orders with details
- Change password functionality

### Orders
- Saved to localStorage when placed
- Associated with user ID
- Displayed on profile page
- Shows order ID, date, items, and total

## Usage

### Register
1. Go to `login.html`
2. Click "Register" tab
3. Fill in all fields
4. Click "Register"
5. Auto-redirected to home page (logged in)

### Login
1. Go to `login.html`
2. Enter email and password
3. Click "Login"
4. Redirected to home page

### Access Profile
1. Click user avatar in navbar
2. Select "My Profile"
3. View and edit profile information
4. View order history
5. Change password

### Logout
1. Click user avatar in navbar
2. Select "Logout"
3. Redirected to home page (logged out)

## Security Notes
- Passwords are stored in plain text in localStorage (for demo purposes)
- In production, use proper backend authentication and password hashing
- localStorage is accessible to JavaScript, so sensitive data should be handled carefully
- Consider using sessionStorage for temporary data
- Implement HTTPS in production

## Browser Compatibility
- Works in all modern browsers that support localStorage
- Requires JavaScript enabled
- Tested on Chrome, Firefox, Safari, Edge
