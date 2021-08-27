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

  const response = await fetch('https://google-translate1.p.rapidapi.com/language/translate/v2', {
    method: 'POST',
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
      'accept-encoding': 'application/gzip',
      'x-rapidapi-host': config.rapidApiHost,
      'x-rapidapi-key': config.rapidApiKey,
      useQueryString: true,
    },
    body: data,
  });
  const res = await response.json();
  // log response
  console.log(res);
  // translated text
  text = res.data.translations[0].translatedText;
  // show result text
  result.innerHTML = text;
});

sendButton.addEventListener('click', async () => {
  await fetch(`https://api.telegram.org/bot${config.botApi}/sendMessage?chat_id=${config.chatID}&text=Original: ${input.value} --> Translated: ${text}`);
  input.value = '';
});

