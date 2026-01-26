const { readFileSync, writeFileSync } = require('fs');
const { join } = require('path');

const distIndexPath = join(process.cwd(), 'dist', 'index.html');
let html = readFileSync(distIndexPath, 'utf-8');

// 상대 경로를 절대 경로로 변환 (삼성 브라우저 호환성)
html = html.replace(/href="\.\/assets\//g, 'href="/gohhaneul/assets/');
html = html.replace(/src="\.\/assets\//g, 'src="/gohhaneul/assets/');

// 삼성 브라우저 호환성: CSS link 태그의 crossorigin 속성 제거
html = html.replace(/<link rel="stylesheet" crossorigin href=/g, '<link rel="stylesheet" href=');
html = html.replace(/<link rel="stylesheet" crossorigin/g, '<link rel="stylesheet"');

writeFileSync(distIndexPath, html, 'utf-8');
console.log('✓ 경로 변환 완료 (삼성 브라우저 호환성)');
