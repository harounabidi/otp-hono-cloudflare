# OTP Cloudflare Worker

A modern, minimal One-Time Password (OTP) authentication system built on Cloudflare Workers using Hono, Zod, and ZeptoMail. Features a complete authentication flow with email-based OTP verification, JWT session management, and comprehensive security measures.

---

## Features

- **📧 Email-based OTP authentication** with 6-digit codes
- **🛡️ Advanced rate limiting and cooldowns** to prevent abuse
- **🔐 JWT-based session management** with secure cookies
- **⚡ Cloudflare KV storage** for OTP and session data
- **🎨 Modern UI** with TailwindCSS and dark theme
- **📱 Responsive design** with mobile-first approach
- **🔒 Security features**: CSRF protection, secure headers, input validation
- **♻️ Token refresh** mechanism for extended sessions
- **🚫 Admin panel** with logout functionality

---

## Security Features

- **Rate limiting**: Maximum 5 OTP requests per email with 1-minute cooldown
- **Retry protection**: Maximum 5 verification attempts with 1-hour lockout
- **OTP expiration**: Codes expire after 5 minutes
- **JWT security**: HTTP-only cookies with secure flags in production
- **Input validation**: Zod schemas for all user inputs
- **Password hashing**: SHA-256 for OTP storage
- **CSRF protection**: Built-in CSRF middleware

---

## Project Structure

```txt
bun.lock                # Bun lock file
package.json           # Dependencies and scripts
tsconfig.json          # TypeScript configuration
wrangler.jsonc         # Cloudflare Worker configuration
components/            # UI components
  icons/
    loader.tsx         # Loading spinner component
schemas/               # Input validation schemas
  auth.ts              # Login and verify schemas with Zod
server/                # Server configuration
  app.ts               # Main Hono app setup with middleware
  middleware.ts        # JWT authentication middleware
src/                   # Main application code
  index.ts             # Entry point and route registration
  script.ts            # Client-side JavaScript for forms
  pages/               # JSX page components
    admin.tsx          # Admin dashboard page
    home.tsx           # Login form page
    layout.tsx         # Shared layout component
    not-found.tsx      # 404 error page
  routes/              # API and page route handlers
    admin.ts           # Admin page route
    index.ts           # Home page route
    api/               # API endpoints
      logout.ts        # User logout handler
      send-otp.ts      # OTP generation and email sending
      verify-otp.ts    # OTP verification and login
styles/                # Styling
  index.css            # TailwindCSS configuration and theme
templates/             # Email templates
  mail.ts              # HTML email template for OTP
types/                 # TypeScript type definitions
  env.ts               # Environment variables interface
utils/                 # Utility functions
  constants.ts         # Application constants and timeouts
  hash.ts              # SHA-256 hashing utilities
  kv.ts                # Cloudflare KV operations
  mail.ts              # Email sending and cooldown logic
  random.ts            # Secure OTP generation
```

---

## Technology Stack

- **Runtime**: Cloudflare Workers
- **Framework**: Hono.js (lightweight web framework)
- **Package Manager**: Bun
- **Language**: TypeScript
- **Validation**: Zod schemas
- **Styling**: TailwindCSS 4.x
- **Storage**: Cloudflare KV
- **Email Service**: ZeptoMail
- **Authentication**: JWT with HTTP-only cookies
- **Security**: Built-in CSRF protection

---

## Setup & Development

### Prerequisites

- Bun runtime installed
- Cloudflare account with Workers enabled
- ZeptoMail account for email service
- Cloudflare KV namespace created

### Installation

1. **Clone and install dependencies:**

   ```sh
   git clone https://github.com/harounabidi/otp-hono-cloudflare.git
   cd otp-hono-cloudflare
   bun install
   ```

2. **Configure environment variables:**

   Create `.dev.vars` file:

   ```env
   ZEPTOMAIL_API_URL=https://api.zeptomail.com/v1.1/email
   ZEPTOMAIL_TOKEN=your_zeptomail_token
   ZEPTOMAIL_FROM=noreply@yourdomain.com
   JWT_SECRET=your_super_secure_jwt_secret
   NODE_ENV=development
   ```

3. **Update Cloudflare configuration:**

   Update `wrangler.jsonc` with your KV namespace ID:

   ```jsonc
   {
     "kv_namespaces": [
       {
         "binding": "KV",
         "id": "your_kv_namespace_id"
       }
     ]
   }
   ```

### Development Commands

1. **Start development server:**

   ```sh
   bun run dev
   ```

   This command runs:

   - Wrangler dev server with live reload
   - TypeScript compilation in watch mode
   - TailwindCSS compilation in watch mode

2. **Build for production:**

   ```sh
   bun run build
   ```

3. **Deploy to Cloudflare:**

   ```sh
   bun run deploy
   ```

4. **Generate Cloudflare types:**

   ```sh
   bun run cf-typegen
   ```

---

## Environment Variables

Configure these variables in `.dev.vars` (development) or Cloudflare Worker settings (production):

