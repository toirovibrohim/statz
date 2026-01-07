# Quick Start Guide

## 🚀 Getting Started in 3 Steps

### 1. Install Dependencies
```bash
npm install
```

### 2. Start the Development Server
```bash
npm start
```

### 3. Open Your Browser
Navigate to: **http://localhost:4200**

---

## 🎮 What You Can Do

### Search for Players
1. Use the search bar in the navigation
2. Type a player name (e.g., "Dendi", "Miracle", "Puppey")
3. Click on a player to view their profile

### Browse Heroes
1. Click "Heroes" in the navigation
2. Filter by attribute (Strength, Agility, Intelligence)
3. Sort by name, win rate, or pick rate
4. Click any hero to see detailed statistics

### View Pro Matches
1. Click "Pro Matches" in the navigation
2. See recent professional Dota 2 matches
3. Click any match to view detailed analysis

### Explore the Dashboard
- View total heroes count
- See popular heroes
- Check recent pro matches
- Quick navigation to all sections

---

## 📊 Features Overview

### Player Profiles
- Total games, wins, and losses
- Win rate percentage
- Most played heroes
- Recent match history
- Detailed performance metrics (KDA, GPM, XPM)

### Hero Statistics
- Base stats and attributes
- Win rates across rank brackets (Herald to Immortal)
- Professional match statistics
- Roles and attack types

### Match Analysis
- Team compositions (Radiant vs Dire)
- Player performance tables
- Item builds
- Game mode and duration

### Professional Matches
- Recent tournament matches
- League information
- Match results and scores
- Team names and scores

---

## 🔧 Troubleshooting

### Port Already in Use
If port 4200 is already in use, you can specify a different port:
```bash
ng serve --port 4300
```

### API Rate Limits
The OpenDota API has rate limits:
- 60 requests per minute
- 2,000 requests per day

If you hit the rate limit, wait a few minutes before making more requests.

### Build Errors
If you encounter build errors, try:
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Clear Angular cache
rm -rf .angular
```

---

## 💡 Tips

1. **Search Tips**: Player search works best with at least 2 characters
2. **Caching**: Hero data is cached to minimize API calls
3. **Mobile Friendly**: The app is fully responsive and works on mobile devices
4. **Dark Theme**: The app uses a Dota 2-inspired dark theme

---

## 🌐 API Information

This application uses the **OpenDota API**:
- **Free to use** - No API key required for basic usage
- **Documentation**: https://docs.opendota.com/
- **Rate Limits**: 60 req/min, 2000 req/day
- **Data**: Real-time Dota 2 statistics

---

## 📱 Keyboard Shortcuts

- **Tab**: Navigate through elements
- **Enter**: Select/activate focused element
- **Escape**: Close search results (when focused)

---

## 🎨 Browser Support

- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)

---

## 📚 Learn More

- [Full README](README.md) - Complete documentation
- [Angular Documentation](https://angular.dev) - Learn Angular
- [OpenDota API Docs](https://docs.opendota.com/) - API reference

---

## 🐛 Found a Bug?

Please open an issue on GitHub with:
1. Description of the bug
2. Steps to reproduce
3. Expected behavior
4. Screenshots (if applicable)

---

## 🎉 Enjoy!

Happy exploring Dota 2 statistics! 🎮⚔️

