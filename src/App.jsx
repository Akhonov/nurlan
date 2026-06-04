import { Component, lazy, Suspense, useEffect, useMemo, useState } from 'react'

const SiteExperience3D = lazy(() => import('./SiteExperience3D.jsx'))
const baseUrl = import.meta.env.BASE_URL

const navItems = [
  { id: 'home', href: '#/', label: 'Главная' },
  { id: 'company', href: '#/company', label: 'Компания' },
  { id: 'suppliers', href: '#/suppliers', label: 'Поставщикам' },
  { id: 'quality', href: '#/quality', label: 'Качество' },
  { id: 'network', href: '#/network', label: 'Сеть' },
  { id: 'partners', href: '#/partners', label: 'Партнеры' },
  { id: 'contacts', href: '#/contacts', label: 'Контакты' },
]

const metrics = [
  { value: '2003', label: 'на рынке' },
  { value: '200+', label: 'прямых контрактов' },
  { value: 'ISO / GDP', label: 'контроль качества' },
  { value: '15', label: 'городов присутствия' },
]

const capabilityCards = [
  {
    route: 'company',
    eyebrow: 'Company',
    title: 'Системный дистрибьютор',
    text: 'Поставки, документы и качество работают в едином деловом стандарте.',
  },
  {
    route: 'suppliers',
    eyebrow: 'Manufacturers',
    title: 'Вход для продукта',
    text: 'Понятный маршрут для производителей: портфель, условия, документы, запуск.',
  },
  {
    route: 'quality',
    eyebrow: 'Quality',
    title: 'ISO / GDP',
    text: 'Контроль хранения, транспортировки, прослеживаемости и претензионной работы.',
  },
  {
    route: 'network',
    eyebrow: 'Coverage',
    title: 'Национальная сеть',
    text: 'Филиалы в ключевых городах Казахстана поддерживают стабильность поставок.',
  },
  {
    route: 'partners',
    eyebrow: 'Partnership',
    title: 'Фарм-бренды',
    text: 'Деловое взаимодействие с производителями и аптечно-медицинским рынком.',
  },
  {
    route: 'contacts',
    eyebrow: 'Business',
    title: 'Официальные каналы',
    text: 'Контакты для поставок, документов, предложений и претензионной работы.',
  },
]

const branches = [
  'Костанай',
  'Астана',
  'Алматы',
  'Караганда',
  'Актобе',
  'Атырау',
  'Актау',
  'Павлодар',
  'Петропавловск',
  'Кокшетау',
  'Уральск',
  'Усть-Каменогорск',
  'Шымкент',
  'Тараз',
  'Кызылорда',
]

const partnerBrands = [
  { name: 'Johnson & Johnson', logo: `${baseUrl}partner-logos/johnson-johnson.svg` },
  { name: 'AstraZeneca', logo: `${baseUrl}partner-logos/astrazeneca.svg` },
  { name: 'Abbott', logo: `${baseUrl}partner-logos/abbott.svg` },
  { name: 'SANTO', logo: `${baseUrl}partner-logos/santo.svg` },
  { name: 'Berlin-Chemie', logo: `${baseUrl}partner-logos/berlin-chemie.jpg` },
  { name: 'Sandoz', logo: `${baseUrl}partner-logos/sandoz.svg` },
  { name: 'Bionorica', logo: `${baseUrl}partner-logos/bionorica.svg` },
]

const contactCards = [
  {
    label: 'Головной офис',
    value: 'Костанай, пр. Аль-Фараби 111 А',
    detail: 'Республика Казахстан',
  },
  {
    label: 'Телефон',
    value: '+7 (7142) 91-77-10',
    detail: 'приемная и деловые обращения',
    href: 'tel:+77142917710',
  },
  {
    label: 'Канцелярия',
    value: 'kanc@stopharm.kz',
    detail: 'официальная корреспонденция',
    href: 'mailto:kanc@stopharm.kz',
  },
  {
    label: 'Поставщикам',
    value: 'kanc@stopharm.kz',
    detail: 'предложения по продуктам и портфелю',
    href: 'mailto:kanc@stopharm.kz?subject=%D0%9F%D1%80%D0%B5%D0%B4%D0%BB%D0%BE%D0%B6%D0%B5%D0%BD%D0%B8%D0%B5%20%D0%BF%D0%BE%D1%81%D1%82%D0%B0%D0%B2%D1%89%D0%B8%D0%BA%D0%B0',
  },
  {
    label: 'Претензии',
    value: 'pretenz@stopharm.kz',
    detail: 'качество, документы, поставки',
    href: 'mailto:pretenz@stopharm.kz',
  },
]

