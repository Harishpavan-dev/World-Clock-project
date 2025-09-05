function updateClocks() {
  const cities = document.querySelectorAll('.city');
  cities.forEach(city => {
    const timezone = city.getAttribute('data-timezone');
    const time = new Date().toLocaleTimeString('en-US', { timeZone: timezone, hour12: false });
    city.querySelector('.time').textContent = time;
  });
}

// Update every second
setInterval(updateClocks, 1000);
updateClocks();
