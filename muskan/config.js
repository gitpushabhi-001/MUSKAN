/**
 * ==============================================================================
 * 💖 MUSKAN'S PERSONALIZED DIGITAL GIFT APP - CONFIGURATION FILE 💖
 * ==============================================================================
 */

const CONFIG = {
  // Recipient Information
  name: "Muskan",

  // --------------------------------------------------------------------------
  // SCREEN 1: Interactive Heart & Arrow
  // --------------------------------------------------------------------------
  screen1: {
    promptText: "Pull & Release",
    subtext: "Aim the arrow into my heart"
  },

  // --------------------------------------------------------------------------
  // SCREEN 2: The Tree of Love (Heart-Leaf Canopy)
  // --------------------------------------------------------------------------
  screen2: {
    phrases: [
      "made for you, by hand",
      "I love you",
      "and every ordinary day with you"
    ],
    buttonText: "For You →"
  },

  // --------------------------------------------------------------------------
  // SCREEN 3: The Cinematic Confession (Magenta / Wine)
  // --------------------------------------------------------------------------
  screen3: {
    introText: "this one is for you...",
    confessionText: "I Love You",
    subtitleText: "More than words could ever hold.",
    buttonText: "Our Memories →"
  },

  // --------------------------------------------------------------------------
  // SCREEN 4: The Photo Collage & Puzzle (8 Real Photos)
  // --------------------------------------------------------------------------
  screen4: {
    title: "Our Favorite Moments",
    instruction: "Tap each memory card to reveal our story!",
    buttonText: "Read My Letter →",
    photos: [
      { id: 1, src: "assets/images/real_photo1.jpg", caption: "Mirror selfies & retail therapy 🛍️", rotate: "-6deg" },
      { id: 2, src: "assets/images/real_photo2.jpg", caption: "Late night walks with you 🌙", rotate: "5deg" },
      { id: 3, src: "assets/images/real_photo3.jpg", caption: "Cozy moments together 🤍", rotate: "-4deg" },
      { id: 4, src: "assets/images/real_photo4.jpg", caption: "My prettiest girl in purple 💜", rotate: "7deg" },
      { id: 5, src: "assets/images/real_photo5.jpg", caption: "Sunny days in the park 🌿", rotate: "-5deg" },
      { id: 6, src: "assets/images/real_photo6.jpg", caption: "Your radiant, lovely smile ✨", rotate: "4deg" },
      { id: 7, src: "assets/images/real_photo7.jpg", caption: "Us being our silly selves 💕", rotate: "-7deg" },
      { id: 8, src: "assets/images/real_photo8.jpg", caption: "Forever & Always, Muskan ❤️", rotate: "6deg" }
    ]
  },

  // --------------------------------------------------------------------------
  // SCREEN 5: The Letters (The Bridge Screen)
  // --------------------------------------------------------------------------
  screen5: {
    headerTitle: "A LETTER FOR MUSKAN",
    paragraphs: [
      "Hey Mikuuu!!! You are finally 22 years now... A lot of things happened... You are now going to be a doctor 💊... I am really excited for the day when I am going to visit you as a patient and you'll treat me ... You have already done a lot and suffered a lot ... Now it's time to be happy...😇\n\nFrom June 7 of 2024 to till date... You have being such a nice person.... I really love you a lot... Whatever problem, conflict and things happen.... I am always by your side... I had so many things in my mind while thinking about what to write to you today....Funny how I can have a thousand thoughts about you but still struggle to put even a few of them into words.... Anyway, it's your birthday, and before anything else, I hope you know how special your existence is. Not just today, not because it's your birthday, but even on those completely ordinary days when nothing interesting happens..... I hope you will be happy 😊",
      "Well, there's something I owe you.... An apology. I'm sorry for the moments when I became difficult to understand, for the times my thoughts got louder than my understanding, and for every little thing I did that might have made your heart feel a little heavier..... Sometimes I wish I could pause certain moments....look at myself from your perspective and choose a better response... I won't pretend that I'm always easy to deal with. I'm not.... I have my own mess of thoughts, my own flaws, and sometimes I don't even know how to explain what's going on inside my head. But none of that should become your burden...",
      "I think one of the things I need to learn is that loving someone isn't just about feeling deeply.... It's also about behaving thoughtfully....It's about knowing when to speak, when to listen, when to understand and when to be simply exist... I am learning it slowly from the day I realised... I cant become perfect in a single day... But I will try muskan.... I don't want to hurt you... You are my Mon Coeur 🩷😇.... Happy Birthday Mikuuuu🩷\n\nBut wait... there is one more surprise hidden just for you."
    ],
    signature: "Forever yours, with all my heart ❤️",
    unlockButtonText: "Unlock Secret Surprise 🔓 →"
  },

  // --------------------------------------------------------------------------
  // SCREEN 6: Unlock For Surprise (Passcode Lock Screen)
  // --------------------------------------------------------------------------
  screen6: {
    passcode: "1210", // 12th date of 10th month
    title: "unlock for surprise",
    photo: "assets/images/passcode_couple.jpg",
    subtitle: "enter our secret date to unlock the grand surprise"
  },

  // --------------------------------------------------------------------------
  // SCREEN 7: The Cake Cutting Experience
  // --------------------------------------------------------------------------
  screen7: {
    title: "Time To Cut The Cake 🎂",
    instructionDesktop: "Use the knife to slice across the cake!",
    instructionMobile: "Swipe across the cake to cut your birthday slice! ✨"
  },

  // --------------------------------------------------------------------------
  // SCREEN 8: The Grand Finale (Glowing Letter)
  // --------------------------------------------------------------------------
  screen8: {
    badge: "A PROMISE WRITTEN IN THE STARS",
    heading: "I LOVE YOU",
    subheading: "HAPPY BIRTHDAY, MY MUSKAN ♥️",
    message: "Muskan, you are the most magical part of my entire universe. From every smile we share to every quiet moment together, loving you is the easiest, sweetest, and most wonderful feeling in the world. Today, the sky lights up with fireworks and lightning just to celebrate the day you arrived on this earth. Thank you for filling my days with warmth, laughter, and so much beauty. I promise to cherish you, protect your smile, and love you more and more with every passing day, today, tomorrow, and forever.",
    signature: "Always and forever yours ♥️",
    replayButtonText: "Relive The Journey From The Start ↻"
  },

  // Background Audio
  audio: {
    musicSrc: "assets/audio/romantic-piano.mp3",
    volume: 0.6
  }
};
