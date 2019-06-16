# tableSort

This is a general table sort algorithm.  It sorts an HTML table by moving its TR elements about; best suited to HTML tables containing less than 1000 rows.  Currently, I'm using it in my <a href="https://github.com/ChrisDeFreitas/Electron-FolderView/blob/master/lib/ui.js">FolderView</a> application to sort tables of directory file counts and sizes. 

Note, that the current implementation extracts the sort data from td elements.  A strategy is to use extra td.style.display=none to store extract sort data.  For example, if a td contains formatted data, the sort data can be stored in a hidden td.  Note also, that the algorithm can easily be used with the tr.data property.

I was hired by a client to rebuild their search engine and one of the result grids used the table sort algorithm found at <a href="https://www.w3schools.com/howto/howto_js_sort_table.asp">W3 School, How TO - Sort a Table</a>.  That algorithm obviously works. However, the client's table was regularly sorting 500 to 5000 rows.  As a result the old algorithm was timing out multiple times and then eventually failing when sorting 1,200 rows.

This tableSort algorithm is my optimized version.  It sorts 1,200 rows in 1 to 1.5 seconds. Its much better than the original, but still not good enough.  The eventual algorithm I created sorts 1,200 rows in ~300 ms and over 4,000 rows in ~1.2 seconds.  That algorithm couldn't be published because it takes advantage of the processing environment to gain its speed--its not portable to general table sort problems.

The basic problem with this type of sort algorithm (that moves DOM elements about) is that HTML DOM access is very very slow from Javascript.  So a big part of optimization is reducing DOM access and reducing access to object properties.  These issues are reflected in the algorithm published here.  Also, note that the entire tree contents are copied to a new table.  This prevents browser paint events from being triggered--this alone cuts processing time by at least 50%.

The code is published here because it works well and will be handy to have readily available (this will keep me from loosing the it in my morass of code).
