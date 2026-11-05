import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Sermon,
  ChurchEvent,
  Ministry,
  WorshipProgram,
  Announcement,
  GalleryItem,
  VisitorRegistration,
  BibleStudyRequest,
  PrayerRequest,
  ContactMessage,
  ChurchSettings,
  AdminUser,
} from '../types';

// Pre-generated high-fidelity image assets
const HERO_IMAGE = '/src/assets/images/hero_sda_worship_1793870390351.jpg';
const WELCOME_IMAGE = '/src/assets/images/welcome_congregation_1793870391204.jpg';
const YOUTH_IMAGE = '/src/assets/images/adventist_youth_pathfinders_1793870391887.jpg';
const BIBLE_IMAGE = '/src/assets/images/bible_study_scripture_1793870392769.jpg';

const INITIAL_SETTINGS: ChurchSettings = {
  churchName: 'The Seventh-day Adventist Church',
  tagline: 'Growing in Faith. Living in Hope. Sharing God’s Love.',
  phone: '+1 (800) 253-3000',
  whatsapp: '+1 (800) 253-3000',
  email: 'info@adventistchurch.org',
  address: '12501 Old Columbia Pike, Silver Spring, MD 20904',
  sabbathSchoolTime: 'Saturday 09:30 AM',
  divineWorshipTime: 'Saturday 11:00 AM',
  prayerMeetingTime: 'Wednesday 07:00 PM',
  livestreamUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
  givingInstructions: 'Tithes and offerings may be returned via Adventist Giving, local church treasurer envelope, or secure bank transfer. The Seventh-day Adventist Church practices biblical stewardship, supporting global gospel proclamation, humanitarian service, and Christian education.',
};

const INITIAL_PROGRAMMES: WorshipProgram[] = [
  {
    id: 'prog-1',
    name: 'Sabbath School',
    day: 'Every Saturday',
    time: '09:30 AM – 10:45 AM',
    description: 'An interactive Bible study in age-specific classes exploring the Adult Sabbath School Lesson, sharing mission stories and Christian fellowship.',
    location: 'Main Sanctuary & Classrooms',
    active: true,
  },
  {
    id: 'prog-2',
    name: 'Divine Worship Service',
    day: 'Every Saturday',
    time: '11:00 AM – 12:45 PM',
    description: 'A sacred time of praise, reverent prayer, scriptural proclamation, choral music, and life-changing biblical preaching.',
    location: 'Main Sanctuary & Online Live',
    active: true,
  },
  {
    id: 'prog-3',
    name: 'Adventist Youth (AY) Programme',
    day: 'Every Saturday',
    time: '04:30 PM – 06:00 PM',
    description: 'Dynamic youth-led spiritual discussions, musical praise, debates, outreach prep, and Christian fellowship for young adults and teens.',
    location: 'Youth Hall',
    active: true,
  },
  {
    id: 'prog-4',
    name: 'Midweek Prayer Meeting',
    day: 'Every Wednesday',
    time: '07:00 PM – 08:15 PM',
    description: 'A weekly oasis for the soul: intercessory prayer, testimonial praise, and devotional exploration of Scripture.',
    location: 'Chapel & Virtual Fellowship',
    active: true,
  },
  {
    id: 'prog-5',
    name: 'Community Food Pantry & Outreach',
    day: 'First & Third Sunday',
    time: '10:00 AM – 01:00 PM',
    description: 'Sharing Christ’s love in practical deeds by distributing fresh groceries, clothing, and wellness care to families in our neighborhood.',
    location: 'Community Services Center',
    active: true,
  },
];

