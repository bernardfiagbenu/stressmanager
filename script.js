// Activity database with enhanced suggestions and categories
const activities = {
    tired: {
        5: [
            {
                title: "Quick Power Nap",
                description: "Close your eyes and take a short power nap. Set an alarm to ensure you don't oversleep.",
                icon: "fa-bed",
                tips: ["Find a quiet, dark place", "Set a gentle alarm", "Sit in a comfortable position"]
            },
            {
                title: "Energy-Boosting Stretch",
                description: "Do some gentle stretches to wake up your body and mind.",
                icon: "fa-child",
                tips: ["Focus on neck and shoulder stretches", "Breathe deeply during stretches", "Move slowly and mindfully"]
            }
        ],
        15: [
            {
                title: "Mindful Breathing",
                description: "Practice deep breathing exercises to increase oxygen flow and energy levels.",
                icon: "fa-wind",
                tips: ["Inhale for 4 counts", "Hold for 4 counts", "Exhale for 4 counts"]
            },
            {
                title: "Nature Break",
                description: "Take a short walk outside to get some fresh air and natural light.",
                icon: "fa-walking",
                tips: ["Look for green spaces", "Notice the sounds around you", "Feel the air on your skin"]
            }
        ],
        30: [
            {
                title: "Power Nap & Walk",
                description: "Take a 20-minute power nap followed by a short walk to fully recharge.",
                icon: "fa-moon",
                tips: ["Nap in a quiet, dark room", "Set an alarm for 20 minutes", "Take a 10-minute walk after"]
            },
            {
                title: "Energy Flow Exercise",
                description: "Do some light exercises or yoga to boost your energy levels.",
                icon: "fa-heartbeat",
                tips: ["Start with gentle movements", "Focus on your breath", "Gradually increase intensity"]
            }
        ]
    },
    stressed: {
        5: [
            {
                title: "Quick Meditation",
                description: "Take a moment to focus on your breath and clear your mind.",
                icon: "fa-om",
                tips: ["Find a quiet space", "Sit comfortably", "Focus on your breath"]
            },
            {
                title: "Stress Relief Breathing",
                description: "Practice the 4-7-8 breathing technique to reduce stress.",
                icon: "fa-lungs",
                tips: ["Inhale for 4 seconds", "Hold for 7 seconds", "Exhale for 8 seconds"]
            }
        ],
        15: [
            {
                title: "Guided Meditation",
                description: "Listen to a short guided meditation to calm your mind.",
                icon: "fa-spa",
                tips: ["Find a comfortable position", "Close your eyes", "Follow the guide's voice"]
            },
            {
                title: "Progressive Relaxation",
                description: "Practice progressive muscle relaxation to release tension.",
                icon: "fa-hand-sparkles",
                tips: ["Start from your toes", "Work up to your head", "Hold each tension for 5 seconds"]
            }
        ],
        30: [
            {
                title: "Mindful Walking",
                description: "Take a mindful walk, focusing on your surroundings and breathing.",
                icon: "fa-hiking",
                tips: ["Walk slowly", "Notice your surroundings", "Feel each step"]
            },
            {
                title: "Journaling Session",
                description: "Write down your thoughts and feelings to process them better.",
                icon: "fa-pen-fancy",
                tips: ["Write without judgment", "Focus on solutions", "Express gratitude"]
            }
        ]
    },
    energetic: {
        5: [
            {
                title: "Quick Dance Break",
                description: "Put on your favorite song and dance to boost your mood.",
                icon: "fa-music",
                tips: ["Choose an upbeat song", "Move freely", "Enjoy the moment"]
            },
            {
                title: "Energy Boost Exercise",
                description: "Do some quick jumping jacks or high knees to channel your energy.",
                icon: "fa-running",
                tips: ["Start slowly", "Increase intensity gradually", "Stay hydrated"]
            }
        ],
        15: [
            {
                title: "Creative Break",
                description: "Express your energy through drawing, writing, or another creative outlet.",
                icon: "fa-paint-brush",
                tips: ["Choose a simple project", "Focus on the process", "Enjoy the creativity"]
            },
            {
                title: "Active Meditation",
                description: "Practice a dynamic meditation technique to channel your energy.",
                icon: "fa-yin-yang",
                tips: ["Move mindfully", "Focus on your breath", "Stay present"]
            }
        ],
        30: [
            {
                title: "Workout Session",
                description: "Do a quick workout to make the most of your energy.",
                icon: "fa-dumbbell",
                tips: ["Warm up properly", "Choose high-energy exercises", "Cool down after"]
            },
            {
                title: "Learning Break",
                description: "Use your energy to learn something new or practice a skill.",
                icon: "fa-brain",
                tips: ["Choose something interesting", "Take notes", "Practice actively"]
            }
        ]
    },
    focused: {
        5: [
            {
                title: "Mindful Moment",
                description: "Take a moment to appreciate your current state of focus.",
                icon: "fa-bullseye",
                tips: ["Acknowledge your focus", "Set an intention", "Return refreshed"]
            },
            {
                title: "Quick Stretch",
                description: "Do some gentle stretches to maintain your focus.",
                icon: "fa-child",
                tips: ["Focus on posture", "Breathe deeply", "Move slowly"]
            }
        ],
        15: [
            {
                title: "Focused Reading",
                description: "Read something inspiring or educational to maintain your mental clarity.",
                icon: "fa-book-reader",
                tips: ["Choose engaging content", "Take notes", "Reflect on key points"]
            },
            {
                title: "Mindful Planning",
                description: "Use your focus to plan your next tasks or goals.",
                icon: "fa-tasks",
                tips: ["Prioritize tasks", "Set clear goals", "Break down steps"]
            }
        ],
        30: [
            {
                title: "Deep Work Preparation",
                description: "Prepare your environment and mind for your next focused work session.",
                icon: "fa-laptop-code",
                tips: ["Organize your space", "Set clear objectives", "Eliminate distractions"]
            },
            {
                title: "Skill Development",
                description: "Practice a skill that requires focus and attention.",
                icon: "fa-graduation-cap",
                tips: ["Choose one skill", "Practice deliberately", "Track progress"]
            }
        ]
    }
};

