/**
 * CozPiraa Clinic — Appointment Form Handler
 * assets/js/appointment.js
 *
 * Uses EmailJS to send appointment details to clinic email.
 * 
 * SETUP INSTRUCTIONS:
 * 1. Go to https://www.emailjs.com and create a free account.
 * 2. Add a new Email Service (Gmail recommended).
 * 3. Create an Email Template with the variables listed below.
 * 4. Replace the placeholders below with your actual keys.
 *
 * EmailJS Template variables to use:
 *   {{patientName}}, {{patientAge}}, {{patientGender}},
 *   {{patientPhone}}, {{patientEmail}}, {{patientAddress}},
 *   {{appointmentDate}}, {{appointmentTime}}, {{department}},
 *   {{visitType}}, {{referralSource}}, {{chiefComplaint}},
 *   {{symptomDuration}}, {{severityLevel}}, {{currentMedications}},
 *   {{allergies}}, {{medicalHistory}}, {{isPregnant}},
 *   {{isDiabetic}}, {{hasHypertension}}, {{prevVisit}},
 *   {{additionalNotes}}, {{submittedAt}}
 */

'use strict';

/* =====================================================
   CONFIGURATION — Replace with your actual EmailJS keys
===================================================== */
const EMAILJS_SERVICE_ID  = 'YOUR_SERVICE_ID';   // e.g. 'service_abc123'
const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID';  // e.g. 'template_xyz789'
// Public key is initialized in appointment.html <script>


