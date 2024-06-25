import * as functions from 'firebase-functions'
import { DB_ENDPOINTS } from '../models'
import { db } from '../Firebase/firestoreDB'

/**
 * Script to check if the data confirms to expectations.
 * This script is read-only and does not make changes.
 */
export const audit = functions
  .runWith({ memory: '512MB' })
  .https.onCall(async (_: any, context) => {

    const researchStatistics = {
      updatesType: createEmptyTypeStatistics(),
      updates: {
        collaboratorsType: createEmptyTypeStatistics(),
      },
    }

    if (!context.auth) {
      throw new functions.https.HttpsError(
        'failed-precondition',
        'The function must be called while authenticated.',
      )
    }

    try {
      functions.logger.info('Starting audit...')

      functions.logger.info('Checking research articles...')

      const researchArticlesSnapshot = await db
        .collection(DB_ENDPOINTS.research)
        .get()

      for (const researchArticleSnapshot of researchArticlesSnapshot.docs) {
        const researchArticle = researchArticleSnapshot.data()

        const updates = researchArticle.updates
        const updatesType = getSmartType(updates)

        researchStatistics.updatesType[updatesType]++

        if (updatesType === SmartType.Array) {
          
          for (const update of updates) {
            const collaboratorsType = update.collaborators
            researchStatistics.updates.collaboratorsType[collaboratorsType]++
          }
        }
      }

      return {
        researchStatistics: researchStatistics,
      }
    } catch (error) {
      console.error(error)
      throw new functions.https.HttpsError(
        'internal',
        'There was an error setting last edit timestamps.',
      )
    }
  })

enum SmartType {
  Array = 'array',
  Bigint = 'bigint',
  Boolean = 'boolean',
  Function = 'function',
  Null = 'null',
  Number = 'number',
  Object = 'object',
  String = 'string',
  Symbol = 'symbol',
  Undefined = 'undefined',
}

function getSmartType(value: any): SmartType {
  if (value === null) {
    return SmartType.Null
  }
  if (Array.isArray(value)) {
    return SmartType.Array
  }
  typeof value
}

function createEmptyTypeStatistics(): { [value in SmartType]: number } {
  return {
    [SmartType.Array]: 0,
    [SmartType.Bigint]: 0,
    [SmartType.Boolean]: 0,
    [SmartType.Function]: 0,
    [SmartType.Null]: 0,
    [SmartType.Number]: 0,
    [SmartType.Object]: 0,
    [SmartType.String]: 0,
    [SmartType.Symbol]: 0,
    [SmartType.Undefined]: 0,
  }
}
