import { Head, Link } from '@inertiajs/react';
import { ErrorIllustration } from '@/Components/errors/ErrorIllustration';
import { PAGE_CONTAINER, PublicLayout } from '@/Layouts/PublicLayout';
import '../../../css/error-page.css';

interface ErrorPageProps {
  status: number;
  title: string;
  description: string;
  primaryLabel: string | null;
  primaryUrl: string | null;
}

function LoginIcon() {
  return (
    <svg
      className="lg-btn__icon"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
      <polyline points="10 17 15 12 10 7" />
      <line x1="15" y1="12" x2="3" y2="12" />
    </svg>
  );
}

function HomeIcon() {
  return (
    <svg
      className="lg-btn__icon"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <path d="M9 22V12h6v10" />
    </svg>
  );
}

export default function Show({ status, title, description, primaryLabel, primaryUrl }: ErrorPageProps) {
  const showLoginIcon = primaryLabel?.toLowerCase().includes('masuk') ?? false;

  return (
    <PublicLayout>
      <Head title={title}>
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <div className="lg-main" role="alert" aria-labelledby="error-title">
        <div className={PAGE_CONTAINER}>
          <div className="lg-error-hero">
            <div className="lg-error-art" aria-hidden="true">
              <ErrorIllustration status={status} />
            </div>

            <div className="lg-error-content">
              <div className="lg-error-badge">
                <span>Error {status}</span>
              </div>

              <h1 className="lg-error-title" id="error-title">
                {title}
              </h1>
              <p className="lg-error-description">{description}</p>

              <div className="lg-error-actions">
                {primaryUrl && primaryLabel && (
                  <Link className="lg-btn lg-btn--primary" href={primaryUrl}>
                    {showLoginIcon && <LoginIcon />}
                    {primaryLabel}
                  </Link>
                )}

                <Link className={`lg-btn ${primaryUrl ? 'lg-btn--secondary' : 'lg-btn--primary'}`} href="/">
                  <HomeIcon />
                  Kembali ke Beranda
                </Link>
              </div>

              <p className="lg-error-note">
                <span>Butuh bantuan? Hubungi administrator LawGates jika masalah terus berlanjut.</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </PublicLayout>
  );
}
