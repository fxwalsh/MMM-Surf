/* global Module */
/* Magic Mirror
 * Module: MMM-Surf 
 * By PrivacyWonk 
 * CC BY-NC 4.0 Licensed.
 */


Module.register("MMM-Surf", {

    // Default module config.
    defaults: {
        debug: 0,        //Debug is turned off by default
	// Magicseaweed API Configuration
        MagicSeaweedAPIBase: "http://magicseaweed.com/api/",
        forecastEndpoint: "/forecast/?spot_id=",
	//Surf forecast (Magicseaweed) variables
        MagicAPI: "",           //MagicSeaweed API Key
        MagicSeaweedSpotID: "", //spot ID from magic seaweed URL (e.g. 319 from http://magicseaweed.com/Ocean-City-NJ-Surf-Report/391/)
        MagicSeaweedSpotName: "", // shorthand name for your spot...e.g. Secret Spot / Lowers / The End / etc
        spotCoast: "",          //what coast the spot sits on values are "N, E, S, W"
        spotSwellHold: [],      //best swell direction for spot. Accepts multiple cardinal directions, e.g. "N","S","SSW","ESE" see: https://en.wikipedia.org/wiki/Compass_rose#/media/File:Kompassrose.svg
        spotWind: [],           //best wind direction for spot. Accepts multiple cardinal directions, e.g. "N","S","SSW","ESE"
        spotSwellMin: "",       //minimum swell size that works at the spot
        spotSwellMax: "",       //maximum swell size that works at the spot
            // Define wind directions that are bad for a spot. E.g. if east coast spot, winds blowing E->W are bad / onshore or N<->S are sideshore.)
        eastSpotBadWinds: ["NNE", "NE", "ENE", "E", "ESE", "SE", "SSE"],
        westSpotBadWinds: ["SSW", "SW", "WSW", "W", "WNS", "NW", "NNW"],
        northSpotBadWinds: ["WNW", "NW", "NNW", "N", "NNE", "NE", "ENE"],
        southSpotBadWinds: ["ESE", "SE", "SSW", "S", "SSE", "SE", "WSW"],
            // define wind thresholds. less than green max, between green and orange max, greater than red wind speeds
        greenWindMax: "", //in MPH
        orangeWindMax: "", //in MPH
        redWindMax: "", //in MPH
	//----------------------------------------
        //Dark Sky Base API URL
        DarkSkyAPIBase: "https://api.darksky.net/forecast/",
		// DarkSky variables
        DarkSkyAPI: "",         //API key for DarkSky from darksky.net
        DarkSkyLat: "",         //Latitude for forecast
        DarkSkyLong: "",        //Longtitude for forecast
	//-----------------------------------------
	// NOAA API Configuration
        NOAAapiBase: "https://tidesandcurrents.noaa.gov/api/",
		//NOAA Variables
        station_id: "", //Numeric station ID from NOAA
        noaatz: "", // gmt, lst, lst_ldt (Local Standard Time or Local Daylight Time) of station
	//----------------------------------------
	//Other variables
        units: config.units,
        windunits: "mph", // choose from mph, bft
        updateInterval: 30*60*1000, // conversion to milliseconds (Minutes * 60 Seconds * 1000). Only change minutes. Be kind, don't hammer APIs.
        animationSpeed: 1000,
        timeFormat: config.timeFormat,
        lang: config.language,
        showWindDirection: true,
        fade: true,
        fadePoint: 0.25, // Start on 1/4th of the list.
        roundTmpDecs: 1,
        iconset: "VCloudsWeatherIcons",
        retryDelay: 2500,
        iconTableDay: {
            "chanceflurries": "wi-day-snow-wind",
            "chancerain": "wi-day-showers",
            "chancesleet": "wi-day-sleet",
            "chancesnow": "wi-day-snow",
            "chancetstorms": "wi-day-storm-showers",
            "clear": "wi-day-sunny",
            "cloudy": "wi-cloud",
            "flurries": "wi-snow-wind",
            "fog": "wi-fog",
            "haze": "wi-day-haze",
            "hazy": "wi-day-haze",
            "mostlycloudy": "wi-cloudy",
            "mostlysunny": "wi-day-sunny-overcast",
            "partlycloudy": "wi-day-cloudy",
            "partlysunny": "wi-day-cloudy-high",
            "rain": "wi-rain",
            "sleet": "wi-sleet",
            "snow": "wi-snow",
            "tstorms": "wi-thunderstorm"
        },

        iconTableNight: {
            "chanceflurries": "wi-night-snow-wind",
            "chancerain": "wi-night-showers",
            "chancesleet": "wi-night-sleet",
            "chancesnow": "wi-night-alt-snow",
            "chancetstorms": "wi-night-alt-storm-showers",
            "clear": "wi-night-clear",
            "cloudy": "wi-night-alt-cloudy",
            "flurries": "wi-night-alt-snow-wind",
            "fog": "wi-night-fog",
            "haze": "wi-night-alt-cloudy-windy",
            "hazy": "wi-night-alt-cloudy-windy",
            "mostlycloudy": "wi-night-alt-cloudy",
            "mostlysunny": "wi-night-alt-partly-cloudy",
            "partlycloudy": "wi-night-alt-partly-cloudy",
            "partlysunny": "wi-night-alt-partly-cloudy",
            "rain": "wi-night-alt-rain",
            "sleet": "wi-night-alt-sleet",
            "snow": "wi-night-alt-snow",
            "tstorms": "wi-night-alt-thunderstorm"
        },

        iconTableCompliments: {
            "chanceflurries": "13",
            "chancerain": "10",
            "chancesleet": "13",
            "chancesnow": "13",
            "chancetstorms": "11",
            "clear": "01",
            "cloudy": "02",
            "flurries": "13",
            "fog": "50",
            "haze": "50",
            "hazy": "50",
            "mostlycloudy": "03",
            "mostlysunny": "02",
            "partlycloudy": "02",
            "partlysunny": "02",
            "rain": "10",
            "sleet": "13",
            "snow": "13",
            "tstorms": "11"
        }

    },



    // Define required translations.
    getTranslations: function() {
        return {
            en: "translations/en.json",
            nl: "translations/nl.json",
            de: "translations/de.json",
            dl: "translations/de.json",
            fr: "translations/fr.json",
            pl: "translations/pl.json"

        };
    },

    // Add moment.js functionality.
    getScripts: function() {
        return ["moment.js"];
    },

    // Import CSS files.
    getStyles: function() {
        return ["weather-icons.css", "weather-icons-wind.css", "font-awesome.css", "MMM-Surf.css"];
    },

    // Define start sequence.
    start: function() {
        Log.info("Starting module: " + this.name);

        // Set locale.
        moment.locale(config.language);
        this.forecast = [];
        this.hourlyforecast = [];
        this.loaded = false;
        this.error = false;
        this.errorDescription = "";
	//this.getNOAA();
	//this.getDarkSky();
    this.getMagicseaweed();
    
    //this.getM5Buoy();

    this.getTideData();

	this.lastUpdatedTime = ""; 
        this.haveforecast = 0;
    },

    //getNOAA: function() {
    //    if (this.config.debug === 1) { Log.info(moment().format('YYYY-MM-DDTHH:mm:ss.SSSZZ') + " SOCKET(SEND TO HELPER): GET_NOAA (1):"); }
    //    this.sendSocketNotification("GET_NOAA", this.config);
    //}, //end getNOAA function

    getDarkSky: function() {
        if (this.config.debug === 1) { Log.info(moment().format('YYYY-MM-DDTHH:mm:ss.SSSZZ') + " SOCKET(SEND TO HELPER): GET_DARKSKY (1):"); }
        this.sendSocketNotification("GET_DARKSKY", this.config);
    }, //end getDarkSky

    getMagicseaweed: function() {
        if (this.config.debug === 1) { Log.info(moment().format('YYYY-MM-DDTHH:mm:ss.SSSZZ') + " SOCKET(SEND TO HELPER): GET_MAGIC (1):"); }
        this.sendSocketNotification("GET_MAGIC", this.config);
    }, //end getMagicseaweed function

    getM5Buoy: function() {
        if (this.config.debug === 1) { Log.info(moment().format('YYYY-MM-DDTHH:mm:ss.SSSZZ') + " SOCKET(SEND TO HELPER): GET_M5 (1):"); }
        this.sendSocketNotification("GET_M5", this.config);
    }, //end getM5 function

    getTideData: function() {
        if (this.config.debug === 1) { Log.info(moment().format('YYYY-MM-DDTHH:mm:ss.SSSZZ') + " SOCKET(SEND TO HELPER): GET_M5 (1):"); }
        this.sendSocketNotification("GET_Tide", this.config);
    }, //end getTide function



    // Override dom generator.
    getDom: function() {
        var wrapper = document.createElement("div");
        var f;
        var forecast;
        var iconCell;
        var icon;
        var popCell;
        var mmCell;
        var hourCell;
        var dayCell;
        var startingPoint;
        var currentStep;
        var steps;

        if (this.error) {
            wrapper.innerHTML = "Error: " + this.errorDescription;
            wrapper.className = "dimmed light small";
            return wrapper;
        }

        if (!this.loaded) {
            wrapper.innerHTML = this.translate("LOADING");
            wrapper.className = "dimmed light small";
            return wrapper;
        }


        // ------------------ 12 HOUR SURF FORECAST ------------------
        //TODO: Make Vertical format work with Surf Forecast! Currently only horizontal
		//TODO: Add vertical v. horizontal test?
        var table = document.createElement("table");

            var fctable = document.createElement("div");
            var divider = document.createElement("hr");
            divider.className = "hrDivider";
            fctable.appendChild(divider);
            table = document.createElement("table");
            table.className = "small";
            table.setAttribute("width", "25%");
	    //table.setAttribute("border", 1); // for layout testing only

			row_forecastDay = document.createElement("tr"); 			//layout row for Day and Time
			row_forecastRating = document.createElement("tr"); 			//layout row for Magicseaweed star rating
			row_swellCharacteristics = document.createElement("tr"); 	// layout row for swell height and periodicity
			row_swell = document.createElement("tr"); 					// layout row for swell direction icon and text
			row_wind = document.createElement("tr"); 					//layout row for wind direction icon and text

			for (f in this.magicforecast12hrs) {
				dayTimeCell = document.createElement("td");
				dayTimeCell.setAttribute('style', 'text-align: center;');
				dayTimeCell.className = "hour";
				dayTimeCell.innerHTML = this.magicforecast12hrs[f].day + " " + this.magicforecast12hrs[f].hour;
				row_forecastDay.appendChild(dayTimeCell);
				//Render Magicseaweed star rating
				magicseaweedStarRating = document.createElement("td");
				magicseaweedStarRating.setAttribute('style', 'text-align: center;');
				magicseaweedStarRating.className = "align-center bright weather-icon";
				icon = document.createElement("span");
				if (this.magicforecast12hrs[f].rating.length == 0) {
					//icon.className = "wi wi-na"; //old NA icon
					icon.innerHTML = "<span class=\"swellred\"><i class=\"fa fa-times-circle\"></i></span>";	
				} else {
					icon.innerHTML = this.magicforecast12hrs[f].rating.join(" ");
				}
				magicseaweedStarRating.appendChild(icon);
				row_forecastRating.appendChild(magicseaweedStarRating);
				//swell height and period
				swellConditionsCell = document.createElement("td");
				swellConditionsCell.setAttribute('style', 'text-align: center;');
                                /* Evaluate periodicity of swell and pop an indicator color
                                *  red = not surfable
                                *  orange = surfable but sloppy
                                *  green = go go go
                                *  source: https://magicseaweed.com/help/forecast-table/wave-period-overview
				*  Evaluate wave height for spot from config. If between Min and Max, pop green
                                */
                                if (this.magicforecast12hrs[f].swellHeight >= this.config.spotSwellMin && this.magicforecast12hrs[f].swellHeight <= this.config.spotSwellMax) {
                                        swellHeightRender = "<span class=\"swellgreen\">" + this.magicforecast12hrs[f].swellHeight +"'</span> @ "; }
                                else {
                                        swellHeightRender = this.magicforecast12hrs[f].swellHeight + "' @ ";}

                                if (this.magicforecast12hrs[f].swellPeriod >= 0 && this.magicforecast12hrs[f].swellPeriod <= 6)
                                        {swellPeriodRender = "<span class=\"swellred\">" + this.magicforecast12hrs[f].swellPeriod + "s</span>";}

                                if (this.magicforecast12hrs[f].swellPeriod >= 7 && this.magicforecast12hrs[f].swellPeriod <= 9)
                                        {swellPeriodRender = "<span class=\"swellorange\">" + this.magicforecast12hrs[f].swellPeriod + "s</span>";}

                                if (this.magicforecast12hrs[f].swellPeriod >= 10)
                                        {swellPeriodRender = "<span class=\"swellgreen\">" + this.magicforecast12hrs[f].swellPeriod + "s</span>";}
				swellConditionsCell.innerHTML = swellHeightRender.concat(swellPeriodRender);
				swellConditionsCell.className = "hour";
				row_swellCharacteristics.appendChild(swellConditionsCell);
				//swell direction
				swellInfo = document.createElement("td");
				swellInfoCell = document.createElement("strong");
				swellInfo.setAttribute('style', 'text-align: center;');
				swellInfoCell.innerHTML = "Swell: &nbsp;";
				swellInfoCell.className = "hour";
				swellInfo.appendChild(swellInfoCell);

				swellInfoCell = document.createElement("i");

			for (i = 0, count = this.config.spotSwellHold.length; i < count; i++) {
					if (this.config.debug === 1) { 
						//Log.info("SWELL (forecast/spothold): "+ this.magicforecast12hrs[f].swellCompassDirection+"/"+this.config.spotSwellHold[i]);
					}

					if (this.config.spotSwellHold[i] === this.magicforecast12hrs[f].swellCompassDirection) {
						//Swell direction is the direction the swell is coming from, as opposed to the direction it is heading toward. 
						//The arrow displayed will have the small point facing the origin of the swell
						swellInfoCell.className = "wi wi-wind from-" + Math.round(this.magicforecast12hrs[f].swellDirection) + "-deg swellgreen";
						break;
					} else{
						swellInfoCell.className = "wi wi-wind from-" + Math.round(this.magicforecast12hrs[f].swellDirection) + "-deg";
					}
					} // end swell colorization loop	

				swellInfo.appendChild(swellInfoCell);

				swellInfoCell = document.createElement("i");
				swellInfoCell.innerHTML = "&nbsp;&nbsp;" + this.magicforecast12hrs[f].swellCompassDirection;
				swellInfoCell.className = "hour";
				swellInfo.appendChild(swellInfoCell);
				row_swell.appendChild(swellInfo);

				//wind direction
				windInfo = document.createElement("td");
				windInfo.setAttribute('style', 'text-align: center;');
				windInfoCell = document.createElement("strong");
				windInfoCell.innerHTML = "Wind: &nbsp;";
				windInfoCell.className = "hour";
				windInfo.appendChild(windInfoCell);
				windInfoCell = document.createElement("i");
			
				for (i = 0, count = this.config.spotWind.length; i < count; i++) {
					//if (this.config.debug === 1) { Log.info("WIND: " + this.magicforecast12hrs[f].windCompassDirection + " / " + this.config.spotWind[i]);}
						if (this.config.spotWind[i] === this.magicforecast12hrs[f].windCompassDirection) {
						//Wind direction is reported by the direction from which it originates. 
						//For example, a northerly wind blows from the north to the south.
						//The arrow displayed will have the small point facing the origin of the wind
							windInfoCell.className = "wi wi-wind " + this.magicforecast12hrs[f].windDirection + " swellgreen";
							break;
					} else {
						// If statements to pop-color on sideshore and onshore winds determined - roughly - by the spot orientation
						// if the spot is on the east coast, then any winds coming from the east, blowing west, are on shore and ugly (red)
						// Wind directions have alreadybeen set in *SpotBadWinds in the config stanza
                                                if (this.config.spotCoast === "E") {
                                                                if (this.config.eastSpotBadWinds.indexOf(this.magicforecast12hrs[f].windCompassDirection) != -1) {
                                                                        windInfoCell.className = "wi wi-wind " + this.magicforecast12hrs[f].windDirection + " swellred";
                                                                } else {
                                                                        windInfoCell.className = "wi wi-wind " + this.magicforecast12hrs[f].windDirection + " swellorange";
                                                                }
                                                        }
                                                if (this.config.spotCoast === "W") {
                                                                if (this.config.westSpotBadWinds.indexOf(this.magicforecast12hrs[f].windCompassDirection) != -1) {
                                                                        windInfoCell.className = "wi wi-wind " + this.magicforecast12hrs[f].windDirection + " swellred";
                                                                } else {
                                                                        windInfoCell.className = "wi wi-wind " + this.magicforecast12hrs[f].windDirection + " swellorange";
                                                                }
                                                        }
                                                if (this.config.spotCoast === "N") {
                                                                if (this.config.northSpotBadWinds.indexOf(this.magicforecast12hrs[f].windCompassDirection) != -1) {
                                                                        windInfoCell.className = "wi wi-wind " + this.magicforecast12hrs[f].windDirection + " swellred";
                                                                } else {
                                                                        windInfoCell.className = "wi wi-wind " + this.magicforecast12hrs[f].windDirection + " swellorange";
                                                                }
                                                        }
                                                if (this.config.spotCoast === "S") {
                                                                if (this.config.southSpotBadWinds.indexOf(this.magicforecast12hrs[f].windCompassDirection) != -1) {
                                                                        windInfoCell.className = "wi wi-wind " + this.magicforecast12hrs[f].windDirection + " swellred";
                                                                } else {
                                                                        windInfoCell.className = "wi wi-wind " + this.magicforecast12hrs[f].windDirection + " swellorange";
                                                                }
                                                        }
                                                } // end else loop
                                } // end wind colorization loop


				windInfo.appendChild(windInfoCell);

				windInfoCell = document.createElement("i");

                                if (this.magicforecast12hrs[f].windGusts <=this.config.greenWindMax) {
                                	windInfoCell.innerHTML = "&nbsp;" + this.magicforecast12hrs[f].windCompassDirection + "<br>" + "Steady: " + this.magicforecast12hrs[f].windSpeed + "mph<br>"  +"<span class=\"swellgreen\">Gusts: </span>" +this.magicforecast12hrs[f].windGusts + "mph";
                                }
                                if (this.magicforecast12hrs[f].windGusts > this.config.greenWindMax && this.magicforecast12hrs[f].windGusts <= this.config.orangeWindMax) {
                                         windInfoCell.innerHTML = "&nbsp;" + this.magicforecast12hrs[f].windCompassDirection + "<br>" + "Steady: " + this.magicforecast12hrs[f].windSpeed + "mph<br>"  +"<span class=\"swellorange\">Gusts: </span>" +this.magicforecast12hrs[f].windGusts + "mph";
                                }
                                if (this.magicforecast12hrs[f].windGusts >= this.config.redWindMax) {
                                        windInfoCell.innerHTML = "&nbsp;" + this.magicforecast12hrs[f].windCompassDirection + "<br>" + "Steady: " + this.magicforecast12hrs[f].windSpeed + "mph<br>"  +"<span class=\"swellred\">Gusts: </span>" +this.magicforecast12hrs[f].windGusts + "mph";
				}

				//windInfoCell.innerHTML = "&nbsp;" + this.magicforecast12hrs[f].windCompassDirection + "<br>" + "Steady: " + this.magicforecast12hrs[f].windSpeed + "mph<br>"  +"Gusts: " +this.magicforecast12hrs[f].windGusts + "mph";
				windInfoCell.className = "hour";
				windInfo.appendChild(windInfoCell);
				row_wind.appendChild(windInfo);

				var nl = Number(f) + 1;
				if ((nl % 4) === 0) {
					table.appendChild(row_forecastDay);
					table.appendChild(row_forecastRating);
					table.appendChild(row_swellCharacteristics);
					table.appendChild(row_swell);
					table.appendChild(row_wind);
					row_forecastDay = document.createElement("tr");
					row_forecastRating = document.createElement("tr");
					row_swellCharacteristics = document.createElement("tr");
					row_swell = document.createElement("tr");
					row_wind = document.createElement("tr");
				}
				//Force 12-hour row to stay on one line...not entirely sure how this works.	
				if (f > 2) {
					break;
				}


			} //end magicforecast12hrs for loop

			//write out Forecast table (every 3 hours)
			table.appendChild(row_forecastDay);
			table.appendChild(row_forecastRating);
			table.appendChild(row_swellCharacteristics);
			table.appendChild(row_swell);
			table.appendChild(row_wind);
			fctable.appendChild(table);
			fctable.appendChild(divider.cloneNode(true));



            // ------------------ DAILY SURF FORECAST ------------------
            table = document.createElement("table");
            table.className = "small";
            table.setAttribute("width", "25%");

            row_forecastDay = document.createElement("tr");
            row_forecastRating = document.createElement("tr");
            row_swellCharacteristics = document.createElement("tr");
            row_swell = document.createElement("tr");
            row_wind = document.createElement("tr");
	    row_lastUpdated = document.createElement("tr");

			for (f in this.magicforecastDaily) {
				dayCell = document.createElement("td");
				dayCell.setAttribute('style', 'text-align: center;');
				dayCell.className = "hour";
				dayCell.innerHTML = this.magicforecastDaily[f].day + " " + this.magicforecastDaily[f].hour;
				row_forecastDay.appendChild(dayCell);
				//rating
				magicseaweedStarRating = document.createElement("td");
				magicseaweedStarRating.setAttribute('style', 'text-align: center;');
				magicseaweedStarRating.className = "align-center bright weather-icon";
				icon = document.createElement("span");
				if (this.magicforecastDaily[f].rating.length == 0) {
					//icon.className = "wi wi-na";
					icon.innerHTML = "<span class=\"swellred\"><i class=\"fa fa-times-circle\"></i></span>";
				} else {
					icon.innerHTML = this.magicforecastDaily[f].rating.join(" ");
				}
				magicseaweedStarRating.appendChild(icon);
				row_forecastRating.appendChild(magicseaweedStarRating);
				//swell height and period
				swellConditionsCell = document.createElement("td");
				swellConditionsCell.setAttribute('style', 'text-align: center;');
                                /* Evaluate periodicity of swell and pop an indicator color
                                *  red = not surfable
                                *  orange = surfable but sloppy
                                *  green = go go go
                                *  source: https://magicseaweed.com/help/forecast-table/wave-period-overview
                                *  Evaluate wave height for spot from config. If between Min and Max, pop green
                                */
                                if (this.magicforecastDaily[f].swellHeight >= this.config.spotSwellMin && this.magicforecastDaily[f].swellHeight <= this.config.spotSwellMax) {
                                        swellHeightRender = "<span class=\"swellgreen\">" + this.magicforecastDaily[f].swellHeight +"'</span> @ "; }
                                else {
                                        swellHeightRender = this.magicforecastDaily[f].swellHeight + "' @ ";}

                                if (this.magicforecastDaily[f].swellPeriod >= 0 && this.magicforecastDaily[f].swellPeriod <= 6)
                                        {swellPeriodRender = "<span class=\"swellred\">" + this.magicforecastDaily[f].swellPeriod + "s</span>";}

                                if (this.magicforecastDaily[f].swellPeriod >= 7 && this.magicforecastDaily[f].swellPeriod <= 9)
                                        {swellPeriodRender = "<span class=\"swellorange\">" + this.magicforecastDaily[f].swellPeriod + "s</span>";}

                                if (this.magicforecastDaily[f].swellPeriod >= 10)
                                        {swellPeriodRender = "<span class=\"swellgreen\">" + this.magicforecastDaily[f].swellPeriod + "s</span>";}
				swellConditionsCell.innerHTML = swellHeightRender.concat(swellPeriodRender);
				swellConditionsCell.className = "hour";
				row_swellCharacteristics.appendChild(swellConditionsCell);
				//swell direction
				swellInfo = document.createElement("td");
				swellInfo.setAttribute('style', 'text-align: center;');
				swellInfoCell = document.createElement("strong");
				swellInfoCell.innerHTML = "Swell: &nbsp;";
				swellInfoCell.className = "hour";
				swellInfo.appendChild(swellInfoCell);
				swellInfoCell = document.createElement("i");
				for (i = 0, count = this.config.spotSwellHold.length; i < count; i++) {
					//Log.info("Swell Compass Direction: "+ this.magicforecastDaily[f].swellCompassDirection);
					//Log.info("Spot Best Swell: " +this.config.spotSwellHold[i]);

					if (this.config.spotSwellHold[i] === this.magicforecastDaily[f].swellCompassDirection) {
							//Swell direction is the direction the swell is coming from, as opposed to the direction it is heading toward.
							//The arrow displayed will have the small point facing the origin of the swell
							swellInfoCell.className = "wi wi-wind from-" + Math.round(this.magicforecastDaily[f].swellDirection) + "-deg swellgreen";
							break;
					} else{
							swellInfoCell.className = "wi wi-wind from-" + Math.round(this.magicforecastDaily[f].swellDirection) + "-deg";
					}
				} // end swell colorization loop
				swellInfo.appendChild(swellInfoCell);

				swellInfoCell = document.createElement("i");
				swellInfoCell.innerHTML = "&nbsp;&nbsp;" + this.magicforecastDaily[f].swellCompassDirection;
				swellInfoCell.className = "hour";
				swellInfo.appendChild(swellInfoCell);

				row_swell.appendChild(swellInfo);
				//wind direction
				windInfo = document.createElement("td");
				windInfo.setAttribute('style', 'text-align: center;');
				windInfoCell = document.createElement("strong");
				windInfoCell.innerHTML = "Wind: &nbsp;";
				windInfoCell.className = "hour";
				windInfo.appendChild(windInfoCell);

				windInfoCell = document.createElement("i");
				for (i = 0, count = this.config.spotWind.length; i < count; i++) {

					if (this.config.spotWind[i] === this.magicforecastDaily[f].windCompassDirection) {
							//Wind direction is reported by the direction from which it originates. For example, a northerly wind blows from the north to the south.
							//The arrow displayed will have the small point facing the origin of the wind
							windInfoCell.className = "wi wi-wind " + this.magicforecastDaily[f].windDirection + " swellgreen";
							break;
					} else {
						// If statements to pop-color on sideshore and onshore winds determined - roughly - by the spot orientation
						// if the spot is on the east coast, then any winds coming from the east, blowing west, are on shore and ugly (red)
						// Wind directions have alreadybeen set in *SpotBadWinds in the config stanza
						if (this.config.spotCoast === "E") {
								if (this.config.eastSpotBadWinds.indexOf(this.magicforecastDaily[f].windCompassDirection) != -1) {
									windInfoCell.className = "wi wi-wind " + this.magicforecastDaily[f].windDirection + " swellred";
								} else {
									windInfoCell.className = "wi wi-wind " + this.magicforecastDaily[f].windDirection + " swellorange";
								}
							}
                                                if (this.config.spotCoast === "W") {
                                                                if (this.config.westSpotBadWinds.indexOf(this.magicforecastDaily[f].windCompassDirection) != -1) {
                                                                        windInfoCell.className = "wi wi-wind " + this.magicforecastDaily[f].windDirection + " swellred";
                                                                } else {
                                                                        windInfoCell.className = "wi wi-wind " + this.magicforecastDaily[f].windDirection + " swellorange";
                                                                }
                                                        }
                                                if (this.config.spotCoast === "N") {
                                                                if (this.config.northSpotBadWinds.indexOf(this.magicforecastDaily[f].windCompassDirection) != -1) {
                                                                        windInfoCell.className = "wi wi-wind " + this.magicforecastDaily[f].windDirection + " swellred";
                                                                } else {
                                                                        windInfoCell.className = "wi wi-wind " + this.magicforecastDaily[f].windDirection + " swellorange";
                                                                }
                                                        }														
                                                if (this.config.spotCoast === "S") {
                                                                if (this.config.southSpotBadWinds.indexOf(this.magicforecastDaily[f].windCompassDirection) != -1) {
                                                                        windInfoCell.className = "wi wi-wind " + this.magicforecastDaily[f].windDirection + " swellred";
                                                                } else {
                                                                        windInfoCell.className = "wi wi-wind " + this.magicforecastDaily[f].windDirection + " swellorange";
                                                                }
                                                        }
						} // end else loop
				} // end wind colorization loop
				windInfo.appendChild(windInfoCell);

				windInfoCell = document.createElement("i");
				if (this.magicforecastDaily[f].windGusts <=this.config.greenWindMax) {
				windInfoCell.innerHTML = "&nbsp;" + this.magicforecastDaily[f].windCompassDirection + "<br>" + "Steady: " + this.magicforecastDaily[f].windSpeed + "mph<br>"  +"<span class=\"swellgreen\">Gusts: </span>" +this.magicforecastDaily[f].windGusts + "mph";
				}
				if (this.magicforecastDaily[f].windGusts > this.config.greenWindMax && this.magicforecastDaily[f].windGusts <= this.config.orangeWindMax) {
					 windInfoCell.innerHTML = "&nbsp;" + this.magicforecastDaily[f].windCompassDirection + "<br>" + "Steady: " + this.magicforecastDaily[f].windSpeed + "mph<br>"  +"<span class=\"swellorange\">Gusts: </span>" +this.magicforecastDaily[f].windGusts + "mph";
				}
				if (this.magicforecastDaily[f].windGusts >= this.config.redWindMax) {
					windInfoCell.innerHTML = "&nbsp;" + this.magicforecastDaily[f].windCompassDirection + "<br>" + "Steady: " + this.magicforecastDaily[f].windSpeed + "mph<br>"  +"<span class=\"swellred\">Gusts: </span>" +this.magicforecastDaily[f].windGusts + "mph";
				}

				windInfoCell.className = "hour";
				windInfo.appendChild(windInfoCell);
				row_wind.appendChild(windInfo);

				var nl = Number(f) + 1;
				if ((nl % 4) === 0) {
					table.appendChild(row_forecastDay);
					table.appendChild(row_forecastRating);
					table.appendChild(row_swellCharacteristics);
					table.appendChild(row_swell);
					table.appendChild(row_wind);
					row_forecastDay = document.createElement("tr");
					row_forecastRating = document.createElement("tr");
					row_swellCharacteristics = document.createElement("tr");
					row_swell = document.createElement("tr");
					row_wind = document.createElement("tr");
				}

                               //Force Daily row to stay on one line...not entirely sure how this works.
			        if (f > 2) {
			        break;
			        }
			} //end magicForecastDaily loop
			
			//Close forecast table for rendering to UI
			table.appendChild(row_forecastDay);
			table.appendChild(row_forecastRating);
			table.appendChild(row_swellCharacteristics);
			table.appendChild(row_swell);
			table.appendChild(row_wind);
			fctable.appendChild(table);
			wrapper.appendChild(fctable);
	    		
	    		//lastupdated indicator
	    var table_lastUpdated = document.createElement("table");
	    var row_lastUpdated = document.createElement("tr");
	    lastUpdatedCell = document.createElement("td");
		lastUpdatedCell.setAttribute('style', "display:flex; flex-wrap: nowrap; align-items: center;font-size: 40%");
	    lastUpdatedCell.setAttribute("colSpan", "10");
	   // lastUpdatedCell.className = "weathericon";
	    lastUpdatedCell.innerHTML = "last updated at: " + this.lastUpdatedTime + "&nbsp; &nbsp; &nbsp; &nbsp;<img src='https://im-5.msw.ms/md/themes/msw_built/3/i/logo.png'>";
	    row_lastUpdated.appendChild(lastUpdatedCell);
	    table_lastUpdated.appendChild(row_lastUpdated);
	    wrapper.appendChild(table_lastUpdated);

        return wrapper; //return the wrapper to browser for rendering
    }, //end getDom function


 

   



    /* processMAGICSEAWEED (data)
     *
     * Uses the received Magicseaweed Forecast to display wave and swell data
     * 
     */

    processMAGICSEAWEED: function(data) {
        if (this.config.debug === 1) { Log.info(moment().format('YYYY-MM-DDTHH:mm:ss.SSSZZ') + " Processing Data: Magicseaweed (6)") };
        //if (this.config.debug === 1) {Log.info(data);}	//print Object to browser console 

        for (i = 0, count = data.length; i < count; i++) {
           	// identify the forecasts in the next 12 hours for rendering in 12hr
		// forecast row
		// Capture the forecast that is in the current window of 3 hours
		var currentForecast = moment.unix(data[i].localTimestamp);
		var now = new Date(); //current time/date for processing
		var firstForecast = moment(now).subtract(3, 'hours');
		var lastForecast = moment(firstForecast).add(12, 'hours'); 
	   if (currentForecast >= firstForecast && currentForecast <= lastForecast ) { 
                data[i].next12hrs = "true";
            } else {
                data[i].next12hrs = "false";
            }
	   if (currentForecast < firstForecast) {data[i].localTimestamp = "IGNORE";} //ignore things far in the past	
        } //end for loop


        for (i = 0, count = data.length; i < count; i++) {
		/* STEP 0
		 * Forecast score for displaying each day's best possible time to surf
		 * Crude but effective...remember, this is to make you look on the
		 * forecast websites for more data not SCIENCE!
		 */

		var forecastScore = 0;
		// MS star rating forms basis of score
		if (data[i].solidRating > 0) {forecastScore = data[i].solidRating;} 
		// +1 if the swell height is within bounds for the spot set in the config
		if (data[i].swell.components.primary.height >= this.config.spotSwellMin && data[i].swell.components.primary.height <= this.config.spotSwellMax) {forecastScore++;}
		// +1 if the period is over 8s
		if (data[i].swell.components.primary.period >=8) {forecastScore++;} 
		// +1 if swell direction is good for the spot as defined in config
                for (z = 0, countz = this.config.spotSwellHold.length; z < countz; z++) {
			if (this.config.spotSwellHold[z] == data[i].swell.components.primary.compassDirection) {forecastScore++;}
		} 
		// +1 if Wind direction is good for the spot as defined in config
                for (x = 0, countx = this.config.spotWind.length; x < countx; x++) {
			if (this.config.spotWind[x] == data[i].wind.compassDirection) {forecastScore++;}
		}
		// +1 is there are only 1 or 2 swells. 3 swells gets no points as it may be slop
		if (Object.keys(data[i].swell.components).length <=2) {forecastScore++;}
		// +1 if wind speed is less than 15mph
		if (data[i].wind.speed < 15) {forecastScore++;} 
		// -1 if wind speed is greater than or equal 15mph
		if (data[i].wind.speed >= 15) {forecastScore--;}
		// -1 if gusts are over 20 mph
		if (data[i].wind.gusts >= 20) {forecastScore--;}
		// -1 for generally unsurfable times 1am, 7pm, and 10pm
		if (moment.unix(data[i].localTimestamp).format('HH') == 01 || 
			//moment.unix(data[i].localTimestamp).format('HH') == 19 ||
			moment.unix(data[i].localTimestamp).format('HH') == 22) {forecastScore--;}
		data[i].forecastScore = forecastScore;
		data[i].forecastDay = moment.unix(data[i].localTimestamp).format('ddd');	
	} // end forecast score loop


	/*
	 * STEP 1 to find best forecast day:
	 * Build array with limited info from our raw Magicseaweed table
	 * Includes: Day, time (hour), score from above, and timestamp
	 */
	var forecastsByDateSortable = [];
	var forecastsByDateSorted = [];
	for (i = 0, count = data.length; i < count; i++) {
		if (data[i].localTimestamp != "IGNORE" && data[i].next12hrs == "false") {
                if(forecastsByDateSortable[data[i].forecastDay] == null) {
			forecastsByDateSortable.push({
			day: data[i].forecastDay,
			time: moment.unix(data[i].localTimestamp).format('hh:mm A'), 
                        score: data[i].forecastScore,
                        timestamp: data[i].localTimestamp});
                        
                } else {
                        forecastsByDateSortable.push({
			day: data[i].forecastDay,
			time: moment.unix(data[i].localTimestamp).format('hh:mm A'),
                        score: data[i].forecastScore,
                        timestamp: data[i].localTimestamp});
                }//end else
        	}//end if
	} //end for
	
	/*
	 * STEP 2: Sort Array created in Step 1 
	 * dynamicSort & dynamicSortMultiple from  
	 * StackOverflow user: https://stackoverflow.com/users/300011/ege-%c3%96zcan 
	 * https://stackoverflow.com/questions/1129216/sort-array-of-objects-by-string-property-value-in-javascript/4760279#4760279
	 */ 
	function dynamicSort(property) {
		var sortOrder = 1;
		if(property[0] === "-") {
			sortOrder = -1;
			property = property.substr(1);
		} //end if
		return function (a,b) {
			var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
			return result * sortOrder;
		} //end return function
	} //end dynamicSort function
	function dynamicSortMultiple() {
		/*
		 * save the arguments object as it will be overwritten
		 * note that arguments object is an array-like object
		 * consisting of the names of the properties to sort by
		 */
		var props = arguments;
		return function (obj1, obj2) {
			var i = 0, result = 0, numberOfProperties = props.length;
			/* try getting a different result from 0 (equal)
			 * as long as we have extra properties to compare
			 */
			while(result === 0 && i < numberOfProperties) {
				result = dynamicSort(props[i])(obj1, obj2);
				i++;
			} //end while
			return result;
		} // end return function
	} //end dynamicSortMultiple function


	//STEP 3 - Create new, sorted, array
	forecastsByDateSorted = forecastsByDateSortable.sort(dynamicSortMultiple("day", "-score"));

	//STEP 4 - Create new Object keyed by Day of week. The first entry per day is the "best".
	var forecastsByDate = {};
	for (i = 0, count = forecastsByDateSorted.length; i < count; i++) {
		if (forecastsByDate[forecastsByDateSorted[i].day] == null) {
			forecastsByDate[forecastsByDateSorted[i].day] = [];
		} //end if
		forecastsByDate[forecastsByDateSorted[i].day].push(forecastsByDateSorted[i]);
	} //end for

	//STEP 5 - Pull the timestamp(s) for the identified best days into an array.
	var bestTimestamps = [];
	for(var key in forecastsByDate) {
		bestTimestamps.push(forecastsByDate[key][0].timestamp);
	} //end for		

	//STEP 6 - match values in bestTimestamps array with timestamp values in data[]
	// set dailybest flag when values match 
	for (i = 0, count = data.length; i < count; i++) {		
		for (xz = 0, countxz = bestTimestamps.length; xz < countxz; xz++) {
			if (bestTimestamps[xz] == data[i].localTimestamp) {
				data[i].dailyBest = "true";
			} //end if
		} //end nested for
        } //end for	

	if (this.config.debug === 1) { Log.info(moment().format('YYYY-MM-DDTHH:mm:ss.SSSZZ') + " Magicseaweed API Response:") };
        if (this.config.debug === 1) { Log.info(data) }; //show data after manipulations above

        this.magicforecast12hrs = []; // rebuild MagicSeaweed hourly data to shape our needs
        this.magicforecastDaily = []; //daily
        for (i = 0, count = data.length; i < count; i++) {
            if (data[i].localTimestamp != "IGNORE") {
                this.magicday = moment.unix(data[i].localTimestamp).format('ddd');
                this.magichour = moment.unix(data[i].localTimestamp).subtract(1, 'hours').format('hh:mm A');
                this.solidRating = data[i].solidRating;
                this.fadedRating = data[i].fadedRating;
                //build star rating object based on https://magicseaweed.com/developer/forecast-api
                this.rating = [];
                // Loop the solid rating on a single forecast object.
                for (var j = 0; j < this.solidRating; j++) {
                   // this.rating.push('<img src="http://cdnimages.magicseaweed.com/star_filled.png" />');
			this.rating.push('<span class=\"swellgreen\"><i class="fa fa-small fa-star"></i></span>');
		}

                // Loop the faded rating on a single forecast object.
                for (var j = 0; j < this.fadedRating; j++) {
                    //this.rating.push('<img src="http://cdnimages.magicseaweed.com/star_empty.png" />');
                        //this.rating.push('<span class=\"swellblue\"><i class="fa fa-small fa-star-o"></i></span>'); //Star outline
			this.rating.push('<span class=\"swellorange\"><i class="fa fa-small fa-star"></i></span>');
		}
                // PROCESS SWELL INFO
                // set Multiple swell flag (indicator for viewer to goto site)
                this.swellCount = Object.keys(data[i].swell.components).length;
                if (this.swellCount >= 2) {
                    this.multipleSwell = "true";
                } else {
                    this.multipleSwell = "false";

                }
				
                //Pull Primary swell info only. ignore combined, secondary, and tertiary 
                //Ignored for screen space considerations
                this.swellMaxBreakingHeight = data[i].swell.maxBreakingHeight;
                this.swellMinBreakingheight = data[i].swell.minBreakingHeight;
                this.swellDirection = data[i].swell.components.primary.direction;
		this.swellCompassDirection = data[i].swell.components.primary.compassDirection;
                this.swellHeight = data[i].swell.components.primary.height;
                this.swellPeriod = data[i].swell.components.primary.period;
                this.winddirection = this.deg2Cardinal(data[i].wind.direction);
		this.windCompassDirection = data[i].wind.compassDirection; 
                this.windgusts = data[i].wind.gusts;
                this.windspeed = data[i].wind.speed;
                this.windunit = data[i].wind.unit;
                this.dailyBest = data[i].dailyBest;
                //Build next 12-hours forecast 
                if (data[i].next12hrs == "true") {
                    this.magicforecast12hrs.push({
                        day: this.magicday,
                        hour: this.magichour,
                        best: this.dailyBest,
                        solidRating: this.solidRating,
                        fadedRating: this.fadedRating,
                        rating: this.rating,
                        multipleSwell: this.multipleSwell,
                        swellCount: this.swellCount,
                        maxHeight: this.swellMaxBreakingHeight,
                        minHeight: this.swellMinBreakingheight,
                        swellDirection: this.swellDirection,
			swellCompassDirection: this.swellCompassDirection,
                        swellHeight: this.swellHeight,
                        swellPeriod: this.swellPeriod,
                        windDirection: this.winddirection,
			windCompassDirection: this.windCompassDirection,
                        windGusts: this.windgusts,
                        windSpeed: this.windspeed,
                        windUnit: this.windunit,
                    });
                } // end hourly forecast creation

                //Create daily forecast based on "dailyBest" declared variable
                if (data[i].dailyBest == "true") {
                    this.magicforecastDaily.push({
                        day: this.magicday,
                        hour: this.magichour,
                        best: this.dailyBest,
                        solidRating: this.solidRating,
                        fadedRating: this.fadedRating,
                        rating: this.rating,
                        multipleSwell: this.multipleSwell,
                        swellCount: this.swellCount,
                        maxHeight: this.swellMaxBreakingHeight,
                        minHeight: this.swellMinBreakingheight,
                        swellDirection: this.swellDirection,
			swellCompassDirection: this.swellCompassDirection,
                        swellHeight: this.swellHeight,
                        swellPeriod: this.swellPeriod,
                        windDirection: this.winddirection,
			windCompassDirection: this.windCompassDirection,
                        windGusts: this.windgusts,
                        windSpeed: this.windspeed,
                        windUnit: this.windunit,
                    });
                } //end magicforecastDaily
            } // end IGNORE if statement	
        } //end for loop

	if (this.config.debug === 1) { Log.info(moment().format('YYYY-MM-DDTHH:mm:ss.SSSZZ') + " Magicseaweed 12 Hours Forecast:") };
        if (this.config.debug === 1) { Log.info(this.magicforecast12hrs); } //print Object to browser console
	if (this.config.debug === 1) { Log.info(moment().format('YYYY-MM-DDTHH:mm:ss.SSSZZ') + " Magicseaweed Daily Forecast:") };
        if (this.config.debug === 1) { Log.info(this.magicforecastDaily); } //print Object to browser console

        this.loaded = true;
        this.updateDom(this.config.animationSpeed);
        if (this.config.debug === 1) { Log.info(moment().format('YYYY-MM-DDTHH:mm:ss.SSSZZ') + ' Rendering Magicseaweed data to UI (7)'); }
        if (this.config.debug === 1) { Log.info('-------------------------------------------------------------------'); }
    }, //end processMAGICSEAWEED

    // ------------------------------------ DATA SHAPING ROUTINES ----------------------------

    /* ms2Beaufort(ms)
     * Converts m2 to beaufort (windspeed).
     *
     * see:
     *  http://www.spc.noaa.gov/faq/tornado/beaufort.html
     *  https://en.wikipedia.org/wiki/Beaufort_scale#Modern_scale
     *
     * argument ms number - Windspeed in m/s.
     *
     * return number - Windspeed in beaufort.
     */
    ms2Beaufort: function(kmh) {
        var speeds = [1, 5, 11, 19, 28, 38, 49, 61, 74, 88, 102,
            117, 1000
        ];
        for (var beaufort in speeds) {
            var speed = speeds[beaufort];
            if (speed > kmh) {
                return beaufort;
            }
        }
        return 12;
    },

    wordwrap: function(str, width, brk) {

        brk = brk || "n";
        width = width || 75;


        if (!str) {
            return str;
        }

        var re = new RegExp(".{1," + width +
            "}(\\s|$)|\\ S+?(\\s|$)", "g");

        var wordwrapped = str.trim().match(RegExp(re));
        for (var i in wordwrapped) {
            wordwrapped[i] = wordwrapped[i].trim();
        }

        return wordwrapped.join(brk);

    },

    /* function(deg2Cardinal)
     * 
     * takes decimal degree and returns wind direction
     * 
     * note: direction returned is where the wind is blowing FROM 
     * 
     */

     moon_icon: function(moon_phase) {
        if (moon_phase >= 0 && moon_phase < 0.036) {
                return "wi-moon-new";
        } else if (moon_phase >= 0.036 && moon_phase < 0.071) {
                return "wi-moon-waxing-crescent-1";
        } else if (moon_phase >= 0.71 && moon_phase < 0.107) {
                return "wi-moon-waxing-crescent-2";
        } else if (moon_phase >= 0.107 && moon_phase < 0.143) {
                return "wi-moon-waxing-crescent-3";
        } else if (moon_phase >= 0.143 && moon_phase < 0.179) {
                return "wi-moon-waxing-crescent-4";
        } else if (moon_phase >= 0.179 && moon_phase < 0.214) {
                return "wi-moon-waxing-crescent-5";
        } else if (moon_phase >= 0.214 && moon_phase < 0.250) {
                return "wi-moon-waxing-crescent-6";
        } else if (moon_phase >= 0.250 && moon_phase < 0.286) {
                return "wi-moon-first-quarter";
        } else if (moon_phase >= 0.286 && moon_phase < 0.321) {
                return "wi-moon-waxing-gibbous-1";
        } else if (moon_phase >= 0.321 && moon_phase < 0.357) {
                return "wi-moon-waxing-gibbous-2";
        } else if (moon_phase >= 0.357 && moon_phase < 0.393) {
                return "wi-moon-waxing-gibbous-3";
        } else if (moon_phase >= 0.393 && moon_phase < 0.429) {
                return "wi-moon-waxing-gibbous-4";
        } else if (moon_phase >= 0.429 && moon_phase < 0.464) {
                return "wi-moon-waxing-gibbous-5";
        } else if (moon_phase >= 0.464 && moon_phase < 0.500) {
                return "wi-moon-waxing-gibbous-6";
        } else if (moon_phase >= 0.500 && moon_phase < 0.536) {
                return "wi-moon-full";
        } else if (moon_phase >= 0.536 && moon_phase < 0.571) {
                return "wi-moon-waning-gibbous-1";
        } else if (moon_phase >= 0.571 && moon_phase < 0.607) {
                return "wi-moon-waning-gibbous-2";
        } else if (moon_phase >= 0.607 && moon_phase < 0.643) {
                return "wi-moon-waning-gibbous-3";
        } else if (moon_phase >= 0.643 && moon_phase < 0.679) {
                return "wi-moon-waning-gibbous-4";
        } else if (moon_phase >= 0.679 && moon_phase < 0.714) {
                return "wi-moon-waning-gibbous-5";
        } else if (moon_phase >= 0.714 && moon_phase < 0.750) {
                return "wi-moon-waning-gibbous-6";
        } else if (moon_phase >= 0.750 && moon_phase < 0.786) {
                return "wi-moon-third-quarter";
        } else if (moon_phase >= 0.786 && moon_phase < 0.821) {
                return "wi-moon-waning-crescent-1";
        } else if (moon_phase >= 0.821 && moon_phase < 0.857) {
                return "wi-moon-waning-crescent-2";
        } else if (moon_phase >= 0.857 && moon_phase < 0.893) {
                return "wi-moon-waning-crescent-3";
        } else if (moon_phase >= 0.893 && moon_phase < 0.929) {
                return "wi-moon-waning-crescent-4";
        } else if (moon_phase >= 0.929 && moon_phase < 0.964) {
                return "wi-moon-waning-crescent-5";
        } else if (moon_phase >= 0.964 && moon_phase < 1.000) {
                return "wi-moon-waning-crescent-6";	
	} else {
		return "out-of-bounds";
	}
     },

    deg2Cardinal: function(deg) {
        if (deg > 11.25 && deg <= 33.75) {
            return "wi-from-nne";
        } else if (deg > 33.75 && deg <= 56.25) {
            return "wi-from-ne";
        } else if (deg > 56.25 && deg <= 78.75) {
            return "wi-from-ene";
        } else if (deg > 78.75 && deg <= 101.25) {
            return "wi-from-e";
        } else if (deg > 101.25 && deg <= 123.75) {
            return "wi-from-ese";
        } else if (deg > 123.75 && deg <= 146.25) {
            return "wi-from-se";
        } else if (deg > 146.25 && deg <= 168.75) {
            return "wi-from-sse";
        } else if (deg > 168.75 && deg <= 191.25) {
            return "wi-from-s";
        } else if (deg > 191.25 && deg <= 213.75) {
            return "wi-from-ssw";
        } else if (deg > 213.75 && deg <= 236.25) {
            return "wi-from-sw";
        } else if (deg > 236.25 && deg <= 258.75) {
            return "wi-from-wsw";
        } else if (deg > 258.75 && deg <= 281.25) {
            return "wi-from-w";
        } else if (deg > 281.25 && deg <= 303.75) {
            return "wi-from-wnw";
        } else if (deg > 303.75 && deg <= 326.25) {
            return "wi-from-nw";
        } else if (deg > 326.25 && deg <= 348.75) {
            return "wi-from-nnw";
        } else {
            return "wi-from-n";
        }
    },

	cardinalOpposite: function(card) {
        if (card === "NNE") {
            return "SSW";
        } else if (card === "NE") {
            return "SW";
        } else if (card === "ENE") {
            return "WSW";
        } else if (card === "E") {
            return "W";
        } else if (card === "ESE") {
            return "WNW";
        } else if (card === "SE") {
            return "NW";
        } else if (card === "SSE") {
            return "NNW";
        } else if (card === "S") {
            return "N";
        } else if (card === "SSW") {
            return "NNE";
        } else if (card === "SW") {
            return "NE";
        } else if (card === "WSW") {
            return "ENE";
        } else if (card === "W") {
            return "E";
        } else if (card === "WNW") {
            return "ESE"; //ORANGE
        } else if (card === "NW") {
            return "SE"; //ORANGE
        } else if (card === "NNW") {
            return "SSE"; // ORANGE
        } else {
            return "S";
        }
    },

    /* function(temperature)
     * Rounds a temperature to 1 decimal.
     *
     * argument temperature number - Temperature.
     *
     * return number - Rounded Temperature.
     */
    roundValue: function(temperature) {
        return parseFloat(temperature).toFixed(this.config.roundTmpDecs);
    },

    // ------------------ SOCKET CONFIGURATION --------------------------
    socketNotificationReceived: function(notification, payload) {
            var self = this;

            if (notification === 'DARKSKY') {
                if (this.config.debug === 1) { Log.info(moment().format('YYYY-MM-DDTHH:mm:ss.SSSZZ') + ' SOCKET(RECEIVED FROM HELPER) (5): ' + notification + ' Payload data'); }
                self.processWeather(JSON.parse(payload));
            }
            if (notification === 'NOAA_TIDE_DATA') {
                if (this.config.debug === 1) { Log.info(moment().format('YYYY-MM-DDTHH:mm:ss.SSSZZ') + ' SOCKET(RECEIVED FROM HELPER) (5): ' + notification + ' Payload data'); }
                self.processNOAA_TIDE_DATA(JSON.parse(payload));
            }
            if (notification === 'NOAA_WATERTEMP') {
                if (this.config.debug === 1) { Log.info(moment().format('YYYY-MM-DDTHH:mm:ss.SSSZZ') + ' SOCKET(RECEIVED FROM HELPER) (5): ' + notification + ' Payload data'); }
		Log.info(payload);
		    self.processNOAA_WATERTEMP(JSON.parse(payload));
            }
            if (notification === 'MAGICSEAWEED') {
                if (this.config.debug === 1) { Log.info(moment().format('YYYY-MM-DDTHH:mm:ss.SSSZZ') + ' SOCKET(RECEIVED FROM HELPER) (5): ' + notification + ' Payload data'); }
                self.processMAGICSEAWEED(JSON.parse(payload));
		    	if (this.config.debug === 1) { Log.info(moment().format('YYYY-MM-DDTHH:mm:ss.SSSZZ') + " SOCKET(SEND TO HELPER): UPDATE_TIMER"); }
		    	this.sendSocketNotification("UPDATE_TIMER", this.config);
		    
            }
            if (notification === 'M5') {
                if (this.config.debug === 1) { Log.info(moment().format('YYYY-MM-DDTHH:mm:ss.SSSZZ') + ' SOCKET(RECEIVED FROM HELPER) (5): ' + notification + ' Payload data'); }
                self.processM5(JSON.parse(payload));
		    	if (this.config.debug === 1) { Log.info(moment().format('YYYY-MM-DDTHH:mm:ss.SSSZZ') + " SOCKET(SEND TO HELPER): UPDATE_TIMER"); }
		    	this.sendSocketNotification("UPDATE_TIMER", this.config);
		    
            }
            if (notification === 'TIDES') {
                if (this.config.debug === 1) { Log.info(moment().format('YYYY-MM-DDTHH:mm:ss.SSSZZ') + ' SOCKET(RECEIVED FROM HELPER) (5): ' + notification + ' Payload data'); }
                self.processTides(JSON.parse(payload));
		    	if (this.config.debug === 1) { Log.info(moment().format('YYYY-MM-DDTHH:mm:ss.SSSZZ') + " SOCKET(SEND TO HELPER): UPDATE_TIMER"); }
		    	this.sendSocketNotification("UPDATE_TIMER", this.config);
		    
            }
            if (notification === 'HELPER_MESSAGE') {
                if (this.config.debug === 1) { Log.info(payload); }
		}
	    if (notification === 'LAST_UPDATED') {
		this.lastUpdatedTime = payload; //set last update time.
		if (this.config.debug === 1) {Log.info(moment().format('YYYY-MM-DDTHH:mm:ss.SSSZZ') + ' SOCKET(RECEIVED FROM HELPER) (8): ' + notification + ' ' +this.lastUpdatedTime);
		}
	    }

        } // end socketNotificationReceived function

}); // End Module
