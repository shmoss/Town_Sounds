
document.addEventListener('DOMContentLoaded', function(e) {

    


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
    console.log(instance)
    
    var instanceSplit = instance.dateSelected.toString().split(" " ,4)
    var instanceClean = instanceSplit.toString().replace(/,/g, ' ')
    selectedDate = instanceClean
    console.log(selectedDate)
    update()
       
  },
  onShow: function(instance) {
    console.log('Calendar showing.');
  },
  onHide: function(instance) {
    console.log('Calendar hidden.');
  },
  onMonthChange: function(instance) {
    // Show the month of the selected date.
    //console.log(instance.currentMonthName);
  },
 
 
 
  // Customizations.
  formatter: function(el, date, instance) {
    // This will display the date as `1/1/2019`.
    el.value = date.toDateString();
    console.log(el)
    dat = new Date()
    console.log(dat.getMonth())
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


    
    function dateMatch(data){

        //console.log(selectedDate)
    if (selectedDate === data.dateFormatted) {
        //console.log(selectedDate)
        console.log(data.dateFormatted)
        //console.log("selectedDate is:" + selectedDate+ "and dateFormatted is:"+data.dateFormatted)
        return 'inline'
    } else {
       return 'none'
    }
}


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
        .style("fill", '%23ffba00')
        .style("opacity", '.7')
        .attr("r", 7.5)
        .style("display", initialDateMatch)
        .style("pointer-events", "all")

    var todaysDate = new Date 

   
 
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
}



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
            return date

        });
//console.log(dateClean)

    function initialDateMatch(data){
        d3.selectAll(".events").each(function(d) {
            var options = { weekday: 'long'};
            var date = new Date(d.EventDate + 'PST')
            var dateString = date.toString()
            var dateClean= dateString.split(" " ,4).toString().replace(/,/g, ' ')
            d.dateFormatted = dateClean
 
            return date

        });
        //console.log(data)
        //console.log(todaysDate)
        //console.log(todayClean)
        //console.log(data.dateFormatted)
        var x = "Friday, June 14th, 2019"
        //console.log(data.dateFormatted)
    if (todayClean== data.dateFormatted) {
        //console.log(selectedDate)
        
        //console.log("selectedDate is:" + selectedDate+ "and dateFormatted is:"+data.dateFormatted)
        return 'inline'
    } else {
       return 'none'
    }
}

    //console.log(d.dateFormatted)

    d3.selectAll(".events")
          .on("mouseover", function(d) { 
         
            var value2014 = currentMap.get(d.location);     
                  LeafletDiv.transition()        
                     .duration(200)      
                    .style("opacity", .9);

                  LeafletDiv .html('<br/>' + '<b>'+d.Address+'</b>' + '<br/>'+d.Artist
                    + '<br/>'+d.Date + '<br/>' +d.Venue +'<br/>' + d.OtherInfo + '<br/>' + d.ArtistBio
                    )
                    .style("left", (d3.event.pageX+ 15) + "px")     
                    .style("top", (d3.event.pageY - 150) + "px")
                    .style("text-align", 'left'); 
                   d3.select(this).attr("class","countyHover");   
              })

              .on("mouseout", function(d) {       
                LeafletDiv.transition()        
                  .duration(200)      
                  .style("opacity", 0);  
                d3.select(this).attr("class","events"); 
              });  

    


}
})


