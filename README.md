# 🗡️ Sword & Code - Interactive Portfolio

A modern, interactive portfolio website built with Next.js 15, featuring smooth scrolling animations, GitHub integration, and a beautiful dark theme design.

## ✨ Features

- **🎨 Interactive Design**: Smooth scrolling between sections with dynamic background transitions
- **📱 Responsive Layout**: Fully responsive design that works on all devices
- **🔗 GitHub Integration**: Real-time display of GitHub repositories with file browsing
- **🎭 Modal System**: Interactive modals for viewing repository contents and README files
- **⚡ Performance Optimized**: Built with Next.js 15 and Turbopack for fast development
- **🎯 TypeScript**: Full TypeScript support for better development experience
- **🎨 Tailwind CSS**: Modern styling with Tailwind CSS v4

## 🛠️ Tech Stack

- **Framework**: Next.js 15.3.2
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Icons**: React Icons
- **Fonts**: Geist (Sans & Mono)
- **Bundler**: Turbopack

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm, yarn, pnpm, or bun

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd blog
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   # or
   bun install
   ```

3. **Set up environment variables**
   Copy `env.example` to `.env.local` and fill in your values:
   ```bash
   cp env.example .env.local
   ```
   
   Then edit `.env.local` with your information:
   ```env
   NEXT_PUBLIC_GITHUB_TOKEN=your_github_token_here
   NEXT_PUBLIC_GITHUB_USERNAME=your_github_username
   NEXT_PUBLIC_CONTACT_EMAIL=your_email@example.com
   NEXT_PUBLIC_LINKEDIN_URL=https://linkedin.com/in/your-profile
   ```

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   # or
   bun dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
blog/
├── src/
│   └── app/
│       ├── page.tsx          # Main portfolio page
│       ├── layout.tsx        # Root layout component
│       └── globals.css       # Global styles
├── public/
│   ├── background1.png       # Background images
│   ├── background2.png
│   ├── background3.png
│   ├── background4.png
│   └── sword.svg            # Favicon
├── package.json
├── next.config.ts
├── tailwind.config.js
├── env.example              # Environment variables template
└── README.md
```

## 🎯 Site Functions

### 1. **Hero Section**
- Animated title with custom typography
- Professional introduction
- Smooth background transitions

### 2. **About Section**
- Personal description and background
- Professional summary
- Responsive text layout

### 3. **Portfolio Section**
- **GitHub Repository Display**: Shows all public repositories
- **Repository Details**: Name, description, language, stars, forks
- **Interactive Modals**: Click to view repository contents
- **File Browser**: Browse and view files within repositories
- **README Display**: Shows repository README files
- **Code Viewer**: Syntax-highlighted code display

### 4. **Contact Section**
- Social media links (LinkedIn, GitHub, Email)
- Hover animations and effects
- Professional contact information

## 🔧 Configuration

### GitHub Integration
The site fetches data from GitHub API to display repositories. You'll need:

1. **GitHub Personal Access Token**
   - Go to GitHub Settings → Developer settings → Personal access tokens
   - Generate a new token with `repo` and `read:user` permissions
   - Add it to your `.env.local` file as `NEXT_PUBLIC_GITHUB_TOKEN`

2. **Update GitHub Username**
   - Change `NEXT_PUBLIC_GITHUB_USERNAME` in your environment variables

### Customization
- **Background Images**: Replace images in `public/` folder
- **Colors**: Modify Tailwind classes in components
- **Content**: Update text content in `src/app/page.tsx`
- **Styling**: Edit `src/app/globals.css` for custom styles

## 📦 Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run export` - Export static site

## 🌐 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically

### Other Platforms
- **Netlify**: Use `npm run build` and deploy `out/` folder
- **GitHub Pages**: Use `npm run export` and deploy `out/` folder
- **Docker**: Create Dockerfile and deploy to any container platform

## 🔒 Environment Variables

Create a `.env.local` file with the following variables:

```env
# GitHub Configuration
NEXT_PUBLIC_GITHUB_TOKEN=your_github_personal_access_token
NEXT_PUBLIC_GITHUB_USERNAME=your_github_username

# Contact Information
NEXT_PUBLIC_CONTACT_EMAIL=your_email@example.com
NEXT_PUBLIC_LINKEDIN_URL=https://linkedin.com/in/your-profile

# Optional: Custom API endpoints
NEXT_PUBLIC_GITHUB_API_URL=https://api.github.com
```

## 🎨 Customization Guide

### Changing Colors
The site uses a dark theme with blue and pink accents. To change colors:

1. **Primary Colors**: Update Tailwind classes in components
2. **Background**: Replace background images in `public/` folder
3. **Accent Colors**: Modify hover states and borders

### Adding New Sections
1. Add new background image to `BACKGROUNDS` array
2. Create new section component
3. Add section to main page component
4. Update scroll logic if needed

### Modifying GitHub Integration
- Update API endpoints in `fetch` calls
- Modify repository display logic
- Add new repository information fields

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🐛 Troubleshooting

### Common Issues

1. **GitHub API Rate Limiting**
   - Ensure your GitHub token is valid
   - Check token permissions
   - Consider using GitHub App for higher limits

2. **Images Not Loading**
   - Verify image paths in `public/` folder
   - Check file names match exactly
   - Ensure images are in correct format

3. **Build Errors**
   - Clear `.next` folder: `rm -rf .next`
   - Reinstall dependencies: `npm install`
   - Check TypeScript errors: `npm run lint`

4. **Environment Variables Not Working**
   - Restart development server after adding `.env.local`
   - Verify variable names match exactly
   - Check for typos in variable names

## 📞 Support

If you encounter any issues or have questions:

1. Check the [troubleshooting section](#-troubleshooting)
2. Search existing [GitHub issues](https://github.com/earkali/blog/issues)
3. Create a new issue with detailed description

---

<div align="center">

**Made with ❤️ by [@earkali](https://github.com/earkali)**

[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/earkali)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://linkedin.com/in/earkali)

*"Code is like humor. When you have to explain it, it's bad."* - Cory House

</div>
