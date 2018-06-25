/**
 * @description toggles the visibility of the progress indicator
 */
export const toggleProgressIndicator = () => {
    const [progressIndicator] = document.getElementsByClassName('progress');
    if (progressIndicator.style.display === 'none' || progressIndicator.style.display === '') {
        progressIndicator.style.display = 'flex'
    } else {
        progressIndicator.style.display = 'none'
    }
}