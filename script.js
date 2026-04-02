document.addEventListener("DOMContentLoaded", function () {

  /* ================= FILTER BUTTON ================= */
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', function () {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      this.classList.add('active');
    });
  });


  /* ================= SMOOTH SCROLL ================= */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', function (e) {

      const href = this.getAttribute('href');

      if (href === "#") return;

      const target = document.querySelector(href);

      if (target) {
        e.preventDefault();

        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }

    });
  });


  /* ================= NAV ACTIVE ON SCROLL ================= */
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {

    let current = "";

    sections.forEach(section => {

      const sectionTop = section.offsetTop - 100;

      if (window.scrollY >= sectionTop) {
        current = section.getAttribute('id');
      }

    });

    document.querySelectorAll('.nav-links a').forEach(link => {

      link.classList.remove('active');

      if (link.getAttribute('href') === "#" + current) {
        link.classList.add('active');
      }

    });

  });


  /* ================= QUOTES ================= */

  const quotes = {

    English: [
      "Quality is not an act, it is a habit in construction.",
      "Good buildings come from good people, and all problems are solved by good planning.",
      "Safety first, because nothing is more important than human life on a construction site.",
      "Strong foundations make strong structures.",
      "Innovation and precision are the pillars of every great project.",
      "Timely delivery reflects discipline and professionalism in construction.",
      "A building is only as good as the teamwork behind it.",
      "Sustainable construction is the future of modern architecture.",
      "Planning, patience, and persistence build better projects.",
      "Every project starts with a vision and ends with excellence."
    ],

    Hindi: [
      "निर्माण में गुणवत्ता केवल एक क्रिया नहीं, बल्कि एक आदत है।",
      "अच्छी इमारतें अच्छे लोगों से बनती हैं।",
      "सुरक्षा पहले, क्योंकि मानव जीवन सबसे महत्वपूर्ण है।",
      "मजबूत नींव मजबूत संरचना बनाती है।"
    ],

    Marathi: [
      "निर्माणात गुणवत्ता ही सवय आहे.",
      "मजबूत पाया मजबूत संरचना तयार करतो.",
      "सुरक्षा सर्वप्रथम आहे.",
      "योजना आणि संयम उत्तम प्रकल्प तयार करतात."
    ]
  };

  const quoteBtn = document.getElementById("getQuoteBtn");

  if (quoteBtn) {

    quoteBtn.addEventListener("click", function () {

      const languages = Object.keys(quotes);
      const randomLang = languages[Math.floor(Math.random() * languages.length)];

      const langQuotes = quotes[randomLang];
      const randomQuote = langQuotes[Math.floor(Math.random() * langQuotes.length)];

      document.getElementById("quoteDisplay").innerText = randomQuote;

    });

  }

});
/*  mail sender */

function sendEnquiryMail() {

  const form = document.querySelector(".contact-form");

  const fullName = form.fullName.value;
  const phone = form.phone.value;
  const email = form.email.value;
  const interestedIn = form.interestedIn.value;
  const message = form.message.value;

  const data = {
    fullName: fullName,
    phone: phone,
    email: email,
    interestedIn: interestedIn,
    message: message
  };
/* https://anthil-backend.onrender.com/api/enquiry/send  */
fetch("https://anthil-backend.onrender.com/api/enquiry/send", {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: JSON.stringify(data)
})
.then(response => {

  if (!response.ok) {
    throw new Error("Server error: " + response.status);
  }

  return response.text();   // 👈 use text instead of json

})
.then(result => {

  alert(result);   // shows "Enquiry sent successfully!"
  form.reset();

})
.catch(error => {

  alert("Error sending enquiry ❌");
  console.error(error);

});

}

/* ================= WHATSAPP FUNCTION ================= */

function sendToWhatsApp() {

  let name = document.querySelector('input[name="fullName"]').value;
  let phone = document.querySelector('input[name="phone"]').value;
  let email = document.querySelector('input[name="email"]').value;
  let interest = document.querySelector('select[name="interestedIn"]').value;
  let message = document.querySelector('textarea[name="message"]').value;

  let text =
    `Hello, I have an enquiry:%0A
Name: ${name}%0A
Phone: ${phone}%0A
Email: ${email}%0A
Interested In: ${interest}%0A
Message: ${message}`;

  let whatsappURL = `https://wa.me/919665755702?text=${text}`;

  window.open(whatsappURL, "_blank");
}