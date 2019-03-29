const {keyBy, flatten, uniq} = require('lodash')
const assert = require('assert')
const questions1 = require('./bh-questions-1.json')
const questions2 = require('./bh-questions-2.json')
const hebrewWords = require('hebrew-words')

const getQuestions = () => {

  const allQuestions = []
  let hWordFailureCount = 0
  let hWordSuccessCount = 0
  let type

  const questions = flatten([questions1, questions2])

  questions.forEach(question => {

    assert.strictEqual(question.hebrew.length, question.msfp.length, question.english + ' failed')

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
