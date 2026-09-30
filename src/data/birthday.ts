export interface BirthdayConfig {
  name: string;
  fullName: string;
  turningAge: number;
  birthdayDate: string;
  authorName: string;

  hero: {
    badge: string;
    title: string;
    name: string;
    subtitle: string;
    buttonText: string;
  };

  birthdayMessage: {
    heading: string;
    message: string;
    playfulLine: string;
  };

  letter: {
    heading: string;
    salutation: string;
    body: string[];
    closing: string;
    signature: string;
  };

  quiz: {
    heading: string;
    subtitle: string;
  };

  messageBox: {
    heading: string;
    question: string;
    hint: string;
    placeholder: string;
    buttonText: string;
    sendingText: string;
    successBadge: string;
    successMessage: string;
    thankYouText: string;
  };

  finalCelebration: {
    title: string;
    subline1: string;
    subline2: string;
    closingWish: string;
  };
}

export const birthdayData: BirthdayConfig = {
  name: "Shalini",
  fullName: "Shalini R.",
  turningAge: 25,
  birthdayDate: "October 1, 2026",
  authorName: "Mukesh",

  hero: {
    badge: "✨ A little something for you ✨",
    title: "HAPPY BIRTHDAY",
    name: "SHALINI ❤️",
    subtitle: "25 looks pretty good on you. 😉",
    buttonText: "Open your surprise 💕",
  },

  birthdayMessage: {
    heading: "Happy 25th Birthday, Shalini! 🎂💗",
    message: "I hope your day is filled with the kind of happiness you bring into other people's lives.",
    playfulLine: "And yes… I may have spent slightly too much time making this. 😌",
  },

  letter: {
    heading: "💌 A little letter for you",
    salutation: "Shalini,",
    body: [
      "One year of calls, texts, random conversations and somehow you became one of my favourite people to talk to.",
      "I don't know how you managed to become such a big part of my everyday life… but honestly, I'm not complaining. 😌",
      "You already know I like you, so I won't make this birthday letter unnecessarily dramatic.",
      "I just wanted to say that talking to you, annoying you, and making you smile are some of my favourite things.",
      "So here's to 25… and hopefully many more conversations with you. ❤️",
      "Happy Birthday, pretty girl. 😉",
    ],
    closing: "With lots of affection,",
    signature: "— Mukesh",
  },

  quiz: {
    heading: "Okay… now I have a few questions for you 👀",
    subtitle: "Be honest. I'm watching. 😂",
  },

  messageBox: {
    heading: "Okay, your turn 💌",
    question: "Do you like me or love me or both, and say why?? 👀",
    hint: "I will be reading this 😌",
    placeholder: "Okay… here's the honest answer…",
    buttonText: "Send it to Mukesh 💌",
    sendingText: "Sending your secret answer… 👀",
    successBadge: "💌 Secret successfully delivered.",
    successMessage: "“Well… now I'm definitely going to read that more than once. 😌”",
    thankYouText: "Thank you for being honest. ❤️",
  },

  finalCelebration: {
    title: "HAPPY BIRTHDAY SHALINI ❤️",
    subline1: "Here's to 25, new memories, lots of laughter…",
    subline2: "…and hopefully many more calls with me. 😉",
    closingWish: "Have the most beautiful birthday. ❤️",
  },
};
