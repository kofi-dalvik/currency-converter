export default () => {
    const fromInput = document.getElementById('from-value');
    const toInput = document.getElementById('to-value');
    const fromType = document.getElementById('from-type');
    const toType = document.getElementById('to-type');
    const convert = document.getElementById('convert');

    convert.addEventListener('click', (event) => {
        document.getElementsByClassName('progress')[0].style.display = 'flex'
    })
}