import '../styles/timeline.scss';
import TimelineCircle from './TimelinCircle';

type Props = {
}

export default function TimelineBlock({}: Props) {
  const pointsData = [
    { label: "Кино", year: 1939, index: 1, events: [
      { date: "1939", description: "Один из самых известных и успешных фильмов в истории кино. Он стал культовым и выиграл 10 Оскаров." },
      { date: "1969", description: "Космическая одиссея Стэнли Кубрика." },
      { date: "1977", description: "Кинематографическая революция, породившая культовую франшизу, значительно изменившую киноиндустрию." },
      { date: "1991", description: "Картина Джеймса Кэмерона стала классикой научной фантастики и установила новый стандарт для спецэффектов." },
      { date: "2009", description: "Аватар. Режиссёр Джеймс Кэмерон снова нарушил границы возможного, создав фильм с прорывными технологиями 3D и визуальными эффектами, который стал самым кассовым фильмом на тот момент." },
      { date: "2019", description: "Этот фильм Бон Джун-хо стал первым южнокорейским фильмом, выигравшим Оскар за лучший фильм, что стало историческим моментом для мирового кино." }
    ]},
    { label: "Наука", year: 2006, index: 2, events: [
      { date: "2006", description: "Открытие экзопланеты 55 Рак" },
      { date: "2012", description: "Открытие бозона Хиггса" },
      { date: "2013", description: "Разработка CRISPR-Cas9 для редактирования генома." },
      { date: "2016", description: "Детектирование гравитационных волн" },
      { date: "2020", description: "Разработка и утверждение вакцин против COVID-19" },
      { date: "2024", description: "Запуск миссии Планета 9" }
    ]},
    { label: "Музыка", year: 1990, index: 3, events: [
      { "date": "1965", "description": "Выход альбома 'Rubber Soul' группы The Beatles, который стал революционным в развитии рок-музыки." },
      { "date": "1977", "description": "Рождение жанра панк-рока с выходом альбома 'Never Mind the Bollocks' группы Sex Pistols." },
      { "date": "1982", "description": "Выпуск альбома 'Thriller' Майкла Джексона, ставшего самым продаваемым альбомом всех времен." },
      { "date": "1991", "description": "Выход альбома 'Nevermind' группы Nirvana, который стал культовым и ознаменовал рост популярности гранжа." },
      { "date": "2000", "description": "Начало эры цифровой музыки с массовым распространением MP3 и интернет-сервисов для скачивания." },
      { "date": "2014", "description": "Популяризация стриминговых сервисов, таких как Spotify, которые кардинально изменили способ потребления музыки." }
    ]},
    { label: "Искусство", year: 1990, index: 4, events: [
      { "date": "1889", "description": "Создание картины 'Звездная ночь' Винсентом Ван Гогом, одного из самых известных произведений в истории искусства." },
      { "date": "1917", "description": "Выставка произведения Марселя Дюшана 'Фонтан', которое стало знаковым в истории концептуального искусства." },
      { "date": "1937", "description": "Открытие Музея современного искусства в Нью-Йорке, ставшего важным центром для американского искусства." },
      { "date": "1950", "description": "Начало распространения абстракционизма в живописи с работами таких художников, как Джексон Поллок." },
      { "date": "1960", "description": "Создание первых поп-арт произведений, таких как работы Энди Уорхола, которые изменили восприятие искусства." },
      { "date": "2000", "description": "Возрождение интереса к уличному искусству с признанием художников, таких как Бэнкси, на международной арене." }
    ]},
    { label: "Спорт ", year: 1990, index: 5, events: [
      { "date": "1960", "description": "Выход в эфир Олимпийских игр в Риме, первых Олимпиад, транслируемых по телевидению." },
    { "date": "1980", "description": "Знаковая победа США над СССР в хоккейном финале на зимних Олимпийских играх в Лейк-Плэсиде." },
    { "date": "1992", "description": "Запуск Dream Team на Олимпийских играх в Барселоне, первой сборной США по баскетболу с профессиональными игроками НБА." },
    { "date": "2008", "description": "Золотая Олимпиада Майкла Фелпса на Пекинских играх, где он выиграл 8 золотых медалей." },
    { "date": "2016", "description": "Историческая победа Ямайки на Олимпийских играх в Рио-де-Жанейро, с новым рекордом Усейна Болта в беге на 100 метров." },
    { "date": "2020", "description": "Олимпийские игры в Токио, перенесенные из-за пандемии COVID-19, что стало беспрецедентным событием в истории Олимпийского движения." }
    ]},
    { label: "Политика", year: 1990, index: 6, events: [
      { date: "1991", description: "Событие 1: Расширение команды." },
      { date: "1992", description: "Событие 2: Презентация нового продукта." },
      { date: "1993", description: "Событие 3: Выход на рынок США." },
      { date: "1994", description: "Событие 4: Награды в отрасли." },
      { date: "1995", description: "Событие 5: Признание на международной арене." },
      { date: "1996", description: "Событие 6: Рост прибыли." }
    ]},
  ];
  
  return (
  <>
  <div className="line-container">
  <div className="line vertical-line left-line"></div>
  <div className="line vertical-line right-line"></div>
  <div className="line horizontal-line"></div>
  <div className="line vertical-line center-vertical-line"></div>
</div>
  <div className='container'>
    <div className="timeline-block">
      <div className="timeline-header">
        <div className="timeline-marker"></div>
        <h2 className='timeline-title'>Исторические<br/> даты</h2>
    </div>
  <div className="timeline-circle">
    <TimelineCircle pointsData={pointsData} />
  </div>
    </div>
  </div>
  </>
  )
}