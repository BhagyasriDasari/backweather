const sqlite3=require('sqlite3');
const db=new sqlite3.Database('./weather.db',(err)=>{
    if (err) {
          console.log('Database connection Failed:', err.message);
    }
    else {
        console.log("COnnected to Database");

        db.run(`CREATE TABLE IF NOT EXISTS weatherdataofcities (
            id INtEGER PRIMARY KEY AUTOINCREMENT,
            city_name TEXT NOT NULL,
            temperature REAL,
            humidity INTEGER,
            weather_conditions TEXT,
            timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
        )`);
    }
})


module.exports=db;