const INITIAL_SERMONS: Sermon[] = [
  {
    id: 'sermon-1',
    title: 'The Blessed Hope: Looking for His Glorious Appearing',
    speaker: 'Pastor Michael A. Vance',
    speakerRole: 'Senior Pastor',
    date: 'March 14, 2026',
    scripture: 'Titus 2:11-14; Revelation 22:20',
    description: 'A powerful reflection on the central Adventist assurance: the soon literal return of Jesus Christ in majesty and the transformative hope that anchors our daily lives.',
    category: 'Prophecy',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    thumbnailUrl: HERO_IMAGE,
    duration: '42 min',
    featured: true,
  },
  {
    id: 'sermon-2',
    title: 'Rest for the Weary: The Sanctuary of Time',
    speaker: 'Dr. Sarah Jenkins',
    speakerRole: 'Associate Pastor & Family Ministries',
    date: 'March 7, 2026',
    scripture: 'Genesis 2:1-3; Exodus 20:8-11',
    description: 'Discovering the spiritual rhythm of the Seventh-day Sabbath as a sanctuary in time—a weekly palace in time where we unplug from worldly burdens and celebrate creation and redemption.',
    category: 'Latest Sermons',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
    thumbnailUrl: WELCOME_IMAGE,
    duration: '38 min',
    featured: false,
  },
  {
    id: 'sermon-3',
    title: 'The Three Angels’ Messages for Today’s World',
    speaker: 'Pastor Michael A. Vance',
    speakerRole: 'Senior Pastor',
    date: 'February 28, 2026',
    scripture: 'Revelation 14:6-12',
    description: 'Examining God’s final emergency broadcast of love to humanity: worshiping the Creator, standing firm against deception, and keeping the faith of Jesus.',
    category: 'Prophecy',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
    thumbnailUrl: BIBLE_IMAGE,
    duration: '45 min',
    featured: false,
  },
  {
    id: 'sermon-4',
    title: 'Rooted and Grounded: Living as Disciples in Babylon',
    speaker: 'Elder David K. Mensah',
    speakerRole: 'Youth & Young Adults Director',
    date: 'February 21, 2026',
    scripture: 'Daniel 1:8; Romans 12:1-2',
    description: 'How young Adventists can stand with unswerving integrity in contemporary culture, rooted in prayer, moral courage, and authentic discipleship.',
    category: 'Youth Messages',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    thumbnailUrl: YOUTH_IMAGE,
    duration: '35 min',
    featured: false,
  },
  {
    id: 'sermon-5',
    title: 'Grace in the Sanctuary: High Priest of Our Profession',
    speaker: 'Dr. Thomas Albright',
    speakerRole: 'Guest Evangelist',
    date: 'February 14, 2026',
    scripture: 'Hebrews 4:14-16; 8:1-2',
    description: 'An uplifting journey through Hebrews: how Jesus ministers on our behalf today in the heavenly sanctuary, offering mercy and grace to help in time of need.',
    category: 'Bible Study',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    thumbnailUrl: HERO_IMAGE,
    duration: '40 min',
    featured: false,
  },
  {
    id: 'sermon-6',
    title: 'Walking in Wholeness: Health, Temperance & Spirit',
    speaker: 'Dr. Evelyn Martinez',
    speakerRole: 'Health Ministries Leader',
    date: 'February 7, 2026',
    scripture: '1 Corinthians 6:19-20; 3 John 1:2',
    description: 'The Adventist health message as an entering wedge for the Gospel—honoring God with our bodies, minds, and spirits through practical temperance and nutrition.',
    category: 'Christian Living',
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    thumbnailUrl: WELCOME_IMAGE,
    duration: '34 min',
    featured: false,
  },
];

const INITIAL_EVENTS: ChurchEvent[] = [
  {
    id: 'event-1',
    title: 'General Evangelistic Series: Hope for Troubled Times',
    date: 'April 10 - April 24, 2026',
    time: '7:00 PM Nightly (Except Thursdays)',
    venue: 'Main Sanctuary & Livestream Broadcast',
    category: 'Evangelism',
    description: 'A 14-night revelation journey exploring biblical prophecy, world history, archaeology, and the everlasting Gospel of Jesus Christ. Free study guides and childcare provided.',
    imageUrl: BIBLE_IMAGE,
    registrationRequired: true,
    registrationCount: 142,
    featured: true,
  },
  {
    id: 'event-2',
    title: 'Annual Youth & Pathfinder Camporee 2026',
    date: 'May 15 - May 17, 2026',
    time: 'Friday 4:00 PM – Sunday 2:00 PM',
    venue: 'Pine Haven Adventist Camp Grounds',
    category: 'Youth',
    description: 'An unforgettable weekend of wilderness camping, pioneering skills, worship songs around the campfire, biblical teamwork challenges, and spiritual renewal.',
    imageUrl: YOUTH_IMAGE,
    registrationRequired: true,
    registrationCount: 88,
    featured: true,
  },
  {
    id: 'event-3',
    title: 'Community Health Fair & Free Clinic Day',
    date: 'April 26, 2026',
    time: '9:00 AM – 3:00 PM',
    venue: 'Church Community Center & Fellowship Hall',
    category: 'Outreach',
    description: 'Free blood pressure checks, cholesterol screenings, dental checkups, lifestyle medicine consultations, and plant-based cooking demonstrations open to all neighbors.',
    imageUrl: WELCOME_IMAGE,
    registrationRequired: false,
    registrationCount: 65,
    featured: false,
  },
  {
    id: 'event-4',
    title: 'Mid-Year 24-Hour Prayer Convocation',
    date: 'June 5, 2026',
    time: 'Starting Friday 6:00 PM',
    venue: 'Prayer Chapel & Online Sanctuary',
    category: 'Prayer',
    description: 'United intercession for families, church missions, community revival, and spiritual outpourings of the Holy Spirit.',
    imageUrl: HERO_IMAGE,
    registrationRequired: false,
    registrationCount: 47,
    featured: false,
  },
  {
    id: 'event-5',
    title: 'Sacred Baptism & New Life Celebration',
    date: 'June 27, 2026',
    time: 'Sabbath Morning 11:30 AM',
    venue: 'Main Sanctuary Baptistry',
    category: 'Baptism',
    description: 'A joyous Sabbath celebration witnessing new believers make public covenants of faith and burial into Christ through full water immersion baptism.',
    imageUrl: WELCOME_IMAGE,
    registrationRequired: false,
    registrationCount: 110,
    featured: false,
  },
];

