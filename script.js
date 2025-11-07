// Mobile Navigation Toggle
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');

if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        
        // Animate hamburger icon
        const spans = navToggle.querySelectorAll('span');
        if (navMenu.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });
}

// Close mobile menu when clicking on a link
const navLinks = document.querySelectorAll('.nav__link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const spans = navToggle.querySelectorAll('span');
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    });
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href !== '') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const headerOffset = 70;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// Header scroll effect
let lastScroll = 0;
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        header.style.background = 'rgba(10, 14, 39, 0.98)';
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
    } else {
        header.style.background = 'rgba(10, 14, 39, 0.95)';
        header.style.boxShadow = 'none';
    }
    
    lastScroll = currentScroll;
});

// Form submission handler
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);
        
        // Here you would typically send the data to a server
        // For now, we'll just show a success message
        alert('Obrigado pelo contato! Entraremos em contato em breve.');
        
        // Reset form
        contactForm.reset();
    });
}

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe service cards
const serviceCards = document.querySelectorAll('.service-card');
serviceCards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
    observer.observe(card);
});

// Observe stats
const stats = document.querySelectorAll('.stat');
stats.forEach((stat, index) => {
    stat.style.opacity = '0';
    stat.style.transform = 'translateY(30px)';
    stat.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
    observer.observe(stat);
});

// Animate numbers on scroll
const animateNumber = (element, target) => {
    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + (element.textContent.includes('+') ? '+' : '');
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + (element.textContent.includes('+') ? '+' : '');
        }
    }, 16);
};

const statNumbers = document.querySelectorAll('.stat__number');
const numberObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
            entry.target.classList.add('animated');
            const text = entry.target.textContent;
            const number = parseInt(text.replace(/\D/g, ''));
            if (number) {
                entry.target.textContent = '0' + (text.includes('+') ? '+' : '');
                animateNumber(entry.target, number);
            }
        }
    });
}, { threshold: 0.5 });

statNumbers.forEach(stat => {
    numberObserver.observe(stat);
});

// Add parallax effect to hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero__visual');
    if (hero && scrolled < window.innerHeight) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        hero.style.opacity = 1 - (scrolled / window.innerHeight) * 0.5;
    }
});

// Add hover effect to service cards
serviceCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-8px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// ===== Consultoria Topics Management =====
const topicCheckboxes = document.querySelectorAll('input[name="topics"]');
const selectionSummary = document.getElementById('selection-summary');
const selectedTopicsCount = document.getElementById('selected-topics-count');
const recommendedDuration = document.getElementById('recommended-duration');
const selectedTopicsList = document.getElementById('selected-topics-list');
const topicsInput = document.getElementById('topics-input');
const selectedTopicsForm = document.getElementById('selected-topics-form');
const durationSelect = document.getElementById('duration');
const formSummary = document.getElementById('form-summary');
const summaryDuration = document.getElementById('summary-duration');
const summaryTopics = document.getElementById('summary-topics');
const summaryGuest = document.getElementById('summary-guest');
const pdfInfo = document.getElementById('pdf-info');
const hasGuestCheckbox = document.getElementById('has-guest');
const guestInfo = document.getElementById('guest-info');

// Duration selection elements
const durationOptions = document.querySelectorAll('.duration-option');
const topicsSection = document.getElementById('topics-section');
const consultoriaInfo = document.getElementById('consultoria-info');
let selectedDuration = null;

