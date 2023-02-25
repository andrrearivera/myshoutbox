const shoutForm = document.querySelector('#shoutForm');

shoutForm.onsubmit = (e) => {
  const formData = new FormData(shoutForm);
  fetch('shoutbox.php', {
        method: "POST",
        body: formData,
        credentials: "same-origin"
    })
    .then( (response) => {
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        return response.text();
    })
    .then( (data) => {
        document.querySelector('ul').innerHTML = data;
        document.querySelector('#shout').value = '';
    })
    .catch( (error) => {
        console.error('Error in fetch: ', error);
    }); // end of fetch
    return false;
}; // end of shoutForm.onsubmit

function refresh_shoutbox() {
    // a different fetch function, same URL
    fetch('shoutbox.php', {
      method: "POST",
headers: {
'Content-type': 'application/x-www-form-urlencoded; charset=UTF-8'
      },
        // send one name-value pair not from a form
        body: 'refresher=1',
        credentials: "same-origin"
    })
    .then( (response) => {
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        return response.text();
    })
    .then( (data) => {
        document.querySelector('ul').innerHTML = data;
    })
    .catch( (error) => {
        console.error('Error in fetch: ', error);
    }); // end fetch
} // end refresh function

refresh_shoutbox();
setInterval(refresh_shoutbox, 15000);
