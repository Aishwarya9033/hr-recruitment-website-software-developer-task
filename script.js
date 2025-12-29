// Shared JavaScript for all pages

// Mobile Navigation Toggle
const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.getElementById('nav-links');

if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
    
    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });
}

// Apply Now button functionality
document.querySelectorAll('.apply-btn').forEach(button => {
    button.addEventListener('click', function() {
        const jobTitle = this.parentElement.querySelector('h3').textContent;
        alert(`Thank you for your interest in the "${jobTitle}" position! Our HR team will contact you shortly to discuss your application.`);
    });
});

// Contact form submission
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        alert('Thank you for your message! We will get back to you within 24 hours.');
        this.reset();
    });
}

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (header) {
        if (window.scrollY > 100) {
            header.style.padding = '0';
            header.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.padding = '';
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        }
    }
    
    // Update active nav link based on current page
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        const linkPage = link.getAttribute('href');
        if (currentPage === linkPage || (currentPage === '' && linkPage === 'index.html')) {
            link.classList.add('active');
        }
    });
    
    // Back to top button visibility
    const backToTop = document.getElementById('backToTop');
    if (backToTop) {
        if (window.scrollY > 300) {
            backToTop.style.display = 'flex';
        } else {
            backToTop.style.display = 'none';
        }
    }
});

// Back to top functionality
const backToTop = document.getElementById('backToTop');
if (backToTop) {
    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Job filtering functionality (for jobs.html)
const filterButton = document.getElementById('filterButton');
const resetButton = document.getElementById('resetButton');
const locationFilter = document.getElementById('locationFilter');
const jobTypeFilter = document.getElementById('jobTypeFilter');
const experienceFilter = document.getElementById('experienceFilter');
const jobsContainer = document.getElementById('jobsContainer');

if (filterButton && resetButton && jobsContainer) {
    filterButton.addEventListener('click', filterJobs);
    resetButton.addEventListener('click', resetFilters);
    
    function filterJobs() {
        const locationValue = locationFilter.value;
        const jobTypeValue = jobTypeFilter.value;
        const experienceValue = experienceFilter.value;
        
        const jobCards = jobsContainer.querySelectorAll('.job-card');
        let visibleCount = 0;
        
        jobCards.forEach(card => {
            const location = card.dataset.location;
            const type = card.dataset.type;
            const experience = card.dataset.experience;
            
            const locationMatch = !locationValue || location.includes(locationValue);
            const typeMatch = !jobTypeValue || type === jobTypeValue;
            const experienceMatch = !experienceValue || experience === experienceValue;
            
            if (locationMatch && typeMatch && experienceMatch) {
                card.style.display = 'block';
                visibleCount++;
            } else {
                card.style.display = 'none';
            }
        });
        
        // Show message if no jobs match the filters
        const noJobsMessage = document.getElementById('noJobsMessage');
        if (visibleCount === 0) {
            if (!noJobsMessage) {
                const message = document.createElement('div');
                message.id = 'noJobsMessage';
                message.style.textAlign = 'center';
                message.style.padding = '3rem';
                message.style.gridColumn = '1 / -1';
                message.innerHTML = `
                    <h3>No jobs match your filters</h3>
                    <p>Try adjusting your filter criteria or <button class="btn" id="resetFiltersInline" style="margin-top: 1rem;">Reset All Filters</button></p>
                `;
                jobsContainer.appendChild(message);
                
                document.getElementById('resetFiltersInline').addEventListener('click', resetFilters);
            }
        } else if (noJobsMessage) {
            noJobsMessage.remove();
        }
    }
    
    function resetFilters() {
        if (locationFilter) locationFilter.value = '';
        if (jobTypeFilter) jobTypeFilter.value = '';
        if (experienceFilter) experienceFilter.value = '';
        
        const jobCards = jobsContainer.querySelectorAll('.job-card');
        jobCards.forEach(card => {
            card.style.display = 'block';
        });
        
        const noJobsMessage = document.getElementById('noJobsMessage');
        if (noJobsMessage) {
            noJobsMessage.remove();
        }
    }
}

// FAQ toggle functionality (for contact.html)
const faqQuestions = document.querySelectorAll('.faq-question');
faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
        const answer = question.nextElementSibling;
        const icon = question.querySelector('i');
        
        // Close all other answers
        document.querySelectorAll('.faq-answer').forEach(otherAnswer => {
            if (otherAnswer !== answer && otherAnswer.classList.contains('active')) {
                otherAnswer.classList.remove('active');
                otherAnswer.previousElementSibling.querySelector('i').classList.remove('fa-chevron-up');
                otherAnswer.previousElementSibling.querySelector('i').classList.add('fa-chevron-down');
            }
        });
        
        // Toggle current answer
        answer.classList.toggle('active');
        if (answer.classList.contains('active')) {
            icon.classList.remove('fa-chevron-down');
            icon.classList.add('fa-chevron-up');
        } else {
            icon.classList.remove('fa-chevron-up');
            icon.classList.add('fa-chevron-down');
        }
    });
});

