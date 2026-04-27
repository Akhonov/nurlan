import { useEffect, useId, useState } from 'react'
import { directoryMapMeta, directoryMapRegions } from './directoryMap.js'

const baseUrl = import.meta.env.BASE_URL

const routes = [
  { path: '/', label: 'Главная' },
  { path: '/company', label: 'Компания' },
  { path: '/partners', label: 'Партнерам' },
  { path: '/quality', label: 'Качество' },
  { path: '/network', label: 'Сеть' },
  { path: '/career', label: 'Карьера' },
  { path: '/contacts', label: 'Контакты' },
]

const metrics = [
  { value: '2003', label: 'год основания' },
  { value: '200+', label: 'прямых контрактов' },
  { value: '1 200 м3', label: 'обработки в день' },
  { value: '1 500', label: 'позиций ежедневно' },
]

const priorities = [
  {
    title: 'Федеральная точность, локальная близость',
    text: 'Филиальная сеть помогает держать единый стандарт поставок и быстро отвечать на запросы аптек, клиник и производителей.',
  },
  {
    title: 'Качество без пауз',
    text: 'ISO, GDP-процессы, контроль документации и работа с претензиями встроены в ежедневную операционную модель.',
  },
  {
    title: 'Партнерство на годы',
    text: 'Компания развивает долгосрочные отношения с международными и казахстанскими брендами, делая цепочку поставки устойчивой.',
  },
]

const serviceTracks = [
  {
    kicker: 'Производителям',
    title: 'Выход на рынок Казахстана через управляемую дистрибуционную сеть',
    text: 'Помогаем выстроить национальное покрытие, ритм отгрузок, прозрачный документооборот и стабильную коммуникацию с филиалами.',
    points: ['национальное покрытие', 'контроль остатков', 'регулярные поставки', 'быстрое масштабирование'],
  },
  {
    kicker: 'Аптекам и клиникам',
    title: 'Надежный канал поставки лекарственных средств и медицинских изделий',
    text: 'Единые стандарты сервиса и логистики снижают риск разрывов в ассортименте и помогают планировать закупки заранее.',
    points: ['оперативная связь', 'единый стандарт', 'документы в порядке', 'прогнозируемые сроки'],
  },
  {
    kicker: 'Команде',
    title: 'Среда, где процессы, обучение и культура поддерживают рост',
    text: 'Сильная внутренняя школа, командные традиции и современный управленческий подход превращают масштаб в преимущество.',
    points: ['обучение', 'карьерные маршруты', 'бережливые практики', 'корпоративная культура'],
  },
]

const qualityItems = [
  {
    year: '2008',
    title: 'Регулярные ISO-аудиты',
    text: 'Система менеджмента качества развивается как постоянный цикл: проверка, улучшение, внедрение и повторная оценка.',
  },
  {
    year: '2009',
    title: 'Фокус на GDP',
    text: 'Дистрибуция строится вокруг правильного хранения, транспортировки, прослеживаемости и ответственности на каждом этапе.',
  },
  {
    year: 'Сегодня',
    title: 'Цифровой контроль',
    text: 'Команда использует современные информационные и логистические инструменты для управления товарными потоками.',
  },
]

