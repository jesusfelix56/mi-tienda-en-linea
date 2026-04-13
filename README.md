$bg-page: #f3f4f6;
$bg-card: #ffffff;
$border-card: #d8dce1;
$border-soft: #e5e7eb;
$text-main: #111827;
$text-muted: #6b7280;
$error: #b42318;
$teal-bg: #e9f7f4;
$teal-border: #a8ddd1;
$teal-text: #0f766e;

.page {
  min-height: 100vh;
  background: $bg-page;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem 1rem;
}

.card {
  width: min(100%, 42rem);
  background: $bg-card;
  border: 1px solid $border-card;
  border-radius: 0.6rem;
  padding: 1.5rem;
  box-shadow: 0 12px 30px rgba(17, 24, 39, 0.08);
}

.info {
  margin-top: 0.9rem;
  border: 1px solid $teal-border;
  background: $teal-bg;
  color: $teal-text;
  border-radius: 0.45rem;
  padding: 0.7rem 0.85rem;
  font-size: 0.9rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.6rem;
}

.loadError {
  margin: 0 0 0.75rem;
  color: $error;
  font-size: 0.9rem;
  font-weight: 600;
}

.infoText {
  flex: 1;
}

.switch {
  border: 1px solid $teal-border;
  border-radius: 0.45rem;
  background: #ffffff;
  color: $teal-text;
  padding: 0.4rem 0.8rem;
  min-width: 11rem;
  font-size: 0.82rem;
  font-weight: 600;
  text-align: center;
  cursor: pointer;
}

.switch:hover {
  background: #f8fffd;
}

.actions {
  margin-top: 1rem;
  border-top: 1px solid $border-soft;
  padding-top: 0.9rem;
  display: flex;
  justify-content: flex-end;
  gap: 0.6rem;
}

.submit,
.clear {
  border: 1px solid #bcc3cb;
  border-radius: 0.45rem;
  padding: 0.5rem 1.1rem;
  background: #ffffff;
  color: $text-main;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
}

.submit:hover,
.clear:hover {
  background: #f3f4f6;
}

:host ::ng-deep .p-inputtext,
:host ::ng-deep .p-dropdown {
  border-radius: 0.4rem;
}

@media (max-width: 720px) {
  .info {
    flex-direction: column;
    align-items: flex-start;
  }
}
////////////////////////
$text-title: #1f2937;
$text-main: #111827;
$text-secondary: #6b7280;
$border-default: #d1d5db;
$border-active: #2563eb;
$bg-default: #ffffff;
$bg-active: #eff6ff;
$text-active: #1d4ed8;
$error: #dc2626;

.service {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.title {
  font-size: 0.95rem;
  font-weight: 600;
  color: $text-title;
}

.options {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.75rem;
}

.option {
  border: 1px solid $border-default;
  border-radius: 0.75rem;
  padding: 0.75rem;
  background: $bg-default;
  color: $text-main;
  cursor: pointer;
  text-align: left;
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  transition: all 0.2s ease;

  &:hover {
    border-color: $border-active;
  }

  &.active {
    background: $bg-active;
    border-color: $border-active;
    color: $text-active;
  }
}

.name {
  font-size: 0.95rem;
  font-weight: 600;
}

.hint {
  font-size: 0.8rem;
  color: $text-secondary;
}

.error {
  color: $error;
}
