$(document).ready(function () {
    var t,
        u,
        o,
        e = "",
        n = $("#url").data("url"),
        i = L.map("map").setView([8.469984047578587, 77.07428546801513], 12);
    L.tileLayer("https://{s}.tile.osm.org/{z}/{x}/{y}.png", { attribution: ' <a href="https://icfoss.in" target="_blank">ICFOSS</a> ' }).addTo(i);
    var a = L.icon({ iconUrl: "/static/img/gateway.png", iconSize: [38, 45], iconAnchor: [38, 45], popupAnchor: [-20, -45] }),
        r = L.icon({ iconUrl: "/static/img/aws.png", iconSize: [90, 90], iconAnchor: [38, 45], popupAnchor: [-20, -45] });
    L.marker([8.51081175, 77.04602599819256], { icon: a })
        .addTo(i)
        .on("mouseover", function () {
            t = "0000000000000000";
        })

        .bindPopup("Sasthampara Gateway")
        .openPopup(),
        L.marker([8.469984047578587, 77.07428546801513], { icon: r })
            .bindPopup("DVM NNM HSS Maranalloor, Kattakkada")
            .on("click", function () {
                u = "https://redirect.icfoss.org?client=kslub208";
                (t = "0903060000010208"), this.openPopup();
            })
            .on("mouseover", function () {
                u = "https://redirect.icfoss.org?client=kslub208";
                (t = "0903060000010208"), this.openPopup();
            })
            .addTo(i),
        L.marker([8.51250008835944, 77.01064747671836], { icon: r })
            .bindPopup("St.Xaviers HSS , Peyad")
            .on("click", function () {
                u = "https://redirect.icfoss.org?client=kslub207 ";
                (t = "0903060000010207"), this.openPopup();
            })
            .on("mouseover", function () {
                u = "https://redirect.icfoss.org?client=kslub207 ";
                (t = "0903060000010207"), this.openPopup();
            })
            .addTo(i),
        L.marker([8.476665038288077, 77.01556502568695], { icon: r })
            .bindPopup("Govt. HSS Vilavoorkkal, Malayam")
            .on("click", function () {
                u = "https://redirect.icfoss.org?client=kslub203 ";
                (t = "0903060000010203"), this.openPopup();
            })
            .on("mouseover", function () {
                u = "https://redirect.icfoss.org?client=kslub203 ";
                (t = "0903060000010203"), this.openPopup();
            })
            .addTo(i),
        L.marker([8.488257731555766, 77.03956608150747], { icon: r })
            .bindPopup("Govt. Vocational Girls HSS Malayinkeezhu")
            .on("click", function () {
                u = "https://redirect.icfoss.org?client=kslub204 ";
                (t = "0903060000010204"), this.openPopup();
            })
            .on("mouseover", function () {
                u = "https://redirect.icfoss.org?client=kslub204 ";
                (t = "0903060000010204"), this.openPopup();
            })
            .addTo(i),
        L.marker([8.45189750772182, 77.00775838150726], { icon: r })
            .bindPopup("VVHSS Nemom")
            .on("click", function () {
                u = "https://redirect.icfoss.org?client=kslub205 ";
                (t = "0903060000010205"), this.openPopup();
            })
            .on("mouseover", function () {
                u = "https://redirect.icfoss.org?client=kslub205 ";
                (t = "0903060000010205"), this.openPopup();
            })
            .addTo(i),
        L.marker([8.505024265228807, 77.07599092383568], { icon: r })
            .bindPopup("Kulathummal Govt.HSS, Kattakkada")
            .on("click", function () {
                u = "https://redirect.icfoss.org?client=kslub206 ";
                (t = "0903060000010206"), this.openPopup();
            })
            .on("mouseover", function () {
                u = "https://redirect.icfoss.org?client=kslub206 ";
                (t = "0903060000010206"), this.openPopup();
            })
            .addTo(i),
   
        i.on("popupopen", function (i) {
            i.popup.getLatLng();
            $.ajax({
                type: "POST",
                url: n,
                headers: { Authorization: "" },  // Replace with your actual InfluxDB token
                data: { deveui: t },
                success: function (t) {
                    console.log(t); // Log the response to the console
                
                    if ("ok" == t.status) {
                        o = t.name;
                        e =
                            "<p><h4><b>" +
                            o +
                            "</b></h4></p> <p><h6>LastSeen:" +
                            t.battery.time +
                            '</h6></p> <table class="table table-striped"> <thead> <tr> <th>Parameters</th> <th>Value</th> </tr> </thead> <tbody> <tr> <td>Temperature</td> <td>' +
                            t.temperature.value +
                            "&#8451;</td> </tr> <tr> <td>Pressure</td> <td>" +
                            t.pressure.value +
                            "&#13169;</td> </tr> <tr> <td>Humidity</td> <td>" +
                            t.humidity.value +
                            "&#x25;</td> </tr> <tr> <td>Rain</td> <td>" +
                            t.rain.value +
                            "</td> </tr> <tr> <td>WindSpeed</td> <td>" +
                            t.windspeed.value +
                            "Kmph</td> </tr> <tr> <td>WindDirection</td> <td>" +
                            t.winddir.value +
                            "</td> </tr> <tr> <td>Rssi</td> <td>" +
                            t.rssi.value +
                            '</td> </tr> </tbody> </table> <a href="' +
                            u +
                            '" target="_blank"><p style="color:blue;"><b>Click here to see full view</b></p></a>';
                        
                        setTimeout(function () {
                            i.popup.setContent(e);
                        }, 1000);
                    } else {
                        o = t.name;
                        setTimeout(function () {
                            i.popup.setContent('<p>No data available </p>,<p><a href="' + u + '" target="_blank"><p style="color:blue;"><b>Click here to see full view</b></p></a></p>');
                        }, 1000);
                    }
                },
                
            });
        }), 
        i.on("popupclose", function (t) {
            t.popup.setContent(o), (o = "");
        });
});
