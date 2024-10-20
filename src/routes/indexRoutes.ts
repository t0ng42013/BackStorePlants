import express from 'express';



const router = express.Router();

router.get('/', (req, res) => {

     const htmlTemplate = `   
   <html>
         <head>
               <meta charset="UTF-8" />
               <link rel="icon" type="image/svg+xml" href="https://cdn-icons-png.flaticon.com/256/15196/15196933.png" />
               <meta name="viewport" content="width=device-width, initial-scale=1.0" />
               <title>API+BackStore</title>
         </head>
         <body>
              <h1>Typescript Node Starter</h1>
              <p>Simple starter project for Node.js using Typescript</p>
         </body>
   </html>
   `
     res.send(htmlTemplate)
     // res.status(200).json({ message: 'API' });
});


export default router;