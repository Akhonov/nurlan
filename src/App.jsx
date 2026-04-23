import { useEffect, useState } from 'react'
import heroDoctors from './assets/hero-doctors.png'
import {
  aboutChapters,
  certificates,
  contactChannels,
  cultureCards,
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

function App() {
  const [activeTrack, setActiveTrack] = useState(serviceTracks[0].id)
  const [formStatus, setFormStatus] = useState('')

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
        threshold: 0.14,
        rootMargin: '0px 0px -48px 0px',
      },
    )

    elements.forEach((element) => observer.observe(element))

    return () => observer.disconnect()
  }, [])

  const activeService =
    serviceTracks.find((track) => track.id === activeTrack) ?? serviceTracks[0]

  const shortAboutIntro = [
    'История компании «СТОФАРМ» — это годы развития, совершенствования и уверенного движения вперед вместе с фармацевтическим рынком Казахстана.',
    'С момента создания компания значительно выросла: расширились масштаб бизнеса, география присутствия и система корпоративного управления. Сегодня бренд знают по всей стране.',
    'ТОО «СТОФАРМ» — один из лидеров Казахстана в сфере продаж лекарственных средств и изделий медицинского назначения, сочетающий стабильность, надежность и высокий уровень сервиса.',
    'Опыт команды, национальная сеть, внимание к качеству и сильные партнерские отношения помогают компании сохранять прочные позиции на рынке и смотреть в будущее с большими планами.',
  ]

  const shortAboutChapters = aboutChapters
    .filter((chapter) =>
      [
        'Республиканская сеть',
        'Акцент на качество',
        'Мы дорожим партнерскими отношениями',
        'Наша главная ценность - сотрудники',
      ].includes(chapter.title),
    )
    .map((chapter) => ({
      ...chapter,
      paragraphs: chapter.paragraphs.slice(0, 2),
    }))

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
      message || 'Без дополнительного комментария',
    ]

    window.location.href = `mailto:kanc@stopharm.kz?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(lines.join('\n'))}`

    setFormStatus('Черновик письма открыт в почтовом клиенте.')
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
      <header className="site-header">
        <a className="brand" href="#top" aria-label="STOFARM">
          <span className="brand-mark">
            <span className="brand-dot"></span>
          </span>
          <span className="brand-copy">
            <strong>STOFARM</strong>
            <small>Фармацевтическая дистрибуция Казахстана</small>
          </span>
        </a>

        <nav className="site-nav" aria-label="Навигация по сайту">
          {navigation.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>

        <a className="header-cta" href="#contact">
          Связаться
        </a>
      </header>

      <main>
        <section className="hero-section section" id="top">
          <div className="hero-shell card-surface" data-reveal>
            <div className="hero-copy">
              <p className="eyebrow">Фармацевтическая компания Казахстана</p>
              <h1>
                <span>STOFARM.</span>
                <span>Надежность,</span>
                <span>качество и</span>
                <span>национальный масштаб.</span>
              </h1>
              <p className="hero-description">
                Обновленный сайт показывает STOFARM как сильного дистрибьютора
                национального уровня: с устойчивой логистикой, современной
                системой качества, большой партнерской сетью и сильной командой.
              </p>

              <div className="hero-actions">
                <a className="button button-primary" href="#about">
                  О нас
                </a>
                <a className="button button-secondary" href="#certificates">
                  Сертификаты
                </a>
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
              <img
                src={heroDoctors}
                alt="Команда медицинских специалистов"
              />
              <div className="hero-photo-overlay"></div>
              <div className="hero-photo-card hero-photo-card-top">
                <span>Качество</span>
                <strong>ISO / GDP</strong>
              </div>
              <div className="hero-photo-card hero-photo-card-bottom">
                <span>Команда</span>
                <strong>Надежность и забота</strong>
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
              style={{ '--delay': `${index * 70}ms` }}
            >
              <span className="metric-value">{metric.value}</span>
              <p>{metric.label}</p>
            </article>
          ))}
        </section>

        <section className="section" id="about">
          <SectionIntro
            eyebrow="О нас"
            title="История STOFARM — это движение вперед, масштаб страны и постоянное совершенствование."
            description="Этот раздел собран на основе твоего текста и превращен в полноценную содержательную страницу внутри сайта."
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
              {shortAboutIntro.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>

          <div className="chapter-grid">
            {shortAboutChapters.map((chapter, index) => (
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

        <section className="section" id="faces">
          <SectionIntro
            eyebrow="История в лицах"
            title="История компании, рассказанная людьми, которые строят STOFARM каждый день."
            description="Мы вынесли этот контент в отдельную вкладку, чтобы подчеркнуть живую сторону бренда и показать силу команды."
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
                style={{ '--delay': `${index * 50}ms` }}
              >
                <div className="face-heading">
                  <span className="face-avatar">{person.name[0]}</span>
                  <div>
                    <h3>{person.name}</h3>
                    <p className="face-role">{person.role}</p>
                  </div>
                </div>

                {person.body ? (
                  <ul className="bio-list">
                    {person.body.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                ) : (
                  <blockquote>{person.quote}</blockquote>
                )}
              </article>
            ))}
          </div>
        </section>

        <section className="section" id="certificates">
          <SectionIntro
            eyebrow="Сертификаты"
            title="Подтверждение качества и деловой репутации компании."
            description="Сертификаты вынесены в отдельный раздел и открываются в PDF, чтобы посетитель сайта мог быстро ознакомиться с документами."
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
                  onClick={() => handleOpenPdf(certificate.href)}
                  type="button"
                >
                  Открыть PDF
                </button>
              </article>
            ))}
          </div>
        </section>

        <section className="section" id="solutions">
          <SectionIntro
            eyebrow="Форматы сотрудничества"
            title="Сайт объясняет, как STOFARM создает ценность для разных аудиторий."
            description="Здесь сохранен деловой блок для производителей, аптек, клиник и соискателей."
          />

          <div className="solutions-layout">
            <div className="track-switcher" data-reveal>
              {serviceTracks.map((track) => (
                <button
                  key={track.id}
                  className={track.id === activeTrack ? 'active' : ''}
                  onClick={() => setActiveTrack(track.id)}
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
                <span>Фокус нового сайта</span>
                <p>{activeService.accent}</p>
              </div>
            </article>
          </div>
        </section>

        <section className="section" id="network">
          <SectionIntro
            eyebrow="География"
            title="Республиканская сеть STOFARM охватывает всю территорию Казахстана."
            description="Блок подчеркивает национальный масштаб компании и роль Костаная как центра координации сети."
          />

          <div className="network-layout">
            <div className="network-map card-surface" data-reveal>
              <div className="network-center">
                <span className="network-center-label">Head Office</span>
                <strong>Костанай</strong>
                <p>Центр координации национальной сети</p>
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

        <section className="section" id="quality">
          <SectionIntro
            eyebrow="Качество и доверие"
            title="Система качества развивается непрерывно и подтверждается аудитами."
            description="Раздел объединяет историю сертификации, ключевые этапы развития системы менеджмента качества и партнерский контур бренда."
          />

          <div className="timeline-grid">
            {qualityTimeline.map((step, index) => (
              <article
                key={`${step.year}-${step.title}`}
                className="timeline-card card-surface"
                data-reveal
                style={{ '--delay': `${index * 80}ms` }}
              >
                <span className="timeline-year">{step.year}</span>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </article>
            ))}
          </div>

          <div className="partners-card card-surface" data-reveal>
            <div>
              <p className="eyebrow">Партнерский контур</p>
              <h3>Прямые отношения с мировыми брендами усиливают репутацию компании.</h3>
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

        <section className="section" id="career">
          <SectionIntro
            eyebrow="Карьера и команда"
            title="Люди остаются главной ценностью компании."
            description="Раздел о команде опирается на реальные акценты STOFARM: обучение, устойчивость, корпоративную культуру и долгую профессиональную траекторию."
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
        </section>

        <section className="section contact-section" id="contact">
          <div className="contact-layout card-dark">
            <div className="contact-copy" data-reveal>
              <p className="eyebrow">Контакты</p>
              <h2>Готовы обсудить сотрудничество, поставки или карьерные возможности.</h2>
              <p className="contact-description">
                Контактный блок сохранился, но теперь он поддержан более сильным
                контентом о компании, ее истории и качестве.
              </p>

              <div className="contact-grid">
                {contactChannels.map((channel) => (
                  <a
                    key={channel.label}
                    className="contact-card"
                    href={channel.href}
                    target={channel.href.startsWith('http') ? '_blank' : undefined}
                    rel={
                      channel.href.startsWith('http')
                        ? 'noreferrer'
                        : undefined
                    }
                  >
                    <span>{channel.label}</span>
                    <strong>{channel.value}</strong>
                  </a>
                ))}
              </div>
            </div>

            <form
              className="contact-form card-surface"
              onSubmit={handleSubmit}
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
                <input
                  name="phone"
                  type="tel"
                  placeholder="+7 7XX XXX XX XX"
                />
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
                  placeholder="Кратко опишите ваш запрос"
                ></textarea>
              </label>

              <button className="button button-primary full-width" type="submit">
                Открыть письмо для отправки
              </button>
              <p className="form-note">
                Кнопка открывает готовый черновик письма в вашем почтовом клиенте.
              </p>
              {formStatus ? <p className="form-status">{formStatus}</p> : null}
            </form>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div>
          <strong>STOFARM</strong>
          <p>Фармацевтическая компания. Казахстан. Костанай.</p>
        </div>

        <div className="footer-links">
          {navigation.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </div>
      </footer>
    </div>
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
