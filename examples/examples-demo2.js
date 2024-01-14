function makeDemo2() {
    d3.tsv( "examples-multiple.tsv" )
        .then( function( data ) {
            var pxX = 600, pxY = 300;                             //<1>
            //scale objects map input domain to output range
            var scX = d3.scaleLinear()                            //<2>
                //extent() takes an array (of objects) and returns the
                //greatest and smallest values as a two-element array.
                //Use => to save on keystrokes
                .domain( d3.extent(data, d => d["x"] ) )          //<3>
                .range( [0, pxX] );
            var scY1 = d3.scaleLinear()                           //<4>
                .domain(d3.extent(data, d => d["y1"] ) )
                //invert the output range to fix upside-down orientation
                .range( [pxY, 0] );                               //<5>
            var scY2 = d3.scaleLinear()
                .domain( d3.extent(data, d => d["y2"] ) )
                .range( [pxY, 0] );
            //select svg element to add symbols for the 1st data set
            d3.select( "svg" )                                    //<6>
                //before adding graphical element, adding a <g> element
                //it provides a logical grouping that distinguish all
                //symbols for the 1st data set
                .append( "g" ).attr( "id", "ds1" )                //<7>
                // circle elements are created as children of <g> element
                .selectAll( "circle" )                            //<8>
                .data(data).enter().append("circle")
                //fixed attr append to each circle element
                .attr( "r", 5 ).attr( "fill", "green" )           //<9>
                //apply the scale operator to the data, scX defined in <6>
                .attr( "cx", d => scX(d["x"]) )                   //<10>
                .attr( "cy", d => scY1(d["y1"]) );                //<11>
            
            d3.select( "svg" )                                    //<12>
                .append( "g" ).attr( "id", "ds2" )
                //specify a fixed attr for color, all children ingerite it
                .attr( "fill", "blue" )                           //<13>
                .selectAll( "circle" )                            //<14>
                .data(data).enter().append("circle")
                .attr( "r", 5 )
                .attr( "cx", d => scX(d["x"]) )
                .attr( "cy", d => scY2(d["y2"]) );                //<15>
            //each line segment depends on two consecutive data points
            //produces a string suitable for the d attribute of the 
            //SVG <path> element
            var lineMaker = d3.line()                             //<16>
                .x( d => scX( d["x"] ) )                          //<17>
                .y( d => scY1( d["y1"] ) );
            // select the <g> element by id attr
            d3.select( "#ds1" )                                   //<18>
                //add <path> element as child of the <g> group
                .append( "path" )                                 //<19>
                .attr( "fill", "none" ).attr( "stroke", "red" )     
                //append the d attr using the linemaker var defined in <16>
                .attr( "d", lineMaker(data) );                    //<20>
            //reuse the linemaker
            lineMaker.y( d => scY2( d["y2"] ) );                  //<21>

            d3.select( "#ds2" )                                   //<22>
                .append( "path" )
                .attr( "fill", "none" ).attr( "stroke", "cyan" )
                .attr( "d", lineMaker(data) );

//          d3.select( "#ds2" ).attr( "fill", "red" );            //<23>
        } );
}
