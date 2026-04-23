import { useEffect, useState } from 'react'
import heroDoctors from './assets/hero-doctors.png'
import {
  aboutChapters,
  aboutIntro,
  careerNarrative,
  certificates,
  contactChannels,
  cultureCards,
  directoryBranchProfiles,
  directoryEntries,
  geographyNotes,
  heroTags,
  navigation,
  networkCities,
  partnerBrands,
  peopleStories,
  peopleStoriesIntro,
  priorities,
  qualityTimeline,
  serviceTracks,
  spotlightMetrics,
} from './content'
import {
  directoryMapMarkers,
  directoryMapMeta,
  directoryMapRegions,
} from './directoryMap'

const PAGE_DEFINITIONS = [
  { id: 'home', label: 'Главная', eyebrow: 'STOFARM' },
  { id: 'about', label: navigation[0]?.label ?? 'О нас', eyebrow: 'Компания' },
  { id: 'stories', label: navigation[1]?.label ?? 'Команда', eyebrow: 'Люди' },
  {
    id: 'certificates',
    label: navigation[2]?.label ?? 'Сертификаты',
    eyebrow: 'Качество',
  },
  {
    id: 'solutions',
    label: navigation[3]?.label ?? 'Партнерство',
    eyebrow: 'Сотрудничество',
  },
  {
    id: 'pharmacovigilance',
    label: 'Фармаконадзор',
    eyebrow: 'Безопасность',
  },
  {
    id: 'network',
    label: navigation[4]?.label ?? 'Филиалы',
    eyebrow: 'Сеть',
  },
  { id: 'career', label: navigation[5]?.label ?? 'Карьера', eyebrow: 'Рост' },
  { id: 'contact', label: navigation[6]?.label ?? 'Контакты', eyebrow: 'Связь' },
  { id: 'directory', label: 'Справочная', eyebrow: 'Контакты' },
]

const NAV_GROUPS = [
  {
    id: 'company',
    label: 'Компания',
    items: ['about', 'stories', 'certificates'],
  },
  {
    id: 'partnership',
    label: 'Партнерство',
    items: ['solutions', 'pharmacovigilance', 'network'],
  },
  {
    id: 'career-group',
    label: 'Карьера',
    items: ['career'],
  },
  {
    id: 'contact-group',
    label: 'Контакты',
    items: ['contact', 'directory'],
  },
]

const LEGACY_HASH_MAP = {
  top: 'home',
  about: 'about',
  faces: 'stories',
  certificates: 'certificates',
  quality: 'certificates',
  solutions: 'solutions',
  pharmacovigilance: 'pharmacovigilance',
  network: 'network',
  career: 'career',
  contact: 'contact',
  directory: 'directory',
}

const DIRECTORY_MAP_LABELS = {
  aktau: '\u0410\u043a\u0442\u0430\u0443',
  aktobe: '\u0410\u043a\u0442\u043e\u0431\u0435',
  almaty: '\u0410\u043b\u043c\u0430\u0442\u044b',
  astana: '\u0410\u0441\u0442\u0430\u043d\u0430',
  atyrau: '\u0410\u0442\u044b\u0440\u0430\u0443',
  karaganda: '\u041a\u0430\u0440\u0430\u0433\u0430\u043d\u0434\u0430',
  kokshetau: '\u041a\u043e\u043a\u0448\u0435\u0442\u0430\u0443',
  kostanay: '\u041a\u043e\u0441\u0442\u0430\u043d\u0430\u0439',
  kyzylorda: '\u041a\u044b\u0437\u044b\u043b\u043e\u0440\u0434\u0430',
  pavlodar: '\u041f\u0430\u0432\u043b\u043e\u0434\u0430\u0440',
  petropavlovsk: '\u041f\u0435\u0442\u0440\u043e\u043f\u0430\u0432\u043b.',
  shymkent: '\u0428\u044b\u043c\u043a\u0435\u043d\u0442',
  taraz: '\u0422\u0430\u0440\u0430\u0437',
  uralsk: '\u0423\u0440\u0430\u043b\u044c\u0441\u043a',
  'ust-kamenogorsk': '\u0423\u0441\u0442\u044c-\u041a\u0430\u043c.',
}

const DIRECTORY_MAP_SMALL_LABELS = new Set([
  'petropavlovsk',
  'ust-kamenogorsk',
])

const DIRECTORY_MAP_MARKER_OFFSETS = {
  astana: { x: 16, y: -12 },
}

function getPageFromHash() {
  if (typeof window === 'undefined') {
    return 'home'
  }

  const hash = window.location.hash.replace('#', '')

  if (PAGE_DEFINITIONS.some((page) => page.id === hash)) {
    return hash
  }

  return LEGACY_HASH_MAP[hash] ?? 'home'
}

