document.getElementById('getTimeBtn').addEventListener('click', () => {
  const city = document.getElementById('cityInput').value.trim();
  if (!city) {
    alert('Please enter a city name');
    return;
  }

  // Use worldtimeapi.org API to get time
  fetch(`https://worldtimeapi.org/api/timezone`)
    .then(res => res.json())
    .then(timezones => {
      const timezone = timezones.find(tz => tz.toLowerCase().includes(city.toLowerCase()));
      if (!timezone) {
        document.getElementById('result').textContent = 'City not found';
        return;
      }

      fetch(`https://worldtimeapi.org/api/timezone/${timezone}`)
        .then(res => res.json())
        .then(data => {
          document.getElementById('result').textContent = `${timezone} : ${data.datetime.slice(11,19)}`;
        });
    })
    .catch(err => {
      document.getElementById('result').textContent = 'Error fetching time';
      console.error(err);
    });
});