/* =====================================================
   APPOINTMENT FORM HANDLER
===================================================== */
(function initAppointmentForm() {
  const form        = document.getElementById('appointmentForm');
  const submitBtn   = document.getElementById('apptSubmitBtn');
  const submitText  = document.getElementById('submitBtnText');
  const spinner     = document.getElementById('btnSpinner');
  const successBox  = document.getElementById('apptSuccess');
  if (!form) return;

  /* --- Set minimum date to today --- */
  const dateInput = document.getElementById('appointmentDate');
  if (dateInput) {
    const today = new Date();
    const yyyy  = today.getFullYear();
    const mm    = String(today.getMonth() + 1).padStart(2, '0');
    const dd    = String(today.getDate()).padStart(2, '0');
    dateInput.min = `${yyyy}-${mm}-${dd}`;
    // Also block Sundays
    dateInput.addEventListener('change', () => {
      const d = new Date(dateInput.value);
      if (d.getDay() === 0) { // Sunday
        dateInput.value = '';
        showFieldError('appointmentDateErr', 'We are closed on Sundays. Please choose Monday–Saturday.');
      } else {
        clearFieldError('appointmentDateErr');
      }
    });
  }

  /* --- Department card selection styling --- */
  const deptRadios = document.querySelectorAll('input[name="department"]');
  deptRadios.forEach(radio => {
    radio.addEventListener('change', () => {
      document.querySelectorAll('.dept-card').forEach(card => card.classList.remove('selected'));
      if (radio.checked) radio.closest('.dept-card').classList.add('selected');
      clearFieldError('departmentErr');
    });
  });

  /* --- Form Submission --- */
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Validate
    if (!validateForm()) return;

    // Show loading state
    setLoading(true);

    // Gather all form data
    const formData = gatherFormData();

    try {
      // Check if EmailJS is properly configured
      if (EMAILJS_SERVICE_ID === 'YOUR_SERVICE_ID' || EMAILJS_TEMPLATE_ID === 'YOUR_TEMPLATE_ID') {
        // Demo mode — show success without actually sending
        console.log('EmailJS not configured. Form data:', formData);
        await fakeSend(); // Simulate network delay for demo
        showSuccess();
        return;
      }

      // Send via EmailJS
      const response = await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, formData);

      if (response.status === 200) {
        showSuccess();
      } else {
        throw new Error('EmailJS returned status: ' + response.status);
      }
    } catch (error) {
      console.error('Appointment submission error:', error);
      setLoading(false);
      showFormError('Something went wrong. Please call us directly at +91 98765 43210 or try again.');
    }
  });

  /* --- Helpers --- */

  function gatherFormData() {
    const getValue  = id => (document.getElementById(id)?.value || '').trim();
    const getChecked = id => document.getElementById(id)?.checked ? 'Yes' : 'No';
    const getRadio  = name => document.querySelector(`input[name="${name}"]:checked`)?.value || 'Not specified';

    return {
      patientName:         getValue('patientName'),
      patientAge:          getValue('patientAge'),
      patientGender:       getValue('patientGender'),
      patientPhone:        getValue('patientPhone'),
      patientEmail:        getValue('patientEmail'),
      patientAddress:      getValue('patientAddress') || 'Not provided',
      appointmentDate:     formatDate(getValue('appointmentDate')),
      appointmentTime:     getValue('appointmentTime'),
      department:          getRadio('department'),
      visitType:           getValue('visitType'),
      referralSource:      getValue('referralSource') || 'Not specified',
      chiefComplaint:      getValue('chiefComplaint'),
      symptomDuration:     getValue('symptomDuration') || 'Not specified',
      severityLevel:       getValue('severityLevel') || 'Not specified',
      currentMedications:  getValue('currentMedications') || 'None',
      allergies:           getValue('allergies') || 'None',
      medicalHistory:      getValue('medicalHistory') || 'None provided',
      isPregnant:          getChecked('isPregnant'),
      isDiabetic:          getChecked('isDiabetic'),
      hasHypertension:     getChecked('hasHypertension'),
      prevVisit:           getChecked('prevVisit'),
      additionalNotes:     getValue('additionalNotes') || 'None',
      submittedAt:         new Date().toLocaleString('en-IN', {
        dateStyle: 'full',
        timeStyle: 'short',
        timeZone: 'Asia/Kolkata',
      }),
    };
  }

  function formatDate(dateStr) {
    if (!dateStr) return 'Not specified';
    const d = new Date(dateStr);
    return d.toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  }

  function validateForm() {
    let isValid = true;

    // Name
    const name = document.getElementById('patientName')?.value.trim();
    if (!name || name.length < 2) {
      showFieldError('patientNameErr', 'Please enter your full name (at least 2 characters).');
      isValid = false;
    } else clearFieldError('patientNameErr');

    // Age
    const age = parseInt(document.getElementById('patientAge')?.value);
    if (!age || age < 1 || age > 120) {
      showFieldError('patientAgeErr', 'Please enter a valid age (1–120).');
      isValid = false;
    } else clearFieldError('patientAgeErr');

    // Gender
    const gender = document.getElementById('patientGender')?.value;
    if (!gender) {
      showFieldError('patientGenderErr', 'Please select your gender.');
      isValid = false;
    } else clearFieldError('patientGenderErr');

    // Phone
    const phone = document.getElementById('patientPhone')?.value.trim().replace(/\s/g, '');
    const phoneReg = /^(\+91)?[6-9]\d{9}$/;
    if (!phone || !phoneReg.test(phone)) {
      showFieldError('patientPhoneErr', 'Please enter a valid Indian mobile number.');
      isValid = false;
    } else clearFieldError('patientPhoneErr');

    // Email
    const email = document.getElementById('patientEmail')?.value.trim();
    const emailReg = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailReg.test(email)) {
      showFieldError('patientEmailErr', 'Please enter a valid email address.');
      isValid = false;
    } else clearFieldError('patientEmailErr');

    // Date
    const date = document.getElementById('appointmentDate')?.value;
    if (!date) {
      showFieldError('appointmentDateErr', 'Please select your preferred appointment date.');
      isValid = false;
    } else {
      const d = new Date(date);
      if (d.getDay() === 0) {
        showFieldError('appointmentDateErr', 'We are closed on Sundays. Please choose Monday–Saturday.');
        isValid = false;
      } else clearFieldError('appointmentDateErr');
    }

    // Time
    const time = document.getElementById('appointmentTime')?.value;
    if (!time) {
      showFieldError('appointmentTimeErr', 'Please select a preferred time slot.');
      isValid = false;
    } else clearFieldError('appointmentTimeErr');

    // Department
    const dept = document.querySelector('input[name="department"]:checked');
    if (!dept) {
      showFieldError('departmentErr', 'Please select a department / speciality.');
      isValid = false;
    } else clearFieldError('departmentErr');

    // Visit type
    const visitType = document.getElementById('visitType')?.value;
    if (!visitType) {
      showFieldError('visitTypeErr', 'Please select your visit type.');
      isValid = false;
    } else clearFieldError('visitTypeErr');

    // Chief complaint
    const complaint = document.getElementById('chiefComplaint')?.value.trim();
    if (!complaint || complaint.length < 10) {
      showFieldError('chiefComplaintErr', 'Please describe your main concern (at least 10 characters).');
      isValid = false;
    } else clearFieldError('chiefComplaintErr');

    // Terms
    const terms = document.getElementById('agreeTerms')?.checked;
    if (!terms) {
      showFieldError('agreeTermsErr', 'Please agree to the terms to proceed.');
      isValid = false;
    } else clearFieldError('agreeTermsErr');

    // Scroll to first error
    if (!isValid) {
      const firstError = form.querySelector('.field-error:not(:empty)');
      if (firstError) {
        firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }

    return isValid;
  }

  function showFieldError(id, msg) {
    const el = document.getElementById(id);
    if (!el) return;
    el.textContent = msg;
    el.classList.add('visible');
    // Add error class to parent input/select
    el.previousElementSibling?.classList.add('error');
    el.closest('.form-group')?.classList.add('has-error');
  }

  function clearFieldError(id) {
    const el = document.getElementById(id);
    if (!el) return;
    el.textContent = '';
    el.classList.remove('visible');
    el.closest('.form-group')?.classList.remove('has-error');
  }

  function setLoading(state) {
    submitBtn.disabled = state;
    submitText.textContent = state ? 'Sending Request…' : 'Submit Appointment Request';
    if (spinner) spinner.hidden = !state;
  }

  function showSuccess() {
    setLoading(false);
    form.hidden = true;
    successBox.hidden = false;
    successBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  function showFormError(msg) {
    let errDiv = document.getElementById('formSubmitError');
    if (!errDiv) {
      errDiv = document.createElement('div');
      errDiv.id = 'formSubmitError';
      errDiv.className = 'form-submit-error';
      submitBtn.insertAdjacentElement('beforebegin', errDiv);
    }
    errDiv.innerHTML = `<i class="fa-solid fa-circle-exclamation"></i> ${msg}`;
    errDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  // Fake send for demo (when EmailJS not configured)
  function fakeSend() {
    return new Promise(resolve => setTimeout(resolve, 1500));
  }
})();


