const fs = require('fs');
const path = require('path');

const screensDir = path.join(__dirname, 'Frontend', 'src', 'screens');
const targetScreens = [
    'ProfileScreen.js',
    'ProfileFormScreen.js',
    'RegisterBabyScreen.js',
    'RegisterChildScreen.js',
    'TermsScreen.js',
    'ReminderScreen.js'
];

targetScreens.forEach(screen => {
    const filePath = path.join(screensDir, screen);
    if (!fs.existsSync(filePath)) return;
    
    let content = fs.readFileSync(filePath, 'utf8');
    
    if (!content.includes('LanguageToggle')) {
        // Add import
        content = content.replace(
            /(import .* from 'react-i18next';)/, 
            "$1\nimport LanguageToggle from '../components/LanguageToggle';"
        );
        
        // Find header logic and append LanguageToggle to it
        // Basic heuristic: find "</Text>" inside the header view
        // Since React Native headers vary, we'll look for:
        // `</TouchableOpacity>` then `<Text ...>...</Text>` -> append `<LanguageToggle />` after the Text
        
        content = content.replace(
            /(<Text style=\{styles\.headerTitle\}>.*?<\/Text>)/,
            "$1\n                <LanguageToggle />"
        );
        
        // Remove empty placeholders like `<View style={{ width: 20 }} />` or similar within header scope
        content = content.replace(/<View style=\{\{\s*width:\s*\d+\s*\}\}\s*\/>/g, "");
        
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Updated ${screen}`);
    }
});