// Duration selection handler
durationOptions.forEach(option => {
    option.addEventListener('click', () => {
        const duration = option.getAttribute('data-duration');
        
        // Remove previous selection
        durationOptions.forEach(opt => opt.classList.remove('selected'));
        
        // Add selection to clicked option
        option.classList.add('selected');
        selectedDuration = duration;
        
        // Update form duration select
        if (durationSelect) {
            durationSelect.value = duration;
        }
        
        // Show topics section and info
        if (topicsSection) {
            topicsSection.style.display = 'block';
            // Smooth scroll to topics
            setTimeout(() => {
                topicsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 300);
        }
        
        if (consultoriaInfo) {
            consultoriaInfo.style.display = 'grid';
        }
        
        // Update form summary
        updateFormSummary();
    });
});

// Topic labels mapping
const topicLabels = {
    'auto-custodia': 'Auto Custódia',
    'chaves-privadas': 'Como Guardar Chaves Privadas',
    'backup-seguro': 'Backup Seguro de Carteiras',
    'seed-phrase': 'Proteção de Seed Phrase',
    'blue-wallet': 'Como Utilizar Blue Wallet',
    'carteira-hardware': 'Melhor Carteira Hardware',
    'carteira-software': 'Melhor Carteira Software',
    'carteira-triplo': 'Carteira Triplo Software',
    'comparacao-carteiras': 'Comparação de Carteiras',
    'bitcoin-basico': 'Bitcoin para Iniciantes',
    'lightning-network': 'Lightning Network',
    'mining-bitcoin': 'Mineração de Bitcoin',
    'investir-bitcoin': 'Como Investir em Bitcoin',
    'stablecoins': 'O que são Stablecoins',
    'altcoins-investimento': 'Investindo em Altcoins',
    'analise-altcoins': 'Análise de Altcoins',
    'defi-basico': 'DeFi Básico',
    'analise-tecnica': 'Análise Técnica',
    'analise-fundamentalista': 'Análise Fundamentalista',
    'estrategia-investimento': 'Estratégia de Investimento',
    'gerenciamento-risco': 'Gerenciamento de Risco'
};

// Get selected topics
function getSelectedTopics() {
    const selected = [];
    topicCheckboxes.forEach(checkbox => {
        if (checkbox.checked) {
            selected.push({
                value: checkbox.value,
                label: topicLabels[checkbox.value] || checkbox.value
            });
        }
    });
    return selected;
}

// Update selection summary
function updateSelectionSummary() {
    const selected = getSelectedTopics();
    const count = selected.length;
    
    if (count === 0) {
        selectionSummary.style.display = 'none';
        updateFormTopicsDisplay([]);
        return;
    }
    
    selectionSummary.style.display = 'block';
    selectedTopicsCount.textContent = count;
    
    // Determine recommended duration
    let duration = '';
    if (count === 1) {
        duration = '1 hora (1 assunto detalhado)';
    } else if (count <= 2) {
        duration = '30 minutos (até 2 assuntos)';
    } else {
        duration = `${Math.ceil(count / 2)} horas (${count} assuntos)`;
    }
    
    recommendedDuration.textContent = duration;
    
    // Update topics list
    selectedTopicsList.innerHTML = '';
    selected.forEach(topic => {
        const span = document.createElement('span');
        span.textContent = topic.label;
        selectedTopicsList.appendChild(span);
    });
    
    // Update form topics display
    updateFormTopicsDisplay(selected);
    
    // Update hidden input
    topicsInput.value = JSON.stringify(selected.map(t => t.value));
    
    // Validate selection
    validateTopicSelection(selected);
}

// Update form topics display
function updateFormTopicsDisplay(selected) {
    if (selected.length === 0) {
        selectedTopicsForm.innerHTML = '<p class="no-topics-message">Nenhum assunto selecionado. <a href="#consultoria">Selecione os assuntos acima</a></p>';
        topicsInput.removeAttribute('required');
    } else {
        selectedTopicsForm.innerHTML = '';
        selected.forEach(topic => {
            const tag = document.createElement('span');
            tag.className = 'topic-tag';
            tag.textContent = topic.label;
            selectedTopicsForm.appendChild(tag);
        });
        topicsInput.setAttribute('required', 'required');
    }
}

// Validate topic selection based on duration
function validateTopicSelection(selected) {
    const duration = durationSelect.value;
    const count = selected.length;
    
    if (!duration) return;
    
    if (duration === '30min' && count > 2) {
        alert('⚠️ Para consultoria de 30 minutos, você pode selecionar no máximo 2 assuntos.');
        // Uncheck the last selected
        const checked = Array.from(topicCheckboxes).filter(cb => cb.checked);
        if (checked.length > 2) {
            checked[checked.length - 1].checked = false;
            updateSelectionSummary();
        }
    } else if (duration === '1h' && count > 1) {
        alert('⚠️ Para consultoria de 1 hora, você pode selecionar apenas 1 assunto.');
        // Uncheck all but the first
        const checked = Array.from(topicCheckboxes).filter(cb => cb.checked);
        checked.slice(1).forEach(cb => cb.checked = false);
        updateSelectionSummary();
    }
}

// Add event listeners to topic checkboxes
topicCheckboxes.forEach(checkbox => {
    checkbox.addEventListener('change', () => {
        updateSelectionSummary();
        
        // Auto-update duration if needed
        const selected = getSelectedTopics();
        if (selected.length === 1 && !durationSelect.value) {
            durationSelect.value = '1h';
            updateFormSummary();
        } else if (selected.length === 2 && !durationSelect.value) {
            durationSelect.value = '30min';
            updateFormSummary();
        }
    });
});

// Update form summary
function updateFormSummary() {
    const duration = durationSelect.value;
    const selected = getSelectedTopics();
    const hasGuest = hasGuestCheckbox.checked;
    const guestName = document.getElementById('guest-name').value;
    
    if (!duration || selected.length === 0) {
        formSummary.style.display = 'none';
        return;
    }
    
    formSummary.style.display = 'block';
    
    // Duration
    summaryDuration.textContent = duration === '30min' ? '30 minutos' : '1 hora';
    
    // Topics
    summaryTopics.textContent = selected.map(t => t.label).join(', ');
    
    // Guest
    if (hasGuest && guestName) {
        const guestPhone = document.getElementById('guest-phone').value;
        summaryGuest.textContent = `${guestName}${guestPhone ? ' (' + guestPhone + ')' : ''}`;
    } else {
        summaryGuest.textContent = 'Não';
    }
    
    // PDF info (for 2+ hours)
    const totalHours = duration === '1h' ? 1 : 0.5;
    // This would need to track cumulative hours per client
    // For now, we'll show it if duration is 1h (assuming it could be extended)
    pdfInfo.style.display = 'none'; // Will be shown based on actual booking logic
}

// Duration change handler (from form)
if (durationSelect) {
    durationSelect.addEventListener('change', () => {
        const duration = durationSelect.value;
        
        // Update visual selection
        durationOptions.forEach(opt => {
            if (opt.getAttribute('data-duration') === duration) {
                opt.classList.add('selected');
                selectedDuration = duration;
            } else {
                opt.classList.remove('selected');
            }
        });
        
        // Show topics if not visible
        if (duration && topicsSection) {
            topicsSection.style.display = 'block';
        }
        
        if (duration && consultoriaInfo) {
            consultoriaInfo.style.display = 'grid';
        }
        
        updateFormSummary();
        validateTopicSelection(getSelectedTopics());
    });
}

// Guest checkbox handler
if (hasGuestCheckbox) {
    hasGuestCheckbox.addEventListener('change', () => {
        if (hasGuestCheckbox.checked) {
            guestInfo.style.display = 'block';
            document.getElementById('guest-name').setAttribute('required', 'required');
            document.getElementById('guest-phone').setAttribute('required', 'required');
        } else {
            guestInfo.style.display = 'none';
            document.getElementById('guest-name').removeAttribute('required');
            document.getElementById('guest-phone').removeAttribute('required');
        }
        updateFormSummary();
    });
}

// Add availability handler
const addAvailabilityBtn = document.getElementById('add-availability');
const availabilityContainer = document.getElementById('availability-container');

if (addAvailabilityBtn && availabilityContainer) {
    addAvailabilityBtn.addEventListener('click', () => {
        const newItem = document.createElement('div');
        newItem.className = 'availability-item';
        newItem.innerHTML = `
            <div class="form__group" style="display: grid; grid-template-columns: 1fr 1fr auto; gap: 1rem; align-items: end;">
                <div>
                    <label class="form__label">Data Disponível</label>
                    <input type="date" class="form__input availability-date" name="availability-date[]">
                </div>
                <div>
                    <label class="form__label">Horário Disponível</label>
                    <input type="time" class="form__input availability-time" name="availability-time[]">
                </div>
                <div>
                    <button type="button" class="btn btn--secondary remove-availability" style="padding: 14px 20px;">Remover</button>
                </div>
            </div>
        `;
        availabilityContainer.appendChild(newItem);
        
        // Add remove functionality
        const removeBtn = newItem.querySelector('.remove-availability');
        removeBtn.addEventListener('click', () => {
            newItem.remove();
        });
    });
}

// Guest name change handler
const guestNameInput = document.getElementById('guest-name');
if (guestNameInput) {
    guestNameInput.addEventListener('input', updateFormSummary);
}

// Update form summary on any form change
const formInputs = document.querySelectorAll('#contact-form input, #contact-form select, #contact-form textarea');
formInputs.forEach(input => {
    input.addEventListener('change', updateFormSummary);
    input.addEventListener('input', updateFormSummary);
});

// Form submission handler
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const selected = getSelectedTopics();
        const duration = durationSelect.value;
        const hasGuest = hasGuestCheckbox.checked;
        
        // Validate topics selection
        if (selected.length === 0) {
            alert('⚠️ Por favor, selecione pelo menos um assunto de consultoria.');
            window.location.href = '#consultoria';
            return;
        }
        
        // Validate duration vs topics
        if (duration === '30min' && selected.length > 2) {
            alert('⚠️ Para consultoria de 30 minutos, você pode selecionar no máximo 2 assuntos.');
            return;
        }
        
        if (duration === '1h' && selected.length > 1) {
            alert('⚠️ Para consultoria de 1 hora, você pode selecionar apenas 1 assunto.');
            return;
        }
        
        // Validate guest info if checked
        if (hasGuest) {
            const guestName = document.getElementById('guest-name').value.trim();
            const guestPhone = document.getElementById('guest-phone').value.trim();
            
            if (!guestName) {
                alert('⚠️ Por favor, informe o nome do convidado.');
                return;
            }
            
            if (!guestPhone) {
                alert('⚠️ Por favor, informe o telefone do convidado.');
                return;
            }
        }
        
        // Get availability data
        const availabilityDates = Array.from(document.querySelectorAll('.availability-date')).map(input => input.value).filter(v => v);
        const availabilityTimes = Array.from(document.querySelectorAll('.availability-time')).map(input => input.value).filter(v => v);
        const availability = [];
        
        for (let i = 0; i < Math.max(availabilityDates.length, availabilityTimes.length); i++) {
            if (availabilityDates[i] || availabilityTimes[i]) {
                availability.push({
                    date: availabilityDates[i] || 'Não informado',
                    time: availabilityTimes[i] || 'Não informado'
                });
            }
        }
        
        // Get form data
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);
        data.topics = JSON.parse(data.topics || '[]');
        data.availability = availability;
        
        // Create email message
        const emailSubject = 'Nova Solicitação de Agendamento - Bitcólatras Anônimos';
        const emailBody = createEmailMessage(data);
        
        // Open email client
        const emailTo = 'bitcolatrasanonimos@gmail.com';
        const emailUrl = `mailto:${emailTo}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
        window.location.href = emailUrl;
        
        // Show success message
        setTimeout(() => {
            alert('✅ Formulário enviado! Se seu cliente de email não abriu automaticamente, envie um email para bitcolatrasanonimos@gmail.com com as informações do formulário.\n\nEntraremos em contato em breve via WhatsApp!');
        }, 500);
    });
}

// Create email message
function createEmailMessage(data) {
    const topics = data.topics.map(t => topicLabels[t] || t).join(', ');
    const duration = data.duration === '30min' ? '30 minutos' : '1 hora';
    
    let guestInfo = '';
    if (data['has-guest']) {
        guestInfo = `\n\n👥 CONVIDADO:\nNome: ${data['guest-name'] || 'Não informado'}\nTelefone/WhatsApp: ${data['guest-phone'] || 'Não informado'}`;
    }
    
    let availabilityInfo = '';
    if (data.availability && data.availability.length > 0) {
        availabilityInfo = '\n\n📅 DISPONIBILIDADE PARA AGENDAMENTO:';
        data.availability.forEach((avail, index) => {
            availabilityInfo += `\n${index + 1}. Data: ${avail.date} | Horário: ${avail.time}`;
        });
    } else {
        availabilityInfo = '\n\n📅 DISPONIBILIDADE: Não informada';
    }
    
    const additional = data['additional-info'] ? `\n\n📝 INFORMAÇÕES ADICIONAIS:\n${data['additional-info']}` : '';
    
    return `NOVA SOLICITAÇÃO DE AGENDAMENTO - BITCÓLATRAS ANÔNIMOS

═══════════════════════════════════════════════════════

👤 DADOS DO CLIENTE:
Nome: ${data.name}
Telefone/WhatsApp: ${data.whatsapp}
Email: ${data.email}

═══════════════════════════════════════════════════════

📚 DETALHES DA CONSULTORIA:
Assuntos selecionados: ${topics}
Duração: ${duration}${guestInfo}${availabilityInfo}${additional}

═══════════════════════════════════════════════════════

📋 PRÓXIMOS PASSOS:
1. Entrar em contato com o cliente via WhatsApp em minutos
2. Enviar instruções de pagamento
3. Após receber comprovante, agendar melhor dia disponível
4. ⚠️ LEMBRAR: Após 3 tentativas de contato fracassadas, cancelar consultoria (sem restituição)

═══════════════════════════════════════════════════════

Data/Hora da solicitação: ${new Date().toLocaleString('pt-BR')}`;
}

// Format date
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR');
}

// Initialize
updateSelectionSummary();
updateFormSummary();

console.log('🚀 Bitcólatras Anônimos - Site carregado com sucesso!');