const detailPages = {
  company: {
    eyebrow: 'Company',
    title: 'Инфраструктура для фарм-рынка',
    lead:
      'СТОФАРМ работает как национальный фармацевтический дистрибьютор: надежность поставок, точность документов и контроль качества являются рабочим стандартом.',
    stats: [
      { value: '2003', label: 'год основания' },
      { value: 'B2B', label: 'деловая модель' },
      { value: 'Костанай', label: 'головной офис' },
    ],
    blocks: [
      {
        title: 'Профиль',
        text: 'Поставки лекарственных средств и изделий медицинского назначения для аптечных и медицинских организаций.',
      },
      {
        title: 'Роль бренда',
        text: 'Сайт должен транслировать спокойную, точную и регуляторно грамотную компанию.',
      },
      {
        title: 'Коммуникационная формула',
        text: 'Системность в поставках. Точность в документах. Ответственность в каждом контакте.',
      },
    ],
    checkpoints: ['надежность', 'договорная дисциплина', 'документальная прозрачность', 'операционный контроль'],
  },
  suppliers: {
    eyebrow: 'Manufacturers',
    title: 'Поставщикам и производителям',
    lead:
      'Раздел для первичного делового контакта: продуктовый портфель, регистрационные документы, коммерческие условия и запуск поставок.',
    stats: [
      { value: '01', label: 'портфель' },
      { value: '02', label: 'документы' },
      { value: '03', label: 'условия' },
    ],
    blocks: [
      {
        title: 'Что подготовить',
        text: 'Каталог SKU, терапевтические группы, формы выпуска, условия хранения, сертификаты и прогнозируемые объемы.',
      },
      {
        title: 'Как направить',
        text: 'Коммерческое предложение отправляется на официальный email канцелярии с темой письма по продукту.',
      },
      {
        title: 'Что дальше',
        text: 'Команда оценивает документы, условия, логистику и возможность включения продукта в рабочий портфель.',
      },
    ],
    checkpoints: ['регистрация', 'качество', 'хранение', 'сроки', 'договор'],
  },
  quality: {
    eyebrow: 'Quality',
    title: 'Качество и прослеживаемость',
    lead:
      'Качество не подается как обещание. Оно подтверждается процедурами, документами, стандартами ISO/GDP и ответственными процессами.',
    stats: [
      { value: 'ISO', label: 'система качества' },
      { value: 'GDP', label: 'дистрибуция' },
      { value: '24/7', label: 'контроль процедур' },
    ],
    blocks: [
      {
        title: 'Документы',
        text: 'Сертификаты, договоры, инструкции, сроки годности и условия хранения фиксируются в единой логике контроля.',
      },
      {
        title: 'Маршрут',
        text: 'Товар проходит через склад, отгрузку и доставку с понятными контрольными точками.',
      },
      {
        title: 'Подтверждения',
        text: 'Открытые сертификаты ISO и GDP доступны на сайте как деловой реквизит.',
      },
    ],
    checkpoints: ['ISO', 'GDP', 'претензии', 'аудит', 'версионность'],
    actions: [
      { label: 'Открыть ISO', href: `${baseUrl}iso.pdf` },
      { label: 'Открыть GDP', href: `${baseUrl}gdp.pdf` },
    ],
  },
  network: {
    eyebrow: 'Coverage',
    title: 'Филиальная сеть',
    lead:
      'География присутствия помогает поддерживать поставки в ключевых регионах Казахстана и работать ближе к клиентам.',
    stats: [
      { value: '15', label: 'городов' },
      { value: '1', label: 'единый стандарт' },
      { value: 'KZ', label: 'национальный охват' },
    ],
    blocks: [
      {
        title: 'Координация',
        text: 'Головной офис задает единый деловой стандарт для филиалов, документов и внешних обращений.',
      },
      {
        title: 'Региональный доступ',
        text: 'Сеть поддерживает взаимодействие с аптечными, медицинскими и производственными партнерами.',
      },
      {
        title: 'Маршрут поставки',
        text: 'Складская ячейка, контрольная точка, документ и доставка связаны общей логикой прослеживаемости.',
      },
    ],
    checkpoints: branches,
  },
  partners: {
    eyebrow: 'Partnership',
    title: 'Партнерская среда',
    lead:
      'Раздел показывает деловой контекст STOFARM: производители, фармацевтические бренды, клиенты и профессиональные участники рынка.',
    stats: [
      { value: '200+', label: 'контрактов' },
      { value: 'B2B', label: 'партнерство' },
      { value: 'KZ', label: 'рынок Казахстана' },
    ],
    blocks: [
      {
        title: 'Производители',
        text: 'Взаимодействие строится на понятных условиях, документах, ответственном запуске и последующем контроле.',
      },
      {
        title: 'Клиенты',
        text: 'Аптечные и медицинские организации получают поставки через управляемую инфраструктуру.',
      },
      {
        title: 'Деловой принцип',
        text: 'Никакого визуального шума: только факты, реквизиты, стандарты и подтвержденные каналы связи.',
      },
    ],
    checkpoints: partnerBrands.map((partner) => partner.name),
  },
  contacts: {
    eyebrow: 'Business contact',
    title: 'Контакты STOFARM',
    lead:
      'Официальные каналы для деловой корреспонденции, поставщиков, документов, качества и претензионной работы.',
    stats: [
      { value: '+7', label: 'Казахстан' },
      { value: 'Email', label: 'официально' },
      { value: 'HQ', label: 'Костанай' },
    ],
    blocks: [
      {
        title: 'Официальная переписка',
        text: 'Для входящих документов и деловой корреспонденции используется канал канцелярии.',
      },
      {
        title: 'Поставщики',
        text: 'Предложения по продуктам направляются отдельным письмом с темой по портфелю.',
      },
      {
        title: 'Качество',
        text: 'Вопросы по претензиям и документам направляются на профильный адрес.',
      },
    ],
    checkpoints: ['канцелярия', 'поставки', 'качество', 'документы', 'претензии'],
  },
}

