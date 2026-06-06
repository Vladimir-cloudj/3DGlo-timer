const smoothScroll = () => {
    const anchors = document.querySelectorAll('a[href^="#"]');
    const duration = 800; 

    anchors.forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const blockID = this.getAttribute('href').substr(1);
            
            if (!blockID) return;

            const targetBlock = document.getElementById(blockID);
            
            if (!targetBlock) return;

            const targetPosition = targetBlock.getBoundingClientRect().top + window.pageYOffset;
            const startPosition = window.pageYOffset;
            const distance = targetPosition - startPosition;
            
            let startTime = null;

            function animation(currentTime) {
                if (startTime === null) startTime = currentTime;
                
                const timeElapsed = currentTime - startTime;
                
                const position = easeInOutQuad(timeElapsed, startPosition, distance, duration);

                window.scrollTo(0, position);

                if (timeElapsed < duration) {
                    requestAnimationFrame(animation);
                }
            }

            function easeInOutQuad(t, b, c, d) {
                t /= d / 2;
                if (t < 1) return c / 2 * t * t + b;
                t--;
                return -c / 2 * (t * (t - 2) - 1) + b;
            }

            requestAnimationFrame(animation);
        });
    });
};

export default smoothScroll;
