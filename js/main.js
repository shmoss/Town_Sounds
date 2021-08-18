document.addEventListener('DOMContentLoaded', function(e) {


// const url = `https://s3.us-east-2.amazonaws.com/sfbucket.starr/sf_events.json`;


// const successCb = (resp) => {
//     console.log(resp);
// };

// const errorCb = (err) => {
//     console.error('Error - ', err);
// };

// function downloadObject(url, successCb, errorCb) {
//     fetch(url)
//       .then(response => response.json())
//       .then(successCb)
//       .catch(errorCb);
// }

// downloadObject(url, successCb, errorCb);

// // Example POST method implementation:
// async function postData(url = '', data = {}) {
//   // Default options are marked with *
//   const response = await fetch(url, {
//     method: 'POST', // *GET, POST, PUT, DELETE, etc.
//     mode: 'no-cors', // no-cors, *cors, same-origin
//     cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
//     credentials: 'same-origin', // include, *same-origin, omit
//     redirect: 'follow', // manual, *follow, error
//     header: 'Access-Control-Allow-Origin: *',
//     referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
//     body: JSON.stringify(data) // body data type must match "Content-Type" header
//   });
//   return response.json(); // parses JSON response into native JavaScript objects
// }

// postData('https://s3.us-east-2.amazonaws.com/sfbucket.starr/sf_events.json')


// async function downloadObject(url) {
//   try {
//     const fetchResponse = await fetch(url, {
//   credentials: 'same-origin'
// });
//     return await fetchResponse.json();
//   } catch (err) {
//     console.error('Error - ', err);
//   }
// }

// downloadObject(url);


// fetch('https://reqres.in/api/users')
//     .then(res => res.json())
//     .then(res => {
//         res.data.map(user => {
//             console.log(`${user.id}: ${user.first_name} ${user.last_name}`);
//         });
//     });


//     fetch('https://s3.us-east-2.amazonaws.com/sfbucket.starr/sf_events.json')
//         .then(response => response.json())
//         .then(data => console.log(data));


    
    times = ["12:00 AM",
            "1:00 AM",
            "2:00 AM",
            "3:00 AM",
            "4:00 AM",
            "5:00 AM",
            "6:00 AM",
            "7:00 AM",
            "8:00 AM",
            "9:00 AM",
            "10:00 AM",
            "11:00 AM",
            "12:00 PM",
            "13:00 PM",
            "14:00 PM",
            "15:00 PM",
            "16:00 PM",
            "17:00 PM",
            "18:00 PM",
            "19:00 PM",
            "20:00 PM",
            "21:00 PM",
            "22:00 PM",
            "23:00 PM"         
    ]

    var map
    var value  
    var currentValue = 10
    var sizeValue

    //Set values for time range slider
    var inputValue = null;
    //var currentMap = d3.map();




    var sfData = "./data/sf_events.json" 
    var nycData = "./data/nyc_events.json" 
    var madisonData = "./data/madison_events.json" 
    var chicagoData = "./data/chicago_events.json"

   
        var selectedDate

        //set today's date
        var today = new Date()

        var todaySplit = today.toString().split(" " ,4)
        var todayClean = todaySplit.toString().replace(/,/g, ' ')
        var dayNumber = todaySplit[2]
        var dayNumberClean = dayNumber.toString().replace(/01/g, '1')
            .replace(/02/g, '2')
            .replace(/03/g, '3')
            .replace(/04/g, '4')
            .replace(/05/g, '5')
            .replace(/06/g, '6')
            .replace(/07/g, '7')
            .replace(/08/g, '8')
            .replace(/09/g, '9')

        var todayClean2 = todaySplit[0] + " " + todaySplit[1] + " " + dayNumberClean + " " + todaySplit[3]

        selectedDate = todayClean2

        function formatDate(date) {
        var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

        if (month.length < 2) 
        month = '0' + month;
        if (day.length < 2) 
        day = '0' + day;

        return [year, month, day].join('-');
        }
 
        selectedDate = formatDate(selectedDate)
        console.log(selectedDate)
      
        var nextweek

        function nextweek(){
            var today = new Date();
            var nextweek = new Date(today.getFullYear(), today.getMonth(), today.getDate()+7);  
            return nextweek;
        }

        nextweek()
   
        var dat

        function initialDateMatch(data) {
            console.log(todayClean2)
            console.log(selectedDate)
            d3.selectAll(".events").each(function(d) {
                var options = { weekday: 'long'};
                var date = new Date(d.EventDate + 'PST')
                var dateString = date.toString()
                var dateClean= dateString.split(" " ,4).toString().replace(/,/g, ' ')
                d.dateFormatted = dateClean
 
                return d.dateFormatted

            });

            if (todayClean2 == data.Date) {
                return 'inline'
            } else {
                return 'none'
            }
        }

        

        function dateMatch(data) {  
             //console.log(selectedDate, data.Date)
            if (selectedDate === data.Date) {
               //console.log('datematch')
                return 'inline'
            } else {
                return 'none'
            }
        }

        function timeInterval(data, start, end) {

            var today = new Date()
            var todaySplit = today.toString().split(" " ,4)
            var todayClean = todaySplit.toString().replace(/,/g, ' ')
            var dayNumber = todaySplit[2]

            var dayNumberClean = dayNumber.toString().replace(/01/g, '1')
                .replace(/02/g, '2')
                .replace(/03/g, '3')
                .replace(/04/g, '4')
                .replace(/05/g, '5')
                .replace(/06/g, '6')
                .replace(/07/g, '7')
                .replace(/08/g, '8')
                .replace(/09/g, '9')

            var todayClean2 = todaySplit[0] + " " + todaySplit[1] + " " + dayNumberClean + " " + todaySplit[3]
            var time = data.Time
        
            var hours = Number(time.match(/^(\d+)/)[1]);
            var minutes = Number(time.match(/:(\d+)/)[1]);
            var AMPM = time.match(/\s(.*)$/)[1];
            if (AMPM == "PM" && hours < 12) hours = hours + 12;
            if (AMPM == "AM" && hours == 12) hours = hours - 12;
            var sHours = hours.toString();
            var sMinutes = minutes.toString();
            if (hours < 10) sHours = "0" + sHours;
            if (minutes < 10) sMinutes = "0" + sMinutes;
            var showStartTime = (sHours + ":" + sMinutes);

            if (start <= showStartTime && showStartTime <= end && selectedDate === data.Date) {         
                return "inline";
            } else {
                return "none";
            };
   
        } 

        function update(value) {

            //resetStroke ()
            //filter by current date selected
            d3.selectAll(".events")
                .style("display", dateMatch);

            //filter by current time filter selected

            if(document.getElementById('allTimes').checked) {
                d3.selectAll(".events")
                    .style("display", function(d) {
                    return timeInterval(d, "00:00", "24:00")
                });      
            }

            if(document.getElementById('morn').checked) {
                d3.selectAll(".events")
                    .style("display", function(d) {
                    return timeInterval(d, "07:00", "12:00")
            });      
            }

            if(document.getElementById('lunch').checked) {
                d3.selectAll(".events")
                    .style("display", function(d) {
                    return timeInterval(d, "12:00", "16:00")
                });      
            }

            if(document.getElementById('afternoon').checked) {
                d3.selectAll(".events")
                    .style("display", function(d) {
                    return timeInterval(d, "16:00", "20:00")
                });      
            }

            if(document.getElementById('eve').checked) {
                d3.selectAll(".events")
                    .style("display", function(d) {
                    return timeInterval(d, "20:00", "24:00")
                });      
            }

            if(document.getElementById('late').checked) {
                d3.selectAll(".events")
                    .style("display", function(d) {
                    return timeInterval(d, "24:00", "07:00")
                    });      
            }
        }

        function genreMatch (genreType) {

            d3.selectAll(".events").style("stroke", 'none')
            d3.selectAll(".events").style("stroke-width", '0px')
            var genreType

            for (i=0; i<genreType.length; i++){
       
                d3.selectAll(".events")
                    .filter(function(d) {       
                        return (d.Genre.toLowerCase().includes(genreType[i]))
                    })
                    .style("fill", display)

            }  

            // for (i=0; i<genreType.length; i++){
       
            //     d3.selectAll(".events")
            //         .filter(function(d) {       
            //             return (d.Genre.includes(genreType[i])==true)
            //         })
            //         .style("pointer-events", all)
            // } 

        }  

        function resetDisplay (){
            d3.selectAll(".events")
                .style("fill", 'none')
                .style("stroke", 'none')
                .style("stroke-width", '0 px')
        }

        function resetStroke (){
            d3.selectAll(".events")
                .style("stroke", 'none')        
        }

        function resetAll (){
            d3.selectAll(".events")
                .style("fill", '#ffba00');
        }

        function resetVisibility (){
            d3.selectAll(".events")
                .style("display", 'all');
        }

        function noPointers (){
            d3.selectAll(".events")
                .style("pointer-events", 'auto');
        }

       

        //Time slider
        d3.select("#timeslide").on("input", function() {       

        });

        
        var x = null

         //Apply checkbox filters for genre
        d3.selectAll("#allGenre").on("change", function() {
            resetDisplay()
            resetAll()
            resetVisibility()
            x = "all"

        });

        var currentValue = 0;

        d3.selectAll("#bluesGenre").on("change", function() {
            resetDisplay()
            var bluesRadioValue = document.getElementById("bluesGenre").value 
            currentValue = bluesRadioValue
            display = this.checked ? "#ffba00" : "none";
            display2 = this.checked ? "black" : "none";
            x = ["blues"]
            genreMatch(x)
        });


        d3.selectAll("#classicalGenre").on("change", function() {
            resetDisplay()
            display = this.checked ? "#ffba00" : "none";
            display2 = this.checked ? "black" : "none";
            x = ["classical", "chamber", "baroque", "choral", "orchestra"]
            genreMatch(x)
        });


        d3.selectAll("#electronicGenre").on("change", function() {
            resetDisplay()
            display = this.checked ? "#ffba00" : "none";
            display2 = this.checked ? "black" : "none";
             x = ["electronic", "electronica", "house", "dj", "techno", "trance", "dance", "dubstep", "dub", "rave"]
            genreMatch(x)
        });


        d3.selectAll("#folkGenre").on("change", function() {
            resetDisplay()
            display = this.checked ? "#ffba00" : "none";
            display2 = this.checked ? "black" : "none";
            x = ["bluegrass","folk","singer songwriter","americana","country","acoustic","singer-songwriter"]
            genreMatch(x)   
        });


        d3.selectAll("#hipHopGenre").on("change", function() {
            resetDisplay()
            display = this.checked ? "#ffba00" : "none";
            display2 = this.checked ? "black" : "none";
            x = ["hip hop", "rap", "hip-hop", "trap", "gangsta", "freestyle"]
            genreMatch(x)
        });


        d3.selectAll("#jazzGenre").on("change", function() {
            resetDisplay()
            display = this.checked ? "#ffba00" : "none";
            display2 = this.checked ? "black" : "none";
            x = ["jazz", "swing", "big band", "manouche", "fusion", "bop", "dixieland"]
            genreMatch(x)
        });

         d3.selectAll("#latinGenre").on("change", function() {
            resetDisplay()
            display = this.checked ? "#ffba00" : "none";
            display2 = this.checked ? "black" : "none";
            x = ["latin", "cumbia", "brazilian", "reggaeton", "salsa", "choro", "samba", "bachata", "mexican", "urbano", "merengue"]
            genreMatch(x)
        });


        d3.selectAll("#metalGenre").on("change", function() {
            resetDisplay()
            display = this.checked ? "#ffba00" : "none";
            display2 = this.checked ? "black" : "none";
            x = ["metal", "black Metal", "hardcore", "deathcore", "death metal"]
            genreMatch(x)
        });


        d3.selectAll("#rbGenre").on("change", function() {
            resetDisplay()
            display = this.checked ? "#ffba00" : "none";
            display2 = this.checked ? "black" : "none";
            x = ["r&b", "rnb", "soul", "disco", "reggae", "rnb", "funk"]
            genreMatch(x)
        });


        d3.selectAll("#rockPopGenre").on("change", function() {
            resetDisplay()
            noPointers()
            display = this.checked ? "#ffba00" : "none";
            display2 = this.checked ? "black" : "none";
            pointerEvents = this.checked ? "all" : "all";
             x = ["rock", "pop","indie", "ska", "punk", "alternative", "indie rock", "emo", "alt-rock", "rock and roll", "rock n roll", "surf"]
            genreMatch(x)
            removePoints(x)  
        });


        d3.selectAll("#genreUnknownGenre").on("change", function() {
            resetDisplay()
            display = this.checked ? "#ffba00" : "none";
            display2 = this.checked ? "black" : "none";
            x = ["no genre available"]
            genreMatch(x)
        });

        d3.selectAll("#NewYorkCity_NY_data").on("click", function() {
            console.log("NY!")
            map.setView([40.7428, -73.70], 10);
            resetDisplay()
            //resetGenreAndTime()
            loadData(nyc_events)
          
            $("#allGenre").click()
            $("#allTimes").click()
           
            //combineArray(nyc_events)
            
        });

        d3.selectAll("#SanFrancisco_CA_data").on("click", function() {
            console.log("SF!")
            map.setView([37.7778532, -122.362303], 12);
            resetDisplay()
            
            loadData(sf_events)

            $("#allGenre").click()
            $("#allTimes").click()
            //combineArray(nyc_events)
            
        });


        //LA
         d3.selectAll("#LosAngeles_CA_data").on("click", function() {
            console.log("SF!")
            map.setView([34.0522, -118.1337], 11);
            resetDisplay()
            
            loadData(LA_events)

            $("#allGenre").click()
            $("#allTimes").click()

        });

        //Chicago
        d3.selectAll("#Chicago_IL_data").on("click", function() {
            console.log("SF!")
            map.setView([41.8781, -87.5398], 11);
            resetDisplay()
            
            loadData(chicago_events)

            $("#allGenre").click()
            $("#allTimes").click()
            //combineArray(nyc_events)
            
        });

        //Austin
        d3.selectAll("#Austin_TX_data").on("click", function() {
            console.log("SF!")
            map.setView([30.2672, -97.6031], 11);
            resetDisplay()
            
            loadData(austin_events)

            $("#allGenre").click()
            $("#allTimes").click()
            //combineArray(nyc_events)

        });

        //Denver
        d3.selectAll("#Denver_CO_data").on("click", function() {
            console.log("SF!")
            map.setView([39.7392, -104.9003], 11);
            resetDisplay()
            
            loadData(denver_events)

            $("#allGenre").click()
            $("#allTimes").click()

        });


        //Nashville
        d3.selectAll("#Nashville_TN_data").on("click", function() {
            console.log("SF!")
            map.setView([36.1627, -86.6416], 11);
            resetDisplay()
            
            loadData(nashville_events)

            $("#allGenre").click()
            $("#allTimes").click()

        });

        //Boston
        
        //Madison
        d3.selectAll("#Madison_WI_data").on("click", function() {
            console.log("SF!")
            map.setView([43.0731, -89.3112], 12);
            resetDisplay()
            
            loadData(madison_events)

            $("#allGenre").click()
            $("#allTimes").click()
            //combineArray(nyc_events)
            
        });

        //Milwaukee
        d3.selectAll("#Milwaukee_WI_data").on("click", function() {
            console.log("SF!")
            map.setView([43.0389, -87.8065], 11);
            resetDisplay()
            
            loadData(milwaukee_events)

            $("#allGenre").click()
            $("#allTimes").click()
            //combineArray(nyc_events)
            
        });

        //Minneapolis
        d3.selectAll("#Minneapolis_MN_data").on("click", function() {
            console.log("SF!")
            map.setView([44.9778, -93.1950], 12);
            resetDisplay()
            
            loadData(minneapolis_events)

            $("#allGenre").click()
            $("#allTimes").click()
            //combineArray(nyc_events)
            
        });

        //Atlanta
        //New Orleans
        d3.selectAll("#NewOrleans_LA_data").on("click", function() {
            console.log("SF!")
            map.setView([29.9511, -89.95], 11);
            resetDisplay()
            
            loadData(neworleans_events)

            $("#allGenre").click()
            $("#allTimes").click()
            //combineArray(nyc_events)

        });

        //Seattle
        d3.selectAll("#Seattle_WA_data").on("click", function() {
            console.log("SF!")
            map.setView([47.6062, -122.2321], 11);
            resetDisplay()
            
            loadData(seattle_events)

            $("#allGenre").click()
            $("#allTimes").click()
            //combineArray(nyc_events)

            });
        
        function resetGenreAndTime(){
            document.getElementById("#allGenre").checked = true;
            document.getElementById("#allTimes").checked = true;
        }

        //function to move info label with mouse
        function moveLabel(){
        //get width of label
            var labelWidth = d3.select(".county2014Tooltip")
                .node()
                .getBoundingClientRect()
                .width;

            //use coordinates of mousemove event to set label coordinates
            var x1 = d3.event.clientX + 10,
            y1 = d3.event.clientY - 50,
            x2 = d3.event.clientX - labelWidth - 10,
            y2 = d3.event.clientY + 25;

            //horizontal label coordinate, testing for overflow
            var x = d3.event.clientX > window.innerWidth - labelWidth - 20 ? x2 : x1;
            //vertical label coordinate, testing for overflow
            var y = d3.event.clientY < 75 ? y2 : y1;

            d3.select(".county2014Tooltip")
                .style({
                "left": x + "px",
                "top": y + "px"
                });
            }; 


      $('#datepicker').datepicker({


        weekStart: 1,
        autoclose: true,
        todayHighlight: true,
        disableTouchKeyboard: true,
        format: {
    /*
     * Say our UI should display a week ahead,
     * but textbox should store the actual date.
     * This is useful if we need UI to select local dates,
     * but store in UTC
     */
    toDisplay: function (date, format, language) {
        d = new Date(date)
        todayDate = (d.toISOString().split('T')[0])
        console.log(todayDate)
        var dateArray = todayDate.split("-");
        var year = dateArray[0];
        var month = parseInt(dateArray[1], 10) - 1;
        var date = dateArray[2];
        var _entryDate = new Date(year, month, date);
        console.log(_entryDate)
        _entryDateStr = _entryDate.toString()
        console.log(_entryDateStr)
        thing = _entryDateStr.split(" ")
        console.log(thing)
        todayDateString = (thing[1] + " " + thing[2] + " " + thing[3])
        console.log(todayDateString)
        return todayDateString
        //alert(_entryDate);
        
        //return d.toDateString();
    },
    toValue: function (date, format, language) {
        // var d = new Date(date);
        // selectedDate = d.setDate(d.getDate() + 0);
        // return new Date(d);
    }
  },
        startDate: new Date(),
        Readonly: true,
        endDate: new Date(new Date().setDate(new Date().getDate() + 3))

           // Event callbacks.
        //     onSelect: function(instance) {
    
        //         var instanceSplit = instance.dateSelected.toString().split(" " ,4)
        //         var dayofMonth = instanceSplit[2]
    
        //         var instanceClean = instanceSplit.toString().replace(/,/g, ' ')
        //         var dayofMonthClean = dayofMonth.toString().replace(/01/g, '1')
        //             .replace(/02/g, '2')
        //             .replace(/03/g, '3')
        //             .replace(/04/g, '4')
        //             .replace(/05/g, '5')
        //             .replace(/06/g, '6')
        //             .replace(/07/g, '7')
        //             .replace(/08/g, '8')
        //             .replace(/09/g, '9')

        //             var finalDate = instanceSplit[0] + " " + instanceSplit[1] + " " + dayofMonthClean + " " + instanceSplit[3]

        //             selectedDate = finalDate
        //             selectedDate = formatDate(selectedDate)
        //             console.log(selectedDate)
 
        //         update()
       
        //     },


    });
    $('#datepicker').datepicker("setDate", new Date());

    $(function() {
    $("#datepicker").datepicker();
    
    $("#datepicker").val();
    
       $('#datepicker').on('changeDate', function(e){
        var date = e.date;
        var day = ('0' + date.getDate()).slice(-2);
        var month = ('0' + (date.getMonth() + 1)).slice(-2);
        var year = date.getFullYear();
        selectedDate = year + '-' + month + '-' + day
        
        $(this).next('input[type=hidden]').val(year + '-' + month + '-' + day);

        update(selectedDate)
        console.log("datepicker selectedDate is", selectedDate)
        return selectedDate


    });
});

    
      
        // const picker = datepicker(document.querySelector('#datepicker'), {

        //     // Event callbacks.
        //     onSelect: function(instance) {
    
        //         var instanceSplit = instance.dateSelected.toString().split(" " ,4)
        //         var dayofMonth = instanceSplit[2]
    
        //         var instanceClean = instanceSplit.toString().replace(/,/g, ' ')
        //         var dayofMonthClean = dayofMonth.toString().replace(/01/g, '1')
        //             .replace(/02/g, '2')
        //             .replace(/03/g, '3')
        //             .replace(/04/g, '4')
        //             .replace(/05/g, '5')
        //             .replace(/06/g, '6')
        //             .replace(/07/g, '7')
        //             .replace(/08/g, '8')
        //             .replace(/09/g, '9')

        //             var finalDate = instanceSplit[0] + " " + instanceSplit[1] + " " + dayofMonthClean + " " + instanceSplit[3]

        //             selectedDate = finalDate
        //             selectedDate = formatDate(selectedDate)
        //             console.log(selectedDate)
 
        //         update()
       
        //     },

        //     onShow: function(instance) {
        //     },
        //     onHide: function(instance) {
        //     },
        //     onMonthChange: function(instance) {
        //     },
 
        //     // Customizations.
        //     formatter: function(el, date, instance) {
        //         el.value = date.toDateString();
        //         dat = new Date()
        //     },
  
        //     position: 'tr', // Top right.
        //     startDay: 1, // Calendar week starts on a Monday.
        //     customDays: ['S', 'M', 'T', 'W', 'Th', 'F', 'S'],
        //     customMonths: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        //     overlayButton: 'Go!',
        //     overlayPlaceholder: 'Enter a 4-digit year',
 
        //     // Settings.
        //     alwaysShow: true, // Never hide the calendar.
        //     dateSelected: new Date(), // Today is selected.
        //     maxDate: new Date(new Date().getTime() + 3 * 24 * 60 * 60 * 1000), // Jan 1st, 2099.
        //     minDate: new Date(new Date().getTime()), // June 1st, 2016.
        //     startDate: new Date(), // This month.
   

        // });

        function removeSidebar(){
            $('#sidebar').removeClass('active');
        }

        function isSidebarOpen() {

            var sideBar = document.getElementById('sidebar');
            if (sideBar.classList.contains('active')) {
                document.getElementById("map").onclick = removeSidebar
            } else(console.log('not active'))

        }


        if ($(window).width() < 960) {
            //alert('Less than 960');
            window.onload = function () {
            document.getElementById("sidebarCollapse").onclick=isSidebarOpen;
            };
            document.getElementById("sidebarCollapse").onclick=isSidebarOpen;
        } else {
        //alert('More than 960');
        }
     


        var allSFEvents

        //test commit!


        var token ="pk.eyJ1Ijoic3RhcnJtb3NzMSIsImEiOiJjaXFheXZ6ejkwMzdyZmxtNmUzcWFlbnNjIn0.IoKwNIJXoLuMHPuUXsXeug"; // replace with your Mapbox API Access token. Create a Mapbox account and find it on https://account.mapbox.com/

        //var current_latitude
        //var current_longitude
        function showLocation(position) {
            var current_latitude = position.coords.latitude;
            var current_longitude = position.coords.longitude;
            var current_latLong = [current_latitude, current_longitude]
            alert("Latitude : " + current_latitude + " Longitude: " + current_longitude);
            console.log(current_latLong)
            var my_current_location = L.circleMarker(current_latLong[0], current_latLong[1], {
                color: "white",
                fillColor: "#59c1de",
                fillOpacity: .95,
                radius:9,
                className: 'myCurrentLocation'
      }).addTo(map);    
         }

         function errorHandler(err) {
            if(err.code == 1) {
               console.log("Error: Access is denied!");
            } else if( err.code == 2) {
               console.log("Error: Position is unavailable!");
            }
         }
            
         function getLocation() {

            if(navigator.geolocation) {
               
               // timeout at 60000 milliseconds (60 seconds)
               var options = {timeout:60000};
               navigator.geolocation.getCurrentPosition(showLocation, errorHandler, options);
            } else {
               console.log("Sorry, browser does not support geolocation!");
            }
         }

         
         //getLocation()

        var map = L.map('map').setView([37.7778532, -122.362303], 12);

        function mapLocation(){
            var my_location = map.latLngToLayerPoint([43.0830543, -89.3628494])
            return "translate("+ my_location.x +","+ my_location.y +")";
        }
        
        //mapLocation()

        var gl = L.mapboxGL({
            accessToken: token,
            style: 'mapbox://styles/mapbox/dark-v8'
        }).addTo(map);

        var svgLayer = L.svg()
            svgLayer.addTo(map);
          
        var svgMap = d3.select("#map").select("svg");
            var mapG = svgMap.select('g');





    loadData(sf_events)

    var LeafletDiv = d3.select("#content").append("div")   
            .attr("class", "county2014Tooltip")  
            .style("opacity", 1)
            .style("scrollTop", 0)

  //   var data = ["Hello World!"];


  //   var countydiv = d3.selectAll(".county2014Tooltip")

  // var update = function (txt) {

  //       var spn = countydiv.selectAll('span').data([txt]);
  //     spn.enter()
  //       .append("span")
  //       .text(function(d){return d})
  //       console.log(data[0])
  //   }

  //       update(data[0])





    
    function loadData(eventArray) {
        //remove instances where coordinates are blank
        eventArray = eventArray.filter(function(d){ return d.Coordinates[0] != "" })
        //console.log(eventArray.length)
        //console.log(eventArray)
        //console.log(d.Coordinates)
        var time_window = ["00:00", "24:00"]
        
        d3.selectAll(".events").remove()

        var projection = d3.geoMercator()
        var path = d3.geoPath().projection(projection);

        
          
        var myLocation = mapG.selectAll("circle")
            .data([43.0830543, -89.3628494])
            .attr("r", "10")
            .attr("fill", 'red')
            .attr("transform", function(d) {
    return "translate(" + projection([
      -89.3628494,
      43.0830543
    ]) + ")";
  });
    
        

        var scrollBar = d3.select("#sidebar")
            .style("scrollTop", 0)

        var scrollBarActive = d3.select("#sidebar.active")
            .style("scrollTop", 0)
  
 
           
       eventArray.forEach(function(d) {
        //console.log(d.Coordinates[1])
        //console.log(d.Coordinates[0])
        
            d.latLong = new L.LatLng(d.Coordinates[0],
                  d.Coordinates[1]);

            //console.log(d.latLong,d.Date)
        })
            
        var events = mapG.selectAll("circle")
            .data(eventArray)
            .enter().append("circle")
            .attr("class", 'events')
            .style("fill", '#ffba00')
            .style("opacity", '.8')
            .attr("r", 10.5)
            .style("display", dateMatch)
            .style("pointer-events", "auto")
            .attr("classed", "visible")
             .on("mouseover", function(event, d) { 
           
                //console.log(x)
                d3.selectAll(".events").style("stroke", 'none')
                d3.selectAll(".events").style("stroke-width", '0px')
                //var value2014 = currentMap.get(d.location);   

                appendText = []
                console.log(appendText)
                LeafletDiv
                    .html( appendText.join(""))

                LeafletDiv.transition()        
                    .duration(200)      
                    .style("opacity", .9)
                    .style("scrollTop", 0)
                    .style("transform","scale(1)")
                    .style("pointer-events","none")

                   



                    var popInfo = '<br/>' + "<img src='"+d.ArtistImage+"''width='300px' height = '150px'>" + '<br/>'+ '<br/>'+ '<b>'+ '<font size="3em">'+d.Artist.fontcolor( "#ffba00")+ '</font>'+ '</b>'  + '<br/>'+d.EventDate
                    + '<br/>'+d.Time + '<br/>' + d.Venue + '<br/>' +d.Address +'<br/>' +'<br/>'+ '<b>'+"Genre: &nbsp".fontcolor( "#ffba00")+ '</b>' + d.Genre + '<p>' + '</p>' + '<b>'+" Info: &nbsp".fontcolor( "#ffba00") + '</b>'+d.otherInfo + '<p>' + '</p>' +'<b>'+"Artist Bio: &nbsp".fontcolor( "#ffba00") + '</b>'+d.moreBioInfo + '<br/>'
                    

                    LeafletDiv
                    .html(popInfo)
                    .style("top", "1.5vh")
                    .style("text-align", 'left')
                    .style("pointer-events","none")

                    d3.select(this).style("stroke", 'black')
                    d3.select(this).style("stroke-width", '3px')    

                    
                   
                   //deal with point overlap
     
              })


        
  
        .on("click", function(event, d) { 
            console.log('first click!')
            $('body').css({
                overflow: 'hidden'
            });

            d3.selectAll(".events").style("stroke", 'none')
            d3.selectAll(".events").style("stroke-width", '0px')
            const currentCircle = this; 
            //disable hover event listeners
            d3.selectAll(".events").on("mouseout", null);
            d3.selectAll(".events").on("mouseover", null);

            //add popup   
            //var value2014 = currentMap.get(d.location);  

            appendText = []
            console.log(appendText)
            LeafletDiv
                .html( appendText.join(""))

            LeafletDiv.transition()        
                .duration(200)      
                .style("opacity", .9)
                .style("transform","scale(1)")
                .style("pointer-events","auto")

             
             



               //deal with point overlap
                d3.select(this)
                   this_venue = d.Venue
                   this_date = d.Date
                   this_artist = d.Artist
                   this_lat = d.latitude
                   this_long = d.longitude
                   this_coordinates = d.coordinates
                   this_address = d.Address
                   this_genre = d.Genre
                   //console.log('this_genre is ', this_genre, "and x is ", x)


                   // display = "#ffba00"
                   // all = "all"
                   // genreMatch(this_genre)

                    //let array1 = d.Genre, array2 = x;

                    //console.log(array2.some(ele => array1.includes(ele)));
            

                    selections = d3.selectAll(".events").filter(function(d){

                     


                    var selected_time = d.Time
        
                    var hours = Number(selected_time.match(/^(\d+)/)[1]);
                    var minutes = Number(selected_time.match(/:(\d+)/)[1]);
                    var AMPM = selected_time.match(/\s(.*)$/)[1];
                    if (AMPM == "PM" && hours < 12) hours = hours + 12;
                    if (AMPM == "AM" && hours == 12) hours = hours - 12;
                    var sHours = hours.toString();
                    var sMinutes = minutes.toString();
                    if (hours < 10) sHours = "0" + sHours;
                    if (minutes < 10) sMinutes = "0" + sMinutes;
                    var showStartTime = (sHours + ":" + sMinutes);
                    
                    //if 'all' genres not selected, then popup should only reflect genres that ARE selected
                    if (x == null) {
                        return time_window[0] <= showStartTime && showStartTime <= time_window[1] && d.Address.toLowerCase() == this_address.toLowerCase() && d.Date == this_date
                    } else if (x == 'all') {
                        return time_window[0] <= showStartTime && showStartTime <= time_window[1] && d.Address.toLowerCase() == this_address.toLowerCase() && d.Date == this_date
                    } else {
                        return time_window[0] <= showStartTime && showStartTime <= time_window[1] && d.Address.toLowerCase() == this_address.toLowerCase() && d.Date == this_date && (d.Genre.toLowerCase().includes(x[0]) || d.Genre.toLowerCase().includes(x[1]) || d.Genre.toLowerCase().includes(x[2]) || d.Genre.toLowerCase().includes(x[3]) || d.Genre.toLowerCase().includes(x[4]) || d.Genre.toLowerCase().includes(x[5]) || d.Genre.toLowerCase().includes(x[6]) || d.Genre.toLowerCase().includes(x[7]) || d.Genre.toLowerCase().includes(x[8]) || d.Genre.toLowerCase().includes(x[9]) || d.Genre.toLowerCase().includes(x[10]))

                    }                 


                    
                    })
                    var appendText = []
                    // var popClose = "<span id='closeCountyPopup' class='sticky-top'>X</span>" 
                    //  //var popCloseBottom = "<span id='closeCountyPopupBottom'>X</span>"
                    // appendText.push(popClose)
                    selections.each(function(d){

                    
                     var popInfo = '<br/>' + "<img src='"+d.ArtistImage+"''width='300px' height = '150px'>" + '<br/>'+ '<br/>'+ '<b>'+ '<font size="3em">'+d.Artist.fontcolor( "#ffba00")+ '</font>'+ '</b>'  + '<br/>'+d.EventDate
                    + '<br/>'+d.Time + '<br/>' + d.Venue + '<br/>' +d.Address +  '<br/>' + '<a class = eventUrl href="'+ d.currentUrl + '">Full event info and tickets</a>' + '<br/>' +'<br/>'+ '<b>'+"Genre: &nbsp".fontcolor( "#ffba00")+ '</b>' + d.Genre + '<p>' + '</p>' + '<b>'+" Info: &nbsp".fontcolor( "#ffba00") + '</b>'+d.otherInfo + '<p>' + '</p>' +'<b>'+"Artist Bio: &nbsp".fontcolor( "#ffba00") + '</b>'+d.moreBioInfo+ '<br/>'
                 
                 
                    
                    appendText.push(popInfo+ '<br/>' + '<br/>')
                              
               
                    })


                    
                 
                LeafletDiv
                    .html( appendText.join(""))
                    .style("top", "1.5vh")
                    .style("text-align", 'left')
                    .style("pointer-events", 'all')
                    d3.select(this).style("stroke", 'black')  
                    d3.select(this).style("stroke-width", '3px')
                
 
            $('.county2014Tooltip').scrollTop(0);

        //d3.select("#closeCountyPopup").style("pointer-events", 'all')

       //                d3.selectAll("#spanDiv").on("click", function() { 
       //                  console.log("mouseing")
       //                    LeafletDiv.transition()        
       //                  .duration(200)      
       //                  .style("opacity", 0)
       //                  .style("pointer-events", 'none') 
       //                  .attr("scrollTop", 0) 
       // })


            event.stopPropagation();

              // if user clicks a SECOND time, anywhere, make popup disappear
            d3.select("body").on("click", function(event, d) { 
                console.log("clicking off popup")
                d3.selectAll(".events").style("stroke", 'none')
                d3.selectAll(".events").style("stroke-width", '0px')
 
                if (this !== currentCircle) {
                    //console.log("not on current circle")
                    //hide popup
                    var elements = d3.select(LeafletDiv)
                    elements.scrollTop = 0

                    //we want to take away the prior html because it's causing issues with panning map once user clicks off pop-up
                    //create empty array and append to popup
                    appendText = []
                    console.log(appendText)
                    LeafletDiv
                        .html( appendText.join(""))


                                   
           
                    LeafletDiv.transition()        
                        .duration(20)      
                        .style("opacity", 1)
                        .style("transform","scale(0)")
                        .style("pointer-events", 'none') 
                        .attr("scrollTop", 0) 
                     
                        //revert back to hover, unless user clicks again!
                        d3.selectAll(".events").on("mouseout", true);
                        d3.selectAll(".events").on("mouseover", true);
                        d3.selectAll(".events").on("mouseout", function(event, d) { 
                        //mousing out!     
                        LeafletDiv.transition()        
                            .duration(200)      
                            .style("opacity", 0);  
                            d3.selectAll(".events").style("stroke", 'none')
                            d3.selectAll(".events").style("stroke-width", '0px')        
                        })

                        // mouseover event listers added back in
                        d3.selectAll(".events").on("mouseover", function(event, d) { 

                        //we want to take away the prior html because it's causing issues with panning map once user clicks off pop-up
                        //create empty array and append to popup
                        appendText = []
                        console.log(appendText)
                        LeafletDiv
                            .html( appendText.join(""))


                        LeafletDiv.transition()        
                            .duration(200)      
                            .style("opacity", .9)
                            .style("transform","scale(1)")
                           

                        LeafletDiv .html('<br/>' + "<img src='"+d.ArtistImage+"''width='300px' height = '150px'>" + '<br/>'+ '<br/>'+ '<b>'+ '<font size="3em">'+d.Artist.fontcolor( "#ffba00")+ '</font>'+ '</b>'  + '<br/>'+d.EventDate
                        + '<br/>'+d.Time + '<br/>' + d.Venue + '<br/>' +d.Address +'<br/>' +'<br/>'+ '<b>'+"Genre: &nbsp".fontcolor( "#ffba00")+ '</b>' + d.Genre + '<p>' + '</p>' + '<b>'+" Info: &nbsp".fontcolor( "#ffba00") + '</b>'+d.otherInfo + '<p>' + '</p>' +'<b>'+"Artist Bio: &nbsp".fontcolor( "#ffba00") + '</b>'+d.moreBioInfo
                        )
                            .style("top", "1.5vh")
                            .style("text-align", 'left')
                            d3.select(this).style("stroke", 'black')  
                            d3.select(this).style("stroke-width", '3px')
                    })
                }          
            })
                        event.stopPropagation();

        })

        .on("mouseout", function(event, d) {       
            LeafletDiv.transition()        
                .duration(200)      
                .style("opacity", 0)
                .style("scrollTop", 0)
                .style("transform","scale(0)")
                d3.selectAll(".events").style("stroke", 'none')
                d3.selectAll(".events").style("stroke-width", '0px')

        })


        var todaysDate = new Date 
        var date
        var dateClean

        d3.selectAll(".events").each(function(d) {

            var options = { weekday: 'long'};
            var date = new Date(d.EventDate + 'PST')
            var dateString = date.toString()
            var dateSplit = dateString.split(" " ,4)
            var dateClean = dateSplit.toString().replace(/,/g, ' ')
            d.dateFormatted = dateClean
            return d.dateFormatted

        });

        function drawAndUpdateEventCircles() {
            events.attr("transform",
            function(d) {
                var layerPoints = map.latLngToLayerPoint(d.latLong);
                return "translate("+ layerPoints.x +","+ layerPoints.y +")";
            }
        )}

        drawAndUpdateEventCircles();

        map.on("moveend", drawAndUpdateEventCircles);

        var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    
        var today  = new Date();
        var todayString = today.toString().split(" " ,4)
        var todayClean = todayString.toString().replace(/,/g, ' ')
        //console.log(todayClean)
        

        function updateTime(start, end) {
            d3.selectAll(".events")
                .style("display", function(d) {
                return timeInterval(d, "20:00", "24:00")
                });
        };


        

        


        function timeInterval(data, start, end) {

            var today = new Date()
            var todaySplit = today.toString().split(" " ,4)
            var todayClean = todaySplit.toString().replace(/,/g, ' ')
            var dayNumber = todaySplit[2]

            var dayNumberClean = dayNumber.toString().replace(/01/g, '1')
                .replace(/02/g, '2')
                .replace(/03/g, '3')
                .replace(/04/g, '4')
                .replace(/05/g, '5')
                .replace(/06/g, '6')
                .replace(/07/g, '7')
                .replace(/08/g, '8')
                .replace(/09/g, '9')

            var todayClean2 = todaySplit[0] + " " + todaySplit[1] + " " + dayNumberClean + " " + todaySplit[3]
            var time = data.Time
        
            var hours = Number(time.match(/^(\d+)/)[1]);
            var minutes = Number(time.match(/:(\d+)/)[1]);
            var AMPM = time.match(/\s(.*)$/)[1];
            if (AMPM == "PM" && hours < 12) hours = hours + 12;
            if (AMPM == "AM" && hours == 12) hours = hours - 12;
            var sHours = hours.toString();
            var sMinutes = minutes.toString();
            if (hours < 10) sHours = "0" + sHours;
            if (minutes < 10) sMinutes = "0" + sMinutes;
            var showStartTime = (sHours + ":" + sMinutes);

            if (start <= showStartTime && showStartTime <= end && selectedDate === data.Date) {         
                return "inline";
            } else {
                return "none";
            };
   
        } 

        function timeIntervalReclass(data, start, end) {

            var today = new Date()
            var todaySplit = today.toString().split(" " ,4)
            var todayClean = todaySplit.toString().replace(/,/g, ' ')
            var dayNumber = todaySplit[2]

            var dayNumberClean = dayNumber.toString().replace(/01/g, '1')
                .replace(/02/g, '2')
                .replace(/03/g, '3')
                .replace(/04/g, '4')
                .replace(/05/g, '5')
                .replace(/06/g, '6')
                .replace(/07/g, '7')
                .replace(/08/g, '8')
                .replace(/09/g, '9')

            var todayClean2 = todaySplit[0] + " " + todaySplit[1] + " " + dayNumberClean + " " + todaySplit[3]
            var time = data.Time
        
            var hours = Number(time.match(/^(\d+)/)[1]);
            var minutes = Number(time.match(/:(\d+)/)[1]);
            var AMPM = time.match(/\s(.*)$/)[1];
            if (AMPM == "PM" && hours < 12) hours = hours + 12;
            if (AMPM == "AM" && hours == 12) hours = hours - 12;
            var sHours = hours.toString();
            var sMinutes = minutes.toString();
            if (hours < 10) sHours = "0" + sHours;
            if (minutes < 10) sMinutes = "0" + sMinutes;
            var showStartTime = (sHours + ":" + sMinutes);

            if (start <= showStartTime && showStartTime <= end && selectedDate === data.Date) {         
                return "visible";
            } else {
                return "invisible";
            };
   
        } 


        
        
    

        d3.selectAll("#allTimes").on("change", function() {
            time_window = ["00:00", "24:00"]
            resetStroke ()
            d3.selectAll(".events")
                .style("display", function(d) {
                return timeInterval(d, "00:00", "24:00")
            })
                .attr("classed", function(d) {
                return timeIntervalReclass(d, "00:00", "24:00")
            })

        })

        

        d3.selectAll("#morn").on("change", function() {
            time_window = ["07:00", "12:00"]
            resetStroke ()
            d3.selectAll(".events")
                .style("display", function(d) {
                return timeInterval(d, "07:00", "12:00")
            })
                .attr("classed", function(d) {
                return timeIntervalReclass(d, "07:00", "12:00")
            })
               
        })

        d3.selectAll("#lunch").on("change", function() {
            time_window = ["12:00", "16:00"]
            resetStroke ()
            d3.selectAll(".events")
                .style("display", function(d) {
                return timeInterval(d, "12:00", "16:00")
            })
                .attr("classed", function(d) {
                return timeIntervalReclass(d, "12:00", "16:00")
            })
        })

        d3.selectAll("#afternoon").on("change", function() {
            time_window = ["16:00", "20:00"]
            resetStroke ()
            d3.selectAll(".events")
                .style("display", function(d) {
                return timeInterval(d, "16:00", "20:00")
            })
                .attr("classed", function(d) {
                return timeIntervalReclass(d, "16:00", "20:00")
            })
        })

        d3.selectAll("#eve").on("change", function() {
            time_window = ["20:00", "24:00"]
            resetStroke ()
            d3.selectAll(".events")
                .style("display", function(d) { 
                return timeInterval(d, "20:00", "24:00")
            })
                .attr("classed", function(d) {
                return timeIntervalReclass(d, "20:00", "24:00")
            })
        })

        d3.selectAll("#late").on("change", function() {
            time_window = ["24:00", "07:00"]
            resetStroke ()
            d3.selectAll(".events")
                .style("display", function(d) {
                return timeInterval(d, "24:00", "07:00")
            })
                .attr("classed", function(d) {
                return timeIntervalReclass(d, "24:00", "07:00")
            })
        })
    

        $('#dropdownMenuButton').scrollTop(0);
        d3.selectAll("#dropdownMenuButton").on("click", function() {

            var about = d3.selectAll('#dropdownMenuButton')


             $('#dropdownMenuButton').scrollTop(0);

             console.log("about")
           
           about
                .style("scrollTop", 0)

                 })

        // d3.select("#about").on("click", function() {
        //     d3.selectAll(".events")
        //         .style("pointer-events","none")    
        //     console.log('hello') 
        //     LeafletDiv.transition()        
        //                 .duration(200) 
        //                 .style("opacity",1) 
        //                 .style("pointer-events","all") 
        //                 .style("scrollTop", 0)

        //     str_linkedin = 'LinkedIn'.fontcolor( "#ffba00")
        //     str_website = 'starrmoss.com'.fontcolor( "#ffba00")

        //     LeafletDiv
        //             .html('<br/>'+'<b>'+ '<font size="2.5em">'+"What is TownSounds?".fontcolor( "#ffba00")+ 
        //                 '</font>'+ '</b>' + '<br/>' + "</br>" + "TownSounds is an app for finding live music!" +
        //                 '<br/>' + '<br/>' + '<b>' + '<font size="2.5em">'+"Why are only certain cities shown?".fontcolor( "#ffba00")+ 
        //                 '</font>'+ '</b>' + '<br/>' + "</br>" + "TownSounds displays music events listed on bandsintown.com. Currently, I'm only able to pull events for specific cities, but I hope to expand TownSounds to include more metro areas. If you want to see your city on here, drop me a line! "+
        //                 '<br/>' + '<br/>' + '<b>' + '<font size="2.5em">'+"How can I help?".fontcolor( "#ffba00")+ 
        //                 '</font>'+ '</b>' + '<br/>' + "</br>" + "Put your band's events on bandintown! You can also feel free to contribute financially to help keep this app up and running (@Starr-Moss on venmo). Your contribution will help cover overhead costs of this app such as data storage, geocoding services, and cloud computing."+
        //                 '<br/>' + '<br/>' + '<b>' + '<font size="2.5em">'+"About".fontcolor( "#ffba00")+ 
        //                 '</font>'+ '</b>' + '<br/>' + "</br>" + "Hello! I'm Starr Moss. I'm a musician, and always thought it would be a cool idea to be able to see local live music options on a map. This is an ever-evolving project, as the format of live music (live-streams, etc.) has been altered by the pandemic. Now that things are looking up, I'm hoping this app can be a tool for music-lovers to find great music!" + '</br>' + '<br/>' + "Please reach out to " +  "starrmoss1@gmail.com".fontcolor( "#ffba00")+  " for any questions." + '</br>' + '<br/>' + "Find me on " + str_linkedin.link("https://www.linkedin.com/in/starrmoss/") + " or " +  str_website.link("https://www.starrmoss.com") )  
        //             .style("top", "1.5vh")

        //             .style("text-align", 'left')

        //         d3.event.stopPropagation();

        //        d3.select("body").on("click", function(d) { 
        //         console.log("clicking off popup")
                
        //             LeafletDiv.transition()        
        //                 .duration(200) 
        //                 .style("opacity",0)
        //                 .style("pointer-events","none")

                
               
        //         })

        // });

        // var el = document.getElementById("aboutTooltip"); // Or whatever method to get the element

        // // To set the scroll
        // el.scrollTop = 0;
        //     el.scrollLeft = 0;

       


        function removePoints (genreType) {

            var genreType

            for (i=0; i<genreType.length; i++){
       
                d3.selectAll(".events")
                    .filter(function(d) {       
                    return (!d.Genre.includes(genreType[i]))
                    })
                    .style("pointer-events", notMatchFill)
                    .style("stroke", display2)

            }  

        }    


        


        function timeMatch(d, value) {

            var time = d.Time
        
            var hours = Number(time.match(/^(\d+)/)[1]);
            var minutes = Number(time.match(/:(\d+)/)[1]);
            var AMPM = time.match(/\s(.*)$/)[1];
            if (AMPM == "PM" && hours < 12) hours = hours + 12;
            if (AMPM == "AM" && hours == 12) hours = hours - 12;
            var sHours = hours.toString();
            var sMinutes = minutes.toString();
            if (hours < 10) sHours = "0" + sHours;
            if (minutes < 10) sMinutes = "0" + sMinutes;
            var newTime = (sHours + ":" + sMinutes);

            if (inputValue >= newTime) {         
                return "inline";
            } else {
                return "none";
            };
        }

        function removeSidebar(){
            $('#sidebar').removeClass('active');
        }

        function isSidebarOpen() {

            var sideBar = document.getElementById('sidebar');
            if (sideBar.classList.contains('active')) {
                document.getElementById("map").onclick = removeSidebar
            } else {
                console.log('not active')
                document.getElementById("map").onclick = removeSidebar
            }
                
            

        }


        if ($(window).width() < 960) {  
            //alert('Less than 960');
            window.onload = function () {
            document.getElementById("sidebarCollapse").onclick=isSidebarOpen;
            };
            document.getElementById("sidebarCollapse").onclick=isSidebarOpen;
        } else {
        //alert('More than 960');
        }
     
// function toggleZoomScreen() {document.body.style.zoom = "100%";}
// toggleZoomScreen()
//         window.blockMenuHeaderScroll = false;
// $(window).on('touchstart', function(e)
// {
//     if ($(e.target).closest('#map').length == 1)
//     {
//         blockMenuHeaderScroll = true;
//     }
// });
// $(window).on('touchend', function()
// {
//     blockMenuHeaderScroll = false;
// });
// $(window).on('touchmove', function(e)
// {
//     if (blockMenuHeaderScroll)
//     {
//         e.preventDefault();
//     }
// });


//this works -------------------------------
// document.addEventListener("touchstart", function(e){
// e.preventDefault();
// },{passive: false});

// document.getElementById('map').addEventListener('touchstart', function(e){e.stopPropagation()}, false);
// document.getElementById('sidebar').addEventListener('touchstart', function(e){e.stopPropagation()}, false);
// document.getElementById('folkGenre').addEventListener('touchstart', function(e){e.stopPropagation()}, false);

// document.getElementById('dropdownMenuButton').addEventListener('touchstart', function(e){e.stopPropagation()}, false);
// document.getElementById('sidebarCollapse').addEventListener('touchstart', function(e){e.stopPropagation()}, false);
// document.getElementById('NewYorkCity_NY_data').addEventListener('touchstart', function(e){e.stopPropagation()}, false);
// document.getElementById('about').addEventListener('touchstart', function(e){e.stopPropagation()}, false);

// eventsElement = document.getElementsByClassName('events')[0].addEventListener('touchstart', function(e){e.stopPropagation()}, false);

//this works -------------------------------




        

    }
})