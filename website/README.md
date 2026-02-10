# UAV Human Detection - Showcase Website

An immersive, scroll-based storytelling website showcasing the UAV Human Detection AI system.

## Features

- **Cinematic Design**: Dark tech aesthetic with electric blue accents
- **Scroll Animations**: Smooth parallax effects and scroll-triggered animations
- **Interactive Sections**: Chapter-based storytelling with interactive elements
- **Responsive**: Fully responsive design for all devices
- **Performance**: Optimized with Next.js 14 and standalone output

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Language**: TypeScript

## Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## Deployment

### Railway

1. Connect your GitHub repository to Railway
2. Railway will automatically detect the Dockerfile
3. Deploy!

Or use the Railway CLI:

```bash
railway login
railway init
railway up
```

### Docker

```bash
# Build the image
docker build -t uav-detection-website .

# Run the container
docker run -p 3000:3000 uav-detection-website
```

## Project Structure

```
website/
├── src/
│   ├── app/
│   │   ├── globals.css      # Global styles
│   │   ├── layout.tsx       # Root layout
│   │   └── page.tsx         # Main page
│   ├── components/
│   │   ├── sections/        # Page sections
│   │   │   ├── HeroSection.tsx
│   │   │   ├── MissionSection.tsx
│   │   │   ├── TechnologySection.tsx
│   │   │   ├── ApplicationsSection.tsx
│   │   │   ├── DatasetSection.tsx
│   │   │   ├── DemoSection.tsx
│   │   │   ├── FutureSection.tsx
│   │   │   └── Footer.tsx
│   │   ├── AnimatedText.tsx
│   │   ├── LoadingScreen.tsx
│   │   ├── Navigation.tsx
│   │   └── ScrollProgress.tsx
│   └── lib/
│       └── utils.ts
├── public/
│   └── images/
├── Dockerfile
├── railway.json
└── package.json
```

## Sections

1. **Hero**: Animated title with typing effect and stats preview
2. **Mission (Ch. 01)**: Project purpose and applications
3. **Technology (Ch. 02)**: Model architecture and comparison
4. **Applications (Ch. 03)**: Real-world use cases with interactive selector
5. **Dataset (Ch. 04)**: Training data and augmentation details
6. **Demo (Ch. 05)**: Interactive model demonstration
7. **Future (Ch. 06)**: Roadmap and upcoming features
8. **Footer**: Credits, links, and technology stack

## License

MIT License - See main project repository for details.
