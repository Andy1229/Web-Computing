
function kCalendar(id, date) {
	var kCalendar = document.getElementById(id);
	
	if( typeof( date ) !== 'undefined' ) {
		date = date.split('-');
		date[1] = date[1] - 1;
		date = new Date(date[2], date[1], date[0]);
	}
	else {
		var date = new Date();
	}
	var currentYear = date.getFullYear();
	//year
	
	var currentMonth = date.getMonth() + 1;
	//month. start with 0 so +1, dec print 11
	
	var currentDate = date.getDate();
	//date of today.
	
	date.setDate(1);
	var currentDay = date.getDay();
	//sun = 0 sat = 6 and the first date of this month
	
	var dateString = new Array('sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat');
	var lastDate = new Array(31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31);
	if( (currentYear % 4 === 0 && currentYear % 100 !== 0) || currentYear % 400 === 0 )
		lastDate[1] = 29;
	//last date of each month
	
	var currentLastDate = lastDate[currentMonth-1];
	var week = Math.ceil( ( currentDay + currentLastDate ) / 7 );
	//the total week
	
	if(currentMonth != 1)
		var prevDate = currentDate + '-' + ( currentMonth - 1 ) + '-' + currentYear;
	else
		var prevDate = currentDate + '-' + 12 + '-' + ( currentYear - 1 );
	
	
	if(currentMonth != 12) 
		var nextDate = currentDate + '-' + ( currentMonth + 1 ) + '-' + currentYear;
	else
		var nextDate = currentDate + '-' + 1 + '-' + ( currentYear + 1 );


	
	if( currentMonth < 10 )
		var currentMonth = '0' + currentMonth;

	
	var monstr="";
	if (currentMonth == 1)
	{
		monstr="JAN";
	}
	else if (currentMonth == 2)
	{
		monstr="FEB";
	}
	else if (currentMonth == 3)
	{
		monstr="MAR";
	}
	else if (currentMonth == 4)
	{
		monstr="APR";
	}
	else if (currentMonth == 5)
	{
		monstr="MAY";
	}
	else if (currentMonth == 6)
	{
		monstr="JUN";
	}
	else if (currentMonth == 7)
	{
		monstr="JUL";
	}
	else if (currentMonth == 8)
	{
		monstr="AUG";
	}
	else if (currentMonth == 9)
	{
		monstr="SEP";
	}
	else if (currentMonth == 10)
	{
		monstr="OCT";
	}
	else if (currentMonth == 11)
	{
		monstr="NOV";
	}
	else if (currentMonth == 12)
	{
		monstr="DEC";
	}

	var calendar = '';
	
	calendar += '<div class="cover1" >';
	calendar += '<div class="month1">';
	calendar += ' <ul>';
	calendar += '<li class="prev1" id="prev" onclick="kCalendar(\'' +  id + '\', \'' + prevDate + '\')">&#10094;</li>';
	calendar += '<li class="next1" id="next" onclick="kCalendar(\'' + id + '\', \'' + nextDate + '\')">&#10095;</li>';
	calendar += ' 		<li id="date">';
	calendar += '      <span>';
	calendar += monstr;
	calendar += '    <br><span id="Y1">';
	calendar += currentYear;
	calendar += '      </span>';
	calendar += '      </li>';
	calendar += '  </ul>';
	calendar += '</div>';

	calendar += '<ul class="weekdays1">';
	calendar += '<li>Su</li> ';
	calendar += '<li>Mo</li> ';
	calendar += '<li>Tu</li> ';
	calendar += '<li>We</li> ';
	calendar += '<li>Th</li> ';
	calendar += '<li>Fr</li> ';
	calendar += '<li>Sa</li>';
	calendar += '</ul>';

	var dateNum = 1 - currentDay;
	
	for(var i = 0; i < week; i++) {
		calendar += '<ul class="days1">';
		for(var j = 0; j < 7; j++, dateNum++) {
			if( dateNum < 1 || dateNum > currentLastDate ) {
				calendar += '<li></li> ';
			} else if ( dateNum == currentDate )
			{
				calendar += '<li><span class="active1">' + dateNum + '</span></li> ';

			}
			else 
			{
				calendar += '<li>' + dateNum + '</li> ';
			}
			
		}

	}
	
	calendar += '			</ul>';
	calendar += '		</div>';
	
	kCalendar.innerHTML = calendar;

}