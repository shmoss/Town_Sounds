
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

    var value 
  
    var currentValue = 10

    var sizeValue

    //Set values for time range slider
    var inputValue = null;
   

    var currentMap = d3.map();

    d3.queue()
    .defer(d3.csv, "./data/allSanFranciscoEvents14.json", function(cw) { 
       // console.log('cw')
    })
    .defer(d3.csv, "./data/testScrape.json", function(cw) {      
    })
    .defer(d3.csv, "./data/sf_events.json", function(cw) {      
    })
    .await(ready);

    function ready(error) {
    
    

        //projection
        var albersProjection = d3.geoAlbers()
            .scale( 1200)
            .rotate ( [98.5795,] )
            .center( [0, 39.8283] )

        //GeoPath
        var geoPath = d3.geoPath()
            .projection( albersProjection );

        var geoPath2 = d3.geoPath()
            .projection( albersProjection );


    

        }


    d3.queue()
    
    .defer(d3.csv, "./data/allSanFranciscoEvents14.json", function(d) { 
       // console.log('cw')
    })
    .defer(d3.csv, "./data/testScrape.json", function(d) { 
       // console.log('cw')
    })
    .defer(d3.csv, "./data/sf_events.json", function(d) { 
       // console.log('cw')
    })
    .await(readyLeaflet);


    // Build Leaflet Map
    function readyLeaflet(error) {

    var selectedDate

    //set today's date
    var today = new Date()
    console.log(today.toLocaleDateString())
    console.log(today)
    var todaySplit = today.toString().split(" " ,4)
    //console.log(instanceSplit);
    var todayClean = todaySplit.toString().replace(/,/g, ' ')
    //console.log(todayClean)

    

    
    var nextweek
    //d3.selectAll(".events")
        //.style("display", initialDateMatch);
    function nextweek(){
    var today = new Date();
    var nextweek = new Date(today.getFullYear(), today.getMonth(), today.getDate()+7);
    console.log(nextweek)
    return nextweek;
}
    nextweek()
   

var dat
console.log(dat)
const picker = datepicker(document.querySelector('#datepicker'), {

        



  // Event callbacks.
  onSelect: function(instance) {
    //console.log(instance)
    
    var instanceSplit = instance.dateSelected.toString().split(" " ,4)
    var instanceClean = instanceSplit.toString().replace(/,/g, ' ')
    selectedDate = instanceClean
    //console.log(selectedDate)
    update()
       
  },
  onShow: function(instance) {
    //console.log('Calendar showing.');
  },
  onHide: function(instance) {
    //console.log('Calendar hidden.');
  },
  onMonthChange: function(instance) {
    // Show the month of the selected date.
    //console.log(instance.currentMonthName);
  },
 
 
 
  // Customizations.
  formatter: function(el, date, instance) {
    // This will display the date as `1/1/2019`.
    el.value = date.toDateString();
    //console.log(el)
    dat = new Date()
    //console.log(dat.getMonth())
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
  minDate: new Date(2016, 5, 1), // June 1st, 2016.
  startDate: new Date(), // This month.
 

  
  // Disabling things.


  
});


    
    


    //var SFData = SFCoworking.features
        //console.log(SFData)
    var allSFEvents

    function combineArray(arr) {
    allSFEvents = [];
    for (var i = 0; i < arr.length; i++) {
        allSFEvents = allSFEvents.concat(arr[i]);
    }
     
    return allSFEvents;

}

combineArray(sf_events);



        var radius = d3.scaleLinear()
            .domain([20000, 40000, 60000, 80000, 100000]) //568158 37691912
            .range([8, 10, 12, 14, 16]);


        var type = d3.scaleOrdinal()
            .domain(['WeWork', 'Regus', 'Spaces', 'Knotel', 'RocketSpace', 'HQ Global Workplaces'])
            .range(['#e30613', '#17a2b8', '#28a745', '#6610f2', '#ffc107', '#ed700a'])
             .unknown("white");

        //Build Leaflet Map
        L.mapbox.accessToken = 'pk.eyJ1Ijoic3RhcnJtb3NzMSIsImEiOiJjaXFheXZ6ejkwMzdyZmxtNmUzcWFlbnNjIn0.IoKwNIJXoLuMHPuUXsXeug';
        var mapboxUrl = 'https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}';
            //var accessToken = 'pk.eyJ1Ijoic3RhcnJtb3NzMSIsImEiOiJjam13ZHlxbXgwdncwM3FvMnJjeGVubjI5In0.-ridMV6bkkyNhbPfMJhVzw';
        var map = L.map('map').setView([37.7749, -122.4194], 13);

                mapLink = 
            '<a href="https://openstreetmap.org">OpenStreetMap</a>';
        L.tileLayer(
            'https://api.mapbox.com/styles/v1/mapbox/dark-v9/tiles/{z}/{x}/{y}?access_token=' + L.mapbox.accessToken, {
                tileSize: 512,
                zoomOffset: -1,
                attribution: '© <a href="https://www.mapbox.com/feedback/">Mapbox</a> © <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(map);
        
        setTimeout(function(){ map.invalidateSize()}, 400);
        var svgLayer = L.svg()
            svgLayer.addTo(map);

     
            
        var svgMap = d3.select("#map").select("svg");
            var mapG = svgMap.select('g');

    

        var LeafletDiv = d3.select("body").append("div")   
            .attr("class", "county2014Tooltip")               
            .style("opacity", 0)
      
     
        var tenantNamesArray = []
        var agencyBrokerNamesArray = []
        allSFEvents.forEach(function(d) {
     
      d.latLong = new L.LatLng(d.Coordinates[1],
                  d.Coordinates[0]);
      //console.log(d.latLong)
      })
            
 

    //console.log(allSFEvents)

    var events = mapG.selectAll("circle")
        .data(allSFEvents)
        .enter().append("circle")
        .style("stroke", "black")
        .attr("class", 'events')
        .style("fill", '#ffba00')
        .style("opacity", '.7')
        .attr("r", 14.5)
        .style("display", initialDateMatch)
        .style("pointer-events", "all")
        .on("mouseover", function(d) { 
         
            var value2014 = currentMap.get(d.location);     
                  LeafletDiv.transition()        
                     .duration(200)      
                    .style("opacity", .9);

                  LeafletDiv .html('<br/>' + '<b>'+d.Address+'</b>' + '<br/>'+d.Artist
                    + '<br/>'+d.Date + '<br/>' +d.Venue +'<br/>' + d.OtherInfo + '<br/>' +d.Genre +'<br/>'+ d.ArtistImage +'<br/>' +d.ArtistBio
                    )
                    .style("left", (d3.event.pageX+ 15) + "px")     
                    .style("top", (d3.event.pageY - 150) + "px")
                    .style("text-align", 'left'); 
                   d3.select(this).style("stroke-width", '3px')

                   document.getElementById("test").innerHTML = "<img src='"+d.ArtistImage+"''width='300px' height = '150px'>"
              })
        

        .on("click", function(d) { 
         
            var value2014 = currentMap.get(d.location);     
                  LeafletDiv.transition()        
                     .duration(200)      
                    .style("opacity", .9);

                  LeafletDiv .html('<br/>' + '<b>'+d.Address+'</b>' + '<br/>'+d.Artist
                    + '<br/>'+d.Date + '<br/>' + d.Time + '<br/>' +d.Venue +'<br/>' + d.OtherInfo + '<br/>' +d.Genre +'<br/>'+ d.ArtistImage +'<br/>' +d.ArtistBio
                    )
                    .style("left", (d3.event.pageX+ 15) + "px")     
                    .style("top", (d3.event.pageY - 150) + "px")
                    .style("text-align", 'left'); 
                  d3.select(this).style("stroke-width", '3px')

                   document.getElementById("test").innerHTML = "<img src='"+d.ArtistImage+"''width='300px' height = '150px'>"
              })

        .on("mouseout", function(d) {       
                LeafletDiv.transition()        
                  .duration(200)      
                  .style("opacity", 0);  
                 d3.select(this).style("stroke-width", '1px')
                document.getElementById("test").innerHTML = 'no picture'
              })



        //$(document).on('click',function(d){
                //if(d.target.onclick==null) {
                    //console.log('unclicked')
                //}
        //})
        

    var todaysDate = new Date 


    var date
var dateClean
    d3.selectAll(".events").each(function(d) {
            var options = { weekday: 'long'};
            var date = new Date(d.EventDate + 'PST')
            //console.log("d.startDate is: "+ d.startDate+"date is: "+date)
            var dateString = date.toString()
            //console.log(d.startDate + date + d.name)
            //date.toLocaleDateString()
            var dateSplit = dateString.split(" " ,4)
            var dateClean = dateSplit.toString().replace(/,/g, ' ')
            //console.log(date.split(' '))
            //dateSplit = date.split(/ (.*)/);
            //console.log(dateSplit)
            d.dateFormatted = dateClean
            //dateClean = date
            return d.dateFormatted

        });

   
 
    //console.log(events)
      
    function drawAndUpdateEventCircles() {
        events.attr("transform",
            function(d) {
                var layerPoints = map.latLngToLayerPoint(d.latLong);
                //console.log(d.latLong)
                return "translate("+ layerPoints.x +","+ layerPoints.y +")";
            }
        )
    }
drawAndUpdateEventCircles();
    map.on("moveend", drawAndUpdateEventCircles);

    var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    
    var today  = new Date();
    var todayString = today.toString().split(" " ,4)
    var todayClean = todayString.toString().replace(/,/g, ' ')
    //console.log(todayClean)



//console.log(today.toLocaleDateString("en-US")); // 9/17/2016
//console.log(today.toLocaleDateString("en-US", options)); // Saturday, September 17, 2016
//console.log(today.toLocaleDateString("hi-IN", options));


function update(value) {


    d3.selectAll(".events")
        .style("display", dateMatch);

    
    genreMatchRock("Rock")

   
 
}




//console.log(dateClean)

    function initialDateMatch(data){
        d3.selectAll(".events").each(function(d) {
            var options = { weekday: 'long'};
            var date = new Date(d.EventDate + 'PST')
            var dateString = date.toString()
            var dateClean= dateString.split(" " ,4).toString().replace(/,/g, ' ')
            d.dateFormatted = dateClean
 
            return d.dateFormatted

        });

        var x = "Friday, June 14th, 2019"

        //console.log(data.dateFormatted)
    if (todayClean== data.Date) {
        

        
        //console.log("selectedDate is:" + selectedDate+ "and dateFormatted is:"+data.dateFormatted)
        return 'inline'
    } else {
       return 'none'
    }
}


    function dateMatch(data){

        //console.log(selectedDate)
    if (selectedDate === data.Date) {
        
        //console.log("selectedDate is:" + selectedDate+ "and dateFormatted is:"+data.dateFormatted)
        return 'inline'
    } else {
       return 'none'
    }
}

    //console.log(d.dateFormatted)

    
    //Apply checkbox filters for genre


    d3.selectAll("#allGenre").on("change", function() {
    resetDisplay()

    
    //genreMatch("Rock", "Pop", "Indie Pop")
});


    var currentValue = 0;
    d3.selectAll("#bluesGenre").on("change", function() {
    resetDisplay()
    console.log("blue clicked! radio")
    console.log("current")
    var bluesRadioValue = document.getElementById("bluesGenre").value 
    console.log(bluesRadioValue, "blues radio value")
    console.log(currentValue, "current value")
    currentValue = bluesRadioValue
    display = this.checked ? "red" : "#ffba00"; 
    genreMatch("Blues")
});


 

    d3.selectAll("#classicalGenre").on("change", function() {
    resetDisplay()
    display = this.checked ? "red" : "#ffba00"; 
    genreMatch("Classical")
});

    d3.selectAll("#electronicGenre").on("change", function() {
    resetDisplay()
    display = this.checked ? "red" : "#ffba00"; 
    genreMatch("Electronic")
    genreMatch("Electronica")
    genreMatch("House")
    genreMatch("DJ")
    genreMatch("Techno")
    genreMatch("Dance")
    genreMatch("Trance")
});

    d3.selectAll("#folkGenre").on("change", function() {
    resetDisplay()
    display = this.checked ? "red" : "#ffba00"; 
    genreMatch("Folk")
    genreMatch("Americana")
    genreMatch("Bluegrass")
    genreMatch("songwriter")
});

    d3.selectAll("#hipHopGenre").on("change", function() {
    resetDisplay()
    display = this.checked ? "red" : "#ffba00"; 
    genreMatch("Hip Hop")
});

    d3.selectAll("#jazzGenre").on("change", function() {
    resetDisplay()
    display = this.checked ? "red" : "#ffba00";
    genreMatch("Jazz")
});

    d3.selectAll("#metalGenre").on("change", function() {
    resetDisplay()
    display = this.checked ? "red" : "#ffba00";
    genreMatch("Metal")
    genreMatch("Black Metal")
    genreMatch("Hardcore")
});

    d3.selectAll("#rbGenre").on("change", function() {
    resetDisplay()
    display = this.checked ? "red" : "#ffba00";
    genreMatch("R&B")
    genreMatch("Rnb")
    genreMatch("Soul")
    genreMatch("Disco")
});


    d3.selectAll("#rockPopGenre").on("change", function() {
    display = this.checked ? "red" : "#ffba00";
    genreMatch("Rock")
    genreMatch("Pop")
    genreMatch("Indie")
});

    d3.selectAll("#genreUnknownGenre").on("change", function() {
    display = this.checked ? "red" : "#ffba00";
    genreMatch("No genre available")
});
    


    


    


    


    

    
    

    

    


 function genreMatch (genreType, key1, key2, key3) {
    var genreType
    //console.log(genreType)
    //console.log("genre match function on")

    //var conditions = [key1, key2, key3];
    //console.log(conditions)

    d3.selectAll(".events")
    .filter(function(d) {       
        return (d.Genre.includes(genreType))
        //return d.Genre.includes(key1)
      
    })
    .style("fill", display);
 }   

  function genreMatchRock (genreType) {
    console.log('matcharock')
    var genreTypeRock
    d3.selectAll("#rockPopGenre")

    if (this.checked) {
        console.log('this.checked')
    }
    

    display = this.checked ? "inline" : "none"; 
   console.log(display)

    //console.log(genreType)
    //console.log("genre match function on")

    //var conditions = [key1, key2, key3];
    //console.log(conditions)

    d3.selectAll(".events")
    .filter(function(d) {       
        return (d.Genre.includes(genreTypeRock) && selectedDate === d.Date)
        //return d.Genre.includes(key1)
      
    })
    .style("display", display);
 } 

 function display(){
    display = this.checked ? "inline" : "none";
 }

 function resetDisplay (){
    d3.selectAll(".events")
            .style("fill", '#ffba00');
 }

 //Time slider
 d3.select("#timeslide").on("input", function() {       
            //console.log(value)
            updateTime(+this.value);   
            console.log(this.value)
        });


 function updateTime(value) {
        console.log(value)
        //document.getElementById("range").innerHTML=times[value];
        inputValue = times[value];
        inputValue = inputValue
        console.log(inputValue)
    
        d3.selectAll(".events")
            .style("display", timeMatch);
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
        console.log(newTime)

        //var time = (d.Time);
        //time = time.getHours()
       // console.log(newTime, "is time")
        console.log(inputValue, "is input value")
        if (inputValue >= newTime) {
            console.log("match")
                    
         return "inline";
        } else {
            return "none";
        };
    }



}
})


