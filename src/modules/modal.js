const modal = () => {
    const modal = document.querySelector('.popup')
    const buttons = document.querySelectorAll('.popup-btn')
    const closeBtn = modal.querySelector('.popup-close')
    const modalContent = modal.querySelector('.popup-content')
    
    function isMobile() {
        return window.innerWidth < 768
    }
    function showModalAnimated() {
        modal.style.display = 'block'
        if (isMobile()) {
            // modal.style.display = 'block'
            modalContent.style.opacity = "";
            modalContent.style.transition = "none";
            modalContent.style.transform = "";
            return
        }

        modalContent.style.opacity = '0'
        modalContent.style.transition = "none";
        
        modalContent.offsetHeight;

        let startTime = null
        const duration = 300

        function animateFrame(timestamp) {
            if (!startTime) {
              startTime = timestamp;
            }
            const progress = Math.min((timestamp - startTime) / duration, 1);
            modalContent.style.opacity = progress
            if (progress < 1) {
                requestAnimationFrame(animateFrame)
            } else {
                modalContent.style.opacity = "";
            }
        }
        requestAnimationFrame(animateFrame)
    }
    function hideModalAnimated() {
        if (isMobile()) {
            modal.style.display = 'none'
            modalContent.style.opacity = "";
            return
        }

        const currentOpacity = parseFloat(
          window.getComputedStyle(modalContent).opacity
        );
        modalContent.style.opacity = currentOpacity;
        modalContent.style.transition = "none";

        modalContent.offsetHeight;

        let startTime = null
        const duration = 300

        function animateFrame(timestamp) {
            if (!startTime) {
              startTime = timestamp;
            }
            const progress = Math.min((timestamp - startTime) / duration, 1);
            modalContent.style.opacity = 1 - progress
            if (progress < 1) {
                requestAnimationFrame(animateFrame)
            } else {
                modal.style.display = 'none'
                modalContent.style.opacity = ''
            }
        }
        requestAnimationFrame(animateFrame)
    }


    buttons.forEach((btn) => {
        btn.addEventListener('click', (e) => {
            e.preventDefault()
            showModalAnimated()
            // modal.style.display = 'block'
        })
    })

    closeBtn.addEventListener('click', () => {
        hideModalAnimated()
        // modal.style.display = 'none'
    })

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            hideModalAnimated()
        }
    })

    window.addEventListener("resize", () => {
      if (modal.style.display === "block") {
        if (isMobile()) {
          modalContent.style.opacity = "";
          modalContent.style.transition = "none";
        } else {
        }
      }
    });
}

export default modal;