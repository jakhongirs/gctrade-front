const timeouts: { [key: string]: any } = {}

const cTimeout = (key = 'key') => {
  if (timeouts[key]) {
    clearTimeout(timeouts[key])
    timeouts[key] = undefined
  }
}

export const debounce = (key = 'key', fn = () => {}, timeout = 500) => {
  const sTimeout = (key: string, fn: any, timeout: number) => {
    cTimeout(key)

    timeouts[key] = setTimeout(() => {
      try {
        fn()
      } catch (e) {
        console.log(e)
      }

      timeouts[key] = undefined
    }, timeout)
  }

  return sTimeout(key, fn, timeout)
}
export function formatPhone(x: string) {
  return x
    ? x.replace(/(\d{3})(\d{2})(\d{3})(\d{2})(\d{2})/, '$1 $2 $3 $4 $5')
    : ''
}
export function formatNumber(number: string | number) {
  return number && number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
}

export function formatMoneyDecimal(number: any, fix = 0, option = 'decimal') {
  let style: string
  if (['USD', 'RUB'].includes(option)) {
    style = 'currency'
  } else if (['kilogram', 'meter', 'percent'].includes(option)) {
    style = 'unit'
  } else {
    style = ''
  }

  const newStyle: string = style
  const option2 = {
    newStyle, //  unit currency percent decimal
    [newStyle]: option,
    maximumFractionDigits: fix,
    minimumFractionDigits: fix,
  }
  return number
    ? new Intl.NumberFormat('ru-RU', option2).format(number)
    : '0,00'
}
