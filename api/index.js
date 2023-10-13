const express = require("express");
const bodyParser = require("body-parser");
const {MongoClient} = require("mongodb");
const PgMem = require("pg-mem");

const db = PgMem.newDb();

    const render = require("./render.js");
// Measurements database setup and access

let database = null;
const collectionName = "measurements";

async function startDatabase() {
    const uri = "mongodb://localhost:27017/?maxPoolSize=20&w=majority";	
    const connection = await MongoClient.connect(uri, {useNewUrlParser: true});
    database = connection.db();
}

async function getDatabase() {
    if (!database) await startDatabase();
    return database;
}

async function insertMeasurement(message) {
    message.ts = new Date()
    message.m_id = await database.collection(collectionName).countDocuments()+1
    const {insertedId} = await database.collection(collectionName).insertOne(message);
    console.log("Se registra medición #"+message.m_id)
    return insertedId;
}

async function getMeasurements() {
    return await database.collection(collectionName).find({}).toArray();	
}

// API Server

const app = express();

app.use(bodyParser.urlencoded({extended:false}));

app.use(express.static('spa/static'));

const PORT = 8080;

app.post('/measurement', function (req, res) {
-   console.log("device id    : " + req.body.id + " key         : " + req.body.key + " temperature : " + req.body.t + " humidity    : " + req.body.h
        + " timestamp    :"+ new Date());	
    const {insertedId} = insertMeasurement({id:req.body.id, t:req.body.t, h:req.body.h});
	res.send("received measurement into " +  insertedId);
});

app.post('/device', function (req, res) {
	console.log("device id    : " + req.body.id + " name        : " + req.body.n + " key         : " + req.body.k 
                + " time_post   : " + Date());

    db.public.none("INSERT INTO devices VALUES ('"+req.body.id+ "', '"+req.body.n+"', '"+req.body.k+ "', '"+Date() +"')");
	res.send("received new device");
});

app.get('/web/device', function (req, res) {
    console.log("Consulta web de los dispositivos: /web/device");
	var devices = db.public.many("SELECT * FROM devices").map( function(device) {
		return '<tr><td><a href=/web/device/'+ device.device_id +'>' + device.device_id + "</a>" +
			       "</td><td>"+ device.name+"</td><td>"+ device.key+"</td><td>"+ device.time_post +"</td></tr>";
	   }
	);
    var html_device="<html>"+
                    "<head><title>Sensores</title></head>" +
                    "<body><h1> Lista de Sensores</h1><table border=\"1\">" +
                    "<tr><th>id</th><th>name</th><th>key</th><th>time post</th></tr>";
    devices.forEach((dev) => {
        html_device += dev
        });
    html_device += "</table></body></html>";
	res.send(html_device);
});

app.get('/web/measurement', async function (req, res) {
    console.log("Consulta web de las mediciones: /web/measurement");
    const measurements = await getMeasurements()
	var measurements_list = measurements.map( function(measurement) {
		return '<tr><td><a href=/web/device/'+ measurement.id +'>' + measurement.id + "</a>" +
			       "</td><td><a href=/web/measurement/"+ measurement.m_id +">"+ measurement.m_id + "</a></td><td>" 
                   + measurement.t+"</td><td>" + measurement.h+"</td><td>"+ measurement.ts +"</td></tr>";
	   }
	);
    var html_measurement=
             "<html>"+
		     "<head><title>Mediciones</title></head>" +
		     "<body>" +
             "<h1> Lista de Mediciones </h1>"+
		        "<table border=\"1\">" +
		           "<tr><th>device_id</th><th>measurement_id</th><th>temperature</th><th>humidity</th><th>time post</th></tr>";
    measurements_list.forEach((mesurement_row) => {
        html_measurement += mesurement_row
    });
    html_measurement +="</table></body></html>"
	res.send(html_measurement);
});

app.get('/web/measurement/:id', async function (req,res) {
    console.log("Consulta web de medición por id");
    const measurements = await getMeasurements();
    const measurement = measurements.find((m) => m.m_id === parseInt(req.params.id));
    var template = "<html>"+
                     "<head><title> Measurement #{{m_id}}</title></head>" +
                     "<body>" +
		        "<h1> Measurement #{{ m_id }}</h1>"+
                "Device ID: {{ id }} <br/>" +
		        "Temperature  : {{ t }}<br/>" +
		        "Humidity : {{ h }}<br/>" +
                "Time post : {{ ts }}" +
                     "</body>" +
                "</html>";

    console.log(measurement);
    res.send(render(template,{m_id:measurement.m_id, id: measurement.id, t:measurement.t, h:measurement.h, ts:measurement.ts}));
});	

