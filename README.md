# Birthday-website
Interactive web application that delivers unlockable content through a puzzle-based system. Features day-wise progression, timed unlocking, and local storage for progress tracking. Built using HTML, CSS, and JavaScript, focusing on user interaction, state management, and engaging UI design.

LINK: https://yogitha47.github.io/Birthday-website/

💌 Interactive Letter Experience
An interactive web application that delivers unlockable content through a puzzle-based and time-controlled progression system. Users unlock messages day by day by solving challenges, creating a paced and engaging experience.

🚀 Features
🔐 Sequential Unlock System
Only one day is available at a time
Next day unlocks after 24 hours
🎮 Puzzle-Based Access
Each day requires solving a word puzzle
Interactive on-screen keyboard
⏳ Time-Based Progression
24-hour delay between each day
Countdown timer for next unlock
💾 Local Storage Support
Saves user progress automatically
Tracks unlocked days and timing
🎨 Interactive UI
Dynamic rendering
Smooth transitions and visual feedback
🛠️ Technologies Used
HTML
CSS
JavaScript (Vanilla JS)
Browser Local Storage
📂 Project Structure
project/
│── index.html        # Landing page
│── days.html         # Main interface
│── play.js           # Game + unlock logic
│── letters.js        # Editable content
⚙️ How It Works
User starts the experience from the landing page
Only Day 1 is unlocked initially
User selects the day and solves a word puzzle
On success → the message is revealed
A 24-hour timer starts after opening the letter
After the timer ends → next day unlocks
This continues sequentially until Day 7
▶️ How to Use
Download or clone the repository
Open index.html in your browser
Click Start Experience
Solve puzzles to unlock each day
Come back after the timer to unlock the next day
✏️ Customization Guide
🔹 Add Your Own Messages

Edit letters.js:

content: `[Add your message here]`
🔹 Change Puzzle Words
word: "YOURWORD",
hint: "Your custom hint"
🔹 Modify Number of Days
Update loop in play.js
Add/remove entries in letters.js
🔹 Change Timer Duration

In play.js, replace:

86400000 // 24 hours

With:

60000 // 1 minute (for testing)
🔹 Customize UI
Edit styles in HTML/CSS
Add themes, animations, or effects
💡 Possible Enhancements
📊 Progress bar
🌙 Dark mode
🎵 Sound effects
🔐 Login system
☁️ Backend integration
📱 Mobile optimization
📌 Use Cases
Personalized surprise website
Interactive storytelling
Event countdown experience
Mini web game
Educational engagement tool
🌐 Deployment

You can host this project using:

GitHub Pages
Netlify
Vercel
📜 License

This project is open-source and free to use for personal and educational purposes.

✨ Author

Developed as an interactive web project focusing on user engagement, timed progression, and dynamic UI design.
