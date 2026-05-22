const animateNumbers = () => {
  const totalElement = document.getElementById("total");

  if (!totalElement) return { setTargetValue: () => {} };

  let animationId = null; 
  let startValue = 0; 
  let targetValue = 0;

  function animate() {
    const increment = targetValue / 50;

    if (startValue < targetValue) {
      startValue += increment;

      if (startValue > targetValue) {
        startValue = targetValue;
      }

      totalElement.textContent = Math.floor(startValue);

      animationId = requestAnimationFrame(animate);
    } else {
      totalElement.textContent = targetValue;
      animationId = null;
    }
  }

  function setTargetValue(newValue) {
    if (animationId) {
      cancelAnimationFrame(animationId);
    }

    startValue = parseFloat(totalElement.textContent) || 0;
    targetValue = newValue;

    animate();
  }

  return { setTargetValue };
};

export default animateNumbers;
