import config from '../config';

const sendButton = document.getElementById('sendMessage');
const translateButton = document.getElementById('translate');
const input = document.getElementById('text');
const language = document.getElementById('language');

let langValue = '';
language.addEventListener('change', (e) => {
  langValue = e.target.value;
});


let translatedText = '';

translateButton.addEventListener('click', async () => {

  const options = {
    method: 'POST',
    url: 'https://google-translate1.p.rapidapi.com/language/translate/v2',
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
      'accept-encoding': 'application/gzip',
      'x-rapidapi-host': 'google-translate1.p.rapidapi.com',
      'x-rapidapi-key': '719f0792c7mshd23415cf5d65494p1d9dd2jsn297b58894104',
      useQueryString: true
    },
    data: { q: input.value, target: langValue, },
  };

  const response = await axios.request(options);

  console.log(response.data.transactions);
  translatedText = response.data.transactions[0].translatedText;

});

sendButton.addEventListener('click', async () => {
  await fetch(`https://api.telegram.org/bot${config.botApi}/sendMessage?chat_id=${config.chatID}&text=${translatedText}`);
  input.value = '';
});

