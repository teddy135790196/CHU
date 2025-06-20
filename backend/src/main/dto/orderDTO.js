// backend/src/main/dto/orderDTO.js


// 訂單編號、下單日期、出貨日期、結算日期、狀態、商品名稱、商品售價、商品數量、小計、折扣、總計

// 訂單 DTO，（主檔 + 明細陣列）
class OrderDTO {
	constructor({ id, date, shipDate, settleDate, status, discount, total, statusText, details = [] }) {
		this.id = id;                 // 訂單 ID
		this.date = date;             // 下單日期
		this.shipDate = shipDate;     // 出貨日期
		this.settleDate = settleDate; // 結算日期
		this.status = status;         // 狀態代碼（例：0,1,2）
		this.statusText = statusText; // 狀態對應文字（例："已完成"）
		this.discount = discount;     // 折扣金額
		this.total = total;           // 訂單總金額
		this.details = details;       // 陣列，包含 OrderDetailDTO
	}
}


// 單筆訂單明細 DTO
class OrderDetailDTO{
	constructor({id, name, price, qty}){
		this.id = id;       // 書籍 ID
		this.name = name;   // 書名
		this.price = price; // 售價
		this.qty = qty;     // 數量
		this.subtotal = price * qty; // 小計
	}
}


module.exports = {
	OrderDTO,
	OrderDetailDTO,
};