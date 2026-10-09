import { User, SkillListing, SkillRequest, SwapProposal, LedgerTransaction } from '../types';

import heroImg from '../assets/images/hero_community_swap_1791531624481.jpg';
import bikeRepairImg from '../assets/images/skill_bike_repair_1791531640831.jpg';
import guitarImg from '../assets/images/skill_acoustic_guitar_1791531652304.jpg';
import sourdoughImg from '../assets/images/skill_sourdough_bread_1791531663830.jpg';
import potteryImg from '../assets/images/skill_pottery_ceramics_1791531683931.jpg';

export { heroImg };

export const INITIAL_USERS: User[] = [
  {
    id: 'user_maya',
    name: 'Maya Lin',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&h=256&q=80',
    neighborhood: 'Maplewood Green',
    bio: 'Acoustic fingerstyle player & avid sourdough baker. Passionate about timebanking and neighborhood resilience.',
    hoursBalance: 3.0,
    swapsCompleted: 7,
    vouchesCount: 6,
    skillsOffered: ['Acoustic Fingerstyle Guitar Lessons', 'Sourdough Starter & Crumb Baking'],
    skillsWanted: ['Bike brake & gear repair', 'Conversational Spanish', 'Ceramics']
  },
  {
    id: 'user_marcus',
    name: 'Marcus Vance',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=256&h=256&q=80',
    neighborhood: 'Eastside Lofts',
    bio: 'Community bike mechanic and vintage steel restorer. Spent 10 years fixing commuter rides. Happy to trade wrench time.',
    hoursBalance: 5.0,
    swapsCompleted: 14,
    vouchesCount: 11,
    skillsOffered: ['Bicycle Tune-Up & Derailleur Indexing', 'Commuter Bike Safety Inspection'],
    skillsWanted: ['Resume critique for tech transition', 'Guitar basics', 'Sourdough bread tips']
  },
  {
    id: 'user_elena',
    name: 'Elena Rostova',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=256&h=256&q=80',
    neighborhood: 'River North',
    bio: 'Staff UX Designer and bilingual speaker. I mentor junior designers and love community swaps to learn physical crafts.',
    hoursBalance: 2.0,
    swapsCompleted: 9,
    vouchesCount: 8,
    skillsOffered: ['Resume & Portfolio Review for Tech/Design', 'Conversational Spanish & Idioms'],
    skillsWanted: ['Pottery wheel practice', 'Acoustic guitar chords', 'Bike overhaul']
  },
  {
    id: 'user_david',
    name: 'David Chen',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=256&h=256&q=80',
    neighborhood: 'Arts District',
    bio: 'Ceramicist with a backyard studio. Offering wheel-throwing sessions in exchange for help with handiwork or languages.',
    hoursBalance: 4.0,
    swapsCompleted: 12,
    vouchesCount: 10,
    skillsOffered: ['Wheel-Thrown Pottery Fundamentals', 'Ceramic Glazing & Kiln Prep'],
    skillsWanted: ['Bicycle brake alignment', 'Vegetable garden planting', 'Basic accounting']
  },
  {
    id: 'user_sarah',
    name: 'Sarah Jenkins',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=256&h=256&q=80',
    neighborhood: 'Maplewood Green',
    bio: 'Master gardener & urban agriculture volunteer. Turning small balconies and yards into abundant food micro-plots.',
    hoursBalance: 3.5,
    swapsCompleted: 8,
    vouchesCount: 7,
    skillsOffered: ['Urban Raised-Bed Gardening & Compost Prep'],
    skillsWanted: ['Guitar lessons', 'Resume polish', 'Sewing alterations']
  }
];