const INITIAL_MINISTRIES: Ministry[] = [
  {
    id: 'min-1',
    title: 'Adventist Youth Ministry (AYM)',
    leader: 'Elder David K. Mensah',
    category: 'Youth & Young Adults',
    description: 'Empowering young people to discover their God-given identity, cultivate deep biblical conviction, and lead vibrant Christ-centered ministries.',
    mission: 'To lead young people into a saving relationship with Jesus Christ and nurture them into lifelong service for God and humanity.',
    activities: ['Weekly AY spiritual sessions', 'Youth missions & evangelism', 'University campus outreach', 'Annual retreat & conferences'],
    meetingSchedule: 'Every Sabbath at 4:30 PM',
    imageUrl: YOUTH_IMAGE,
    contactEmail: 'youth@adventistchurch.org',
  },
  {
    id: 'min-2',
    title: 'Pathfinder & Adventurer Club',
    leader: 'Director Carlos & Angela Rivera',
    category: 'Children & Adolescents',
    description: 'A world-recognized scouting and character-building program fostering teamwork, outdoor skills, honors in nature and crafts, and spiritual devotion.',
    mission: 'Leading children and teens ages 4 to 15 to love Jesus, serve others, and develop practical survival and vocational competencies.',
    activities: ['Bi-weekly club meetings', 'Camping & wilderness honors', 'Parades & civic service', 'Bible Bowl championships'],
    meetingSchedule: '1st & 3rd Sunday at 10:00 AM',
    imageUrl: YOUTH_IMAGE,
    contactEmail: 'pathfinders@adventistchurch.org',
  },
  {
    id: 'min-3',
    title: 'Sabbath School Ministry',
    leader: 'Elder Hannah Wilson',
    category: 'Christian Education',
    description: 'The heartbeat of the church’s biblical teaching, offering small-group scriptural dialogue for cradle roll, kindergarten, primary, youth, and adults.',
    mission: 'To foster deep Bible literacy, world mission awareness, and caring small-group fellowship every Sabbath morning.',
    activities: ['Interactive lesson studies', 'Mission spotlight presentations', 'Quarterly outreach projects', 'Teacher training seminars'],
    meetingSchedule: 'Every Saturday at 9:30 AM',
    imageUrl: BIBLE_IMAGE,
    contactEmail: 'sabbathschool@adventistchurch.org',
  },
  {
    id: 'min-4',
    title: 'Adventist Community Services (ACS)',
    leader: 'Sister Beatrice Thornton',
    category: 'Outreach & Compassion',
    description: 'Extending Christ’s hands of compassion through emergency food relief, clothing distribution, disaster response, and neighborhood care.',
    mission: 'To serve the poor, vulnerable, and marginalized in our city in the spirit of Matthew 25.',
    activities: ['Weekly food pantry', 'Disaster relief readiness', 'Senior citizen visitation', 'Job readiness workshops'],
    meetingSchedule: 'Tuesdays & Sundays',
    imageUrl: WELCOME_IMAGE,
    contactEmail: 'community@adventistchurch.org',
  },
  {
    id: 'min-5',
    title: 'Health Ministries',
    leader: 'Dr. Evelyn Martinez, MD',
    category: 'Health & Temperance',
    description: 'Promoting the biblical message of physical, mental, and spiritual wellness through evidence-based lifestyle medicine and the NEWSTART principles.',
    mission: 'To restore the whole person—body, mind, and soul—to the image of God through healthy living.',
    activities: ['Cooking demonstrations', 'Community health expos', 'Smoking cessation seminars', 'Mental wellness workshops'],
    meetingSchedule: 'Monthly 2nd Sunday at 2:00 PM',
    imageUrl: WELCOME_IMAGE,
    contactEmail: 'health@adventistchurch.org',
  },
  {
    id: 'min-6',
    title: 'Adventist Men’s Ministry',
    leader: 'Elder Robert Henderson',
    category: 'Adult Ministries',
    description: 'Equipping Christian men to be loving spiritual leaders in their homes, mentors to younger generations, and dedicated servants of God.',
    mission: 'To cultivate brotherhood, spiritual accountability, and Christian integrity in every sphere of life.',
    activities: ['Monthly prayer breakfast', 'Father-son retreats', 'Home repair for widows and elderly', 'Men’s Bible studies'],
    meetingSchedule: 'First Sunday of each month at 8:30 AM',
    imageUrl: HERO_IMAGE,
    contactEmail: 'men@adventistchurch.org',
  },
  {
    id: 'min-7',
    title: 'Women’s Ministry',
    leader: 'Sister Grace Osei',
    category: 'Adult Ministries',
    description: 'Nurturing, encouraging, and equipping women for spiritual growth, mentorship, and service within the church and wider community.',
    mission: 'To uphold and empower women as persons of spiritual value in Christ Jesus.',
    activities: ['Women’s prayer retreats', 'Mentorship for young women', 'Mothers of preschoolers circles', 'Spiritual book clubs'],
    meetingSchedule: 'Third Saturday of each month at 3:00 PM',
    imageUrl: WELCOME_IMAGE,
    contactEmail: 'women@adventistchurch.org',
  },
  {
    id: 'min-8',
    title: 'Family Life Ministry',
    leader: 'Pastors Michael & Janet Vance',
    category: 'Family & Marriage',
    description: 'Strengthening marriages, supporting parents, and guiding families toward Christ-centered wholeness through seminars and counseling.',
    mission: 'To reinforce the sacred bond of Christian marriage and foster resilient, loving Adventist homes.',
    activities: ['Annual marriage renewal retreat', 'Parenting seminars', 'Premarital counseling', 'Family worship guides'],
    meetingSchedule: 'Quarterly weekend symposiums',
    imageUrl: WELCOME_IMAGE,
    contactEmail: 'family@adventistchurch.org',
  },
  {
    id: 'min-9',
    title: 'Children’s Ministry',
    leader: 'Sister Rebecca Lawson',
    category: 'Children',
    description: 'Guiding infants, toddlers, and grade-schoolers into a warm, foundational friendship with Jesus through creative, joyful lessons.',
    mission: 'To nurture children into a loving, lifelong covenant with their Savior.',
    activities: ['Children’s Church Sabbath services', 'Vacation Bible School (VBS)', 'Children’s choir', 'Bible memory challenges'],
    meetingSchedule: 'Every Sabbath morning',
    imageUrl: WELCOME_IMAGE,
    contactEmail: 'children@adventistchurch.org',
  },
  {
    id: 'min-10',
    title: 'Personal Ministries & Evangelism',
    leader: 'Elder Kenneth Graham',
    category: 'Evangelism',
    description: 'Training and mobilizing members in active soul-winning, literature distribution, tract ministry, and one-on-one Bible studies.',
    mission: 'To prepare every church member to be an effective missionary disciple in their everyday circle of influence.',
    activities: ['Door-to-door visitation', 'Bible study training', 'Literature distribution campaigns', 'Public evangelism support'],
    meetingSchedule: 'Every Sabbath at 3:00 PM',
    imageUrl: BIBLE_IMAGE,
    contactEmail: 'personalministries@adventistchurch.org',
  },
  {
    id: 'min-11',
    title: 'Music & Worship Ministry',
    leader: 'Minister Julian Ward',
    category: 'Worship Arts',
    description: 'Elevating sacred praise through uplifting choral anthems, congregational hymns, orchestral music, and praise ensembles.',
    mission: 'To lead the congregation into reverent, inspiring adoration of God through sacred music of excellence.',
    activities: ['Sanctuary choir rehearsals', 'Youth praise team', 'Handbell choir', 'Annual Christmas & Easter cantatas'],
    meetingSchedule: 'Thursdays at 7:00 PM & Sabbaths',
    imageUrl: HERO_IMAGE,
    contactEmail: 'music@adventistchurch.org',
  },
  {
    id: 'min-12',
    title: 'Education Ministry',
    leader: 'Prof. Margaret Cole',
    category: 'Christian Education',
    description: 'Promoting Christian education from Adventist elementary schools to academies and universities, supporting students with scholarships and mentorship.',
    mission: 'To restore the image of God in each student through mental, physical, and spiritual development.',
    activities: ['Adventist education promotion', 'Student scholarship fund', 'Tutoring and homework club', 'College transition seminars'],
    meetingSchedule: 'Monthly on Sundays',
    imageUrl: BIBLE_IMAGE,
    contactEmail: 'education@adventistchurch.org',
  },
];