app.get('/web/device/:id', function (req,res) {
    console.log("Consulta web de dispositivo por id");
    var template = "<html>"+
                     "<head><title>Sensor {{name}}</title></head>" +
                     "<body>" +
		        "<h1>{{ name }}</h1>"+
		        "id  : {{ id }}<br/>" +
		        "Key : {{ key }}<br/>" +
                "time post : {{ time_post }}" +
                     "</body>" +
                "</html>";


    var device = db.public.many("SELECT * FROM devices WHERE device_id = '"+req.params.id+"'");
    console.log(device);
    res.send(render(template,{id:device[0].device_id, key: device[0].key, name:device[0].name, time_post:device[0].time_post}));
});	

app.get('/web/measurement/bydevice/:id', async function (req,res) {
    console.log("Consulta web de medición por dispositivo");
    const measurements = await getMeasurements();
    const measurements_device = measurements.filter((m) => m.id === req.params.id);
    var measurements_list = measurements_device.map( function(measurement) {
		return '<tr><td><a href=/web/device/'+ measurement.id +'>' + measurement.id + "</a>" +
			       "</td><td><a href=/web/measurement/"+ measurement.m_id +">"+ measurement.m_id + "</a></td><td>" 
                   + measurement.t+"</td><td>" + measurement.h+"</td><td>"+ measurement.ts +"</td></tr>";
	   }
	);
    var html_measurement=
             "<html>"+
		     "<head><title>Mediciones del dispositivo "+req.params.id+"</title></head>" +
		     "<body>" +
             "<h1> Mediciones del dispositivo "+req.params.id+"</h1>"+
		        "<table border=\"1\">" +
		           "<tr><th>device_id</th><th>measurement_id</th><th>temperature</th><th>humidity</th><th>time post</th></tr>";
    measurements_list.forEach((mesurement_row) => {
        html_measurement += mesurement_row
    });
    html_measurement +="</table></body></html>"
	res.send(html_measurement);
});	

app.get('/term/device/:id', function (req, res) {
    var red = "\33[31m";
    var green = "\33[32m";
    var blue = "\33[33m";
    var reset = "\33[0m";
    var template = "Device name " + red   + "   {{name}}" + reset + "\n" +
		   "       id   " + green + "       {{ id }} " + reset +"\n" +
	           "       key  " + blue  + "  {{ key }}" + reset +"\n";
    var device = db.public.many("SELECT * FROM devices WHERE device_id = '"+req.params.id+"'");
    console.log(device);
    res.send(render(template,{id:device[0].device_id, key: device[0].key, name:device[0].name}));
});

app.get('/measurement', async (req,res) => {
    console.log("Se consulta lista de mediciones")
    res.send(await getMeasurements());
});

app.get('/device', function(req,res) {
    console.log("Se consulta lista de dispositivos")
    res.send( db.public.many("SELECT * FROM devices") );
});

startDatabase().then(async() => {

    const addAdminEndpoint = require("./admin.js");
    addAdminEndpoint(app, render);

    console.log("mongo measurement database Up");
    await insertMeasurement({id:'00', t:'18', h:'78'});
    await insertMeasurement({id:'00', t:'19', h:'77'});
    await insertMeasurement({id:'00', t:'17', h:'77'});
    await insertMeasurement({id:'01', t:'17', h:'77'});

    db.public.none("CREATE TABLE devices (device_id VARCHAR, name VARCHAR, key VARCHAR, time_post VARCHAR)");
    db.public.none("INSERT INTO devices VALUES ('00', 'Fake Device 00', '123456', '"+Date()+"')");
    db.public.none("INSERT INTO devices VALUES ('01', 'Fake Device 01', '234567', '"+Date()+"')");
    db.public.none("INSERT INTO devices VALUES ('03', 'Sensor DHT11', '345678', '"+Date()+"')");
    db.public.none("CREATE TABLE users (user_id VARCHAR, name VARCHAR, key VARCHAR)");
    db.public.none("INSERT INTO users VALUES ('1','Ana','admin123')");
    db.public.none("INSERT INTO users VALUES ('2','Beto','user123')");

    console.log("sql device database up");

    app.listen(PORT, () => {
        console.log(`Listening at ${PORT}`);
    });
});
