document.addEventListener('DOMContentLoaded', () => {
    const inputText = document.getElementById('inputText');
    const outputText = document.getElementById('outputText');
    const shiftInput = document.getElementById('shift');
    const encryptBtn = document.getElementById('encryptBtn');
    const decryptBtn = document.getElementById('decryptBtn');

    let isEncrypting = true;

    // Cargar el estado del botón desde localStorage
    if (localStorage.getItem('caesarCipherMode') === 'decrypt') {
        isEncrypting = false;
        encryptBtn.classList.remove('caesar-interface__button--active');
        decryptBtn.classList.add('caesar-interface__button--active');
    }

    function caesarCipher(text, shift, encrypt) {
        return text.split('').map(char => {
            if (char.match(/[a-z]/i)) {
                const code = char.charCodeAt(0);
                let shiftAmount = encrypt ? shift : -shift;
                if (code >= 65 && code <= 90) {
                    return String.fromCharCode(((code - 65 + shiftAmount + 26) % 26) + 65);
                } else if (code >= 97 && code <= 122) {
                    return String.fromCharCode(((code - 97 + shiftAmount + 26) % 26) + 97);
                }
            }
            return char;
        }).join('');
    }

    function updateOutput() {
        const text = inputText.value;
        const shift = parseInt(shiftInput.value);
        outputText.value = caesarCipher(text, shift, isEncrypting);
    }

    function toggleMode(mode) {
        isEncrypting = mode === 'encrypt';
        encryptBtn.classList.toggle('caesar-interface__button--active', isEncrypting);
        decryptBtn.classList.toggle('caesar-interface__button--active', !isEncrypting);
        localStorage.setItem('caesarCipherMode', isEncrypting ? 'encrypt' : 'decrypt');
        updateOutput();
    }

    inputText.addEventListener('input', updateOutput);
    shiftInput.addEventListener('input', updateOutput);
    encryptBtn.addEventListener('click', () => toggleMode('encrypt'));
    decryptBtn.addEventListener('click', () => toggleMode('decrypt'));

    // Inicializar la salida
    updateOutput();
});