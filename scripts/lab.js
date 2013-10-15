var lab = {
    'initMap' : function () {
        var map = new L.Map("map")
                    .setView(new L.LatLng(41.440, -76.525), 10)
                    .addLayer(new L.TileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png'));
	    if (map) {
		d3.json("./data/test.json", function (error, json) {
		    if (error) {
			console.log("ERROR: Couldn't load your stupid file");
		    }
		    console.log(json);
		    function bpSPUD(feature, layer) {
				if (feature.properties) {
				    var p = feature.properties;
				    var c = "<ul><li><strong>Well Name</strong>: " + p.LABEL +"</li>" + 
				    "<li><strong>Well API</strong>: " + p.WELL_API + "</li>" +
					"<li><strong>Date Drilled</strong>: " + p.SPUD_DT+ "</li></ul>";
				    layer.bindPopup(c);
				}
		    }
		    function bpPooling(feature, layer) {
				if (feature.properties) {
				    var p = feature.properties;
				    var c = "<ul><li><strong>Unit Name</strong>: " + p.UNIT +"</li>" + 
				    "<li><strong>Operator</strong>: " + p.OPERATOR + "</li>" +
					"<li><strong>Recorded Date</strong>: " + p.RECORDED+ "</li></ul>";
				    layer.bindPopup(c);
				}
		    }
		    function bpPipe(feature, layer) {
				if (feature.properties) {
				    var p = feature.properties;
				    var c = "<ul><li><strong>Project Name</strong>: " + p.PROJ_NM +"</li>" + 
				    "<li><strong>Operator</strong>: " + p.OPERATOR + "</li>" +
					"<li><strong>Recorded Date</strong>: " + p.RECORDED+ "</li></ul>";
				    layer.bindPopup(c);
				}
		    }

		    var pipeStyle = {
			color:"#ff0000",
		    };
		    var pipeLyr = L.geoJson(json.pipe, {
				style: pipeStyle,

		    }).addTo(map);


		    var poolingLyr = L.geoJson(json.pooling, {
		    	style: function(feature) {
		    	    switch (feature.properties.RuleID) {
		    		case 1: return {color: "#ff0000"};
		    		case 2: return {color: "#0000ff"};
		    	    }
		    	},
		    	onEachFeature: bpPooling,
		    }).addTo(map);

		    var ChesapeakeMarker = {
			radius: 6,
			fillColor: "#ff0000",
			color: "#ff0000",
			weight: 1,
			opacity: 1,
			fillOpacity: 0.8
		    };

		    var ChiefMarker = {
			radius: 6,
			fillColor: "#0000ff",
			color: "#0000ff",
			weight: 1,
			opacity: 1,
			fillOpacity: 0.8
		    };

			var SPUDLyr = L.geoJson(json.SPUD, {
			    pointToLayer: function (feature, latlng) {
					if (feature.properties.OPERATOR == "CHESAPEAKE APPALACHIA LLC") {
					    return L.circleMarker(latlng, ChesapeakeMarker);
					} else {
					    return L.circleMarker(latlng, ChiefMarker);
					}
			    },
			    onEachFeature: bpSPUD,
		    }).addTo(map);
			var overlayMaps = {
				"Pooling Units": poolingLyr,
				"Proposed Pipeline": pipeLyr,
				"SPUD Wells": SPUDLyr,
			};

			L.control.layers({},overlayMaps).addTo(map);
	});
    } else {
	console.log("ERROR: The map was not .");
	return;
    }
    }
};
