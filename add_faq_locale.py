import json
import os

en_path = r'd:/vacination/Vaccination-tracker/Frontend/src/locales/en.json'
hi_path = r'd:/vacination/Vaccination-tracker/Frontend/src/locales/hi.json'

faq_en = {
  "title": "Frequently Asked Questions",
  "subtitle": "Answers to common questions about Vaccination Tracker",
  "filters": {
    "all": "All",
    "registration": "Registration",
    "appointment": "Appointment",
    "vaccination": "Vaccination",
    "schedule": "Schedule",
    "general": "General"
  },
  "questions": {
    "q1": "How can a user register in the system?",
    "a1": "Fill signup form with name, email, phone, password.",
    "q2": "What information is required during registration?",
    "a2": "Name, email, phone number and password.",
    "q3": "Can I update my profile details?",
    "a3": "Yes, You can navigate to the Profile section from the bottom navigation bar. The Edit option is available in the top-right corner of the screen.",
    "q4": "How can I schedule a vaccination appointment?",
    "a4": "Select date and time slot from appointment section.",
    "q5": "Can I reschedule my reminder?",
    "a5": "Yes, with the plus sign availabe in reminder section",
    "q6": "Can I view my vaccination history?",
    "a6": "Yes, in dashboard.",
    "q7": "Are reminders provided for vaccines?",
    "a7": "Yes, notifications are sent.",
    "q8": "Is user data secure?",
    "a8": "Yes, secured with authentication.",
    "q9": "Is internet required?",
    "a9": "Yes, internet is required."
  }
}

faq_hi = {
  "title": "अक्सर पूछे जाने वाले प्रश्न",
  "subtitle": "टीकाकरण ट्रैकर के बारे में सामान्य प्रश्नों के उत्तर",
  "filters": {
    "all": "सभी",
    "registration": "पंजीकरण",
    "appointment": "नियुक्ति",
    "vaccination": "टीकाकरण",
    "schedule": "अनुसूची",
    "general": "सामान्य"
  },
  "questions": {
    "q1": "सिस्टम में उपयोगकर्ता कैसे रजिस्टर कर सकता है?",
    "a1": "नाम, ईमेल, फोन और पासवर्ड के साथ साइनअप फॉर्म भरें।",
    "q2": "पंजीकरण के दौरान कौन सी जानकारी आवश्यक है?",
    "a2": "नाम, ईमेल, फोन नंबर और पासवर्ड।",
    "q3": "क्या मैं अपना प्रोफ़ाइल विवरण अपडेट कर सकता हूँ?",
    "a3": "हाँ, आप नीचे के नेविगेशन बार से प्रोफ़ाइल अनुभाग में जा सकते हैं। संपादित करें विकल्प स्क्रीन के ऊपरी दाएं कोने में उपलब्ध है।",
    "q4": "मैं टीकाकरण अपॉइंटमेंट कैसे शेड्यूल कर सकता हूँ?",
    "a4": "अपॉइंटमेंट अनुभाग से तिथि और समय स्लॉट चुनें।",
    "q5": "क्या मैं अपना अनुस्मारक पुनर्निर्धारित कर सकता हूँ?",
    "a5": "हाँ, अनुस्मारक अनुभाग में उपलब्ध प्लस चिह्न के साथ।",
    "q6": "क्या मैं अपना टीकाकरण इतिहास देख सकता हूँ?",
    "a6": "हाँ, डैशबोर्ड में।",
    "q7": "क्या टीकों के लिए रिमाइंडर दिए जाते हैं?",
    "a7": "हाँ, सूचनाएँ भेजी जाती हैं।",
    "q8": "क्या उपयोगकर्ता डेटा सुरक्षित है?",
    "a8": "हाँ, प्रमाणीकरण के साथ सुरक्षित है।",
    "q9": "क्या इंटरनेट आवश्यक है?",
    "a9": "हाँ, इंटरनेट आवश्यक है।"
  }
}

def update_locale(filepath, faq_data):
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            data = json.load(f)
        
        data['faq'] = faq_data
        
        with open(filepath, 'w', encoding='utf-8') as f:
            json.dump(data, f, ensure_ascii=False, indent=2)
        print(f"Successfully updated {filepath}")
    except Exception as e:
        print(f"Error updating {filepath}: {e}")

update_locale(en_path, faq_en)
update_locale(hi_path, faq_hi)
