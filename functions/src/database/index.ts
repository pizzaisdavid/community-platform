import { _2023_06_16_contentModifiedTimestamp } from './migrations/2023-06-16_contentModifiedTimestamp'

import { audit } from './audit'

exports.schemaAudit = audit

exports._2023_06_16_contentModifiedTimestamp =
  _2023_06_16_contentModifiedTimestamp