// DOM Elements
const moodButtons = document.querySelectorAll('.mood-btn');
const timeButtons = document.querySelectorAll('.time-btn');
const breakSuggestion = document.querySelector('.break-suggestion');
const activityIcon = document.querySelector('.activity-icon');
const activityTitle = document.querySelector('.activity-title');
const activityDescription = document.querySelector('.activity-description');
const timeRemaining = document.querySelector('.time-remaining');
const startTimerButton = document.querySelector('.start-timer');

let selectedMood = null;
let selectedTime = null;
let timerInterval = null;
let currentActivity = null;

// Add loading animation
const loading = document.createElement('div');
loading.className = 'loading';
document.body.appendChild(loading);

// Simulate loading
setTimeout(() => {
    loading.style.display = 'none';
}, 1500);

// Event Listeners with enhanced feedback
moodButtons.forEach(button => {
    button.addEventListener('click', () => {
        moodButtons.forEach(btn => btn.classList.remove('selected'));
        button.classList.add('selected');
        selectedMood = button.dataset.mood;
        animateSelection(button);
        checkSelections();
    });
});

timeButtons.forEach(button => {
    button.addEventListener('click', () => {
        timeButtons.forEach(btn => btn.classList.remove('selected'));
        button.classList.add('selected');
        selectedTime = parseInt(button.dataset.time);
        animateSelection(button);
        checkSelections();
    });
});

startTimerButton.addEventListener('click', startTimer);

// Enhanced Functions
function animateSelection(element) {
    element.style.transform = 'scale(1.1)';
    setTimeout(() => {
        element.style.transform = 'scale(1)';
    }, 200);
}

function checkSelections() {
    if (selectedMood && selectedTime) {
        showBreakSuggestion();
    }
}

