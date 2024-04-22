const express = require('express');
const app= express();
const cors = require('cors');
const UserData = require('./mongoose');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.post('/', async(req, res) => {
    const { uniq_id, content} = req.body;
    try{
    await UserData.findOneAndUpdate({uniq_id}, {content} ,{upsert:true});
    res.json({ success: true });
    }
    catch(err){
        res.status(500).json({ error: error.message });
    }
    
});
app.get('/hello', async(req, res) => {
  res.send('hello');
});
app.get('/', async(req, res) => {
 
    const uniq_id = req.query.uniq_id;
    try {
      const userData = await UserData.findOne({ uniq_id });
      res.json(userData);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
   } );
   app.listen(4000, () => {
    console.log("Server running on port 4000");
});
   module.exports = app;




