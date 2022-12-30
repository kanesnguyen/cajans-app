
var date = new Date();
var delivery_date = new Date(new Date().getTime() + (24 * 60 * 60 * 1000 * 1))
var current_date = date.getDate() + "/" + (date.getMonth() + 1);
const getDateFormat = (from, to) => {
	const delivery_date = (space) => { return new Date(new Date().getTime() + (24 * 60 * 60 * 1000 * space))}
	return (delivery_date(from).getDate()) + "/" + (delivery_date(from).getMonth() + 1) + " - " + (delivery_date(to).getDate()) + "/" + (delivery_date(to).getMonth() + 1)
}
var inforShipping = {
	method: "Standar Shipping",
	dateOrdered: date.getDate() + "/" + (date.getMonth() + 1),
	dateShipping: getDateFormat(5,7),
	quantity: 1,
	price: 100,

}
const totalMoney = (n, price) => {
	switch (true) {
	  case 1:
		return n*price;
	  case (n >= 2 && n <= 4):
		return n*price * 0.9;
	  case (n >= 5 && n <= 7):
		return n*price * 0.8;
	  case (n >= 8 && n <= 10):
		return n*price * 0.7;
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
		<div class="line"></div>
		<div class="box">
			<h2>Order Date</h2>
			<div class="box box_icon">
				<svg viewBox="0 0 24 24" width="20" height="20" stroke="#fff" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" class="css-i6dzq1"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
			</div>
			<p class="day" id="current_day">${inforShipping.dateOrdered}</p>
		</div>
		<div class="box">
			<h2>Delivery Date</h2>
			<div class="box box_icon">
				<svg viewBox="0 0 24 24" width="20" height="20" stroke="#fff" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round" class="css-i6dzq1"><rect x="1" y="3" width="15" height="13"></rect><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon><circle cx="5.5" cy="18.5" r="2.5"></circle><circle cx="18.5" cy="18.5" r="2.5"></circle></svg>
			</div>
			<p class="day" id="delivery_day">${inforShipping.dateShipping}</p>
		</div>
	  </div>
		`)

		$(document).on("click", "#select_methods", function () {
			$("#select_methods svg").toggleClass('select_list')
			$("#select_methods .selected_text").toggleClass('select_list')
			$("#select_methods .options").toggleClass('dropdown')
		})

		var selectOption = function () {
			var data = this.getAttribute("data");
			inforShipping.method = data;
			$('#selected_text').html(data)
			if(data === "Standar Shipping") {
				inforShipping.dateShipping = getDateFormat(5,7);
			}
			if(data === "Fast Shipping") {
				inforShipping.dateShipping = getDateFormat(2,4);
			}
			$('#delivery_day').html(inforShipping.dateShipping)
		};

		for (var i = 0; i < document.querySelectorAll("#select_methods .option").length; i++) {
			$("#select_methods .option")[i].addEventListener('click', selectOption, false);
		}
		return  false;
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
		$(document).on("click", "#discount_tab", function () {
			$("#discount_tab svg").toggleClass('select_list')
			$("#discount_tab .selected_text").toggleClass('select_list')
			$("#discount_tab .options").toggleClass('dropdown')
		});

		var selectOption = function () {
			var data = this.getAttribute("data");
			inforShipping.quantity = Number(data);
			$('#total_product').html(data)
			$('#count_items').html(data);
			$('#money_total').html(`${totalMoney(data, inforShipping.price)}`);
		};

		for (var i = 0; i < document.querySelectorAll("#discount_tab .option").length; i++) {
			$("#discount_tab .option")[i].addEventListener('click', selectOption, false);
		}
	}
}
(function() {
	renderContent("tab_1")
}())
document.querySelector("#label-1").addEventListener('click', function() {
    renderContent("tab_1")
});
document.querySelector("#label-2").addEventListener('click', function() {
    renderContent("tab_2")
});