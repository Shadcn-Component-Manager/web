# Shadcn Component Manager Web

[![Deploy Status](https://img.shields.io/badge/Deploy-Vercel-blue.svg)](https://scm-registry.vercel.app)
[![Next.js](https://img.shields.io/badge/Next.js-14-black.svg)](https://nextjs.org/)
[![GitHub stars](https://img.shields.io/github/stars/Shadcn-Component-Manager/web.svg?style=social&label=Star)](https://github.com/Shadcn-Component-Manager/web)
[![GitHub issues](https://img.shields.io/github/issues/Shadcn-Component-Manager/web.svg)](https://github.com/Shadcn-Component-Manager/web/issues)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

The official web interface for the Shadcn Component Manager (SCM). Browse, search, and manage shadcn/ui components through a modern web application.

## Overview

Next.js 14 application providing a web interface for the SCM registry. Users can discover, preview, and install components without using the CLI tool.

## Features

- Component browser with filtering and sorting
- Advanced search with category and author filters
- Component code and documentation previews
- GitHub OAuth authentication
- Web-based component publishing
- Responsive design for desktop and mobile
- Dark mode theme switching

## Development

### Setup

```bash
npm install
npm run dev
```

### Build

```bash
npm run build
npm start
```

### Environment Variables

```env
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret

GITHUB_TOKEN=your_github_access_token

NEXT_PUBLIC_GITHUB_CLIENT_ID=your_github_client_id
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

### Code Standards

- Use TypeScript for all new code
- Follow existing code style
- Add TSDoc comments for functions
- Write meaningful commit messages
- Test changes thoroughly

## License

MIT License - see LICENSE file for details.
