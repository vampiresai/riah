
import { Memory, LoveNote, TimelineEvent } from './types';

export const MEMORIES: Memory[] = [
  {
    id: 1,
    imageUrl: '/images/nik1.jpeg',
    caption: 'Totem unlocked: Sidequest',
    totemImageUrl: '/images/sidequest.png',
    totemLabel: 'Sidequest',
    quote: 'You are my favorite adventure.'
  },
  {
    id: 2,
    imageUrl: '/images/nik2.jpeg',
    caption: 'Totem unlocked: Blood Potion',
    totemImageUrl: '/images/blood%20potion.png',
    totemLabel: 'Blood Potion',
    quote: 'Your laughter is my favorite song.'
  },
  {
    id: 3,
    imageUrl: '/images/nik3.jpeg',
    caption: 'Totem unlocked: Photoshoot',
    totemImageUrl: '/images/photoshoot.png',
    totemLabel: 'Photoshoot',
    quote: 'Quiet moments, loudest feelings.'
  },
  {
    id: 4,
    imageUrl: '/images/nik4.jpeg',
    caption: 'Totem unlocked: Date',
    totemImageUrl: '/images/date.png',
    totemLabel: 'Date',
    quote: 'Every sunset is better with you.'
  },
  {
    id: 5,
    imageUrl: '/images/nik5.jpeg',
    caption: 'Totem unlocked: Concert',
    totemImageUrl: '/images/concert.png',
    totemLabel: 'Concert',
    quote: 'A million more dates to come.'
  },
  {
    id: 6,
    imageUrl: '/images/nik6.jpeg',
    caption: 'Totem unlocked: Diwali',
    totemImageUrl: '/images/diwali.png',
    totemLabel: 'Diwali',
    quote: 'Forever starts now.'
  }
];

export const LOVE_NOTES: LoveNote[] = [
  {
    id: 1,
    message:
      'Rii, I know I don’t always say things perfectly but loving you has never been confusing. You feel like home to me in a way nothing else ever has. I’m beyond grateful I get to be yours.'
  },
  {
    id: 2,
    message:
      'Maddy, loving you feels easy even when life isn’t. You make the bad days softer and the good days brighter just by being there. I hope you always know how deeply you’re loved. Forever yours.'
  },
  {
    id: 3,
    message:
      'My Squiggle, congrats on being the best decision I ever made. Also congrats on having the hottest boyfriend. Love you lots. xoxo'
  },
  {
    id: 4,
    message:
      'Riri, you’re my favourite person, my prettiest distraction and my number 1 weakness. I love you more than gaming (and that’s saying a lot). Your biggest fan, this is stan.'
  }
];

export const TIMELINE: TimelineEvent[] = [
  {
    id: 1,
    date: '14 May 2023',
    title: 'Our First “I Love You”',
    description:
      'It was my last day at my nanie’s house and the day after we battled the shackles of sleep on our first and longest call, we finally realised that we truly do love eachother.',
    icon: 'heart'
  },
  {
    id: 2,
    date: '22 June 2023',
    title: 'The day we got together',
    description:
      'I remember how long I waited to ask you out because I kept waiting for the right moment. We were at Madhurya’s estate and I finally had the courage to realise, there’s never not a right moment when i’m with you. I got on one knee and you were finally mine (she is now suffering as my birthday and our anniversary are 8 days apart).',
    icon: 'sparkles'
  },
  {
    id: 3,
    date: '25 May 2023',
    title: 'One of our First hangouts',
    description:
      'I remember how nervous I was to finally see you In art class during exams but when we finally saw eachother.. I felt so at ease. Besides Rishi third wheeling us it’s one of my favourite times because we fooled around more than we needed to but it was the most fun I’ve ever had.',
    icon: 'map'
  },
  {
    id: 4,
    date: 'Present',
    title: 'Present',
    description:
      'With the many late nights, gaming sessions, random calls and dates.. I want you to know that i’ve never stopped loving you. You will always be my favourite person in the whole wide world and I love you for everything that you are. You are my light at the end of the tunnel and I want you to know that I will love you— always and forever.',
    icon: 'anchor'
  }
];

export const TARGET_DATE = new Date('2025-02-14T00:00:00');
