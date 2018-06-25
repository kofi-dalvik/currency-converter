export const toggleProgressIndicator = () => {
    const progressIndicator = document.getElementsByClassName('progress');
    console.log(progressIndicator.style)
    if (progressIndicator.style.display === 'none') {
        progressIndicator.style.display = 'flex'
    } else {
        progressIndicator.style.display = 'none'
    }
}