function autoClickCarousel(element) {
    const clickInterval = 10000; // 10 seconds in milliseconds

    setInterval(() => {
        if (element) {
            element.click();
        }
    }, clickInterval);
}

autoClickCarousel(document.getElementsByClassName('owl-next')[0]);
autoClickCarousel(document.getElementsByClassName('owl-next')[1]);