export const INITIAL_LISTINGS: SkillListing[] = [
  {
    id: 'listing_bike_repair',
    userId: 'user_marcus',
    author: INITIAL_USERS[1],
    title: 'Bicycle Tune-Up & Derailleur Indexing',
    category: 'Repair & Making',
    durationHours: 1.0,
    swapPreference: 'any',
    lookingForSkill: 'Seeking tech resume critique or guitar fingerpicking fundamentals in return',
    format: 'In-person',
    location: 'Marcus’s Eastside Porch Workshop or Local Park',
    description: 'Bring your commuter or vintage road bike over! In 1 hour, we will align your derailleur, true slight wheel wobbles, lubricate chain cables, adjust brake pads, and give your bike that quiet, crisp shifting feel. You will learn the mechanics so you can do it yourself next time.',
    image: bikeRepairImg,
    experienceLevel: 'All Levels',
    toolsProvided: ['Park Tool truing stand', 'Hex keys & cable pullers', 'Chain wear gauge', 'Synthetic dry lube'],
    createdAt: '2026-10-02',
    vouches: [
      {
        id: 'vouch_1',
        authorName: 'Elena Rostova',
        skillName: 'Bike Tune-Up',
        text: 'Marcus fixed my ghost shifting in 45 minutes and taught me how barrel adjusters work. Incredible neighbor!',
        date: '3 days ago'
      },
      {
        id: 'vouch_2',
        authorName: 'David Chen',
        skillName: 'Brake Cable Swap',
        text: 'Patience of a saint. My 1989 Trek commuter rides like a dream now.',
        date: '1 week ago'
      }
    ]
  },
  {
    id: 'listing_guitar_lessons',
    userId: 'user_maya',
    author: INITIAL_USERS[0],
    title: 'Acoustic Fingerstyle Guitar Lessons',
    category: 'Music & Arts',
    durationHours: 1.0,
    swapPreference: 'any',
    lookingForSkill: 'Looking for bike repair help or conversational Spanish immersion',
    format: 'Both',
    location: 'Maplewood Green Community Gazebo or Zoom',
    description: 'Learn Travis picking, chord transitions without looking at your fretting hand, and open tunings (DADGAD). Whether you just bought your first guitar or are stuck playing the same three open chords, we will unlock your rhythm and groove in a relaxed, friendly 1-hour session.',
    image: guitarImg,
    experienceLevel: 'Beginner Friendly',
    toolsProvided: ['Chord diagram sheets', 'Clip-on tuner', 'Capo available to borrow', 'Custom practice tabs'],
    createdAt: '2026-10-04',
    vouches: [
      {
        id: 'vouch_3',
        authorName: 'Sarah Jenkins',
        skillName: 'Acoustic Guitar',
        text: 'Maya got me playing my first folk progression in just one afternoon. Zero intimidation!',
        date: '4 days ago'
      }
    ]
  },
  {
    id: 'listing_sourdough_bread',
    userId: 'user_maya',
    author: INITIAL_USERS[0],
    title: 'Sourdough Starter & Open-Crumb Baking',
    category: 'Food & Cooking',
    durationHours: 1.5,
    swapPreference: 'direct_barter',
    lookingForSkill: 'Trade for ceramics lesson or garden soil prep',
    format: 'In-person',
    location: 'Maya’s Kitchen (Maplewood Green)',
    description: 'Demystifying wild fermentation! You will leave with a jar of my active 5-year-old starter "Bubbles", a banneton proofing basket technique demonstration, autolyse timing secrets, and scoring patterns for that gorgeous ear and airy crumb.',
    image: sourdoughImg,
    experienceLevel: 'Beginner Friendly',
    toolsProvided: ['Live sourdough starter jar', 'Organic rye flour sample', 'Razor lame scoring blade', 'Dough scraper'],
    createdAt: '2026-10-05',
    vouches: [
      {
        id: 'vouch_4',
        authorName: 'Marcus Vance',
        skillName: 'Sourdough Starter',
        text: 'My bread finally has real rise instead of being a dense brick. Best time credit I ever spent.',
        date: '6 days ago'
      }
    ]
  },
  {
    id: 'listing_pottery_wheel',
    userId: 'user_david',
    author: INITIAL_USERS[3],
    title: 'Wheel-Thrown Pottery Fundamentals',
    category: 'Music & Arts',
    durationHours: 1.5,
    swapPreference: 'any',
    lookingForSkill: 'Seeking bicycle tune-up, Spanish conversation, or gardening advice',
    format: 'In-person',
    location: 'Arts District Backyard Studio',
    description: 'Get your hands dirty at the potter’s wheel. We will cover clay wedging, centering, opening the floor, pulling uniform cylinder walls, and shaping your first ceramic mug or bowl. Includes 1 piece bisque fired in my kiln!',
    image: potteryImg,
    experienceLevel: 'All Levels',
    toolsProvided: ['Shimpo whisper wheel access', 'Earthenware clay (5 lbs)', 'Wooden ribs & trimming loops', 'Studio aprons'],
    createdAt: '2026-10-06',
    vouches: [
      {
        id: 'vouch_5',
        authorName: 'Maya Lin',
        skillName: 'Pottery Wheel',
        text: 'David is so calm and encouraging when centering clay. Made my first tea bowl with him!',
        date: '2 weeks ago'
      }
    ]
  },
  {
    id: 'listing_resume_review',
    userId: 'user_elena',
    author: INITIAL_USERS[2],
    title: 'Resume & Portfolio Review for Tech/Design',
    category: 'Career & Digital',
    durationHours: 1.0,
    swapPreference: 'any',
    lookingForSkill: 'Hoping to trade for pottery wheel time or guitar chord coaching',
    format: 'Both',
    location: 'River North Cafe or Google Meet',
    description: 'Staff UX designer review of your resume, LinkedIn profile, or design portfolio case study. We will strip away corporate jargon, highlight measurable impact, and craft a narrative that catches hiring managers’ attention in 6 seconds.',
    image: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&w=800&q=80',
    experienceLevel: 'All Levels',
    toolsProvided: ['Figma case study markup', 'Resume ATS checklist', 'Recruiter interview prep template'],
    createdAt: '2026-10-07',
    vouches: [
      {
        id: 'vouch_6',
        authorName: 'Marcus Vance',
        skillName: 'Resume Overhaul',
        text: 'Elena revamped my resume from messy bullet points into crisp impact statements. Got 2 recruiter callbacks!',
        date: '5 days ago'
      }
    ]
  },
  {
    id: 'listing_spanish_conversation',
    userId: 'user_elena',
    author: INITIAL_USERS[2],
    title: 'Conversational Spanish & Real Slang',
    category: 'Language & Learning',
    durationHours: 1.0,
    swapPreference: 'hour_credit',
    lookingForSkill: 'Accepts 1.0 Time Credit or trade for bike maintenance',
    format: 'Both',
    location: 'Local Coffee Roasters or Zoom',
    description: 'Native Spanish conversation practice focused on everyday situations, colloquial phrasing, idioms, and natural rhythm rather than grammar drills. Ideal for intermediate speakers looking to break through hesitations and speak with confidence.',
    image: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=800&q=80',
    experienceLevel: 'Intermediate',
    toolsProvided: ['Vocabulary flashcard sheet', 'Audio voice-notes for accent drill', 'Custom idiom guide'],
    createdAt: '2026-10-08',
    vouches: []
  },
  {
    id: 'listing_urban_garden',
    userId: 'user_sarah',
    author: INITIAL_USERS[4],
    title: 'Urban Raised-Bed Gardening & Soil Setup',
    category: 'Home & Garden',
    durationHours: 1.5,
    swapPreference: 'any',
    lookingForSkill: 'Looking for acoustic guitar practice or computer help',
    format: 'In-person',
    location: 'Your Backyard / Balcony or Maplewood Garden',
    description: 'Turn your yard or apartment patio into a thriving produce patch! In 1.5 hours we will test your soil pH, build a mini companion-planting plan (tomatoes, basil, marigolds), troubleshoot pests organically, and set up drip irrigation tips.',
    image: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=800&q=80',
    experienceLevel: 'Beginner Friendly',
    toolsProvided: ['Soil tester kit', 'Heirloom seed starter packet', 'Seasonal planting calendar'],
    createdAt: '2026-10-08',
    vouches: [
      {
        id: 'vouch_7',
        authorName: 'Maya Lin',
        skillName: 'Balcony Garden',
        text: 'Sarah helped me plant my raised herbs and they have exploded with leaves all month!',
        date: '1 week ago'
      }
    ]
  }
];

