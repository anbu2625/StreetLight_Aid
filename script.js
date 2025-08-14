// Camera traffic light detection
const video = document.getElementById('camera');
const canvas = document.getElementById('canvas');
const statusEl = document.getElementById('status');

let lastSpoken = "";

if (video && canvas && statusEl) {
  navigator.mediaDevices.getUserMedia({ video: true })
    .then(stream => {
      video.srcObject = stream;
      const ctx = canvas.getContext('2d');

      setInterval(() => {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        ctx.drawImage(video, 0, 0);

        // Detection box
        const boxX = video.videoWidth / 2 - 50;
        const boxY = video.videoHeight / 2 - 50;
        const boxW = 100;
        const boxH = 100;
        ctx.strokeStyle = "yellow";
        ctx.lineWidth = 3;
        ctx.strokeRect(boxX, boxY, boxW, boxH);

        const imageData = ctx.getImageData(boxX, boxY, boxW, boxH);
        const avgColor = getAverageColor(imageData.data);

        let detected = "";
        if (avgColor.r > 150 && avgColor.g < 100) detected = "RED light - Stop";
        else if (avgColor.g > 150 && avgColor.r < 100) detected = "GREEN light - Go";
        else if (avgColor.r > 200 && avgColor.g > 200 && avgColor.b < 100) detected = "YELLOW light - Wait";

        if (detected) {
          statusEl.textContent = detected;
          if (detected !== lastSpoken) {
            speak(detected);
            lastSpoken = detected;
          }
        } else {
          statusEl.textContent = "No clear traffic light detected";
        }
      }, 1000);
    })
    .catch(err => alert("Camera access denied: " + err));
}

// Helper: average RGB
function getAverageColor(data) {
  let r = 0, g = 0, b = 0, count = data.length / 4;
  for (let i = 0; i < data.length; i += 4) {
    r += data[i];
    g += data[i + 1];
    b += data[i + 2];
  }
  return { r: r / count, g: g / count, b: b / count };
}

// Speak text
function speak(text) {
  const msg = new SpeechSynthesisUtterance(text);
  msg.lang = "en-IN";
  window.speechSynthesis.speak(msg);
}

// Contact form logic
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    document.getElementById('thankYouMsg').classList.remove('hidden');
    contactForm.reset();
  });
}