const branches = [
  {
    id: 'kostanay',
    city: 'Костанай',
    branch: 'Головной офис',
    address: 'пр. Аль-Фараби 111 А',
    phone: '+7 (7142) 91-77-10',
  },
  {
    id: 'astana',
    city: 'Астана',
    branch: 'Астанинский филиал',
    address: 'р-н Алматы, ул. А 207, здание 9',
    phone: '+7 (7142) 91-77-10',
  },
  {
    id: 'almaty',
    city: 'Алматы',
    branch: 'Алматинский филиал',
    address: 'мкр. Каргалы, ул. Кенесары хана, 83/1',
    phone: '+7 (7142) 91-77-10',
  },
  {
    id: 'karaganda',
    city: 'Караганда',
    branch: 'Карагандинский филиал',
    address: 'ул. Новогородская, 2а',
    phone: '+7 (7142) 91-77-10',
  },
  {
    id: 'aktobe',
    city: 'Актобе',
    branch: 'Актюбинский филиал',
    address: '41 разъезд, 114',
    phone: '+7 (7142) 91-77-10',
  },
  {
    id: 'atyrau',
    city: 'Атырау',
    branch: 'Атырауский филиал',
    address: 'ул. Азаттык, 116 А',
    phone: '+7 (7142) 91-77-10',
  },
  {
    id: 'aktau',
    city: 'Актау',
    branch: 'Актауский филиал',
    address: 'промышленная зона N 9, участок N 29',
    phone: '+7 (7142) 91-77-10',
  },
  {
    id: 'pavlodar',
    city: 'Павлодар',
    branch: 'Павлодарский филиал',
    address: 'ул. Комбинатская, 35',
    phone: '+7 (7142) 91-77-10',
  },
  {
    id: 'petropavlovsk',
    city: 'Петропавловск',
    branch: 'Петропавловский филиал',
    address: 'ул. Шухова, 18',
    phone: '+7 (7142) 91-77-10',
  },
  {
    id: 'kokshetau',
    city: 'Кокшетау',
    branch: 'Кокшетауский филиал',
    address: 'п.з. Северная, пр-д 3, ст-е 62',
    phone: '+7 (7142) 91-77-10',
  },
  {
    id: 'uralsk',
    city: 'Уральск',
    branch: 'Уральский филиал',
    address: 'ул. Поповича, 12',
    phone: '+7 (7142) 91-77-10',
  },
  {
    id: 'ust-kamenogorsk',
    city: 'Усть-Каменогорск',
    branch: 'Усть-Каменогорский филиал',
    address: 'пр. Сатпаева, 62',
    phone: '+7 (7142) 91-77-10',
  },
  {
    id: 'shymkent',
    city: 'Шымкент',
    branch: 'Шымкентский филиал',
    address: 'ул. Капал Батыра, территория Ондиристик, N 116/2',
    phone: '+7 (7142) 91-77-10',
  },
  {
    id: 'taraz',
    city: 'Тараз',
    branch: 'Таразский филиал',
    address: '1 микрорайон Акбулак, дом 21',
    phone: '+7 (7142) 91-77-10',
  },
  {
    id: 'kyzylorda',
    city: 'Кызылорда',
    branch: 'Кызылординский филиал',
    address: 'пр. Абая, угол ул. Садуакасова',
    phone: '+7 (7142) 91-77-10',
  },
]

const cultureCards = [
  {
    title: 'Школа роста',
    text: 'Обучение, наставничество и управленческие практики помогают сотрудникам двигаться по вертикали и горизонтали.',
  },
  {
    title: 'Командный ритм',
    text: 'Филиалы работают как единая команда: с общими стандартами, традициями и понятной ответственностью.',
  },
  {
    title: 'Открытые роли',
    text: 'Сайт готов к публикации вакансий: логистика, продажи, качество, складские процессы и офисные направления.',
  },
]

const partnerBrands = [
  {
    name: 'Johnson & Johnson',
    caption: 'innovative medicine',
    logo: `${baseUrl}partner-logos/johnson-johnson.svg`,
  },
  {
    name: 'AstraZeneca',
    caption: 'biopharmaceuticals',
    logo: `${baseUrl}partner-logos/astrazeneca.svg`,
  },
  {
    name: 'Abbott Laboratories',
    caption: 'healthcare products',
    logo: `${baseUrl}partner-logos/abbott.svg`,
  },
  {
    name: 'SANTO',
    caption: 'Kazakhstan pharma',
    logo: `${baseUrl}partner-logos/santo.svg`,
  },
  {
    name: 'Berlin-Chemie',
    caption: 'European portfolio',
    logo: `${baseUrl}partner-logos/berlin-chemie.jpg`,
  },
  {
    name: 'Sandoz',
    caption: 'generics & biosimilars',
    logo: `${baseUrl}partner-logos/sandoz.svg`,
  },
  {
    name: 'Bionorica',
    caption: 'phytomedicine',
    logo: `${baseUrl}partner-logos/bionorica.svg`,
  },
]

