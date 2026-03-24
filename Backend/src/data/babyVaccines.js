const babyVaccinesSeed = [
  // 👶 At Birth (0 weeks)
  {
    name: "BCG",
    description: "Protects against severe forms of tuberculosis (TB), especially TB meningitis in infants.",
    sideEffects: "Small swelling or sore at injection site, mild fever, scar formation (normal).",
    timingInWeeks: 0,
    category: "baby",
    isDefault: true
  },
  {
    name: "OPV-0",
    description: "Oral Polio Vaccine that protects against poliovirus causing paralysis.",
    sideEffects: "Very mild fever or diarrhea (rare).",
    timingInWeeks: 0,
    category: "baby",
    isDefault: true
  },
  {
    name: "Hepatitis B-1",
    description: "Protects against hepatitis B virus affecting the liver.",
    sideEffects: "Soreness at injection site, mild fever.",
    timingInWeeks: 0,
    category: "baby",
    isDefault: true
  },

  // 6 Weeks
  {
    name: "DPT-1",
    description: "Protects against diphtheria, pertussis, and tetanus.",
    sideEffects: "Fever, swelling, pain at injection site.",
    timingInWeeks: 6,
    category: "baby",
    isDefault: true
  },
  {
    name: "OPV-1",
    description: "Continues protection against polio.",
    sideEffects: "Rare mild stomach upset.",
    timingInWeeks: 6,
    category: "baby",
    isDefault: true
  },
  {
    name: "IPV-1",
    description: "Inactivated Polio Vaccine.",
    sideEffects: "Redness or soreness.",
    timingInWeeks: 6,
    category: "baby",
    isDefault: true
  },
  {
    name: "Hib-1",
    description: "Protects against Hib infections.",
    sideEffects: "Mild fever.",
    timingInWeeks: 6,
    category: "baby",
    isDefault: true
  },
  {
    name: "Hepatitis B-2",
    description: "Second dose for hepatitis B.",
    sideEffects: "Mild fever.",
    timingInWeeks: 6,
    category: "baby",
    isDefault: true
  },
  {
    name: "Rotavirus-1",
    description: "Protects against rotavirus diarrhea.",
    sideEffects: "Mild diarrhea.",
    timingInWeeks: 6,
    category: "baby",
    isDefault: true
  },
  {
    name: "PCV-1",
    description: "Protects against pneumococcal diseases.",
    sideEffects: "Fever, swelling.",
    timingInWeeks: 6,
    category: "baby",
    isDefault: true
  },

  // 10 Weeks
  {
    name: "DPT-2",
    description: "Second DPT dose.",
    sideEffects: "Fever, pain.",
    timingInWeeks: 10,
    category: "baby",
    isDefault: true
  },
  {
    name: "OPV-2",
    description: "Polio protection continues.",
    sideEffects: "Rare stomach upset.",
    timingInWeeks: 10,
    category: "baby",
    isDefault: true
  },
  {
    name: "IPV-2",
    description: "Boosts immunity against polio.",
    sideEffects: "Mild redness.",
    timingInWeeks: 10,
    category: "baby",
    isDefault: true
  },
  {
    name: "Hib-2",
    description: "Second Hib dose.",
    sideEffects: "Low fever.",
    timingInWeeks: 10,
    category: "baby",
    isDefault: true
  },
  {
    name: "Rotavirus-2",
    description: "Second rotavirus dose.",
    sideEffects: "Mild diarrhea.",
    timingInWeeks: 10,
    category: "baby",
    isDefault: true
  },
  {
    name: "PCV-2",
    description: "Second PCV dose.",
    sideEffects: "Sleepiness, mild fever.",
    timingInWeeks: 10,
    category: "baby",
    isDefault: true
  },

  // 14 Weeks
  {
    name: "DPT-3",
    description: "Third DPT dose.",
    sideEffects: "Fever, swelling.",
    timingInWeeks: 14,
    category: "baby",
    isDefault: true
  },
  {
    name: "OPV-3",
    description: "Polio protection continues.",
    sideEffects: "Very rare digestive upset.",
    timingInWeeks: 14,
    category: "baby",
    isDefault: true
  },
  {
    name: "IPV-3",
    description: "Strengthens protection against polio.",
    sideEffects: "Injection soreness.",
    timingInWeeks: 14,
    category: "baby",
    isDefault: true
  },
  {
    name: "Hib-3",
    description: "Completes early Hib protection.",
    sideEffects: "Low fever.",
    timingInWeeks: 14,
    category: "baby",
    isDefault: true
  },
  {
    name: "Rotavirus-3",
    description: "Final rotavirus dose.",
    sideEffects: "Temporary diarrhea.",
    timingInWeeks: 14,
    category: "baby",
    isDefault: true
  },

  // 9 Months (36 weeks)
  {
    name: "Measles/MR",
    description: "Protects against measles and rubella.",
    sideEffects: "Mild rash, fever.",
    timingInWeeks: 36,
    category: "baby",
    isDefault: true
  },
  {
    name: "Vitamin A - 1",
    description: "Prevents vitamin A deficiency.",
    sideEffects: "Rare nausea.",
    timingInWeeks: 36,
    category: "baby",
    isDefault: true
  },

  // 12 Months (52 weeks)
  {
    name: "PCV Booster",
    description: "Boosts pneumococcal protection.",
    sideEffects: "Mild fever.",
    timingInWeeks: 52,
    category: "baby",
    isDefault: true
  },
  {
    name: "MMR-1",
    description: "Protects against measles, mumps, rubella.",
    sideEffects: "Mild rash.",
    timingInWeeks: 52,
    category: "baby",
    isDefault: true
  },
  {
    name: "Hepatitis A",
    description: "Protects against hepatitis A.",
    sideEffects: "Injection soreness.",
    timingInWeeks: 52,
    category: "baby",
    isDefault: true
  },
  {
    name: "Varicella",
    description: "Protects against chickenpox.",
    sideEffects: "Mild rash.",
    timingInWeeks: 52,
    category: "baby",
    isDefault: true
  },

  // 18 Months (78 weeks)
  {
    name: "DPT Booster-1",
    description: "Boosts DPT immunity.",
    sideEffects: "Swelling, fever.",
    timingInWeeks: 78,
    category: "baby",
    isDefault: true
  },
  {
    name: "OPV Booster",
    description: "Maintains polio immunity.",
    sideEffects: "Rare stomach upset.",
    timingInWeeks: 78,
    category: "baby",
    isDefault: true
  },
  {
    name: "Hib Booster",
    description: "Extends Hib protection.",
    sideEffects: "Mild fever.",
    timingInWeeks: 78,
    category: "baby",
    isDefault: true
  },
  {
    name: "MMR-2",
    description: "Second MMR dose.",
    sideEffects: "Mild fever.",
    timingInWeeks: 78,
    category: "baby",
    isDefault: true
  },

  // 2 Years (104 weeks)
  {
    name: "Typhoid Conjugate",
    description: "Protects against typhoid fever.",
    sideEffects: "Mild fever.",
    timingInWeeks: 104,
    category: "baby",
    isDefault: true
  },
  {
    name: "Vitamin A - 2",
    description: "Maintains immunity and vision health.",
    sideEffects: "Rare nausea.",
    timingInWeeks: 104,
    category: "baby",
    isDefault: true
  },

  // 5 Years (260 weeks)
  {
    name: "DPT Booster-2",
    description: "Maintains immunity against diphtheria, pertussis, tetanus.",
    sideEffects: "Swelling, mild fever.",
    timingInWeeks: 260,
    category: "baby",
    isDefault: true
  },
  {
    name: "OPV/IPV Booster",
    description: "Continued protection against polio.",
    sideEffects: "Injection site soreness.",
    timingInWeeks: 260,
    category: "baby",
    isDefault: true
  },
  {
    name: "MMR Booster",
    description: "Long-term protection against measles, mumps, rubella.",
    sideEffects: "Mild rash.",
    timingInWeeks: 260,
    category: "baby",
    isDefault: true
  }
];

export default babyVaccinesSeed;