/* Маркетинг PRO 8.11 — учебный слой продвинутого курса.
   Он расширяет 8.10 и использует существующее состояние без изменения ключей. */
(function(){
const moduleNames={
 1:'Единая перфоманс-кампания',2:'Аукционы, ставки и стратегии',
 3:'Ключи и автотаргетинг',4:'Аудитории',5:'Креативы',6:'Фиды',
 7:'Статистика в Директе',8:'Оптимизация кампаний',9:'Яндекс Метрика',
 10:'Массовое управление',11:'Директ Коммандер',12:'Excel',
 13:'Продвижение магазинов на маркетплейсах',14:'Метрика для медийной рекламы',
 15:'Медийная реклама',16:'Реклама мобильных приложений'
}
const modulePurpose={
 1:'Спроектировать ЕПК: объект продвижения → место показа → тип объявления → условие → стратегия → аналитика.',
 2:'Понимать аукцион, выбрать стратегию и задать ограничения, которые соответствуют объёму данных и экономике.',
 3:'Управлять сформированным спросом через запросы, семантику, минус-фразы и категории автотаргетинга.',
 4:'Находить новую аудиторию, возвращать знакомую и безопасно работать с сегментами и пересечениями.',
 5:'Создавать релевантные объявления, соблюдать модерацию и проверять креатив по всей воронке.',
 6:'Передавать ассортимент без ошибок и управлять товарами, категориями, фильтрами и обновлениями.',
 7:'Строить воспроизводимые отчёты, локализовать отклонения и принимать решение по одинаковой методике.',
 8:'Оптимизировать по цепочке «симптом → данные → причина → гипотеза → изменение → повторная проверка».',
 9:'Настраивать сбор данных, сегменты, атрибуцию, отчёты и диагностику поведения пользователей.',
 10:'Изменять много объектов безопасно: выборка, резервная копия, предпросмотр, тест и контроль результата.',
 11:'Работать с крупными аккаунтами через Коммандер, не перезаписывая актуальные изменения.',
 12:'Готовить, проверять и анализировать выгрузки с помощью формул, фильтров и сводных таблиц.',
 13:'Выбирать Мастер кампаний или ЕПК и передавать внешний трафик на маркетплейс с измеримой целью.',
 14:'Связывать показы медийной рекламы с post-view/post-click эффектом и корректной структурой пикселей.',
 15:'Планировать охват, частоту, формат, коммуникацию и исследования медийной кампании.',
 16:'Связывать мобильную рекламу с AppMetrica, событиями, трекером, постбэками и бизнес-результатом.'
}
function moduleFor(x){
 const s=x.slug,p=x.page
 if(p==='epk'||['edinaya-perfomans-kampaniya','sozdanie-epk','scenarij-i-struktura-epk','targetingi-i-usloviya-pokaza','tipy-obyavlenij','reklamnye-bloki'].includes(s))return 1
 if(p==='autostrategies')return 2
 if(p==='searchads')return 3
 if(p==='rsya')return 4
 if(['adblocks','experiments','moderation'].includes(p))return 5
 if(p==='productcampaign'){
  return /market|prodvizhenie-cherez-epk|prodvizhenie-magazinov/.test(s)?13:6
 }
 if(p==='reporting')return 7
 if(p==='optimization')return 8
 if(p==='analytics')return 9
 if(p==='protools'){
  if(/kommander/.test(s))return 11
  if(/excel/.test(s))return 12
  return 10
 }
 if(p==='mediaads'){
  return /metrika|piksel|struktura|otchyot/.test(s)?14:15
 }
 if(p==='mediaplan')return 15
 if(p==='appads')return 16
 return 8
}
const pageGuide={
 epk:{rules:['Не смешивать объекты, если различаются экономика, география или ответственность.','Место показа, тип объявления и условие таргетинга — разные сущности.','Объединение даёт стратегии больше данных, разделение — больше контроля.'],task:'Нарисуйте структуру кампании до запуска и подпишите цель каждого уровня.',result:'Схема: кампания → группа → объявление → место → условие → цель → KPI.',error:'Создавать структуру по привычке, не объясняя, зачем элементы объединены или разделены.'},
 autostrategies:{rules:['Ограничение CPA/ДРР должно следовать из экономики, а не из желания.','Стратегии нужен достаточный бюджет и поток целевых сигналов.','После значимого изменения нужен период обучения без хаотичных вмешательств.'],task:'Зафиксируйте цель, модель атрибуции, недельный объём, допустимую цену и правило вмешательства.',result:'Паспорт стратегии и журнал изменений.',error:'Одновременно менять цель, бюджет, ограничение и структуру.'},
 searchads:{rules:['Фраза задаётся специалистом, запрос вводит пользователь.','Минусовать нужно нерелевантный смысл, проверяя конфликт с полезным спросом.','Автотаргетинг оценивают по фактическим запросам и категориям.'],task:'Соберите 20 запросов, классифицируйте намерение и назначьте действие: оставить, выделить или исключить.',result:'Карта запрос → намерение → группа → объявление → страница.',error:'Оценивать семантику только по частотности или CTR.'},
 rsya:{rules:['Ключевая фраза в РСЯ описывает интерес и контекст, а не точную поисковую команду.','Ретаргетинг и холодные аудитории требуют разных сообщений и оценки.','Площадки нельзя отключать только из-за нескольких дешёвых кликов.'],task:'Опишите каждый сегмент человеческим языком и задайте отдельную гипотезу креатива.',result:'Матрица аудитория → сообщение → исключения → KPI.',error:'Смешивать все аудитории в одной группе и делать вывод только по CTR.'},
 adblocks:{rules:['Тип объявления, формат и рекламный блок — не одно и то же.','Объект продвижения должен быть понятен из заголовка, изображения и посадочной.','Фактический показ зависит от аукциона, доступного трафарета и качества элементов.'],task:'Для трёх целей выберите тип объявления, место показа и обязательные элементы.',result:'Матрица цель → тип → место → формат → контроль.',error:'Выбирать объявление по внешнему виду без учёта объекта и места показа.'},
 productcampaign:{rules:['ID товара должен оставаться стабильным во всех системах.','Цена, наличие, URL и изображение должны совпадать с сайтом.','Фильтры строятся по бизнес-логике: категория, маржа, цена, наличие.'],task:'Проверьте 10 офферов и одну коллекцию от источника до объявления.',result:'Протокол QA фида и карта товарных групп.',error:'Загружать фид без регулярного обновления и контроля отклонений.'},
 reporting:{rules:['Отчёт начинается с бизнес-вопроса, а не с максимума столбцов.','Период, цель, атрибуция, НДС и фильтры должны быть воспроизводимы.','Вывод обязан содержать действие, ответственного и дату проверки.'],task:'Соберите один отчёт для локализации причины просадки и сохраните настройки.',result:'Факт → причина → решение → ответственный → срок.',error:'Отправлять таблицу без вывода и сравнивать отчёты с разными настройками.'},
 optimization:{rules:['Сначала проверяется качество данных, затем доставка, сайт, лиды и продажи.','За один тест меняют один значимый фактор.','Отключение — тоже гипотеза, которой нужен достаточный объём.'],task:'Возьмите одно отклонение и пройдите цепочку диагностики до проверяемой гипотезы.',result:'Карточка эксперимента с базой и критерием успеха.',error:'Снижать ставки или отключать сегмент до локализации причины.'},
 analytics:{rules:['Цель должна отражать бизнес-действие и иметь владельца.','Атрибуция отвечает на конкретный вопрос и не является абсолютной истиной.','ClientID, transaction_id, доход и CRM-статус проверяются тестовым сценарием.'],task:'Выполните тестовую конверсию и проследите её от сайта до отчёта.',result:'Measurement plan и протокол качества данных.',error:'Оптимизировать кампанию по цели, которая дублируется или срабатывает ошибочно.'},
 protools:{rules:['Перед массовой операцией получить актуальные данные и сделать копию.','Фильтр, уровень объектов и количество выбранных строк проверяются дважды.','Изменение сначала тестируется на малой выборке.'],task:'Измените один безопасный параметр в тестовой выборке и проверьте результат в кабинете.',result:'Журнал массового изменения и план отката.',error:'Редактировать устаревшую выгрузку или сортировать один столбец отдельно.'},
 experiments:{rules:['Одна гипотеза — одно существенное отличие.','Критерий победы и срок фиксируются до старта.','Решение принимается по конечному KPI, а не по красивой промежуточной метрике.'],task:'Спроектируйте A/B-тест объявления с главным и защитными показателями.',result:'Паспорт эксперимента.',error:'Остановить тест после первых удачных дней.'},
 moderation:{rules:['Требования проверяются до производства креативов.','Обещания, цена и условия должны совпадать с посадочной.','Для регулируемых тематик заранее готовятся документы и предупреждения.'],task:'Проведите премодерационный аудит объявления и страницы.',result:'Чек-лист соответствия и комплект доказательств.',error:'Исправлять только текст, не проверяя изображение, сайт и документы.'},
 mediaads:{rules:['Медийную рекламу нельзя оценивать только по CPA.','Охват без частоты и видимости не показывает качество контакта.','Исследования и post-view аналитика проектируются до запуска.'],task:'Соберите медиаплан: аудитория, формат, охват, частота, бюджет, исследование и следующий контакт.',result:'План-факт медийной кампании.',error:'Запустить один креатив и ждать немедленных продаж.'},
 appads:{rules:['Главная цель — бизнес-событие после установки.','События и постбэки тестируются до запуска.','CPI является диагностикой, если доход появляется позже.'],task:'Постройте воронку app_open → registration → purchase и укажите параметры событий.',result:'Карта событий, трекер и паспорт мобильной кампании.',error:'Оптимизироваться на установки без контроля активации и покупок.'},
 mediaplan:{rules:['План основан на воронке и допустимой стоимости результата.','Сценарии строятся с явными допущениями.','План и факт сравниваются по одной методике.'],task:'Рассчитайте базовый, осторожный и оптимистичный сценарии.',result:'Медиаплан с допущениями и порогами пересмотра.',error:'Обещать продажи без учёта конверсии и мощности бизнеса.'}
}
const verifiedDetails={
 'targetingi-i-usloviya-pokaza':{
  source:'Полный лонгрид Яндекс ЯРД пересверен',
  why:'Понять, на каком уровне задаётся таргетинг и какие условия доступны для конкретного места и типа объявления.',
  rules:[
   'На уровне группы задаются география и условия показа: ключевые фразы, автотаргетинг, интересы и привычки, ретаргетинг, офферный ретаргетинг.',
   'Для товарных объявлений и страниц каталога на уровне объявления используются фильтры товаров и каталогов.',
   'География задаётся страной, регионом, городом или радиусом; для радиуса доступны признаки «живут», «регулярно бывают», «работают», «сейчас находятся».',
   'Расширенный геотаргетинг может охватывать интерес к региону за его пределами.',
   'На Поиске ретаргетинг сочетается с ключами или автотаргетингом через И; в РСЯ условия работают через ИЛИ, а ретаргетинг может быть самостоятельным.',
   'Интересы и привычки доступны только в РСЯ; офферный ретаргетинг — только для товарных объявлений и страниц каталога в РСЯ.',
   'Фильтры товара сочетаются через И и зависят от источника: фид, сайт, ручные товары или маркетплейс.'
  ],
  task:'Для Поиска, РСЯ и Карт заполните матрицу: объект → тип объявления → доступное условие → логика И/ИЛИ → источник данных → пример.',
  result:'Проверенная матрица условий показа ЕПК.',
  error:'Считать, что одинаковый таргетинг работает одинаково во всех местах показа.'
 },
 'scenarij-i-struktura-epk':{
  source:'Полный лонгрид Яндекс ЯРД пересверен',
  why:'Выбрать между классическим разделением и объединением сценариев без потери управляемости и данных для стратегии.',
  rules:[
   'Классический подход разделяет кампании по типу объявления и месту показа: больше контроля над стратегией, бюджетом и креативами.',
   'Недостаток дробления — стратегии могут не получить достаточно конверсий; в уроке приведён ориентир около 10 конверсий на кампанию.',
   'Объединение типов и мест аккумулирует данные, но не позволяет раздельно управлять бюджетом и объёмом трафика между компонентами.',
   'Карты и список организаций на Поиске можно подключать к кампании, а Telegram запускается отдельно с отдельной стратегией.',
   'Компания или магазин: комбинаторные, графические либо нейрообъявления; категория: страницы каталога, комбинаторные или графические; конкретный товар: товарное объявление.',
   'Небольшой ассортимент чаще ведёт к комбинаторным/нейрообъявлениям; большой ассортимент — к товарам, каталогам и фидам.'
  ],
  task:'Спроектируйте смешанный и классический варианты одного проекта и объясните выбор по данным, бюджету, креативам и экономике.',
  result:'Архитектурное решение ЕПК с обоснованием объединения и разделения.',
  error:'Дробить кампании ради порядка или объединять всё ради обучения, не учитывая управляемость.'
 },
 'minus-slova':{
  source:'Полный лонгрид Яндекс ЯРД пересверен',
  why:'Отсекать нерелевантные запросы и направлять пользователя к наиболее релевантному объявлению.',
  rules:[
   'Показ блокируется, если запрос содержит одно минус-слово или все слова из минус-фразы.',
   'Ключевая фраза имеет приоритет над полностью совпавшим минусом, а минус-фраза имеет приоритет над автотаргетингом.',
   'Минус-слова доступны на уровне кампании, группы и ключевой фразы; минус-фразы — на кампании и группе.',
   'Кросс-минусовка убирает внутреннюю конкуренцию; внутри группы она происходит автоматически.',
   'Между группами можно использовать выбор наиболее близкой фразы, а пересечения между кампаниями проверять через Коммандер.',
   'Любой минус нужно проверять на блокировку полезного спроса до применения.'
  ],
  task:'Разберите 30 запросов, сформируйте уровни минусовки и покажите один пример кросс-минусовки между кампаниями.',
  result:'Карта минусов: значение → уровень → затронутые группы → проверка полезного спроса.',
  error:'Добавлять отдельные слова без контекста и случайно отрезать целевой запрос.'
 }
}
function detailFor(x){
 let official=window.PRO107_OFFICIAL_INDEX?.[x.slug],exact=verifiedDetails[x.slug];if(exact)return{...exact,official}
 let rich=typeof verifiedWaveLessons!=='undefined'&&verifiedWaveLessons.find(v=>v.slug===x.slug)
 let guide=pageGuide[x.page]||pageGuide.optimization
 return{
  source:rich?'Подробный материал уже встроен в платформу':'Конспект интегрирован в профильный раздел',
  why:rich?.use||x.summary,
  rules:rich?.steps||guide.rules,
  task:rich?rich.example:guide.task,
  result:guide.result,
  error:rich?.mistake||guide.error,
  control:rich?.control||'',
  official
 }
}
function lessonHref(x){return 'https://yard.yandex.ru/courses/direct-prodvinutyy/'+x.slug}
function openProLesson(ref){
 showPage('pro107');setTimeout(()=>{let el=document.getElementById('pro-lesson-'+ref)||[...document.querySelectorAll('.pro-study-lesson')].find(x=>x.id.endsWith('-'+ref));if(el){el.open=true;el.classList.add('knowledge-highlight');el.scrollIntoView({behavior:'smooth',block:'start'});setTimeout(()=>el.classList.remove('knowledge-highlight'),2500)}},80)
}
function copyProLesson(ref){
 let url=location.href.split('#')[0]+'#lesson='+encodeURIComponent(ref);copyText(url).then(()=>alert('Ссылка на конспект урока скопирована.'))
}
function setProModule(n){
 let select=document.getElementById('proModuleFilter');if(select)select.value=String(n||'all');renderProCourseMap()
}
function renderModuleNavigator(){
 let root=document.getElementById('proModuleNavigator');if(!root)return
 root.innerHTML=Object.entries(moduleNames).map(([n,name])=>{
  let items=advancedCoursePlan.filter(x=>moduleFor(x)==n),done=items.filter(x=>state.done['pro107-'+x.n]).length
  return `<button class="pro-module-card" onclick="setProModule(${n})"><span>${String(n).padStart(2,'0')}</span><b>${escapeHtml(name)}</b><small>${done} / ${items.length}</small><i style="width:${items.length?done/items.length*100:0}%"></i></button>`
 }).join('')
}
function renderProCourseMap811(){
 let root=document.getElementById('proCourseList');if(!root)return
 let q=(document.getElementById('proCourseSearch')?.value||'').trim().toLowerCase()
 let filter=document.getElementById('proCourseFilter')?.value||'all'
 let moduleFilter=document.getElementById('proModuleFilter')?.value||'all'
 let rows=advancedCoursePlan.filter(x=>{
  let d=detailFor(x),done=!!state.done['pro107-'+x.n]
  let hay=[x.title,x.summary,d.why,(d.rules||[]).join(' '),moduleNames[moduleFor(x)]].join(' ').toLowerCase()
  return(!q||hay.includes(q))&&(moduleFilter==='all'||moduleFor(x)==moduleFilter)&&(filter==='all'||filter==='verified'||filter==='done'&&done)
 })
 root.innerHTML=rows.map(x=>{let d=detailFor(x),m=moduleFor(x);return`
  <details class="pro-study-lesson" id="pro-lesson-${x.n}-${x.slug}">
   <summary><span>${String(x.n).padStart(3,'0')}</span><div><small>Модуль ${m} · ${escapeHtml(moduleNames[m])}</small><h3>${escapeHtml(x.title)}</h3><p>${escapeHtml(d.why)}</p></div><b>${state.done['pro107-'+x.n]?'✓':'⌄'}</b></summary>
   <div class="pro-study-body">
    <div class="pro-study-grid">
     <article><h4>Ключевые правила</h4><ul>${(d.rules||[]).map(v=>`<li>${escapeHtml(v)}</li>`).join('')}</ul></article>
     <article class="workbook-example"><h4>Практика / пример</h4><p>${escapeHtml(d.task)}</p><h4>Результат сотрудника</h4><p>${escapeHtml(d.result)}</p></article>
    </div>
    ${d.official?`<div class="official-outline"><small>Официальная страница проверена ${d.official.checked}</small><h4>Что раскрывает урок Яндекса</h4><ul>${(d.official.topics.length?d.official.topics:['Основная тема, примеры, самопроверка и выводы']).map(v=>`<li>${escapeHtml(v)}</li>`).join('')}</ul></div>`:'<div class="notice"><b>Источник:</b> практическая позиция использует официальный материал связанного урока.</div>'}
    ${d.control?`<div class="notice"><b>Контроль:</b> ${escapeHtml(d.control)}</div>`:''}
    <div class="diagnostic bad"><b>Типичная ошибка</b><p>${escapeHtml(d.error)}</p></div>
    <textarea oninput="state.lessonNotes['pro-study-${x.slug}']=this.value;save()" placeholder="Определение своими словами → пример → что применю → вопрос наставнику…">${escapeHtml(state.lessonNotes['pro-study-'+x.slug]||'')}</textarea>
    <div class="filter-row">
     <label class="completion"><input type="checkbox" ${state.done['pro107-'+x.n]?'checked':''} onchange="state.done['pro107-${x.n}']=this.checked;save();renderProCourseMap();renderModuleNavigator()"> Урок изучен и законспектирован</label>
     <button class="chip" onclick="openKnowledge('${x.page}','','${escapeHtml(x.title)}','')">Открыть профильный раздел →</button>
     <button class="chip" onclick="copyProLesson('${x.n}-${x.slug}')">Скопировать ссылку</button>
     <a class="source" href="${lessonHref(x)}" target="_blank" rel="noopener">Официальный урок ЯРД ↗</a>
    </div>
    <small class="source-detail">${escapeHtml(d.source)} · содержание платформы дополняет, но не подменяет официальный источник.</small>
   </div>
  </details>`}).join('')||'<div class="notice">По выбранным фильтрам материалы не найдены.</div>'
 if(typeof proVerifiedCount!=='undefined'){proVerifiedCount.textContent=advancedCoursePlan.length;proIntegratedCount.textContent=new Set(advancedCoursePlan.map(x=>x.page)).size;proDoneCount.textContent=advancedCoursePlan.filter(x=>state.done['pro107-'+x.n]).length}
}
function epkTargetingModule(){
 let root=document.getElementById('epk');if(!root||document.getElementById('epk-targeting-matrix'))return
 root.insertAdjacentHTML('beforeend',`
 <section id="epk-targeting-matrix" class="deep-module">
  <header><span class="eyebrow">Модуль 1 · полный разбор</span><h2>Таргетинги и условия показа ЕПК</h2><p>Сначала выбирается объект и место показа, затем тип объявления и доступные условия. Одинаковое название таргетинга не означает одинаковую механику в Поиске и РСЯ.</p></header>
  <div class="stats-wrap"><table><thead><tr><th>Место и тип</th><th>Доступные условия</th><th>Логика</th><th>Что важно</th></tr></thead><tbody>
   <tr><td>Комбинаторные, товарные и страницы каталога · Поиск/Товарная галерея</td><td>Автотаргетинг, ключевые фразы, ретаргетинг</td><td>Ретаргетинг уточняет основной таргетинг через И</td><td>Интересы и привычки недоступны</td></tr>
   <tr><td>Комбинаторные и графические · РСЯ</td><td>Автотаргетинг, ключевые фразы, интересы и привычки, ретаргетинг</td><td>Условия группы работают через ИЛИ</td><td>Ретаргетинг может быть единственным условием</td></tr>
   <tr><td>Товарные и страницы каталога · РСЯ</td><td>Все сетевые условия плюс офферный ретаргетинг</td><td>Условия группы — ИЛИ; фильтры товара — И</td><td>Офферный ретаргетинг возвращает к просмотренным предложениям</td></tr>
   <tr><td>Карты</td><td>Автотаргетинг и ретаргетинг</td><td>Отбор зависит от местоположения и данных организации</td><td>Ключевая фраза не является самостоятельным условием</td></tr>
  </tbody></table></div>
  <div class="decision-grid">
   <article class="decision-card" id="epk-geo"><h3>Геотаргетинг</h3><p>Страна, регион, город или радиус. Для радиуса: живут, регулярно бывают, работают или находятся сейчас. Расширенная география охватывает интерес к региону вне него.</p><div class="point-example"><b>Пример</b>Кафе около метро: радиус 2 км + «регулярно бывают», а не вся Москва.</div></article>
   <article class="decision-card" id="epk-group-scenario"><h3>Сценарий группы</h3><p>«Вся заинтересованная аудитория» даёт максимальный охват. «Новые покупатели» требует данных о текущих клиентах из Метрики, Аудиторий или приложения.</p><div class="point-example"><b>Пример</b>Покупатели исключаются из acquisition-группы, но остаются в отдельном cross-sell.</div></article>
   <article class="decision-card"><h3>Поиск: логика И</h3><p>Пользователь должен одновременно соответствовать запросу/автотаргетингу и условию ретаргетинга.</p><div class="point-example"><b>Пример</b>Искал «купить смартфон» И ранее был на сайте.</div></article>
   <article class="decision-card"><h3>РСЯ: логика ИЛИ</h3><p>Показ возможен при соответствии хотя бы одному условию группы. Для чистого ретаргетинга оставьте только его.</p><div class="point-example"><b>Пример</b>Интересовался смартфонами ИЛИ был на сайте.</div></article>
   <article class="decision-card"><h3>Офферный ретаргетинг</h3><p>Работает для товарных объявлений и каталогов в РСЯ: возвращает пользователя к просмотренному товару, услуге или категории.</p></article>
   <article class="decision-card"><h3>Фильтры</h3><p>Отбирают предложения на уровне объявления. Условия фильтра сочетаются через И и зависят от источника данных.</p></article>
  </div>
  <div class="module-checks card">${['Выбран объект продвижения','Зафиксированы место и тип объявления','Проверена доступность условия','Логика И/ИЛИ описана словами','Исключения и текущие клиенты проверены','Назначены KPI и дата контроля'].map((v,i)=>`<label><input type="checkbox" onchange="state.done['epk-targeting-${i}']=this.checked;save()"> ${v}</label>`).join('')}</div>
  <textarea oninput="state.lessonNotes['epk-targeting-result']=this.value;save()" placeholder="Место → тип объявления → условие → И/ИЛИ → аудитория → пример → KPI…">${escapeHtml(state.lessonNotes['epk-targeting-result']||'')}</textarea>
  <div class="filter-row"><button class="chip" onclick="openProLesson('targetingi-i-usloviya-pokaza')">Конспект урока →</button><button class="chip" onclick="openKnowledge('rsya','','РСЯ','')">Подробно про РСЯ →</button><button class="chip" onclick="openKnowledge('searchads','','Поиск','')">Подробно про Поиск →</button></div>
 </section>
 <section id="epk-structure-scenarios" class="deep-module">
  <header><span class="eyebrow">Архитектура ЕПК</span><h2>Сценарии запуска и структура</h2><p>Структура выбирается по объекту, бизнесу, ассортименту, бюджету и объёму данных — не по шаблону.</p></header>
  <div class="compare-table"><article><h3>Классический подход</h3><p>Один тип объявления и одно место показа на кампанию.</p><ul><li>Своя стратегия, бюджет и креативы</li><li>Прозрачнее анализ</li><li>Меньше данных в каждой кампании</li></ul></article><article><h3>Объединённый подход</h3><p>Несколько типов и мест в одной ЕПК.</p><ul><li>Быстрее аккумулируются конверсии</li><li>Меньше ручного управления</li><li>Нельзя раздельно распределить бюджет между компонентами</li></ul></article></div>
  <div class="notice"><b>Выбор объекта:</b> компания/магазин → комбинаторные, графические, нейрообъявления; категория → каталоги, комбинаторные, графические; конкретный товар → товарные объявления. Telegram запускается отдельной кампанией.</div>
  <textarea oninput="state.lessonNotes['epk-structure-result']=this.value;save()" placeholder="Проект → классическая схема → объединённая схема → объём данных → решение и почему…">${escapeHtml(state.lessonNotes['epk-structure-result']||'')}</textarea>
  <button class="chip" onclick="openProLesson('scenarij-i-struktura-epk')">Открыть полный конспект урока →</button>
 </section>`)
}
function minusWordsModule(){
 let root=document.getElementById('searchads');if(!root||document.getElementById('minus-words-pro'))return
 root.insertAdjacentHTML('beforeend',`<section id="minus-words-pro" class="deep-module"><header><span class="eyebrow">Модуль 3 · полный разбор</span><h2>Минус-слова, минус-фразы и кросс-минусовка</h2><p>Минусование управляет смыслом запросов и маршрутизацией трафика. Его нельзя выполнять механически списком отдельных слов.</p></header>
 <div class="definition"><b>Правило показа</b><p>Объявление не показывается, если запрос содержит минус-слово или все слова минус-фразы. Ключевая фраза имеет приоритет над полностью совпавшим минусом; минус-фраза имеет приоритет над автотаргетингом.</p></div>
 <div class="stats-wrap"><table><thead><tr><th>Уровень</th><th>Что можно добавить</th><th>Когда применять</th></tr></thead><tbody><tr><td>Кампания</td><td>Минус-слова и минус-фразы</td><td>Общий нерелевантный смысл для всей кампании</td></tr><tr><td>Группа</td><td>Минус-слова, минус-фразы и готовый набор</td><td>Разделить продукты, намерения и посадочные</td></tr><tr><td>Ключевая фраза</td><td>Минус-слова</td><td>Уточнить конкретную фразу и убрать внутренний конфликт</td></tr></tbody></table></div>
 <div class="workbook-example"><h3>Пример кросс-минусовки</h3><p>Есть фразы «купить ауди а6» и «купить коврики для ауди а6». К широкой фразе добавляется «коврики», чтобы конкретный запрос направлялся к более релевантному объявлению. Внутри группы кросс-минусовка выполняется автоматически; между кампаниями пересечения можно обработать через Коммандер.</p></div>
 <div class="module-checks card">${['Запросы просмотрены до запуска','Минусы разделены по уровням','Проверен приоритет ключевой фразы','Проверен конфликт с автотаргетингом','Полезные запросы не заблокированы','Назначен регулярный разбор отчёта запросов'].map((v,i)=>`<label><input type="checkbox" onchange="state.done['minus-pro-${i}']=this.checked;save()"> ${v}</label>`).join('')}</div>
 <textarea oninput="state.lessonNotes['minus-pro-result']=this.value;save()" placeholder="Нерелевантный смысл → минус → уровень → какие фразы затронет → как проверено…">${escapeHtml(state.lessonNotes['minus-pro-result']||'')}</textarea>
 <div class="filter-row"><button class="chip" onclick="openProLesson('minus-slova')">Конспект урока →</button><button class="chip" onclick="openKnowledge('reporting','','Поисковые запросы','')">К отчётности →</button><button class="chip" onclick="openKnowledge('protools','','Коммандер','')">К массовой обработке →</button></div></section>`)
}
function restore811(){
 document.querySelectorAll('[onchange*=\"epk-targeting-\"]').forEach(el=>{let m=el.getAttribute('onchange').match(/epk-targeting-(\\d+)/);if(m)el.checked=!!state.done['epk-targeting-'+m[1]]})
 document.querySelectorAll('[onchange*=\"minus-pro-\"]').forEach(el=>{let m=el.getAttribute('onchange').match(/minus-pro-(\\d+)/);if(m)el.checked=!!state.done['minus-pro-'+m[1]]})
}
function handleLessonHash(){
 if(!window.location.hash.startsWith('#lesson='))return
 let slug=decodeURIComponent(window.location.hash.slice(8));setTimeout(()=>openProLesson(slug),250)
}
function installPro811(){
 let page=document.getElementById('pro107');if(!page)return
 page.querySelector('.lead').textContent='Полная учебная карта продвинутого курса: откройте модуль, затем урок. В каждом уроке есть назначение, ключевые правила, практика, результат сотрудника, ошибка, заметка, переход в профильный раздел и официальный источник.'
 let notice=page.querySelector('.notice');if(notice)notice.insertAdjacentHTML('afterend','<div class="section-head"><div><span class="eyebrow">16 модулей</span><h2>Выберите учебный маршрут</h2></div></div><div id="proModuleNavigator" class="pro-module-grid"></div>')
 let toolbar=page.querySelector('.pro-toolbar');if(toolbar&&!document.getElementById('proModuleFilter'))toolbar.insertAdjacentHTML('afterbegin',`<select id="proModuleFilter" onchange="renderProCourseMap()"><option value="all">Все 16 модулей</option>${Object.entries(moduleNames).map(([n,v])=>`<option value="${n}">${n}. ${v}</option>`).join('')}</select>`)
 window.renderProCourseMap=renderProCourseMap811;window.renderModuleNavigator=renderModuleNavigator;window.openProLesson=openProLesson;window.copyProLesson=copyProLesson;window.setProModule=setProModule
 epkTargetingModule();minusWordsModule();renderModuleNavigator();renderProCourseMap811();restore811()
 if(window.location.hash.startsWith('#lesson=')){let ref=decodeURIComponent(window.location.hash.slice(8)),el=document.getElementById('pro-lesson-'+ref)||[...document.querySelectorAll('.pro-study-lesson')].find(x=>x.id.endsWith('-'+ref));showPage('pro107');if(el)el.open=true}
}
const style=document.createElement('style');style.textContent=`
.pro-module-grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:9px;margin:16px 0 26px}.pro-module-card{position:relative;overflow:hidden;display:grid;grid-template-columns:35px 1fr auto;gap:8px;align-items:center;text-align:left;padding:12px;background:#fff;border:1px solid var(--line);border-radius:11px;color:var(--ink)}.pro-module-card:hover{border-color:var(--green);transform:translateY(-1px)}.pro-module-card>span{font-weight:900;color:var(--green)}.pro-module-card>b{font-size:11px}.pro-module-card>small{font-size:9px;color:var(--muted)}.pro-module-card>i{position:absolute;left:0;bottom:0;height:3px;background:var(--lime)}.pro-study-lesson{border:1px solid var(--line);border-radius:13px;background:#fff;margin:9px 0;scroll-margin-top:115px}.pro-study-lesson>summary{display:grid;grid-template-columns:48px 1fr 28px;gap:12px;align-items:start;padding:16px;cursor:pointer;list-style:none}.pro-study-lesson>summary>span{display:grid;place-items:center;width:44px;height:44px;border-radius:10px;background:var(--lime);font-weight:900}.pro-study-lesson>summary small{color:var(--green);font-weight:900;text-transform:uppercase;font-size:8px}.pro-study-lesson>summary h3{margin:4px 0;font-size:17px}.pro-study-lesson>summary p{margin:0;color:var(--muted);font-size:10px}.pro-study-lesson>summary>b{font-size:20px}.pro-study-body{padding:0 16px 18px;border-top:1px solid var(--line)}.pro-study-grid{display:grid;grid-template-columns:1.2fr .8fr;gap:12px;margin:15px 0}.pro-study-grid article{padding:14px;border:1px solid var(--line);border-radius:10px}.pro-study-grid h4{margin:0 0 8px}.pro-study-grid li{margin:6px 0}.official-outline{padding:14px;margin:12px 0;border-left:4px solid var(--green);background:#f2f6eb;border-radius:9px}.official-outline small{color:var(--green);font-weight:900;text-transform:uppercase}.official-outline h4{margin:5px 0 7px}.official-outline ul{columns:2;margin-bottom:0}.official-outline li{break-inside:avoid;margin:5px 0}.completion{padding:9px 12px;background:#eef7da;border-radius:9px;font-weight:800}.deep-module{scroll-margin-top:115px}@media(max-width:900px){.pro-module-grid{grid-template-columns:repeat(2,minmax(0,1fr))}.pro-study-grid{grid-template-columns:1fr}}@media(max-width:580px){.pro-module-grid{grid-template-columns:1fr}.pro-study-lesson>summary{grid-template-columns:42px 1fr 20px}.official-outline ul{columns:1}}
`;document.head.appendChild(style)
setTimeout(installPro811,350)
setTimeout(handleLessonHash,1400)
setTimeout(handleLessonHash,3200)
window.addEventListener('hashchange',handleLessonHash)
})();