/* =====================================================
   REAL-TIME FIELD VALIDATION FEEDBACK
===================================================== */
(function initRealTimeValidation() {
  const fields = [
    { id: 'patientName',    errId: 'patientNameErr',    test: v => v.trim().length >= 2, msg: 'Name must be at least 2 characters.' },
    { id: 'patientPhone',   errId: 'patientPhoneErr',   test: v => /^(\+91)?[6-9]\d{9}$/.test(v.trim().replace(/\s/g,'')), msg: 'Enter a valid Indian mobile number.' },
    { id: 'patientEmail',   errId: 'patientEmailErr',   test: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()), msg: 'Enter a valid email address.' },
    { id: 'chiefComplaint', errId: 'chiefComplaintErr', test: v => v.trim().length >= 10, msg: 'Describe your concern (at least 10 characters).' },
  ];

  fields.forEach(({ id, errId, test, msg }) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.addEventListener('blur', () => {
      if (el.value && !test(el.value)) {
        const errEl = document.getElementById(errId);
        if (errEl) { errEl.textContent = msg; errEl.classList.add('visible'); }
        el.closest('.form-group')?.classList.add('has-error');
      } else {
        const errEl = document.getElementById(errId);
        if (errEl) { errEl.textContent = ''; errEl.classList.remove('visible'); }
        el.closest('.form-group')?.classList.remove('has-error');
      }
    });
    el.addEventListener('input', () => {
      if (el.closest('.form-group')?.classList.contains('has-error') && test(el.value)) {
        const errEl = document.getElementById(errId);
        if (errEl) { errEl.textContent = ''; errEl.classList.remove('visible'); }
        el.closest('.form-group')?.classList.remove('has-error');
      }
    });
  });
})();
