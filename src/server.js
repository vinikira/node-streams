import http from 'http'
import { randomUUID } from 'crypto'
import { Readable } from 'stream'

function* generate() {
  for (let i = 0; i < 99; i++) {
    const data = {
      id: randomUUID(),
      name: `Vinícius - ${i}`
    }

    yield data
  }
}

function handler(_req, res) {
  const readable = new Readable({
    read() {
      for (const data of generate()) {
        console.log('sending', data)
        this.push(JSON.stringify(data) + '\n')
      }

      this.push(null)
    }
  })

  readable
    .pipe(res)
}

http.createServer(handler)
  .on('listening', () => {
    console.log('listening on 3000')
  })
  .listen(3000)
