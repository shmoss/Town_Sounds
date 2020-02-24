document.addEventListener('DOMContentLoaded', function(e) {



    
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
    var currentMap = d3.map();


    var sfData = "./data/sf_events.json" 
    var nycData = "./data/nyc_events.json" 

   
   
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
             
            if (selectedDate === data.Date) {
               
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
                        return (d.Genre.includes(genreType[i]))
                    })
                    .style("fill", display)

            }  

            for (i=0; i<genreType.length; i++){
       
                d3.selectAll(".events")
                    .filter(function(d) {       
                        return (d.Genre.includes(genreType[i])==true)
                    })
                    .style("pointer-events", all)
            } 

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

         //Apply checkbox filters for genre
        d3.selectAll("#allGenre").on("change", function() {
            resetDisplay()
            resetAll()
            resetVisibility()
        });

        var currentValue = 0;

        d3.selectAll("#bluesGenre").on("change", function() {
            resetDisplay()
            var bluesRadioValue = document.getElementById("bluesGenre").value 
            currentValue = bluesRadioValue
            display = this.checked ? "#ffba00" : "none";
            display2 = this.checked ? "black" : "none";
            x = ["Blues"]
            genreMatch(x)
        });


        d3.selectAll("#classicalGenre").on("change", function() {
            resetDisplay()
            display = this.checked ? "#ffba00" : "none";
            display2 = this.checked ? "black" : "none";
            x = ["Classical"]
            genreMatch(x)
        });


        d3.selectAll("#electronicGenre").on("change", function() {
            resetDisplay()
            display = this.checked ? "#ffba00" : "none";
            display2 = this.checked ? "black" : "none";
            x = ["Electronic", "Electronica", "House", "DJ", "Techno", "Trance", "Dance"]
            genreMatch(x)
        });


        d3.selectAll("#folkGenre").on("change", function() {
            resetDisplay()
            display = this.checked ? "#ffba00" : "none";
            display2 = this.checked ? "black" : "none";
            x = ["Bluegrass","Folk","Singer Songwriter","Americana","Country","Acoustic"]
            genreMatch(x)   
        });


        d3.selectAll("#hipHopGenre").on("change", function() {
            resetDisplay()
            display = this.checked ? "#ffba00" : "none";
            display2 = this.checked ? "black" : "none";
            x = ["Hip Hop", "Rap"]
            genreMatch(x)
        });


        d3.selectAll("#jazzGenre").on("change", function() {
            resetDisplay()
            display = this.checked ? "#ffba00" : "none";
            display2 = this.checked ? "black" : "none";
            x = ["Jazz", "Swing", "Big Band"]
            genreMatch(x)
        });


        d3.selectAll("#metalGenre").on("change", function() {
            resetDisplay()
            display = this.checked ? "#ffba00" : "none";
            display2 = this.checked ? "black" : "none";
            x = ["Metal", "Black Metal", "Hardcore"]
            genreMatch(x)
        });


        d3.selectAll("#rbGenre").on("change", function() {
            resetDisplay()
            display = this.checked ? "#ffba00" : "none";
            display2 = this.checked ? "black" : "none";
            x = ["R&B", "Rnb", "Soul", "Disco", "Reggae", "rnb", "funk"]
            genreMatch(x)
        });


        d3.selectAll("#rockPopGenre").on("change", function() {
            resetDisplay()
            noPointers()
            display = this.checked ? "#ffba00" : "none";
            display2 = this.checked ? "black" : "none";
            pointerEvents = this.checked ? "all" : "all";
            x = ["Rock", "Pop","Indie", "Ska", "Punk"]
            genreMatch(x)
            removePoints(x)  
        });


        d3.selectAll("#genreUnknownGenre").on("change", function() {
            resetDisplay()
            display = this.checked ? "#ffba00" : "none";
            display2 = this.checked ? "black" : "none";
            x = ["No genre available"]
            genreMatch(x)
        });

        d3.selectAll("#NewYorkCity_NY_data").on("click", function() {
            console.log("NY!")
            map.setView([40.7128, -74.0060], 11);
            resetDisplay()
            loadData(nyc_events)
            //combineArray(nyc_events)
            
        });

        d3.selectAll("#SanFrancisco_CA_data").on("click", function() {
            console.log("SF!")
            map.setView([37.7778532, -122.4222303], 13);
            //resetDisplay()
          
            loadData(sf_events)
            //combineArray(nyc_events)
            
        });
        
    
      
        const picker = datepicker(document.querySelector('#datepicker'), {

            // Event callbacks.
            onSelect: function(instance) {
    
                var instanceSplit = instance.dateSelected.toString().split(" " ,4)
                var dayofMonth = instanceSplit[2]
    
                var instanceClean = instanceSplit.toString().replace(/,/g, ' ')
                var dayofMonthClean = dayofMonth.toString().replace(/01/g, '1')
                    .replace(/02/g, '2')
                    .replace(/03/g, '3')
                    .replace(/04/g, '4')
                    .replace(/05/g, '5')
                    .replace(/06/g, '6')
                    .replace(/07/g, '7')
                    .replace(/08/g, '8')
                    .replace(/09/g, '9')

                    var finalDate = instanceSplit[0] + " " + instanceSplit[1] + " " + dayofMonthClean + " " + instanceSplit[3]

                    selectedDate = finalDate
                    console.log(selectedDate)
 
                update()
       
            },

            onShow: function(instance) {
            },
            onHide: function(instance) {
            },
            onMonthChange: function(instance) {
            },
 
            // Customizations.
            formatter: function(el, date, instance) {
                el.value = date.toDateString();
                dat = new Date()
            },
  
            position: 'tr', // Top right.
            startDay: 1, // Calendar week starts on a Monday.
            customDays: ['S', 'M', 'T', 'W', 'Th', 'F', 'S'],
            customMonths: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            overlayButton: 'Go!',
            overlayPlaceholder: 'Enter a 4-digit year',
 
            // Settings.
            alwaysShow: true, // Never hide the calendar.
            dateSelected: new Date(), // Today is selected.
            maxDate: new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000), // Jan 1st, 2099.
            minDate: new Date(new Date().getTime()), // June 1st, 2016.
            startDate: new Date(), // This month.
   

        });

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

        


        var token ="pk.eyJ1Ijoic3RhcnJtb3NzMSIsImEiOiJjaXFheXZ6ejkwMzdyZmxtNmUzcWFlbnNjIn0.IoKwNIJXoLuMHPuUXsXeug"; // replace with your Mapbox API Access token. Create a Mapbox account and find it on https://account.mapbox.com/



        var map = L.map('map').setView([37.7778532, -122.4222303], 13);
  
        var gl = L.mapboxGL({
            accessToken: token,
            style: 'mapbox://styles/mapbox/dark-v8'
        }).addTo(map);

        var svgLayer = L.svg()
            svgLayer.addTo(map);
          
        var svgMap = d3.select("#map").select("svg");
            var mapG = svgMap.select('g');

  
    loadData(sf_events)
    
    function loadData(eventArray) {
        console.log(selectedDate)

        
        d3.selectAll(".events").remove()

        

        var LeafletDiv = d3.select("#content").append("div")   
            .attr("class", "county2014Tooltip")               
            .style("opacity", 1)
            .style("scrollTop", 0)

        var scrollBar = d3.select("#sidebar")
            .style("scrollTop", 0)

        var scrollBarActive = d3.select("#sidebar.active")
            .style("scrollTop", 0)
  
        d3.selectAll('.county2014Tooltip')
            .selectAll('div')
            .enter()
            .append('div')
                .style("background-color", 'red')
                .style("width", '40px')
           
       eventArray.forEach(function(d) {
     
        d.latLong = new L.LatLng(d.Coordinates[1],
                  d.Coordinates[0]);
        })
            
        var events = mapG.selectAll("circle")
            .data(eventArray)
            .enter().append("circle")
            .attr("class", 'events')
            .style("fill", '#ffba00')
            .style("opacity", '.7')
            .attr("r", 17.5)
            .style("display", dateMatch)
            .style("pointer-events", "auto")

            .on("mouseover", function(d) { 
                d3.selectAll(".events").style("stroke", 'none')
                d3.selectAll(".events").style("stroke-width", '0px')
                var value2014 = currentMap.get(d.location);     
                LeafletDiv.transition()        
                    .duration(200)      
                    .style("opacity", 1.7)
                    .style("scrollTop", 0)
                    
                LeafletDiv .html('<br/>' + "<img src='"+d.ArtistImage+"''width='300px' height = '150px'>" + '<br/>'+ '<br/>'+ '<b>'+ '<font size="3em">'+d.Artist+ '</font>'+ '</b>'  + '<br/>'+d.Date
                    + '<br/>'+d.Time + '<br/>' + d.Venue + '<br/>' +d.Address +'<br/>' +'<br/>'+ '<b>'+"Genre: &nbsp"+ '</b>' + d.Genre + '<p>' + '</p>' + '<b>'+" Info: &nbsp" + '</b>'+d.otherInfo + '<p>' + '</p>' +'<b>'+"Artist Bio: &nbsp" + '</b>'+d.moreBioInfo
                    )    
                    .style("top", "1.5vh")
                    .style("text-align", 'left'); 
                   d3.select(this).style("stroke", 'black')
                   d3.select(this).style("stroke-width", '3px')        
              })
        

        .on("click", function(d) { 
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
            var value2014 = currentMap.get(d.location);  

            LeafletDiv.transition()        
                .duration(200)      
                .style("opacity", .9);

            LeafletDiv .html('<br/>' + "<img src='"+d.ArtistImage+"''width='300px' height = '150px'>" + '<br/>'+ '<br/>'+ '<b>'+ '<font size="3em">'+d.Artist+ '</font>'+ '</b>'  + '<br/>'+d.Date
                    + '<br/>'+d.Time + '<br/>' + d.Venue + '<br/>' +d.Address +'<br/>' +'<br/>'+ '<b>'+"Genre: &nbsp"+ '</b>' + d.Genre + '<p>' + '</p>' + '<b>'+" Info: &nbsp" + '</b>'+d.otherInfo + '<p>' + '</p>' +'<b>'+"Artist Bio: &nbsp" + '</b>'+d.moreBioInfo
            )
                .style("top", "1.5vh")
                .style("text-align", 'left')
                .style("pointer-events", 'all')
                d3.select(this).style("stroke", 'black')  
                d3.select(this).style("stroke-width", '3px')

            $('.county2014Tooltip').scrollTop(0);

            d3.event.stopPropagation();

            // if user clicks a SECOND time, anywhere, make popup disappear
            d3.select("body").on("click", function(d) { 
                d3.selectAll(".events").style("stroke", 'none')
                d3.selectAll(".events").style("stroke-width", '0px')
 
                if (this !== currentCircle) {
                    //hide popup
                    var elements = d3.select(LeafletDiv)
                    elements.scrollTop = 0
           
                    LeafletDiv.transition()        
                        .duration(200)      
                        .style("opacity", 0)
                        .style("pointer-events", 'none') 
                        .attr("scrollTop", 0) 
                        //revert back to hover, unless user clicks again!
                        d3.selectAll(".events").on("mouseout", true);
                        d3.selectAll(".events").on("mouseover", true);
                        d3.selectAll(".events").on("mouseout", function(d) { 
                        //mousing out!     
                        LeafletDiv.transition()        
                            .duration(200)      
                            .style("opacity", 0);  
                            d3.selectAll(".events").style("stroke", 'none')
                            d3.selectAll(".events").style("stroke-width", '0px')        
                        })

                        // mouseover event listers added back in
                        d3.selectAll(".events").on("mouseover", function(d) { 
                        LeafletDiv.transition()        
                            .duration(200)      
                            .style("opacity", .9);

                        LeafletDiv .html('<br/>' + "<img src='"+d.ArtistImage+"''width='300px' height = '150px'>" + '<br/>'+ '<br/>'+ '<b>'+ '<font size="3em">'+d.Artist+ '</font>'+ '</b>'  + '<br/>'+d.Date
                        + '<br/>'+d.Time + '<br/>' + d.Venue + '<br/>' +d.Address +'<br/>' +'<br/>'+ '<b>'+"Genre: &nbsp"+ '</b>' + d.Genre + '<p>' + '</p>' + '<b>'+" Info: &nbsp" + '</b>'+d.otherInfo + '<p>' + '</p>' +'<b>'+"Artist Bio: &nbsp" + '</b>'+d.moreBioInfo
                        )
                            .style("top", "1.5vh")
                            .style("text-align", 'left')
                            d3.select(this).style("stroke", 'black')  
                            d3.select(this).style("stroke-width", '3px')
                    })
                }          
            })
        })

        .on("mouseout", function(d) {       
            LeafletDiv.transition()        
                .duration(200)      
                .style("opacity", 0)
                .style("scrollTop", 0)  
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
        console.log(todayClean)
        

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


        
    

        d3.selectAll("#allTimes").on("change", function() {
            resetStroke ()
            d3.selectAll(".events")
                .style("display", function(d) {
                return timeInterval(d, "00:00", "24:00")
            });
        })

        d3.selectAll("#morn").on("change", function() {
            resetStroke ()
            d3.selectAll(".events")
                .style("display", function(d) {
                return timeInterval(d, "07:00", "12:00")
            });
        })

        d3.selectAll("#lunch").on("change", function() {
            resetStroke ()
            d3.selectAll(".events")
                .style("display", function(d) {
                return timeInterval(d, "12:00", "16:00")
            });
        })

        d3.selectAll("#afternoon").on("change", function() {
            resetStroke ()
            d3.selectAll(".events")
                .style("display", function(d) {
                return timeInterval(d, "16:00", "20:00")
            });
        })

        d3.selectAll("#eve").on("change", function() {
            resetStroke ()
            d3.selectAll(".events")
                .style("display", function(d) { 
                return timeInterval(d, "20:00", "24:00")
            });
        })

        d3.selectAll("#late").on("change", function() {
            resetStroke ()
            d3.selectAll(".events")
                .style("display", function(d) {
                return timeInterval(d, "24:00", "07:00")
            });
        })
    

        


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


        

    }
})

