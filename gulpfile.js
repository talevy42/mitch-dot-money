const _ = require('lodash')
const gulp = require('gulp')
const fs = require('fs')
const parse = require('csv-parse/lib/sync')

const ignoreColumns = ['Links', 'Location']

const convertToJson = async done => {
  const csv = fs.readFileSync('./csv/donors.csv').toString()
  const json = parse(csv, { columns: true })
  fs.writeFileSync('./src/data/donors.json', JSON.stringify(json))
  done()
}

gulp.task('convertToJson', convertToJson)