function getPageFromHash() {
  const hash = window.location.hash.replace(/^#\/?/, '')
  const page = hash || 'home'
  return navItems.some((item) => item.id === page) ? page : 'home'
}

function App() {
  const [currentPage, setCurrentPage] = useState(getPageFromHash)
  const detailPage = useMemo(() => detailPages[currentPage], [currentPage])

  useEffect(() => {
    const syncPage = () => {
      setCurrentPage(getPageFromHash())
      window.scrollTo(0, 0)
    }

    window.addEventListener('hashchange', syncPage)
    return () => window.removeEventListener('hashchange', syncPage)
  }, [])

  return (
    <div className="site-shell">
      <SceneErrorBoundary fallback={<Site3DFallback />}>
        <Suspense fallback={<Site3DFallback />}>
          <SiteExperience3D />
        </Suspense>
      </SceneErrorBoundary>

      <Header currentPage={currentPage} />
      <main className="content-layer">
        {currentPage === 'home' ? <HomePage /> : <DetailPage page={detailPage} pageId={currentPage} />}
      </main>
      <Footer />
    </div>
  )
}

class SceneErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { failed: false }
  }

  static getDerivedStateFromError() {
    return { failed: true }
  }

  componentDidCatch(error) {
    console.warn('3D scene disabled while the page continues to render.', error)
  }

  render() {
    if (this.state.failed) {
      return this.props.fallback
    }

    return this.props.children
  }
}

function Header({ currentPage }) {
  return (
    <header className="site-header">
      <a className="brand-link" href="#/" aria-label="STOFARM - на главную">
        <img src={`${baseUrl}stofarm-logo-official.png`} alt="STOFARM" />
      </a>

      <nav className="main-nav" aria-label="Основная навигация">
        {navItems.map((item) => (
          <a
            aria-current={currentPage === item.id ? 'page' : undefined}
            className={currentPage === item.id ? 'is-active' : undefined}
            href={item.href}
            key={item.href}
          >
            {item.label}
          </a>
        ))}
      </nav>

      <a className="header-contact" href="tel:+77142917710">
        +7 (7142) 91-77-10
      </a>
    </header>
  )
}

function Site3DFallback() {
  return (
    <div className="site-3d-backdrop" aria-hidden="true">
      <div className="site-3d-fallback" />
    </div>
  )
}

function HomePage() {
  return (
    <>
      <HeroSection />
      <TransitionBand />
      <CapabilityOverview />
      <NetworkPreview />
      <PartnersPreview />
      <ContactSection />
    </>
  )
}

function HeroSection() {
  return (
    <section className="hero-stage section-wrap" id="top">
      <div className="hero-copy">
        <p className="eyebrow">STOFARM · pharmaceutical distribution</p>
        <h1>STOFARM</h1>
        <p className="hero-lead">
          Национальная фарм-дистрибуция с деловой точностью: поставки, качество и документы
          проходят один проверяемый маршрут.
        </p>
        <div className="hero-actions">
          <a className="button button-primary" href="#/suppliers">
            Поставщикам
          </a>
          <a className="button button-secondary" href="#/quality">
            Качество
          </a>
        </div>
      </div>

      <div className="hero-metric-strip" aria-label="Ключевые показатели">
        {metrics.map((metric) => (
          <article key={metric.label}>
            <strong>{metric.value}</strong>
            <span>{metric.label}</span>
          </article>
        ))}
      </div>
    </section>
  )
}

function TransitionBand() {
  return (
    <section className="transition-band section-wrap" aria-label="Брендовая формула">
      <p>Системность в поставках</p>
      <span />
      <p>Точность в документах</p>
      <span />
      <p>Ответственность в каждом контакте</p>
    </section>
  )
}