export const INITIAL_REQUESTS: SkillRequest[] = [
  {
    id: 'req_1',
    userId: 'user_maya',
    author: INITIAL_USERS[0],
    title: 'Need help replacing bathroom sink cartridge / leaky faucet',
    category: 'Repair & Making',
    urgency: 'This Week',
    creditsOffered: 1.0,
    lookingFor: 'Plumbing / Handyman Skill',
    format: 'In-person',
    responsesCount: 2,
    createdAt: '2026-10-07'
  },
  {
    id: 'req_2',
    userId: 'user_marcus',
    author: INITIAL_USERS[1],
    title: 'Looking for 1 hour Japanese conversation practice before Tokyo trip',
    category: 'Language & Learning',
    urgency: 'Flexible',
    creditsOffered: 1.0,
    lookingFor: 'Japanese Native / Fluent Speaker',
    format: 'Both',
    responsesCount: 1,
    createdAt: '2026-10-06'
  },
  {
    id: 'req_3',
    userId: 'user_david',
    author: INITIAL_USERS[3],
    title: 'Need someone to show me basic studio microphone EQ & podcast recording',
    category: 'Music & Arts',
    urgency: 'Flexible',
    creditsOffered: 1.5,
    lookingFor: 'Audio Engineering / Podcasting Skill',
    format: 'Both',
    responsesCount: 3,
    createdAt: '2026-10-05'
  },
  {
    id: 'req_4',
    userId: 'user_sarah',
    author: INITIAL_USERS[4],
    title: 'Looking for sewing machine help to hem 3 vintage linen curtains',
    category: 'Repair & Making',
    urgency: 'This Week',
    creditsOffered: 1.0,
    lookingFor: 'Sewing / Tailoring Basics',
    format: 'In-person',
    responsesCount: 0,
    createdAt: '2026-10-08'
  }
];