// Chatbot JavaScript
const chatbotToggle = document.getElementById('chatbotToggle');
const chatbotWindow = document.getElementById('chatbotWindow');
const chatbotClose = document.getElementById('chatbotClose');
const chatbotMessages = document.getElementById('chatbotMessages');
const chatbotInput = document.getElementById('chatbotInput');
const chatbotSend = document.getElementById('chatbotSend');

// Predefined responses for chatbot options
const chatbotResponses = {
    'search jobs': {
        title: 'Current IT Job Openings',
        content: `Here are some of our current IT job opportunities:\n\n• <strong>Java Developer</strong> - San Francisco, CA - 3-5 years experience\n• <strong>Frontend Developer (React)</strong> - Remote/NYC - 2-4 years experience\n• <strong>DevOps Engineer</strong> - Austin, TX - 4-6 years experience\n• <strong>Data Scientist</strong> - Boston, MA - 3-5 years experience\n• <strong>Cybersecurity Analyst</strong> - Washington, DC - 2-4 years experience\n\nVisit our <a href="jobs.html" style="color: #2c5aa0; text-decoration: underline;">Jobs Section</a> for more details and to apply!`
    },
    'upload resume': {
        title: 'Upload Your Resume',
        content: `To submit your resume for our talent pool:\n\n1. Email your resume to: <strong>careers@talentbridgehr.com</strong>\n2. Use the subject line: "Resume Submission - [Your Name]"\n3. Include your contact information and preferred job roles\n4. Our recruiters will review and contact you if there's a match\n\nYou can also apply directly to specific jobs on our website for faster processing.`
    },
    'contact recruiter': {
        title: 'Contact Our Recruiters',
        content: `Our recruitment team is here to help you:\n\n<strong>Phone:</strong> +1 (555) 123-4567\n<strong>Email:</strong> recruiters@talentbridgehr.com\n<strong>Hours:</strong> Mon-Fri, 9AM-6PM PST\n\nFor general inquiries, email: info@talentbridgehr.com\n\nWe typically respond within 24 hours during business days.`
    },
    'hiring process': {
        title: 'Our Hiring Process',
        content: `Our 5-step hiring process ensures the best match:\n\n1. <strong>Initial Screening</strong> - Resume review and phone screening\n2. <strong>Skills Assessment</strong> - Technical tests or assignments\n3. <strong>Interview Rounds</strong> - 1-2 interviews with hiring team\n4. <strong>Reference Check</strong> - Verification of past experience\n5. <strong>Offer & Onboarding</strong> - Job offer and joining process\n\nThe entire process typically takes 2-3 weeks from application to offer.`
    },
    'office location': {
        title: 'Our Office Locations',
        content: `We have offices in major tech hubs:\n\n<strong>San Francisco HQ</strong>\n123 Tech Boulevard, Suite 500\nSan Francisco, CA 94107\n\n<strong>New York Office</strong>\n456 Innovation Avenue, 10th Floor\nNew York, NY 10001\n\n<strong>Austin Office</strong>\n789 Tech Street, Suite 300\nAustin, TX 73301\n\nAll offices are open Monday-Friday, 9AM-6PM local time.`
    }
};

// Initial options for the chatbot
const initialOptions = [
    { text: 'Search Jobs', key: 'search jobs' },
    { text: 'Upload Resume', key: 'upload resume' },
    { text: 'Contact Recruiter', key: 'contact recruiter' },
    { text: 'Hiring Process', key: 'hiring process' },
    { text: 'Office Location', key: 'office location' }
];

// Initialize chatbot with welcome message
function initChatbot() {
    // Clear any existing messages
    chatbotMessages.innerHTML = '';
    
    // Add welcome message
    addBotMessage("Hi 👋 I'm <strong>RecruitBot</strong>, your HR assistant from TalentBridge. How can I help you today?");
    
    // Show initial options after a short delay
    setTimeout(() => {
        showOptions();
    }, 800);
}