const INITIAL_ANNOUNCEMENTS: Announcement[] = [
  {
    id: 'ann-1',
    title: 'Sabbath Divine Service & Fellowship Lunch',
    content: 'All visitors are warmly invited to join us for our Sabbath fellowship meal immediately following the 11:00 AM Divine Worship service in the Fellowship Hall.',
    date: 'March 2026',
    priority: 'high',
    active: true,
  },
  {
    id: 'ann-2',
    title: 'Spring Week of Prayer Beginning Next Sabbath',
    content: 'Join us for nightly sessions exploring "Steadfast in the Word" from 7:00 PM to 8:15 PM. Special prayer requests will be uplifted every evening.',
    date: 'March 2026',
    priority: 'normal',
    active: true,
  },
  {
    id: 'ann-3',
    title: 'Pathfinder Bible Experience (PBE) Regional Finals',
    content: 'Congratulations to our Pathfinder team for qualifying for the Union finals on the book of Romans. Please keep our youth in prayer.',
    date: 'March 2026',
    priority: 'normal',
    active: true,
  },
];

const INITIAL_GALLERY: GalleryItem[] = [
  {
    id: 'gal-1',
    title: 'Sabbath Morning Divine Worship',
    category: 'Church Services',
    imageUrl: HERO_IMAGE,
    date: 'March 2026',
    description: 'Congregation gathered in reverent prayer and scriptural worship in the main sanctuary.',
  },
  {
    id: 'gal-2',
    title: 'Welcoming Guests & Church Fellowship',
    category: 'Church Services',
    imageUrl: WELCOME_IMAGE,
    date: 'March 2026',
    description: 'Warm smiles and Christian fellowship in the church foyer following divine service.',
  },
  {
    id: 'gal-3',
    title: 'Pathfinder Camporee & Scripture Drill',
    category: 'Youth Activities',
    imageUrl: YOUTH_IMAGE,
    date: 'February 2026',
    description: 'Adventist youth and pathfinders studying the Word together in the great outdoors.',
  },
  {
    id: 'gal-4',
    title: 'Dedicated Bible Study & Prayer Group',
    category: 'Church Services',
    imageUrl: BIBLE_IMAGE,
    date: 'February 2026',
    description: 'Midweek Bible study participants exploring biblical prophecy and foundational truths.',
  },
  {
    id: 'gal-5',
    title: 'Sacred Water Baptism Celebration',
    category: 'Baptisms',
    imageUrl: WELCOME_IMAGE,
    date: 'January 2026',
    description: 'Rejoicing as new members take baptismal vows and enter covenant relationship with Christ.',
  },
  {
    id: 'gal-6',
    title: 'Community Food Distribution & Care',
    category: 'Mission & Outreach',
    imageUrl: WELCOME_IMAGE,
    date: 'January 2026',
    description: 'Adventist Community Services volunteers packing and handing out healthy fresh food parcels.',
  },
];

