// Файл-переходник для обхода шаблона BotHost
console.log('🚀 Инициализация TypeScript-сервера...');
require('child_process').execSync('npx tsx src/app.ts', { stdio: 'inherit' });
