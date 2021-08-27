import config from '../config';

const sendButton = document.getElementById('sendMessage');
const translateButton = document.getElementById('translate');
const input = document.getElementById('text');
const language = document.getElementById('language');
const result = document.getElementById('result');

let langValue = 'ru';
language.addEventListener('change', (e) => {
  langValue = e.target.value;
});


let text = 'Default text';

translateButton.addEventListener('click', async () => {
  const qs = obj => {
    return new URLSearchParams(obj).toString();
  };

  const data = qs({
    q: input.value,
    target: langValue,
  });

  const options = {
    method: 'POST',
    url: 'https://google-translate1.p.rapidapi.com/language/translate/v2',
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
      'accept-encoding': 'application/gzip',
      'x-rapidapi-host': 'google-translate1.p.rapidapi.com',
      'x-rapidapi-key': config.rapidApiKey,
      useQueryString: true,
    },
    data: data,
  };

  const response = await axios.request(options);

  // log for debugging
  console.log(response.data.data.translations[0].translatedText);
  // translated text
  text = response.data.data.translations[0].translatedText;
  // show result text
  result.innerHTML = text;
});

sendButton.addEventListener('click', async () => {
  await fetch(`https://api.telegram.org/bot${config.botApi}/sendMessage?chat_id=${config.chatID}&text= Original: ${input.value} --> Translated: ${text}`);
  input.value = '';
});