export const INITIAL_SWAPS: SwapProposal[] = [
  {
    id: 'swap_active_1',
    listingId: 'listing_bike_repair',
    requesterId: 'user_maya',
    recipientId: 'user_marcus',
    requester: INITIAL_USERS[0],
    recipient: INITIAL_USERS[1],
    offeredType: 'time_credit',
    requestedSkillTitle: 'Bicycle Tune-Up & Derailleur Indexing',
    hours: 1.0,
    proposedDate: 'Saturday, Oct 11',
    proposedTime: '10:30 AM',
    location: 'Marcus’s Porch Workshop',
    format: 'In-person',
    note: 'Hi Marcus! My vintage road bike is skipping on the 4th gear cog. Would love to trade 1 hour credit to get it running smooth!',
    status: 'accepted',
    messages: [
      {
        id: 'msg_1',
        senderId: 'user_maya',
        senderName: 'Maya Lin',
        text: 'Hi Marcus! Can we meet at your porch this Saturday morning? I will bring my steel Fuji road bike.',
        timestamp: 'Yesterday at 3:15 PM'
      },
      {
        id: 'msg_2',
        senderId: 'user_marcus',
        senderName: 'Marcus Vance',
        text: 'Sounds great Maya! I have fresh cable housings and lube ready. See you at 10:30 AM on Saturday.',
        timestamp: 'Yesterday at 4:20 PM'
      }
    ],
    createdAt: '2026-10-07'
  },
  {
    id: 'swap_pending_2',
    listingId: 'listing_pottery_wheel',
    requesterId: 'user_elena',
    recipientId: 'user_david',
    requester: INITIAL_USERS[2],
    recipient: INITIAL_USERS[3],
    offeredType: 'direct_swap',
    offeredSkillTitle: 'Resume & Portfolio Review for Tech/Design',
    requestedSkillTitle: 'Wheel-Thrown Pottery Fundamentals',
    hours: 1.5,
    proposedDate: 'Sunday, Oct 12',
    proposedTime: '2:00 PM',
    location: 'Arts District Backyard Studio',
    format: 'In-person',
    note: 'Hey David! I would love to trade 1.5 hours of tech portfolio coaching for an introduction to wheel throwing.',
    status: 'pending',
    messages: [
      {
        id: 'msg_3',
        senderId: 'user_elena',
        senderName: 'Elena Rostova',
        text: 'Hey David! Excited to propose a direct barter: portfolio advice for pottery time!',
        timestamp: 'Today at 9:00 AM'
      }
    ],
    createdAt: '2026-10-09'
  },
  {
    id: 'swap_completed_3',
    listingId: 'listing_guitar_lessons',
    requesterId: 'user_sarah',
    recipientId: 'user_maya',
    requester: INITIAL_USERS[4],
    recipient: INITIAL_USERS[0],
    offeredType: 'time_credit',
    requestedSkillTitle: 'Acoustic Fingerstyle Guitar Lessons',
    hours: 1.0,
    proposedDate: 'Sunday, Oct 5',
    proposedTime: '3:00 PM',
    location: 'Maplewood Green Gazebo',
    format: 'In-person',
    note: 'Thanks for teaching me fingerpicking basics, Maya!',
    status: 'completed',
    messages: [
      {
        id: 'msg_4',
        senderId: 'user_maya',
        senderName: 'Maya Lin',
        text: 'Session wrapped up! You nailed the alternating thumb bass pattern.',
        timestamp: 'Oct 5 at 4:10 PM'
      }
    ],
    createdAt: '2026-10-04'
  }
];

export const INITIAL_TRANSACTIONS: LedgerTransaction[] = [
  {
    id: 'tx_1',
    userId: 'user_maya',
    type: 'welcome_grant',
    hours: 2.0,
    description: 'Community Welcome Time Grant',
    counterpartName: 'HourShare Network',
    timestamp: 'Oct 1, 2026'
  },
  {
    id: 'tx_2',
    userId: 'user_maya',
    type: 'credit_earned',
    hours: 1.0,
    description: 'Taught Acoustic Fingerstyle Guitar to Sarah Jenkins',
    counterpartName: 'Sarah Jenkins',
    timestamp: 'Oct 5, 2026',
    swapId: 'swap_completed_3'
  }
];
