import parse from 'date-fns/parse'
import exchangeRatesReducer, { initialState } from '../reducer'
import types from '../types'

describe('exchangeRate reducer', () => {
  it('should return initial state', () => {
    expect(exchangeRatesReducer(undefined, {})).toEqual(initialState)
  })

  it('should handle LOAD_EXCHANGE_RATES', () => {
    const type = types.LOAD_EXCHANGE_RATES
    const payload = {
      VET: {
        exchangeRate: '1',
        updatedOn: '2018-11-30'
      }
    }
    expect(exchangeRatesReducer(undefined, { type, payload })).toEqual(payload)
  })

  it('should handle LOAD_EXCHANGE_RATES with no existing data', () => {
    const type = types.LOAD_EXCHANGE_RATES
    const payload = null
    expect(exchangeRatesReducer(undefined, { type, payload })).toEqual(initialState)
  })

  it('should handle UPDATE_EXCHANGE_RATES', () => {
    const type = types.UPDATE_EXCHANGE_RATES
    const dates = [
      parse('2018-11-30', 'yyyy-M-d', new Date()).getTime(),
      parse('2018-12-1', 'yyyy-M-d', new Date()).getTime()
    ]
    const state = {
      VET: { [dates[0]]: 1 },
      CAD: { [dates[0]]: 1.2 }
    }
    const payload = { '2018-12-1': { VET: 1.1 } }
    expect(exchangeRatesReducer(state, { type, payload })).toEqual({
      ...state,
      VET: {
        ...state.VET,
        [dates[1]]: 1.1
      }
    })
  })

  it('should handle UPDATE_EXCHANGE_RATES for new value', () => {
    const type = types.UPDATE_EXCHANGE_RATES
    const dates = [parse('2018-11-30', 'yyyy-M-d', new Date()).getTime()]
    const payload = { '2018-11-30': { VET: 1.1 } }
    expect(exchangeRatesReducer(undefined, { type, payload })).toEqual({
      VET: { [dates[0]]: 1.1 }
    })
  })

  it('should handle DELETE_CURRENCIES for new value', () => {
    const type = types.DELETE_CURRENCIES
    const dates = [parse('2018-11-30', 'yyyy-M-d', new Date()).getTime()]
    const state = {
      VET: {
        [dates[0]]: 1,
        dates: [String(dates[0])]
      },
      VAB: {
        [dates[0]]: 2,
        dates: [String(dates[0])]
      }
    }

    expect(exchangeRatesReducer(state, { type, payload: ['VET'] })).toEqual({
      VAB: {
        [dates[0]]: 2,
        dates: [String(dates[0])]
      }
    })
  })
})
