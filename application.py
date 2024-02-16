# from datetime import datetime
from dateutil.tz import tzlocal
from influxdb_client import InfluxDBClient, Point, WritePrecision
from flask import Flask, jsonify, request, render_template

format = "%Y-%m-%d , %I:%M:%S %p"
# key = "...."
key = ""
app = Flask(__name__)

name = {
    "0903060000010203": "Govt. HSS Vilavoorkkal, Malayam",
    "0903060000010204": "Govt. Vocational Girls HSS Malayinkeezhu",
    "0903060000010205": "VVHSS Nemom",
    "0903060000010206": "Kulathummal Govt.HSS, Kattakkada",
    "0903060000010207": "St.Xaviers HSS , Peyad",
    "0903060000010208": "DVM NNM HSS Maranalloor, Kattakkada",
    "0000000000000000": "Sasthampara Gateway"
}
@app.route('/')
def map_func():
    return render_template('index.html')
    
@app.route('/fetch', methods=['POST'])
def fetchdata():
    auth = request.headers.get("Authorization","")
    dev_eui = request.form.get("deveui")
    print(dev_eui)
    print(f"auth: {auth}, key: {key}, dev_eui: {dev_eui}")

    if auth == key and dev_eui:
        main = {}
        try:
            with InfluxDBClient(url="http://103.119.179.2:8086", token="", org="icfoss") as client:
                query = f'from(bucket: "AWSdb") |> range(start: -30m) |> filter(fn: (r) => r.dev_eui == "{dev_eui}")'
                result = client.query_api().query(org="icfoss", query=query)

            
                for table in result:
                    for record in table.records:
                        measurement_name = record.get_measurement()
                        field_name = record.get_field()
                        timestamp = record.get_time().astimezone(tzlocal()).strftime(format)
                        value = record.get_value()

                        if measurement_name == "device_frmpayload_data_battery_voltage":
                            main["battery"] = {"time": timestamp, "value": value / 100}
                        elif measurement_name == "device_frmpayload_data_humidity":
                            main["humidity"] = {"time": timestamp, "value": value / 10}
                        elif measurement_name == "device_frmpayload_data_pressure":
                            main["pressure"] = {"time": timestamp, "value": value / 10}
                        elif measurement_name == "device_frmpayload_data_rainfall":
                            main["rain"] = {"time": timestamp, "value": value / 10}
                        elif measurement_name == "device_frmpayload_data_temperature":
                            main["temperature"] = {"time": timestamp, "value": value / 10}
                        elif measurement_name == "device_frmpayload_data_wind_direction":
                            main["winddir"] = {"time": timestamp, "value": value / 10}
                        elif measurement_name == "device_frmpayload_data_wind_speed":
                            main["windspeed"] = {"time": timestamp, "value": value / 100}
                        elif measurement_name == "device_uplink" and field_name == "rssi":
                            main["rssi"] = {"time": timestamp, "value": value}

                if main:
                    main['name'] = name.get(dev_eui, "")
                    main['status'] = 'ok'
                else:
                    return jsonify({"status": "nodata", "name": name.get(dev_eui, "")})

                return jsonify(main)
        except Exception as e:
            return jsonify({"status": "error", "message": str(e)})
    else:
        return jsonify({"status": "fail"})


if __name__ == '__main__':
    app.run(debug=True)

