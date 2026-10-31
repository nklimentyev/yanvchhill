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
    "Организация заточила\nменя здесь.\nОни хотят сломить мою волю,\nзаставить забыть обо всём.\n\nНо я сохраню рассудок, даже если бросят\nменя сюда с безумцами.\n\nА что, если я приклею это\nк стене?\nВсе это станет бесполезным.\nТы ведь сможешь оторвать это с\nпомощью штуки, которой без конца\nпользуются те мерзкие девки?"
  ],
  "radio": [
    "ЗАПИСЬ СТАНЦИОННОГО ЭФИРА / 03:17",
    "Записка Олеси",
    "Для \"меня\" было бы лучше\nумереть. После всего случившегося,\nуже нечего бояться...\n\nЭтот ребёнок... этот демон...\nКогда я думаю о той нескончаемой боли,\nкоторую он принесёт, когда родится...\nЯ приняла решение, что вместо\nстраданий и жестокости, которых я\nнатерпелась в той ужасной палате...\n\nВот почему я хочу для\n\"себя\" более мягкую и мирную\nсмерть.\nПочему \"я\" сопротивляюсь? Я никогда\nне думала, что \"я\" такая дура..."
  ],
  "flight": [
    "НАБЛЮДЕНИЕ ИЗ ОКНА / БЕЗ ДАТЫ",
    "Музыкальные шкатулки",
    "Когда Потерянные вернутся,\nкислое сообщение станет сладким."
  ],
  "letter": [
    "ЗАПИСКА ИЗ ЛИФТА / НАЙДЕНА МЕЖДУ ЭТАЖАМИ",
    "Не нажимай первый этаж",
    "«Если едешь домой — нажми свой этаж один раз. Не смотри на цифры, пока лифт не остановится.\n\nНа первом снова платформа. Я пробовал выйти: в электричке сидели все наши соседи. Никто не узнал меня.\n\nЕсли увидишь мой свет в окне, не поднимайся. Я ещё в лифте»."
  ]
};
const modal=document.querySelector('#document');
document.querySelectorAll('[data-place],[data-file]').forEach(button=>button.addEventListener('click',()=>{const key=button.dataset.place||button.dataset.file;const item=records[key];modal.dataset.document=key;document.querySelector('#doc-label').textContent=item[0];document.querySelector('#doc-title').textContent=item[1];const text=document.querySelector('#doc-text');text.replaceChildren(...item[2].split('\n\n').map(paragraph=>{const line=document.createElement('span');line.className='document-paragraph';line.textContent=paragraph;return line}));modal.showModal();modal.scrollTop=0}));
modal.querySelector('.close').addEventListener('click',()=>modal.close());modal.addEventListener('click',event=>{if(event.target===modal){const r=modal.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)modal.close()}});
let audio,noise,gain;const radio=document.querySelector('#sound');radio.addEventListener('click',async()=>{try{if(!audio){audio=new(window.AudioContext||window.webkitAudioContext)();const buffer=audio.createBuffer(1,audio.sampleRate*3,audio.sampleRate);const data=buffer.getChannelData(0);for(let i=0;i<data.length;i++)data[i]=Math.random()*2-1;noise=audio.createBufferSource();noise.buffer=buffer;noise.loop=true;const filter=audio.createBiquadFilter();filter.type='bandpass';filter.frequency.value=950;filter.Q.value=.6;gain=audio.createGain();gain.gain.value=0;noise.connect(filter);filter.connect(gain);gain.connect(audio.destination);noise.start()}await audio.resume();const on=radio.getAttribute('aria-pressed')!=='true';gain.gain.setTargetAtTime(on?.035:0,audio.currentTime,.3);radio.setAttribute('aria-pressed',String(on));radio.querySelector('span').textContent=on?'Радио включено':'Радио выключено'}catch{radio.querySelector('span').textContent='Радио недоступно';radio.setAttribute('aria-pressed','false')}});
