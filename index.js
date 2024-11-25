document.addEventListener('DOMContentLoaded', () => {
    const rangeSlider = document.getElementById('rangeSlider');
    const rangeValue = document.getElementById('rangeValue');
    const generateBtn = document.getElementById('generate-btn');
    const textBox = document.getElementById('text_box');
    const copyBtn = document.querySelector('.copy-btn');

    const alphabetsCheckbox = document.getElementById('alphabets');
    const numbersCheckbox = document.getElementById('numbers');
    const splcharCheckbox = document.getElementById('splchar');

    const messageTooltip = document.getElementById('message-tooltip');

    const alphabets = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numbers = '0123456789';
    const specialChars = '!@#$%^&*()-_=+[]{}|;:<>,.?/~`';
    function showMessage(message) {
        messageTooltip.textContent = message;
        messageTooltip.classList.add('visible');
        setTimeout(() => {
            messageTooltip.classList.remove('visible');
        }, 2000);
    }
    rangeSlider.addEventListener('input', () => {
        rangeValue.textContent = rangeSlider.value;
        const percent = (rangeSlider.value - rangeSlider.min) / (rangeSlider.max - rangeSlider.min) * 100;
        rangeValue.style.left = `calc(${percent}% + (${8 - percent * 0.15}px))`;
    });

    generateBtn.addEventListener('click', () => {
        let passwordLength = parseInt(rangeSlider.value);
        let characterPool = '';

        if (alphabetsCheckbox.checked) characterPool += alphabets;
        if (numbersCheckbox.checked) characterPool += numbers;
        if (splcharCheckbox.checked) characterPool += specialChars;

        if (!characterPool) {
            showMessage('Please select at least one option to generate a password.');
            return;
        }

        let password = '';
        for (let i = 0; i < passwordLength; i++) {
            const randomIndex = Math.floor(Math.random() * characterPool.length);
            password += characterPool[randomIndex];
        }

        textBox.value = password;
        showMessage('Password generated successfully!');
    });
    copyBtn.addEventListener('click', () => {
        const password = textBox.value;
        if (!password) {
            showMessage('Nothing to copy! Please generate a password first.');
            return;
        }
        navigator.clipboard.writeText(password).then(() => {
            showMessage('Password copied to clipboard!');
        }).catch(err => {
            console.error('Failed to copy text: ', err);
            showMessage('Failed to copy password.');
        });
    });
});
