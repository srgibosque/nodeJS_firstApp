const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
  const url = req.url;
  const method = req.method;

  if (url === '/') {
    res.write('<html>');
    res.write('<body>');
    res.write('<h1>Main screen</h1>');
    res.write('<form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send</button></form>');
    res.write('</body>');
    res.write('</html>');
    return res.end();
  }

  if (url === '/message' && method === 'POST') {
    const body = [];
    // It sets an event listener. It fires whenever a chunk of data is received
    req.on('data', (chunk) => {
      body.push(chunk);
    });

    // event listener that fires when its done parsing data.
    req.on('end', () => {
      // to work with the chunks we need to Buffer them. We add all the chunks to a buffer
      const parsedBody = Buffer.concat(body).toString();
      const message = parsedBody.split('=')[1];
      console.log(parsedBody);
      // Write a txt file with the message in it. 
      fs.writeFileSync('message.txt', message);
    });
    res.statusCode = 302;
    res.setHeader('Location', '/');
    return res.end();
  }
});

// Keeps listening for incoming requests
server.listen(3000);