const INITIAL_VISITORS: VisitorRegistration[] = [
  {
    id: 'vis-1',
    fullName: 'Jonathan & Rachel Vance',
    email: 'jonathan.vance@example.com',
    phone: '+1 (555) 234-5678',
    numberOfVisitors: 3,
    preferredVisitDate: '2026-03-21',
    message: 'We recently moved to the area and are looking for a Bible-believing Seventh-day Adventist church for our young family.',
    createdAt: '2026-03-12 14:32',
    status: 'Contacted',
    notes: 'Sent welcome packet by email; assigned deacon Elder Miller to greet them at foyer.',
  },
  {
    id: 'vis-2',
    fullName: 'Grace Chen',
    email: 'grace.chen@example.com',
    phone: '+1 (555) 876-5432',
    numberOfVisitors: 1,
    preferredVisitDate: '2026-03-28',
    message: 'Interested in attending the Adult Sabbath School and understanding the biblical Sabbath.',
    createdAt: '2026-03-14 09:15',
    status: 'Pending',
    notes: 'Call to confirm directions and offer companion for Sabbath School.',
  },
];

const INITIAL_BIBLE_STUDIES: BibleStudyRequest[] = [
  {
    id: 'bs-1',
    fullName: 'Marcus Aurelius Sterling',
    email: 'm.sterling@example.com',
    phone: '+1 (555) 345-6789',
    preferredMethod: 'In-Person',
    message: 'I have questions regarding Daniel and Revelation prophecies and the sanctuary message.',
    createdAt: '2026-03-13 18:20',
    status: 'In Progress',
    assignedTeacher: 'Pastor Michael Vance',
  },
  {
    id: 'bs-2',
    fullName: 'Helena Roberts',
    email: 'helena.r@example.com',
    phone: '+1 (555) 456-7890',
    preferredMethod: 'Self-Paced Guides',
    message: 'Please send me the Amazing Facts or Discover Bible study guides by email or post.',
    createdAt: '2026-03-14 11:05',
    status: 'New',
  },
];

const INITIAL_PRAYERS: PrayerRequest[] = [
  {
    id: 'pray-1',
    fullName: 'Anonymous Sister in Christ',
    isConfidential: true,
    requestText: 'Please pray for my husband undergoing heart surgery next Tuesday, and for peace for our children.',
    createdAt: '2026-03-14 16:45',
    status: 'Prayed For',
    notes: 'Uplifted at Wednesday prayer meeting intercessory circle.',
  },
  {
    id: 'pray-2',
    fullName: 'Samuel & Deborah Taylor',
    email: 'taylor.fam@example.com',
    isConfidential: false,
    requestText: 'Praise report: Our daughter has safely arrived at her mission post in East Africa! Thank you for your prayers.',
    createdAt: '2026-03-15 08:30',
    status: 'Praise Report',
  },
];

const INITIAL_MESSAGES: ContactMessage[] = [
  {
    id: 'msg-1',
    fullName: 'Daniel Cooper',
    email: 'd.cooper@example.com',
    phone: '+1 (555) 789-0123',
    category: 'General enquiry',
    message: 'Hello, what translation of the Holy Scriptures is typically read in your Sabbath pulpit?',
    createdAt: '2026-03-14 13:20',
    status: 'Read',
  },
  {
    id: 'msg-2',
    fullName: 'Sophia Martinez',
    email: 'smartinez@example.com',
    category: 'Volunteering',
    message: 'I would like to volunteer with the Adventist Community Services food pantry on Sundays.',
    createdAt: '2026-03-15 10:15',
    status: 'Unread',
  },
];

const INITIAL_USERS: AdminUser[] = [
  {
    id: 'usr-1',
    name: 'Pastor Michael Vance',
    email: 'senior.pastor@adventistchurch.org',
    role: 'Super Administrator',
    active: true,
    lastLogin: 'Today, 08:24 AM',
  },
  {
    id: 'usr-2',
    name: 'Sister Hannah Wilson',
    email: 'communications@adventistchurch.org',
    role: 'Administrator',
    active: true,
    lastLogin: 'Yesterday, 04:12 PM',
  },
  {
    id: 'usr-3',
    name: 'Elder David Mensah',
    email: 'media.editor@adventistchurch.org',
    role: 'Content Editor',
    active: true,
    lastLogin: '2 days ago',
  },
];