function App() {
  const [activeTrack, setActiveTrack] = useState(serviceTracks[0].id)
  const [activePage, setActivePage] = useState(getPageFromHash)
  const [formStatus, setFormStatus] = useState('')
  const [navOpen, setNavOpen] = useState(false)
  const [openGroup, setOpenGroup] = useState(null)

  useEffect(() => {
    const handleHashChange = () => {
      setActivePage(getPageFromHash())
      window.scrollTo({ top: 0, behavior: 'auto' })
    }

    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  useEffect(() => {
    const elements = document.querySelectorAll('[data-reveal]')

    if (!elements.length) {
      return undefined
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px',
      },
    )

    elements.forEach((element) => observer.observe(element))

    return () => observer.disconnect()
  }, [activePage])

  const activeService =
    serviceTracks.find((track) => track.id === activeTrack) ?? serviceTracks[0]

  const pageById = Object.fromEntries(
    PAGE_DEFINITIONS.map((page) => [page.id, page]),
  )

  const handlePageChange = (pageId) => {
    setActivePage(pageId)
    setNavOpen(false)
    setOpenGroup(null)
    window.history.replaceState(null, '', `#${pageId}`)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    const name = formData.get('name')?.toString().trim() ?? ''
    const company = formData.get('company')?.toString().trim() ?? ''
    const phone = formData.get('phone')?.toString().trim() ?? ''
    const email = formData.get('email')?.toString().trim() ?? ''
    const message = formData.get('message')?.toString().trim() ?? ''
    const subject = company
      ? `Запрос с сайта STOFARM: ${company}`
      : 'Запрос с сайта STOFARM'

    const lines = [
      'Здравствуйте, команда STOFARM!',
      '',
      `Имя: ${name}`,
      `Компания: ${company}`,
      `Телефон: ${phone || 'не указан'}`,
      `Email: ${email}`,
      '',
      'Комментарий:',
      message || 'Без комментария',
    ]

    window.location.href = `mailto:kanc@stopharm.kz?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join('\n'))}`

    setFormStatus('Черновик письма открыт.')
    event.currentTarget.reset()
  }

  const handleOpenPdf = (href) => {
    const normalizedHref = href.startsWith('/') ? href.slice(1) : href
    const basePath = import.meta.env.BASE_URL.endsWith('/')
      ? import.meta.env.BASE_URL
      : `${import.meta.env.BASE_URL}/`
    const pdfUrl = `${basePath}${normalizedHref}`

    window.open(pdfUrl, '_blank', 'noopener,noreferrer')
  }

  return (
    <div className="page-shell">
      <header className={`site-header ${navOpen ? 'is-open' : ''}`}>
        <button
          className="brand"
          onClick={() => handlePageChange('home')}
          type="button"
          aria-label="STOFARM"
        >
          <span className="brand-mark">
            <span className="brand-dot"></span>
          </span>
          <span className="brand-copy">
            <strong>STOFARM</strong>
            <small>Фармдистрибуция Казахстана</small>
          </span>
        </button>

        <nav className="site-nav desktop-nav" aria-label="Навигация по сайту">
          <button
            className={activePage === 'home' ? 'active' : ''}
            onClick={() => handlePageChange('home')}
            type="button"
          >
            Главная
          </button>

          {NAV_GROUPS.map((group) => (
            <div key={group.id} className="nav-group">
              <button
                className={
                  group.items.includes(activePage)
                    ? 'active nav-group-trigger'
                    : 'nav-group-trigger'
                }
                type="button"
              >
                {group.label}
              </button>

              <div className="nav-dropdown">
                {group.items.map((itemId) => (
                  <button
                    key={itemId}
                    className={activePage === itemId ? 'active' : ''}
                    onClick={() => handlePageChange(itemId)}
                    type="button"
                  >
                    {pageById[itemId]?.label ?? itemId}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </nav>

        <div className="header-actions">
          <button
            className="header-cta"
            onClick={() => handlePageChange('contact')}
            type="button"
          >
            Связаться
          </button>

          <button
            className={`nav-toggle ${navOpen ? 'is-open' : ''}`}
            type="button"
            onClick={() => setNavOpen((value) => !value)}
            aria-expanded={navOpen}
            aria-controls="site-navigation"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>

        <div className="mobile-panel" id="site-navigation">
          <nav className="site-nav mobile-nav" aria-label="Мобильная навигация">
            <button
              className={activePage === 'home' ? 'active' : ''}
              onClick={() => handlePageChange('home')}
              type="button"
            >
              Главная
            </button>

            {NAV_GROUPS.map((group) => (
              <div key={group.id} className="mobile-nav-group">
                <button
                  className={
                    group.items.includes(activePage)
                      ? 'active mobile-group-trigger'
                      : 'mobile-group-trigger'
                  }
                  onClick={() =>
                    setOpenGroup((current) =>
                      current === group.id ? null : group.id,
                    )
                  }
                  type="button"
                >
                  <span>{group.label}</span>
                  <span>{openGroup === group.id ? '-' : '+'}</span>
                </button>

                <div
                  className={`mobile-subnav ${openGroup === group.id ? 'is-open' : ''}`}
                >
                  {group.items.map((itemId) => (
                    <button
                      key={itemId}
                      className={activePage === itemId ? 'active' : ''}
                      onClick={() => handlePageChange(itemId)}
                      type="button"
                    >
                      {pageById[itemId]?.label ?? itemId}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </nav>
        </div>
      </header>

      <main className="page-stage" key={activePage}>
        {activePage === 'home' ? (
          <HomePage onPageChange={handlePageChange} />
        ) : null}
        {activePage === 'about' ? <AboutPage /> : null}
        {activePage === 'stories' ? <StoriesPage /> : null}
        {activePage === 'certificates' ? (
          <CertificatesPage onOpenPdf={handleOpenPdf} />
        ) : null}
        {activePage === 'solutions' ? (
          <SolutionsPage
            activeService={activeService}
            activeTrack={activeTrack}
            onTrackChange={setActiveTrack}
          />
        ) : null}
        {activePage === 'pharmacovigilance' ? <PharmacovigilancePage /> : null}
        {activePage === 'network' ? <NetworkPage /> : null}
        {activePage === 'career' ? <CareerPage /> : null}
        {activePage === 'contact' ? (
          <ContactPage formStatus={formStatus} onSubmit={handleSubmit} />
        ) : null}
        {activePage === 'directory' ? <DirectoryPage /> : null}
      </main>

      <footer className="site-footer">
        <div>
          <strong>STOFARM</strong>
          <p>Казахстан. Костанай.</p>
        </div>

        <div className="footer-links">
          {PAGE_DEFINITIONS.map((page) => (
            <button
              key={page.id}
              onClick={() => handlePageChange(page.id)}
              type="button"
            >
              {page.label}
            </button>
          ))}
        </div>
      </footer>
    </div>
  )
}

function HomePage({ onPageChange }) {
  return (
    <>
      <section className="hero-section section">
        <div className="hero-shell card-surface" data-reveal>
          <div className="hero-copy">
            <p className="eyebrow">Фармдистрибуция Казахстана</p>
            <h1>
              <span>STOFARM.</span>
              <span>Надежность.</span>
              <span>Качество.</span>
              <span>Масштаб.</span>
            </h1>
            <p className="hero-description">
              STOFARM - один из ведущих фармацевтических дистрибьюторов Казахстана,
              который сочетает широкую филиальную сеть, современные стандарты
              качества и устойчивые партнерские отношения.
            </p>
            <p className="hero-support">
              Компания развивает дистрибуцию с 2003 года и остается точкой опоры
              для производителей, аптек, клиник и собственной команды.
            </p>

            <div className="hero-actions">
              <button
                className="button button-primary"
                onClick={() => onPageChange('about')}
                type="button"
              >
                О нас
              </button>
              <button
                className="button button-secondary"
                onClick={() => onPageChange('certificates')}
                type="button"
              >
                Сертификаты
              </button>
            </div>

            <div className="tag-row" aria-label="Ключевые акценты">
              {heroTags.map((tag) => (
                <span key={tag} className="tag-pill">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="hero-photo" data-reveal style={{ '--delay': '140ms' }}>
            <img src={heroDoctors} alt="Команда STOFARM" />
            <div className="hero-photo-overlay"></div>
            <div className="hero-photo-card hero-photo-card-top">
              <span>Качество</span>
              <strong>ISO / GDP</strong>
            </div>
            <div className="hero-photo-card hero-photo-card-bottom">
              <span>Сеть</span>
              <strong>Вся страна</strong>
            </div>
          </div>
        </div>
      </section>

      <section className="metrics-grid section" aria-label="Ключевые показатели">
        {spotlightMetrics.map((metric, index) => (
          <article
            key={metric.value}
            className="metric-card card-surface"
            data-reveal
            style={{ '--delay': `${index * 80}ms` }}
          >
            <span className="metric-value">{metric.value}</span>
            <p>{metric.label}</p>
          </article>
        ))}
      </section>

      <section className="section section-tight-top">
        <div className="home-story card-surface" data-reveal>
          <SectionIntro
            eyebrow="О компании"
            title="Национальная сеть с устойчивой репутацией."
            description="STOFARM выстраивает систему поставок, в которой соединяются скорость, качество и доверие партнеров."
          />
          <div className="home-story-copy">
            <p>
              Компания прошла путь от регионального игрока до дистрибьютора
              национального масштаба и сегодня работает с ключевыми регионами
              Казахстана через единую филиальную сеть.
            </p>
            <p>
              На сайте собраны основные направления: о компании, команда,
              сертификаты, партнерство, филиалы, карьерные возможности,
              контакты и расширенная справочная по сети STOFARM.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}

function AboutPage() {
  return (
    <section className="section">
      <SectionIntro
        eyebrow="О нас"
        title="STOFARM - опыт, масштаб и качество."
        description="Компания развивает фармацевтическую дистрибуцию в Казахстане, сочетая устойчивые процессы, современную логистику и сильную команду."
      />

      <div className="about-stack">
        <div className="priority-grid about-priority-grid">
          {priorities.map((item, index) => (
            <article
              key={item.title}
              className="priority-card card-surface"
              data-reveal
              style={{ '--delay': `${index * 80}ms` }}
            >
              <div className="icon-badge">
                <SiteIcon type={item.icon} />
              </div>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>

        <div
          className="about-copy about-copy-filled card-surface"
          data-reveal
          style={{ '--delay': '120ms' }}
        >
          {aboutIntro.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </div>

      <div className="chapter-grid">
        {aboutChapters.map((chapter, index) => (
          <article
            key={chapter.title}
            className="chapter-card card-surface"
            data-reveal
            style={{ '--delay': `${index * 70}ms` }}
          >
            <h3>{chapter.title}</h3>
            {chapter.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </article>
        ))}
      </div>
    </section>
  )
}

function StoriesPage() {
  return (
    <section className="section">
      <SectionIntro
        eyebrow="Команда"
        title="Люди STOFARM."
        description="Кратко о сотрудниках и руководителях, которые формируют характер компании."
      />

      <div className="about-copy card-surface" data-reveal>
        {peopleStoriesIntro.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>

      <div className="faces-grid">
        {peopleStories.map((person, index) => (
          <article
            key={person.name}
            className="face-card card-surface"
            data-reveal
            style={{ '--delay': `${index * 40}ms` }}
          >
            <div className="face-heading">
              <span className="face-avatar">{person.name[0]}</span>
              <div>
                <h3>{person.name}</h3>
                <p className="face-role">{person.role}</p>
              </div>
            </div>

            <ul className="bio-list">
              {person.body.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  )
}

function CertificatesPage({ onOpenPdf }) {
  return (
    <>
      <section className="section">
        <SectionIntro
          eyebrow="Сертификаты"
          title="Подтверждение качества."
          description="Документы ISO и GDP отражают системный подход STOFARM к качеству и дистрибуции."
        />

        <div className="certificates-grid">
          {certificates.map((certificate, index) => (
            <article
              key={certificate.title}
              className="certificate-card card-surface"
              data-reveal
              style={{ '--delay': `${index * 90}ms` }}
            >
              <div className="icon-badge">
                <SiteIcon type="document" />
              </div>
              <h3>{certificate.title}</h3>
              <p>{certificate.text}</p>
              <button
                className="button button-primary"
                onClick={() => onOpenPdf(certificate.href)}
                type="button"
              >
                Открыть PDF
              </button>
            </article>
          ))}
        </div>
      </section>

      <section className="section section-tight-top">
        <SectionIntro
          eyebrow="Качество"
          title="Стандарты и партнеры."
          description="Ключевые этапы развития качества и бренды, с которыми работает компания."
        />

        <div className="timeline-grid">
          {qualityTimeline.map((step, index) => (
            <article
              key={`${step.year}-${step.title}`}
              className="timeline-card card-surface"
              data-reveal
              style={{ '--delay': `${index * 70}ms` }}
            >
              <span className="timeline-year">{step.year}</span>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </article>
          ))}
        </div>

        <div className="partners-card card-surface" data-reveal>
          <div>
            <p className="eyebrow">Партнеры</p>
            <h3>Прямые контракты с международными брендами.</h3>
          </div>

          <div className="partner-grid" aria-label="Партнерские бренды">
            {partnerBrands.map((brand) => (
              <span key={brand} className="partner-pill">
                {brand}
              </span>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

function SolutionsPage({ activeService, activeTrack, onTrackChange }) {
  return (
    <section className="section">
      <SectionIntro
        eyebrow="Партнерство"
        title="Как STOFARM выстраивает сотрудничество."
        description="Компания работает с производителями, медицинским сегментом и собственной командой как с долгосрочными партнерами."
      />

      <div className="solutions-layout">
        <div className="track-switcher" data-reveal>
          {serviceTracks.map((track) => (
            <button
              key={track.id}
              className={track.id === activeTrack ? 'active' : ''}
              onClick={() => onTrackChange(track.id)}
              type="button"
            >
              <span>{track.label}</span>
              <small>{track.badge}</small>
            </button>
          ))}
        </div>

        <article
          className="solution-panel card-surface"
          data-reveal
          style={{ '--delay': '100ms' }}
        >
          <span className="panel-badge">{activeService.badge}</span>
          <h3>{activeService.title}</h3>
          <p className="panel-lead">{activeService.lead}</p>

          <ul className="feature-list">
            {activeService.bullets.map((bullet) => (
              <li key={bullet}>
                <span className="checkmark">
                  <SiteIcon type="check" />
                </span>
                <span>{bullet}</span>
              </li>
            ))}
          </ul>

          <div className="panel-note">
            <span>Фокус</span>
            <p>{activeService.accent}</p>
          </div>
        </article>
      </div>
    </section>
  )
}

function PharmacovigilancePage() {
  return (
    <section className="section">
      <SectionIntro
        eyebrow="Фармаконадзор"
        title="Сообщение о безопасности."
        description="Форма для сообщений о побочных реакциях, нетипичных проявлениях или отсутствии эффекта."
      />

      <div className="phv-layout">
        <article className="about-copy card-surface" data-reveal>
          <p>Если вы заметили побочную реакцию или отсутствие эффекта, сообщите нам.</p>
          <p>Информация рассматривается конфиденциально.</p>
          <p>Если каких-то данных нет, это можно прямо указать в форме.</p>
        </article>

        <form className="phv-form card-surface" data-reveal style={{ '--delay': '120ms' }}>
          <div className="phv-section">
            <div className="phv-heading">
              <p className="eyebrow">Кто сообщает</p>
              <span>Основные данные</span>
            </div>

            <div className="phv-grid">
              <label>
                Ф.И.О.
                <input type="text" placeholder="Укажите имя" />
              </label>
              <label>
                Email
                <input type="email" placeholder="Укажите email" />
              </label>
              <label>
                Статус
                <select defaultValue="">
                  <option value="" disabled>
                    Выберите статус
                  </option>
                  <option>Работник здравоохранения</option>
                  <option>Пациент</option>
                </select>
              </label>
              <label>
                Дата сообщения
                <input type="text" placeholder="DD.MM.YY" />
              </label>
              <label>
                Телефон
                <input type="tel" placeholder="Укажите телефон" />
              </label>
              <label>
                Город
                <input type="text" placeholder="Укажите город" />
              </label>
            </div>
          </div>

          <div className="phv-section">
            <div className="phv-heading">
              <p className="eyebrow">О пациенте</p>
              <span>Коротко и по сути</span>
            </div>

            <div className="phv-grid">
              <label>
                Ф.И.О.
                <input type="text" placeholder="Укажите имя" />
              </label>
              <label>
                Пол
                <select defaultValue="">
                  <option value="" disabled>
                    Выберите пол
                  </option>
                  <option>Женский</option>
                  <option>Мужской</option>
                </select>
              </label>
              <label>
                Возраст
                <input type="text" placeholder="Укажите возраст" />
              </label>
              <label>
                Контакт
                <input type="text" placeholder="Телефон или email" />
              </label>
              <label className="full-width">
                Дополнительная информация
                <textarea
                  rows="5"
                  placeholder="Диагнозы, аллергия и другое"
                ></textarea>
              </label>
            </div>
          </div>

          <div className="phv-note">
            <strong>Важно:</strong> если данных нет, так и напишите.
          </div>
        </form>
      </div>
    </section>
  )
}

function NetworkPage() {
  return (
    <section className="section">
      <SectionIntro
        eyebrow="Филиалы"
        title="Филиальная сеть STOFARM."
        description="Главный офис, ключевые города и единый логистический контур компании по Казахстану."
      />

      <div className="network-layout">
        <div className="network-map card-surface" data-reveal>
          <div className="network-center">
            <span className="network-center-label">Head Office</span>
            <strong>Костанай</strong>
            <p>Центр сети</p>
          </div>

          <div className="city-cloud">
            {networkCities.map((city) => (
              <span key={city} className="city-pill">
                {city}
              </span>
            ))}
          </div>
        </div>

        <div className="network-notes">
          {geographyNotes.map((note, index) => (
            <article
              key={note.title}
              className="note-card card-surface"
              data-reveal
              style={{ '--delay': `${index * 80}ms` }}
            >
              <h3>{note.title}</h3>
              <p>{note.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function CareerPage() {
  return (
    <section className="section">
      <SectionIntro
        eyebrow="Карьера"
        title="Люди - основа STOFARM."
        description="Компания объединяет развитие сотрудников, эффективные процессы и сильную корпоративную культуру."
      />

      <div className="culture-grid">
        {cultureCards.map((card, index) => (
          <article
            key={card.title}
            className="culture-card card-surface"
            data-reveal
            style={{ '--delay': `${index * 80}ms` }}
          >
            <div className="icon-badge">
              <SiteIcon type={card.icon} />
            </div>
            <h3>{card.title}</h3>
            <p>{card.text}</p>
          </article>
        ))}
      </div>

      <article className="career-story card-surface" data-reveal>
        <div className="career-story-head">
          <p className="eyebrow">Возможности</p>
          <h3>Рост, самореализация и развитие внутри компании.</h3>
        </div>

        <div className="career-story-copy">
          {careerNarrative.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </article>
    </section>
  )
}

function ContactPage({ formStatus, onSubmit }) {
  return (
    <section className="section contact-section">
      <div className="contact-layout card-dark">
        <div className="contact-copy" data-reveal>
          <p className="eyebrow">Контакты</p>
          <h2>Свяжитесь с нами.</h2>
          <p className="contact-description">
            Для партнерства, поставок, общих запросов и деловой коммуникации.
          </p>

          <div className="contact-grid">
            {contactChannels.map((channel) => (
              <a
                key={channel.label}
                className="contact-card"
                href={channel.href}
                target={channel.href.startsWith('http') ? '_blank' : undefined}
                rel={channel.href.startsWith('http') ? 'noreferrer' : undefined}
              >
                <span>{channel.label}</span>
                <strong>{channel.value}</strong>
              </a>
            ))}
          </div>
        </div>

        <form
          className="contact-form card-surface"
          onSubmit={onSubmit}
          data-reveal
          style={{ '--delay': '120ms' }}
        >
          <label>
            Имя
            <input name="name" type="text" placeholder="Ваше имя" required />
          </label>
          <label>
            Компания
            <input
              name="company"
              type="text"
              placeholder="Название компании"
              required
            />
          </label>
          <label>
            Телефон
            <input name="phone" type="tel" placeholder="+7 7XX XXX XX XX" />
          </label>
          <label>
            Email
            <input
              name="email"
              type="email"
              placeholder="name@company.kz"
              required
            />
          </label>
          <label className="full-width">
            Запрос
            <textarea
              name="message"
              rows="5"
              placeholder="Коротко опишите запрос"
            ></textarea>
          </label>

          <button className="button button-primary full-width" type="submit">
            Открыть письмо
          </button>
          <p className="form-note">Откроется черновик письма.</p>
          {formStatus ? <p className="form-status">{formStatus}</p> : null}
        </form>
      </div>
    </section>
  )
}

function DirectoryPage() {
  const [selectedBranchId, setSelectedBranchId] = useState(null)
  const selectedBranch =
    directoryBranchProfiles.find((branch) => branch.id === selectedBranchId) ?? null

  const openBranchCard = (branchId) => {
    setSelectedBranchId(branchId)
  }

  const closeBranchCard = () => {
    setSelectedBranchId(null)
  }

  return (
    <section className="section">
      <SectionIntro
        eyebrow={'\u0421\u043f\u0440\u0430\u0432\u043e\u0447\u043d\u0430\u044f'}
        title={'\u041a\u0430\u0440\u0442\u0430 \u0444\u0438\u043b\u0438\u0430\u043b\u043e\u0432 STOFARM.'}
        description={
          '\u041d\u0430\u0436\u043c\u0438\u0442\u0435 \u043d\u0430 \u043e\u0431\u043b\u0430\u0441\u0442\u044c \u043d\u0430 \u043a\u0430\u0440\u0442\u0435, \u0447\u0442\u043e\u0431\u044b \u043e\u0442\u043a\u0440\u044b\u0442\u044c \u043d\u0435\u0431\u043e\u043b\u044c\u0448\u0443\u044e \u043a\u0430\u0440\u0442\u043e\u0447\u043a\u0443 \u0441 \u0438\u043d\u0444\u043e\u0440\u043c\u0430\u0446\u0438\u0435\u0439 \u043e \u0444\u0438\u043b\u0438\u0430\u043b\u0435. \u041f\u043e\u043b\u043d\u0430\u044f \u0441\u043f\u0440\u0430\u0432\u043e\u0447\u043d\u0430\u044f \u0438\u043d\u0444\u043e\u0440\u043c\u0430\u0446\u0438\u044f \u043f\u043e \u0441\u0435\u0442\u0438 \u0440\u0430\u0437\u043c\u0435\u0449\u0435\u043d\u0430 \u043d\u0438\u0436\u0435.'
        }
      />

      <div className="directory-map-shell card-surface" data-reveal>
        <div className="directory-map-card directory-map-card-full">
          <div className="directory-map-head">
            <p className="eyebrow">{'\u041a\u0430\u0440\u0442\u0430 \u041a\u0430\u0437\u0430\u0445\u0441\u0442\u0430\u043d\u0430'}</p>
            <p className="directory-map-copy">
              {'\u0411\u043e\u043b\u044c\u0448\u0430\u044f \u0438\u043d\u0442\u0435\u0440\u0430\u043a\u0442\u0438\u0432\u043d\u0430\u044f \u043a\u0430\u0440\u0442\u0430 \u0444\u0438\u043b\u0438\u0430\u043b\u044c\u043d\u043e\u0439 \u0441\u0435\u0442\u0438 STOFARM.'}
            </p>
          </div>

          <div className="directory-map-frame directory-map-frame-fullscreen">
            <div className="directory-map-grid" aria-hidden="true"></div>

            <svg
              className="directory-map"
              viewBox={directoryMapMeta.viewBox}
              aria-label={'\u041a\u0430\u0440\u0442\u0430 \u0444\u0438\u043b\u0438\u0430\u043b\u043e\u0432 STOFARM'}
            >
              <g className="directory-map-regions">
                {directoryMapRegions.map((region) => (
                  <g
                    key={region.id}
                    className="map-region-group"
                    onClick={() => openBranchCard(region.id)}
                    onKeyDown={(event) => {
                      if (event.key === 'Enter' || event.key === ' ') {
                        event.preventDefault()
                        openBranchCard(region.id)
                      }
                    }}
                    role="button"
                    tabIndex={0}
                  >
                    <path
                      className={`map-region ${selectedBranchId === region.id ? 'is-active' : ''}`}
                      d={region.path}
                    />
                    <text
                      className={`map-region-label ${DIRECTORY_MAP_SMALL_LABELS.has(region.id) ? 'is-small' : ''}`}
                      x={region.labelX}
                      y={region.labelY}
                      textAnchor="middle"
                    >
                      {DIRECTORY_MAP_LABELS[region.id]}
                    </text>
                  </g>
                ))}
              </g>

              <g className="directory-map-markers">
                {directoryMapMarkers.map((marker) => (
                  <g
                    key={marker.id}
                    className="map-marker-group"
                    onClick={() => openBranchCard(marker.id)}
                    onKeyDown={(event) => {
                      if (event.key === 'Enter' || event.key === ' ') {
                        event.preventDefault()
                        openBranchCard(marker.id)
                      }
                    }}
                    role="button"
                    tabIndex={0}
                  >
                    <circle
                      className={`map-marker-dot ${selectedBranchId === marker.id ? 'is-active' : ''}`}
                      cx={marker.x}
                      cy={marker.y}
                      r="7"
                    />
                    <circle
                      className={`map-marker-ring ${selectedBranchId === marker.id ? 'is-active' : ''}`}
                      cx={marker.x}
                      cy={marker.y}
                      r="14"
                    />
                    <text
                      className="map-marker-label"
                      x={marker.x + (DIRECTORY_MAP_MARKER_OFFSETS[marker.id]?.x ?? 18)}
                      y={marker.y + (DIRECTORY_MAP_MARKER_OFFSETS[marker.id]?.y ?? -10)}
                    >
                      {DIRECTORY_MAP_LABELS[marker.id]}
                    </text>
                  </g>
                ))}
              </g>
            </svg>

            {selectedBranch ? (
              <article className="directory-popup card-surface" role="dialog" aria-live="polite">
                <button
                  className="directory-popup-close"
                  onClick={closeBranchCard}
                  type="button"
                  aria-label={'\u0417\u0430\u043a\u0440\u044b\u0442\u044c \u043a\u0430\u0440\u0442\u043e\u0447\u043a\u0443 \u0444\u0438\u043b\u0438\u0430\u043b\u0430'}
                >
                  {'\u00d7'}
                </button>
                <p className="eyebrow">{selectedBranch.branch}</p>
                <h3>{selectedBranch.director}</h3>
                <p className="directory-role">{selectedBranch.role}</p>
                <p className="directory-summary">{selectedBranch.summary}</p>

                <div className="directory-popup-meta">
                  <div>
                    <span>{'\u0410\u0434\u0440\u0435\u0441'}</span>
                    <strong>{selectedBranch.address}</strong>
                  </div>
                  <div>
                    <span>{'\u0422\u0435\u043b\u0435\u0444\u043e\u043d'}</span>
                    <strong>
                      <a href={`tel:${selectedBranch.phone.replace(/[^\d+]/g, '')}`}>
                        {selectedBranch.phone}
                      </a>
                    </strong>
                  </div>
                  <div>
                    <span>Email</span>
                    <strong>
                      <a href={`mailto:${selectedBranch.email}`}>{selectedBranch.email}</a>
                    </strong>
                  </div>
                </div>
              </article>
            ) : (
              <div className="directory-map-hint">
                {'\u0412\u044b\u0431\u0435\u0440\u0438\u0442\u0435 \u043e\u0431\u043b\u0430\u0441\u0442\u044c \u043d\u0430 \u043a\u0430\u0440\u0442\u0435, \u0447\u0442\u043e\u0431\u044b \u043e\u0442\u043a\u0440\u044b\u0442\u044c \u043a\u0430\u0440\u0442\u043e\u0447\u043a\u0443 \u0444\u0438\u043b\u0438\u0430\u043b\u0430.'}
              </div>
            )}
          </div>

          <div className="directory-region-list">
            {directoryBranchProfiles.map((branch) => (
              <button
                key={branch.id}
                className={selectedBranchId === branch.id ? 'is-active' : ''}
                onClick={() => openBranchCard(branch.id)}
                type="button"
              >
                {branch.branch}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="directory-table-wrap card-surface" data-reveal>
        <table className="directory-table">
          <thead>
            <tr>
              <th>{'\u0424\u0438\u043b\u0438\u0430\u043b'}</th>
              <th>{'\u0410\u0434\u0440\u0435\u0441'}</th>
              <th>{'\u0422\u0435\u043b\u0435\u0444\u043e\u043d'}</th>
            </tr>
          </thead>
          <tbody>
            {directoryEntries.map((entry) => (
              <tr key={entry.id}>
                <td>
                  <button
                    className={`directory-link ${selectedBranchId === entry.id ? 'is-active' : ''}`}
                    onClick={() => openBranchCard(entry.id)}
                    type="button"
                  >
                    {entry.branch}
                  </button>
                </td>
                <td>{entry.address}</td>
                <td>
                  <a href={`tel:${entry.phone.replace(/[^\d+]/g, '')}`}>{entry.phone}</a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

function SectionIntro({ eyebrow, title, description }) {
  return (
    <div className="section-intro" data-reveal>
      <p className="eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      <p>{description}</p>
    </div>
  )
}

function SiteIcon({ type }) {
  switch (type) {
    case 'shield':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 3l7 3v5c0 4.6-2.8 8.7-7 10-4.2-1.3-7-5.4-7-10V6l7-3z" />
          <path d="M9 12l2 2 4-5" />
        </svg>
      )
    case 'network':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 4v5" />
          <path d="M5 20h14" />
          <path d="M6 8h12" />
          <path d="M7 12v4" />
          <path d="M12 8v8" />
          <path d="M17 12v4" />
          <circle cx="12" cy="4" r="2" />
          <circle cx="6" cy="8" r="2" />
          <circle cx="18" cy="8" r="2" />
          <circle cx="7" cy="18" r="2" />
          <circle cx="17" cy="18" r="2" />
        </svg>
      )
    case 'handshake':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M8 11l3 3a2 2 0 002.8 0l5.2-5.2" />
          <path d="M3 12l4-4 5 5" />
          <path d="M13 8l2-2a3 3 0 014.2 0L21 8" />
          <path d="M3 16l4 4 4-4" />
        </svg>
      )
    case 'spark':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 3l1.8 4.8L19 9.6l-4.1 3.1L16 18l-4-2.6L8 18l1.1-5.3L5 9.6l5.2-1.8L12 3z" />
        </svg>
      )
    case 'academy':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M3 9l9-5 9 5-9 5-9-5z" />
          <path d="M7 11v4c0 1.7 2.2 3 5 3s5-1.3 5-3v-4" />
        </svg>
      )
    case 'gear':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M12 8a4 4 0 100 8 4 4 0 000-8z" />
          <path d="M12 2v3" />
          <path d="M12 19v3" />
          <path d="M4.9 4.9l2.1 2.1" />
          <path d="M17 17l2.1 2.1" />
          <path d="M2 12h3" />
          <path d="M19 12h3" />
          <path d="M4.9 19.1L7 17" />
          <path d="M17 7l2.1-2.1" />
        </svg>
      )
    case 'people':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="8" cy="9" r="3" />
          <circle cx="16" cy="8" r="2.5" />
          <path d="M3 19c0-2.8 2.2-5 5-5s5 2.2 5 5" />
          <path d="M13 19c0-2.3 1.8-4.1 4.1-4.1 2.3 0 3.9 1.8 3.9 4.1" />
        </svg>
      )
    case 'document':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M7 3h7l5 5v13H7z" />
          <path d="M14 3v5h5" />
          <path d="M9 13h6" />
          <path d="M9 17h6" />
        </svg>
      )
    case 'check':
      return (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M5 12.5l4.2 4.2L19 7" />
        </svg>
      )
    default:
      return null
  }
}

export default App
