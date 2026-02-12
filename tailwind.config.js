/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'cyber-bg': '#0B0F19',
        'cyber-panel': 'rgba(16, 24, 40, 0.6)',
        'cyber-cyan': '#00F0FF',
        'cyber-gold': '#FFD700',
        'cyber-red': '#FF3333',
        'cyber-blue': '#1E90FF',
      },
      fontFamily: {
        'orbitron': ['Orbitron', 'monospace'],
        'inter': ['Inter', 'sans-serif'],
      },
      boxShadow: {
        'glow-cyan': '0 0 20px rgba(0, 240, 255, 0.3)',
        'glow-gold': '0 0 20px rgba(255, 215, 0, 0.3)',
      },
      borderColor: {
        'glow': 'rgba(0, 240, 255, 0.3)',
      },
      backgroundImage: {
        'gradient-gold-cyan': 'linear-gradient(90deg, #FFD700 0%, #00F0FF 100%)',
      },
    },
  },
  plugins: [],
}
