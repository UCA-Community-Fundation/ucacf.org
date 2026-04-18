document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Retrieve form values
            const fullName = document.getElementById('fullName').value;
            const email = document.getElementById('email').value;
            const hearAbout = document.getElementById('hearAbout').value;
            const experience = document.getElementById('experience').value;
            const interests = document.getElementById('interests').value;

            // Construct the email subject and body for the mailto action
            const subject = encodeURIComponent(`New Partnership Inquiry from ${fullName}`);
            const body = encodeURIComponent(
                `Name: ${fullName}\n` +
                `Email: ${email}\n` +
                `Heard About Us Via: ${hearAbout}\n\n` +
                `Background & Experience:\n${experience}\n\n` +
                `Program Interests & Inquiries:\n${interests}`
            );

            // Trigger the user's default email client
            const mailtoLink = `mailto:outreach@ucacf.org?subject=${subject}&body=${body}`;
            window.location.href = mailtoLink;
        });
    }
});