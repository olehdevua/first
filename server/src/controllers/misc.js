module.exports = function() {
  return {
    index(req, resp) {
      resp.send(`
        <html>
          <head>
              <meta charset="utf-8">
              <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
              <meta name="theme-color" content="#000000">
              <!--
                manifest.json provides metadata used when your web app is added to the
                homescreen on Android. See https://developers.google.com/web/fundamentals/engage-and-retain/web-app-manifest/
              -->
              <link rel="manifest" href="/manifest.json">
              <link rel="shortcut icon" href="/favicon.ico">
              <link
                rel="stylesheet"
                href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.6/css/bootstrap.min.css"
                integrity="sha384-rwoIResjU2yc3z8GV/NPeZWAv56rSmLldC3R/AZzGRnGxQQKnKkoFVhFQhNUwEyJ"
                crossorigin="anonymous"
              >
              <title>React App</title>
          </head>
            <body>
              <noscript>
                You need to enable JavaScript to run this app.
              </noscript>
              <div id="root">
              <script src="/main.js" type="text/javascript"></script>
          </body>
        </html>
      `);
    }
  };
};