const fs = require('fs');
const path = require('path');

const screensDir = path.join(__dirname, 'Frontend', 'src', 'screens');
const files = fs.readdirSync(screensDir).filter(f => f.endsWith('.js'));

console.log('\n=== Language Toggle Audit ===');
files.forEach(f => {
  const content = fs.readFileSync(path.join(screensDir, f), 'utf8');
  const hasImport = content.includes("import LanguageToggle");
  const hasUsage = content.includes("<LanguageToggle");
  console.log(`${f}: import=${hasImport}, usage=${hasUsage}`);
});
