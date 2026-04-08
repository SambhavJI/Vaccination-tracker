const fs = require('fs');
const path = require('path');
const dir = 'Frontend/src/screens';

fs.readdirSync(dir).filter(f => f.endsWith('.js')).forEach(f => {
    const c = fs.readFileSync(path.join(dir, f), 'utf8');
    const imp = c.includes('LanguageToggle');
    const use = c.includes('<LanguageToggle');
    let status;
    if (imp && use) status = 'OK';
    else if (imp && !use) status = 'IMPORT-ONLY';
    else if (!imp && use) status = 'USE-ONLY';
    else status = 'MISSING';
    console.log(status + ' | ' + f);
});
