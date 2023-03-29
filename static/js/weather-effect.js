// 눈 내리는 효과
function startSnow() {
    var snow = document.createElement('div');
    snow.innerHTML = "❅";
    snow.style.position = 'absolute';
    snow.style.top = '-50px';
    snow.style.fontSize = Math.random() * 20 + 10 + 'px';
    snow.style.color = '#ffffff';
    snow.style.zIndex = '9999';
    snow.style.userSelect = 'none';
    snow.style.pointerEvents = 'none';
    snow.style.animation = 'falling ' + (Math.random() * 10 + 5) + 's linear infinite';

    var startLeft = Math.random() * window.innerWidth;
    snow.style.left = startLeft + 'px';
    snow.style.opacity = Math.random() + 0.5;

    document.body.appendChild(snow);

    setTimeout(function () {
        snow.remove();
    }, 10000);
}

document.addEventListener('DOMContentLoaded', function () {
    setInterval(startSnow, 100);
});