const motherVaccinesSeed = [
  // 🤰 During Pregnancy

  {
    name: "Tetanus Toxoid (TT) - Dose 1",
    description: "Prevents tetanus infection in mother and newborn.",
    sideEffects: "Mild pain or swelling at injection site, low fever.",
    timingInWeeks: 12,
    category: "pregnancy",
    isDefault: true
  },
  {
    name: "Tetanus Toxoid (TT) - Dose 2",
    description: "Second dose for complete tetanus protection.",
    sideEffects: "Mild soreness at injection site.",
    timingInWeeks: 16,
    category: "pregnancy",
    isDefault: true
  },
  {
    name: "Tdap",
    description: "Protects newborn from whooping cough after birth.",
    sideEffects: "Pain at injection site, fatigue.",
    timingInWeeks: 30,
    category: "pregnancy",
    isDefault: true
  },
  {
    name: "Influenza (Flu Vaccine)",
    description: "Prevents severe flu complications during pregnancy.",
    sideEffects: "Mild fever, body ache.",
    timingInWeeks: 0,
    category: "pregnancy",
    isDefault: true
  },
  {
    name: "COVID-19 Vaccine",
    description: "Protects mother and baby from severe infection.",
    sideEffects: "Fatigue, mild fever.",
    timingInWeeks: 0,
    category: "pregnancy",
    isDefault: true
  },

  // 👩‍🍼 After Delivery

  {
    name: "MMR (Measles, Mumps, Rubella)",
    description: "Prevents rubella infection in future pregnancies.",
    sideEffects: "Mild rash, low fever.",
    timingInWeeks: 0,
    category: "postpartum",
    isDefault: true
  },
  {
    name: "Varicella (Chickenpox)",
    description: "Prevents severe chickenpox in mother.",
    sideEffects: "Mild rash.",
    timingInWeeks: 0,
    category: "postpartum",
    isDefault: true
  },
  {
    name: "Hepatitis B",
    description: "Prevents hepatitis B infection and transmission.",
    sideEffects: "Injection soreness.",
    timingInWeeks: 0,
    category: "postpartum",
    isDefault: true
  },
  {
    name: "HPV Vaccine",
    description: "Prevents cervical cancer.",
    sideEffects: "Mild fever, pain at injection site.",
    timingInWeeks: 4,
    category: "postpartum",
    isDefault: true
  }
];

export default motherVaccinesSeed;