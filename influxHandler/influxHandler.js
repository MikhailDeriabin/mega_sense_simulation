const {Point, InfluxDB, HttpError} = require("@influxdata/influxdb-client");
const {SensorValue} = require("../MQTT/sensorValue");

class InfluxHandler {
    #url = process.env.INFLUX_URL;
    #token = process.env.INFLUX_TOKEN;
    #org = process.env.INFLUX_ORGANIZATION;
    #bucket = process.env.INFLUX_ESP86_BUCKET_ID;

    write = async (obj) => {
        const point = new Point('weather')
            .tag('station', 'esp86')
            .floatField(SensorValue[0], obj[SensorValue[0]])
            .floatField(SensorValue[1], obj[SensorValue[1]])
            .timestamp(new Date().getTime());

        const writeApi = new InfluxDB({url: this.#url, token: this.#token}).getWriteApi(this.#org, this.#bucket, 'ms');
        writeApi.writePoint(point);
        try {
            await writeApi.close();
        } catch (e) {
            if (e instanceof HttpError) {
                console.error(e.statusCode);
                console.error(e.statusMessage);
            } else
                console.log(e);
        }
    }
}

module.exports = { InfluxHandler };