# Dota 2 Statistics Dashboard

A comprehensive Angular application for viewing Dota 2 statistics, powered by the OpenDota API.

## Features

### 🎮 Dashboard
- Overview of total heroes and recent pro matches
- Popular heroes with win rates
- Quick navigation to all sections

### 🛡️ Heroes Browser
- Browse all Dota 2 heroes with detailed statistics
- Filter by attribute (Strength, Agility, Intelligence)
- Sort by name, win rate, or pick rate
- Search functionality
- View hero details including:
  - Base statistics and attributes
  - Win rates across different rank brackets
  - Professional match statistics
  - Roles and attack type

### 👤 Player Profiles
- Search for players by name
- View player statistics:
  - Total games, wins, and losses
  - Win rate percentage
  - Most played heroes
  - Recent match history with detailed stats
  - KDA ratios and performance metrics

### ⚔️ Match Analysis
- Detailed match breakdowns
- Team compositions (Radiant vs Dire)
- Player performance tables
- Item builds
- Game mode and duration information

### 🏆 Professional Matches
- Recent professional Dota 2 matches
- Tournament and league information
- Match results and scores
- Real-time updates

## Technology Stack

- **Framework**: Angular 20 (standalone components)
- **Language**: TypeScript 5.9
- **Styling**: SCSS with modern CSS features
- **HTTP Client**: Angular HttpClient with RxJS
- **API**: OpenDota API (free tier)
- **State Management**: RxJS Observables and Angular Signals

## OpenDota API

This application uses the free OpenDota API:
- **Rate Limits**: 60 requests per minute, 2,000 requests per day
- **No API Key Required**: Basic usage works without authentication
- **Caching**: Heroes data is cached to minimize API calls
- **Documentation**: https://docs.opendota.com/

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd statz
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open your browser and navigate to:
```
http://localhost:4200
```

## Available Scripts

- `npm start` - Start the development server
- `npm run build` - Build the project for production
- `npm run watch` - Build in watch mode for development
- `npm test` - Run unit tests

## Project Structure

```
src/
├── app/
│   ├── components/
│   │   ├── navigation/          # Navigation bar with search
│   │   └── shared/              # Reusable components
│   │       ├── error-message/   # Error display component
│   │       ├── hero-icon/       # Hero icon component
│   │       ├── loading-spinner/ # Loading spinner
│   │       └── stat-card/       # Statistics card
│   ├── models/
│   │   └── dota.models.ts       # TypeScript interfaces
│   ├── pages/
│   │   ├── dashboard/           # Main dashboard
│   │   ├── hero-detail/         # Hero details page
│   │   ├── heroes/              # Heroes grid
│   │   ├── match-detail/        # Match analysis
│   │   ├── player/              # Player profile
│   │   └── pro-matches/         # Pro matches list
│   ├── services/
│   │   └── opendota.service.ts  # API service
│   ├── app.config.ts            # App configuration
│   ├── app.routes.ts            # Routing configuration
│   └── app.ts                   # Root component
├── styles.scss                  # Global styles
└── index.html                   # HTML entry point
```

## Features in Detail

### Caching Strategy
- Heroes data is cached in the service layer using RxJS `shareReplay`
- Reduces API calls and improves performance
- Cache can be manually cleared if needed

### Responsive Design
- Mobile-first approach
- Breakpoints at 768px, 1024px, and 1400px
- Optimized layouts for all screen sizes
- Touch-friendly interface

### Error Handling
- Graceful error messages for API failures
- Retry logic for failed requests
- Rate limit awareness
- User-friendly error displays

### Loading States
- Loading spinners for all async operations
- Skeleton screens where appropriate
- Smooth transitions

### Accessibility
- Semantic HTML
- ARIA labels where needed
- Keyboard navigation support
- Focus management

## API Endpoints Used

- `/api/search` - Search for players
- `/api/players/{account_id}` - Get player profile
- `/api/players/{account_id}/wl` - Get player win/loss
- `/api/players/{account_id}/matches` - Get player matches
- `/api/players/{account_id}/heroes` - Get player hero stats
- `/api/heroes` - Get all heroes
- `/api/heroStats` - Get hero statistics
- `/api/matches/{match_id}` - Get match details
- `/api/proMatches` - Get professional matches

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the MIT License.

## Acknowledgments

- OpenDota API for providing free access to Dota 2 statistics
- Valve Corporation for Dota 2
- Angular team for the amazing framework

## Contact

For questions or feedback, please open an issue on GitHub.
