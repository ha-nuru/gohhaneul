const { readFileSync, writeFileSync, readdirSync, statSync } = require('fs');
const { join } = require('path');

const BASE_PATH = '/gohhaneul';
const distPath = join(process.cwd(), 'dist');

// HTML 파일 경로 수정
const distIndexPath = join(distPath, 'index.html');
let html = readFileSync(distIndexPath, 'utf-8');

// 상대 경로를 절대 경로로 변환 (GitHub Pages 배포용)
html = html.replace(/href="\.\/assets\//g, `href="${BASE_PATH}/assets/`);
html = html.replace(/src="\.\/assets\//g, `src="${BASE_PATH}/assets/`);
// favicon 경로 변환
html = html.replace(/href="\/favicon\.ico"/g, `href="${BASE_PATH}/favicon.ico"`);

writeFileSync(distIndexPath, html, 'utf-8');
console.log('✓ index.html 경로 변환 완료');

// CSS 파일 경로 수정
function fixFilePaths(dir) {
    const files = readdirSync(dir);
    
    files.forEach(file => {
        const filePath = join(dir, file);
        const stat = statSync(filePath);
        
        if (stat.isDirectory()) {
            fixFilePaths(filePath);
        } else if (file.endsWith('.css') || file.endsWith('.js')) {
            let content = readFileSync(filePath, 'utf-8');
            let modified = false;
            
            // CSS/JS 파일 내의 절대 경로 수정
            // "/assets/img/" -> "/gohhaneul/assets/img/"
            // "/assets/js/" -> "/gohhaneul/assets/js/"
            // 단, 이미 "/gohhaneul/assets/"로 시작하는 경우는 제외
            const patterns = [
                { 
                    regex: /url\(['"]?(\/assets\/[^'")]+)['"]?\)/g, 
                    replacement: (match, path) => {
                        if (!path.startsWith(BASE_PATH)) {
                            modified = true;
                            return `url('${BASE_PATH}${path}')`;
                        }
                        return match;
                    }
                },
                {
                    regex: /['"](\/assets\/[^'"]+)['"]/g,
                    replacement: (match, path) => {
                        if (!path.startsWith(BASE_PATH)) {
                            modified = true;
                            return `'${BASE_PATH}${path}'`;
                        }
                        return match;
                    }
                }
            ];
            
            patterns.forEach(({ regex, replacement }) => {
                content = content.replace(regex, replacement);
            });
            
            if (modified) {
                writeFileSync(filePath, content, 'utf-8');
                console.log(`✓ ${filePath.replace(process.cwd(), '')} 경로 변환 완료`);
            }
        }
    });
}

// assets 폴더 내의 CSS와 JS 파일 경로 수정
const assetsPath = join(distPath, 'assets');
if (statSync(assetsPath).isDirectory()) {
    fixFilePaths(assetsPath);
}

console.log('✓ 모든 경로 변환 완료');
