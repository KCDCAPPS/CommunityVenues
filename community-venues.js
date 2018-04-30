window.onload = function() {
		var suburb = '';
		var visibleVenues = 0;
		/* UAT ONLY */
		var domain = "http://uat.kapiticoast.govt.nz.testwin.gdmedia.tv/";
		//var domain = "http://www.kapiticoast.govt.nz/";

		$('#suburb').select2({
			placeholder: "Select a Suburb",
			allowClear: true,
			data: [
			{
			  id: '*',
			  text: 'All'
			},
			{
			  id: 'Ōtaki',
			  text: 'Ōtaki'
			},
			{
			  id: 'Paekākāriki',
			  text: 'Paekākāriki'
			},
			{
			  id: 'Paraparaumu',
			  text: 'Paraparaumu'
			},
			{
			  id: 'Paraparaumu Beach',
			  text: 'Paraparaumu Beach'
			},
			{
			  id: 'Raumati',
			  text: 'Raumati'
			},
			{
			  id: 'Raumati South',
			  text: 'Raumati South'
			},
			{
			  id: 'Te Horo',
			  text: 'Te Horo'
			},
			{
			  id: 'Waikanae',
			  text: 'Waikanae'
			},
			{
			  id: 'Waikanae Beach',
			  text: 'Waikanae Beach'
			}
			]
		});

		$('#designation').select2({
			placeholder: "Select one or more amenity to filter the venue list",
			tags: true,
			tokenSeparators: [',', ' ']
		})
		$('#designation').prop('disabled', 'disabled');


		$('#suburb').on('select2:select', function (evt) {
			suburb = $(this).val();
			designations = findSuburbDesignations(suburb);
			
			
			$('#designation').prop('disabled', false);
		});
		
		$('#suburb').on('select2:unselect', function (e) {
			suburb = '';
			findSuburbDesignations('')
			$('#designation').prop('disabled', 'disabled');
			$('#venues-btn').html('Show More...');
			$('#venues-btn').hide();
		});

		$('#designation').on('select2:select', function (e) {
			findVenueDesignations($('#designation').val())
		});
		
		$('#designation').on('select2:unselect', function (e) {
			findVenueDesignations($('#designation').val());
		});
		
		var venues = {
			"Paekākāriki Memorial Hall": [{
				"Designation": [
					"Fully-equipped kitchen",
					"Large capacity (250+)",
					"Wheelchair access & disability toilet",
					"For social function", 
					"For meeting",
					"For sport/recreation activity"
				],
				"Suburb": "Paekākāriki",
				"Location": "98 The Parade, Paekākāriki",
				"Webpage": "/Our-District/Our-Community/community-venues-for-hire/paekakariki-memorial-hall/",
				"Blurb": "Paekākāriki Memorial Hall is a large hall with a fully-equipped kitchen. It is suitable for large functions (conditions apply), meetings and recreation activities. Bookings are made through Kāpiti Coast District Council and it is available for hire seven days a week.",
				"Image": "/globalassets/our-district/our-community/community-venues-for-hire/paekakariki-memorial-hall/PaekakHallThumb.jpg"
			}],
			"Ōtaki Memorial Hall": [{
				"Designation": [
					"Fully-equipped kitchen",
					"Large capacity (250+)",
					"Wheelchair access & disability toilet",
					"For social function", 
					"For meeting",
					"For sport/recreation activity"
				],
				"Suburb": "Ōtaki",
				"Location": "69 Main Street, Ōtaki",
				"Webpage": "/Our-District/Our-Community/community-venues-for-hire/otaki-memorial-hall/",
				"Blurb": "Ōtaki Memorial Hall is a large hall with a fully-equipped kitchen. It is suitable for large functions (conditions apply), meetings and recreation activities. It also has a smaller meeting room.  Bookings are made through Kāpiti Coast District Council and it is available for hire seven days a week.",
				"Image": "/globalassets/our-district/our-community/community-venues-for-hire/otaki-memorial-hall/OtakiHallThumb.JPG"
			}],
			"Raumati South Memorial Hall": [{
				"Designation": [
					"Fully-equipped kitchen",
					"Medium capacity (100-250)",
					"Wheelchair access & disability toilet",
					"For social function", 
					"For meeting",
					"For sport/recreation activity"
				],
				"Suburb": "Raumati South",
				"Location": "Tennis Court Road, Raumati South",
				"Webpage": "/Our-District/Our-Community/community-venues-for-hire/raumati-south-memorial-hall/",
				"Blurb": "Raumati South Memorial Hall is a large hall with a fully-equipped kitchen. It is suitable for large functions (conditions apply), meetings and recreation activities. It also has a smaller meeting room.  Bookings are made through Kāpiti Coast District Council and it is available for hire seven days a week.",
				"Image": "/globalassets/our-district/our-community/community-venues-for-hire/raumati-south-memorial-hall/RaumatiSouthHallThumb.jpg"
			}],
			"Coastlands Aquatic Centre Meeting Room": [{
				"Designation": [
					"Small capacity (<100)",
					"Wheelchair access & disability toilet",
					"For meeting",
				],
				"Suburb": "Paraparaumu",
				"Location": "Coastlands Aquatic Centre, 10 Brett Ambler Way, Paraparaumu",
				"Webpage": "/Our-District/Our-Community/community-venues-for-hire/coastlands-aquatic-centre-meeting-room/",
				"Blurb": "The Coastlands Aquatic Centre Meeting Room is a small room with a kitchenette and is suitable for small meetings and functions. It is located near the pool foyer and bookings must be made through Coastlands Aquatic Centre.  It is available for hire seven days a week.",
				"Image": "/globalassets/our-district/our-community/community-venues-for-hire/coastlands-aquatic-centre-meeting-room/CACthumb.JPG"
			}],
			"Kāpiti Gymsports Gymnasium": [{
				"Designation": [
					"Fully-equipped kitchen",
					"Small capacity (<100)",
					"For social function",
					"For meeting",
				],
				"Suburb": "Paraparaumu",
				"Location": "Mazengarb Reserve, Scaife Drive, Paraparaumu",
				"Webpage": "/Our-District/Our-Community/community-venues-for-hire/kapiti-gymsports-gymnasium/",
				"Blurb": "The Kāpiti Gymsports Gymnasium has a large gymnasium where managed gym activities can take place. It is suitable for a kid's birthday party, as well as a small meeting room. The meeting room has a small kitchen. Bookings must be made through Kāpiti Gymsports and it is available for hire at certain times when normal gym activities aren't running, including weekends.",
				"Image": "/globalassets/our-district/our-community/community-venues-for-hire/kapiti-gymsports-gymnasium/KapitiGymspThumb.JPG"
			}],
			"Te Horo Community Hall": [{
				"Designation": [
					"Medium capacity (100-250)",
					"Wheelchair access & disability toilet",
					"For social function", 
					"For meeting",
					"For sport/recreation activity",
				],
				"Suburb": "Te Horo",
				"Location": "76 School Rd, Te Horo",
				"Webpage": "/Our-District/Our-Community/community-venues-for-hire/te-horo-community-hall/",
				"Blurb": "Te Horo Community Hall is a large hall with a supper room and kitchen as well as outdoor areas. It is suitable for large social functions including weddings, meetings and sporting activities. It is available for hire seven days a week.",
				"Image": "/globalassets/our-district/our-community/community-venues-for-hire/te-horo-community-hall/TeHoroHallThumb.jpg"
			}],
			"Paekākāriki Tennis Club Clubrooms/Library": [{
				"Designation": [
					"Small capacity (<100)",
					"For meeting",
				],
				"Suburb": "Paekākāriki",
				"Location": "14 Wellington Rd, Paekākāriki",
				"Webpage": "/Our-District/Our-Community/community-venues-for-hire/paekakariki-tennis-club-clubroomslibrary/",
				"Blurb": "The Paekākāriki Tennis Club Clubrooms/Library has limited availability but when not in use can be hired as a small meeting room. Bookings are made through Kāpiti Coast District Council.",
				"Image": "/globalassets/our-district/our-community/community-venues-for-hire/paekakariki-tennis-club-clubroomslibrary/PaekakLibThumb.jpg"
			}],
			"Waikanae War Memorial Hall": [{
				"Designation": [
					"Fully-equipped kitchen",
					"Large capacity (250+)",
					"Wheelchair access & disability toilet",
					"For social function", 
					"For meeting",
					"For sport/recreation activity",
				],
				"Suburb": "Waikanae",
				"Location": "3-5 Pehi Kupa St, Waikanae",
				"Webpage": "/Our-District/Our-Community/community-venues-for-hire/waikanae-war-memorial-hall/",
				"Blurb": "Waikanae War Memorial Hall is a large hall with a fully-equipped kitchen. It is suitable for large functions (conditions apply), meetings and recreation activities. It also has a smaller hall and mezzanine floor.  Bookings are made through Kāpiti Coast District Council and it is available for hire seven days a week.",
				"Image": "/globalassets/our-district/our-community/community-venues-for-hire/waikanae-war-memorial-hall/WaikMemHallThumb.JPG"
			}],
			"Waikanae Community Centre": [{
				"Designation": [
					"Fully-equipped kitchen",
					"Medium capacity (100-250)",
					"Wheelchair access & disability toilet",
					"For social function", 
					"For meeting",
				],
				"Suburb": "Waikanae",
				"Location": "28-32 Utauta St, Waikanae",
				"Webpage": "/Our-District/Our-Community/community-venues-for-hire/waikanae-community-centre/",
				"Blurb": "Waikanae Community Centre is a medium hall with a fully-equipped kitchen. It is suitable for medium-sized functions (conditions apply) and meetings.  Bookings are made through Kāpiti Coast District Council and it is available for hire seven days a week.",
				"Image": "/globalassets/our-district/our-community/community-venues-for-hire/waikanae-community-centre/WaikCommCentreThumb.JPG"
			}],
			"Mazengarb Reserve Sports Complex Hall": [{
				"Designation": [
					"Fully-equipped kitchen",
					"Medium capacity (100-250)",
					"Wheelchair access & disability toilet",
					"For sport/recreation activity",
					"For meeting",
				],
				"Suburb": "Paraparaumu",
				"Location": "Mazengarb Reserve, Scaife Drive, Paraparaumu",
				"Webpage": "/Our-District/Our-Community/community-venues-for-hire/mazengarb-reserve-sports-complex-hall/",
				"Blurb": "The Mazengarb Reserve Sports Complex Hall is medium-sized with a fully-equipped kitchen.  It is suitable for meetings or recreation activities.  Bookings are made through Kāpiti Coast District Council and it is available for hire 7 days a week.  The adjacent playing fields are also available for hire.",
				"Image": "/globalassets/our-district/our-community/community-venues-for-hire/mazengarb-reserve-sports-complex-hall/MazengarbsportscomThumb.JPG"
			}],
			"Waikanae Beach Community Hall": [{
				"Designation": [
					"Medium capacity (100-250)",
					"Wheelchair access & disability toilet",
					"For social function",
					"For meeting",
				],
				"Suburb": "Waikanae Beach",
				"Location": "22a Rauparaha St, Waikanae Beach",
				"Webpage": "/Our-District/Our-Community/community-venues-for-hire/waikanae-beach-community-hall/",
				"Blurb": "Waikanae Beach Community Hall is medium-sized with a kitchen. It is suitable for functions (conditions apply) and meetings.  Bookings are made through Kāpiti Coast District Council and it is available for hire seven days a week.",
				"Image": "/globalassets/our-district/our-community/community-venues-for-hire/waikanae-beach-community-hall/WaikBeachCommHallThumb.JPG"
			}],
			"Ocean Road Community Centre": [{
				"Designation": [
					"Medium capacity (100-250)",
					"Wheelchair access & disability toilet",
					"For social function",
					"For meeting",
				],
				"Suburb": "Paraparaumu Beach",
				"Location": "45 Ocean Rd, Paraparaumu Beach",
				"Webpage": "/Our-District/Our-Community/community-venues-for-hire/ocean-road-community-centre/",
				"Blurb": "Ocean Road Community Centre has a medium-sized carpeted hall and a fully-equipped kitchen. When it's not being used by the Kapiti Senior Citizens' Association and other community groups it is available for hire.",
				"Image": "/globalassets/our-district/our-community/community-venues-for-hire/ocean-road-community-centre/OceanRdCCThumb.JPG"
			}],
			"Paraparaumu Memorial Hall": [{
				"Designation": [
					"Fully-equipped kitchen",
					"Large capacity (250+)",
					"Wheelchair access & disability toilet",
					"For social function", 
					"For meeting",
					"For sport/recreation activity",
				],
				"Suburb": "Paraparaumu",
				"Location": "Corner of Aorangi and Tutanekai Sts, Paraparaumu",
				"Webpage": "/Our-District/Our-Community/community-venues-for-hire/paraparaumu-memorial-hall/",
				"Blurb": "Paraparaumu Memorial Hall is a large hall with a fully-equipped kitchen. It is suitable for large functions (conditions apply), meetings and recreation activities. It also has a smaller meeting room.  Bookings are made through Kāpiti Coast District Council and it is available for hire seven days a week.",
				"Image": "/globalassets/our-district/our-community/community-venues-for-hire/paraparaumu-memorial-hall/PumuMemHallThumb.JPG"
			}],
			"Paraparaumu Library Meeting Room": [{
				"Designation": [
					"Small capacity (<100)",
					"Wheelchair access & disability toilet",
					"For meeting",
				],
				"Suburb": "Paraparaumu",
				"Location": "Paraparaumu Library foyer, Iver Trask Place, Paraparaumu",
				"Webpage": "/Our-District/Our-Community/community-venues-for-hire/paraparaumu-library-meeting-room/",
				"Blurb": "The Paraparaumu Library Meeting Room has a kitchenette and is available for hire for small meetings.  Bookings are made through Kāpiti Coast District Council and it is available for hire seven days a week.",
				"Image": "/globalassets/our-district/our-community/community-venues-for-hire/paraparaumu-library-meeting-room/PumuLibThumb.jpg"
			}],
			"Paraparaumu College Sports Hall": [{
				"Designation": [
					"Medium capacity (100-250)",
					"Wheelchair access & disability toilet",
					"For sport/recreation activity",
				],
				"Suburb": "Paraparaumu",
				"Location": "Paraparaumu College, 151 Mazengarb Rd, Paraparaumu",
				"Webpage": "/Our-District/Our-Community/community-venues-for-hire/paraparaumu-college-sports-hall/",
				"Blurb": "The Paraparaumu College Sports Hall is available for hire for sport and recreation activities. Bookings are made through Kāpiti Coast District Council.",
				"Image": "/globalassets/our-district/our-community/community-venues-for-hire/paraparaumu-college-sports-hall/PumuCollSportsHallThumb.jpg"
			}],
			"Te Newhanga Kāpiti Community Centre": [{
				"Designation": [
					"Small capacity (<100)",
					"Medium capacity (100-250)",
					"Wheelchair access & disability toilet",
					"For social function",
					"For meeting",
				],
				"Suburb": "Paraparaumu",
				"Location": "15 Ngahina St, Paraparaumu",
				"Webpage": "/Our-District/Our-Community/community-venues-for-hire/te-newhanga-kapiti-community-centre/",
				"Blurb": "Te Newhanga Kapiti Community Centre has eight different sized rooms available for hire.  These are suitable for social functions, meetings, seminars, expos and events. Bookings are made through the Community Centre.",
				"Image": "/globalassets/our-district/our-community/community-venues-for-hire/te-newhanga-kapiti-community-centre/KapCommCentreThumb.jpg"
			}],
			"Paekākāriki Surf Club": [{
				"Designation": [
					"Small capacity (<100)",
					"For social function",
					"For meeting",
				],
				"Suburb": "Paekākāriki",
				"Location": "Northern end of Wellington Rd, Paekākāriki",
				"Webpage": "/Our-District/Our-Community/community-venues-for-hire/paekakariki-surf-club/",
				"Blurb": "The Paekākāriki Surf Club has a small space with a basic kitchen and bar available for hire. It is suitable for meetings and small social functions. Bookings are made through the Surf Club.",
				"Image": "/globalassets/our-district/our-community/community-venues-for-hire/paekakariki-surf-club/PaekakSCThumb.JPG"
			}],
			"Raumati South School Hall": [{
				"Designation": [
					"Medium capacity (100-250)",
					"For social function",
					"For sport/recreation activity",
				],
				"Suburb": "Raumati South",
				"Location": "54A Matai Rd, Raumati South",
				"Webpage": "/Our-District/Our-Community/community-venues-for-hire/raumati-south-school/",
				"Blurb": "The Raumati South School Hall is medium-sized and available for hire for functions and recreation activities. Bookings are made through the School.",
				"Image": "/globalassets/our-district/our-community/community-venues-for-hire/raumati-south-school-hall/RauSthSchThumb.JPG"
			}],
			"Kāpiti Bowling Club Pavilion": [{
				"Designation": [
					"Small capacity (<100)",
					"For social function",
				],
				"Suburb": "Raumati",
				"Location": "1 Matatua Rd, Raumati Beach",
				"Webpage": "/Our-District/Our-Community/community-venues-for-hire/kapiti-bowling-club-pavillion/",
				"Blurb": "The Kāpiti Bowling Club Pavillion has a main hall area with a bar. It is suitable for small social functions and indoor bowls.  Bookings are made through the Bowling Club.",
				"Image": "/globalassets/our-district/our-community/community-venues-for-hire/kapiti-bowling-club-pavillion/KapitiBowlingClubThumb.JPG"
			}],
			"Kāpiti Boating Club Clubrooms": [{
				"Designation": [
					"Fully-equipped kitchen",
					"Medium capacity (100-250)",
					"Wheelchair access & disability toilet",
					"For social function", 
					"For meeting",
				],
				"Suburb": "Paraparaumu Beach",
				"Location": "Maclean Park Reserve, Marine Parade, Paraparaumu Beach",
				"Webpage": "/Our-District/Our-Community/community-venues-for-hire/kapiti-boating-club/",
				"Blurb": "The Kāpiti Boating Club Clubrooms comprises a main hall and upstairs area along with a fully-equipped kitchen.  It is suitable for medium-sized functions and meetings. Bookings are made through the boating club.",
				"Image": "/globalassets/our-district/our-community/community-venues-for-hire/kapiti-boating-club/KapitiBoatingClubThumb.jpg"
			}],
			"El Rancho Holiday Camp Meeting Spaces": [{
				"Designation": [
					"Small capacity (<100)",
					"Medium capacity (100-250)",
					"Large capacity (250+)",
					"Wheelchair access & disability toilet",
					"For sport/recreation activity",
					"For meeting",
				],
				"Suburb": "Waikanae Beach",
				"Location": "58 Weggery Drive, Waikanae Beach",
				"Webpage": "/Our-District/Our-Community/community-venues-for-hire/el-rancho-holiday-camp-meeting-spaces/",
				"Blurb": "El Rancho Holiday Camp has a number of different size meeting spaces available for hire (along with accommodation and activity options).  It is suitable for meetings, conferences, indoor sporting events, and recreation activities.  Bookings are made through El Rancho.",
				"Image": "/globalassets/our-district/our-community/community-venues-for-hire/el-rancho-holiday-camp-meeting-spaces/ElRanchothumb.jpg"
			}],
			"Waikanae Bowling Club Clubrooms": [{
				"Designation": [
					"Medium capacity (100-250)",
					"Wheelchair access & disability toilet",
					"For sport/recreation activity",
					"For social function",
					"For sport/recreation activity",					
					"For meeting",
				],
				"Suburb": "Waikanae",
				"Location": "354-356 Te Moana Rd, Waikanae",
				"Webpage": "/Our-District/Our-Community/community-venues-for-hire/waikanae-bowling-club-clubrooms/",
				"Blurb": "The Waikanae Bowling Club Clubrooms have a hall area with a carpeted lounge bar area as well as a meeting room. It is suitable for medium-size corporate and social functions including bowling occasions. Bookings are made through the Bowling Club.",
				"Image": "/globalassets/our-district/our-community/community-venues-for-hire/waikanae-bowling-club-clubrooms/WaikBowlingClubThumb.jpg"
			}],
			"Coastlands Kāpiti Sports Turf Pavilion": [{
				"Designation": [
					"Medium capacity (100-250)",
					"For sport/recreation activity",
					"For meeting",
				],
				"Suburb": "Paraparaumu",
				"Location": "Mazengarb Reserve, Scaife Drive, Paraparaumu",
				"Webpage": "/Our-District/Our-Community/community-venues-for-hire/coastlands-kapiti-sports-turf-pavilion/",
				"Blurb": "The Waikanae Bowling Club Clubrooms have a hall area with a carpeted lounge bar area as well as a meeting room. It is suitable for medium-size corporate and social functions including bowling occasions. Bookings are made through the Bowling Club.",
				"Image": "/globalassets/our-district/our-community/community-venues-for-hire/waikanae-bowling-club-clubrooms/WaikBowlingClubThumb.jpg"
			}],
			"Reikorangi Hall": [{
				"Designation": [
					"Small capacity (<100)",
					"For social function",
					"For meeting",
				],
				"Suburb": "Waikanae",
				"Location": "The start of Akatarawa Rd, Reikorangi, Waikanae",
				"Webpage": "/Our-District/Our-Community/community-venues-for-hire/reikorangi-hall/",
				"Blurb": "The Coastlands Kāpiti Sports Turf Pavilion has a large open space with bar as well as a meeting room. It is suitable for medium-sized sporting events, meetings and functions.",
				"Image": "/globalassets/our-district/our-community/community-venues-for-hire/reikorangi-hall/reikorangihallthumb.jpg"
			}]
		};
		
		//Scroll up to help out mobile users
		$.fn.gotoAnchor = function(anchor) {
			//location.href = this.selector; // this doesn't go high enough but is more effecient
			$(document).scrollTop( $("#venues-end").offset().top - 200); 
		}
		
		$('#venues-btn').on('click', function (e, t) {
			var count = 0;
			if(visibleVenues == $('.venue-item').length){
				$('.venue-item').each(function(i) {
					var element = $(this);
					if(i >= 5) {
						element.css('display', 'none')
					}
					visibleVenues = 0;
				});
				$('#venues-btn').html('Show More...')
				$('#venues-end').gotoAnchor();
			} else {
				$('.venue-item').each(function(i) {
					var element = $(this);
					var shown = false;
					visibleVenues = 0;
					if(element.css('display') == 'none' && count < 5) {
						element.show();
						count++
						if(i == $('.venue-item').length -1){
							$('#venues-btn').html('Show Less...')
							visibleVenues = i + 1;
						}	
					} 						 
				});
			}
		})
		
		function addNewVenue(venue, venueAttributes, hide){
			//Allow an external site to be added, so we will need to check to see if the URL contains a https or www as all internal links exclude this and all external ones requires either of these and can contain both.
			//Remember -1 means not found. This allows us to easily change between production and uat with allowing for externally linked pages such as the QE2 venue link which goes to a central government page
			var venueUrl = (venueAttributes.Webpage.indexOf('http') == -1 &&  venueAttributes.Webpage.indexOf('www') == -1) ? domain + venueAttributes.Webpage : venueAttributes.Webpage;
			
			var venueList = [
				'<a class="venue-item" href="'+ venueUrl + ' " target="_blank"', hide ? 'style="display: none"' : '' ,'  >',
					'<div class="row">',
						"<div class='well col-md-12' style='background-color: #ffffff; margin-top: 10px; cursor: pointer;'>",
							"<div class='col-md-4'>",
								"<img style='width: 230px; height: 170px;' ",
								"src='" + venueAttributes.Image + "' ",
								"alt='" + venue + "' class='img-thumbnail'>",
							"</div>",
							"<div class='col-md-8'>",
								"<h2 style='margin-top: 10px;'>" + venue + "</h2>",
								"<p>" + venueAttributes.Blurb + "</p>",
								"<address style='margin-bottom: 0px;'>",
									"<strong>Location: </strong>",
									venueAttributes.Location,
								"</address>",
							"</div>",
						"</div>",
					"</div>",
				"</a>"
			];

			$( "#venue-list" ).append( venueList.join(' ') );
		}
	
		//Return all designations for venues for a selected suburb
		function findSuburbDesignations(suburb) {
			var visibleVenues = 0;
			$('#venues-btn').html('Show More...')
			$( "#venue-list" ).empty();
			$('#designation').find('option').remove().end();
			var designations = [];
			if(suburb != ''){
				var count = 0;
				$.each(venues, function(venue, attrs) {
					$.each(attrs, function(i, item) {
						if(item['Suburb'] == suburb || suburb == '*'){
							console.log('Suburb is all - findSuburbDesignations');
							$.each(item['Designation'], function(ii, venueDesignation) {
								if($.inArray(venueDesignation, designations) == -1 ? true : false)
									designations.push(venueDesignation);
							});	
							
							hideExcessVenues(venue, attrs, count)
							count++;							
						}
					});
					
				});

				$.each(designations.sort(), function (i, designation) {
					$('#designation').append(
						$('<option>', {
							value: designation,
							text : designation
						})
					);
				});
			}
			applyHoverStyles();
		}

		//Return all venues for the selected designations and suburb
		function findVenueDesignations(selectedDesignations) {
			$( "#venue-list" ).empty();
			var availVenues = [];
			var match = 0;
			var visibleVenues = 0;
			$('#venues-btn').html('Show More...')
			var count = 0;
			//Loop through venues
			$.each(venues, function(venue, attrs) {
				//Loop through venues attributes/properties
				$.each(attrs, function(i, item) {
					if(item['Suburb'] == suburb || suburb == '*'){
						console.log('Suburb is All - findVenueDesignations');
						//See if venue matches one of the selected designations
						$.each(item['Designation'], function(i, venueDesignation) {
							if($.inArray(venueDesignation, selectedDesignations) != -1 ? true : false){
								match++;
							}
						});
					}
				});
				if($.isArray(selectedDesignations) && match == selectedDesignations.length){
					availVenues.push(venue);
					hideExcessVenues(venue, attrs, count)	
					count++					
				}

				match = 0;

			});
			if(!($.isArray(selectedDesignations))){
				findSuburbDesignations(suburb);
			}
			
			applyHoverStyles();

			return venues;
		}
		
		function applyHoverStyles(){
			$('.well').mouseover(function() {
				$(this).css({'border-color': '#009FE3'});
			});	
			$('.well').mouseout(function() {
				$(this).css({'border-color': '#e3e3e3'});
			});	
			$('.well').parent().parent().css({ 'color': 'inherit' });
		}
		
		function hideExcessVenues(venue, attrs, count){
			var hide = count > 4 ? true : false;
			if(count > 4){
				$('#venues-btn').show();
			} else{
				$('#venues-btn').hide();
			}
				
			addNewVenue(venue, attrs[0], hide)	
		}
		
}
