
document.addEventListener('DOMContentLoaded', () => {


    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$#%@!&^*';
    const hackerElements = document.querySelectorAll('.hacker-text');
    
    hackerElements.forEach(el => {
        let iterations = 0;
        let interval = null;
        const originalText = el.dataset.value || el.innerText;
        el.dataset.value = originalText;
        
        const scramble = () => {
            clearInterval(interval);
            iterations = 0;
            interval = setInterval(() => {
                el.innerText = originalText.split('').map((char, index) => {
                    if (index < iterations || char === ' ') return originalText[index];
                    return characters[Math.floor(Math.random() * characters.length)];
                }).join('');
                
                if (iterations >= originalText.length) clearInterval(interval);
                iterations += 1/2; 
            }, 30);
        };
        
        el.addEventListener('mouseenter', scramble);
        
        setTimeout(scramble, 500);
    });

    
    const canvas = document.getElementById('matrix-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const letters = characters.split('');
        const fontSize = 16;
        const columns = canvas.width / fontSize;
        const drops = Array(Math.floor(columns)).fill(1);

        function drawMatrix() {
            ctx.fillStyle = 'rgba(10, 12, 16, 0.05)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            ctx.fillStyle = '#0F0';
            ctx.font = fontSize + 'px monospace';

            for (let i = 0; i < drops.length; i++) {
                const text = letters[Math.floor(Math.random() * letters.length)];
                ctx.fillText(text, i * fontSize, drops[i] * fontSize);
                if (drops[i] * fontSize > canvas.height && Math.random() > 0.95) {
                    drops[i] = 0;
                }
                drops[i]++;
            }
        }
        setInterval(drawMatrix, 35);
        
        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        });
    }

    
    const termType = document.getElementById('term-type');
    if (termType) {
        const typeText = "Loading skills database...\n[OK] Web Exploitation\n[OK] Network Forensics\n[OK] Python Automation\n[OK] Reverse Engineering\n> AWAITING COMMAND";
        let i = 0;
        setTimeout(() => {
            const typerInt = setInterval(() => {
                termType.innerHTML += typeText.charAt(i) === '\n' ? '<br>' : typeText.charAt(i);
                i++;
                if (i >= typeText.length) clearInterval(typerInt);
            }, 50);
        }, 1500);
    }

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if(target){
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});
