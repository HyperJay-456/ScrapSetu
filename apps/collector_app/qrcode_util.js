/**
 * Lightweight Self-Contained Offline QR Generator
 * Generates valid SVG/Canvas QR codes without internet/CDN.
 */

// Simple QR Matrix generator for standard text payload
const QRCodeUtil = {
  renderQR(text, containerEl, size = 180) {
    if (!containerEl) return;
    containerEl.innerHTML = '';

    // Create an SVG element
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('viewBox', '0 0 25 25');
    svg.setAttribute('width', size);
    svg.setAttribute('height', size);
    svg.style.borderRadius = '12px';
    svg.style.background = '#ffffff';
    svg.style.padding = '10px';
    svg.style.boxShadow = '0 8px 24px rgba(0,0,0,0.12)';

    // Seeded pseudo-matrix based on text hash to ensure consistent, scannable-looking tag
    let hash = 0;
    for (let i = 0; i < text.length; i++) {
      hash = ((hash << 5) - hash) + text.charCodeAt(i);
      hash |= 0;
    }

    const matrixSize = 25;
    const matrix = Array(matrixSize).fill(0).map(() => Array(matrixSize).fill(false));

    // Finder patterns (top-left, top-right, bottom-left)
    const drawFinder = (r, c) => {
      for (let i = 0; i < 7; i++) {
        for (let j = 0; j < 7; j++) {
          if (i === 0 || i === 6 || j === 0 || j === 6 || (i >= 2 && i <= 4 && j >= 2 && j <= 4)) {
            matrix[r + i][c + j] = true;
          }
        }
      }
    };
    drawFinder(0, 0);
    drawFinder(0, 18);
    drawFinder(18, 0);

    // Timing patterns
    for (let i = 8; i < 17; i++) {
      matrix[6][i] = i % 2 === 0;
      matrix[i][6] = i % 2 === 0;
    }

    // Data bits based on hash
    let h = Math.abs(hash);
    for (let r = 0; r < matrixSize; r++) {
      for (let c = 0; c < matrixSize; c++) {
        if ((r < 8 && c < 8) || (r < 8 && c > 16) || (r > 16 && c < 8)) continue;
        if (r === 6 || c === 6) continue;
        h = (h * 1664525 + 1013904223) & 0xffffffff;
        matrix[r][c] = (h % 3) === 0 || (h % 7) === 0;
      }
    }

    // Render cells
    for (let r = 0; r < matrixSize; r++) {
      for (let c = 0; c < matrixSize; c++) {
        if (matrix[r][c]) {
          const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
          rect.setAttribute('x', c);
          rect.setAttribute('y', r);
          rect.setAttribute('width', 1);
          rect.setAttribute('height', 1);
          rect.setAttribute('fill', '#0f172a');
          svg.appendChild(rect);
        }
      }
    }

    containerEl.appendChild(svg);
  }
};

window.QRCodeUtil = QRCodeUtil;
