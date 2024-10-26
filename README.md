# Fantasy Premier League Team Viewer

A sleek, modern web application and simple that displays Fantasy Premier League team formations and player statistics in a beautiful, responsive interface.

![FPL Team Viewer](https://images.unsplash.com/photo-1522778119026-d647f0596c20?auto=format&fit=crop&q=80&w=1200&h=600)

## Features

- 🎮 Interactive football field view
- 📊 Real-time player statistics
- 🏆 Team performance metrics
- 📱 Fully responsive design
- ⚡ Fast and lightweight

## Demo

Use team ID `8` (Magnus Carlsen's team) to see the application in action!

## Prerequisites

Before running the application, you'll need:

- Node.js (v16 or higher)
- npm (Node Package Manager)

## Getting Started

1. Clone the repository:

```bash
git clone <your-repo-url>
cd fpl-viewer
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. **Important**: Before using the app, visit [CORS Anywhere Demo](https://cors-anywhere.herokuapp.com/corsdemo) and request temporary access to the demo server.

## Tech Stack

- ⚛️ React
- 🏃‍♂️ Vite
- 💨 Tailwind CSS
- 📦 Axios
- 🎨 Lucide Icons
- 📝 TypeScript

## Project Structure

```
src/
├── components/
│   ├── FieldView.tsx    # Football field layout component
│   └── PlayerCard.tsx   # Individual player card component
├── types.ts            # TypeScript interfaces
├── App.tsx            # Main application component
└── main.tsx          # Application entry point
```

## API Usage

This project uses the unofficial Fantasy Premier League API:

- Team data: `/api/entry/{team-id}/`
- Player data: `/api/bootstrap-static/`
- Team picks: `/api/entry/{team-id}/event/{event-id}/picks/`

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Fantasy Premier League for providing the API
- Magnus Carlsen for being an FPL legend 🏆
