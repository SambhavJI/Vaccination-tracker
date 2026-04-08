const fs = require('fs');

const hiPath = 'Frontend/src/locales/hi.json';
const enPath = 'Frontend/src/locales/en.json';

const faqHi = {
  title: "अक्सर पूछे जाने वाले प्रश्न",
  subtitle: "टीकाकरण ट्रैकर के बारे में सामान्य प्रश्नों के उत्तर",
  filters: {
    all: "सभी",
    registration: "पंजीकरण",
    appointment: "नियुक्ति",
    vaccination: "टीकाकरण",
    schedule: "अनुसूची",
    general: "सामान्य"
  },
  questions: {
    q1: "सिस्टम में उपयोगकर्ता कैसे पंजीकृत हो सकते हैं?",
    a1: "नाम, ईमेल, फोन और पासवर्ड के साथ साइनअप फॉर्म भरें।",
    q2: "पंजीकरण के दौरान कौन सी जानकारी आवश्यक है?",
    a2: "नाम, ईमेल, फोन नंबर और पासवर्ड।",
    q3: "क्या मैं अपनी प्रोफ़ाइल का विवरण अपडेट कर सकता हूँ?",
    a3: "हाँ, आप नीचे के नेविगेशन बार से प्रोफ़ाइल अनुभाग में जा सकते हैं। संपादित करें विकल्प स्क्रीन के ऊपरी दाएं कोने में उपलब्ध है।",
    q4: "मैं टीकाकरण अपॉइंटमेंट कैसे शेड्यूल कर सकता हूँ?",
    a4: "अपॉइंटमेंट अनुभाग से तिथि और समय स्लॉट चुनें।",
    q5: "क्या मैं अपना रिमाइंडर पुनर्निर्धारित कर सकता हूँ?",
    a5: "हाँ, रिमाइंडर अनुभाग में उपलब्ध प्लस चिह्न के साथ।",
    q6: "क्या मैं अपना टीकाकरण इतिहास देख सकता हूँ?",
    a6: "हाँ, डैशबोर्ड में।",
    q7: "क्या टीकों के लिए रिमाइंडर दिए जाते हैं?",
    a7: "हाँ, सूचनाएँ भेजी जाती हैं।",
    q8: "क्या उपयोगकर्ता डेटा सुरक्षित है?",
    a8: "हाँ, प्रमाणीकरण के साथ सुरक्षित है।",
    q9: "क्या इंटरनेट आवश्यक है?",
    a9: "हाँ, इंटरनेट आवश्यक है।"
  }
};

const faqEn = {
  title: "Frequently Asked Questions",
  subtitle: "Answers to common questions about Vaccination Tracker",
  filters: {
    all: "All",
    registration: "Registration",
    appointment: "Appointment",
    vaccination: "Vaccination",
    schedule: "Schedule",
    general: "General"
  },
  questions: {
    q1: "How can a user register in the system?",
    a1: "Fill signup form with name, email, phone, password.",
    q2: "What information is required during registration?",
    a2: "Name, email, phone number and password.",
    q3: "Can I update my profile details?",
    a3: "Yes, You can navigate to the Profile section from the bottom navigation bar. The Edit option is available in the top-right corner of the screen.",
    q4: "How can I schedule a vaccination appointment?",
    a4: "Select date and time slot from appointment section.",
    q5: "Can I reschedule my reminder?",
    a5: "Yes, with the plus sign available in reminder section.",
    q6: "Can I view my vaccination history?",
    a6: "Yes, in dashboard.",
    q7: "Are reminders provided for vaccines?",
    a7: "Yes, notifications are sent.",
    q8: "Is user data secure?",
    a8: "Yes, secured with authentication.",
    q9: "Is internet required?",
    a9: "Yes, internet is required."
  }
};

// Update hi.json
const hi = JSON.parse(fs.readFileSync(hiPath, 'utf8'));
hi.faq = faqHi;
fs.writeFileSync(hiPath, JSON.stringify(hi, null, 2), 'utf8');
console.log('hi.json updated with FAQ');

// Update en.json
const en = JSON.parse(fs.readFileSync(enPath, 'utf8'));
en.faq = faqEn;
fs.writeFileSync(enPath, JSON.stringify(en, null, 2), 'utf8');
console.log('en.json updated with FAQ');

// Verify
const hiCheck = JSON.parse(fs.readFileSync(hiPath, 'utf8'));
const enCheck = JSON.parse(fs.readFileSync(enPath, 'utf8'));
console.log('hi.json faq.title:', hiCheck.faq?.title);
console.log('en.json faq.title:', enCheck.faq?.title);
console.log('hi.json faq.questions.q1:', hiCheck.faq?.questions?.q1);