interface ChurchContextType {
  sermons: Sermon[];
  events: ChurchEvent[];
  ministries: Ministry[];
  programmes: WorshipProgram[];
  announcements: Announcement[];
  gallery: GalleryItem[];
  visitors: VisitorRegistration[];
  bibleStudies: BibleStudyRequest[];
  prayers: PrayerRequest[];
  messages: ContactMessage[];
  settings: ChurchSettings;
  users: AdminUser[];
  currentUser: AdminUser;

  // Media Modals
  activeVideo: Sermon | null;
  activeAudio: Sermon | null;
  activeImage: GalleryItem | null;
  setActiveVideo: (sermon: Sermon | null) => void;
  setActiveAudio: (sermon: Sermon | null) => void;
  setActiveImage: (item: GalleryItem | null) => void;

  // Sermon actions
  addSermon: (sermon: Omit<Sermon, 'id'>) => void;
  updateSermon: (id: string, sermon: Partial<Sermon>) => void;
  deleteSermon: (id: string) => void;

  // Event actions
  addEvent: (event: Omit<ChurchEvent, 'id'>) => void;
  updateEvent: (id: string, event: Partial<ChurchEvent>) => void;
  deleteEvent: (id: string) => void;
  registerForEvent: (id: string) => void;

  // Ministry actions
  updateMinistry: (id: string, ministry: Partial<Ministry>) => void;

  // Programme actions
  updateProgramme: (id: string, program: Partial<WorshipProgram>) => void;
  addProgramme: (program: Omit<WorshipProgram, 'id'>) => void;

  // Announcement actions
  addAnnouncement: (announcement: Omit<Announcement, 'id'>) => void;
  updateAnnouncement: (id: string, announcement: Partial<Announcement>) => void;
  deleteAnnouncement: (id: string) => void;

  // Gallery actions
  addGalleryItem: (item: Omit<GalleryItem, 'id'>) => void;
  deleteGalleryItem: (id: string) => void;

  // Visitor actions
  submitVisitorRegistration: (data: Omit<VisitorRegistration, 'id' | 'createdAt' | 'status'>) => void;
  updateVisitorStatus: (id: string, status: VisitorRegistration['status'], notes?: string) => void;

  // Bible study actions
  submitBibleStudyRequest: (data: Omit<BibleStudyRequest, 'id' | 'createdAt' | 'status'>) => void;
  updateBibleStudyStatus: (id: string, status: BibleStudyRequest['status'], assignedTeacher?: string) => void;

  // Prayer actions
  submitPrayerRequest: (data: Omit<PrayerRequest, 'id' | 'createdAt' | 'status'>) => void;
  updatePrayerStatus: (id: string, status: PrayerRequest['status'], notes?: string) => void;

  // Message actions
  submitContactMessage: (data: Omit<ContactMessage, 'id' | 'createdAt' | 'status'>) => void;
  updateMessageStatus: (id: string, status: ContactMessage['status']) => void;

  // Settings
  updateSettings: (newSettings: Partial<ChurchSettings>) => void;

  // Admin User Simulation
  switchUserRole: (role: AdminUser['role']) => void;
  addUser: (user: Omit<AdminUser, 'id' | 'lastLogin'>) => void;
  toggleUserActive: (id: string) => void;
}

const ChurchContext = createContext<ChurchContextType | undefined>(undefined);

