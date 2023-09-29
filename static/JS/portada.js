window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    document.documentElement.style.setProperty('--scrollTop', `${scrollTop}px`);
});

const btn = document.querySelector('.btn');


btn.addEventListener('click', () => {
    window.location.href = '/login';
});

const copyElement = document.querySelector('.copy');


copyElement.addEventListener('click', () => {
    
    window.location.href = 'https://github.com/FerBarroso17/HERMES-TIF-FRONTEND';
});
