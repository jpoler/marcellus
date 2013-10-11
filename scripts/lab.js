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

		    L.geoJson(json.pipe, {
			style: function(feature) {
			    switch (feature.properties.TYPE) {
			    	console.log(feature.properties.TYPE)
				case 1: return {fillColor: "#000000"};
				case 3: return {fillColor: "#ffff00"};
			    }
			}
		    }).addTo(map);

		    L.geoJson(json.pooling, {
		    	style: function(feature) {
		    	    switch (feature.properties.RuleID) {
		    		case 1: return {color: "#ff0000"};
		    		case 2: return {color: "#0000ff"};
		    	    }
		    	}
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

			L.geoJson(json.SPUD, {
				pointToLayer: function (feature, latlng) {
					if (feature.properties.OPERATOR == "CHESAPEAKE APPALACHIA LLC") {
				    	return L.circleMarker(latlng, ChesapeakeMarker);
				    } else {
				    	return L.circleMarker(latlng, ChiefMarker);
				    }
				}
		    }).addTo(map);

		    // L.geoJson(json.SPUD, {
		    // 	style: function(feature) {
		    // 	    switch (feature.properties.OPERATOR) {
		    // 		case 'CHESAPEAKE APPALACHIA LLC': return {color: "#ff0000"};
		    // 		case 'CHIEF OIL & GAS LLC': return {color: "#0000ff"};
		    // 	    }
		    // 	}
		    // }).addTo(map);
	});
    } else {
	console.log("ERROR: The map was not .");
	return;
    }
    }
};
