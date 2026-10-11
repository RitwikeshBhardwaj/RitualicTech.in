document.addEventListener('DOMContentLoaded', function() {
    const enquireBtns = document.querySelectorAll('#enquireBtn, #enquireBottom');
    const formOverlay = document.getElementById('formOverlay');
    const closeFormBtn = document.getElementById('closeForm');
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');

    // Open form
    enquireBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Button clicked:', btn.id);
            formOverlay.classList.add('active');
        });
    });

    // Close form
    closeFormBtn.addEventListener('click', function() {
        formOverlay.classList.remove('active');
        formMessage.style.display = 'none';
    });

    // Form submission (simulated)
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();

        const formData = new FormData(this);
        const data = Object.fromEntries(formData);

        // Show loading state
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Submitting...';
        submitBtn.disabled = true;

        try {
            // Simulate network delay
            await new Promise(resolve => setTimeout(resolve, 1000));

            // In a real implementation, this would POST to a backend endpoint
            // that writes to Google Sheets or Airtable.
            // For now, we just show success message.

            formMessage.textContent = 'Enquiry submitted successfully. We will contact you soon.';
            formMessage.className = 'form-message success';
            formMessage.style.display = 'block';

            // Log to console for debugging
            console.log('Enquiry submitted:', data);

        } catch (error) {
            formMessage.textContent = 'There was an error submitting your enquiry. Please try again.';
            formMessage.className = 'form-message error';
            formMessage.style.display = 'block';
            console.error('Submission error:', error);
        } finally {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }
    });

    // Close form when clicking outside
    formOverlay.addEventListener('click', function(e) {
        if (e.target === formOverlay) {
            formOverlay.classList.remove('active');
            formMessage.style.display = 'none';
        }
    });
});
