export const QUESTIONS_PER_PAGE = 4;

export const questions = [
  // Q1–Q4
  {
    question: "What is your current parenting status?",
    type: "checkbox",
    options: [
      "Expecting a child",
      "Parent of a newborn (0–6 months)",
      "Parent of an infant (6–18 months)",
      "Parent of a toddler (18 months–3 years)",
      "Child Greater than 3 years",
      "Grandparent / caregiver",
      "Healthcare professional",
    ],
  },
  {
    question: "What is your age group?",
    type: "radio",
    options: ["Under 22", "22–28", "29–35", "36–42", "43+"],
  },
  {
    question: "What is your household type?",
    type: "radio",
    options: [
      "Nuclear family",
      "Joint family",
      "Single parent",
      "Co-parenting",
      "Other",
    ],
  },
  {
    question: "Monthly household income?",
    type: "radio",
    options: [
      "Below ₹30,000",
      "₹30k–₹60k",
      "₹60k–₹1L",
      "₹1L–₹2L",
      "Above ₹2L",
    ],
  },

  // Q5–Q8
  {
    question: "What is your city type?",
    type: "radio",
    options: ["Metro", "Tier 2", "Tier 3", "Rural"],
  },
  {
    question: "Are you a working parent?",
    type: "radio",
    options: [
      "Both working full-time",
      "One working",
      "Freelancer/Remote",
      "Not working",
    ],
  },
  {
    question: "How satisfied are you with current baby care journey?",
    type: "range",
    options: ["1","2","3","4","5","6","7","8","9","10"],
  },
  {
    question: "Which baby care challenges are you facing?",
    type: "checkbox",
    options: [
      "Breathing Regulation / Fever",
      "Temperature issues",
      "Understanding crying",
      "Parental sleep deprivation",
      "SIDS worry",
      "Baby feeding problem",
      "Night monitoring",
      "Feeding concerns",
      "Custom"
    ],
  },

  // Q9–Q12
  {
    question: "How much sleep are you getting?",
    type: "radio",
    options: ["<3 hrs", "3–5 hrs", "5–7 hrs", "7+ hrs"],
  },
  {
    question: "Rate your level of anxiety regarding baby's sleep and safety:",
    type: "range",
    options: ["Low", "Medium", "High", "Very High"],
  },
  {
    question: "How likely would an AI voice assistant , trained on baby care would help you ?",
    type: "radio",
    options: [
      "Extremely valuable",
      "Very valuable",
      "Somewhat",
      "Not sure",
      "Not valuable",
    ],
  },
  {
    question: "AI chatbot topics?",
    type: "checkbox",
    options: [
      "feedin suggestions",
      "Sleep training",
      "Developmental milestones",
      "Vaccinations and medical checkups",
      "Healthcare analysis and feedback",
      "Cry detection",
      "Mental health",
      "Custom",
    ],
  },

  // Q13–Q16
  {
    question: "Interest in AI-powered health monitoring (real-time alerts):",
    type: "checkbox",
    options: ["Low", "Medium", "High", "Very High"],
  },
  {
    question: "How much do you value cry detection and translation?",
    type: "range",
    options: ["1","2","3","4","5","6","7","8","9","10"],
  },
  {
    question: "Cry types needed?",
    type: "checkbox",
    options: [
      "Hunger",
      "Pain",
      "Sleep",
      "Colic",
      "Burping",
      "Attention",
      "Illness",
    ],
  },
  {
    question: "AI sleep prediction feature?",
    type: "radio",
    options: ["Yes", "Maybe", "Depends", "No"],
  },

  // Q17–Q20
  {
    question: "Importance of aesthetic design in baby furniture:",
    type: "range",
    options: ["Low", "Medium", "High", "Very High"],
  },
  {
    question: "Importance of premium and sustainable materials:",
    type: "range",
    options: ["Low", "Medium", "High", "Very High"],
  },
  {
    question: "Importance of portability and modular design:",
    type: "range",
    options: ["Low", "Medium", "High", "Very High"],
  },
  {
    question: "Preferred cradle design?",
    type: "radio",
    options: [
      "Elephant",
      "Giraffe",
      "Hippo",
      "Whale",
      "Bear",
      "Bunny",
      "Lion",
      "Minimal",
    ],
  },

  // Q21–Q24
  {
    question: "Preferred color palette?",
    type: "checkbox",
    options: [
      "White/Grey",
      "Wood tones",
      "Blue",
      "Pink",
      "Mint",
      "Multicolor",
      "All white",
    ],
  },
  {
    question: "Material preference?",
    type: "radio",
    options: [
      "Plastic",
      "Wood",
      "Fabric",
      "Metal",
      "No preference",
    ],
  },
  {
    question: "Cradle size?",
    type: "radio",
    options: ["Compact", "Standard", "Large", "Portable"],
  },
  {
    question: "Transform to toddler bed?",
    type: "radio",
    options: ["Yes", "Yes (not priority)", "No", "No preference"],
  },

  // Q25–Q28
  {
    question: "Max price?",
    type: "radio",
    options: [
      "<₹15k",
      "₹15k–₹25k",
      "₹25k–₹40k",
      "₹40k–₹55k",
      "₹55k–₹75k",
      "₹75k+",
    ],
  },
  {
    question: "Payment model?",
    type: "radio",
    options: [
      "One-time",
      "EMI",
      "Subscription",
      "Rent-to-own",
      "Hospital use",
    ],
  },
  {
    question: "Monthly app price?",
    type: "radio",
    options: [
      "No subscription",
      "₹99",
      "₹100–₹299",
      "₹300–₹499",
      "₹500+",
    ],
  },
  {
    question: "Buy-back program effect?",
    type: "radio",
    options: ["Very positive", "Somewhat", "Neutral", "Negative"],
  },

  // Q29–Q32
  {
    question: "Buy refurbished product?",
    type: "radio",
    options: ["Yes", "No", "Maybe"],
  },
  {
    question: "Willingness to buy a certified refurbished Maatriva:",
    type: "range",
    options: ["Low", "Medium", "High", "Very High"],
  },
  {
    question: "Data privacy comfort?",
    type: "radio",
    options: [
      "Yes fully",
      "Yes anonymized",
      "No",
      "Need more info",
    ],
  },
  {
    question: "Trust Indian startup?",
    type: "radio",
    options: [
      "Yes fully",
      "With hesitation",
      "Prefer big brand",
      "No",
    ],
  },

  // Q33–Q36
  {
    question: "Overall interest in a subscription-based model for AI features:",
    type: "range",
    options: ["Low", "Medium", "High", "Very High"],
  },
  {
    question: "Clinical use cases?",
    type: "checkbox",
    options: ["NICU", "Hospital", "Clinic", "Daycare", "Home care"],
  },
  {
    question: "Clinical pricing?",
    type: "checkbox",
    options: [
      "₹40k–₹60k",
      "₹60k–₹80k",
      "₹80k–₹1.2L",
      "₹1.2L+",
    ],
  },
  {
    question: "Used baby monitor before?",
    type: "radio",
    options: ["Yes", "No", "Maybe"],
  },

  // Q37–Q40
  {
    question: "Known products?",
    type: "checkbox",
    options: [
      "Owlet",
      "Nanit",
      "Motorola",
      "Philips",
      "Miku",
      "iBaby",
      "None",
    ],
  },
  {
    question: "Biggest complaint?",
    type: "checkbox",
    options: [
      "Expensive",
      "False alarms",
      "Bad app",
      "Offline issues",
      "Privacy",
      "No AI",
    ],
  },
  {
    question: "Likelihood of upgrading to the Pro version in the future:",
    type: "range",
    options: ["Low", "Medium", "High", "Very High"],
  },
  {
    question: "How likely are you to recommend Maatriva to others?",
    type: "range",
    options: ["1","2","3","4","5","6","7","8","9","10"],
  },
  {
    question: "What is your gender?",
    type: "radio",
    options: ["Male", "Female", "Other", "Prefer not to say"],
  },
];
