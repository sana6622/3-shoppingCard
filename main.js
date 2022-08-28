const stepControl = document.getElementById("step-control");
const steps = stepControl.querySelectorAll(".step");
const btnControl = document.getElementById("btn-select");
const prevBtn = btnControl.querySelector(".btn-previous");
const nextBtn = btnControl.querySelector(".btn-next");
const parts = document.querySelectorAll(".part");


let step = 0;
let activeCard = 0;

function btnControlClicked(e) {
  e.preventDefault();
  const nowStep = steps[step];
  console.log(e.target.className);
  if (e.target.matches(".btn-next")) {   
    const nextStep = steps[step + 1];
    nowStep.classList.remove("active");    
    nowStep.classList.add("checked");   
    nextStep.classList.remove("checked")
    nextStep.classList.add("active")
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
    step -= 1;
  }
  setBtnDisabled();
}

function setBtnDisabled() {
    console.log(step)
  if (step === 0) {
    prevBtn.classList.add("d-none")  
    nextBtn.classList.add("flex-100") 
    nextBtn.innerHTML = "下一步 →"
  }
  else if (step === 1) {
    prevBtn.classList.remove("d-none")  
    nextBtn.classList.remove("flex-100")
    nextBtn.innerHTML = "下一步 →"
  } 
  else if (step === 2) {
    nextBtn.innerHTML = "送出申請";
  } 
  else {
    nextBtn.innerHTML = "下一步 →";
  }
}


btnControl.addEventListener("click", btnControlClicked);

