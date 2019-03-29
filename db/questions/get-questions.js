const {keyBy, flatten, uniq} = require('lodash')
const assert = require('assert')
const bhQuestions1 = require('./bh-questions/bh-questions-1.json')
const bhQuestions2 = require('./bh-questions/bh-questions-2.json')
const bhQuestions3 = require('./bh-questions/bh-questions-3.json')
const hebrewWords = require('hebrew-words')

const getQuestions = () => {

  const allQuestions = []
  let hWordFailureCount = 0
  let hWordSuccessCount = 0
  let type

  const bhQuestions = flatten([bhQuestions1, bhQuestions2, bhQuestions3])

  bhQuestions.forEach(question => {

    assert(Array.isArray(question.english) && question.english.length > 0) // english
    assert(typeof question.notes === 'string' || question.notes === null) // notes
    assert(Array.isArray(question.hebrew) && question.hebrew.length > 0) // hebrew
    assert(typeof question.lesson === 'number') // lesson
    assert(Array.isArray(question.msfp) && question.msfp.length === question.hebrew.length) // msfp
    assert(typeof question.cat === 'string') // cat
    assert(Array.isArray(question.penultimateStress) && question.penultimateStress.length === question.hebrew.length) // penultimateStress

    question.msfp.forEach(msfp => {
      if (!['ms', 'fs', 'mp', 'fp', null].includes(msfp)) console.warn(`WARNING: Unusual msfp "${msfp}" in question`, question.english)
    })

    if (!['noun', 'preposition', 'verb', 'adjective', 'proper noun', 'negative particle', 'number', 'conjunction'].includes(question.cat))
      console.warn(`WARNING: Unusual category "${question.cat}" in question`, question.english)

    // if (question.hebrew.length > 1) console.warn(`INFO: ${question.hebrew.length} Hebraic questions found for question`, question.english)

    // set hWords and eWords
    const hWords = question.hebrew.map(word => {
      const hWord = hebrewWords(word)
      if (!hWord.ok) {
        hWordFailureCount++
        console.warn(hWord)
      } else {
        hWordSuccessCount++
      }
      return hWord
    })
    const eWords = question.english.map(word => ({word}))

    // generate questions
    type = 'english-hebrew'
    const englishHebrew = {
      id: type + '-' + question.english.join('-').replace(' ', '-'),
      q: eWords,
      a: hWords,
      lesson: question.lesson,
      msfp: question.msfp,
      cat: question.cat,
      type
    }
    allQuestions.push(englishHebrew)

    type = 'hebrew-english'
    const hebrewEnglish = {
      id: type + '-' + question.english.join('-').replace(' ', '-'),
      q: hWords,
      a: eWords,
      lesson: question.lesson,
      msfp: question.msfp,
      cat: question.cat,
      type
    }
    allQuestions.push(hebrewEnglish)
  })

  const ids = allQuestions.map(q => q.id)
  const uniqIds = uniq(ids)
  if (ids.length !== uniqIds.length) throw Error('ids in db are not unique')

  console.log('Hebrew word failure count', hWordFailureCount)
  console.log('Hebrew word success count', hWordSuccessCount)
  console.log('Question count', allQuestions.length)

  return keyBy(allQuestions, 'id')
}

module.exports = getQuestions
