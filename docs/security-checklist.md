# Security Checklist 🔒

The stuff you need to check before you deploy so you don't become a cautionary tale on Hacker News.

## Before you deploy (the important stuff)

### Dependencies
- [ ] Run `bun audit` and fix anything that's actually scary
- [ ] Update packages with known vulnerabilities (use your judgment)
- [ ] No dev dependencies sneaking into production builds

### Basic security headers
- [ ] Helmet middleware is enabled (it's already configured)
- [ ] HTTPS is working (Fly.io handles this automatically)
- [ ] No sensitive data in error messages that reach users

### Rate limiting
- [ ] Rate limiting is enabled (check `.env` doesn't have `DISABLE_RATE_LIMIT=true`)
- [ ] Test it works: spam an endpoint and make sure you get rate limited
- [ ] API endpoints have stricter limits than static pages

### Environment variables
- [ ] No API keys or passwords in your code (they belong in `.env`)
- [ ] Production secrets are set in Fly.io: `fly secrets list`
- [ ] Database URL uses connection pooling if you have traffic

## After you deploy (verify it works)

### Quick smoke tests
- [ ] Visit your app in an incognito window (tests HTTPS redirect)
- [ ] Try to overwhelm an API endpoint (should get rate limited)
- [ ] Check headers: `curl -I https://yourdomain.com` (should see security headers)

### Database security
- [ ] Database isn't accessible from the public internet
- [ ] Using connection pooling for production traffic
- [ ] No SQL queries built with string concatenation (use Drizzle properly)

## The "nice to have" stuff

### Monitoring
- [ ] Error tracking set up (Sentry, LogRocket, whatever)
- [ ] Can actually see when things break
- [ ] Database connection monitoring

### Performance security
- [ ] Large requests get rejected (file upload limits)
- [ ] Slow queries get killed (connection timeouts)
- [ ] Memory usage is bounded (not infinitely growing)

## What you can probably skip

**CSRF protection** - If you're building a SPA with API endpoints, you likely don't need traditional CSRF tokens. Modern browsers + CORS handles most of this.

**Complex CSP policies** - Start simple. You can always tighten it later when you know what your app actually loads.

**Penetration testing** - Unless you're handling payment cards or medical data, focus on the basics first.

## When something goes wrong

**Got hacked?**
1. Take the app offline
2. Change all passwords/secrets
3. Figure out what happened
4. Fix it
5. Deploy with new secrets

**Performance issues?**
1. Check if you're getting DDoSed (rate limiting working?)
2. Look at database connections (hitting pool limits?)
3. Check memory usage (memory leaks?)

## The real talk

Security is about tradeoffs. Perfect security means your app doesn't work. No security means you get owned.

Focus on:
1. **The basics** - HTTPS, rate limiting, no secrets in code
2. **What's likely** - Brute force attacks, basic SQL injection attempts
3. **What hurts** - Database breaches, user account takeovers

Don't obsess over:
1. **Theoretical attacks** that require physical access to your server
2. **Zero-day exploits** in your dependencies (keep them updated, but don't panic)
3. **Perfect security scores** from automated tools (they don't know your app)

## Useful commands

```bash
# Check what security headers you're sending
curl -I https://yourdomain.com

# Test rate limiting
for i in {1..20}; do curl https://yourdomain.com/api/health; done

# Check for common vulnerabilities
bun audit

# See what secrets are deployed
fly secrets list
```

Remember: Security is a process, not a destination. You'll never be 100% secure, but you can be secure enough to sleep at night.