import React, { useState } from 'react';
import { ChevronDown, ChevronUp, BookOpen, Search, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

interface BeliefItem {
  id: number;
  category: 'God' | 'Humanity' | 'Salvation' | 'Church' | 'Living' | 'Restoration';
  title: string;
  summary: string;
  fullText: string;
  scriptures: string;
}

const BELIEFS: BeliefItem[] = [
  {
    id: 1,
    category: 'God',
    title: 'The Holy Scriptures',
    summary: 'The Holy Scriptures, Old and New Testaments, are the written Word of God, given by divine inspiration.',
    fullText: 'The Holy Scriptures, Old and New Testaments, are the written Word of God, given by divine inspiration. The inspired authors spoke and wrote as they were moved by the Holy Spirit. In this Word, God has committed to humanity the knowledge necessary for salvation. The Holy Scriptures are the supreme, authoritative, and the infallible revelation of His will. They are the standard of character, the test of experience, the definitive revealer of doctrines, and the trustworthy record of God’s acts in history.',
    scriptures: 'Psalm 119:105; Proverbs 30:5-6; Isaiah 8:20; John 17:17; 1 Thessalonians 2:13; 2 Timothy 3:16-17; Hebrews 4:12; 2 Peter 1:20-21.',
  },
  {
    id: 2,
    category: 'God',
    title: 'The Trinity',
    summary: 'There is one God: Father, Son, and Holy Spirit, a unity of three coeternal Persons.',
    fullText: 'There is one God: Father, Son, and Holy Spirit, a unity of three coeternal Persons. God is immortal, all-powerful, all-knowing, above all, and ever present. He is infinite and beyond human comprehension, yet known through His self-revelation. God, who is love, is forever worthy of worship, adoration, and service by the whole creation.',
    scriptures: 'Genesis 1:26; Deuteronomy 6:4; Isaiah 6:8; Matthew 28:19; John 3:16; 2 Corinthians 1:21-22; 13:14; Ephesians 4:4-6; 1 Peter 1:2.',
  },
  {
    id: 3,
    category: 'God',
    title: 'God the Father',
    summary: 'God the eternal Father is the Creator, Source, Sustainer, and Sovereign of all creation.',
    fullText: 'God the eternal Father is the Creator, Source, Sustainer, and Sovereign of all creation. He is just and holy, merciful and gracious, slow to anger, and abounding in steadfast love and faithfulness. The qualities and powers exhibited in the Son and the Holy Spirit are also those of the Father.',
    scriptures: 'Genesis 1:1; Deuteronomy 4:35; Psalm 110:1, 4; John 3:16; 14:9; 1 Corinthians 15:28; 1 Timothy 1:17; 1 John 4:8; Revelation 4:11.',
  },
  {
    id: 4,
    category: 'God',
    title: 'God the Son',
    summary: 'God the eternal Son became incarnate in Jesus Christ, truly God and truly man.',
    fullText: 'God the eternal Son became incarnate in Jesus Christ. Through Him all things were created, the character of God is revealed, the salvation of humanity is accomplished, and the world is judged. Forever truly God, He became also truly human, Jesus the Christ. He was conceived of the Holy Spirit and born of the virgin Mary. He lived and experienced temptation as a human being, yet perfectly exemplified the righteousness and love of God.',
    scriptures: 'Isaiah 53:4-6; Luke 1:35; John 1:1-3, 14; Romans 6:23; 2 Corinthians 5:19-21; Philippians 2:5-11; Colossians 1:15-19; Hebrews 2:9-18; 8:1-2.',
  },
  {
    id: 5,
    category: 'God',
    title: 'God the Holy Spirit',
    summary: 'God the eternal Spirit was active with the Father and the Son in Creation, incarnation, and redemption.',
    fullText: 'God the eternal Spirit was active with the Father and the Son in Creation, incarnation, and redemption. He is as much a person as are the Father and the Son. He inspired the writers of Scripture. He filled Christ’s life with power. He draws and convicts human beings; and those who respond He renews and transforms into the image of God. Sent by the Father and the Son to be always with His children, He extends spiritual gifts to the church, empowers it to bear witness to Christ, and in harmony with the Scriptures leads it into all truth.',
    scriptures: 'Genesis 1:1-2; 2 Samuel 23:2; Psalm 51:11; Luke 1:35; John 14:16-18, 26; Acts 1:8; Romans 8:14-16; 2 Peter 1:21.',
  },
  {
    id: 6,
    category: 'Humanity',
    title: 'Creation',
    summary: 'God has revealed in Scripture the authentic and historical account of His creative activity.',
    fullText: 'God has revealed in Scripture the authentic and historical account of His creative activity. He created the universe, and in a recent six-day creation the Lord made “the heavens and the earth, the sea, and all that is in them” and rested on the seventh day. Thus He established the Sabbath as a perpetual memorial of the work He performed and completed during six literal days.',
    scriptures: 'Genesis 1-2; 5; 11; Exodus 20:8-11; Psalm 19:1-6; 33:6, 9; 104; Colossians 1:16; Hebrews 11:3; Revelation 14:7.',
  },
  {
    id: 7,
    category: 'Humanity',
    title: 'The Nature of Humanity',
    summary: 'Man and woman were made in the image of God with individuality, the power and freedom to think and to do.',
    fullText: 'Man and woman were made in the image of God with individuality, the power and freedom to think and to do. Though created free beings, each is an indivisible unity of body, mind, and spirit, dependent upon God for life and breath and all else. When our first parents disobeyed God, they denied their dependence upon Him and fell from their high position. The image of God in them was marred and they became subject to death. Their descendants share this fallen nature and its consequences.',
    scriptures: 'Genesis 1:26-28; 2:7, 15; 3; Psalm 8:4-8; 51:5; Romans 5:12-17; 2 Corinthians 5:19-20.',
  },
  {
    id: 8,
    category: 'Humanity',
    title: 'The Great Controversy',
    summary: 'All humanity is now involved in a great controversy between Christ and Satan.',
    fullText: 'All humanity is now involved in a great controversy between Christ and Satan regarding the character of God, His law, and His sovereignty over the universe. This conflict originated in heaven when a created being, endowed with freedom of choice, in self-exaltation became Satan, God’s adversary, and led into rebellion a portion of the angels. He introduced the spirit of rebellion into this world when he led Adam and Eve into sin.',
    scriptures: 'Genesis 3; Isaiah 14:12-14; Ezekiel 28:12-18; Romans 1:19-32; 1 Corinthians 4:9; Hebrews 1:14; 1 Peter 5:8; Revelation 12:4-9.',
  },
  {
    id: 9,
    category: 'Salvation',
    title: 'Life, Death, and Resurrection of Christ',
    summary: 'In Christ’s life of perfect obedience, His suffering, death, and resurrection, God provided the only means of atonement.',
    fullText: 'In Christ’s life of perfect obedience to God’s will, His suffering, death, and resurrection, God provided the only means of atonement for human sin, so that those who by faith accept this atonement may have eternal life, and the whole creation may better understand the infinite and holy love of the Creator. This perfect atonement vindicates the righteousness of God’s law and the gracious benevolence of His character.',
    scriptures: 'Genesis 3:15; Psalm 22:1; Isaiah 53; John 3:16; Romans 5:8; 1 Corinthians 15:3-4, 20-22; 2 Corinthians 5:14-15; Hebrews 9:28; 1 Peter 2:21-24.',
  },
  {
    id: 10,
    category: 'Salvation',
    title: 'The Experience of Salvation',
    summary: 'In infinite love and mercy God made Christ, who knew no sin, to be sin for us.',
    fullText: 'In infinite love and mercy God made Christ, who knew no sin, to be sin for us, so that in Him we might be made the righteousness of God. Led by the Holy Spirit we sense our need, acknowledge our sinfulness, repent of our transgressions, and exercise faith in Jesus as Saviour and Lord, Substitute and Example. This saving faith comes through the divine power of the Word and is the gift of God’s grace.',
    scriptures: 'Luke 17:5; John 3:3-8, 16; Romans 3:21-26; 5:1; 8:14-17; 10:17; Galatians 2:20; Ephesians 2:8-10; Titus 3:3-7.',
  },
  {
    id: 11,
    category: 'Salvation',
    title: 'Growing in Christ',
    summary: 'By His death on the cross Jesus triumphed over the evil forces.',
    fullText: 'By His death on the cross Jesus triumphed over the evil forces. He who subjugated the demonic spirits during His earthly ministry has broken their power and made certain their ultimate doom. Jesus’ victory gives us victory over the evil forces that still seek to control us, as we walk with Him in peace, joy, and assurance of His love.',
    scriptures: '1 Chronicles 29:11; Psalm 1:1-2; 23:4; Matthew 20:25-28; Romans 8:38-39; 2 Corinthians 3:17-18; Ephesians 6:12-18; 1 Thessalonians 5:16-18, 23.',
  },
  {
    id: 12,
    category: 'Church',
    title: 'The Church',
    summary: 'The church is the community of believers who confess Jesus Christ as Lord and Saviour.',
    fullText: 'The church is the community of believers who confess Jesus Christ as Lord and Saviour; in continuity with the people of God in Old Testament times, we are called out from the world; and we join together for worship, for fellowship, for instruction in the Word, for the celebration of the Lord’s Supper, for service to humanity, and for the worldwide proclamation of the gospel.',
    scriptures: 'Genesis 12:1-3; Acts 7:38; Ephesians 1:22-23; 2:19-22; 3:8-11; 5:23-27; Colossians 1:17-18; 1 Peter 2:9.',
  },
  {
    id: 13,
    category: 'Church',
    title: 'The Remnant and Its Mission',
    summary: 'The universal church is composed of all who truly believe in Christ, but in the last days a remnant has been called out.',
    fullText: 'The universal church is composed of all who truly believe in Christ, but in the last days, a time of widespread apostasy, a remnant has been called out to keep the commandments of God and the faith of Jesus. This remnant announces the arrival of the judgment hour, proclaims salvation through Christ, and heralds the approach of His second advent. This proclamation is symbolized by the three angels of Revelation 14.',
    scriptures: 'Daniel 7:9-14; Isaiah 1:9; 11:11; Jeremiah 23:3; Micah 4:6-7; 2 Corinthians 5:20; Revelation 12:17; 14:6-12; 18:1-4.',
  },
  {
    id: 14,
    category: 'Church',
    title: 'Unity in the Body of Christ',
    summary: 'The church is one body with many members, called from every nation, kindred, tongue, and people.',
    fullText: 'The church is one body with many members, called from every nation, kindred, tongue, and people. In Christ we are a new creation; distinctions of race, culture, learning, and nationality, and differences between high and low, rich and poor, male and female, must not be divisive among us. We are all equal in Christ, who by one Spirit has bonded us into one fellowship with Him and with one another.',
    scriptures: 'Psalm 133:1; Matthew 28:19-20; John 17:20-23; Acts 17:26-27; Romans 12:4-5; 1 Corinthians 12:12-14; Galatians 3:27-29; Colossians 3:10-15.',
  },
  {
    id: 15,
    category: 'Church',
    title: 'Baptism',
    summary: 'By baptism we confess our faith in the death and resurrection of Jesus Christ.',
    fullText: 'By baptism we confess our faith in the death and resurrection of Jesus Christ, and testify of our death to sin and of our purpose to walk in newness of life. Thus we acknowledge Christ as Lord and Saviour, become His people, and are received as members by His church. Baptism is by immersion in water and is contingent on an affirmation of faith in Jesus and evidence of repentance of sin.',
    scriptures: 'Matthew 28:19-20; Acts 2:38; 16:30-33; 22:16; Romans 6:1-6; Galatians 3:27; Colossians 2:12-13.',
  },
  {
    id: 16,
    category: 'Church',
    title: 'The Lord’s Supper',
    summary: 'The Lord’s Supper is a participation in the emblems of the body and blood of Jesus as an expression of faith in Him.',
    fullText: 'The Lord’s Supper is a participation in the emblems of the body and blood of Jesus as an expression of faith in Him, our Lord and Saviour. In this experience of communion Christ is present to meet and strengthen His people. As we partake, we joyfully proclaim the Lord’s death until He comes again. Preparation for the Supper includes self-examination, repentance, and confession. The Master ordained the service of foot washing to signify renewed cleansing, to express a willingness to serve one another in Christlike humility, and to unite our hearts in love.',
    scriptures: 'Matthew 26:17-30; John 6:48-63; 13:1-17; 1 Corinthians 10:16-17; 11:23-30; Revelation 3:20.',
  },
  {
    id: 17,
    category: 'Church',
    title: 'Spiritual Gifts and Ministries',
    summary: 'God bestows upon all members of His church spiritual gifts for the equipping of the saints.',
    fullText: 'God bestows upon all members of His church in every age spiritual gifts that each member is to employ in loving ministry for the common good of the church and of humanity. Given by the agency of the Holy Spirit, who apportions to each member as He wills, the gifts provide all abilities and ministries that the church needs to fulfill its divinely ordained functions.',
    scriptures: 'Romans 12:4-8; 1 Corinthians 12:9-11, 27-28; Ephesians 4:8, 11-16; 1 Timothy 3:1-13; 1 Peter 4:10-11.',
  },
  {
    id: 18,
    category: 'Church',
    title: 'The Gift of Prophecy',
    summary: 'The Scriptures testify that one of the gifts of the Holy Spirit is prophecy.',
    fullText: 'The Scriptures testify that one of the gifts of the Holy Spirit is prophecy. This gift is an identifying mark of the remnant church and we believe it was manifested in the ministry of Ellen G. White. Her writings speak with prophetic authority and provide comfort, guidance, instruction, and correction to the church. They also make clear that the Bible is the standard by which all teaching and experience must be tested.',
    scriptures: 'Numbers 12:6; 2 Chronicles 20:20; Amos 3:7; Joel 2:28-29; Acts 2:14-21; 2 Timothy 3:16-17; Hebrews 1:1-3; Revelation 12:17; 19:10; 22:8-9.',
  },
  {
    id: 19,
    category: 'Living',
    title: 'The Law of God',
    summary: 'The great principles of God’s law are embodied in the Ten Commandments and exemplified in the life of Christ.',
    fullText: 'The great principles of God’s law are embodied in the Ten Commandments and exemplified in the life of Christ. They express God’s love, will, and purposes concerning human conduct and relationships and are binding upon all people in every age. These precepts are the basis of God’s covenant with His people and the standard in God’s judgment.',
    scriptures: 'Exodus 20:1-17; Deuteronomy 28:1-14; Psalm 19:7-14; 40:7-8; Matthew 5:17-20; 22:36-40; Romans 8:3-4; James 2:10-11; 1 John 5:3.',
  },
  {
    id: 20,
    category: 'Living',
    title: 'The Seventh-day Sabbath',
    summary: 'The gracious Creator, after the six days of Creation, rested on the seventh day and instituted the Sabbath for all people.',
    fullText: 'The gracious Creator, after the six days of Creation, rested on the seventh day and instituted the Sabbath for all people as a memorial of Creation. The fourth commandment of God’s unchangeable law requires the observance of this seventh-day Sabbath as the day of rest, worship, and ministry in harmony with the teaching and practice of Jesus, the Lord of the Sabbath. The Sabbath is a day of delightful communion with God and one another.',
    scriptures: 'Genesis 2:1-3; Exodus 20:8-11; 31:13-17; Leviticus 23:32; Deuteronomy 5:12-15; Isaiah 56:5-6; 58:13-14; Ezekiel 20:12, 20; Matthew 12:1-12; Mark 2:27-28; Luke 4:16; Hebrews 4:1-11.',
  },
  {
    id: 21,
    category: 'Living',
    title: 'Stewardship',
    summary: 'We are God’s stewards, entrusted by Him with time and opportunities, abilities and possessions.',
    fullText: 'We are God’s stewards, entrusted by Him with time and opportunities, abilities and possessions, and the blessings of the earth and its resources. We are responsible to Him for their proper use. We acknowledge God’s ownership by faithful service to Him and our fellow human beings, and by returning tithe and giving offerings for the proclamation of His gospel and the support and growth of His church.',
    scriptures: 'Genesis 1:26-28; 2:15; 1 Chronicles 29:14; Haggai 1:3-11; Malachi 3:8-12; Matthew 23:23; Romans 12:1-2; 1 Corinthians 9:9-14; 2 Corinthians 8:1-15; 9:7.',
  },
  {
    id: 22,
    category: 'Living',
    title: 'Christian Behavior',
    summary: 'We are called to be a godly people who think, feel, and act in harmony with biblical principles.',
    fullText: 'We are called to be a godly people who think, feel, and act in harmony with biblical principles in all aspects of personal and social life. For the Spirit to recreate in us the character of our Lord we involve ourselves only in those things that will produce Christlike purity, health, and joy in our lives. This means that our amusement and entertainment should meet the highest standards of Christian taste. Because our bodies are the temples of the Holy Spirit, we are to care for them intelligently.',
    scriptures: 'Genesis 7:2; Exodus 20:15; Leviticus 11:1-47; Romans 12:1-2; 1 Corinthians 6:19-20; 10:31; 2 Corinthians 6:14–7:1; Philippians 4:8; 1 Timothy 2:9-10; 1 Peter 3:1-4; 1 John 2:6.',
  },
  {
    id: 23,
    category: 'Living',
    title: 'Marriage and the Family',
    summary: 'Marriage was divinely established in Eden and affirmed by Jesus to be a lifelong union.',
    fullText: 'Marriage was divinely established in Eden and affirmed by Jesus to be a lifelong union between a man and a woman in loving companionship. For the Christian a marriage commitment is to God as well as to the spouse, and should be entered into only between a man and a woman who share a common faith. Mutual love, honor, respect, and responsibility are the fabric of this relationship.',
    scriptures: 'Genesis 2:18-25; Exodus 20:12; Deuteronomy 6:5-9; Proverbs 22:6; Malachi 4:5-6; Matthew 5:31-32; 19:3-9, 12; Ephesians 5:21-33; 6:1-4; Hebrews 13:4.',
  },
  {
    id: 24,
    category: 'Restoration',
    title: 'Christ’s Ministry in the Heavenly Sanctuary',
    summary: 'There is a sanctuary in heaven, the true tabernacle that the Lord set up and not humans.',
    fullText: 'There is a sanctuary in heaven, the true tabernacle that the Lord set up and not humans. In it Christ ministers on our behalf, making available to believers the benefits of His atoning sacrifice offered once for all on the cross. At His ascension, He was inaugurated as our great High Priest and began His intercessory ministry, which was typified by the work of the high priest in the holy place of the earthly sanctuary. In 1844, at the end of the prophetic period of 2300 days, He entered the second and last phase of His atoning ministry, which was typified by the work of the high priest in the most holy place.',
    scriptures: 'Leviticus 16; Numbers 14:34; Ezekiel 4:6; Daniel 7:9-27; 8:13-14; 9:24-27; Hebrews 1:3; 2:16-17; 4:14-16; 8:1-5; 9:11-28; 10:19-22; Revelation 8:3-5; 11:19; 14:6-7; 20:12; 22:11-12.',
  },
  {
    id: 25,
    category: 'Restoration',
    title: 'The Second Coming of Christ',
    summary: 'The second coming of Christ is the blessed hope of the church, the grand climax of the gospel.',
    fullText: 'The second coming of Christ is the blessed hope of the church, the grand climax of the gospel. The Saviour’s coming will be literal, personal, visible, and worldwide. When He returns, the righteous dead will be resurrected, and together with the righteous living will be glorified and taken to heaven, but the unrighteous will die. The almost complete fulfillment of most lines of prophecy, together with the present condition of the world, indicates that Christ’s coming is near.',
    scriptures: 'Matthew 24; Mark 13; Luke 21; John 14:1-3; Acts 1:9-11; 1 Corinthians 15:51-54; 1 Thessalonians 4:13-18; 5:1-6; 2 Thessalonians 1:7-10; 2:8; 2 Timothy 3:1-5; Titus 2:13; Hebrews 9:28; Revelation 1:7; 14:14-20; 19:11-21.',
  },
  {
    id: 26,
    category: 'Restoration',
    title: 'Death and Resurrection',
    summary: 'The wages of sin is death. But God, who alone is immortal, will grant eternal life to His redeemed.',
    fullText: 'The wages of sin is death. But God, who alone is immortal, will grant eternal life to His redeemed. Until that day death is an unconscious state for all people. When Christ, who is our life, appears, the resurrected righteous and the living righteous will be glorified and caught up to meet their Lord. The second resurrection, the resurrection of the unrighteous, will take place a thousand years later.',
    scriptures: 'Job 19:25-27; Psalm 146:3-4; Ecclesiastes 9:5-6, 10; Daniel 12:2, 13; Isaiah 25:8; John 5:28-29; 11:11-14; Romans 6:23; 1 Corinthians 15:51-54; 1 Thessalonians 4:13-17; 1 Timothy 6:15-16; Revelation 20:1-10.',
  },
  {
    id: 27,
    category: 'Restoration',
    title: 'The Millennium and the End of Sin',
    summary: 'The millennium is the thousand-year reign of Christ with His saints in heaven between the first and second resurrections.',
    fullText: 'The millennium is the thousand-year reign of Christ with His saints in heaven between the first and second resurrections. During this time the wicked dead will be judged; the earth will be utterly desolate, without living human inhabitants, but occupied by Satan and his angels. At its close Christ with His saints and the Holy City will descend from heaven to earth. The unrighteous dead will then be resurrected, and with Satan and his angels will surround the city; but fire from God will consume them and cleanse the earth. The universe will thus be freed of sin and sinners forever.',
    scriptures: 'Jeremiah 4:23-26; Ezekiel 28:18-19; Malachi 4:1; 1 Corinthians 6:2-3; Revelation 20; 21:1-5.',
  },
  {
    id: 28,
    category: 'Restoration',
    title: 'The New Earth',
    summary: 'On the new earth, in which righteousness dwells, God will provide an eternal home for the redeemed.',
    fullText: 'On the new earth, in which righteousness dwells, God will provide an eternal home for the redeemed and a perfect environment for everlasting life, love, joy, and learning in His presence. For here God Himself will dwell with His people, and suffering and death will have passed away. The great controversy will be ended, and sin will be no more. All things, animate and inanimate, will declare that God is love; and He shall reign forever and ever. Amen.',
    scriptures: 'Isaiah 35; 65:17-25; Matthew 5:5; 2 Peter 3:13; Revelation 11:15; 21:1-7; 22:1-5.',
  },
];

export const Beliefs: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [expandedId, setExpandedId] = useState<number | null>(1);

  const categories = [
    { label: 'All (28)', value: 'All' },
    { label: 'God (1-5)', value: 'God' },
    { label: 'Humanity (6-8)', value: 'Humanity' },
    { label: 'Salvation (9-11)', value: 'Salvation' },
    { label: 'Church (12-18)', value: 'Church' },
    { label: 'Living (19-23)', value: 'Living' },
    { label: 'Restoration (24-28)', value: 'Restoration' },
  ];

  const filteredBeliefs = BELIEFS.filter((b) => {
    const matchesCat = selectedCategory === 'All' || b.category === selectedCategory;
    const matchesSearch =
      b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.scriptures.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const toggleExpand = (id: number) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Editorial Header */}
      <section className="relative bg-[#005482] text-white py-20 overflow-hidden">
        {/* Half Clear Background Image: clear photograph on right, deep blue gradient on left for text readability */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img
            src="/src/assets/images/bible_study_scripture_1793870392769.jpg"
            alt="The Holy Scriptures and Fundamental Beliefs"
            className="w-full h-full object-cover object-right opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#002f4a] via-[#004870]/95 via-45% to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#002f4a]/50 via-transparent to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="text-xs uppercase tracking-[0.25em] font-bold text-white/80 block mb-3">
              Doctrinal Foundation
            </span>
            <h1 className="text-3xl sm:text-5xl font-bold font-serif text-white mb-6 leading-tight">
              Our 28 Fundamental Beliefs
            </h1>
            <p className="text-base sm:text-lg text-white/90 leading-relaxed font-light">
              Seventh-day Adventists accept the Bible as their only creed and hold certain fundamental beliefs to be the teaching of the Holy Scriptures. These beliefs constitute the church’s understanding and expression of the teaching of Scripture.
            </p>
          </div>
        </div>
      </section>

      {/* Filter and Search Bar */}
      <section className="bg-[#F5F7F9] border-b border-stone-200 py-6 sticky top-[69px] z-30 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Category Segmented Filter Buttons */}
            <div className="flex flex-wrap items-center gap-1.5 p-1 bg-white rounded-lg border border-stone-200 shadow-xs w-full md:w-auto">
              {categories.map((c) => (
                <button
                  key={c.value}
                  onClick={() => setSelectedCategory(c.value)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap ${
                    selectedCategory === c.value
                      ? 'bg-[#005482] text-white shadow-xs'
                      : 'text-stone-600 hover:text-[#005482] hover:bg-stone-50'
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-72">
              <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search doctrines or scriptures..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-xs bg-white border border-stone-200 rounded-lg focus:outline-none focus:border-[#005482] text-stone-800 placeholder-stone-400"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Beliefs Accordion & List */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-xs text-stone-500 mb-6 flex items-center justify-between">
            <span>Showing {filteredBeliefs.length} of 28 Fundamental Beliefs</span>
            <button
              onClick={() => setExpandedId(expandedId ? null : 1)}
              className="text-[#005482] font-semibold hover:underline"
            >
              {expandedId ? 'Collapse All' : 'Expand First'}
            </button>
          </div>

          <div className="space-y-4">
            {filteredBeliefs.map((b) => {
              const isExpanded = expandedId === b.id;
              return (
                <div
                  key={b.id}
                  className={`border rounded-xl transition-all duration-200 overflow-hidden ${
                    isExpanded
                      ? 'border-[#005482] bg-white shadow-md'
                      : 'border-stone-200 bg-white hover:border-stone-300'
                  }`}
                >
                  {/* Clickable Header */}
                  <button
                    onClick={() => toggleExpand(b.id)}
                    className="w-full px-6 py-5 text-left flex items-start justify-between gap-4 focus:outline-none"
                    aria-expanded={isExpanded}
                  >
                    <div className="flex items-start gap-4">
                      <span className="w-8 h-8 rounded-lg bg-[#EAF3F8] text-[#005482] font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                        {b.id}
                      </span>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-[11px] font-bold uppercase tracking-wider text-[#397CA0]">
                            {b.category}
                          </span>
                        </div>
                        <h3 className="text-lg sm:text-xl font-bold font-serif text-stone-900">
                          {b.title}
                        </h3>
                        {!isExpanded && (
                          <p className="text-xs text-stone-500 mt-1 line-clamp-1">
                            {b.summary}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="p-1 rounded-full text-stone-400 shrink-0">
                      {isExpanded ? <ChevronUp className="w-5 h-5 text-[#005482]" /> : <ChevronDown className="w-5 h-5" />}
                    </div>
                  </button>

                  {/* Expanded Content */}
                  {isExpanded && (
                    <div className="px-6 pb-6 pt-2 border-t border-stone-100 animate-in fade-in duration-200">
                      <p className="text-sm text-stone-700 leading-relaxed font-sans mb-5">
                        {b.fullText}
                      </p>

                      <div className="p-4 rounded-lg bg-[#F5F7F9] border border-stone-200/80">
                        <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#005482] mb-1.5">
                          <BookOpen className="w-3.5 h-3.5" />
                          <span>Biblical References</span>
                        </div>
                        <div className="text-xs text-stone-600 font-mono leading-relaxed">
                          {b.scriptures}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {filteredBeliefs.length === 0 && (
            <div className="text-center py-16 bg-[#F5F7F9] rounded-xl border border-stone-200">
              <BookOpen className="w-10 h-10 text-stone-400 mx-auto mb-3" />
              <h4 className="text-lg font-bold font-serif text-stone-800">No matching beliefs found</h4>
              <p className="text-xs text-stone-500 mt-1">Try clearing your search query or choosing another category.</p>
              <button
                onClick={() => { setSelectedCategory('All'); setSearchQuery(''); }}
                className="mt-4 px-4 py-2 text-xs font-semibold text-[#005482] bg-white border border-stone-200 rounded-lg hover:bg-stone-50"
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Scripture Study CTA */}
      <section className="py-16 bg-[#EAF3F8] border-t border-[#397CA0]/20 text-center">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="text-2xl font-bold font-serif text-[#080B10] mb-3">
            Would You Like to Study These Truths Together?
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 mb-6 leading-relaxed">
            We offer complimentary, personalized Bible studies in person or online. Our pastors and trained Bible workers are here to answer your questions.
          </p>
          <Link
            to="/resources"
            className="inline-flex items-center gap-2 px-6 py-3 text-xs font-semibold uppercase tracking-wider text-white bg-[#005482] hover:bg-[#004266] rounded-lg shadow-sm transition-colors"
          >
            <span>Request Free Bible Study Series</span>
          </Link>
        </div>
      </section>
    </div>
  );
};