function CapabilityOverview() {
  return (
    <section className="section section-wrap">
      <SectionHeading
        eyebrow="Core pages"
        title="Короткая структура сайта"
        text="Главная страница оставляет только основные входы. Детали вынесены на отдельные разделы."
      />

      <div className="home-grid">
        {capabilityCards.map((card) => (
          <a className="route-card" href={`#/${card.route}`} key={card.route}>
            <span>{card.eyebrow}</span>
            <h3>{card.title}</h3>
            <p>{card.text}</p>
          </a>
        ))}
      </div>
    </section>
  )
}

function NetworkPreview() {
  return (
    <section className="section section-wrap">
      <div className="home-network">
        <SectionHeading
          eyebrow="National coverage"
          title="Филиалы в ключевых регионах"
          text="Сеть работает как практический инструмент: ближе к клиенту, быстрее к документу, стабильнее к поставке."
        />
        <div className="branch-grid" aria-label="Города присутствия">
          {branches.map((city) => (
            <span key={city}>{city}</span>
          ))}
        </div>
      </div>
    </section>
  )
}

function PartnersPreview() {
  return (
    <section className="section section-wrap">
      <SectionHeading
        eyebrow="Partnership"
        title="Фармацевтическая партнерская среда"
        text="Бренды показаны спокойно, без рекламной перегрузки: это деловой контекст, а не витрина обещаний."
      />

      <div className="partner-grid">
        {partnerBrands.map((partner) => (
          <article className="partner-card" key={partner.name}>
            <img src={partner.logo} alt={partner.name} />
          </article>
        ))}
      </div>
    </section>
  )
}

function DetailPage({ page, pageId }) {
  return (
    <section className="page-view section-wrap">
      <div className="page-hero">
        <p className="eyebrow">{page.eyebrow}</p>
        <h1>{page.title}</h1>
        <p>{page.lead}</p>
      </div>

      <div className="stat-grid" aria-label="Ключевые показатели раздела">
        {page.stats.map((item) => (
          <article key={`${item.value}-${item.label}`}>
            <strong>{item.value}</strong>
            <span>{item.label}</span>
          </article>
        ))}
      </div>

      <div className="page-grid">
        <div className="page-panel">
          {page.blocks.map((block) => (
            <article key={block.title}>
              <h2>{block.title}</h2>
              <p>{block.text}</p>
            </article>
          ))}

          {page.actions ? (
            <div className="certificate-actions">
              {page.actions.map((action) => (
                <a className="button button-primary" href={action.href} key={action.href} target="_blank" rel="noreferrer">
                  {action.label}
                </a>
              ))}
            </div>
          ) : null}
        </div>

        <aside className="page-checklist">
          <span>STOFARM STANDARD</span>
          <h2>{pageId === 'network' ? 'Города' : 'Контрольные точки'}</h2>
          <div>
            {page.checkpoints.map((item) => (
              <p key={item}>{item}</p>
            ))}
          </div>
        </aside>
      </div>

      {pageId === 'contacts' ? <ContactGrid /> : null}
      {pageId === 'partners' ? <PartnerLogoGrid /> : null}
    </section>
  )
}

function ContactSection() {
  return (
    <section className="section contact-section" id="contacts">
      <div className="section-wrap contact-layout">
        <div>
          <p className="eyebrow">Business contact</p>
          <h2>Деловая связь без лишнего маршрута</h2>
          <p>Официальные обращения, поставки, документы и претензии направляются в профильные каналы.</p>
        </div>

        <ContactGrid />
      </div>
    </section>
  )
}

function ContactGrid() {
  return (
    <div className="contact-grid">
      {contactCards.map((card) => {
        const content = (
          <>
            <span>{card.label}</span>
            <strong>{card.value}</strong>
            <small>{card.detail}</small>
          </>
        )

        return card.href ? (
          <a className="contact-card" href={card.href} key={card.label}>
            {content}
          </a>
        ) : (
          <article className="contact-card" key={card.label}>
            {content}
          </article>
        )
      })}
    </div>
  )
}

function PartnerLogoGrid() {
  return (
    <div className="partner-grid page-logo-grid">
      {partnerBrands.map((partner) => (
        <article className="partner-card" key={partner.name}>
          <img src={partner.logo} alt={partner.name} />
        </article>
      ))}
    </div>
  )
}

function SectionHeading({ eyebrow, text, title }) {
  return (
    <div className="section-heading">
      <p className="eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      {text ? <p>{text}</p> : null}
    </div>
  )
}

function Footer() {
  return (
    <footer className="site-footer section-wrap">
      <img src={`${baseUrl}stofarm-logo-official.png`} alt="STOFARM" />
      <p>СТОФАРМ: системность в поставках, точность в документах, ответственность в каждом контакте.</p>
      <a href="#/">На главную</a>
    </footer>
  )
}

export default App
