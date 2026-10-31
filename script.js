const records={
  "station": [
    "САВЁЛОВСКОЕ НАПРАВЛЕНИЕ / ПУТЬ 0",
    "Станция Лобня",
    "6 9>> 0 7 << 7 9 >> 4 5\t1 5 >> 1 6 # << 3 0 >> 8 8"
  ],
  "crossing": [
    "ГОРОДСКАЯ ЗАМЕТКА / ШЛАГБАУМ",
    "Ростикс",
    "Когда-то здесь просто ели. Теперь тут остались только использованные презервативы в туалете.\n\nДверь открыта, но заказ не примут. Кассира не видно. Но, говорят, если сюда зайдет кто-то, кто уже был здесь, то увидит палача с баскетом вместо головы, если он услышит сирену, бегите."
  ],
  "yard": [
    "ЖИЛОЙ СЕКТОР / ПОДЪЕЗД 03",
    "Лобненская городская больница",
    "Панельный дом выглядит знакомо. На качелях никого, но они раскачиваются в такт сигналам переезда.\n\nДомофон открывается без ключа. В списке жильцов — только ваша фамилия, повторённая на каждом этаже.\n\nНе считайте окна. Вчера их было меньше."
  ],
  "radio": [
    "ЗАПИСЬ СТАНЦИОННОГО ЭФИРА / 03:17",
    "Голос на пустой платформе",
    "«Уважаемые пассажиры, следующий поезд проследует без остановки в вашем времени».\n\nПосле объявления наступила тишина. Затем диктор назвал моё имя и попросил не забывать вещи, которые я ещё не потерял.\n\nЗапись обрывается на звуке открывающихся дверей. По журналу движения поездов в эту ночь не было."
  ],
  "flight": [
    "НАБЛЮДЕНИЕ ИЗ ОКНА / БЕЗ ДАТЫ",
    "Самолёт, который не садится",
    "Над крышами снова слышен самолёт. Лобня привыкла к этому звуку. Но этот идёт на посадку уже сорок минут.\n\nЧем тише становится во дворе, тем ближе гул. За облаками ничего не видно. В приложении — чистое небо.\n\nСосед снизу говорит, что слышит его с детства. Мы живём на первом этаже."
  ],
  "letter": [
    "ЗАПИСКА ИЗ ЛИФТА / НАЙДЕНА МЕЖДУ ЭТАЖАМИ",
    "Не нажимай первый этаж",
    "«Если едешь домой — нажми свой этаж один раз. Не смотри на цифры, пока лифт не остановится.\n\nНа первом снова платформа. Я пробовал выйти: в электричке сидели все наши соседи. Никто не узнал меня.\n\nЕсли увидишь мой свет в окне, не поднимайся. Я ещё в лифте»."
  ]
};
const modal=document.querySelector('#document');
document.querySelectorAll('[data-place],[data-file]').forEach(button=>button.addEventListener('click',()=>{const item=records[button.dataset.place||button.dataset.file];document.querySelector('#doc-label').textContent=item[0];document.querySelector('#doc-title').textContent=item[1];const text=document.querySelector('#doc-text');text.replaceChildren(...item[2].split('\n\n').map(paragraph=>{const line=document.createElement('span');line.className='document-paragraph';line.textContent=paragraph;return line}));modal.showModal();modal.scrollTop=0}));
modal.querySelector('.close').addEventListener('click',()=>modal.close());modal.addEventListener('click',event=>{if(event.target===modal){const r=modal.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)modal.close()}});
let audio,noise,gain;const radio=document.querySelector('#sound');radio.addEventListener('click',async()=>{try{if(!audio){audio=new(window.AudioContext||window.webkitAudioContext)();const buffer=audio.createBuffer(1,audio.sampleRate*3,audio.sampleRate);const data=buffer.getChannelData(0);for(let i=0;i<data.length;i++)data[i]=Math.random()*2-1;noise=audio.createBufferSource();noise.buffer=buffer;noise.loop=true;const filter=audio.createBiquadFilter();filter.type='bandpass';filter.frequency.value=950;filter.Q.value=.6;gain=audio.createGain();gain.gain.value=0;noise.connect(filter);filter.connect(gain);gain.connect(audio.destination);noise.start()}await audio.resume();const on=radio.getAttribute('aria-pressed')!=='true';gain.gain.setTargetAtTime(on?.035:0,audio.currentTime,.3);radio.setAttribute('aria-pressed',String(on));radio.querySelector('span').textContent=on?'Радио включено':'Радио выключено'}catch{radio.querySelector('span').textContent='Радио недоступно';radio.setAttribute('aria-pressed','false')}});
