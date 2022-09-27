const stepPanel = document.getElementById("step-panel");
const steps = stepPanel.querySelectorAll(".step");
const stepsLine = stepPanel.querySelectorAll(".line");
const btnControl = document.getElementById("btn-select");
const prevBtn = btnControl.querySelector(".btn-previous");
const nextBtn = btnControl.querySelector(".btn-next");
const parts = document.querySelectorAll(".part");

//結帳區 
let step = 0;
let activeCard = 0;

function btnControlClicked(e) {
  e.preventDefault();
  const nowStep = steps[step];
  const nowLine = stepsLine[step];
  if (e.target.matches(".btn-next")) {
    const nextStep = steps[step + 1];
    nowStep.classList.remove("active");
    nowStep.classList.add("checked");
    nowLine.classList.add("active");
    nextStep.classList.remove("checked");
    nextStep.classList.add("active");
    parts[step].classList.toggle("d-none");
    parts[step + 1].classList.toggle("d-none");
    step += 1;
  } else if (e.target.matches(".btn-previous")) {
    const prevStep = steps[step - 1];
    nowStep.classList.remove("active");
    nowStep.classList.remove("checked");
    prevStep.classList.remove("checked");
    prevStep.classList.add("active");
    parts[step].classList.toggle("d-none");
    parts[step - 1].classList.toggle("d-none");
    //step line 只有兩條，所以要加條件控制
    if (step === 1) {
      nowLine.classList.remove("active");
    }
    step--;
    console.log("pre2", step);
  }
  setBtnDisabled();
}

function setBtnDisabled() {
  console.log("setBtn", step);
  if (step === 0) {
    prevBtn.classList.add("d-none");
    nextBtn.classList.add("flex-100");
    nextBtn.innerHTML = "下一步 →";
  } else if (step === 1) {
    prevBtn.classList.remove("d-none");
    nextBtn.classList.remove("flex-100");
    nextBtn.innerHTML = "下一步 →";
  } else if (step === 2) {
    nextBtn.innerHTML = "送出申請";
  } else {
    nextBtn.innerHTML = "下一步 →";
  }
}

btnControl.addEventListener("click", btnControlClicked);



// 購物車畫面渲染
const cartItemList = document.getElementById("cart-list");
const subtotalElement =document.querySelector('.subtotal-price')

cartItems = [
  {
    id: 1,
    name: "破壞補釘修身牛仔褲",
    query: 1,
    price: 3999,
    image:"img/Block.jpg"
  },
  {
    id: 2,
    name: "刷色直筒年仔褲",
    query: 1,
    price: 1999,
    image:"img/Block2.jpg"
  },
];

function renderCart() {
  cartItemList.innerHTML = "";

  cartItems.forEach(product =>{
    cartItemList.innerHTML += `
    <li class="cart-item" id="cart-item" data-id=${product.id}>
      <img src="${product.image}" alt="商品照片">
          <div class="cart-info">
              <div class="cart-des">
                  <div class="cart-name">${product.name}</div>
                  <div class="cart-count ">
                     <div class="minus" data-price="${product.price}"></div>
                        <div class="number">${product.query}</div>
                          <div class="plus" data-price="${product.price}"></div>
                        </div>
                      </div>
                  <div class="cart-price">
                    <span>$</span>
                    <span class="price">${product.price}</span>
                </div>
            </div>
     </li>
    `;

  })
  
}

// + - 數量
function cartQueryClicked(event){    
  const totalPrice = parseInt(event.target.dataset.price) 
  const priceElement = event.target.parentElement.parentElement.nextElementSibling.lastElementChild

  if (event.target.matches('.plus')){
    //取數量
    const queryElement = event.target.previousElementSibling
    queryElement.innerText= parseInt(queryElement.innerText)+1 
    //總金額
    priceElement.innerText= totalPrice*parseInt(queryElement.innerText) 
    
  } else if (event.target.matches('.minus')){  //按-減少數量
    const queryElement = event.target.nextElementSibling   
     
    if(queryElement.innerText===0){
      queryElement.innerText===0
      priceElement.innerText===0
    } else if (queryElement.innerText>0){
      queryElement.innerText= parseInt(queryElement.innerText)-1
      priceElement.innerText= totalPrice*parseInt(queryElement.innerText)
    }
    queryElement.innerText===0   
  }
 countSubtotalPrice()


}

//計算總金額
function  countSubtotalPrice (){
  const totalPriceElement = document.querySelectorAll('span.price') 
  let subtotal = 0
   totalPriceElement.forEach(price=>{
     subtotal+=parseInt(price.innerHTML)   
    return subtotal
  }) 
  subtotalElement.innerText=`$`+subtotal.toLocaleString()  
}

cartItemList.addEventListener("click", cartQueryClicked);



renderCart()