function getRouteFromHash() {
  const rawRoute = window.location.hash.replace(/^#/, '') || '/'
  return routes.some((route) => route.path === rawRoute) ? rawRoute : '/'
}

function App() {
  const [activePath, setActivePath] = useState(getRouteFromHash)

  useEffect(() => {
    const handleHashChange = () => {
      setActivePath(getRouteFromHash())
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  const Page = pageMap[activePath] ?? HomePage

  return (
    <div className="site-shell">
      <SiteHeader activePath={activePath} />
      <main>
        <Page />
      </main>
      <SiteFooter />
    </div>
  )
}

function SiteHeader({ activePath }) {
  return (
    <header className="site-header">
      <a className="brand" href="#/" aria-label="STOFARM - главная">
        <StofarmLogo />
        <span>
          <strong>STOFARM</strong>
          <small>фармацевтическая дистрибуция</small>
        </span>
      </a>

      <nav className="main-nav" aria-label="Основная навигация">
        {routes.map((route) => (
          <a
            className={activePath === route.path ? 'active' : ''}
            href={`#${route.path}`}
            key={route.path}
          >
            {route.label}
          </a>
        ))}
      </nav>

      <a className="header-cta" href="#/contacts">
        Связаться
      </a>
    </header>
  )
}

function HomePage() {
  return (
    <>
      <section className="hero page-pad">
        <div className="hero-copy reveal">
          <span className="eyebrow">Казахстанская фармацевтическая компания</span>
          <h1>Национальная дистрибуция лекарств с технологичным лицом</h1>
          <p>
            STOFARM объединяет филиальную сеть, стандарты качества и прямые партнерства с
            производителями, чтобы поставки медицинской продукции были точными, устойчивыми и
            прозрачными.
          </p>
          <div className="hero-actions">
            <a className="button primary" href="#/partners">
              Для партнеров
            </a>
            <a className="button secondary" href="#/quality">
              Сертификаты
            </a>
          </div>
        </div>

        <div className="hero-visual reveal delay-1" aria-label="3D фармацевтическая капсула">
          <PharmaObject />
        </div>
      </section>

      <MetricBand />

      <section className="section page-pad">
        <SectionHeading
          eyebrow="Позиционирование"
          title="Сайт выглядит как современная фарм-платформа, а не просто визитка"
          text="У конкурентов сильны факты и доверие. Мы сохраняем это ядро, но добавляем визуальную систему, отдельные сценарии для аудиторий и запоминающийся технологичный образ."
        />
        <div className="card-grid three">
          {priorities.map((item) => (
            <article className="glass-card" key={item.title}>
              <span className="card-icon">+</span>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="split-section page-pad">
        <div className="split-card deep-blue">
          <span className="eyebrow">Сильная сторона</span>
          <h2>Логистика, качество и партнерство собраны в один маршрут</h2>
          <p>
            Главная идея нового сайта: показать STOFARM как инфраструктурную компанию, которая
            помогает рынку работать спокойнее, быстрее и предсказуемее.
          </p>
          <a className="text-link" href="#/network">
            Посмотреть сеть филиалов
          </a>
        </div>
        <div className="signal-panel">
          <span className="signal-dot red" />
          <span className="signal-dot blue" />
          <span className="signal-dot white" />
          <h3>Единый контур поставки</h3>
          <p>От производителя до филиала, от филиала до клиента, от документа до контроля качества.</p>
        </div>
      </section>
    </>
  )
}

function CompanyPage() {
  return (
    <PageLayout
      eyebrow="Компания"
      title="STOFARM: масштаб национальной сети и характер команды"
      lead="Компания работает на фармацевтическом рынке Казахстана с 2003 года и развивает модель, где надежность поставок поддерживается людьми, процессами и технологией."
    >
      <div className="story-grid">
        <article className="story-card feature">
          <span>01</span>
          <h2>Республиканская сеть</h2>
          <p>
            Филиалы и склады в ключевых городах Казахстана помогают компании быть ближе к клиентам
            и поддерживать стабильную логистику по всей стране.
          </p>
        </article>
        <article className="story-card">
          <span>02</span>
          <h2>Партнерский портфель</h2>
          <p>
            Более 200 прямых контактов с производителями укрепляют ассортимент и делают STOFARM
            заметным игроком для международных брендов.
          </p>
        </article>
        <article className="story-card">
          <span>03</span>
          <h2>Культура качества</h2>
          <p>
            Стандарты ISO и GDP превращены в ежедневную практику: от обработки заявок до хранения,
            отгрузки и работы с обратной связью.
          </p>
        </article>
      </div>

      <section className="section compact">
        <SectionHeading
          eyebrow="Бренд-принцип"
          title="Стабильность. Надежность. Качество."
          text="Эти три слова стали основой визуальной системы: красный отвечает за энергию и ответственность, синий - за технологичность и доверие, белый - за чистоту и прозрачность."
        />
        <div className="brand-system">
          <div className="color-chip red-chip">Ответственность</div>
          <div className="color-chip blue-chip">Технологичность</div>
          <div className="color-chip white-chip">Прозрачность</div>
        </div>
      </section>

      <section className="section compact">
        <SectionHeading
          eyebrow="Партнеры"
          title="Бренды, с которыми можно строить долгую цепочку доверия"
        />
        <div className="logo-cloud">
          {partnerBrands.map((brand) => (
            <article className="partner-logo-card" key={brand.name}>
              <div className="partner-logo-frame">
                <img src={brand.logo} alt={`${brand.name} logo`} loading="lazy" />
              </div>
              <strong>{brand.name}</strong>
              <small>{brand.caption}</small>
            </article>
          ))}
        </div>
      </section>
    </PageLayout>
  )
}

function PartnersPage() {
  return (
    <PageLayout
      eyebrow="Партнерам"
      title="Разные аудитории, один высокий стандарт взаимодействия"
      lead="Страница разделена по сценариям: производителям важно покрытие и прозрачность, аптекам и клиникам - сроки и ассортимент, команде - рост и понятные процессы."
    >
      <div className="service-stack">
        {serviceTracks.map((track, index) => (
          <article className="service-card" key={track.title}>
            <div className="service-index">{String(index + 1).padStart(2, '0')}</div>
            <div>
              <span className="eyebrow">{track.kicker}</span>
              <h2>{track.title}</h2>
              <p>{track.text}</p>
              <div className="tag-row">
                {track.points.map((point) => (
                  <span key={point}>{point}</span>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>

      <section className="process-panel">
        <SectionHeading
          eyebrow="Маршрут сотрудничества"
          title="От первого обращения до стабильного операционного ритма"
        />
        <div className="process-grid">
          {['Диалог', 'Документы', 'Договор', 'Поставка', 'Контроль'].map((step, index) => (
            <div className="process-step" key={step}>
              <span>{index + 1}</span>
              <strong>{step}</strong>
            </div>
          ))}
        </div>
      </section>
    </PageLayout>
  )
}

function QualityPage() {
  return (
    <PageLayout
      eyebrow="Качество"
      title="Система качества, которую можно показать не только текстом"
      lead="Вместо сухой страницы сертификатов здесь собраны стандарты, документы и объяснение, почему контроль качества важен для всей цепочки поставки."
    >
      <div className="quality-hero">
        <div>
          <h2>ISO / GDP контур</h2>
          <p>
            Сертификаты и регулярные аудиты помогают поддерживать единый уровень хранения,
            обработки и транспортировки фармацевтической продукции.
          </p>
          <div className="document-row">
            <a className="document-link" href={`${baseUrl}iso.pdf`} target="_blank" rel="noreferrer">
              Открыть ISO
            </a>
            <a className="document-link" href={`${baseUrl}gdp.pdf`} target="_blank" rel="noreferrer">
              Открыть GDP
            </a>
          </div>
        </div>
        <div className="mini-lab" aria-hidden="true">
          <PharmaObject compact />
        </div>
      </div>

      <div className="timeline">
        {qualityItems.map((item) => (
          <article className="timeline-item" key={item.title}>
            <span>{item.year}</span>
            <h3>{item.title}</h3>
            <p>{item.text}</p>
          </article>
        ))}
      </div>

      <section className="assurance-grid">
        <article>
          <h3>Фармаконадзор</h3>
          <p>Отдельный канал для информации о нежелательных реакциях и безопасности продукции.</p>
        </article>
        <article>
          <h3>Антикоррупционный контур</h3>
          <p>Прозрачные правила взаимодействия с партнерами, поставщиками и клиентами.</p>
        </article>
        <article>
          <h3>Претензионная работа</h3>
          <p>Для обращений по качеству предусмотрен отдельный контакт: pretenz@stopharm.kz.</p>
        </article>
      </section>
    </PageLayout>
  )
}

function NetworkPage() {
  const [selectedId, setSelectedId] = useState('kostanay')
  const selectedBranch = branches.find((branch) => branch.id === selectedId) ?? branches[0]

  return (
    <PageLayout
      eyebrow="Сеть филиалов"
      title="Карта присутствия, которая сразу показывает масштаб"
      lead="Интерактивная карта делает страницу филиалов не справочником, а понятной визуальной системой национального покрытия."
    >
      <div className="network-layout">
        <KazakhstanMap selectedId={selectedId} onSelect={setSelectedId} />
        <aside className="branch-focus">
          <span className="eyebrow">Выбранный филиал</span>
          <h2>{selectedBranch.city}</h2>
          <p>{selectedBranch.branch}</p>
          <dl>
            <div>
              <dt>Адрес</dt>
              <dd>{selectedBranch.address}</dd>
            </div>
            <div>
              <dt>Телефон</dt>
              <dd>{selectedBranch.phone}</dd>
            </div>
          </dl>
        </aside>
      </div>

      <div className="branch-grid">
        {branches.map((branch) => (
          <button
            className={branch.id === selectedId ? 'branch-card active' : 'branch-card'}
            key={branch.id}
            onClick={() => setSelectedId(branch.id)}
            type="button"
          >
            <strong>{branch.city}</strong>
            <span>{branch.address}</span>
          </button>
        ))}
      </div>
    </PageLayout>
  )
}

function CareerPage() {
  return (
    <PageLayout
      eyebrow="Карьера"
      title="Современная компания должна показывать не только бизнес, но и людей"
      lead="Карьерная страница собирает культуру, обучение и будущие вакансии в один живой раздел, который можно расширять по мере появления новых ролей."
    >
      <div className="career-hero">
        <div>
          <h2>Одна команда, много городов</h2>
          <p>
            STOFARM растет благодаря специалистам, которые соединяют фармацевтическую экспертизу,
            аккуратность в процессах и уважение к партнеру.
          </p>
        </div>
        <a className="button primary" href="#/contacts">
          Отправить резюме
        </a>
      </div>

      <div className="card-grid three">
        {cultureCards.map((card) => (
          <article className="glass-card" key={card.title}>
            <span className="card-icon">S</span>
            <h3>{card.title}</h3>
            <p>{card.text}</p>
          </article>
        ))}
      </div>

      <section className="vacancy-panel">
        <span className="eyebrow">Готовые блоки для вакансий</span>
        <h2>Можно быстро добавить реальные позиции</h2>
        <div className="vacancy-list">
          {['Менеджер по работе с клиентами', 'Специалист склада', 'Координатор качества'].map(
            (vacancy) => (
              <div className="vacancy-item" key={vacancy}>
                <strong>{vacancy}</strong>
                <span>Костанай / регионы</span>
              </div>
            ),
          )}
        </div>
      </section>
    </PageLayout>
  )
}

function ContactsPage() {
  const handleSubmit = (event) => {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    const name = formData.get('name')?.toString().trim() || 'Не указано'
    const contact = formData.get('contact')?.toString().trim() || 'Не указано'
    const message = formData.get('message')?.toString().trim() || 'Без сообщения'
    const body = [
      'Здравствуйте, команда STOFARM!',
      '',
      `Имя: ${name}`,
      `Контакт: ${contact}`,
      '',
      'Сообщение:',
      message,
    ].join('\n')

    window.location.href = `mailto:kanc@stopharm.kz?subject=${encodeURIComponent(
      'Обращение с сайта STOFARM',
    )}&body=${encodeURIComponent(body)}`
  }

  return (
    <PageLayout
      eyebrow="Контакты"
      title="Все ключевые каналы связи на одной спокойной странице"
      lead="Контакты сделаны как современный офисный экран: быстро найти телефон, email, адрес головного офиса и направление обращения."
    >
      <div className="contact-grid">
        <article className="contact-card main-contact">
          <span className="eyebrow">Головной офис</span>
          <h2>Костанай, пр. Аль-Фараби 111 А</h2>
          <p>Телефон: +7 (7142) 91-77-10</p>
          <p>Телефон доверия: +7 (7142) 91-77-32</p>
        </article>
        <article className="contact-card">
          <h3>Канцелярия</h3>
          <a href="mailto:kanc@stopharm.kz">kanc@stopharm.kz</a>
        </article>
        <article className="contact-card">
          <h3>Претензии</h3>
          <a href="mailto:pretenz@stopharm.kz">pretenz@stopharm.kz</a>
        </article>
      </div>

      <form className="contact-form" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Имя</label>
          <input id="name" name="name" placeholder="Как к вам обращаться" type="text" />
        </div>
        <div>
          <label htmlFor="phone">Телефон или email</label>
          <input id="phone" name="contact" placeholder="+7..." type="text" />
        </div>
        <div className="wide">
          <label htmlFor="message">Сообщение</label>
          <textarea id="message" name="message" placeholder="Коротко опишите вопрос" rows="5" />
        </div>
        <button className="button primary" type="submit">
          Подготовить обращение
        </button>
      </form>
    </PageLayout>
  )
}

function PageLayout({ children, eyebrow, lead, title }) {
  return (
    <>
      <section className="page-hero page-pad">
        <span className="eyebrow">{eyebrow}</span>
        <h1>{title}</h1>
        {lead ? <p>{lead}</p> : null}
      </section>
      <div className="page-content page-pad">{children}</div>
    </>
  )
}

function MetricBand() {
  return (
    <section className="metric-band page-pad" aria-label="Ключевые показатели">
      {metrics.map((metric) => (
        <div className="metric" key={metric.label}>
          <strong>{metric.value}</strong>
          <span>{metric.label}</span>
        </div>
      ))}
    </section>
  )
}

function SectionHeading({ eyebrow, text, title }) {
  return (
    <div className="section-heading">
      {eyebrow ? <span className="eyebrow">{eyebrow}</span> : null}
      <h2>{title}</h2>
      {text ? <p>{text}</p> : null}
    </div>
  )
}

function PharmaObject({ compact = false }) {
  return (
    <div className={compact ? 'pharma-object compact' : 'pharma-object'}>
      <div className="orbital orbital-one" />
      <div className="orbital orbital-two" />
      <div className="orbital orbital-three" />
      <div className="capsule">
        <span className="capsule-depth" />
        <span className="capsule-body">
          <span className="capsule-half red-half" />
          <span className="capsule-half blue-half" />
          <span className="capsule-seam" />
          <span className="capsule-glass" />
          <span className="capsule-shine capsule-shine-main" />
          <span className="capsule-shine capsule-shine-tip" />
        </span>
      </div>
      <span className="molecule node-one" />
      <span className="molecule node-two" />
      <span className="molecule node-three" />
      <span className="molecule node-four" />
      <div className="shadow-disc" />
    </div>
  )
}

function KazakhstanMap({ onSelect, selectedId }) {
  const visibleRegions = directoryMapRegions.filter((region) =>
    branches.some((branch) => branch.id === region.id),
  )

  return (
    <div className="map-panel">
      <svg
        aria-label="Карта филиалов Казахстана"
        className="kazakhstan-map"
        role="img"
        viewBox={directoryMapMeta.viewBox}
      >
        <g className="map-shadow-layer" aria-hidden="true">
          {visibleRegions.map((region) => (
            <path d={region.path} key={`${region.id}-shadow`} />
          ))}
        </g>
        {visibleRegions.map((region) => {
          const branch = branches.find((item) => item.id === region.id)

          return (
            <g key={region.id}>
              <path
                className={selectedId === region.id ? 'map-region active' : 'map-region'}
                d={region.path}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault()
                    onSelect(region.id)
                  }
                }}
                onClick={() => onSelect(region.id)}
                role="button"
                tabIndex="0"
              />
              <text className="map-label" x={region.labelX} y={region.labelY}>
                {branch?.city}
              </text>
            </g>
          )
        })}
      </svg>
    </div>
  )
}

function SiteFooter() {
  return (
    <footer className="site-footer page-pad">
      <div>
        <a className="brand footer-brand" href="#/">
          <StofarmLogo />
          <span>
            <strong>STOFARM</strong>
            <small>2003-{new Date().getFullYear()}</small>
          </span>
        </a>
        <p>Национальная фармацевтическая дистрибуция с акцентом на качество и партнерство.</p>
      </div>
      <div className="footer-links">
        <a href="#/quality">ISO / GDP</a>
        <a href="#/network">Филиалы</a>
        <a href="#/contacts">Контакты</a>
      </div>
    </footer>
  )
}

function StofarmLogo() {
  const gradientId = useId().replace(/:/g, '')

  return (
    <span className="brand-mark brand-logo" aria-hidden="true">
      <svg viewBox="0 0 64 64" role="img">
        <defs>
          <linearGradient id={`${gradientId}-brand`} x1="8" x2="56" y1="8" y2="56">
            <stop offset="0" stopColor="#e31b35" />
            <stop offset="0.52" stopColor="#ffffff" />
            <stop offset="1" stopColor="#0b3d91" />
          </linearGradient>
        </defs>
        <path
          className="logo-shield"
          d="M32 5 52 13v17c0 13.8-7.9 23.3-20 29-12.1-5.7-20-15.2-20-29V13L32 5Z"
        />
        <path
          className="logo-pill"
          d="M20.8 34.2c-3.4-3.4-3.4-8.9 0-12.3s8.9-3.4 12.3 0l10.1 10.1c3.4 3.4 3.4 8.9 0 12.3s-8.9 3.4-12.3 0L20.8 34.2Z"
          fill={`url(#${gradientId}-brand)`}
        />
        <path className="logo-cut" d="m31.5 20.8-11 11" />
        <path className="logo-cross" d="M41.5 18v10M36.5 23h10" />
      </svg>
    </span>
  )
}

const pageMap = {
  '/': HomePage,
  '/company': CompanyPage,
  '/partners': PartnersPage,
  '/quality': QualityPage,
  '/network': NetworkPage,
  '/career': CareerPage,
  '/contacts': ContactsPage,
}

export default App
