import { Baby, Sparkles, Wind } from "lucide-react";

import Arman from "../../images/Arman.png";
import Arghya from "../../images/Arghya.png";
import Kirtik from "../../images/Kirtik.png";
import Rahul from "../../images/rahul.jpeg";
import Vishavjeet from "../../images/Vishavjeet.png";

export const scienceCards = [
  {
    icon: Wind,
    title: "Breathable Materials",
    copy: "Medical-grade comfort layers are designed for steady airflow, reducing heat buildup while maintaining a soft, secure nest.",
  },
  {
    icon: Sparkles,
    title: "Smart Motion Tech",
    copy: "Whisper-quiet movement patterns mimic natural soothing rhythms, helping babies settle without disrupting the room.",
  },
  {
    icon: Baby,
    title: "Cry-Detection AI",
    copy: "Responsive alerts help parents understand discomfort, hunger, and sleep cues with more confidence.",
  },
];

export const team = [
  {
    name: "Arghya Pratim Ghosh",
    role: "Founder & Hardware Lead",
    isFounder: true,
    isCoFounder: false,
    image: Arghya,
    objectPosition: "object-[center_20%]",
    linkedin: "https://www.linkedin.com/in/arghyapratimghosh ",
    copy: `THE FOUNDATION OF ADAPTABILITY
Born the son of a CRPF officer, my life was shaped by change, motion, and a constant shifting of horizons. As my father’s postings transferred our family to discrete pockets across the length and breadth of India, I grew up with a passport of rich experiences. Along the dusty tracks of different states, I didn’t just witness India’s vastness; I lived it—absorbing multiple languages, distinct cultures, and local traditions. This nomadic lifestyle taught me early on how to thrive in unfamiliar terrain, finding home not in a single geography, but in the people and stories I encountered along the way.

AN IDEOLOGY BUILT ON PURPOSE
At the center of my worldview stands my father. His military way of life and deeply ingrained ideology became my ultimate blueprint. From him, I learned the value of absolute discipline and the unyielding rule of giving your absolute best to whatever you touch. He taught me a lesson that still guides every line of code I write and every hardware prototype I build: “Learn everything, no matter how small the skill or how grueling the challenge. The knowledge will always benefit you somewhere down the road.” That philosophy drove me to master everything from standard software stacks to complex hardware integration, always preparing for the next frontier.

WHERE ART, ATHLETICS, AND DUTY MEET
My youth was a balance of intense physical exertion and creative expression. On one side, I found my rhythm in track & field and on the football pitch, thriving in the strategy and endurance of competitive sports. On the other side, rooted in my rich Bengali heritage, I found solace in the quiet world of sketches, paintings, and fine arts—earning a junior diploma in painting with distinction. This unique harmony of discipline and grit was formally cemented when I earned my NCC 'C' Certificate, a milestone that forever locked in my commitment to leadership and collective duty.

THE VISION BEHIND MAATRIVA
Today, as the Founder of MAATRIVA, I am merging a lifelong habit of multi-disciplinary learning with deep technical expertise in Multimodal AI and Embedded Systems. Backed by ecosystems like IHFC at IIT Delhi and IIT Mandi Catalyst, we are building intelligent, medical-grade monitoring solutions to safeguard maternal and infant health. Every lesson learned on a new playground, every hours-long sketch session, and every ounce of military-bred discipline is channeled into this singular mission: creating reliable, life-saving tech for the families who need it most.`,
    skills: ["IoT Systems", "Embedded Firmware", "Product Architecture", "MedTech Hardware"],
    achievements: [
      "Designed Maatriva's first-generation smart sensor array.",
      "Integrated low-power BLE mesh networking for 99.9% uptime.",
      "Reduced hardware prototype power consumption by 40%."
    ],
    contributions: [
      "Main architecture of the IoT central controller.",
      "Hardware schematics and PCB layout design.",
      "Firmware development for real-time cry and movement detection."
    ],
    stats: [
      { label: "IoT Integration", value: 94 },
      { label: "Firmware Eng.", value: 88 },
      { label: "HW Prototyping", value: 92 }
    ],
   
  },
  {
    name: "Rahul Kumar Ghosh",
    role: "AI & Machine Learning Specialist | Researcher | Robotics Trainer",
    isFounder: false,
    isCoFounder: true,
    image: Rahul,
    objectPosition: "object-center",
    linkedin: "https://www.linkedin.com/in/rahul-kumar-ghosh?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
    copy: `Rahul Kumar Ghosh is a passionate AI researcher and technology innovator currently pursuing an MCA specializing in Artificial Intelligence at Shoolini University. Bridging software intelligence with hardware expertise, he serves as a Robotics Trainer Intern at Sirena Technologies and is the Secretary of the Student Research Council, promoting collaborative innovation and hands-on prototyping.

With deep technical proficiency in Python, TensorFlow, and signal processing, his primary research focus is healthcare-tech. His main project, Baby Cry Analysis, leverages audio feature extraction (MFCC) and predictive modeling to help caregivers monitor infant well-being. Additionally, he has hands-on embedded systems experience working with Arduino, ESP32, and Raspberry Pi, alongside logistics management experience as a Store Incharge at MEIL.

Instilled with discipline and teamwork through his background in the National Cadet Corps (NCC), Rahul mentors students and leads technology demonstrations. Looking forward, he aspires to establish himself as an AI/ML Engineer and Robotics Innovator, building human-centered automation systems that drive positive societal change.`,
    skills: ["Robotics & Control", "Computer Vision", "Machine Learning", "Edge Computing"],
    achievements: [
      "Developed a custom lightweight CNN for cry-detection with 98% accuracy.",
      "Optimized computer vision models to run locally on low-power edge processors.",
      "Published research on non-contact infant respiration monitoring."
    ],
    contributions: [
      "Cry classification and baby state detection models.",
      "Edge AI pipeline and camera feed processing code.",
      "Control algorithms for the smart crib's motion simulation."
    ],
    stats: [
      { label: "Computer Vision", value: 92 },
      { label: "Machine Learning", value: 95 },
      { label: "Edge AI Opt.", value: 89 }
    ],
   
  },
  {
    name: "Kirtik Biswas",
    role: "Co-Founder & COO | Strategist | Builder of Teams",
    isFounder: false,
    isCoFounder: true,
    image: Kirtik,
    objectPosition: "object-[center_20%]",
    linkedin: "https://www.linkedin.com/in/kirtikbiswas/",
    copy: `Kirtik Biswas is the Co-Founder and Chief Operating Officer of MAATRIVA, where he leads operations, strategy, and execution to transform pioneering healthcare ideas into scalable solutions. With a unique blend of engineering precision and business insight, he ensures that the company’s vision translates into impactful products and sustainable growth.

An MBA candidate at IIM Trichy specializing in business strategy and marketing, Kirtik combines managerial expertise with a strong technical foundation. His journey began with a B.Tech in Computer Science, where he specialized in Machine Learning and AI, later expanding into full-stack development and product innovation. He further honed his skills as a Quality Engineer at LTIMindtree, contributing to HSBC projects and gaining hands-on experience in structured, large-scale delivery environments. This corporate grounding now complements his entrepreneurial drive, helping him balance innovation with disciplined execution as COO.

At MAATRIVA, Kirtik plays a pivotal role in shaping operations, building partnerships, and ensuring that the team’s innovations move from concept to reality. While the founder spearheaded the core product development, Kirtik’s focus has been on strengthening the company’s operational backbone, coordinating research, managing execution, and aligning the startup’s vision with market needs. Together with the team, he has helped MAATRIVA gain recognition and support from prestigious incubators such as IIT Mandi Catalyst and IHFC at IIT Delhi.

Kirtik’s upbringing as the son of a CRPF officer instilled in him adaptability, discipline, and resilience. Growing up across diverse regions of India, he absorbed multiple cultures and languages, shaping his ability to thrive in dynamic environments. His background in athletics and fine arts further enriched his perspective, teaching him balance, creativity, and endurance, qualities that continue to define his leadership style.

As COO, Kirtik is known for his analytical approach, structured execution, and ability to manage complex operations with clarity and precision. He thrives in fast-paced startup environments, where he combines strategic foresight with hands-on problem-solving. For him, innovation is not just about technology, it is about creating value, solving meaningful problems, and improving lives.

Looking ahead, Kirtik aspires to scale MAATRIVA into a global health-tech leader, driving innovation that blends empathy with engineering. His mission is clear: to build intelligent, accessible solutions that make a genuine difference in the lives of families and communities.`,
    skills: ["Growth Marketing", "AI Consulting", "Product Strategy", "Market Positioning"],
    achievements: [
      "Built an automated feedback-loop system using NLP to categorize customer reviews.",
      "Formulated growth campaigns that expanded beta testing users by 200%.",
      "Designed a predictive customer acquisition model."
    ],
    contributions: [
      "AI consulting for parent onboarding workflows.",
      "Market validation and user journey mapping.",
      "Strategic partnership outreach and brand communication."
    ],
    stats: [
      { label: "Product Strategy", value: 91 },
      { label: "Growth Marketing", value: 94 },
      { label: "User Analytics", value: 88 }
    ],
 
  },
  {
    name: "Vishavjeet Chauhan",
    role: "Co-Founder | Creative Head | Entrepreneur | Brand Strategist",
    isFounder: false,
    isCoFounder: true,
    image: Vishavjeet,
    objectPosition: "object-center",
    linkedin: "https://www.linkedin.com/in/vishavjeet-chauhan-140b88335 ",
    copy: `Vishavjeet Chauhan is the Co-Founder and Creative Head of MAATRIVA, where he plays a pivotal role in shaping the company's vision, brand identity, and growth strategy. Driven by creativity, innovation, and a passion for building impactful solutions, he contributes across branding, marketing, content creation, business development, product ideation, public relations, investor engagement, website management, and technology research.

Currently pursuing a Bachelor of Computer Applications (BCA) at Shoolini University, Vishavjeet has consistently demonstrated an entrepreneurial mindset and a strong commitment to creating meaningful impact through innovation. His journey into entrepreneurship began with a deep fascination for startups, leadership, and the process of transforming ideas into reality. With MAATRIVA, he found an opportunity to build something extraordinary alongside a passionate team dedicated to solving real-world healthcare challenges.

As Creative Head, Vishavjeet is responsible for developing the brand's voice and presence across multiple platforms while ensuring that MAATRIVA's mission is effectively communicated to stakeholders, partners, and the wider community. His ability to combine creativity with strategic thinking enables him to contribute not only to marketing and outreach but also to product development and organizational growth.

Beyond academics and entrepreneurship, Vishavjeet has actively pursued leadership opportunities that have shaped his personality and professional outlook. He serves as the President of a Hip-Hop Club, where he leads initiatives that encourage creativity, collaboration, and cultural engagement. His passion for music has further strengthened his ability to connect with people, express ideas creatively, and inspire communities.

His leadership journey extends beyond the startup ecosystem. Vishavjeet achieved the position of Assistant Supervisor at Forever Living Products India, gaining valuable experience in team management, communication, and professional development. He also serves as a Campus Ambassador and is an active member of the university host team, where he engages with visitors, guests, and industry professionals, representing his institution with confidence and professionalism.

A defining influence in Vishavjeet's life has been his father, whose guidance and values continue to shape his approach to both life and entrepreneurship. From an early age, he learned that challenges and obstacles should never become excuses for giving up on ambitious goals. Instead, he was taught to remain focused, move forward with determination, and stay committed to long-term success regardless of circumstances. This mindset has become the foundation of his resilience, discipline, and unwavering belief in continuous growth.

Known for his leadership, creativity, communication skills, problem-solving ability, adaptability, and innovative thinking, Vishavjeet thrives in dynamic and fast-paced environments. He believes that true innovation is not just about creating products but about creating value, solving meaningful problems, and positively impacting lives.

As a founding member of MAATRIVA, Vishavjeet envisions leveraging technology, innovation, and entrepreneurship to transform healthcare and improve the lives of families worldwide. Looking ahead, he aspires to help build MAATRIVA into a globally recognized healthcare technology company while inspiring young entrepreneurs to pursue their dreams with confidence and determination.

For Vishavjeet, success is not measured solely by achievements but by the impact he creates, the lives he touches, and the example he sets for others. His ultimate goal is to build a journey that inspires people, makes his family and community proud, and demonstrates that dedication, vision, and perseverance can turn ambitious dreams into reality.`,
    skills: ["UI/UX Design", "3D Modeling", "Branding Identity", "Creative Direction"],
    achievements: [
      "Designed Maatriva's award-nominated mobile app user interface.",
      "Created complete 3D digital twins of the smart baby crib for simulation.",
      "Established a cohesive brand identity and design system."
    ],
    contributions: [
      "High-fidelity UI designs and interactive prototypes.",
      "3D modeling and industrial design concepts for the physical crib.",
      "Visual assets, animations, and marketing design layouts."
    ],
    stats: [
      { label: "UI/UX Design", value: 96 },
      { label: "3D Modeling & CAD", value: 90 },
      { label: "Brand Identity", value: 93 }
    ],
   
  },
  {
    name: "Arman Sharma",
    role: "Technology Co-Founder | Product Builder | Full-Stack Developer",
    isFounder: false,
    isCoFounder: true,
    image: Arman,
    objectPosition: "object-[center_20%]",
    linkedin: "https://www.linkedin.com/in/arman-sharma-0a875a32a",
    copy: `Arman Sharma is the Technology Co-Founder of Maatriva, where he leads the execution of scalable, user-centric healthcare software. Currently pursuing a BCA, Arman is a full-stack MERN developer with a deep passion for product ideation, research, and technical execution, bridging the gap between hardware concepts and digital platforms.

His focus and solution-oriented mindset have been significantly shaped by sports—specifically years playing volleyball, which instilled values of teamwork, resilience, and leadership under pressure. Furthermore, guided by his father's principles of hard work and self-reliance, Arman approaches software engineering challenges with dedication and a commitment to continuous growth.

As a co-founding member, he helped lead Maatriva to gain recognition and incubator support from prestigious innovation ecosystems, including IIT Mandi Catalyst and IHFC at IIT Delhi. Arman aspires to grow into a technology leader driving healthcare innovation at scale, building intelligent and accessible systems that create lasting positive value for communities.`,
    skills: ["React / React Native", "Tailwind CSS", "TypeScript", "Full-Stack Dev"],
    achievements: [
      "Developed the cross-platform React Native app for Maatriva's real-time alerts.",
      "Improved web application load speed and lighthouse scores by 45%.",
      "Implemented complex interactive components like the 3D team orbit."
    ],
    contributions: [
      "Main developer of the Maatriva Web Dashboard.",
      "State management, real-time WebSockets integration for alerts.",
      "Interactive frontend animations and UI components."
    ],
    stats: [
      { label: "React/React Native", value: 95 },
      { label: "UI Engineering", value: 93 },
      { label: "Perf. Optimization", value: 90 }
    ],
    socials: {
      github: "https://github.com/arman-sharma",
      twitter: "https://twitter.com/arman_dev",
      email: "mailto:arman@maatriva.com"
    }
  },
];
