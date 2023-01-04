const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

var date = new Date();
var delivery_date = new Date(new Date().getTime() + (24 * 60 * 60 * 1000 * 1))
const getDateFormat = (from, to) => {
	const delivery_date = (space) => { return new Date(new Date().getTime() + (24 * 60 * 60 * 1000 * space)) }
	return (monthNames[delivery_date(from).getMonth()]) + " " + (delivery_date(from).getDate()) + ", " + (date.getFullYear()) +" - "+ (monthNames[delivery_date(to).getMonth()]) + " " + (delivery_date(to).getDate())  + ", " + (date.getFullYear())
}
var inforShipping = {
	method: "Standar Shipping",
	dateOrdered: monthNames[date.getMonth()] + " " + (date.getDate()) + "," + (date.getFullYear()),
	dateDelivery: getDateFormat(5, 7),
	quantity: 1,
	price: 100,

}
const totalMoney = (n, price) => {
	switch (true) {
		case 1:
			return n * price;
		case (n >= 2 && n <= 4):
			return n * price * 0.9;
		case (n >= 5 && n <= 7):
			return n * price * 0.8;
		case (n >= 8 && n <= 10):
			return n * price * 0.7;
		default:
			return n * price
	}
}
const renderContent = (tab) => {
	if (tab === 'tab_1') {
		$("#content_tab").html(`
		<div class="select_methods" id="select_methods">
		<div class="selected_text">
			<span id="selected_text">${inforShipping.method}</span>
			<svg viewBox="0 0 24 24" width="16" height="16" stroke="#fff" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" class="css-i6dzq1"><polyline points="9 18 15 12 9 6"></polyline></svg>
		</div>
		<div class="options">
			<div class="selected_text option" data="Standar Shipping">
				<span>Standar Shipping</span>
			</div>
			<div class="selected_text option" data="Fast Shipping">
				<span>Fast Shipping</span>
			</div>
		</div>
	  </div>
	  <div class="content_tab">
		<div class="box">
			<h2>Order Date</h2>
			<div class="box box_icon">
				<svg viewBox="0 0 24 24" width="20" height="20" stroke="#fff" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" class="css-i6dzq1"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
			</div>
			<div class="line" style="left:50%"></div>
			<p class="day" id="current_day">${inforShipping.dateOrdered}</p>
		</div>
		<div class="box">
			<h2>Delivery Date</h2>
			<div class="line"  style="right:50%"></div>
			<div class="box box_icon">
				<svg viewBox="0 0 24 24" width="20" height="20" stroke="#fff" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" class="css-i6dzq1"><rect x="1" y="3" width="15" height="13"></rect><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon><circle cx="5.5" cy="18.5" r="2.5"></circle><circle cx="18.5" cy="18.5" r="2.5"></circle></svg>
			</div>
			<p class="day" id="delivery_day">${inforShipping.dateDelivery}</p>
		</div>
	  </div>
		`)
	}

	if (tab === "tab_2") {
		$("#content_tab").html(`
		<div class="select_methods" id="discount_tab">
		<div class="selected_text">
			<span>Buy <span id="total_product"> ${inforShipping.quantity} </span> products</span>
			<svg viewBox="0 0 24 24" width="16" height="16" stroke="#fff" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" class="css-i6dzq1"><polyline points="9 18 15 12 9 6"></polyline></svg>
		</div>
		<div class="options">
			<div class="selected_text option" data="1">
				<span>1</span>
			</div>
			<div class="selected_text option" data="2">
				<span>2</span>
			</div>
		</div>
	  </div>
	  <div class="container box_tab">
	  <div class="header">
		<div class="content">
		   Quantity
		</div>
		<div class="content">
		   Price
		</div>
	 </div>
	 <div class="infor">
		 <div class="content">
		   <span>Buy <span id="count_items"> ${inforShipping.quantity}</span></span> 
		</div>
		<div class="content">
		   <span id="money_total">${totalMoney(inforShipping.quantity, inforShipping.price)}</span>
		</div>
	 </div>
	  </div>
		`)
	}
}


$(document).on("click", "#select_methods", function () {
	$("#select_methods svg").toggleClass('select_list')
	$("#select_methods .selected_text").toggleClass('select_list')
	$("#select_methods .options").toggleClass('dropdown')
})

$(document).on("click", "#select_methods .option", function () {
	inforShipping.method = $(this).attr("data");
	$('#selected_text').html(inforShipping.method)
	if (inforShipping.method === "Standar Shipping") {
		inforShipping.dateDelivery = getDateFormat(5, 7);
	}
	if (inforShipping.method === "Fast Shipping") {
		inforShipping.dateDelivery = getDateFormat(2, 4);
	}
	$('#delivery_day').html(inforShipping.dateDelivery)
})


$(document).on("click", "#discount_tab", function () {
	$("#discount_tab svg").toggleClass('select_list')
	$("#discount_tab .selected_text").toggleClass('select_list')
	$("#discount_tab .options").toggleClass('dropdown')
});

$(document).on("click", "#discount_tab .option", function () {
	inforShipping.quantity = Number($(this).attr("data"));
	$('#total_product').html(inforShipping.quantity)
	$('#count_items').html(inforShipping.quantity);
	$('#money_total').html(`${totalMoney(inforShipping.quantity, inforShipping.price)}`);
})


$(document).ready(function () {
	renderContent("tab_1")
})
$(document).on("click", "label", function () {
	renderContent($(this).attr("data"))
});
$(document).on("change keydown paste input", "input.quantity__input", function () {
	inforShipping.quantity = $(this).val()
	$('#total_product').html($(this).val())
	$('#count_items').html($(this).val())
	$('#money_total').html(`${totalMoney($(this).val(), inforShipping.price)}`);
});
$(document).on("click", "button", function () {
	renderContent($(this).attr("data"))
});
$("form").submit(function (e) {
	e.preventDefault();
	var settings = {
	"url": "/cart.js",
	"method": "POST",
	"timeout": 0,
	"data": {
		attributes: {
			orderDate: inforShipping.dateOrdered,
			deliveryDate: inforShipping.dateDelivery,
		}
	}
	};
	$.ajax(settings).done(function (response) {
		console.log(response);
	});
})
