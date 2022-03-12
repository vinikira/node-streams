import axios from 'axios'
import { Transform, Writable } from 'stream'

async function consume() {
  const response = await axios({
    url: 'http://localhost:3000',
    responseType: 'stream'
  })

  return response.data
}

const stream = await consume()

stream
  .pipe(new Transform({
    transform(chunk, _enc, cb) {
      const item = JSON.parse(chunk)

      const myNumber = /\d+/.exec(item.name)[0]

      item.name = myNumber % 2 === 0
        ? item.name.concat(' é par')
        : item.name.concat(' é ímpar')

      cb(null, JSON.stringify(item))
    }
  }))
  .pipe(new Writable({
    write(chunk, _enc, cb) {
      console.log('já chegou o disco voador ', chunk.toString())

      cb()
    }
  }))
