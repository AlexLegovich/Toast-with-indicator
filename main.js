let closeTime = 7000; // milliseconds (5 seconds)
let autoCloseTimer = null;
let countdownInterval = null;

function triggerToast() {
  const toastTrigger = document.querySelector('.toast__trigger');
  const toast = document.querySelector('.toast');

  toastTrigger.addEventListener("click", function () {
    toast.classList.add('active');
    autoCloseToast(); // Start or restart the auto-close timer and countdown
  });
}

function closeToast() {
  const toast = document.querySelector('.toast');
  const toastClose = document.querySelector('.toast__close');

  function removeToast() {
    toast.classList.remove('active');
    clearAutoCloseToast();
  }

  toastClose.addEventListener("click", removeToast);

  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') {
      removeToast();
    }
  });
}

function autoCloseToast() {
  clearAutoCloseToast(); // Clear any previous timers

  const toast = document.querySelector('.toast');
  const countdownSpan = toast.querySelector('.toast__message span');
    const indicator = toast.querySelector('.toast__indicator'); // 👈 add this
  let secondsLeft = Math.floor(closeTime / 1000);

  if (countdownSpan) {
    countdownSpan.textContent = secondsLeft;
  }

  countdownInterval = setInterval(() => {
    secondsLeft--;
    if (countdownSpan) {
      countdownSpan.textContent = secondsLeft;
    }

    if (secondsLeft <= 0) {
      clearInterval(countdownInterval);
    }
  }, 1000);

  
  // ✨ Set the animation duration dynamically (this is what you're asking)
  if (indicator) {
    indicator.style.animationDuration = `${closeTime}ms`;
  }

  // Start timeout to close toast
  autoCloseTimer = setTimeout(() => {
    toast.classList.remove('active');
    clearInterval(countdownInterval);
  }, closeTime);
}

function clearAutoCloseToast() {
  if (autoCloseTimer) {
    clearTimeout(autoCloseTimer);
    autoCloseTimer = null;
  }

  if (countdownInterval) {
    clearInterval(countdownInterval);
    countdownInterval = null;
  }
}

triggerToast();
closeToast();
