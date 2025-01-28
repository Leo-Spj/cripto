document.querySelectorAll('.footer__link').forEach(link => {
    link.addEventListener('mouseenter', function() {
        this.style.color = '#64ffda';
    });
    
    link.addEventListener('mouseleave', function() {
        this.style.color = '#8892b0';
    });
});