| Variable            | Description                               | Example                                |
| ------------------- | ----------------------------------------- | -------------------------------------- |
| `ZEPTOMAIL_API_URL` | ZeptoMail API endpoint                    | `https://api.zeptomail.com/v1.1/email` |
| `ZEPTOMAIL_TOKEN`   | ZeptoMail API authentication token        | `your_zeptomail_token`                 |
| `ZEPTOMAIL_FROM`    | Email sender address                      | `noreply@yourdomain.com`               |
| `JWT_SECRET`        | Secret key for JWT signing (min 32 chars) | `your_super_secure_jwt_secret`         |
| `NODE_ENV`          | Environment mode                          | `development` or `production`          |

---

## API Endpoints

### Authentication Flow

1. **Send OTP** → 2. **Verify OTP** → 3. **Access Protected Routes**

### `POST /api/login`

Initiates the OTP authentication process by sending a 6-digit code to the user's email.

- **Request Body:**

  ```json
  {
    "email": "user@example.com"
  }
  ```

- **Success Response (200):**

  ```json
  {
    "success": true
  }
  ```

- **Error Responses:**

  - `400`: Invalid email format
  - `429`: Rate limit exceeded (too many requests or on cooldown)

- **Rate Limits:**
  - Maximum 5 OTP requests per email
  - 1-minute cooldown between requests
  - OTP expires after 5 minutes

### `POST /api/verify`

Verifies the OTP code and creates an authenticated session.

- **Request Body:**

  ```json
  {
    "email": "user@example.com",
    "otp": "123456"
  }
  ```

- **Success Response (200):**

  ```json
  {
    "success": true
  }
  ```

  - Sets a secure HTTP-only cookie with the JWT token
  - Redirects to the admin dashboard

- **Error Responses:**

  - `400`: Invalid OTP, email format, or OTP expired
  - `429`: Too many verification attempts (5 max, then 1-hour lockout)

- **Security Features:**
  - Maximum 5 verification attempts per OTP
  - 1-hour cooldown after max attempts reached
  - OTP is hashed using SHA-256 before storage
  - JWT token set as HTTP-only cookie

### `POST /api/logout`

Logs out the user by clearing the authentication cookie.

- **Authentication**: Requires valid JWT cookie
- **Response**: Redirects to home page (302)

### Page Routes

- `GET /` - Login page (redirects to `/admin` if authenticated)
- `GET /admin` - Protected admin dashboard (requires authentication)

---

## Application Constants

Located in `utils/constants.ts`:

```typescript
export const OTP_EXPIRATION_TIME = 5 * 60 // 5 minutes
export const MAX_RETRY_COUNT = 5 // Max verification attempts
export const MAX_SEND_COUNT = 5 // Max OTP requests
export const SHORT_COOL_DOWN_TIME = 60 // 1 minute
export const LONG_COOL_DOWN_TIME = 3600 // 1 hour
```

---

## Security Implementation

### OTP Generation and Storage

- **Generation**: Cryptographically secure random 6-digit numbers
- **Storage**: SHA-256 hashed in Cloudflare KV
- **Expiration**: 5-minute TTL with automatic cleanup

### Rate Limiting Strategy

```
Email Request → Check Cooldown → Generate OTP → Send Email → Set Cooldown
     ↓
Verify Request → Check Attempts → Validate OTP → Create Session
     ↓
Max Attempts → Long Cooldown (1 hour)
```

### JWT Token Management

- **Algorithm**: HS256
- **Expiration**: 1 hour
- **Storage**: HTTP-only cookie with secure flags

---

## Email Template

The OTP email template (`templates/mail.ts`) includes:

- **Responsive design** with fallback fonts
- **Professional styling** with Inter font family
- **Clear OTP display** with monospace formatting
- **Security messaging** about code expiration
- **Cross-client compatibility** with Outlook support

---

## Development Notes

### Code Conventions

- **JSDoc comments** for all utility functions
- **Descriptive naming** for variables and functions
- **Async/await** for all asynchronous operations
- **Comprehensive error handling** for user input and external APIs
- **Type safety** with TypeScript and Zod validation

### Architecture Decisions

- **Serverless-first**: Built specifically for Cloudflare Workers
- **Minimal dependencies**: Only essential packages included
- **Security by default**: Multiple layers of protection
- **Performance optimized**: Efficient KV operations and caching

### Testing the Application

1. Visit the deployed URL or `http://localhost:8787` in development
2. Enter your email address and click "Submit"
3. Check your email for the 6-digit OTP code
4. Enter the OTP code in the form
5. Upon successful verification, you'll be redirected to the admin panel

---

## Deployment

### Cloudflare Workers

1. **Configure wrangler.jsonc** with your account details
2. **Set environment variables** in Cloudflare dashboard
3. **Deploy using**:
   ```sh
   bun run deploy
   ```

### Custom Domain (Optional)

Add a custom domain in the Cloudflare Workers dashboard under "Settings" → "Domains".

---

## License

This project is open source and available under the [MIT License](LICENSE).

---

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---
