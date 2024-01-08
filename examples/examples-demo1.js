function makeDemo1() {                                         //<1>
    // js fetch API returns a JavaScript Promise object
    d3.tsv( "examples-simple.tsv" )                            //<2>
        //function=tsv() data=content of tsv file
        .then( function( data ) {                              //<3> <4>
            //select() only the first match, svg is the location in 
            //DOM to contain the graph
            d3.select( "svg" )                                 //<5>
                //selectAll() a collection of all matching nodes
                //creating a placeholder (the empty collection) 
                //which we will subsequently fill
                .selectAll( "circle" )                         //<6>
                //each data point is represented through a separate 
                //DOM element
                .data( data )                                  //<7>
                // enter() provides access to all surplus data points
                // that could not be matched with DOM elements
                .enter()                                       //<8>
                //a <circle> element is appended to the collection 
                //of <circle> elements inside the SVG that was 
                //selected on line 6.
                .append( "circle" )                            //<9>
                .attr( "r", 5 ).attr( "fill", "red" )          //<10>
                .attr( "cx", function(d) { return d["x"] } )   //<11>
                .attr( "cy", function(d) { return d["y"] } );    
        } );
}
