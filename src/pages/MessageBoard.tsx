import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { getAssetPath } from '../utils/path';
import './MessageBoard.css';

interface MessageBoardProps {
  open: boolean;
  onClose: () => void;
}

interface FormState {
  name: string;
  company: string;
  phone: string;
}

const QR_SRC = getAssetPath('/images/home/qr_code.png');

const MessageBoard: React.FC<MessageBoardProps> = ({ open, onClose }) => {
  const { t } = useTranslation();
  const [form, setForm] = useState<FormState>({
    name: '',
    company: '',
    phone: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const dialogRef = useRef<HTMLDivElement | null>(null);

  const handleClose = useCallback(() => {
    setSubmitting(false);
    setSuccess(false);
    setForm({
      name: '',
      company: '',
      phone: '',
    });
    onClose();
  }, [onClose]);

  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        handleClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [open, handleClose]);

  const handleChange =
    (field: keyof FormState) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setForm((prev) => ({ ...prev, [field]: event.target.value }));
    };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!form.name.trim() || !form.phone.trim()) {
      return;
    }
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSuccess(true);
    }, 500);
  };

  if (!open) {
    return null;
  }

  return (
    <div className="message-board">
      <div className="message-board__dialog" ref={dialogRef}>
        <button
          type="button"
          className="message-board__close"
          aria-label={t('messageBoard.closeAria')}
          onClick={handleClose}
        >
          ×
        </button>

        <div className="message-board__left">
          <div className="message-board__logo">VERT</div>
          <div className="message-board__qr-wrap">
            <div className="message-board__qr-inner">
              <img
                src={QR_SRC}
                alt={t('messageBoard.qrAlt')}
                className="message-board__qr-img"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
            </div>
            <p className="message-board__qr-text">{t('messageBoard.qrText')}</p>
          </div>
        </div>

        <div className="message-board__right">
          {!success ? (
            <form className="message-board__form" onSubmit={handleSubmit}>
              <h2 className="message-board__title">{t('messageBoard.title')}</h2>
              <div className="message-board__fields">
                <div className="message-board__field">
                  <input
                    value={form.name}
                    onChange={handleChange('name')}
                    placeholder={t('messageBoard.namePlaceholder')}
                    className="message-board__input"
                  />
                </div>
                <div className="message-board__field">
                  <input
                    value={form.company}
                    onChange={handleChange('company')}
                    placeholder={t('messageBoard.companyPlaceholder')}
                    className="message-board__input"
                  />
                </div>
                <div className="message-board__field">
                  <input
                    value={form.phone}
                    onChange={handleChange('phone')}
                    placeholder={t('messageBoard.phonePlaceholder')}
                    className="message-board__input"
                  />
                </div>
              </div>
              <button
                type="submit"
                className="message-board__submit"
                disabled={submitting || !form.name.trim() || !form.phone.trim()}
              >
                {submitting ? t('messageBoard.submitting') : t('messageBoard.submit')}
              </button>
            </form>
          ) : (
            <div className="message-board__success">
              <div className="message-board__success-icon">✓</div>
              <p className="message-board__success-text">{t('messageBoard.success')}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MessageBoard;
