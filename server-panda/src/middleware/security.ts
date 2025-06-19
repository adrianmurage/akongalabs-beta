import helmet from "helmet";
import cors from "cors";
import rateLimit from "express-rate-limit";
import { Application } from "express";

/**
 * Sets up comprehensive security middleware for production deployment
 * Includes: Helmet security headers, CORS, rate limiting, and security best practices
 *
 * @param app - Express application instance
 */
export function setupSecurityMiddleware(app: Application): void {
  // Remove X-Powered-By header to avoid technology disclosure
  app.disable("x-powered-by");

  // Helmet - Security headers middleware
  app.use(
    helmet({
      // Strict Transport Security - Force HTTPS for 1 year
      hsts: {
        maxAge: 31536000, // 1 year in seconds
        includeSubDomains: true,
        preload: true,
      },

      // Content Security Policy - Prevent XSS attacks
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'"],
          styleSrc: ["'self'", "'unsafe-inline'"], // Allow inline styles for React/Astro
          scriptSrc: ["'self'", "'unsafe-inline'"], // Allow inline scripts for React
          imgSrc: ["'self'", "data:", "https:"], // Allow images from self, data URLs, and HTTPS
          fontSrc: ["'self'", "https:", "data:"],
          connectSrc: ["'self'"],
          mediaSrc: ["'self'"],
          objectSrc: ["'none'"],
          childSrc: ["'self'"],
          frameSrc: ["'none'"],
          workerSrc: ["'self'"],
          manifestSrc: ["'self'"],
          upgradeInsecureRequests: [], // Upgrade HTTP to HTTPS
        },
      },

      // X-Frame-Options - Prevent clickjacking
      frameguard: { action: "deny" },

      // X-Content-Type-Options - Prevent MIME sniffing
      noSniff: true,

      // Referrer Policy - Control referrer information
      referrerPolicy: { policy: "strict-origin-when-cross-origin" },

      // X-DNS-Prefetch-Control - Control DNS prefetching
      dnsPrefetchControl: { allow: false },

      // X-Download-Options - Prevent IE from executing downloads
      ieNoOpen: true,

      // X-Permitted-Cross-Domain-Policies - Control Adobe Flash/PDF cross-domain policies
      permittedCrossDomainPolicies: false,

      // Hide Powered-By header
      hidePoweredBy: true,
    }),
  );

  // CORS Configuration - Allow cross-origin requests with security
  const corsOptions = {
    origin: function (
      origin: string | undefined,
      callback: (err: Error | null, allow?: boolean) => void,
    ) {
      // Allow requests with no origin (mobile apps, curl, Postman, etc.)
      if (!origin) return callback(null, true);

      // In production, you should specify allowed origins
      const allowedOrigins = [
        "https://working-panda-unified.fly.dev",
        "http://localhost:5173", // React dev server
        "http://localhost:4321", // Astro dev server
        "http://localhost:3001", // Express server
      ];

      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        // In development, allow all origins
        if (process.env.NODE_ENV !== "production") {
          callback(null, true);
        } else {
          callback(new Error("Not allowed by CORS"), false);
        }
      }
    },
    credentials: true, // Allow cookies
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
    maxAge: 86400, // Cache preflight requests for 24 hours
  };

  app.use(cors(corsOptions));

  // Rate Limiting - Prevent abuse
  const isDevelopment = process.env.NODE_ENV !== "production";

  // Allow configuration via environment variables
  const RATE_LIMIT_WINDOW =
    parseInt(process.env.RATE_LIMIT_WINDOW || "15", 10) * 60 * 1000; // minutes to ms
  const RATE_LIMIT_MAX = parseInt(
    process.env.RATE_LIMIT_MAX || (isDevelopment ? "1000" : "100"),
    10,
  );
  const RATE_LIMIT_API_MAX = parseInt(
    process.env.RATE_LIMIT_API_MAX || (isDevelopment ? "500" : "50"),
    10,
  );

  const limiter = rateLimit({
    windowMs: RATE_LIMIT_WINDOW,
    max: RATE_LIMIT_MAX,
    message: {
      error: "Too many requests from this IP",
      retryAfter: `${RATE_LIMIT_WINDOW / 60000} minutes`,
    },
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
    // Skip rate limiting for health checks and optionally in development
    skip: (req) =>
      req.path === "/api/health" ||
      (isDevelopment && process.env.DISABLE_RATE_LIMIT_DEV === "true"),
  });

  // Apply rate limiting to all routes
  app.use(limiter);

  // API-specific rate limiting (stricter)
  const apiLimiter = rateLimit({
    windowMs: RATE_LIMIT_WINDOW,
    max: RATE_LIMIT_API_MAX,
    message: {
      error: "Too many API requests from this IP",
      retryAfter: `${RATE_LIMIT_WINDOW / 60000} minutes`,
    },
    standardHeaders: true,
    legacyHeaders: false,
    skip: (req) =>
      req.path === "/api/health" ||
      (isDevelopment && process.env.DISABLE_RATE_LIMIT_DEV === "true"),
  });

  // Apply stricter rate limiting to API routes
  app.use("/api", apiLimiter);

  // Log rate limit configuration on startup
  console.log(`🔒 Rate Limiting Configuration:`);
  console.log(
    `   - Environment: ${isDevelopment ? "Development" : "Production"}`,
  );
  console.log(`   - Window: ${RATE_LIMIT_WINDOW / 60000} minutes`);
  console.log(`   - Global Max: ${RATE_LIMIT_MAX} requests`);
  console.log(`   - API Max: ${RATE_LIMIT_API_MAX} requests`);
  console.log(
    `   - Skip in Dev: ${isDevelopment && process.env.DISABLE_RATE_LIMIT_DEV === "true" ? "Yes" : "No"}`,
  );

  // Security logging middleware
  app.use((req, _res, next) => {
    // Log security-relevant events
    const securityEvents = [
      "login",
      "logout",
      "password-reset",
      "account-creation",
      "admin",
      "config",
      "debug",
      ".env",
      "wp-admin",
    ];

    const path = req.path.toLowerCase();
    const isSecurityEvent = securityEvents.some((event) =>
      path.includes(event),
    );

    if (isSecurityEvent) {
      console.log(
        `🔒 Security Event: ${req.method} ${req.path} from ${req.ip} - User-Agent: ${req.get("User-Agent")}`,
      );
    }

    next();
  });
}

/**
 * Additional security configurations for specific environments
 */
export const securityConfig = {
  production: {
    // Additional production-only security measures
    trustProxy: true, // Trust Fly.io proxy headers
    secureSession: true, // Require HTTPS for sessions
  },

  development: {
    // Development-specific settings
    trustProxy: false,
    secureSession: false,
  },
};

/**
 * Security headers validation - Use this to test if security headers are properly set
 */
export function validateSecurityHeaders(headers: Record<string, string>): {
  score: number;
  missing: string[];
  present: string[];
} {
  const requiredHeaders = [
    "strict-transport-security",
    "content-security-policy",
    "x-frame-options",
    "x-content-type-options",
    "referrer-policy",
  ];

  const present = requiredHeaders.filter(
    (header) => headers[header] || headers[header.toLowerCase()],
  );

  const missing = requiredHeaders.filter(
    (header) => !headers[header] && !headers[header.toLowerCase()],
  );

  const score = Math.round((present.length / requiredHeaders.length) * 100);

  return { score, missing, present };
}
