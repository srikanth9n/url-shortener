
document.getElementById('urlForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const longUrl = document.getElementById('longUrl').value;
    const outputType = document.querySelector('input[name="outputType"]:checked').value;
    const resultBox = document.getElementById('resultBox');
    const resultContent = document.getElementById('resultContent');

    resultContent.innerHTML = '';
    resultBox.style.display = 'block';

    if (outputType === 'short') {
        const shortUrl = 'https://short.ly/' + Math.random().toString(36).substr(2, 6);
        resultContent.innerHTML = `<input type="text" class="form-control" value="${shortUrl}" readonly id="shortUrlResult">`;
    } else {
        resultContent.innerHTML = '<div id="qrcode" class="text-center"></div>';
        new QRCode(document.getElementById('qrcode'), {
            text: longUrl,
            width: 150,
            height: 150,
            colorDark: "#2c3e50",
            colorLight: "#ffffff"
        });
    }

    document.getElementById('copyBtn').onclick = function() {
        if (outputType === 'short') {
            const shortUrlResult = document.getElementById('shortUrlResult');
            shortUrlResult.select();
            document.execCommand('copy');
            showFeedback('Copied to clipboard!', 'great');
        } else {
            showFeedback('QR Code cannot be copied as text. Save the image!', 'sad');
        }
    };
});

const feedbackMessage = document.getElementById('feedbackMessage');
function showFeedback(message, style) {
    feedbackMessage.textContent = message;
    feedbackMessage.className = `feedback-message ${style} show`;
    setTimeout(() => {
        feedbackMessage.className = 'feedback-message';
    }, 3000); // Hide after 3 seconds
}

document.querySelectorAll('.star-rating input').forEach(star => {
    star.addEventListener('change', function() {
        const rating = this.value;
        let message, style;
        switch (rating) {
            case '5':
                message = 'Loved It! Thanks for the 5 stars!';
                style = 'loved-it';
                break;
            case '4':
                message = 'Great! We appreciate your 4 stars!';
                style = 'great';
                break;
            case '3':
                message = 'Better! Thanks for 3 stars, we’ll improve!';
                style = 'better';
                break;
            case '2':
                message = 'Okay... 2 stars noted, we’ll do better!';
                style = 'okay';
                break;
            case '1':
                message = 'Sad to hear! 1 star, we’ll work harder!';
                style = 'sad';
                break;
        }
        showFeedback(message, style);
    });
});
