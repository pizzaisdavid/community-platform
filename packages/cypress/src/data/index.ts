/**
 * Simple re-export of all the data within the shared mocks
 * Can be imported locally as individual namespaces or combined
 * @example
 * ```
 * import { howtos } from '../data'
 * ```
 * or
 * ```
 * import { MOCK_DATA } from '../data
 * ```
 *
 **/

import * as allData from './../../../../shared/mocks/data'

export const MOCK_DATA = {
  ...allData,
}
