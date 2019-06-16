var gSortId, gSortDir

function tableSort(tableId, col, rowStart, numericCol) {
	//assume: col is a column number of a td element, tr.children[col]
	//assume: rowStart >= 0; the row to start sorting from; some tables begin with rows containing info
	//assume: numericCol = boolean; is the column numeric
	
  if(rowStart == null) {
    rowStart = 0
  }
  if(numericCol == null) {
    numericCol = false
  }

  let sortid = tableId+'-'+col
  if(gSortId != null && gSortId === sortid){
		gSortDir = !gSortDir
	}
  else{
		gSortId = sortid
		gSortDir = true
	}

  let t1 = new Date(),
  		dir= gSortDir,
  		table0, table, rows, pa, swapped, i, rowx, rowy, x, y

  table0 = document.getElementById(tableId);
  table = document.createElement('table');
  table.innerHTML = table0.innerHTML;
  rows = table.rows;
  pa = rows[rowStart].parentNode; //tbody

  swapped = true;

  while (swapped) {
    swapped = false;

    for (i = rowStart; i < rows.length - 1; i++) {
      rowx = rows[i];
      rowy = rows[i + 1];

      x = rowx.sortData;
      if (x === undefined) {
        //x = rowx.dataset['col' + col];
        x = rowx.children[col].innerHTML;
        if(numericCol===true)
        	x = Number(x)
        else
        	x = x.toLowerCase()
        rowx.sortData = x;
      }

      y = rowy.sortData;
      if (y === undefined) {
        y = rowy.children[col].innerHTML;
        //y = rowy.dataset['col' + col];
        if(numericCol===true)
        	y = Number(y)
        else
        	y = y.toLowerCase()
        rowy.sortData = y;
      }

      if(dir===true) {
	      if(x > y) {
	        pa.insertBefore(rowy, rowx);
	        swapped = true;
	      }
	    }
	    else{
	      if(x < y) {
	        pa.insertBefore(rowy, rowx);
	        swapped = true;
	      }
	    }
    }
  }

  table0.innerHTML = table.innerHTML;
  console.log(col, 'time:', new Date() - t1, 'ms');
}
