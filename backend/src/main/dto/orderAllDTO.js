// backend/src/main/dto/orderDTO.js


// 訂單編號、下單日期、出貨日期、結算日期、狀態、商品名稱、商品售價、商品數量、小計、折扣、總計

// 訂單 DTO，（主檔 + 明細陣列）
class OrderDTO {
	constructor({ id, created_at, status, total, statusText, details = [] }) {
		this.id = id;
		this.created_at = created_at;
		this.status = statusText; // 前端使用的是 statusText，而不是數字代碼
		this.total = total;
		this.details = details;
	}
}


// 單筆訂單明細 DTO
class OrderDetailDTO{
	constructor({ id, name, price, qty }) {
		this.id = id;
		this.name = name;
		this.price = price;
		this.qty = qty;
		this.subtotal = price * qty;
	}
}


module.exports = {
	OrderDTO,
	OrderDetailDTO,
};