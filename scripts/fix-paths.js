const { readFileSync, writeFileSync } = require('fs');
const { join } = require('path');

const distIndexPath = join(process.cwd(), 'dist', 'index.html');
let html = readFileSync(distIndexPath, 'utf-8');

// 상대 경로를 절대 경로로 변환
html = html.replace(/href="\.\/assets\//g, 'href="/gohhaneul/assets/');
html = html.replace(/src="\.\/assets\//g, 'src="/gohhaneul/assets/');

writeFileSync(distIndexPath, html, 'utf-8');
console.log('✓ 경로 변환 완료');