function showBreakSuggestion() {
    const moodActivities = activities[selectedMood][selectedTime];
    currentActivity = moodActivities[Math.floor(Math.random() * moodActivities.length)];
    
    // Animate the suggestion card
    breakSuggestion.style.opacity = '0';
    breakSuggestion.style.transform = 'translateY(20px)';
    breakSuggestion.classList.remove('hidden');
    
    // Update content
    activityIcon.innerHTML = `<i class="fas ${currentActivity.icon}"></i>`;
    activityTitle.textContent = currentActivity.title;
    activityDescription.textContent = currentActivity.description;
    
    // Add tips if available
    if (currentActivity.tips) {
        const tipsList = document.createElement('ul');
        tipsList.className = 'activity-tips';
        currentActivity.tips.forEach(tip => {
            const li = document.createElement('li');
            li.textContent = tip;
            tipsList.appendChild(li);
        });
        activityDescription.after(tipsList);
    }
    
    timeRemaining.textContent = `${selectedTime}:00`;
    
    // Animate in
    setTimeout(() => {
        breakSuggestion.style.opacity = '1';
        breakSuggestion.style.transform = 'translateY(0)';
    }, 50);
}

function startTimer() {
    let timeLeft = selectedTime * 60;
    startTimerButton.disabled = true;
    
    // Add visual feedback
    startTimerButton.textContent = 'Timer Running...';
    startTimerButton.style.background = 'var(--gradient-secondary)';
    
    timerInterval = setInterval(() => {
        timeLeft--;
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        timeRemaining.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
        
        // Add visual feedback for last 10 seconds
        if (timeLeft <= 10) {
            timeRemaining.style.color = '#ff4444';
            timeRemaining.style.animation = 'pulse 1s infinite';
        }
        
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            startTimerButton.disabled = false;
            startTimerButton.textContent = 'Start Timer';
            startTimerButton.style.background = 'var(--gradient-primary)';
            timeRemaining.textContent = "Time's up!";
            timeRemaining.style.color = '';
            timeRemaining.style.animation = '';
            playNotificationSound();
            showCompletionMessage();
        }
    }, 1000);
}

function showCompletionMessage() {
    const message = document.createElement('div');
    message.className = 'completion-message';
    message.innerHTML = `
        <h3>Great job! 🎉</h3>
        <p>You've completed your mindful break.</p>
        <p>How do you feel now?</p>
        <div class="feeling-buttons">
            <button onclick="rateFeeling('better')">Better</button>
            <button onclick="rateFeeling('same')">Same</button>
            <button onclick="rateFeeling('worse')">Worse</button>
        </div>
    `;
    
    breakSuggestion.appendChild(message);
}

function rateFeeling(rating) {
    // Here you could add analytics or feedback collection
    const message = document.querySelector('.completion-message');
    message.innerHTML = `
        <h3>Thank you for your feedback!</h3>
        <p>Remember to take regular breaks throughout your day.</p>
    `;
    
    // Reset the app after 3 seconds
    setTimeout(() => {
        resetApp();
    }, 3000);
}

function resetApp() {
    // Reset all selections
    moodButtons.forEach(btn => btn.classList.remove('selected'));
    timeButtons.forEach(btn => btn.classList.remove('selected'));
    selectedMood = null;
    selectedTime = null;
    
    // Hide suggestion
    breakSuggestion.classList.add('hidden');
    breakSuggestion.style.opacity = '0';
    breakSuggestion.style.transform = 'translateY(20px)';
    
    // Remove any tips or completion message
    const tips = document.querySelector('.activity-tips');
    const message = document.querySelector('.completion-message');
    if (tips) tips.remove();
    if (message) message.remove();
}

function playNotificationSound() {
    const audio = new Audio('https://assets.mixkit.co/sfx/preview/mixkit-software-interface-start-2574.mp3');
    audio.play().catch(error => {
        console.log('Audio playback failed:', error);
    });
}

// Add smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
}); 