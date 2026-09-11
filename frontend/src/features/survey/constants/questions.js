export const QUESTIONS_PER_PAGE = 4;

export const SMART_CRADLE_INTRO = {
  title: "Imagine a smart infant-monitoring cradle",
  description: [
    "A contactless monitoring system that uses cameras and sensors to observe your baby's posture, movement, crying and other relevant indicators while they rest.",
    "The system can send alerts to parents when unusual patterns are detected, allowing them to check on the baby.",
    "It is designed as an additional layer of monitoring and early prediction and does not replace a doctor or medical care."
  ]
};

export const questions = [
  // Q1
  {
    id: 1,
    number: "Q1",
    question: "Which best describes you?",
    instruction: "Single choice",
    type: "radio",
    required: true,
    options: [
      "Parent of a child below 3 years",
      "Expecting parent",
      "Planning to have a child",
      "Caregiver / regularly involved in taking care of a child below 3 years",
      "Taken care of a baby for upto 3 years",
    ],
  },
  // Q2
  {
    id: 2,
    number: "Q2",
    question: "Has your child ever been born prematurely, or has any congenital disease which required NICU care?",
    instruction: "Single choice",
    type: "radio",
    required: true,
    options: [
      "Yes",
      "No",
      "Not applicable",
    ],
  },
  // Q3
  {
    id: 3,
    number: "Q3",
    question: "When your baby is sleeping or not under direct supervision, how concerned are you about not knowing if something is wrong?",
    instruction: "Use a 1–5 scale.",
    type: "scale",
    scaleMin: 1,
    scaleMax: 5,
    minLabel: "1 = Not at all concerned",
    maxLabel: "5 = Extremely concerned",
    required: true,
    options: ["1", "2", "3", "4", "5"],
  },
  // Q4
  {
    id: 4,
    number: "Q4",
    question: "What is your biggest concern when you cannot directly monitor your baby?",
    instruction: "Choose ONE.",
    type: "radio",
    hasOther: true,
    required: true,
    options: [
      "Breathing difficulties",
      "Abnormal posture/position",
      "Excessive/unusual crying",
      "Temperature changes",
      "Unusual movement",
      "Missing an early sign that something may be wrong",
      "Other",
    ],
  },

  // (Between Q4 and Q5: Smart Cradle Introduction is displayed)

  // Q5
  {
    id: 5,
    number: "Q5",
    question: "How valuable would you find such a product for your baby?",
    instruction: "Use a 1–5 scale.",
    type: "scale",
    scaleMin: 1,
    scaleMax: 5,
    minLabel: "1 = Not valuable at all",
    maxLabel: "5 = Extremely valuable",
    required: true,
    options: ["1", "2", "3", "4", "5"],
  },
  // Q6
  {
    id: 6,
    number: "Q6",
    question: "Which TWO features would make you most likely to use/buy it?",
    instruction: "Select up to 2.",
    type: "checkbox",
    maxSelections: 2,
    required: true,
    options: [
      "Continuous posture & movement monitoring",
      "Accurate cry-type detection & automatic soothing",
      "Contactless vital monitoring, no wearables, reducing discomfort & skin irritation",
      "Symptoms-based insights for early detection",
      "Breathing/respiratory monitoring",
      "Temperature monitoring & automatic regulation",
      "Sleep monitoring",
      "Alerts when unusual patterns are detected",
      "Remote monitoring through a mobile app",
      "Privacy-focused/local data processing",
    ],
  },
  // Q7
  {
    id: 7,
    number: "Q7",
    question: "If such a product were clinically validated, safe, accurate and commercially available, how likely would you be to purchase it?",
    instruction: "0–10",
    type: "scale",
    scaleMin: 0,
    scaleMax: 10,
    minLabel: "0 = Definitely would not purchase",
    maxLabel: "10 = Definitely would purchase",
    required: true,
    isPriority: true,
    options: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
  },
  // Q8
  {
    id: 8,
    number: "Q8",
    question: "What would be the maximum price you would consider reasonable for a complete MAATRIVA smart cradle?",
    instruction: "Single choice",
    type: "radio",
    required: true,
    isPriority: true,
    options: [
      "₹35k–₹50k",
      "₹50k–₹75k",
      "₹75k–₹1L",
      "₹1L–₹1.5L",
      "₹1.5L–₹2L",
      "₹2L+",
      "I would not purchase it",
    ],
  },

  // Q9
  {
    id: 9,
    number: "Q9",
    question: "Which payment model would you prefer?",
    instruction: "Single choice",
    type: "radio",
    required: true,
    options: [
      "One-time purchase",
      "Monthly subscription",
      "Annual subscription",
      "One-time purchase + optional AI/monitoring subscription",
      "Rental for the first year",
      "No preference",
    ],
  },
  // Q10
  {
    id: 10,
    number: "Q10",
    question: "What would be your biggest concern about purchasing such a product?",
    instruction: "Single choice",
    type: "radio",
    hasOther: true,
    required: true,
    isPriority: true,
    options: [
      "Accuracy/reliability",
      "False alarms",
      "Missing a genuine problem",
      "Privacy/data security",
      "Camera monitoring inside the home",
      "Price",
      "Difficulty of use",
      "Lack of doctor/hospital validation",
      "Concern that technology cannot reliably monitor a baby",
      "Other",
    ],
  },
  // Q11
  {
    id: 11,
    number: "Q11",
    question: "Which ONE factor would increase your confidence enough to purchase?",
    instruction: "Single choice",
    type: "radio",
    hasOther: true,
    required: true,
    isPriority: true,
    options: [
      "Clinical validation",
      "Paediatrician/doctor recommendation",
      "Hospital/NICU recommendation",
      "Government/medical-device certification",
      "Demonstrated high accuracy",
      "Strong privacy/data protection",
      "Positive reviews from other parents",
      "Buy-back/exchange option after 2 years",
      "Other",
    ],
  },
  // Q12
  {
    id: 12,
    number: "Q12",
    question: "If MAATRIVA met your expectations for safety, accuracy and privacy, where would you be most comfortable purchasing it?",
    instruction: "Single choice",
    type: "radio",
    hasOther: true,
    required: true,
    options: [
      "Directly from MAATRIVA's website",
      "Hospital/NICU",
      "Paediatrician/clinic",
      "Amazon/other e-commerce",
      "Baby-product store",
      "Pharmacy/medical store",
      "Other",
    ],
  },

  // Q13
  {
    id: 13,
    number: "Q13",
    question: "How likely would you be to recommend a product like this to another parent if you found it genuinely useful?",
    instruction: "0–10",
    type: "scale",
    scaleMin: 0,
    scaleMax: 10,
    minLabel: "0 = Definitely would not recommend",
    maxLabel: "10 = Extremely likely to recommend",
    required: true,
    options: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
  },
  // Q14
  {
    id: 14,
    number: "Q14",
    question: "If this product were available at a price you considered reasonable, what is the ONE reason you would buy it?",
    instruction: "Open-ended text",
    type: "textarea",
    required: false,
    placeholder: "Tell us the primary factor that would motivate your purchase...",
  },
  // Q15
  {
    id: 15,
    number: "Q15",
    question: "What is the ONE reason you would NOT buy it?",
    instruction: "Open-ended text",
    type: "textarea",
    required: false,
    placeholder: "Tell us what might cause hesitation or prevent your purchase...",
  },
  // Q16
  {
    id: 16,
    number: "Q16",
    question: "If MAATRIVA were priced at ₹45000 and offered the features described above, how would you feel about the price?",
    instruction: "0–10",
    type: "scale",
    scaleMin: 0,
    scaleMax: 10,
    minLabel: "0 = Completely unreasonable",
    maxLabel: "10 = Highly reasonable",
    required: true,
    isPriority: true,
    options: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
  },
];