// Add a bot message to the chat
function addBotMessage(text) {
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message bot-message';
    messageDiv.innerHTML = text;
    chatbotMessages.appendChild(messageDiv);
    scrollToBottom();
}

// Add a user message to the chat
function addUserMessage(text) {
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message user-message';
    messageDiv.textContent = text;
    chatbotMessages.appendChild(messageDiv);
    scrollToBottom();
}

// Show typing indicator
function showTypingIndicator() {
    const typingDiv = document.createElement('div');
    typingDiv.className = 'typing-indicator';
    typingDiv.id = 'typingIndicator';
    typingDiv.innerHTML = `
        <div class="typing-dot"></div>
        <div class="typing-dot"></div>
        <div class="typing-dot"></div>
    `;
    chatbotMessages.appendChild(typingDiv);
    scrollToBottom();
}

// Remove typing indicator
function removeTypingIndicator() {
    const typingIndicator = document.getElementById('typingIndicator');
    if (typingIndicator) {
        typingIndicator.remove();
    }
}

// Show option buttons
function showOptions() {
    const optionsContainer = document.createElement('div');
    optionsContainer.className = 'options-container';
    
    initialOptions.forEach(option => {
        const button = document.createElement('button');
        button.className = 'option-button';
        button.textContent = option.text;
        button.dataset.key = option.key;
        
        button.addEventListener('click', () => {
            handleOptionClick(option.key, option.text);
        });
        
        optionsContainer.appendChild(button);
    });
    
    chatbotMessages.appendChild(optionsContainer);
    scrollToBottom();
}

// Handle option button click
function handleOptionClick(key, text) {
    // Add user message
    addUserMessage(text);
    
    // Remove any existing options
    const optionsContainer = document.querySelector('.options-container');
    if (optionsContainer) {
        optionsContainer.remove();
    }
    
    // Show typing indicator
    showTypingIndicator();
    
    // Show response after a delay (simulating typing)
    setTimeout(() => {
        removeTypingIndicator();
        
        if (chatbotResponses[key]) {
            const response = chatbotResponses[key];
            addBotMessage(`<strong>${response.title}</strong><br><br>${response.content}`);
        } else {
            addBotMessage("I'm not sure how to help with that. Please select one of the options below.");
        }
        
        // Show options again after response
        setTimeout(() => {
            showOptions();
        }, 1000);
    }, 1500);
}

// Handle text input
function handleUserInput() {
    const userText = chatbotInput.value.trim();
    
    if (userText === '') return;
    
    // Add user message
    addUserMessage(userText);
    
    // Clear input
    chatbotInput.value = '';
    
    // Check if input matches any of our options
    const userInputLower = userText.toLowerCase();
    let matchedKey = null;
    
    for (const key in chatbotResponses) {
        if (userInputLower.includes(key)) {
            matchedKey = key;
            break;
        }
    }
    
    // Show typing indicator
    showTypingIndicator();
    
    // Show response after a delay
    setTimeout(() => {
        removeTypingIndicator();
        
        if (matchedKey) {
            const response = chatbotResponses[matchedKey];
            addBotMessage(`<strong>${response.title}</strong><br><br>${response.content}`);
        } else {
            addBotMessage("I'm designed to help with specific HR topics. Please select one of the options below or try rephrasing your question.");
        }
        
        // Show options again
        setTimeout(() => {
            showOptions();
        }, 1000);
    }, 1500);
}

// Scroll to bottom of chat
function scrollToBottom() {
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
}

// Toggle chatbot window
if (chatbotToggle && chatbotWindow) {
    chatbotToggle.addEventListener('click', () => {
        chatbotWindow.classList.toggle('active');
        if (chatbotWindow.classList.contains('active')) {
            initChatbot();
            // Focus on input field when chatbot opens
            setTimeout(() => {
                chatbotInput.focus();
            }, 300);
        }
    });

    // Close chatbot window
    chatbotClose.addEventListener('click', () => {
        chatbotWindow.classList.remove('active');
    });

    // Send message on button click
    chatbotSend.addEventListener('click', handleUserInput);

    // Send message on Enter key
    chatbotInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleUserInput();
        }
    });
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
    // Set active nav link based on current page
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        const linkPage = link.getAttribute('href');
        if (currentPage === linkPage || (currentPage === '' && linkPage === 'index.html')) {
            link.classList.add('active');
        }
    });
});