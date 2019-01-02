export const currencyFormatter = ({ locale, currency }) => (
  new Intl.NumberFormat(locale, { style: 'currency', currency })
)

export const dateFormatter = ({ locale }) => (
  new Intl.DateTimeFormat(locale, { day: 'numeric', month: 'short', year: 'numeric' })
)