export const ChurchProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load from local storage or fallback to defaults
  const [sermons, setSermons] = useState<Sermon[]>(() => {
    const saved = localStorage.getItem('sda_sermons');
    return saved ? JSON.parse(saved) : INITIAL_SERMONS;
  });

  const [events, setEvents] = useState<ChurchEvent[]>(() => {
    const saved = localStorage.getItem('sda_events');
    return saved ? JSON.parse(saved) : INITIAL_EVENTS;
  });

  const [ministries, setMinistries] = useState<Ministry[]>(() => {
    const saved = localStorage.getItem('sda_ministries');
    return saved ? JSON.parse(saved) : INITIAL_MINISTRIES;
  });

  const [programmes, setProgrammes] = useState<WorshipProgram[]>(() => {
    const saved = localStorage.getItem('sda_programmes');
    return saved ? JSON.parse(saved) : INITIAL_PROGRAMMES;
  });

  const [announcements, setAnnouncements] = useState<Announcement[]>(() => {
    const saved = localStorage.getItem('sda_announcements');
    return saved ? JSON.parse(saved) : INITIAL_ANNOUNCEMENTS;
  });

  const [gallery, setGallery] = useState<GalleryItem[]>(() => {
    const saved = localStorage.getItem('sda_gallery');
    return saved ? JSON.parse(saved) : INITIAL_GALLERY;
  });

  const [visitors, setVisitors] = useState<VisitorRegistration[]>(() => {
    const saved = localStorage.getItem('sda_visitors');
    return saved ? JSON.parse(saved) : INITIAL_VISITORS;
  });

  const [bibleStudies, setBibleStudies] = useState<BibleStudyRequest[]>(() => {
    const saved = localStorage.getItem('sda_biblestudies');
    return saved ? JSON.parse(saved) : INITIAL_BIBLE_STUDIES;
  });

  const [prayers, setPrayers] = useState<PrayerRequest[]>(() => {
    const saved = localStorage.getItem('sda_prayers');
    return saved ? JSON.parse(saved) : INITIAL_PRAYERS;
  });

  const [messages, setMessages] = useState<ContactMessage[]>(() => {
    const saved = localStorage.getItem('sda_messages');
    return saved ? JSON.parse(saved) : INITIAL_MESSAGES;
  });

  const [settings, setSettings] = useState<ChurchSettings>(() => {
    const saved = localStorage.getItem('sda_settings');
    return saved ? JSON.parse(saved) : INITIAL_SETTINGS;
  });

  const [users, setUsers] = useState<AdminUser[]>(() => {
    const saved = localStorage.getItem('sda_users');
    return saved ? JSON.parse(saved) : INITIAL_USERS;
  });

  const [currentUser, setCurrentUser] = useState<AdminUser>(INITIAL_USERS[0]);

  // Modals state
  const [activeVideo, setActiveVideo] = useState<Sermon | null>(null);
  const [activeAudio, setActiveAudio] = useState<Sermon | null>(null);
  const [activeImage, setActiveImage] = useState<GalleryItem | null>(null);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('sda_sermons', JSON.stringify(sermons));
  }, [sermons]);

  useEffect(() => {
    localStorage.setItem('sda_events', JSON.stringify(events));
  }, [events]);

  useEffect(() => {
    localStorage.setItem('sda_ministries', JSON.stringify(ministries));
  }, [ministries]);

  useEffect(() => {
    localStorage.setItem('sda_programmes', JSON.stringify(programmes));
  }, [programmes]);

  useEffect(() => {
    localStorage.setItem('sda_announcements', JSON.stringify(announcements));
  }, [announcements]);

  useEffect(() => {
    localStorage.setItem('sda_gallery', JSON.stringify(gallery));
  }, [gallery]);

  useEffect(() => {
    localStorage.setItem('sda_visitors', JSON.stringify(visitors));
  }, [visitors]);

  useEffect(() => {
    localStorage.setItem('sda_biblestudies', JSON.stringify(bibleStudies));
  }, [bibleStudies]);

  useEffect(() => {
    localStorage.setItem('sda_prayers', JSON.stringify(prayers));
  }, [prayers]);

  useEffect(() => {
    localStorage.setItem('sda_messages', JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    localStorage.setItem('sda_settings', JSON.stringify(settings));
  }, [settings]);

  useEffect(() => {
    localStorage.setItem('sda_users', JSON.stringify(users));
  }, [users]);

  // Handlers
  const addSermon = (newSermon: Omit<Sermon, 'id'>) => {
    const sermon: Sermon = {
      ...newSermon,
      id: `sermon-${Date.now()}`,
    };
    setSermons((prev) => [sermon, ...prev]);
  };

  const updateSermon = (id: string, updated: Partial<Sermon>) => {
    setSermons((prev) => prev.map((s) => (s.id === id ? { ...s, ...updated } : s)));
  };

  const deleteSermon = (id: string) => {
    setSermons((prev) => prev.filter((s) => s.id !== id));
  };

  const addEvent = (newEvent: Omit<ChurchEvent, 'id'>) => {
    const event: ChurchEvent = {
      ...newEvent,
      id: `event-${Date.now()}`,
      registrationCount: 0,
    };
    setEvents((prev) => [event, ...prev]);
  };

  const updateEvent = (id: string, updated: Partial<ChurchEvent>) => {
    setEvents((prev) => prev.map((e) => (e.id === id ? { ...e, ...updated } : e)));
  };

  const deleteEvent = (id: string) => {
    setEvents((prev) => prev.filter((e) => e.id !== id));
  };

  const registerForEvent = (id: string) => {
    setEvents((prev) =>
      prev.map((e) => (e.id === id ? { ...e, registrationCount: (e.registrationCount || 0) + 1 } : e))
    );
  };

  const updateMinistry = (id: string, updated: Partial<Ministry>) => {
    setMinistries((prev) => prev.map((m) => (m.id === id ? { ...m, ...updated } : m)));
  };

  const updateProgramme = (id: string, updated: Partial<WorshipProgram>) => {
    setProgrammes((prev) => prev.map((p) => (p.id === id ? { ...p, ...updated } : p)));
  };

  const addProgramme = (newProg: Omit<WorshipProgram, 'id'>) => {
    const prog: WorshipProgram = {
      ...newProg,
      id: `prog-${Date.now()}`,
    };
    setProgrammes((prev) => [...prev, prog]);
  };

  const addAnnouncement = (newAnn: Omit<Announcement, 'id'>) => {
    const ann: Announcement = {
      ...newAnn,
      id: `ann-${Date.now()}`,
    };
    setAnnouncements((prev) => [ann, ...prev]);
  };

  const updateAnnouncement = (id: string, updated: Partial<Announcement>) => {
    setAnnouncements((prev) => prev.map((a) => (a.id === id ? { ...a, ...updated } : a)));
  };

  const deleteAnnouncement = (id: string) => {
    setAnnouncements((prev) => prev.filter((a) => a.id !== id));
  };

  const addGalleryItem = (newItem: Omit<GalleryItem, 'id'>) => {
    const item: GalleryItem = {
      ...newItem,
      id: `gal-${Date.now()}`,
    };
    setGallery((prev) => [item, ...prev]);
  };

  const deleteGalleryItem = (id: string) => {
    setGallery((prev) => prev.filter((g) => g.id !== id));
  };

  const submitVisitorRegistration = (data: Omit<VisitorRegistration, 'id' | 'createdAt' | 'status'>) => {
    const newVisitor: VisitorRegistration = {
      ...data,
      id: `vis-${Date.now()}`,
      createdAt: new Date().toLocaleString(),
      status: 'Pending',
    };
    setVisitors((prev) => [newVisitor, ...prev]);
  };

  const updateVisitorStatus = (id: string, status: VisitorRegistration['status'], notes?: string) => {
    setVisitors((prev) =>
      prev.map((v) => (v.id === id ? { ...v, status, ...(notes !== undefined ? { notes } : {}) } : v))
    );
  };

  const submitBibleStudyRequest = (data: Omit<BibleStudyRequest, 'id' | 'createdAt' | 'status'>) => {
    const newReq: BibleStudyRequest = {
      ...data,
      id: `bs-${Date.now()}`,
      createdAt: new Date().toLocaleString(),
      status: 'New',
    };
    setBibleStudies((prev) => [newReq, ...prev]);
  };

  const updateBibleStudyStatus = (
    id: string,
    status: BibleStudyRequest['status'],
    assignedTeacher?: string
  ) => {
    setBibleStudies((prev) =>
      prev.map((b) =>
        b.id === id
          ? {
              ...b,
              status,
              ...(assignedTeacher !== undefined ? { assignedTeacher } : {}),
            }
          : b
      )
    );
  };

  const submitPrayerRequest = (data: Omit<PrayerRequest, 'id' | 'createdAt' | 'status'>) => {
    const newPrayer: PrayerRequest = {
      ...data,
      id: `pray-${Date.now()}`,
      createdAt: new Date().toLocaleString(),
      status: 'Received',
    };
    setPrayers((prev) => [newPrayer, ...prev]);
  };

  const updatePrayerStatus = (id: string, status: PrayerRequest['status'], notes?: string) => {
    setPrayers((prev) =>
      prev.map((p) => (p.id === id ? { ...p, status, ...(notes !== undefined ? { notes } : {}) } : p))
    );
  };

  const submitContactMessage = (data: Omit<ContactMessage, 'id' | 'createdAt' | 'status'>) => {
    const newMsg: ContactMessage = {
      ...data,
      id: `msg-${Date.now()}`,
      createdAt: new Date().toLocaleString(),
      status: 'Unread',
    };
    setMessages((prev) => [newMsg, ...prev]);
  };

  const updateMessageStatus = (id: string, status: ContactMessage['status']) => {
    setMessages((prev) => prev.map((m) => (m.id === id ? { ...m, status } : m)));
  };

  const updateSettings = (newSettings: Partial<ChurchSettings>) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
  };

  const switchUserRole = (role: AdminUser['role']) => {
    const match = users.find((u) => u.role === role);
    if (match) {
      setCurrentUser(match);
    } else {
      setCurrentUser((prev) => ({ ...prev, role }));
    }
  };

  const addUser = (newUser: Omit<AdminUser, 'id' | 'lastLogin'>) => {
    const user: AdminUser = {
      ...newUser,
      id: `usr-${Date.now()}`,
      lastLogin: 'Never',
    };
    setUsers((prev) => [...prev, user]);
  };

  const toggleUserActive = (id: string) => {
    setUsers((prev) => prev.map((u) => (u.id === id ? { ...u, active: !u.active } : u)));
  };

  return (
    <ChurchContext.Provider
      value={{
        sermons,
        events,
        ministries,
        programmes,
        announcements,
        gallery,
        visitors,
        bibleStudies,
        prayers,
        messages,
        settings,
        users,
        currentUser,
        activeVideo,
        activeAudio,
        activeImage,
        setActiveVideo,
        setActiveAudio,
        setActiveImage,
        addSermon,
        updateSermon,
        deleteSermon,
        addEvent,
        updateEvent,
        deleteEvent,
        registerForEvent,
        updateMinistry,
        updateProgramme,
        addProgramme,
        addAnnouncement,
        updateAnnouncement,
        deleteAnnouncement,
        addGalleryItem,
        deleteGalleryItem,
        submitVisitorRegistration,
        updateVisitorStatus,
        submitBibleStudyRequest,
        updateBibleStudyStatus,
        submitPrayerRequest,
        updatePrayerStatus,
        submitContactMessage,
        updateMessageStatus,
        updateSettings,
        switchUserRole,
        addUser,
        toggleUserActive,
      }}
    >
      {children}
    </ChurchContext.Provider>
  );
};

export const useChurch = () => {
  const context = useContext(ChurchContext);
  if (!context) {
    throw new Error('useChurch must be used within a ChurchProvider');
  }
  return context;
};
