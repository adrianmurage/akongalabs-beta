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
        "http://localhost:3000", // React dev server
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
  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
    message: {
      error: "Too many requests from this IP",
      retryAfter: "15 minutes",
    },
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
    // Skip rate limiting for health checks
    skip: (req) => req.path === "/api/health",
  });

  // Apply rate limiting to all routes
  app.use(limiter);

  // API-specific rate limiting (stricter)
  const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 50, // Limit each IP to 50 API requests per windowMs
    message: {
      error: "Too many API requests from this IP",
      retryAfter: "15 minutes",
    },
    standardHeaders: true,
    legacyHeaders: false,
    skip: (req) => req.path === "/api/health", // Allow unlimited health checks
  });

  // Apply stricter rate limiting to API routes
  app.use("/api", apiLimiter);

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
