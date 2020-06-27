const container = document.querySelector(".container");
const seats = document.querySelectorAll(".row .seat:not(.occupied)");
const count = document.getElementById("count");
const total = document.getElementById("total");
const movieSelect = document.getElementById("movie");
let ticketPrice = +movieSelect.value;
populateUI();
//更新座位数及总票价
function updateSeletedCount() {
    const selectedSeats = document.querySelectorAll(".row .seat.selected");

    const seatsIndex = [...selectedSeats].map(seat => [...seats].indexOf(seat));
    localStorage.setItem("selectedSeats", JSON.stringify(seatsIndex));

    const selectedSeatsCount = selectedSeats.length;
    count.innerText = selectedSeatsCount;
    total.innerText = selectedSeatsCount * ticketPrice;
}
//保存电影索引值
function setMovieData(movieIndex, moviePrice) {
    localStorage.setItem("selectedMovieIndex", movieIndex);
    localStorage.setItem("selectedMOviePrice", moviePrice);
}

//获取本地数据并渲染
function populateUI() {
    const selectedSeats = JSON.parse(localStorage.getItem("selectedSeats"));
    if (selectedSeats !== null && selectedSeats.length > 0) {
        seats.forEach((seat, index) => {
            if (selectedSeats.indexOf(index) > -1) {
                seat.classList.add("selected");
            }
        });
    }
    const selectedMovieIndex = localStorage.getItem("selectedMovieIndex");
    if (selectedMovieIndex !== null) {
        movieSelect.selectedIndex = selectedMovieIndex;
    }
}


//电影下拉框监听
movieSelect.addEventListener("change", e => {
    ticketPrice = +e.target.value;

    setMovieData(e.target.selectedIndex, e.target.value);

    updateSeletedCount();
});


//作为点击事件
container.addEventListener("click", e => {
    if (e.target.classList.contains("seat") && !e.target.classList.contains("occupied")) {
        e.target.classList.toggle("selected");

        updateSeletedCount();
    }
});
//更新票数和票价
updateSeletedCount();
